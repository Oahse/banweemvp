# Final Subscription Model - Historical + Current Pricing

## Overview

The subscription model now stores **historical prices at creation** while calculating **current prices dynamically**. This gives you the best of both worlds:

✅ Historical accuracy - Know what was charged originally
✅ Current pricing - Always get latest prices for billing
✅ Price comparison - Show customers how prices changed

## Model Structure

```python
class Subscription:
    # Core
    user_id: UUID
    name: str
    status: str  # active, cancelled, expired, paused, payment_failed
    currency: str = "USD"
    billing_cycle: str = "monthly"  # weekly, monthly, yearly
    auto_renew: bool = True
    
    # Dates
    current_period_start: datetime
    current_period_end: datetime
    next_billing_date: datetime
    cancelled_at: datetime
    paused_at: datetime
    
    # Product variants
    variants: List[Dict] = [
        {"id": "variant-uuid", "qty": 2}
    ]
    
    # Delivery
    delivery_type: str = "standard"
    delivery_address_id: UUID
    
    # HISTORICAL PRICES (at creation - never changes)
    variant_prices_at_creation: List[Dict] = [
        {"id": "variant-uuid", "price": 10.99, "qty": 2}
    ]
    shipping_amount_at_creation: float = 5.99
    tax_amount_at_creation: float = 1.36
    tax_rate_at_creation: float = 0.08
    total_charged_at_creation: float = 29.33
    
    # Discount
    discount_id: UUID  # Reference to promo code
    discount_type: str  # "percentage" or "fixed"
    discount_value: float  # 10 for 10% or $10
    discount_code: str  # "SAVE10"
    
    # Payment
    payment_gateway: str = "stripe"
    payment_reference: str  # Stripe subscription ID
    
    # Error tracking
    last_payment_error: str
```

## Creating a Subscription

```python
from datetime import datetime, timedelta

# Calculate initial pricing
cost_breakdown = await calculate_subscription_cost(
    variants=variants,
    delivery_type=delivery_type,
    delivery_address_id=delivery_address_id
)

now = datetime.utcnow()
period_end = now + timedelta(days=30)

subscription = Subscription(
    # Basic info
    user_id=user_id,
    name="Monthly Coffee Subscription",
    status="active",
    currency="USD",
    billing_cycle="monthly",
    current_period_start=now,
    current_period_end=period_end,
    next_billing_date=period_end,
    
    # Delivery
    delivery_type="standard",
    delivery_address_id=address_id,
    
    # Product variants
    variants=[
        {"id": str(variant1.id), "qty": 2},
        {"id": str(variant2.id), "qty": 1}
    ],
    
    # Historical prices (at creation)
    variant_prices_at_creation=[
        {"id": str(variant1.id), "price": 10.99, "qty": 2},
        {"id": str(variant2.id), "price": 15.99, "qty": 1}
    ],
    shipping_amount_at_creation=5.99,
    tax_amount_at_creation=3.04,
    tax_rate_at_creation=0.08,
    total_charged_at_creation=47.00,
    
    # Discount (if applicable)
    discount_id=promo.id if promo else None,
    discount_type="percentage" if promo else None,
    discount_value=15 if promo else None,
    discount_code="WELCOME15" if promo else None,
    
    # Payment
    payment_gateway="stripe",
    payment_reference=stripe_subscription_id
)

await db.add(subscription)
await db.commit()
```

## Getting Current Prices

```python
# Get current variant prices
current_prices = await subscription.get_current_variant_prices(db)
# Returns: [{"id": "uuid", "current_price": 12.99, "qty": 2}, ...]

# Get current shipping
current_shipping = await subscription.get_current_shipping_amount(db)
# Returns: 6.99

# Get current tax
tax_info = await subscription.get_current_tax_info(db)
# Returns: {"tax_amount": 3.50, "tax_rate": 0.08}

# Get current total
current_total = await subscription.get_current_total_amount(db)
# Returns: 52.47
```

## Billing Time (2 AM Daily)

