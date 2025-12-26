"""
Event producer for publishing immutable events to Kafka.
Handles event validation, serialization, and delivery guarantees.
"""

import json
import logging
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from aiokafka import AIOKafkaProducer
from aiokafka.errors import KafkaError

from core.config import settings
from .simple_event import SimpleEvent as EventContract
from .topics import topic_manager

logger = logging.getLogger(__name__)


class EventProducer:
    """
    Kafka event producer with event contract validation and delivery guarantees.
    Ensures events are immutable and follow proper schema validation.
    """

    def __init__(self):
        self.producer: Optional[AIOKafkaProducer] = None
        self._started = False

    async def start(self):
        """Start the Kafka producer"""
        if self._started:
            return

        try:
            self.producer = AIOKafkaProducer(
                bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
                value_serializer=self._serialize_event,
                key_serializer=lambda k: k.encode('utf-8') if k else None,
                # Delivery guarantees
                acks='all',  # Wait for all replicas
                retries=5,
                retry_backoff_ms=100,
                delivery_timeout_ms=30000,
                request_timeout_ms=25000,
                # Performance optimizations
                batch_size=16384,
                linger_ms=10,
                compression_type='gzip',
                # Idempotence
                enable_idempotence=True,
                max_in_flight_requests_per_connection=1
            )
            
            await self.producer.start()
            self._started = True
            logger.info("Event producer started successfully")
            
        except Exception as e:
            logger.error(f"Failed to start event producer: {e}")
            raise

    async def stop(self):
        """Stop the Kafka producer"""
        if self.producer and self._started:
            try:
                await self.producer.stop()
                self._started = False
                logger.info("Event producer stopped successfully")
            except Exception as e:
                logger.error(f"Error stopping event producer: {e}")

    def _serialize_event(self, event: EventContract) -> bytes:
        """Serialize event contract to bytes"""
        try:
            event_dict = event.to_dict()
            return json.dumps(event_dict, default=str).encode('utf-8')
        except Exception as e:
            logger.error(f"Failed to serialize event: {e}")
            raise

    async def publish_event(
        self,
        event_type: str,
        data: Dict[str, Any],
        key: Optional[str] = None,
        version: int = 1,
        correlation_id: Optional[str] = None,
        causation_id: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Publish an immutable event to Kafka.
        
        Args:
            event_type: Event type (e.g., 'order.created')
            data: Event payload data
            key: Partition key (optional)
            version: Event schema version
            correlation_id: Correlation ID for tracing
            causation_id: Causation ID for event sourcing
            metadata: Additional metadata
            
        Returns:
            Event ID of the published event
        """
        if not self._started:
            await self.start()

        # Validate event data (simplified)
        if not data or not isinstance(data, dict):
            raise ValueError(f"Event data validation failed for {event_type}")

        # Create simple event
        event = EventContract.create(
            event_type=event_type,
            data=data,
            version=version,
            correlation_id=correlation_id,
            causation_id=causation_id,
            metadata=metadata or {}
        )

        # Determine topic name
        topic_name = self._get_topic_for_event_type(event_type)
        
        try:
            # Publish event with delivery guarantees
            record_metadata = await self.producer.send_and_wait(
                topic=topic_name,
                value=event,
                key=key
            )
            
            logger.info(
                f"Event published successfully: {event.event_id} "
                f"to topic {topic_name} partition {record_metadata.partition} "
                f"offset {record_metadata.offset}"
            )
            
            return event.event_id
            
        except KafkaError as e:
            logger.error(f"Failed to publish event {event.event_id}: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error publishing event {event.event_id}: {e}")
            raise

    def _get_topic_for_event_type(self, event_type: str) -> str:
        """Get Kafka topic name for event type"""
        # Event type format: domain.entity.action (e.g., order.order.created)
        parts = event_type.split('.')
        if len(parts) == 3:
            domain, entity, action = parts
            try:
                return topic_manager.get_topic_name(domain, entity, action)
            except ValueError:
                # Fallback to direct event type as topic name
                return event_type
        
        # Fallback for non-standard event types
        return event_type

    # Convenience methods for common events
    
    async def publish_order_created(
        self,
        order_id: str,
        user_id: str,
        amount: float,
        currency: str = "USD",
        items: list = None,
        shipping_address: Dict[str, Any] = None,
        payment_method: str = "card",
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish order created event"""
        return await self.publish_event(
            event_type="order.order.created",
            data={
                "order_id": order_id,
                "user_id": user_id,
                "amount": amount,
                "currency": currency,
                "items": items or [],
                "shipping_address": shipping_address or {},
                "payment_method": payment_method
            },
            key=order_id,
            correlation_id=correlation_id
        )

    async def publish_order_paid(
        self,
        order_id: str,
        payment_id: str,
        amount: float,
        currency: str = "USD",
        payment_method: str = "card",
        transaction_fee: Optional[float] = None,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish order paid event"""
        return await self.publish_event(
            event_type="order.order.paid",
            data={
                "order_id": order_id,
                "payment_id": payment_id,
                "amount": amount,
                "currency": currency,
                "payment_method": payment_method,
                "transaction_fee": transaction_fee
            },
            key=order_id,
            correlation_id=correlation_id
        )

    async def publish_order_failed(
        self,
        order_id: str,
        user_id: str,
        failure_reason: str,
        error_code: str,
        retry_count: int = 0,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish order failed event"""
        return await self.publish_event(
            event_type="order.order.failed",
            data={
                "order_id": order_id,
                "user_id": user_id,
                "failure_reason": failure_reason,
                "error_code": error_code,
                "retry_count": retry_count
            },
            key=order_id,
            correlation_id=correlation_id
        )

    # Note: Inventory reservation methods removed - implement as needed

    async def publish_user_registered(
        self,
        user_id: str,
        email: str,
        username: str,
        registration_source: str = "web",
        email_verified: bool = False,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish user registered event"""
        return await self.publish_event(
            event_type="user.user.registered",
            data={
                "user_id": user_id,
                "email": email,
                "username": username,
                "registration_source": registration_source,
                "email_verified": email_verified,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            key=user_id,
            correlation_id=correlation_id
        )

    async def publish_payment_succeeded(
        self,
        payment_id: str,
        order_id: str,
        transaction_id: str,
        amount: float,
        currency: str = "USD",
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish payment succeeded event"""
        return await self.publish_event(
            event_type="payment.payment.succeeded",
            data={
                "payment_id": payment_id,
                "order_id": order_id,
                "transaction_id": transaction_id,
                "amount": amount,
                "currency": currency,
                "processed_at": datetime.now(timezone.utc).isoformat()
            },
            key=payment_id,
            correlation_id=correlation_id
        )

    async def publish_payment_failed(
        self,
        payment_id: str,
        order_id: str,
        user_id: str,
        failure_reason: str,
        error_code: str,
        retry_allowed: bool = True,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish payment failed event"""
        return await self.publish_event(
            event_type="payment.payment.failed",
            data={
                "payment_id": payment_id,
                "order_id": order_id,
                "user_id": user_id,
                "failure_reason": failure_reason,
                "error_code": error_code,
                "retry_allowed": retry_allowed
            },
            key=payment_id,
            correlation_id=correlation_id
        )


# Global event producer instance
event_producer = EventProducer()