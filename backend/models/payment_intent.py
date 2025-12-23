from sqlalchemy import Column, String, ForeignKey, DateTime, JSON, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from core.database import BaseModel, GUID
from typing import Dict, Any


class PaymentIntent(BaseModel):
    """Enhanced payment intent tracking with Stripe integration"""
    __tablename__ = "payment_intents"
    __table_args__ = {'extend_existing': True}

    # Stripe payment intent ID
    stripe_payment_intent_id = Column(String(255), nullable=False, unique=True, index=True)
    
    # User and subscription references
    user_id = Column(GUID(), ForeignKey("users.id"), nullable=False, index=True)
    subscription_id = Column(GUID(), nullable=True, index=True)  # May be null for one-time payments
    
    # Amount breakdown (JSON with detailed cost structure)
    amount_breakdown = Column(JSON, nullable=False)
    
    # Currency
    currency = Column(String(3), nullable=False, default="USD")
    
    # Payment status
    status = Column(String(50), nullable=False, default="requires_payment_method")
    
    # Stripe verification details (JSON)
    stripe_verification = Column(JSON, nullable=True)
    
    # Payment method details
    payment_method_id = Column(String(255), nullable=True)
    payment_method_type = Column(String(50), nullable=True)  # "card", "bank_account", etc.
    
    # 3D Secure and SCA handling
    requires_action = Column(Boolean, default=False)
    client_secret = Column(String(500), nullable=True)
    
    # Expiration
    expires_at = Column(DateTime(timezone=True), nullable=True)
    
    # Completion details
    confirmed_at = Column(DateTime(timezone=True), nullable=True)
    failed_at = Column(DateTime(timezone=True), nullable=True)
    failure_reason = Column(Text, nullable=True)
    
    # Metadata for additional tracking
    payment_metadata = Column(JSON, nullable=True)
    
    # Relationships
    user = relationship("models.user.User", back_populates="payment_intents")
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert payment intent to dictionary"""
        return {
            "id": str(self.id),
            "stripe_payment_intent_id": self.stripe_payment_intent_id,
            "user_id": str(self.user_id),
            "subscription_id": str(self.subscription_id) if self.subscription_id else None,
            "amount_breakdown": self.amount_breakdown,
            "currency": self.currency,
            "status": self.status,
            "stripe_verification": self.stripe_verification,
            "payment_method_id": self.payment_method_id,
            "payment_method_type": self.payment_method_type,
            "requires_action": self.requires_action,
            "client_secret": self.client_secret,
            "expires_at": self.expires_at.isoformat() if self.expires_at else None,
            "confirmed_at": self.confirmed_at.isoformat() if self.confirmed_at else None,
            "failed_at": self.failed_at.isoformat() if self.failed_at else None,
            "failure_reason": self.failure_reason,
            "metadata": self.payment_metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }