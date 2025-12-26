"""
Event service for publishing business events using the new event-driven architecture.
This service provides a clean interface for other services to publish events.
"""

import logging
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from uuid import UUID

from core.events import EventProducer
from core.events.replay import event_replay_service

logger = logging.getLogger(__name__)


class EventService:
    """
    Service for publishing business events with proper event contracts.
    All events are immutable, versioned, and follow strict schema validation.
    """

    def __init__(self):
        self.producer = EventProducer()

    # Order Events
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
        try:
            event_id = await self.producer.publish_order_created(
                order_id=order_id,
                user_id=user_id,
                amount=amount,
                currency=currency,
                items=items or [],
                shipping_address=shipping_address or {},
                payment_method=payment_method,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published order.created event: {event_id} for order {order_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish order.created event for order {order_id}: {e}")
            raise

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
        try:
            event_id = await self.producer.publish_order_paid(
                order_id=order_id,
                payment_id=payment_id,
                amount=amount,
                currency=currency,
                payment_method=payment_method,
                transaction_fee=transaction_fee,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published order.paid event: {event_id} for order {order_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish order.paid event for order {order_id}: {e}")
            raise

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
        try:
            event_id = await self.producer.publish_order_failed(
                order_id=order_id,
                user_id=user_id,
                failure_reason=failure_reason,
                error_code=error_code,
                retry_count=retry_count,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published order.failed event: {event_id} for order {order_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish order.failed event for order {order_id}: {e}")
            raise

    # Note: Inventory Events removed - implement as needed if required

    async def publish_stock_low_alert(
        self,
        product_id: str,
        variant_id: str,
        current_stock: int,
        threshold: int,
        supplier_id: Optional[str] = None,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish stock low alert event"""
        try:
            event_id = await self.producer.publish_event(
                event_type="inventory.stock.low",
                data={
                    "product_id": product_id,
                    "variant_id": variant_id,
                    "current_stock": current_stock,
                    "threshold": threshold,
                    "supplier_id": supplier_id
                },
                key=f"{product_id}:{variant_id}",
                correlation_id=correlation_id
            )
            
            logger.info(f"Published inventory.stock.low event: {event_id} for {product_id}:{variant_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish inventory.stock.low event: {e}")
            raise

    # User Events
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
        try:
            event_id = await self.producer.publish_user_registered(
                user_id=user_id,
                email=email,
                username=username,
                registration_source=registration_source,
                email_verified=email_verified,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published user.registered event: {event_id} for user {user_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish user.registered event for user {user_id}: {e}")
            raise

    async def publish_user_verified(
        self,
        user_id: str,
        email: str,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish user verified event"""
        try:
            event_id = await self.producer.publish_event(
                event_type="user.user.verified",
                data={
                    "user_id": user_id,
                    "email": email,
                    "verified_at": datetime.now(timezone.utc).isoformat()
                },
                key=user_id,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published user.verified event: {event_id} for user {user_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish user.verified event for user {user_id}: {e}")
            raise

    # Payment Events
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
        try:
            event_id = await self.producer.publish_payment_succeeded(
                payment_id=payment_id,
                order_id=order_id,
                transaction_id=transaction_id,
                amount=amount,
                currency=currency,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published payment.succeeded event: {event_id} for payment {payment_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish payment.succeeded event for payment {payment_id}: {e}")
            raise

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
        try:
            event_id = await self.producer.publish_payment_failed(
                payment_id=payment_id,
                order_id=order_id,
                user_id=user_id,
                failure_reason=failure_reason,
                error_code=error_code,
                retry_allowed=retry_allowed,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published payment.failed event: {event_id} for payment {payment_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish payment.failed event for payment {payment_id}: {e}")
            raise

    # Cart Events
    async def publish_cart_item_added(
        self,
        user_id: str,
        product_id: str,
        variant_id: str,
        quantity: int,
        price: float,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish cart item added event"""
        try:
            event_id = await self.producer.publish_event(
                event_type="cart.item.added",
                data={
                    "user_id": user_id,
                    "product_id": product_id,
                    "variant_id": variant_id,
                    "quantity": quantity,
                    "price": price
                },
                key=user_id,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published cart.item.added event: {event_id} for user {user_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish cart.item.added event: {e}")
            raise

    async def publish_cart_abandoned(
        self,
        user_id: str,
        cart_value: float,
        items_count: int,
        last_activity: str,
        correlation_id: Optional[str] = None
    ) -> str:
        """Publish cart abandoned event"""
        try:
            event_id = await self.producer.publish_event(
                event_type="cart.cart.abandoned",
                data={
                    "user_id": user_id,
                    "cart_value": cart_value,
                    "items_count": items_count,
                    "last_activity": last_activity
                },
                key=user_id,
                correlation_id=correlation_id
            )
            
            logger.info(f"Published cart.abandoned event: {event_id} for user {user_id}")
            return event_id
            
        except Exception as e:
            logger.error(f"Failed to publish cart.abandoned event: {e}")
            raise

    # Event Replay Methods
    async def replay_events_for_order(
        self,
        order_id: str,
        from_timestamp: Optional[datetime] = None,
        to_timestamp: Optional[datetime] = None,
        dry_run: bool = False
    ) -> Dict[str, Any]:
        """Replay all events for a specific order"""
        try:
            # Find events by correlation ID (assuming order_id is used as correlation_id)
            stats = await event_replay_service.replay_events_by_correlation_id(
                correlation_id=order_id,
                source_topic="order.order.created",  # Start with order events
                dry_run=dry_run
            )
            
            logger.info(f"Replayed events for order {order_id}: {stats}")
            return stats
            
        except Exception as e:
            logger.error(f"Failed to replay events for order {order_id}: {e}")
            raise

    async def replay_failed_events(
        self,
        event_type: str,
        max_retry_count: int = 3,
        dry_run: bool = False
    ) -> Dict[str, Any]:
        """Replay failed events from dead letter queue"""
        try:
            # Determine dead letter topic
            dead_letter_topic = f"{event_type}.dead_letter"
            target_topic = event_type
            
            stats = await event_replay_service.replay_failed_events_from_dead_letter(
                dead_letter_topic=dead_letter_topic,
                target_topic=target_topic,
                max_retry_count=max_retry_count,
                dry_run=dry_run
            )
            
            logger.info(f"Replayed failed events for {event_type}: {stats}")
            return stats
            
        except Exception as e:
            logger.error(f"Failed to replay failed events for {event_type}: {e}")
            raise

    async def get_event_statistics(self, topic: str) -> Dict[str, Any]:
        """Get statistics about events in a topic"""
        try:
            stats = await event_replay_service.get_replay_statistics(topic)
            return stats
            
        except Exception as e:
            logger.error(f"Failed to get event statistics for {topic}: {e}")
            raise


# Global event service instance
event_service = EventService()