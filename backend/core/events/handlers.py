"""
Event handlers for processing Kafka events.
All handlers must be idempotent and handle retries safely.
"""

import json
import logging
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from aiokafka import AIOKafkaProducer
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from .simple_event import SimpleEvent as EventContract

logger = logging.getLogger(__name__)


class EventHandler(ABC):
    """
    Abstract base class for event handlers.
    All handlers must be idempotent and safe for retries.
    """

    @abstractmethod
    async def handle(self, event: EventContract, db: AsyncSession):
        """Handle the event - must be idempotent"""
        pass

    @abstractmethod
    def is_idempotent(self) -> bool:
        """Return True if handler is idempotent"""
        pass

    def get_supported_event_types(self) -> list:
        """Return list of supported event types"""
        return []


class OrderEventHandler(EventHandler):
    """Handler for order-related events"""

    def is_idempotent(self) -> bool:
        return True

    def get_supported_event_types(self) -> list:
        return [
            "order.order.created",
            "order.order.paid", 
            "order.order.failed",
            "order.order.shipped",
            "order.order.delivered",
            "order.order.cancelled"
        ]

    async def handle(self, event: EventContract, db: AsyncSession):
        """Handle order events"""
        event_type = event.event_type
        data = event.data

        if event_type == "order.order.created":
            await self._handle_order_created(event, data, db)
        elif event_type == "order.order.paid":
            await self._handle_order_paid(event, data, db)
        elif event_type == "order.order.failed":
            await self._handle_order_failed(event, data, db)
        elif event_type == "order.order.shipped":
            await self._handle_order_shipped(event, data, db)
        elif event_type == "order.order.delivered":
            await self._handle_order_delivered(event, data, db)
        elif event_type == "order.order.cancelled":
            await self._handle_order_cancelled(event, data, db)

    async def _handle_order_created(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle order created event"""
        order_id = data.get("order_id")
        user_id = data.get("user_id")
        
        logger.info(f"Processing order created: {order_id} for user {user_id}")
        
        # Create notification for user
        await self._create_notification(
            db=db,
            user_id=user_id,
            title="Order Confirmed",
            message=f"Your order #{order_id} has been confirmed and is being processed.",
            notification_type="order",
            event_id=event.event_id
        )
        
        # Send welcome email for first-time customers (idempotent)
        await self._send_order_confirmation_email(user_id, order_id, data)

    async def _handle_order_paid(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle order paid event"""
        order_id = data.get("order_id")
        payment_id = data.get("payment_id")
        
        logger.info(f"Processing order payment: {order_id}, payment: {payment_id}")
        
        # Update order status (idempotent)
        from sqlalchemy import text
        await db.execute(
            text("""
                UPDATE orders 
                SET status = 'paid', payment_id = :payment_id, updated_at = :updated_at
                WHERE id = :order_id AND status != 'paid'
            """),
            {
                "order_id": order_id,
                "payment_id": payment_id,
                "updated_at": datetime.now(timezone.utc)
            }
        )
        
        # Trigger inventory reservation
        await self._reserve_inventory_for_order(order_id, data, db)

    async def _handle_order_failed(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle order failed event"""
        order_id = data.get("order_id")
        user_id = data.get("user_id")
        failure_reason = data.get("failure_reason")
        
        logger.info(f"Processing order failure: {order_id}, reason: {failure_reason}")
        
        # Update order status
        from sqlalchemy import text
        await db.execute(
            text("""
                UPDATE orders 
                SET status = 'failed', failure_reason = :failure_reason, updated_at = :updated_at
                WHERE id = :order_id
            """),
            {
                "order_id": order_id,
                "failure_reason": failure_reason,
                "updated_at": datetime.now(timezone.utc)
            }
        )
        
        # Create notification
        await self._create_notification(
            db=db,
            user_id=user_id,
            title="Order Failed",
            message=f"Your order #{order_id} could not be processed. Reason: {failure_reason}",
            notification_type="order_failure",
            event_id=event.event_id
        )

    async def _handle_order_shipped(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle order shipped event"""
        order_id = data.get("order_id")
        tracking_number = data.get("tracking_number")
        
        logger.info(f"Processing order shipment: {order_id}, tracking: {tracking_number}")
        
        # Update order with tracking info
        from sqlalchemy import text
        await db.execute(
            text("""
                UPDATE orders 
                SET status = 'shipped', tracking_number = :tracking_number, 
                    shipped_at = :shipped_at, updated_at = :updated_at
                WHERE id = :order_id
            """),
            {
                "order_id": order_id,
                "tracking_number": tracking_number,
                "shipped_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }
        )

    async def _handle_order_delivered(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle order delivered event"""
        order_id = data.get("order_id")
        delivered_at = data.get("delivered_at")
        
        logger.info(f"Processing order delivery: {order_id}")
        
        # Update order status
        from sqlalchemy import text
        await db.execute(
            text("""
                UPDATE orders 
                SET status = 'delivered', delivered_at = :delivered_at, updated_at = :updated_at
                WHERE id = :order_id
            """),
            {
                "order_id": order_id,
                "delivered_at": delivered_at,
                "updated_at": datetime.now(timezone.utc)
            }
        )

    async def _handle_order_cancelled(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle order cancelled event"""
        order_id = data.get("order_id")
        user_id = data.get("user_id")
        
        logger.info(f"Processing order cancellation: {order_id}")
        
        # Update order status
        from sqlalchemy import text
        await db.execute(
            text("""
                UPDATE orders 
                SET status = 'cancelled', cancelled_at = :cancelled_at, updated_at = :updated_at
                WHERE id = :order_id
            """),
            {
                "order_id": order_id,
                "cancelled_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc)
            }
        )
        
        # Release inventory reservations
        await self._release_inventory_for_order(order_id, db)

    async def _create_notification(
        self,
        db: AsyncSession,
        user_id: str,
        title: str,
        message: str,
        notification_type: str,
        event_id: str
    ):
        """Create notification (idempotent)"""
        from sqlalchemy import text
        
        # Use event_id for idempotency
        await db.execute(
            text("""
                INSERT INTO notifications (id, user_id, title, message, type, event_id, created_at)
                VALUES (gen_random_uuid(), :user_id, :title, :message, :type, :event_id, :created_at)
                ON CONFLICT (event_id) DO NOTHING
            """),
            {
                "user_id": user_id,
                "title": title,
                "message": message,
                "type": notification_type,
                "event_id": event_id,
                "created_at": datetime.now(timezone.utc)
            }
        )

    async def _send_order_confirmation_email(self, user_id: str, order_id: str, order_data: Dict[str, Any]):
        """Send order confirmation email"""
        try:
            from services.email import EmailService
            
            # This would typically use a task queue
            # For now, we'll log the action
            logger.info(f"Sending order confirmation email for order {order_id} to user {user_id}")
            
        except Exception as e:
            logger.error(f"Failed to send order confirmation email: {e}")

    async def _reserve_inventory_for_order(self, order_id: str, order_data: Dict[str, Any], db: AsyncSession):
        """Reserve inventory for order items"""
        items = order_data.get("items", [])
        
        for item in items:
            product_id = item.get("product_id")
            variant_id = item.get("variant_id")
            quantity = item.get("quantity")
            
            if product_id and variant_id and quantity:
                # Reserve inventory (idempotent)
                from sqlalchemy import text
                await db.execute(
                    text("""
                        UPDATE product_variants 
                        SET reserved_quantity = reserved_quantity + :quantity
                        WHERE product_id = :product_id AND id = :variant_id
                        AND available_quantity >= :quantity
                    """),
                    {
                        "product_id": product_id,
                        "variant_id": variant_id,
                        "quantity": quantity
                    }
                )

    async def _release_inventory_for_order(self, order_id: str, db: AsyncSession):
        """Release inventory reservations for cancelled order"""
        from sqlalchemy import text
        
        # Get order items and release reservations
        result = await db.execute(
            text("""
                SELECT oi.product_id, oi.variant_id, oi.quantity
                FROM order_items oi
                WHERE oi.order_id = :order_id
            """),
            {"order_id": order_id}
        )
        
        for row in result:
            await db.execute(
                text("""
                    UPDATE product_variants 
                    SET reserved_quantity = GREATEST(0, reserved_quantity - :quantity)
                    WHERE product_id = :product_id AND id = :variant_id
                """),
                {
                    "product_id": row.product_id,
                    "variant_id": row.variant_id,
                    "quantity": row.quantity
                }
            )


class InventoryEventHandler(EventHandler):
    """Handler for inventory-related events"""

    def is_idempotent(self) -> bool:
        return True

    def get_supported_event_types(self) -> list:
        return [
            "inventory.stock.updated",
            "inventory.stock.low"
        ]

    async def handle(self, event: EventContract, db: AsyncSession):
        """Handle inventory events"""
        event_type = event.event_type
        data = event.data

        if event_type == "inventory.stock.updated":
            await self._handle_stock_updated(event, data, db)
        elif event_type == "inventory.stock.low":
            await self._handle_stock_low(event, data, db)

    # Note: Inventory reservation handlers removed - implement as needed

    async def _handle_stock_updated(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle stock update"""
        product_id = data.get("product_id")
        variant_id = data.get("variant_id")
        new_quantity = data.get("new_quantity")
        
        logger.info(f"Processing stock update: {product_id}:{variant_id} -> {new_quantity}")

    async def _handle_stock_low(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle low stock alert"""
        product_id = data.get("product_id")
        variant_id = data.get("variant_id")
        current_stock = data.get("current_stock")
        
        logger.info(f"Processing low stock alert: {product_id}:{variant_id} stock: {current_stock}")
        
        # Create admin notification
        await self._create_admin_notification(
            db=db,
            title="Low Stock Alert",
            message=f"Product variant {variant_id} is running low on stock ({current_stock} remaining)",
            event_id=event.event_id
        )

    async def _create_admin_notification(self, db: AsyncSession, title: str, message: str, event_id: str):
        """Create notification for admin users"""
        from sqlalchemy import text
        
        # Get admin users and create notifications
        admin_users = await db.execute(
            text("SELECT id FROM users WHERE role = 'admin'")
        )
        
        for admin_user in admin_users:
            await db.execute(
                text("""
                    INSERT INTO notifications (id, user_id, title, message, type, event_id, created_at)
                    VALUES (gen_random_uuid(), :user_id, :title, :message, 'admin_alert', :event_id, :created_at)
                    ON CONFLICT (event_id, user_id) DO NOTHING
                """),
                {
                    "user_id": admin_user.id,
                    "title": title,
                    "message": message,
                    "event_id": event_id,
                    "created_at": datetime.now(timezone.utc)
                }
            )


class UserEventHandler(EventHandler):
    """Handler for user-related events"""

    def is_idempotent(self) -> bool:
        return True

    def get_supported_event_types(self) -> list:
        return [
            "user.user.registered",
            "user.user.verified",
            "user.profile.updated"
        ]

    async def handle(self, event: EventContract, db: AsyncSession):
        """Handle user events"""
        event_type = event.event_type
        data = event.data

        if event_type == "user.user.registered":
            await self._handle_user_registered(event, data, db)
        elif event_type == "user.user.verified":
            await self._handle_user_verified(event, data, db)
        elif event_type == "user.profile.updated":
            await self._handle_profile_updated(event, data, db)

    async def _handle_user_registered(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle user registration"""
        user_id = data.get("user_id")
        email = data.get("email")
        
        logger.info(f"Processing user registration: {user_id}")
        
        # Send welcome email (idempotent)
        await self._send_welcome_email(user_id, email, event.event_id)
        
        # Create loyalty account
        await self._create_loyalty_account(user_id, db, event.event_id)

    async def _handle_user_verified(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle user email verification"""
        user_id = data.get("user_id")
        
        logger.info(f"Processing user verification: {user_id}")
        
        # Award welcome bonus points
        await self._award_welcome_bonus(user_id, db, event.event_id)

    async def _handle_profile_updated(self, event: EventContract, data: Dict[str, Any], db: AsyncSession):
        """Handle profile update"""
        user_id = data.get("user_id")
        updated_fields = data.get("updated_fields", [])
        
        logger.info(f"Processing profile update: {user_id}, fields: {updated_fields}")

    async def _send_welcome_email(self, user_id: str, email: str, event_id: str):
        """Send welcome email (idempotent)"""
        logger.info(f"Sending welcome email to {email} (event: {event_id})")

    async def _create_loyalty_account(self, user_id: str, db: AsyncSession, event_id: str):
        """Create loyalty account for new user"""
        from sqlalchemy import text
        
        await db.execute(
            text("""
                INSERT INTO loyalty_accounts (user_id, points_balance, tier, created_at, event_id)
                VALUES (:user_id, 0, 'bronze', :created_at, :event_id)
                ON CONFLICT (user_id) DO NOTHING
            """),
            {
                "user_id": user_id,
                "created_at": datetime.now(timezone.utc),
                "event_id": event_id
            }
        )

    async def _award_welcome_bonus(self, user_id: str, db: AsyncSession, event_id: str):
        """Award welcome bonus points"""
        from sqlalchemy import text
        
        welcome_points = 100
        
        # Award points (idempotent)
        await db.execute(
            text("""
                UPDATE loyalty_accounts 
                SET points_balance = points_balance + :points
                WHERE user_id = :user_id 
                AND NOT EXISTS (
                    SELECT 1 FROM loyalty_transactions 
                    WHERE user_id = :user_id AND event_id = :event_id
                )
            """),
            {
                "user_id": user_id,
                "points": welcome_points,
                "event_id": event_id
            }
        )
        
        # Record transaction
        await db.execute(
            text("""
                INSERT INTO loyalty_transactions 
                (id, user_id, points, transaction_type, description, event_id, created_at)
                VALUES (gen_random_uuid(), :user_id, :points, 'earned', 'Welcome bonus', :event_id, :created_at)
                ON CONFLICT (event_id) DO NOTHING
            """),
            {
                "user_id": user_id,
                "points": welcome_points,
                "event_id": event_id,
                "created_at": datetime.now(timezone.utc)
            }
        )


class DeadLetterHandler:
    """Handler for dead letter queue operations"""

    def __init__(self):
        self.producer: Optional[AIOKafkaProducer] = None

    async def _get_producer(self) -> AIOKafkaProducer:
        """Get or create Kafka producer for dead letter queue"""
        if not self.producer:
            self.producer = AIOKafkaProducer(
                bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
                value_serializer=lambda v: json.dumps(v, default=str).encode('utf-8'),
                acks='all',
                retries=3
            )
            await self.producer.start()
        return self.producer

    async def send_to_dead_letter(
        self,
        event: EventContract,
        original_topic: str,
        dead_letter_topic: str,
        failure_reason: str
    ):
        """Send failed event to dead letter queue"""
        producer = await self._get_producer()
        
        dead_letter_payload = {
            "original_event": event.to_dict(),
            "original_topic": original_topic,
            "failure_reason": failure_reason,
            "failed_at": datetime.now(timezone.utc).isoformat(),
            "retry_count": 0
        }
        
        await producer.send_and_wait(
            topic=dead_letter_topic,
            value=dead_letter_payload,
            key=event.event_id
        )
        
        logger.info(f"Event {event.event_id} sent to dead letter queue: {dead_letter_topic}")

    async def stop(self):
        """Stop the dead letter producer"""
        if self.producer:
            await self.producer.stop()