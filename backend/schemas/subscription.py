from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

from schemas.product import ProductVariantResponse # Import ProductVariantResponse


class SubscriptionBase(BaseModel):
    user_id: Optional[str] = None
    plan_id: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)
    price: Optional[float] = None # Added price field as it's in the model
    currency: Optional[str] = None # Added currency field
    billing_cycle: Optional[str] = None # Added billing_cycle
    auto_renew: bool = True
    current_period_start: Optional[datetime] = None # Changed from start_date
    current_period_end: Optional[datetime] = None # Changed from end_date
    cancelled_at: Optional[datetime] = None # Added cancelled_at


class SubscriptionCreate(SubscriptionBase):
    # When creating, user_id and products will be handled by service layer
    pass


class SubscriptionUpdate(SubscriptionBase):
    plan_id: Optional[str] = None
    status: Optional[str] = None
    price: Optional[float] = None
    currency: Optional[str] = None
    billing_cycle: Optional[str] = None
    auto_renew: Optional[bool] = None
    current_period_start: Optional[datetime] = None
    current_period_end: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None


class SubscriptionResponse(SubscriptionBase): # Changed name for consistency with other Response schemas
    id: str
    created_at: datetime
    updated_at: datetime
    products: List[ProductVariantResponse] = [] # Add the list of associated products

    model_config = ConfigDict(from_attributes=True)
