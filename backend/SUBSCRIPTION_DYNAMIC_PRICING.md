# Subscription Dynamic Pricing - No Stored Prices

## Overview

Subscriptions NO LONGER store price fields (except `price_at_creation` for reference). All pricing is calculated dynamically at billing time.

## What Changed

### ❌ Removed Stored Fields

These fields are NO LONGER stored in the subscription:
- `price` (removed - calculated dynamically)
- `subtotal` (removed - calculated dynamically)
- `total` (removed - calculated dynamically)
- `shipping_cost` (removed - calculated dynamically)
- `tax_amount` (removed - calculated dynamically)
- `discount_amount` (removed - calculated dynamically)
- `cost_breakdown` (removed - calculated dynamically)
- `tax_rate_applied` (removed - calculated dynamically)

### ✅ What IS Stored

Only these essential fields are stored:
- `variant_ids` - List of product variant IDs
- `subscription_metadata.variant_quantities` - Quantity for each variant
- `delivery_type` - Shipping method type (e.g., "standard", "express")
- `delivery_address_id` - Shipping address reference
- `currency` - Currency code (e.g., "USD")
- `billing_cycle` - Frequency (e.g., "monthly", "weekly")
- `next_billing_date` - When to bill next
- `status` - Subscription status
- `price_at_creation` - ✨ Initial price when subscription was created (for reference only)

## Why This Change?

### 1. Single Source of Truth
- Product prices in `ProductVariant` table
- Shipping costs in `ShippingMethod` table
- Tax rates calculated dynamically
- No data duplication

### 2. Always Current Prices
- Subscriptions automatically use latest prices
- No need to update subscriptions when prices change
- Customers always charged current market rates

### 3. Simplified Updates
- Change product price → affects all subscriptions automatically
- Change shipping cost → affects all subscriptions automatically
- No sync issues or stale data

### 4. Accurate Calculations
- Tax calculated based on current address
- Shipping calculated based on current methods
- Discounts calculated based on current rules

## How It Works Now

### Creating a Subscription

```python
subscription = Subscription(
    user_id=user_id,
    name="Monthly Coffee Delivery",
    variant_ids=["variant-uuid-1", "variant-uuid-2"],
    subscription_metadata={
        "variant_quantities": {
            "variant-uuid-1": 2,
            "variant-uuid-2": 1
        }
    },
    delivery_type="standard",
    delivery_address_id=address_id,
    currency="USD",
    billing_cycle="monthly",
    next_billing_date=datetime.now() + timedelta(days=30),
    price_at_creation=29.99  # Store initial price for reference
)
# NO other price fields stored!
```

### Billing Time (2 AM Daily)

```python
# 1. Fetch current product variants
variants = db.query(ProductVariant).filter(
    ProductVariant.id.in_(subscription.variant_ids)
).all()

# 2. Calculate current prices
subtotal = 0
for variant in variants:
    quantity = subscription.metadata["variant_quantities"][str(variant.id)]
    current_price = variant.sale_price or variant.base_price
    subtotal += current_price * quantity

# 3. Get current shipping cost
shipping_method = db.query(ShippingMethod).filter(
    ShippingMethod.name.contains(subscription.delivery_type)
).first()
shipping_cost = shipping_method.price

# 4. Calculate current tax
tax_amount = calculate_tax(subtotal, subscription.delivery_address)

# 5. Calculate total
total = subtotal + shipping_cost + tax_amount

# 6. Process payment with current total
payment_result = process_payment(user_id, total)

# 7. Create order with current prices
if payment_result.success:
    order = Order(
        subtotal=subtotal,
        shipping_cost=shipping_cost,
        tax_amount=tax_amount,
        total_amount=total
    )
```

### Displaying Subscription to User

When showing subscription details to user, calculate on-the-fly:

```python
async def get_subscription_details(subscription_id):
    subscription = await db.get(Subscription, subscription_id)
    
    # Calculate current pricing
    variants = await get_variants(subscription.variant_ids)
    current_cost = await calculate_subscription_cost(
        variants,
        subscription.delivery_type,
        subscription.delivery_address_id
    )
    
    return {
        "id": subscription.id,
        "name": subscription.name,
        "status": subscription.status,
        "next_billing_date": subscription.next_billing_date,
        # Calculated dynamically
        "current_price": current_cost["total_amount"],
        "subtotal": current_cost["subtotal"],
        "shipping": current_cost["shipping_cost"],
        "tax": current_cost["tax_amount"],
        "items": [
            {
                "name": variant.name,
                "current_price": variant.current_price,
                "quantity": subscription.metadata["variant_quantities"][str(variant.id)]
            }
            for variant in variants
        ]
    }
```

## Benefits

### For Customers
✅ Always see current prices
✅ Benefit from price decreases immediately
✅ Transparent pricing (no hidden old prices)
✅ Accurate tax calculations

### For Business
✅ Update prices once (in ProductVariant table)
✅ No subscription sync needed
✅ Consistent pricing across platform
✅ Easy to run promotions

### For Developers
✅ Less code to maintain
✅ No data synchronization
✅ Single source of truth
✅ Fewer bugs from stale data

## Migration Notes

If you have existing subscriptions with stored prices:

```sql
-- These fields can be removed from the database
ALTER TABLE subscriptions DROP COLUMN IF EXISTS price;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS subtotal;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS total;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS shipping_cost;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS tax_amount;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS discount_amount;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS cost_breakdown;
ALTER TABLE subscriptions DROP COLUMN IF EXISTS tax_rate_applied;
```

Or keep them for historical reference but don't use them:

```python
# Old subscriptions might have these fields
# Just ignore them - calculate dynamically instead
if hasattr(subscription, 'price'):
    # Don't use subscription.price
    # Calculate current price instead
    current_price = await calculate_current_price(subscription)
```

## API Response Example

### Before (Stored Prices)
```json
{
  "id": "sub-123",
  "price": 29.99,
  "subtotal": 25.00,
  "shipping_cost": 4.99,
  "tax_amount": 0.00
}
```

### After (Dynamic Prices)
```json
{
  "id": "sub-123",
  "variant_ids": ["var-1", "var-2"],
  "delivery_type": "standard",
  "next_billing_date": "2026-03-15T02:00:00Z",
  "current_pricing": {
    "subtotal": 27.00,
    "shipping_cost": 5.99,
    "tax_amount": 2.10,
    "total": 35.09
  }
}
```

Note: `current_pricing` is calculated on-the-fly, not stored.

## Summary

✅ **No stored prices** - All pricing calculated dynamically
✅ **Always current** - Uses latest product and shipping prices
✅ **Single source of truth** - ProductVariant and ShippingMethod tables
✅ **Automatic updates** - Price changes apply to all subscriptions
✅ **Accurate billing** - Current prices at billing time

This ensures subscriptions always reflect current market prices and eliminates data synchronization issues!
