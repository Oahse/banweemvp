from sqlalchemy import Column, String, Float, DateTime, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from core.database import BaseModel, GUID
from decimal import Decimal
from typing import Dict, Any


class PricingConfig(BaseModel):
    """Admin-configurable pricing settings for subscriptions"""
    __tablename__ = "pricing_configs"
    __table_args__ = {'extend_existing': True}

    # Subscription percentage (0.1% to 50%)
    subscription_percentage = Column(Float, nullable=False, default=10.0)
    
    # Delivery costs by type (JSON: {"standard": 10.0, "express": 25.0, "overnight": 50.0})
    delivery_costs = Column(JSON, nullable=False, default={})
    
    # Tax rates by location (JSON: {"US": 0.08, "CA": 0.13, "UK": 0.20})
    tax_rates = Column(JSON, nullable=False, default={})
    
    # Currency settings (JSON: {"default": "USD", "supported": ["USD", "EUR", "GBP"]})
    currency_settings = Column(JSON, nullable=False, default={"default": "USD"})
    
    # Admin user who made the change
    updated_by = Column(GUID(), nullable=False)
    
    # Version for tracking configuration changes
    version = Column(String(50), nullable=False, default="1.0")
    
    # Whether this configuration is active
    is_active = Column(String(20), nullable=False, default="active")
    
    # Audit information
    change_reason = Column(Text, nullable=True)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert pricing config to dictionary"""
        return {
            "id": str(self.id),
            "subscription_percentage": self.subscription_percentage,
            "delivery_costs": self.delivery_costs,
            "tax_rates": self.tax_rates,
            "currency_settings": self.currency_settings,
            "updated_by": str(self.updated_by),
            "version": self.version,
            "is_active": self.is_active,
            "change_reason": self.change_reason,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class SubscriptionCostHistory(BaseModel):
    """Historical record of subscription cost changes"""
    __tablename__ = "subscription_cost_history"
    __table_args__ = {'extend_existing': True}

    subscription_id = Column(GUID(), nullable=False, index=True)
    
    # Old cost breakdown (JSON)
    old_cost_breakdown = Column(JSON, nullable=True)
    
    # New cost breakdown (JSON)
    new_cost_breakdown = Column(JSON, nullable=False)
    
    # Reason for cost change
    change_reason = Column(String(100), nullable=False)  # "admin_percentage_change", "variant_price_change", etc.
    
    # When the change becomes effective
    effective_date = Column(DateTime(timezone=True), nullable=False)
    
    # Admin user who triggered the change (if applicable)
    changed_by = Column(GUID(), nullable=True)
    
    # Additional metadata
    pricing_metadata = Column(JSON, nullable=True)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert cost history to dictionary"""
        return {
            "id": str(self.id),
            "subscription_id": str(self.subscription_id),
            "old_cost_breakdown": self.old_cost_breakdown,
            "new_cost_breakdown": self.new_cost_breakdown,
            "change_reason": self.change_reason,
            "effective_date": self.effective_date.isoformat() if self.effective_date else None,
            "changed_by": str(self.changed_by) if self.changed_by else None,
            "metadata": self.pricing_metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }