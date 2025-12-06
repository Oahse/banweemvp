"""
Celery tasks for notifications
"""
from celery_app import celery_app
import asyncio
from uuid import UUID
from datetime import datetime, timedelta

from core.config import settings
from core.database import AsyncSessionDB # Use async session
from services.notification import NotificationService # Import NotificationService
from services.inventory import InventoryService # Import InventoryService (to check low stock)
from models.notification import Notification # Still needed for cleanup


@celery_app.task(name='tasks.notification_tasks.create_notification')
def create_notification(user_id: str, message: str, notification_type: str = "info", related_id: str = None):
    """
    Create a notification for a user (ASYNC - uses NotificationService)
    """
    async def _async_create_notification():
        async with AsyncSessionDB() as db:
            notification_service = NotificationService(db)
            await notification_service.create_notification(
                user_id=UUID(user_id),
                message=message,
                type=notification_type,
                related_id=UUID(related_id) if related_id else None
            )
        print(f"✅ Notification created for user {user_id}")

    try:
        asyncio.run(_async_create_notification())
    except Exception as e:
        print(f"❌ Failed to create notification: {e}")
        raise


@celery_app.task(name='tasks.notification_tasks.cleanup_old_notifications')
def cleanup_old_notifications():
    """
    Periodic task to cleanup old notifications (ASYNC - uses NotificationService)
    """
    async def _async_cleanup_notifications():
        async with AsyncSessionDB() as db:
            notification_service = NotificationService(db)
            await notification_service.delete_old_notifications(days_old=settings.NOTIFICATION_CLEANUP_DAYS)
        print(f"✅ Cleaned up old notifications")

    try:
        asyncio.run(_async_cleanup_notifications())
    except Exception as e:
        print(f"❌ Failed to cleanup notifications: {e}")
        raise


@celery_app.task(name='tasks.notification_tasks.check_low_stock_task')
def check_low_stock_task():
    """
    Periodic task to check for low stock inventory items and send notifications.
    """
    async def _async_check_low_stock():
        async with AsyncSessionDB() as db:
            inventory_service = InventoryService(db)
            notification_service = NotificationService(db)
            # Find all inventory items that are low in stock
            low_stock_items = await inventory_service.get_all_inventory_items(page=1, limit=9999, low_stock=True) # Fetch all low stock items

            if low_stock_items and low_stock_items['data']:
                for item in low_stock_items['data']:
                    product_name = item.variant.product.name if item.variant and item.variant.product else "Unknown Product"
                    variant_name = item.variant.name if item.variant else "Unknown Variant"
                    location_name = item.location.name if item.location else "Unknown Location"

                    message = f"Low stock alert! {product_name} ({variant_name}) at {location_name} has {item.quantity} units left (threshold: {item.low_stock_threshold})."
                    
                    # Create in-app notification for admin
                    # For now, let's assume a static admin user ID or get it from settings/DB
                    admin_user_id = UUID(settings.ADMIN_USER_ID) # Assuming ADMIN_USER_ID exists in settings

                    await notification_service.create_notification(
                        user_id=admin_user_id,
                        message=message,
                        type="low_stock",
                        related_id=str(item.id)
                    )
                    
                    # Send email notification for admin
                    # (This will be implemented in EmailService.send_low_stock_alert)
                    # For now, print a message
                    print(f"📧 Sending low stock email for {product_name} to admin.")

    try:
        asyncio.run(_async_check_low_stock())
    except Exception as e:
        print(f"❌ Failed to check low stock: {e}")
        raise