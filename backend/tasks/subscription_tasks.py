"""
Background tasks for subscription management
Handles periodic shipment creation and subscription lifecycle
"""
import asyncio
import logging
from datetime import datetime, timedelta
from typing import Dict, Any

from core.database import get_db
from services.subscriptions import SubscriptionSchedulerService
from tasks.email_tasks import email_task_service
from fastapi import BackgroundTasks

logger = logging.getLogger(__name__)


class SubscriptionTaskManager:
    """Manages background tasks for subscription operations"""
    
    def __init__(self):
        self.is_running = False
        self.check_interval_minutes = 60  # Check every hour
        
    async def start_subscription_scheduler(self):
        """Start the subscription shipment scheduler"""
        if self.is_running:
            logger.warning("Subscription scheduler is already running")
            return
        
        self.is_running = True
        logger.info("Starting subscription shipment scheduler")
        
        while self.is_running:
            try:
                await self._process_subscription_shipments()
                await asyncio.sleep(self.check_interval_minutes * 60)  # Convert to seconds
            except Exception as e:
                logger.error(f"Error in subscription scheduler: {e}")
                await asyncio.sleep(300)  # Wait 5 minutes before retrying
    
    def stop_subscription_scheduler(self):
        """Stop the subscription scheduler"""
        self.is_running = False
        logger.info("Subscription scheduler stopped")
    
    async def _process_subscription_shipments(self):
        """Process subscriptions due for shipment"""
        async for db in get_db():
            try:
                scheduler = SubscriptionSchedulerService(db)
                result = await scheduler.process_due_subscriptions()
                
                logger.info(f"Subscription processing result: {result}")
                
                # Send summary email to admin if there were failures
                if result["failed_count"] > 0:
                    await self._send_admin_failure_notification(result)
                
            except Exception as e:
                logger.error(f"Error processing subscription shipments: {e}")
            finally:
                await db.close()
    
    async def _send_admin_failure_notification(self, result: Dict[str, Any]):
        """Send notification to admin about subscription processing failures"""
        try:
            # This would send an email to admin about failures
            logger.warning(f"Subscription processing had {result['failed_count']} failures")
            # TODO: Implement admin notification email
        except Exception as e:
            logger.error(f"Failed to send admin notification: {e}")


# Global instance
subscription_task_manager = SubscriptionTaskManager()


# Task functions for FastAPI BackgroundTasks
def process_subscription_renewal(
    background_tasks: BackgroundTasks,
    subscription_id: str,
    user_email: str,
    user_name: str
):
    """Process subscription renewal and send confirmation"""
    background_tasks.add_task(_handle_subscription_renewal, subscription_id, user_email, user_name)


async def _handle_subscription_renewal(subscription_id: str, user_email: str, user_name: str):
    """Handle subscription renewal process"""
    try:
        async for db in get_db():
            try:
                scheduler = SubscriptionSchedulerService(db)
                # Process specific subscription
                # This could be enhanced to handle individual subscription processing
                logger.info(f"Processing renewal for subscription {subscription_id}")
                
                # Send renewal confirmation email
                email_data = {
                    "to_email": user_email,
                    "mail_type": "subscription_renewal",
                    "context": {
                        "customer_name": user_name,
                        "subscription_id": subscription_id,
                        "renewal_date": datetime.utcnow(),
                        "company_name": "Banwee",
                        "support_email": "support@banwee.com"
                    }
                }
                
                await email_task_service._send_email_direct(email_data)
                
            finally:
                await db.close()
                
    except Exception as e:
        logger.error(f"Failed to process subscription renewal {subscription_id}: {e}")


def send_subscription_shipment_notification(
    background_tasks: BackgroundTasks,
    user_email: str,
    user_name: str,
    order_number: str,
    tracking_number: str = None
):
    """Send shipment notification for subscription order"""
    email_data = {
        "to_email": user_email,
        "mail_type": "subscription_shipment",
        "context": {
            "customer_name": user_name,
            "order_number": order_number,
            "tracking_number": tracking_number,
            "shipment_date": datetime.utcnow(),
            "company_name": "Banwee",
            "support_email": "support@banwee.com"
        }
    }
    
    background_tasks.add_task(email_task_service._send_email_direct, email_data)


def send_subscription_pause_notification(
    background_tasks: BackgroundTasks,
    user_email: str,
    user_name: str,
    subscription_id: str,
    pause_reason: str = None
):
    """Send notification when subscription is paused"""
    email_data = {
        "to_email": user_email,
        "mail_type": "subscription_paused",
        "context": {
            "customer_name": user_name,
            "subscription_id": subscription_id,
            "pause_reason": pause_reason or "User requested",
            "pause_date": datetime.utcnow(),
            "company_name": "Banwee",
            "support_email": "support@banwee.com"
        }
    }
    
    background_tasks.add_task(email_task_service._send_email_direct, email_data)


def send_subscription_resume_notification(
    background_tasks: BackgroundTasks,
    user_email: str,
    user_name: str,
    subscription_id: str,
    next_shipment_date: datetime
):
    """Send notification when subscription is resumed"""
    email_data = {
        "to_email": user_email,
        "mail_type": "subscription_resumed",
        "context": {
            "customer_name": user_name,
            "subscription_id": subscription_id,
            "resume_date": datetime.utcnow(),
            "next_shipment_date": next_shipment_date,
            "company_name": "Banwee",
            "support_email": "support@banwee.com"
        }
    }
    
    background_tasks.add_task(email_task_service._send_email_direct, email_data)