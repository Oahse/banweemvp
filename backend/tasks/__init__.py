"""
Celery tasks package
"""
from tasks.email_tasks import (
    send_order_confirmation_email,
    send_shipping_update_email,
    send_welcome_email,
    send_password_reset_email,
    send_email_verification,
    send_email_change_confirmation,
    send_order_delivered_email,
    send_return_process_email,
    send_referral_request_email,
)

from tasks.notification_tasks import (
    create_notification,
    cleanup_old_notifications,
)

from tasks.order_tasks import (
    process_order_confirmation,
    process_shipping_update,
    process_order_delivered,
)

__all__ = [
    # Email tasks - CRITICAL
    'send_order_confirmation_email',
    'send_shipping_update_email',
    'send_order_delivered_email',
    'send_welcome_email',
    'send_email_verification',
    'send_password_reset_email',
    'send_email_change_confirmation',
    'send_return_process_email',
    
    # Email tasks - HIGH PRIORITY
    'send_referral_request_email',
    
    # Notification tasks
    'create_notification',
    'cleanup_old_notifications',
    
    # Order tasks
    'process_order_confirmation',
    'process_shipping_update',
    'process_order_delivered',
]
