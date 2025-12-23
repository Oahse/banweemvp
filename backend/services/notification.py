import json
from typing import List, Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, or_
from sqlalchemy.orm import selectinload
from datetime import datetime, timedelta, UTC
from sqlalchemy import delete
from uuid import UUID
import logging

from models.notification import Notification
from models.notification_preference import NotificationPreference, NotificationHistory
from models.user import User
from models.subscription import Subscription
from models.product import ProductVariant
from core.exceptions import APIException
from routes.websockets import manager as websocket_manager
from core.config import settings
from services.email import EmailService

logger = logging.getLogger(__name__)


class EnhancedNotificationService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.email_service = EmailService(db)

    async def _send_websocket_notification(self, notification: Notification, event_type: str = "notification_update"):
        """Sends a notification to the user's active WebSocket connections."""
        if not notification.user_id:
            return

        websocket_message = {
            "type": event_type,
            "notification": {
                "id": str(notification.id),
                "user_id": str(notification.user_id),
                "message": notification.message,
                "read": notification.read,
                "type": notification.type,
                "related_id": notification.related_id,
                "created_at": notification.created_at.isoformat(),
                "updated_at": notification.updated_at.isoformat() if notification.updated_at else None,
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        await websocket_manager.send_to_user(str(notification.user_id), json.dumps(websocket_message))

    async def _get_user_preferences(self, user_id: UUID) -> NotificationPreference:
        """Get user notification preferences, create default if not exists"""
        result = await self.db.execute(
            select(NotificationPreference).where(NotificationPreference.user_id == user_id)
        )
        preferences = result.scalar_one_or_none()
        
        if not preferences:
            # Create default preferences
            preferences = NotificationPreference(user_id=user_id)
            self.db.add(preferences)
            await self.db.commit()
            await self.db.refresh(preferences)
        
        return preferences

    async def _log_notification_history(
        self,
        user_id: UUID,
        notification_id: UUID = None,
        channel: str = "inapp",
        notification_type: str = "general",
        subject: str = None,
        message: str = "",
        status: str = "sent",
        metadata: Dict[str, Any] = None
    ) -> NotificationHistory:
        """Log notification to history"""
        history = NotificationHistory(
            user_id=user_id,
            notification_id=notification_id,
            channel=channel,
            notification_type=notification_type,
            subject=subject,
            message=message,
            status=status,
            metadata=metadata or {}
        )
        self.db.add(history)
        await self.db.commit()
        await self.db.refresh(history)
        return history

    async def send_multi_channel_notification(
        self,
        user_id: UUID,
        notification_type: str,
        subject: str,
        message: str,
        related_id: str = None,
        metadata: Dict[str, Any] = None,
        channels: List[str] = None
    ) -> Dict[str, bool]:
        """Send notification through multiple channels based on user preferences"""
        preferences = await self._get_user_preferences(user_id)
        results = {}
        
        # Default to all channels if none specified
        if channels is None:
            channels = ["inapp", "email", "push", "sms"]
        
        # In-app notification (always send if enabled)
        if "inapp" in channels and preferences.inapp_enabled:
            if self._should_send_inapp_notification(preferences, notification_type):
                try:
                    notification = await self.create_notification(
                        user_id=str(user_id),
                        message=message,
                        type=notification_type,
                        related_id=related_id
                    )
                    await self._log_notification_history(
                        user_id=user_id,
                        notification_id=notification.id,
                        channel="inapp",
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        status="sent",
                        metadata=metadata
                    )
                    results["inapp"] = True
                except Exception as e:
                    logger.error(f"Failed to send in-app notification: {e}")
                    results["inapp"] = False
            else:
                results["inapp"] = False
        
        # Email notification
        if "email" in channels and preferences.email_enabled:
            if self._should_send_email_notification(preferences, notification_type):
                try:
                    await self._send_email_notification(
                        user_id=user_id,
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        metadata=metadata
                    )
                    await self._log_notification_history(
                        user_id=user_id,
                        channel="email",
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        status="sent",
                        metadata=metadata
                    )
                    results["email"] = True
                except Exception as e:
                    logger.error(f"Failed to send email notification: {e}")
                    await self._log_notification_history(
                        user_id=user_id,
                        channel="email",
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        status="failed",
                        metadata={**(metadata or {}), "error": str(e)}
                    )
                    results["email"] = False
            else:
                results["email"] = False
        
        # Push notification
        if "push" in channels and preferences.push_enabled:
            if self._should_send_push_notification(preferences, notification_type):
                try:
                    await self._send_push_notification(
                        user_id=user_id,
                        subject=subject,
                        message=message,
                        metadata=metadata,
                        device_tokens=preferences.device_tokens
                    )
                    await self._log_notification_history(
                        user_id=user_id,
                        channel="push",
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        status="sent",
                        metadata=metadata
                    )
                    results["push"] = True
                except Exception as e:
                    logger.error(f"Failed to send push notification: {e}")
                    await self._log_notification_history(
                        user_id=user_id,
                        channel="push",
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        status="failed",
                        metadata={**(metadata or {}), "error": str(e)}
                    )
                    results["push"] = False
            else:
                results["push"] = False
        
        # SMS notification
        if "sms" in channels and preferences.sms_enabled and preferences.phone_number:
            if self._should_send_sms_notification(preferences, notification_type):
                try:
                    await self._send_sms_notification(
                        phone_number=preferences.phone_number,
                        message=message,
                        metadata=metadata
                    )
                    await self._log_notification_history(
                        user_id=user_id,
                        channel="sms",
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        status="sent",
                        metadata=metadata
                    )
                    results["sms"] = True
                except Exception as e:
                    logger.error(f"Failed to send SMS notification: {e}")
                    await self._log_notification_history(
                        user_id=user_id,
                        channel="sms",
                        notification_type=notification_type,
                        subject=subject,
                        message=message,
                        status="failed",
                        metadata={**(metadata or {}), "error": str(e)}
                    )
                    results["sms"] = False
            else:
                results["sms"] = False
        
        return results

    def _should_send_inapp_notification(self, preferences: NotificationPreference, notification_type: str) -> bool:
        """Check if in-app notification should be sent based on preferences"""
        if not preferences.inapp_enabled:
            return False
        
        type_mapping = {
            "subscription_change": preferences.inapp_subscription_changes,
            "payment_confirmation": preferences.inapp_payment_confirmations,
            "payment_failure": preferences.inapp_payment_failures,
            "variant_unavailable": preferences.inapp_variant_unavailable,
        }
        
        return type_mapping.get(notification_type, True)

    def _should_send_email_notification(self, preferences: NotificationPreference, notification_type: str) -> bool:
        """Check if email notification should be sent based on preferences"""
        if not preferences.email_enabled:
            return False
        
        type_mapping = {
            "subscription_change": preferences.email_subscription_changes,
            "payment_confirmation": preferences.email_payment_confirmations,
            "payment_failure": preferences.email_payment_failures,
            "variant_unavailable": preferences.email_variant_unavailable,
            "promotional": preferences.email_promotional,
        }
        
        return type_mapping.get(notification_type, True)

    def _should_send_push_notification(self, preferences: NotificationPreference, notification_type: str) -> bool:
        """Check if push notification should be sent based on preferences"""
        if not preferences.push_enabled:
            return False
        
        type_mapping = {
            "subscription_change": preferences.push_subscription_changes,
            "payment_confirmation": preferences.push_payment_confirmations,
            "payment_failure": preferences.push_payment_failures,
            "variant_unavailable": preferences.push_variant_unavailable,
        }
        
        return type_mapping.get(notification_type, True)

    def _should_send_sms_notification(self, preferences: NotificationPreference, notification_type: str) -> bool:
        """Check if SMS notification should be sent based on preferences"""
        if not preferences.sms_enabled:
            return False
        
        type_mapping = {
            "payment_failure": preferences.sms_payment_failures,
            "urgent_alert": preferences.sms_urgent_alerts,
        }
        
        return type_mapping.get(notification_type, False)

    async def _send_email_notification(
        self,
        user_id: UUID,
        notification_type: str,
        subject: str,
        message: str,
        metadata: Dict[str, Any] = None
    ):
        """Send email notification using EmailService"""
        metadata = metadata or {}
        
        if notification_type == "subscription_change":
            await self.email_service.send_subscription_cost_change_notification(
                user_id=user_id,
                subscription_id=UUID(metadata.get("subscription_id")),
                old_cost=metadata.get("old_cost", 0),
                new_cost=metadata.get("new_cost", 0),
                change_reason=metadata.get("change_reason", "Unknown")
            )
        elif notification_type == "payment_confirmation":
            await self.email_service.send_payment_confirmation(
                user_id=user_id,
                subscription_id=UUID(metadata.get("subscription_id")),
                payment_amount=metadata.get("payment_amount", 0),
                payment_method=metadata.get("payment_method", "Unknown"),
                cost_breakdown=metadata.get("cost_breakdown", {})
            )
        elif notification_type == "payment_failure":
            await self.email_service.send_payment_failure_notification(
                user_id=user_id,
                subscription_id=UUID(metadata.get("subscription_id")),
                failure_reason=metadata.get("failure_reason", "Unknown"),
                retry_url=metadata.get("retry_url", "")
            )
        else:
            # Generic email notification - would need template
            logger.info(f"Generic email notification not implemented for type: {notification_type}")

    async def _send_push_notification(
        self,
        user_id: UUID,
        subject: str,
        message: str,
        metadata: Dict[str, Any] = None,
        device_tokens: List[str] = None
    ):
        """Send push notification to user's devices"""
        if not device_tokens:
            logger.info(f"No device tokens for user {user_id}")
            return
        
        # This would integrate with a push notification service like FCM or APNs
        # For now, we'll log the notification
        logger.info(f"Push notification sent to {len(device_tokens)} devices for user {user_id}: {subject}")
        
        # In a real implementation, you would:
        # 1. Use Firebase Cloud Messaging (FCM) for Android
        # 2. Use Apple Push Notification service (APNs) for iOS
        # 3. Handle device token validation and cleanup
        
        # Example FCM integration would look like:
        # from firebase_admin import messaging
        # 
        # for token in device_tokens:
        #     message = messaging.Message(
        #         notification=messaging.Notification(
        #             title=subject,
        #             body=message
        #         ),
        #         token=token,
        #         data=metadata or {}
        #     )
        #     try:
        #         response = messaging.send(message)
        #         logger.info(f"Push notification sent successfully: {response}")
        #     except Exception as e:
        #         logger.error(f"Failed to send push notification: {e}")

    async def _send_sms_notification(
        self,
        phone_number: str,
        message: str,
        metadata: Dict[str, Any] = None
    ):
        """Send SMS notification"""
        # This would integrate with an SMS service like Twilio
        # For now, we'll log the notification
        logger.info(f"SMS notification sent to {phone_number}: {message}")
        
        # In a real implementation, you would:
        # 1. Use Twilio, AWS SNS, or similar SMS service
        # 2. Handle phone number validation
        # 3. Manage SMS delivery status
        
        # Example Twilio integration would look like:
        # from twilio.rest import Client
        # 
        # client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        # try:
        #     message = client.messages.create(
        #         body=message,
        #         from_=settings.TWILIO_PHONE_NUMBER,
        #         to=phone_number
        #     )
        #     logger.info(f"SMS sent successfully: {message.sid}")
        # except Exception as e:
        #     logger.error(f"Failed to send SMS: {e}")

    # Specific notification methods for subscription and payment events
    async def notify_subscription_cost_change(
        self,
        user_id: UUID,
        subscription_id: UUID,
        old_cost: float,
        new_cost: float,
        change_reason: str
    ):
        """Send notification when subscription cost changes"""
        cost_diff = new_cost - old_cost
        cost_change_text = "increased" if cost_diff > 0 else "decreased"
        
        subject = f"Subscription Cost {cost_change_text.title()}"
        message = f"Your subscription cost has {cost_change_text} from ${old_cost:.2f} to ${new_cost:.2f} due to {change_reason}"
        
        metadata = {
            "subscription_id": str(subscription_id),
            "old_cost": old_cost,
            "new_cost": new_cost,
            "change_reason": change_reason,
            "cost_difference": cost_diff
        }
        
        await self.send_multi_channel_notification(
            user_id=user_id,
            notification_type="subscription_change",
            subject=subject,
            message=message,
            related_id=str(subscription_id),
            metadata=metadata
        )

    async def notify_payment_success(
        self,
        user_id: UUID,
        subscription_id: UUID,
        payment_amount: float,
        payment_method: str,
        cost_breakdown: Dict[str, Any]
    ):
        """Send notification when payment succeeds"""
        subject = "Payment Confirmation"
        message = f"Your payment of ${payment_amount:.2f} for subscription has been processed successfully"
        
        metadata = {
            "subscription_id": str(subscription_id),
            "payment_amount": payment_amount,
            "payment_method": payment_method,
            "cost_breakdown": cost_breakdown
        }
        
        await self.send_multi_channel_notification(
            user_id=user_id,
            notification_type="payment_confirmation",
            subject=subject,
            message=message,
            related_id=str(subscription_id),
            metadata=metadata
        )

    async def notify_payment_failure(
        self,
        user_id: UUID,
        subscription_id: UUID,
        failure_reason: str,
        retry_url: str = None
    ):
        """Send notification when payment fails"""
        subject = "Payment Failed"
        message = f"Your subscription payment failed: {failure_reason}. Please update your payment method."
        
        metadata = {
            "subscription_id": str(subscription_id),
            "failure_reason": failure_reason,
            "retry_url": retry_url or f"{settings.FRONTEND_URL}/account/subscriptions/{subscription_id}"
        }
        
        # Payment failures should be sent via all channels for urgency
        await self.send_multi_channel_notification(
            user_id=user_id,
            notification_type="payment_failure",
            subject=subject,
            message=message,
            related_id=str(subscription_id),
            metadata=metadata,
            channels=["inapp", "email", "push", "sms"]
        )

    async def notify_variant_unavailable(
        self,
        user_id: UUID,
        subscription_id: UUID,
        variant_name: str,
        alternative_variants: List[Dict[str, Any]] = None
    ):
        """Send notification when a variant becomes unavailable"""
        subject = "Product Unavailable"
        message = f"The product '{variant_name}' in your subscription is no longer available."
        
        if alternative_variants:
            alternatives_text = ", ".join([alt["name"] for alt in alternative_variants[:3]])
            message += f" Suggested alternatives: {alternatives_text}"
        
        metadata = {
            "subscription_id": str(subscription_id),
            "variant_name": variant_name,
            "alternative_variants": alternative_variants or []
        }
        
        await self.send_multi_channel_notification(
            user_id=user_id,
            notification_type="variant_unavailable",
            subject=subject,
            message=message,
            related_id=str(subscription_id),
            metadata=metadata
        )

    async def notify_subscription_renewal_failure(
        self,
        user_id: UUID,
        subscription_id: UUID,
        failure_reason: str
    ):
        """Send notification when subscription renewal fails"""
        subject = "Subscription Renewal Failed"
        message = f"Your subscription renewal failed: {failure_reason}. Please check your payment method."
        
        metadata = {
            "subscription_id": str(subscription_id),
            "failure_reason": failure_reason
        }
        
        # Renewal failures are urgent - send via all channels
        await self.send_multi_channel_notification(
            user_id=user_id,
            notification_type="payment_failure",
            subject=subject,
            message=message,
            related_id=str(subscription_id),
            metadata=metadata,
            channels=["inapp", "email", "push", "sms"]
        )

    # Real-time WebSocket notifications for payment processing
    async def send_payment_processing_update(
        self,
        user_id: UUID,
        subscription_id: UUID,
        status: str,
        message: str
    ):
        """Send real-time WebSocket notification for payment processing updates"""
        websocket_message = {
            "type": "payment_processing_update",
            "subscription_id": str(subscription_id),
            "status": status,
            "message": message,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        await websocket_manager.send_to_user(str(user_id), json.dumps(websocket_message))
        logger.info(f"Payment processing update sent to user {user_id}: {status}")

    # Legacy methods for backward compatibility
    async def get_user_notifications(self, user_id: str, page: int = 1, limit: int = 10, read: Optional[bool] = None) -> dict:
        """Get notifications for a specific user with pagination."""
        offset = (page - 1) * limit

        query = select(Notification).where(Notification.user_id == user_id)

        if read is not None:
            query = query.where(Notification.read == read)

        query = query.order_by(Notification.created_at.desc()).offset(
            offset).limit(limit)

        result = await self.db.execute(query)
        notifications = result.scalars().all()

        count_query = select(func.count(Notification.id)).where(
            Notification.user_id == user_id)
        if read is not None:
            count_query = count_query.where(Notification.read == read)
        count_result = await self.db.execute(count_query)
        total = count_result.scalar()

        return {
            "data": [notification.to_dict() for notification in notifications],
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "pages": (total + limit - 1) // limit
            }
        }

    async def mark_notification_as_read(self, notification_id: str, user_id: str) -> dict:
        """Mark a specific notification as read."""
        query = select(Notification).where(Notification.id ==
                                           notification_id, Notification.user_id == user_id)
        result = await self.db.execute(query)
        notification = result.scalar_one_or_none()

        if not notification:
            raise APIException(
                status_code=404, message="Notification not found or does not belong to user")

        notification.read = True
        await self.db.commit()
        await self.db.refresh(notification)

        await self._send_websocket_notification(notification)

        return notification.to_dict()

    async def mark_all_as_read(self, user_id: str) -> dict:
        """Mark all notifications as read for a user."""
        query = select(Notification).where(
            Notification.user_id == user_id,
            Notification.read == False
        )
        result = await self.db.execute(query)
        notifications = result.scalars().all()

        count = 0
        updated_notification_ids = []
        for notification in notifications:
            notification.read = True
            count += 1
            updated_notification_ids.append(str(notification.id))

        await self.db.commit()

        # Send a bulk update for WebSocket
        websocket_message = {
            "type": "all_notifications_read",
            "user_id": user_id,
            "notification_ids": updated_notification_ids,
            "timestamp": datetime.utcnow().isoformat()
        }
        await websocket_manager.send_to_user(user_id, json.dumps(websocket_message))
        
        return {"marked_count": count, "message": f"Marked {count} notifications as read"}

    async def create_notification(self, user_id: str, message: str, type: str = "info", related_id: Optional[str] = None) -> Notification:
        """Create a new notification."""
        notification = Notification(
            user_id=user_id,
            message=message,
            type=type,
            related_id=related_id
        )
        self.db.add(notification)
        await self.db.commit()
        await self.db.refresh(notification)

        await self._send_websocket_notification(notification, event_type="new_notification")

        return notification

    async def delete_notification(self, notification_id: str, user_id: str):
        """Delete a specific notification."""
        query = select(Notification).where(Notification.id ==
                                           notification_id, Notification.user_id == user_id)
        result = await self.db.execute(query)
        notification = result.scalar_one_or_none()

        if not notification:
            raise APIException(
                status_code=404, message="Notification not found or does not belong to user")

        await self.db.delete(notification)
        await self.db.commit()

        # Send WebSocket message for deleted notification
        websocket_message = {
            "type": "notification_deleted",
            "notification_id": str(notification.id),
            "user_id": str(notification.user_id),
            "timestamp": datetime.utcnow().isoformat()
        }
        await websocket_manager.send_to_user(str(notification.user_id), json.dumps(websocket_message))

    async def delete_old_notifications(self, days_old: int = 30):
        """Deletes notifications older than a specified number of days."""
        threshold_date = datetime.now(UTC) - timedelta(days=days_old)

        # Fetch notifications to be deleted to send WebSocket updates
        select_stmt = select(Notification).where(Notification.created_at < threshold_date)
        result = await self.db.execute(select_stmt)
        notifications_to_delete = result.scalars().all()
        
        if not notifications_to_delete:
            return

        # Delete notifications older than threshold_date
        delete_stmt = delete(Notification).where(
            Notification.created_at < threshold_date)
        await self.db.execute(delete_stmt)
        await self.db.commit()

        # Send WebSocket messages for deleted notifications
        for notification in notifications_to_delete:
            websocket_message = {
                "type": "notification_deleted",
                "notification_id": str(notification.id),
                "user_id": str(notification.user_id),
                "timestamp": datetime.utcnow().isoformat()
            }
            await websocket_manager.send_to_user(str(notification.user_id), json.dumps(websocket_message))

    async def notify_order_created(self, order_id: str, user_id: str):
        """Send notification when order is created."""
        notification = await self.create_notification(
            user_id=user_id,
            message=f"Your order #{str(order_id)[:8]} has been created",
            type="order",
            related_id=str(order_id)
        )

    async def notify_order_updated(self, order_id: str, user_id: str, status: str):
        """Send notification when order status is updated."""
        notification = await self.create_notification(
            user_id=user_id,
            message=f"Order #{str(order_id)[:8]} status updated to {status}",
            type="order",
            related_id=str(order_id)
        )

    async def notify_cart_updated(self, user_id: str, cart_data: dict):
        """Send WebSocket notification for cart update."""
        await websocket_manager.broadcast_cart_update(user_id, cart_data)

    async def send_low_stock_alert(self, product_name: str, variant_name: str, location_name: str, current_stock: int, threshold: int):
        """
        Sends low stock alert notifications (in-app and email).
        """
        message = f"Low stock alert! {product_name} ({variant_name}) at {location_name} has {current_stock} units left (threshold: {threshold})."
        
        # 1. Create in-app notification for admin
        admin_user_id = UUID(settings.ADMIN_USER_ID)
        await self.create_notification(
            user_id=admin_user_id,
            message=message,
            type="low_stock",
            related_id=None
        )
        print(f"✅ In-app low stock notification created for admin for {product_name} ({variant_name}).")

        # 2. Trigger email notification for admin
        from models.user import User
        from sqlalchemy import select
        admin_user = await self.db.scalar(select(User).filter_by(id=admin_user_id))

        if admin_user and admin_user.email:
            await self.email_service.send_low_stock_alert(
                recipient_email=admin_user.email,
                product_name=product_name,
                variant_name=variant_name,
                location_name=location_name,
                current_stock=current_stock,
                threshold=threshold
            )
            print(f"📧 Low stock email sent to admin ({admin_user.email}) for {product_name} ({variant_name}).")
        else:
            print(f"❌ Admin user or email not found for low stock alert for {product_name} ({variant_name}).")


# Maintain backward compatibility
class NotificationService(EnhancedNotificationService):
    """Legacy NotificationService for backward compatibility"""
    pass