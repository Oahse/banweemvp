from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, Any, Optional
from uuid import UUID

from core.dependencies import get_db, get_current_user
from services.notification_preference import NotificationPreferenceService
from models.user import User
from schemas.response import StandardResponse

router = APIRouter(prefix="/notification-preferences", tags=["Notification Preferences"])


@router.get("/", response_model=StandardResponse)
async def get_notification_preferences(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's notification preferences"""
    service = NotificationPreferenceService(db)
    preferences = await service.get_user_preferences(current_user.id)
    
    return StandardResponse(
        success=True,
        message="Notification preferences retrieved successfully",
        data=preferences.to_dict()
    )


@router.put("/", response_model=StandardResponse)
async def update_notification_preferences(
    preferences_data: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update user's notification preferences"""
    service = NotificationPreferenceService(db)
    preferences = await service.update_user_preferences(current_user.id, preferences_data)
    
    return StandardResponse(
        success=True,
        message="Notification preferences updated successfully",
        data=preferences.to_dict()
    )


@router.post("/device-tokens", response_model=StandardResponse)
async def add_device_token(
    device_token_data: Dict[str, str],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Add a device token for push notifications"""
    device_token = device_token_data.get("device_token")
    if not device_token:
        raise HTTPException(status_code=400, detail="Device token is required")
    
    service = NotificationPreferenceService(db)
    added = await service.add_device_token(current_user.id, device_token)
    
    return StandardResponse(
        success=True,
        message="Device token added successfully" if added else "Device token already exists",
        data={"added": added}
    )


@router.delete("/device-tokens/{device_token}", response_model=StandardResponse)
async def remove_device_token(
    device_token: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Remove a device token"""
    service = NotificationPreferenceService(db)
    removed = await service.remove_device_token(current_user.id, device_token)
    
    return StandardResponse(
        success=True,
        message="Device token removed successfully" if removed else "Device token not found",
        data={"removed": removed}
    )


@router.put("/phone-number", response_model=StandardResponse)
async def update_phone_number(
    phone_data: Dict[str, str],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update phone number for SMS notifications"""
    phone_number = phone_data.get("phone_number")
    if not phone_number:
        raise HTTPException(status_code=400, detail="Phone number is required")
    
    service = NotificationPreferenceService(db)
    preferences = await service.update_phone_number(current_user.id, phone_number)
    
    return StandardResponse(
        success=True,
        message="Phone number updated successfully",
        data=preferences.to_dict()
    )


@router.get("/history", response_model=StandardResponse)
async def get_notification_history(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    channel: Optional[str] = Query(None),
    notification_type: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's notification history"""
    service = NotificationPreferenceService(db)
    history = await service.get_notification_history(
        user_id=current_user.id,
        page=page,
        limit=limit,
        channel=channel,
        notification_type=notification_type,
        status=status
    )
    
    return StandardResponse(
        success=True,
        message="Notification history retrieved successfully",
        data=history
    )


@router.get("/statistics", response_model=StandardResponse)
async def get_notification_statistics(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's notification statistics"""
    service = NotificationPreferenceService(db)
    stats = await service.get_notification_statistics(current_user.id)
    
    return StandardResponse(
        success=True,
        message="Notification statistics retrieved successfully",
        data=stats
    )


@router.get("/export", response_model=StandardResponse)
async def export_notification_preferences(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Export user's notification preferences"""
    service = NotificationPreferenceService(db)
    export_data = await service.export_notification_preferences(current_user.id)
    
    return StandardResponse(
        success=True,
        message="Notification preferences exported successfully",
        data=export_data
    )


@router.post("/import", response_model=StandardResponse)
async def import_notification_preferences(
    import_data: Dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Import notification preferences from exported data"""
    service = NotificationPreferenceService(db)
    preferences = await service.import_notification_preferences(current_user.id, import_data)
    
    return StandardResponse(
        success=True,
        message="Notification preferences imported successfully",
        data=preferences.to_dict()
    )


@router.get("/summary", response_model=StandardResponse)
async def get_notification_summary(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get comprehensive notification summary for user"""
    service = NotificationPreferenceService(db)
    summary = await service.get_notification_summary(current_user.id)
    
    return StandardResponse(
        success=True,
        message="Notification summary retrieved successfully",
        data=summary
    )


@router.post("/test-notification", response_model=StandardResponse)
async def send_test_notification(
    test_data: Dict[str, str],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Send a test notification to verify settings"""
    from services.notification import EnhancedNotificationService
    
    notification_service = EnhancedNotificationService(db)
    
    channel = test_data.get("channel", "inapp")
    message = test_data.get("message", "This is a test notification")
    
    results = await notification_service.send_multi_channel_notification(
        user_id=current_user.id,
        notification_type="test",
        subject="Test Notification",
        message=message,
        channels=[channel]
    )
    
    return StandardResponse(
        success=True,
        message="Test notification sent",
        data={"results": results}
    )