```python
async def process_subscription_billing(subscription: Subscription, db):
    # Get CURRENT prices (not historical)
    current_prices = await subscription.get_current_variant_prices(db)
    current_shipping = await subscription.get_current_shipping_amount(db)
    tax_info = await subscription.get_current_tax_info(db)
    current_total = await subscription.get_current_total_amount(db)
    
    # Process payment with CURRENT total
    payment_result = await process_payment(
        user_id=subscription.user_id,
        amount=current_total,
        payment_method_id=payment_method.id
    )
    
    if payment_result.status == "succeeded":
        # Create order with CURRENT prices
        order = Order(
            user_id=subscription.user_id,
            subscription_id=subscription.id,
            subtotal=sum(p["current_price"] * p["qty"] for p in current_prices),
            shipping_cost=current_shipping,
            tax_amount=tax_info["tax_amount"],
            total_amount=current_total
        )
        await db.add(order)
        await db.commit()
```

## API Response Example

```json
{
  "id": "sub-123",
  "name": "Monthly Coffee Subscription",
  "status": "active",
  "currency": "USD",
  "billing_cycle": "monthly",
  "next_billing_date": "2026-03-15T02:00:00Z",
  
  "variants": [
    {"id": "var-1", "qty": 2},
    {"id": "var-2", "qty": 1}
  ],
  
  "delivery_type": "standard",
  "delivery_address_id": "addr-456",
  
  "historical_pricing": {
    "variant_prices_at_creation": [
      {"id": "var-1", "price": 10.99, "qty": 2},
      {"id": "var-2", "price": 15.99, "qty": 1}
    ],
    "shipping_amount_at_creation": 5.99,
    "tax_amount_at_creation": 3.04,
    "tax_rate_at_creation": 0.08,
    "total_charged_at_creation": 47.00
  },
  
  "current_pricing": {
    "variant_prices": [
      {"id": "var-1", "current_price": 12.99, "qty": 2},
      {"id": "var-2", "current_price": 17.99, "qty": 1}
    ],
    "shipping_amount": 6.99,
    "tax_amount": 3.50,
    "tax_rate": 0.08,
    "total": 52.47
  },
  
  "discount": {
    "discount_id": "promo-789",
    "discount_type": "percentage",
    "discount_value": 15,
    "discount_code": "WELCOME15"
  },
  
  "payment": {
    "payment_gateway": "stripe",
    "payment_reference": "sub_1234567890"
  }
}
```

## Price Comparison UI

Show customers how prices changed:

```python
async def get_subscription_with_price_comparison(subscription_id, db):
    subscription = await db.get(Subscription, subscription_id)
    
    # Historical
    original_total = subscription.total_charged_at_creation
    
    # Current
    current_total = await subscription.get_current_total_amount(db)
    
    # Comparison
    price_change = current_total - original_total
    price_change_percent = (price_change / original_total) * 100
    
    return {
        "subscription": subscription.to_dict(),
        "price_comparison": {
            "original_total": original_total,
            "current_total": current_total,
            "price_change": price_change,
            "price_change_percent": price_change_percent,
            "message": f"Price {'increased' if price_change > 0 else 'decreased'} by ${abs(price_change):.2f}"
        }
    }
```

## Benefits

### Historical Accuracy
✅ Know exactly what was charged originally
✅ Audit trail for billing disputes
✅ Historical reporting and analytics

### Current Pricing
✅ Always bill at current market rates
✅ Automatic price updates
✅ No manual subscription updates needed

### Price Transparency
✅ Show customers price changes
✅ Notify when prices change significantly
✅ Build trust with transparency

## Migration

Run migrations to update the model:

```bash
cd backend
alembic upgrade head
```

This will:
1. Add historical pricing fields
2. Add discount fields
3. Add payment gateway fields
4. Migrate existing data to new format

## Summary

✅ **Historical prices stored** - `variant_prices_at_creation`, `shipping_amount_at_creation`, etc.
✅ **Current prices calculated** - `get_current_variant_prices()`, `get_current_total_amount()`
✅ **Best of both worlds** - Historical accuracy + dynamic pricing
✅ **Price comparison** - Show customers how prices changed
✅ **Discount support** - Store promo code information
✅ **Payment tracking** - Store gateway and reference

This model gives you complete flexibility while maintaining historical accuracy!
