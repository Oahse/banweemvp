from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID
import logging

from models.notification_preference import NotificationPreference, NotificationHistory
from models.user import User
from core.exceptions import APIException

logger = logging.getLogger(__name__)


class NotificationPreferenceService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_preferences(self, user_id: UUID) -> NotificationPreference:
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

    async def update_user_preferences(
        self,
        user_id: UUID,
        preferences_data: Dict[str, Any]
    ) -> NotificationPreference:
        """Update user notification preferences"""
        preferences = await self.get_user_preferences(user_id)
        
        # Update preferences with provided data
        for key, value in preferences_data.items():
            if hasattr(preferences, key):
                setattr(preferences, key, value)
            else:
                logger.warning(f"Unknown preference key: {key}")
        
        await self.db.commit()
        await self.db.refresh(preferences)
        
        return preferences

    async def add_device_token(self, user_id: UUID, device_token: str) -> bool:
        """Add a device token for push notifications"""
        preferences = await self.get_user_preferences(user_id)
        
        if not preferences.device_tokens:
            preferences.device_tokens = []
        
        # Avoid duplicates
        if device_token not in preferences.device_tokens:
            preferences.device_tokens.append(device_token)
            await self.db.commit()
            await self.db.refresh(preferences)
            return True
        
        return False

    async def remove_device_token(self, user_id: UUID, device_token: str) -> bool:
        """Remove a device token"""
        preferences = await self.get_user_preferences(user_id)
        
        if preferences.device_tokens and device_token in preferences.device_tokens:
            preferences.device_tokens.remove(device_token)
            await self.db.commit()
            await self.db.refresh(preferences)
            return True
        
        return False

    async def update_phone_number(self, user_id: UUID, phone_number: str) -> NotificationPreference:
        """Update user's phone number for SMS notifications"""
        preferences = await self.get_user_preferences(user_id)
        preferences.phone_number = phone_number
        
        await self.db.commit()
        await self.db.refresh(preferences)
        
        return preferences

    async def get_notification_history(
        self,
        user_id: UUID,
        page: int = 1,
        limit: int = 20,
        channel: str = None,
        notification_type: str = None,
        status: str = None
    ) -> Dict[str, Any]:
        """Get user's notification history with filtering and pagination"""
        offset = (page - 1) * limit
        
        query = select(NotificationHistory).where(NotificationHistory.user_id == user_id)
        
        if channel:
            query = query.where(NotificationHistory.channel == channel)
        if notification_type:
            query = query.where(NotificationHistory.notification_type == notification_type)
        if status:
            query = query.where(NotificationHistory.status == status)
        
        query = query.order_by(NotificationHistory.created_at.desc()).offset(offset).limit(limit)
        
        result = await self.db.execute(query)
        history_items = result.scalars().all()
        
        # Get total count for pagination
        count_query = select(NotificationHistory).where(NotificationHistory.user_id == user_id)
        if channel:
            count_query = count_query.where(NotificationHistory.channel == channel)
        if notification_type:
            count_query = count_query.where(NotificationHistory.notification_type == notification_type)
        if status:
            count_query = count_query.where(NotificationHistory.status == status)
        
        from sqlalchemy import func
        count_result = await self.db.execute(select(func.count()).select_from(count_query.subquery()))
        total = count_result.scalar()
        
        return {
            "data": [item.to_dict() for item in history_items],
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "pages": (total + limit - 1) // limit if total > 0 else 0
            }
        }

    async def get_notification_statistics(self, user_id: UUID) -> Dict[str, Any]:
        """Get notification statistics for a user"""
        from sqlalchemy import func
        
        # Get statistics by channel
        channel_stats = await self.db.execute(
            select(
                NotificationHistory.channel,
                func.count(NotificationHistory.id).label('total'),
                func.count().filter(NotificationHistory.status == 'sent').label('sent'),
                func.count().filter(NotificationHistory.status == 'delivered').label('delivered'),
                func.count().filter(NotificationHistory.status == 'failed').label('failed')
            )
            .where(NotificationHistory.user_id == user_id)
            .group_by(NotificationHistory.channel)
        )
        
        channel_data = {}
        for row in channel_stats:
            channel_data[row.channel] = {
                "total": row.total,
                "sent": row.sent,
                "delivered": row.delivered,
                "failed": row.failed,
                "success_rate": (row.sent + row.delivered) / row.total if row.total > 0 else 0
            }
        
        # Get statistics by notification type
        type_stats = await self.db.execute(
            select(
                NotificationHistory.notification_type,
                func.count(NotificationHistory.id).label('total')
            )
            .where(NotificationHistory.user_id == user_id)
            .group_by(NotificationHistory.notification_type)
        )
        
        type_data = {row.notification_type: row.total for row in type_stats}
        
        return {
            "by_channel": channel_data,
            "by_type": type_data
        }

    async def cleanup_old_history(self, days_old: int = 90) -> int:
        """Clean up old notification history entries"""
        from datetime import datetime, timedelta, UTC
        from sqlalchemy import delete
        
        threshold_date = datetime.now(UTC) - timedelta(days=days_old)
        
        delete_stmt = delete(NotificationHistory).where(
            NotificationHistory.created_at < threshold_date
        )
        
        result = await self.db.execute(delete_stmt)
        await self.db.commit()
        
        return result.rowcount

    async def export_notification_preferences(self, user_id: UUID) -> Dict[str, Any]:
        """Export user's notification preferences for data portability"""
        preferences = await self.get_user_preferences(user_id)
        
        # Get user info
        user = await self.db.get(User, user_id)
        
        return {
            "user_id": str(user_id),
            "user_email": user.email if user else None,
            "preferences": preferences.to_dict(),
            "exported_at": datetime.utcnow().isoformat()
        }

    async def import_notification_preferences(
        self,
        user_id: UUID,
        preferences_data: Dict[str, Any]
    ) -> NotificationPreference:
        """Import notification preferences from exported data"""
        # Validate that the preferences belong to the correct user
        if str(user_id) != preferences_data.get("user_id"):
            raise APIException(
                status_code=400,
                message="Preferences data does not match user ID"
            )
        
        # Extract preferences from the exported data
        prefs = preferences_data.get("preferences", {})
        
        # Remove system fields that shouldn't be imported
        system_fields = ["id", "created_at", "updated_at", "user_id"]
        for field in system_fields:
            prefs.pop(field, None)
        
        return await self.update_user_preferences(user_id, prefs)