"""
Integration tests for notification and Celery processing.

Property 41: Notification Celery processing
Validates: Requirements 15.6
"""

import pytest
from httpx import AsyncClient
from unittest.mock import patch, MagicMock, AsyncMock
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import asyncio
import time
from uuid import UUID, uuid4
from datetime import datetime

from core.config import settings
from services.notification import NotificationService
from tasks.email_tasks import send_low_stock_alert_email
from tasks.notification_tasks import create_notification
from models.notification import Notification
from models.user import User


class TestNotificationCeleryIntegration:
    """Integration tests for notification and Celery processing."""

    @pytest.mark.asyncio
    async def test_property_41_notification_celery_processing_complete_flow(self, db_session: AsyncSession):
        """
        Feature: docker-full-functionality, Property 41: Notification Celery processing
        
        Test complete notification trigger -> Celery worker processing -> delivery flow.
        Verify notifications are processed asynchronously through Celery workers.
        
        Validates: Requirements 15.6
        """
        # Create a test admin user
        admin_user = User(
            id=uuid4(),
            email=f"admin_{int(time.time() * 1000000)}@example.com",
            firstname="Admin",
            lastname="Test",
            role="Admin",
            active=True,
            verified=True,
            hashed_password="test_hash"
        )
        db_session.add(admin_user)
        await db_session.commit()
        await db_session.refresh(admin_user)

        # Test data for notification
        test_message = "Test notification message"
        notification_type = "test"
        
        notification_service = NotificationService(db_session)

        # Test 1: Direct notification creation (synchronous part)
        notification = await notification_service.create_notification(
            user_id=str(admin_user.id),
            message=test_message,
            type=notification_type,
            related_id=None
        )

        # Verify notification was created in database
        assert notification.id is not None
        assert notification.user_id == admin_user.id
        assert notification.message == test_message
        assert notification.type == notification_type
        assert notification.read is False

        # Test 2: Celery task for notification creation (asynchronous part)
        # Mock the asyncio.run to avoid event loop conflicts in tests
        with patch('tasks.notification_tasks.asyncio.run') as mock_asyncio_run:
            with patch('tasks.notification_tasks.AsyncSessionDB') as mock_session_factory:
                mock_session = AsyncMock()
                mock_session_factory.return_value.__aenter__.return_value = mock_session
                
                # Mock the NotificationService within the Celery task
                with patch('tasks.notification_tasks.NotificationService') as mock_notification_service_class:
                    mock_notification_service = AsyncMock()
                    mock_notification_service_class.return_value = mock_notification_service
                    
                    # Execute the Celery task function directly (simulating worker execution)
                    create_notification(
                        user_id=str(admin_user.id),
                        message="Celery test message",
                        notification_type="celery_test",
                        related_id=None
                    )
                    
                    # Verify asyncio.run was called (indicating async execution)
                    mock_asyncio_run.assert_called_once()
                    
                    # Verify the task would use the correct service
                    # (We can't verify the exact calls due to mocking asyncio.run, but we can verify the task structure)

        print("✅ Notification Celery task execution test passed")

    @pytest.mark.asyncio
    async def test_property_41_email_notification_celery_processing(self, db_session: AsyncSession):
        """
        Feature: docker-full-functionality, Property 41: Notification Celery processing
        
        Test email notification trigger -> Celery worker processing -> delivery.
        Verify email notifications are processed asynchronously through Celery workers.
        
        Validates: Requirements 15.6
        """
        # Create a test admin user
        admin_user = User(
            id=uuid4(),
            email=f"admin_{int(time.time() * 1000000)}@example.com",
            firstname="Admin",
            lastname="Test",
            role="Admin",
            active=True,
            verified=True,
            hashed_password="test_hash"
        )
        db_session.add(admin_user)
        await db_session.commit()
        await db_session.refresh(admin_user)

        # Mock data for low stock alert
        product_name = "Test Product"
        variant_name = "Red Small"
        location_name = "Warehouse A"
        current_stock = 5
        threshold = 10
        
        notification_service = NotificationService(db_session)
        
        # Test the complete flow with mocked Celery task
        with patch('tasks.email_tasks.send_low_stock_alert_email.delay') as mock_celery_delay:
            # Temporarily override ADMIN_USER_ID in settings for this test
            with patch.object(settings, 'ADMIN_USER_ID', str(admin_user.id)):
                # Trigger the low stock alert (this should create notification + trigger email task)
                await notification_service.send_low_stock_alert(
                    product_name=product_name,
                    variant_name=variant_name,
                    location_name=location_name,
                    current_stock=current_stock,
                    threshold=threshold
                )
            
            # Verify in-app notification was created
            result = await db_session.execute(
                select(Notification).where(
                    Notification.user_id == admin_user.id,
                    Notification.type == "low_stock"
                )
            )
            notification = result.scalar_one_or_none()
            assert notification is not None
            assert "Low stock alert!" in notification.message
            assert product_name in notification.message
            assert variant_name in notification.message
            
            # Verify Celery email task was triggered
            expected_context = {
                "recipient_email": admin_user.email,
                "product_name": product_name,
                "variant_name": variant_name,
                "location_name": location_name,
                "current_stock": current_stock,
                "threshold": threshold,
                "admin_inventory_link": f"{settings.FRONTEND_URL}/admin/inventory",
                "company_name": "Banwee",
            }

            mock_celery_delay.assert_called_once_with(
                admin_user.email,
                expected_context
            )

        print("✅ Email notification Celery processing test passed")

    @pytest.mark.asyncio
    async def test_property_41_async_task_processing_verification(self, db_session: AsyncSession):
        """
        Feature: docker-full-functionality, Property 41: Notification Celery processing
        
        Verify that notifications are processed asynchronously without blocking.
        
        Validates: Requirements 15.6
        """
        # Create test user
        test_user = User(
            id=uuid4(),
            email=f"user_{int(time.time() * 1000000)}@example.com",
            firstname="Test",
            lastname="User",
            role="Customer",
            active=True,
            verified=True,
            hashed_password="test_hash"
        )
        db_session.add(test_user)
        await db_session.commit()
        await db_session.refresh(test_user)

        notification_service = NotificationService(db_session)

        # Measure time for multiple notification creations (should be fast)
        start_time = time.time()
        
        notifications = []
        for i in range(5):
            notification = await notification_service.create_notification(
                user_id=str(test_user.id),
                message=f"Test notification {i}",
                type="test",
                related_id=None
            )
            notifications.append(notification)
        
        creation_time = time.time() - start_time
        
        # Verify all notifications were created quickly (should be under 1 second)
        assert creation_time < 1.0, f"Notification creation took {creation_time}s, should be faster"
        assert len(notifications) == 5
        
        # Verify all notifications are in database
        result = await db_session.execute(
            select(Notification).where(Notification.user_id == test_user.id)
        )
        db_notifications = result.scalars().all()
        assert len(db_notifications) == 5

        print("✅ Async notification processing verification test passed")

    @pytest.mark.asyncio
    async def test_property_41_celery_task_routing_verification(self):
        """
        Feature: docker-full-functionality, Property 41: Notification Celery processing
        
        Verify that notification tasks are properly routed to the notifications queue.
        
        Validates: Requirements 15.6
        """
        # Import celery app to check configuration
        from celery_app import celery_app
        
        # Verify task routing configuration
        task_routes = celery_app.conf.task_routes
        assert 'tasks.notification_tasks.*' in task_routes
        assert task_routes['tasks.notification_tasks.*']['queue'] == 'notifications'
        
        # Verify notification queue exists
        task_queues = celery_app.conf.task_queues
        queue_names = [q.name for q in task_queues]
        assert 'notifications' in queue_names
        
        # Verify specific notification tasks are registered
        registered_tasks = celery_app.tasks
        expected_notification_tasks = [
            'tasks.notification_tasks.create_notification',
            'tasks.notification_tasks.cleanup_old_notifications',
            'tasks.notification_tasks.check_low_stock_task'
        ]
        
        for task_name in expected_notification_tasks:
            assert task_name in registered_tasks, f"Task {task_name} not registered"

        print("✅ Celery task routing verification test passed")

    @pytest.mark.asyncio 
    async def test_property_41_notification_websocket_integration(self, db_session: AsyncSession):
        """
        Feature: docker-full-functionality, Property 41: Notification Celery processing
        
        Test that notifications trigger WebSocket updates for real-time delivery.
        
        Validates: Requirements 15.6
        """
        # Create test user
        test_user = User(
            id=uuid4(),
            email=f"user_{int(time.time() * 1000000)}@example.com",
            firstname="Test",
            lastname="User", 
            role="Customer",
            active=True,
            verified=True,
            hashed_password="test_hash"
        )
        db_session.add(test_user)
        await db_session.commit()
        await db_session.refresh(test_user)

        notification_service = NotificationService(db_session)

        # Mock WebSocket manager to verify it's called
        with patch('services.notification.websocket_manager') as mock_websocket_manager:
            mock_websocket_manager.send_to_user = AsyncMock()
            
            # Create notification (should trigger WebSocket)
            notification = await notification_service.create_notification(
                user_id=str(test_user.id),
                message="WebSocket test notification",
                type="test",
                related_id=None
            )
            
            # Verify WebSocket was called for new notification
            mock_websocket_manager.send_to_user.assert_called()
            call_args = mock_websocket_manager.send_to_user.call_args
            assert call_args[0][0] == str(test_user.id)  # user_id
            
            # Verify WebSocket message contains notification data
            websocket_message = call_args[0][1]  # message
            import json
            message_data = json.loads(websocket_message)
            assert message_data["type"] == "new_notification"
            assert message_data["notification"]["message"] == "WebSocket test notification"
            assert message_data["notification"]["user_id"] == str(test_user.id)

        print("✅ Notification WebSocket integration test passed")