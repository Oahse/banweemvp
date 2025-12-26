"""
Event replay service for safely replaying Kafka events.
Supports filtering by time range, event types, and maintains idempotency.
"""

import logging
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any
from aiokafka import AIOKafkaConsumer, AIOKafkaProducer
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.database import AsyncSessionDB
from .simple_event import SimpleEvent as EventContract
from .topics import topic_manager
from .consumer import EventConsumer

logger = logging.getLogger(__name__)


class EventReplayService:
    """
    Service for safely replaying events with filtering and idempotency.
    Ensures events are replayed in order and duplicate processing is avoided.
    """

    def __init__(self):
        self.consumer: Optional[AIOKafkaConsumer] = None
        self.producer: Optional[AIOKafkaProducer] = None

    async def replay_events(
        self,
        source_topic: str,
        target_topic: Optional[str] = None,
        from_timestamp: Optional[datetime] = None,
        to_timestamp: Optional[datetime] = None,
        event_types: Optional[List[str]] = None,
        correlation_ids: Optional[List[str]] = None,
        dry_run: bool = False
    ) -> Dict[str, Any]:
        """
        Replay events from source topic to target topic (or same topic).
        
        Args:
            source_topic: Topic to replay events from
            target_topic: Topic to replay events to (defaults to source_topic)
            from_timestamp: Start timestamp for replay
            to_timestamp: End timestamp for replay
            event_types: Filter by specific event types
            correlation_ids: Filter by specific correlation IDs
            dry_run: If True, only count events without replaying
            
        Returns:
            Dictionary with replay statistics
        """
        if not target_topic:
            target_topic = source_topic

        logger.info(f"Starting event replay from {source_topic} to {target_topic}")
        
        stats = {
            "total_events": 0,
            "filtered_events": 0,
            "replayed_events": 0,
            "skipped_events": 0,
            "failed_events": 0,
            "start_time": datetime.now(timezone.utc).isoformat(),
            "dry_run": dry_run
        }

        try:
            # Create replay consumer
            replay_consumer = await self._create_replay_consumer(source_topic)
            
            # Create producer if not dry run
            replay_producer = None
            if not dry_run:
                replay_producer = await self._create_replay_producer()

            async for message in replay_consumer:
                stats["total_events"] += 1
                
                try:
                    # Deserialize event
                    event = self._deserialize_event(message.value)
                    
                    # Apply filters
                    if not self._should_replay_event(
                        event, from_timestamp, to_timestamp, event_types, correlation_ids
                    ):
                        stats["filtered_events"] += 1
                        continue

                    # Check if event was already processed (idempotency)
                    if await self._is_event_already_processed(event.event_id):
                        stats["skipped_events"] += 1
                        logger.debug(f"Skipping already processed event: {event.event_id}")
                        continue

                    if dry_run:
                        stats["replayed_events"] += 1
                        logger.debug(f"Would replay event: {event.event_id}")
                    else:
                        # Replay event
                        await self._replay_single_event(event, target_topic, replay_producer)
                        stats["replayed_events"] += 1
                        logger.debug(f"Replayed event: {event.event_id}")

                except Exception as e:
                    stats["failed_events"] += 1
                    logger.error(f"Failed to process event during replay: {e}")

                # Log progress every 100 events
                if stats["total_events"] % 100 == 0:
                    logger.info(f"Replay progress: {stats['total_events']} events processed")

            stats["end_time"] = datetime.now(timezone.utc).isoformat()
            logger.info(f"Event replay completed: {stats}")
            
            return stats

        finally:
            # Cleanup resources
            if replay_consumer:
                await replay_consumer.stop()
            if replay_producer:
                await replay_producer.stop()

    async def replay_events_by_correlation_id(
        self,
        correlation_id: str,
        source_topic: str,
        target_topic: Optional[str] = None,
        dry_run: bool = False
    ) -> Dict[str, Any]:
        """Replay all events with specific correlation ID"""
        return await self.replay_events(
            source_topic=source_topic,
            target_topic=target_topic,
            correlation_ids=[correlation_id],
            dry_run=dry_run
        )

    async def replay_failed_events_from_dead_letter(
        self,
        dead_letter_topic: str,
        target_topic: str,
        max_retry_count: int = 3,
        dry_run: bool = False
    ) -> Dict[str, Any]:
        """
        Replay failed events from dead letter queue.
        Only replays events that haven't exceeded max retry count.
        """
        logger.info(f"Replaying failed events from {dead_letter_topic} to {target_topic}")
        
        stats = {
            "total_dead_letters": 0,
            "eligible_for_retry": 0,
            "replayed_events": 0,
            "max_retries_exceeded": 0,
            "failed_events": 0,
            "dry_run": dry_run
        }

        try:
            # Create consumer for dead letter topic
            dead_letter_consumer = await self._create_replay_consumer(dead_letter_topic)
            
            # Create producer if not dry run
            replay_producer = None
            if not dry_run:
                replay_producer = await self._create_replay_producer()

            async for message in dead_letter_consumer:
                stats["total_dead_letters"] += 1
                
                try:
                    # Parse dead letter payload
                    dead_letter_data = message.value
                    retry_count = dead_letter_data.get("retry_count", 0)
                    original_event_data = dead_letter_data.get("original_event")
                    
                    if retry_count >= max_retry_count:
                        stats["max_retries_exceeded"] += 1
                        continue
                    
                    stats["eligible_for_retry"] += 1
                    
                    # Reconstruct original event
                    original_event = EventContract.from_dict(original_event_data)
                    
                    if dry_run:
                        stats["replayed_events"] += 1
                        logger.debug(f"Would retry event: {original_event.event_id}")
                    else:
                        # Update retry count in metadata
                        updated_metadata = original_event.metadata.copy()
                        updated_metadata["retry_count"] = retry_count + 1
                        updated_metadata["retried_from_dead_letter"] = True
                        
                        # Create new event with updated metadata
                        retry_event = EventContract.create(
                            event_type=original_event.event_type,
                            data=original_event.data,
                            version=original_event.version,
                            correlation_id=original_event.correlation_id,
                            causation_id=original_event.event_id,  # Link to original
                            metadata=updated_metadata
                        )
                        
                        # Replay event
                        await self._replay_single_event(retry_event, target_topic, replay_producer)
                        stats["replayed_events"] += 1
                        logger.info(f"Retried event from dead letter: {original_event.event_id}")

                except Exception as e:
                    stats["failed_events"] += 1
                    logger.error(f"Failed to process dead letter event: {e}")

            logger.info(f"Dead letter replay completed: {stats}")
            return stats

        finally:
            if dead_letter_consumer:
                await dead_letter_consumer.stop()
            if replay_producer:
                await replay_producer.stop()

    async def create_replay_snapshot(
        self,
        topic: str,
        snapshot_topic: str,
        from_timestamp: Optional[datetime] = None,
        to_timestamp: Optional[datetime] = None
    ) -> Dict[str, Any]:
        """
        Create a snapshot of events for replay purposes.
        Useful for creating test datasets or backup replays.
        """
        logger.info(f"Creating replay snapshot from {topic} to {snapshot_topic}")
        
        stats = {
            "total_events": 0,
            "snapshot_events": 0,
            "failed_events": 0
        }

        try:
            source_consumer = await self._create_replay_consumer(topic)
            snapshot_producer = await self._create_replay_producer()

            async for message in source_consumer:
                stats["total_events"] += 1
                
                try:
                    event = self._deserialize_event(message.value)
                    
                    # Apply time filters
                    if from_timestamp or to_timestamp:
                        event_time = datetime.fromisoformat(event.timestamp.replace('Z', '+00:00'))
                        if from_timestamp and event_time < from_timestamp:
                            continue
                        if to_timestamp and event_time > to_timestamp:
                            break
                    
                    # Create snapshot entry
                    snapshot_data = {
                        "original_event": event.to_dict(),
                        "original_topic": topic,
                        "snapshot_created_at": datetime.now(timezone.utc).isoformat(),
                        "original_offset": message.offset,
                        "original_partition": message.partition
                    }
                    
                    # Send to snapshot topic
                    await snapshot_producer.send_and_wait(
                        topic=snapshot_topic,
                        value=snapshot_data,
                        key=event.event_id
                    )
                    
                    stats["snapshot_events"] += 1

                except Exception as e:
                    stats["failed_events"] += 1
                    logger.error(f"Failed to create snapshot for event: {e}")

            logger.info(f"Snapshot creation completed: {stats}")
            return stats

        finally:
            if source_consumer:
                await source_consumer.stop()
            if snapshot_producer:
                await snapshot_producer.stop()

    async def _create_replay_consumer(self, topic: str) -> AIOKafkaConsumer:
        """Create Kafka consumer for replay operations"""
        consumer = AIOKafkaConsumer(
            topic,
            bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
            group_id=f"replay_consumer_{int(datetime.now().timestamp())}",
            value_deserializer=lambda m: self._deserialize_raw_message(m),
            auto_offset_reset='earliest',
            enable_auto_commit=False,
            consumer_timeout_ms=30000  # 30 second timeout
        )
        
        await consumer.start()
        return consumer

    async def _create_replay_producer(self) -> AIOKafkaProducer:
        """Create Kafka producer for replay operations"""
        producer = AIOKafkaProducer(
            bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
            value_serializer=lambda v: self._serialize_event(v),
            acks='all',
            retries=3,
            enable_idempotence=True
        )
        
        await producer.start()
        return producer

    def _deserialize_raw_message(self, message: bytes) -> dict:
        """Deserialize raw Kafka message"""
        import json
        return json.loads(message.decode('utf-8'))

    def _deserialize_event(self, message_data: dict) -> EventContract:
        """Deserialize event from message data"""
        # Handle both direct events and dead letter format
        if "original_event" in message_data:
            # Dead letter format
            return EventContract.from_dict(message_data["original_event"])
        else:
            # Direct event format
            return EventContract.from_dict(message_data)

    def _serialize_event(self, event: EventContract) -> bytes:
        """Serialize event for Kafka"""
        import json
        return json.dumps(event.to_dict(), default=str).encode('utf-8')

    def _should_replay_event(
        self,
        event: EventContract,
        from_timestamp: Optional[datetime],
        to_timestamp: Optional[datetime],
        event_types: Optional[List[str]],
        correlation_ids: Optional[List[str]]
    ) -> bool:
        """Check if event should be replayed based on filters"""
        
        # Time range filter
        if from_timestamp or to_timestamp:
            event_time = datetime.fromisoformat(event.timestamp.replace('Z', '+00:00'))
            if from_timestamp and event_time < from_timestamp:
                return False
            if to_timestamp and event_time > to_timestamp:
                return False
        
        # Event type filter
        if event_types and event.event_type not in event_types:
            return False
        
        # Correlation ID filter
        if correlation_ids and event.correlation_id not in correlation_ids:
            return False
        
        return True

    async def _is_event_already_processed(self, event_id: str) -> bool:
        """Check if event was already processed (idempotency check)"""
        async with AsyncSessionDB() as db:
            from sqlalchemy import text
            result = await db.execute(
                text("SELECT 1 FROM processed_events WHERE event_id = :event_id"),
                {"event_id": event_id}
            )
            return result.fetchone() is not None

    async def _replay_single_event(
        self,
        event: EventContract,
        target_topic: str,
        producer: AIOKafkaProducer
    ):
        """Replay a single event to target topic"""
        await producer.send_and_wait(
            topic=target_topic,
            value=event,
            key=event.event_id
        )

    async def get_replay_statistics(
        self,
        topic: str,
        from_timestamp: Optional[datetime] = None,
        to_timestamp: Optional[datetime] = None
    ) -> Dict[str, Any]:
        """Get statistics about events available for replay"""
        stats = {
            "total_events": 0,
            "event_types": {},
            "date_range": {},
            "correlation_ids": set()
        }

        try:
            consumer = await self._create_replay_consumer(topic)
            
            earliest_timestamp = None
            latest_timestamp = None

            async for message in consumer:
                stats["total_events"] += 1
                
                try:
                    event = self._deserialize_event(message.value)
                    
                    # Count event types
                    event_type = event.event_type
                    stats["event_types"][event_type] = stats["event_types"].get(event_type, 0) + 1
                    
                    # Track date range
                    event_time = datetime.fromisoformat(event.timestamp.replace('Z', '+00:00'))
                    if not earliest_timestamp or event_time < earliest_timestamp:
                        earliest_timestamp = event_time
                    if not latest_timestamp or event_time > latest_timestamp:
                        latest_timestamp = event_time
                    
                    # Collect correlation IDs
                    if event.correlation_id:
                        stats["correlation_ids"].add(event.correlation_id)

                except Exception as e:
                    logger.error(f"Failed to analyze event during statistics: {e}")

            # Convert sets to lists for JSON serialization
            stats["correlation_ids"] = list(stats["correlation_ids"])
            stats["date_range"] = {
                "earliest": earliest_timestamp.isoformat() if earliest_timestamp else None,
                "latest": latest_timestamp.isoformat() if latest_timestamp else None
            }

            return stats

        finally:
            if consumer:
                await consumer.stop()


# Global event replay service instance
event_replay_service = EventReplayService()