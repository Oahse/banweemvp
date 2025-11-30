"""
Celery tasks for notifications
"""
from celery_app import celery_app, run_async_task, AsyncTask
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, delete
from uuid import UUID
from datetime import datetime, timedelta

from core.config import settings
from models.notification import Notification


# Create async engine for Celery tasks
async_engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    pool_pre_ping=True
)

AsyncSessionLocal = sessionmaker(
    async_engine,
    class_=AsyncSession,
    expire_on_commit=False
)


@celery_app.task(name='tasks.notification_tasks.create_notification', base=AsyncTask)
async def create_notification(user_id: str, message: str, notification_type: str = "info", related_id: str = None):
    """
    Create a notification for a user
    """
    async with AsyncSessionLocal() as db:
        try:
            notification = Notification(
                user_id=UUID(user_id),
                message=message,
                type=notification_type,
                related_id=UUID(related_id) if related_id else None,
                read=False
            )
            db.add(notification)
            await db.commit()
            
            print(f"✅ Notification created for user {user_id}")
            
        except Exception as e:
            print(f"❌ Failed to create notification: {e}")
            raise


@celery_app.task(name='tasks.notification_tasks.cleanup_old_notifications')
def cleanup_old_notifications():
    """
    Periodic task to cleanup old read notifications (older than 30 days)
    """
    async def _cleanup():
        async with AsyncSessionLocal() as db:
            try:
                cutoff_date = datetime.utcnow() - timedelta(days=30)
                
                result = await db.execute(
                    delete(Notification).where(
                        Notification.read == True,
                        Notification.created_at < cutoff_date
                    )
                )
                
                await db.commit()
                deleted_count = result.rowcount
                
                print(f"✅ Cleaned up {deleted_count} old notifications")
                
            except Exception as e:
                print(f"❌ Failed to cleanup notifications: {e}")
    
    return run_async_task(_cleanup())
