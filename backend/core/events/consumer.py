"""
Event consumer for processing Kafka events with idempotency and retry handling.
Implements dead letter queues and safe event replay.
"""

import json
import logging
import asyncio
from typing import Dict, Any, Optional, Callable, Set
from datetime import datetime, timezone
from aiokafka import AIOKafkaConsumer
from aiokafka.errors import KafkaError

from core.config import settings
from core.database import AsyncSessionDB
from .simple_event import SimpleEvent as EventContract
from .topics import topic_manager
from .handlers import EventHandler, DeadLetterHandler

logger = logging.getLogger(__name__)


class EventConsumer:
    """
    Kafka event consumer with idempotency, retry handling, and dead letter queues.
    Ensures exactly-once processing and safe event replay.
    """

    def __init__(self, consumer_group: str = None):
        self.consumer_group = consumer_group or settings.KAFKA_CONSUMER_GROUP_BACKEND
        self.consumer: Optional[AIOKafkaConsumer] = None
        self.event_handlers: Dict[str, EventHandler] = {}
        self.dead_letter_handler = DeadLetterHandler()
        self.processed_events: Set[str] = set()  # In-memory deduplication cache
        self._running = False

    async def start(self, topics: list = None):
        """Start the Kafka consumer"""
        if self._running:
            return

        # Default topics if none provided
        if not topics:
            topics = self._get_default_topics()

        try:
            self.consumer = AIOKafkaConsumer(
                *topics,
                bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
                group_id=self.consumer_group,
                value_deserializer=self._deserialize_event,
                key_deserializer=lambda k: k.decode('utf-8') if k else None,
                # Exactly-once semantics
                enable_auto_commit=False,
                auto_offset_reset='earliest',
                # Performance settings
                max_poll_records=10,
                session_timeout_ms=30000,
                heartbeat_interval_ms=3000,
                # Consumer isolation
                isolation_level='read_committed'
            )
            
            await self.consumer.start()
            self._running = True
            logger.info(f"Event consumer started for topics: {topics}")
            
        except Exception as e:
            logger.error(f"Failed to start event consumer: {e}")
            raise

    async def stop(self):
        """Stop the Kafka consumer"""
        if self.consumer and self._running:
            try:
                await self.consumer.stop()
                self._running = False
                logger.info("Event consumer stopped successfully")
            except Exception as e:
                logger.error(f"Error stopping event consumer: {e}")

    def _deserialize_event(self, value: bytes) -> EventContract:
        """Deserialize event from bytes"""
        try:
            event_dict = json.loads(value.decode('utf-8'))
            return EventContract.from_dict(event_dict)
        except Exception as e:
            logger.error(f"Failed to deserialize event: {e}")
            raise

    def _get_default_topics(self) -> list:
        """Get default topics to consume"""
        return [
            # Order events
            "order.order.created", "order.order.paid", "order.order.failed",
            "order.order.shipped", "order.order.delivered", "order.order.cancelled",
            
            # Inventory events
            "inventory.stock.updated", "inventory.stock.low",
            
            # User events
            "user.user.registered", "user.user.verified", "user.profile.updated",
            
            # Payment events
            "payment.payment.succeeded", "payment.payment.failed",
            
            # Cart events
            "cart.item.added", "cart.item.removed", "cart.cart.abandoned"
        ]

    def register_handler(self, event_type: str, handler: EventHandler):
        """Register event handler for specific event type"""
        self.event_handlers[event_type] = handler
        logger.info(f"Registered handler for event type: {event_type}")

    async def consume_events(self):
        """Main event consumption loop with idempotency and error handling"""
        if not self._running:
            await self.start()

        logger.info("Starting event consumption loop...")
        
        try:
            async for message in self.consumer:
                await self._process_message(message)
                
        except Exception as e:
            logger.error(f"Error in event consumption loop: {e}")
            raise
        finally:
            await self.stop()

    async def _process_message(self, message):
        """Process individual Kafka message with idempotency"""
        try:
            event: EventContract = message.value
            
            # Idempotency check - skip if already processed
            if await self._is_event_processed(event.event_id):
                logger.debug(f"Event {event.event_id} already processed, skipping")
                await self.consumer.commit()
                return

            # Process event with retry logic
            success = await self._process_event_with_retry(event, message.topic)
            
            if success:
                # Mark event as processed
                await self._mark_event_processed(event.event_id)
                # Commit offset only after successful processing
                await self.consumer.commit()
                logger.info(f"Successfully processed event {event.event_id}")
            else:
                # Send to dead letter queue
                await self._send_to_dead_letter_queue(event, message.topic, "Max retries exceeded")
                await self.consumer.commit()  # Commit to avoid reprocessing
                
        except Exception as e:
            logger.error(f"Error processing message: {e}")
            # Don't commit - will retry on next poll

    async def _process_event_with_retry(self, event: EventContract, topic: str, max_retries: int = 3) -> bool:
        """Process event with retry logic"""
        for attempt in range(max_retries + 1):
            try:
                await self._process_single_event(event, topic)
                return True
                
            except Exception as e:
                logger.warning(f"Event processing attempt {attempt + 1} failed for {event.event_id}: {e}")
                
                if attempt < max_retries:
                    # Exponential backoff
                    wait_time = 2 ** attempt
                    await asyncio.sleep(wait_time)
                else:
                    logger.error(f"All retry attempts failed for event {event.event_id}")
                    return False

    async def _process_single_event(self, event: EventContract, topic: str):
        """Process single event using registered handlers"""
        handler = self.event_handlers.get(event.event_type)
        
        if not handler:
            logger.warning(f"No handler registered for event type: {event.event_type}")
            return

        # Validate handler is idempotent
        if not handler.is_idempotent():
            raise ValueError(f"Handler for {event.event_type} is not idempotent")

        # Process event with database session
        async with AsyncSessionDB() as db:
            await handler.handle(event, db)

    async def _is_event_processed(self, event_id: str) -> bool:
        """Check if event has already been processed (idempotency)"""
        # Check in-memory cache first
        if event_id in self.processed_events:
            return True

        # Check database for persistent idempotency
        async with AsyncSessionDB() as db:
            from sqlalchemy import text
            result = await db.execute(
                text("SELECT 1 FROM processed_events WHERE event_id = :event_id"),
                {"event_id": event_id}
            )
            return result.fetchone() is not None

    async def _mark_event_processed(self, event_id: str):
        """Mark event as processed for idempotency"""
        # Add to in-memory cache
        self.processed_events.add(event_id)
        
        # Persist to database
        async with AsyncSessionDB() as db:
            from sqlalchemy import text
            await db.execute(
                text("""
                    INSERT INTO processed_events (event_id, processed_at) 
                    VALUES (:event_id, :processed_at)
                    ON CONFLICT (event_id) DO NOTHING
                """),
                {
                    "event_id": event_id,
                    "processed_at": datetime.now(timezone.utc)
                }
            )
            await db.commit()

    async def _send_to_dead_letter_queue(self, event: EventContract, original_topic: str, reason: str):
        """Send failed event to dead letter queue"""
        try:
            dead_letter_topic = topic_manager.get_dead_letter_topic(original_topic)
            await self.dead_letter_handler.send_to_dead_letter(
                event=event,
                original_topic=original_topic,
                dead_letter_topic=dead_letter_topic,
                failure_reason=reason
            )
            logger.info(f"Event {event.event_id} sent to dead letter queue: {dead_letter_topic}")
            
        except Exception as e:
            logger.error(f"Failed to send event {event.event_id} to dead letter queue: {e}")

    async def replay_events(
        self,
        topic: str,
        from_timestamp: Optional[datetime] = None,
        to_timestamp: Optional[datetime] = None,
        event_types: Optional[list] = None
    ):
        """
        Safely replay events from a topic.
        Events are replayed in order and idempotency is maintained.
        """
        logger.info(f"Starting event replay for topic: {topic}")
        
        # Create replay consumer
        replay_consumer = AIOKafkaConsumer(
            topic,
            bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
            group_id=f"{self.consumer_group}_replay_{int(datetime.now().timestamp())}",
            value_deserializer=self._deserialize_event,
            auto_offset_reset='earliest',
            enable_auto_commit=False
        )
        
        try:
            await replay_consumer.start()
            
            replayed_count = 0
            skipped_count = 0
            
            async for message in replay_consumer:
                event: EventContract = message.value
                
                # Filter by timestamp if specified
                if from_timestamp or to_timestamp:
                    event_time = datetime.fromisoformat(event.timestamp.replace('Z', '+00:00'))
                    if from_timestamp and event_time < from_timestamp:
                        continue
                    if to_timestamp and event_time > to_timestamp:
                        break
                
                # Filter by event types if specified
                if event_types and event.event_type not in event_types:
                    continue
                
                # Check if already processed (idempotency)
                if await self._is_event_processed(event.event_id):
                    skipped_count += 1
                    continue
                
                # Replay event
                try:
                    await self._process_single_event(event, topic)
                    await self._mark_event_processed(event.event_id)
                    replayed_count += 1
                    logger.debug(f"Replayed event {event.event_id}")
                    
                except Exception as e:
                    logger.error(f"Failed to replay event {event.event_id}: {e}")
            
            logger.info(f"Event replay completed. Replayed: {replayed_count}, Skipped: {skipped_count}")
            
        finally:
            await replay_consumer.stop()

    async def create_processed_events_table(self):
        """Create table for tracking processed events (idempotency)"""
        async with AsyncSessionDB() as db:
            from sqlalchemy import text
            await db.execute(text("""
                CREATE TABLE IF NOT EXISTS processed_events (
                    event_id VARCHAR(255) PRIMARY KEY,
                    processed_at TIMESTAMP WITH TIME ZONE NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
                
                CREATE INDEX IF NOT EXISTS idx_processed_events_processed_at 
                ON processed_events(processed_at);
            """))
            await db.commit()


# Global event consumer instance
event_consumer = EventConsumer()