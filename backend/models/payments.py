"""
Consolidated payment models
Includes: PaymentMethod, PaymentIntent, Transaction
"""
from sqlalchemy import Column, String, Boolean, ForeignKey, Float, Text, Integer, DateTime, Index
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from core.database import BaseModel, GUID
from typing import Dict, Any


class PaymentMethod(BaseModel):
    """User payment methods - hard delete only"""
    __tablename__ = "payment_methods"
    __table_args__ = (
        # Indexes for search and performance
        Index('idx_payment_methods_user_id', 'user_id'),
        Index('idx_payment_methods_type', 'type'),
        Index('idx_payment_methods_provider', 'provider'),
        Index('idx_payment_methods_stripe_id', 'stripe_payment_method_id'),
        Index('idx_payment_methods_default', 'is_default'),
        Index('idx_payment_methods_active', 'is_active'),
        # Composite indexes for common queries
        Index('idx_payment_methods_user_active', 'user_id', 'is_active'),
        Index('idx_payment_methods_user_default', 'user_id', 'is_default'),
        {'extend_existing': True}
    )

    user_id = Column(GUID(), ForeignKey("users.id"), nullable=False)
    # card, bank_account, mobile_money
    type = Column(String(50), nullable=False)
    provider = Column(String(50), nullable=False)  # stripe, paypal, momo
    last_four = Column(String(4), nullable=True)
    expiry_month = Column(Integer, nullable=True)
    expiry_year = Column(Integer, nullable=True)
    brand = Column(String(50), nullable=True)  # visa, mastercard, etc.
    stripe_payment_method_id = Column(String(255), nullable=True, unique=True)
    is_default = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    # Only use JSONB for complex payment method data that needs querying
    payment_method_metadata = Column(JSONB, default=dict)  # Store complex payment data

    # Relationships
    user = relationship("User", back_populates="payment_methods")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "type": self.type,
            "provider": self.provider,
            "last_four": self.last_four,
            "expiry_month": self.expiry_month,
            "expiry_year": self.expiry_year,
            "brand": self.brand,
            "stripe_payment_method_id": self.stripe_payment_method_id,
            "is_default": self.is_default,
            "is_active": self.is_active,
            "payment_method_metadata": self.payment_method_metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class PaymentIntent(BaseModel):
    """Payment intent tracking with hard delete only"""
    __tablename__ = "payment_intents"
    __table_args__ = (
        # Indexes for search and performance
        Index('idx_payment_intents_stripe_id', 'stripe_payment_intent_id'),
        Index('idx_payment_intents_user_id', 'user_id'),
        Index('idx_payment_intents_subscription_id', 'subscription_id'),
        Index('idx_payment_intents_order_id', 'order_id'),
        Index('idx_payment_intents_status', 'status'),
        Index('idx_payment_intents_currency', 'currency'),
        Index('idx_payment_intents_created_at', 'created_at'),
        Index('idx_payment_intents_expires_at', 'expires_at'),
        # Composite indexes for common queries
        Index('idx_payment_intents_user_status', 'user_id', 'status'),
        Index('idx_payment_intents_status_created', 'status', 'created_at'),
        {'extend_existing': True}
    )

    # Stripe payment intent ID
    stripe_payment_intent_id = Column(String(255), nullable=False, unique=True, index=True)
    
    # User and subscription references
    user_id = Column(GUID(), ForeignKey("users.id"), nullable=False, index=True)
    subscription_id = Column(GUID(), nullable=True, index=True)  # May be null for one-time payments
    order_id = Column(GUID(), ForeignKey("orders.id"), nullable=True, index=True)  # For order payments
    
    # Amount breakdown (JSONB for complex cost structure that may need querying)
    amount_breakdown = Column(JSONB, nullable=False)
    
    # Currency
    currency = Column(String(3), nullable=False, default="USD")
    
    # Payment status
    status = Column(String(50), nullable=False, default="requires_payment_method")
    
    # Stripe verification details (JSONB for structured data)
    stripe_verification = Column(JSONB, nullable=True)
    
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
    
    # Metadata for additional tracking (JSONB for structured payment data)
    payment_intent_metadata = Column(JSONB, nullable=True)

    # Relationships
    user = relationship("User", back_populates="payment_intents")
    order = relationship("Order", back_populates="payment_intents")
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert payment intent to dictionary"""
        return {
            "id": str(self.id),
            "stripe_payment_intent_id": self.stripe_payment_intent_id,
            "user_id": str(self.user_id),
            "subscription_id": str(self.subscription_id) if self.subscription_id else None,
            "order_id": str(self.order_id) if self.order_id else None,
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
            "metadata": self.payment_intent_metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class Transaction(BaseModel):
    """Financial transaction records - hard delete only"""
    __tablename__ = "transactions"
    __table_args__ = (
        # Indexes for search and performance
        Index('idx_transactions_user_id', 'user_id'),
        Index('idx_transactions_order_id', 'order_id'),
        Index('idx_transactions_payment_intent_id', 'payment_intent_id'),
        Index('idx_transactions_stripe_id', 'stripe_payment_intent_id'),
        Index('idx_transactions_status', 'status'),
        Index('idx_transactions_type', 'transaction_type'),
        Index('idx_transactions_currency', 'currency'),
        Index('idx_transactions_amount', 'amount'),
        Index('idx_transactions_idempotency_key', 'idempotency_key'),
        Index('idx_transactions_request_id', 'request_id'),
        Index('idx_transactions_created_at', 'created_at'),
        # Composite indexes for common queries
        Index('idx_transactions_user_status', 'user_id', 'status'),
        Index('idx_transactions_user_type', 'user_id', 'transaction_type'),
        Index('idx_transactions_status_created', 'status', 'created_at'),
        {'extend_existing': True}
    )

    user_id = Column(GUID(), ForeignKey("users.id"), nullable=False)
    order_id = Column(GUID(), ForeignKey("orders.id"), nullable=True)
    payment_intent_id = Column(GUID(), ForeignKey("payment_intents.id"), nullable=True)
    stripe_payment_intent_id = Column(String(255), nullable=True)
    
    amount = Column(Float, nullable=False)
    currency = Column(String(3), default="USD")
    
    # pending, succeeded, failed, cancelled, refunded
    status = Column(String(50), nullable=False)
    # payment, refund, payout, chargeback
    transaction_type = Column(String(50), nullable=False)
    
    description = Column(Text, nullable=True)
    failure_reason = Column(Text, nullable=True)
    
    # GOLDEN RULE 2: Idempotency for payments
    idempotency_key = Column(String(255), unique=True, index=True, nullable=True)
    request_id = Column(String(255), index=True, nullable=True)  # For tracking
    
    # Additional transaction metadata (Text for simple key-value storage)
    transaction_metadata = Column(Text, nullable=True)  # Simple string metadata

    # Relationships
    user = relationship("User", back_populates="transactions")
    order = relationship("Order", back_populates="transactions")
    payment_intent = relationship("PaymentIntent")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": str(self.id),
            "user_id": str(self.user_id),
            "order_id": str(self.order_id) if self.order_id else None,
            "payment_intent_id": str(self.payment_intent_id) if self.payment_intent_id else None,
            "stripe_payment_intent_id": self.stripe_payment_intent_id,
            "amount": self.amount,
            "currency": self.currency,
            "status": self.status,
            "transaction_type": self.transaction_type,
            "description": self.description,
            "failure_reason": self.failure_reason,
            "idempotency_key": self.idempotency_key,
            "request_id": self.request_id,
            "metadata": self.transaction_metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }