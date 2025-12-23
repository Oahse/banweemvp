from sqlalchemy import Column, String, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from core.database import BaseModel, CHAR_LENGTH, GUID


class NotificationPreference(BaseModel):
    __tablename__ = "notification_preferences"
    __table_args__ = {'extend_existing': True}

    user_id = Column(GUID(), ForeignKey("users.id"), nullable=False, unique=True)
    
    # Email notification preferences
    email_enabled = Column(Boolean, default=True)
    email_subscription_changes = Column(Boolean, default=True)
    email_payment_confirmations = Column(Boolean, default=True)
    email_payment_failures = Column(Boolean, default=True)
    email_variant_unavailable = Column(Boolean, default=True)
    email_promotional = Column(Boolean, default=False)
    
    # SMS notification preferences
    sms_enabled = Column(Boolean, default=False)
    sms_payment_failures = Column(Boolean, default=False)
    sms_urgent_alerts = Column(Boolean, default=False)
    phone_number = Column(String(CHAR_LENGTH), nullable=True)
    
    # Push notification preferences
    push_enabled = Column(Boolean, default=True)
    push_subscription_changes = Column(Boolean, default=True)
    push_payment_confirmations = Column(Boolean, default=True)
    push_payment_failures = Column(Boolean, default=True)
    push_variant_unavailable = Column(Boolean, default=True)
    
    # In-app notification preferences
    inapp_enabled = Column(Boolean, default=True)
    inapp_subscription_changes = Column(Boolean, default=True)
    inapp_payment_confirmations = Column(Boolean, default=True)
    inapp_payment_failures = Column(Boolean, default=True)
    inapp_variant_unavailable = Column(Boolean, default=True)
    
    # Device tokens for push notifications
    device_tokens = Column(JSON, default=list)  # List of device tokens
    
    user = relationship("models.user.User", back_populates="notification_preferences")

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "email_enabled": self.email_enabled,
            "email_subscription_changes": self.email_subscription_changes,
            "email_payment_confirmations": self.email_payment_confirmations,
            "email_payment_failures": self.email_payment_failures,
            "email_variant_unavailable": self.email_variant_unavailable,
            "email_promotional": self.email_promotional,
            "sms_enabled": self.sms_enabled,
            "sms_payment_failures": self.sms_payment_failures,
            "sms_urgent_alerts": self.sms_urgent_alerts,
            "phone_number": self.phone_number,
            "push_enabled": self.push_enabled,
            "push_subscription_changes": self.push_subscription_changes,
            "push_payment_confirmations": self.push_payment_confirmations,
            "push_payment_failures": self.push_payment_failures,
            "push_variant_unavailable": self.push_variant_unavailable,
            "inapp_enabled": self.inapp_enabled,
            "inapp_subscription_changes": self.inapp_subscription_changes,
            "inapp_payment_confirmations": self.inapp_payment_confirmations,
            "inapp_payment_failures": self.inapp_payment_failures,
            "inapp_variant_unavailable": self.inapp_variant_unavailable,
            "device_tokens": self.device_tokens,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class NotificationHistory(BaseModel):
    __tablename__ = "notification_history"
    __table_args__ = {'extend_existing': True}

    user_id = Column(GUID(), ForeignKey("users.id"), nullable=False)
    notification_id = Column(GUID(), ForeignKey("notifications.id"), nullable=True)
    
    # Notification details
    channel = Column(String(CHAR_LENGTH), nullable=False)  # email, sms, push, inapp
    notification_type = Column(String(CHAR_LENGTH), nullable=False)  # subscription_change, payment_confirmation, etc.
    subject = Column(String(CHAR_LENGTH), nullable=True)
    message = Column(String, nullable=False)
    
    # Delivery status
    status = Column(String(CHAR_LENGTH), default="pending")  # pending, sent, delivered, failed
    delivery_attempts = Column(String, default="0")
    error_message = Column(String, nullable=True)
    
    # Metadata
    metadata = Column(JSON, default=dict)  # Additional context data
    
    user = relationship("models.user.User")
    notification = relationship("models.notification.Notification")

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "notification_id": str(self.notification_id) if self.notification_id else None,
            "channel": self.channel,
            "notification_type": self.notification_type,
            "subject": self.subject,
            "message": self.message,
            "status": self.status,
            "delivery_attempts": self.delivery_attempts,
            "error_message": self.error_message,
            "metadata": self.metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }