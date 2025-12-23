"""
Kafka consumer tasks for notifications
"""
import logging
from uuid import UUID
from datetime import datetime, timedelta

from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from models.notification import Notification # Still needed for cleanup

logger = logging.getLogger(__name__)


async def create_notification(db: AsyncSession, user_id: str, message: str, notification_type: str = "info", related_id: str = None):
    """
    Create a notification for a user (ASYNC - uses NotificationService)
    """
    try:
        from services.notification import EnhancedNotificationService  # Import locally to avoid circular import
        notification_service = EnhancedNotificationService(db)
        await notification_service.create_notification(
            user_id=user_id,
            message=message,
            type=notification_type,
            related_id=related_id
        )
        logger.info(f"✅ Notification created for user {user_id}")
    except Exception as e:
        logger.error(f"❌ Failed to create notification for user {user_id}: {e}")
        raise


async def cleanup_old_notifications(db: AsyncSession):
    """
    Periodic task to cleanup old notifications (ASYNC - uses NotificationService)
    """
    try:
        from services.notification import EnhancedNotificationService  # Import locally to avoid circular import
        notification_service = EnhancedNotificationService(db)
        await notification_service.delete_old_notifications(days_old=settings.NOTIFICATION_CLEANUP_DAYS)
        logger.info(f"✅ Cleaned up old notifications")
    except Exception as e:
        logger.error(f"❌ Failed to cleanup notifications: {e}")
        raise


async def check_low_stock_task(db: AsyncSession):
    """
    Periodic task to check for low stock inventory items and send notifications.
    """
    try:
        from services.inventory import InventoryService  # Import locally to avoid circular import
        from services.notification import EnhancedNotificationService  # Import locally to avoid circular import
        from services.email import EmailService  # Import locally to avoid circular import
        
        inventory_service = InventoryService(db)
        notification_service = EnhancedNotificationService(db)
        email_service = EmailService(db)

        # Find all inventory items that are low in stock
        low_stock_items = await inventory_service.get_all_inventory_items(page=1, limit=9999, low_stock=True)

        if low_stock_items and low_stock_items['data']:
            for item in low_stock_items['data']:
                product_name = item.variant.product.name if item.variant and item.variant.product else "Unknown Product"
                variant_name = item.variant.name if item.variant else "Unknown Variant"
                location_name = item.location.name if item.location else "Unknown Location"

                message = f"Low stock alert! {product_name} ({variant_name}) at {location_name} has {item.quantity} units left (threshold: {item.low_stock_threshold})."
                
                # Create in-app notification for admin
                admin_user_id = UUID(settings.ADMIN_USER_ID)

                await notification_service.create_notification(
                    user_id=str(admin_user_id),
                    message=message,
                    type="low_stock",
                    related_id=str(item.id)
                )
                
                # Send email notification for admin
                await email_service.send_low_stock_alert(
                    recipient_email="admin@banwee.com",
                    product_name=product_name,
                    variant_name=variant_name,
                    location_name=location_name,
                    current_stock=item.quantity,
                    threshold=item.low_stock_threshold
                )
                logger.info(f"📧 Low stock alert email dispatched for {product_name} to admin.")
    except Exception as e:
        logger.error(f"❌ Failed to check low stock: {e}")
        raise
