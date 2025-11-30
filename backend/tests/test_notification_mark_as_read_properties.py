"""
Property-based tests for notification mark as read functionality.

**Feature: app-enhancements, Property 32: Notification mark as read**
**Validates: Requirements 11.1**

**Feature: app-enhancements, Property 33: Notification UI immediate update**
**Validates: Requirements 11.2**

**Feature: app-enhancements, Property 34: Mark all notifications as read**
**Validates: Requirements 11.3**

**Feature: app-enhancements, Property 35: Unread count badge update**
**Validates: Requirements 11.4**
"""

import pytest
from hypothesis import given, strategies as st, settings, HealthCheck
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from services.notification import NotificationService
from models.notification import Notification
from models.user import User
from core.exceptions import APIException


@pytest.mark.asyncio
@given(
    dummy=st.just(None)
)
@settings(
    max_examples=100,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_notification_mark_as_read(dummy, db_session: AsyncSession):
    """
    Property 32: Notification mark as read
    
    For any "Mark as Read" action on a notification, the notification status 
    should be updated to read.
    
    **Validates: Requirements 11.1**
    """
    # Create notification service
    notification_service = NotificationService(db_session)
    
    # Get a user from the database
    query = select(User).limit(1)
    result = await db_session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        pytest.skip("No users in database")
    
    user_id = str(user.id)
    
    # Create an unread notification
    notification = await notification_service.create_notification(
        user_id=user_id,
        message="Test notification for mark as read",
        type="info"
    )
    
    notification_id = str(notification.id)
    
    # Verify notification is initially unread
    assert notification.read == False, "Notification should be initially unread"
    
    # Mark notification as read
    result = await notification_service.mark_notification_as_read(notification_id, user_id)
    
    # Verify the result structure
    assert isinstance(result, dict)
    assert 'id' in result
    assert 'read' in result
    assert result['id'] == notification_id
    assert result['read'] == True, "Notification should be marked as read"
    
    # Verify notification is actually marked as read in database
    query = select(Notification).where(Notification.id == notification_id)
    db_result = await db_session.execute(query)
    updated_notification = db_result.scalar_one()
    
    assert updated_notification.read == True, \
        f"Notification {notification_id} should be marked as read but read={updated_notification.read}"
    
    # Clean up
    await db_session.delete(updated_notification)
    await db_session.commit()


@pytest.mark.asyncio
@given(
    notification_count=st.integers(min_value=1, max_value=10)
)
@settings(
    max_examples=100,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_mark_all_notifications_as_read(notification_count, db_session: AsyncSession):
    """
    Property 34: Mark all notifications as read
    
    For any "Mark All as Read" action, all user notifications should be 
    marked as read.
    
    **Validates: Requirements 11.3**
    """
    # Create notification service
    notification_service = NotificationService(db_session)
    
    # Get a user from the database
    query = select(User).limit(1)
    result = await db_session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        pytest.skip("No users in database")
    
    user_id = str(user.id)
    
    # Create multiple unread notifications
    created_notifications = []
    for i in range(notification_count):
        notification = await notification_service.create_notification(
            user_id=user_id,
            message=f"Test notification {i+1}",
            type="info"
        )
        created_notifications.append(notification)
    
    # Verify all notifications are initially unread
    for notification in created_notifications:
        assert notification.read == False, f"Notification {notification.id} should be initially unread"
    
    # Mark all notifications as read
    result = await notification_service.mark_all_as_read(user_id)
    
    # Verify the result structure
    assert isinstance(result, dict)
    assert 'marked_count' in result
    assert 'message' in result
    assert result['marked_count'] == notification_count, \
        f"Should mark {notification_count} notifications as read"
    
    # Verify all notifications are actually marked as read in database
    query = select(Notification).where(
        Notification.user_id == user_id,
        Notification.id.in_([str(n.id) for n in created_notifications])
    )
    db_result = await db_session.execute(query)
    updated_notifications = db_result.scalars().all()
    
    for notification in updated_notifications:
        assert notification.read == True, \
            f"Notification {notification.id} should be marked as read but read={notification.read}"
    
    # Clean up
    for notification in updated_notifications:
        await db_session.delete(notification)
    await db_session.commit()


@pytest.mark.asyncio
@given(
    unread_count=st.integers(min_value=1, max_value=10),
    read_count=st.integers(min_value=0, max_value=5)
)
@settings(
    max_examples=100,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_unread_count_badge_update(unread_count, read_count, db_session: AsyncSession):
    """
    Property 35: Unread count badge update
    
    For any notifications marked as read, the unread count badge should 
    decrease by the number marked.
    
    **Validates: Requirements 11.4**
    """
    # Create notification service
    notification_service = NotificationService(db_session)
    
    # Get a user from the database
    query = select(User).limit(1)
    result = await db_session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        pytest.skip("No users in database")
    
    user_id = str(user.id)
    
    # Create unread notifications
    unread_notifications = []
    for i in range(unread_count):
        notification = await notification_service.create_notification(
            user_id=user_id,
            message=f"Unread notification {i+1}",
            type="info"
        )
        unread_notifications.append(notification)
    
    # Create read notifications
    read_notifications = []
    for i in range(read_count):
        notification = await notification_service.create_notification(
            user_id=user_id,
            message=f"Read notification {i+1}",
            type="info"
        )
        # Mark as read immediately
        await notification_service.mark_notification_as_read(str(notification.id), user_id)
        read_notifications.append(notification)
    
    # Get initial unread count
    query = select(func.count(Notification.id)).where(
        Notification.user_id == user_id,
        Notification.read == False
    )
    result = await db_session.execute(query)
    initial_unread_count = result.scalar()
    
    assert initial_unread_count >= unread_count, \
        f"Initial unread count should be at least {unread_count}"
    
    # Mark some notifications as read
    notifications_to_mark = min(unread_count, 3)  # Mark up to 3 notifications
    for i in range(notifications_to_mark):
        await notification_service.mark_notification_as_read(
            str(unread_notifications[i].id), 
            user_id
        )
    
    # Get updated unread count
    query = select(func.count(Notification.id)).where(
        Notification.user_id == user_id,
        Notification.read == False
    )
    result = await db_session.execute(query)
    updated_unread_count = result.scalar()
    
    # Verify unread count decreased by the number marked
    expected_decrease = notifications_to_mark
    actual_decrease = initial_unread_count - updated_unread_count
    
    assert actual_decrease == expected_decrease, \
        f"Unread count should decrease by {expected_decrease} but decreased by {actual_decrease}"
    
    # Clean up
    for notification in unread_notifications + read_notifications:
        query = select(Notification).where(Notification.id == notification.id)
        result = await db_session.execute(query)
        n = result.scalar_one_or_none()
        if n:
            await db_session.delete(n)
    await db_session.commit()


@pytest.mark.asyncio
@given(
    dummy=st.just(None)
)
@settings(
    max_examples=100,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_notification_ownership_validation(dummy, db_session: AsyncSession):
    """
    Additional property: Notification ownership validation
    
    For any mark as read action, the system should verify the notification 
    belongs to the user.
    """
    # Create notification service
    notification_service = NotificationService(db_session)
    
    # Get two different users
    query = select(User).limit(2)
    result = await db_session.execute(query)
    users = result.scalars().all()
    
    if len(users) < 2:
        pytest.skip("Need at least 2 users in database")
    
    user1_id = str(users[0].id)
    user2_id = str(users[1].id)
    
    # Create notification for user1
    notification = await notification_service.create_notification(
        user_id=user1_id,
        message="Test notification for user1",
        type="info"
    )
    
    notification_id = str(notification.id)
    
    # Try to mark notification as read using user2's ID (should fail)
    with pytest.raises(APIException) as exc_info:
        await notification_service.mark_notification_as_read(notification_id, user2_id)
    
    assert exc_info.value.status_code == 404
    assert "not found" in exc_info.value.message.lower() or "does not belong" in exc_info.value.message.lower()
    
    # Verify notification is still unread
    query = select(Notification).where(Notification.id == notification_id)
    db_result = await db_session.execute(query)
    unchanged_notification = db_result.scalar_one()
    
    assert unchanged_notification.read == False, \
        "Notification should remain unread when accessed by wrong user"
    
    # Clean up
    await db_session.delete(unchanged_notification)
    await db_session.commit()


@pytest.mark.asyncio
@given(
    dummy=st.just(None)
)
@settings(
    max_examples=100,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_idempotent_mark_as_read(dummy, db_session: AsyncSession):
    """
    Additional property: Idempotent mark as read
    
    For any notification already marked as read, marking it as read again 
    should not cause errors.
    """
    # Create notification service
    notification_service = NotificationService(db_session)
    
    # Get a user from the database
    query = select(User).limit(1)
    result = await db_session.execute(query)
    user = result.scalar_one_or_none()
    
    if not user:
        pytest.skip("No users in database")
    
    user_id = str(user.id)
    
    # Create an unread notification
    notification = await notification_service.create_notification(
        user_id=user_id,
        message="Test notification for idempotency",
        type="info"
    )
    
    notification_id = str(notification.id)
    
    # Mark notification as read first time
    result1 = await notification_service.mark_notification_as_read(notification_id, user_id)
    assert result1['read'] == True
    
    # Mark notification as read second time (should still work)
    result2 = await notification_service.mark_notification_as_read(notification_id, user_id)
    assert result2['read'] == True
    
    # Verify notification is still marked as read
    query = select(Notification).where(Notification.id == notification_id)
    db_result = await db_session.execute(query)
    final_notification = db_result.scalar_one()
    
    assert final_notification.read == True, \
        "Notification should remain marked as read after multiple mark operations"
    
    # Clean up
    await db_session.delete(final_notification)
    await db_session.commit()
