# Subscription Model Updates

## New Fields Added

### 1. `delivery_type` (String)
- **Purpose**: Store shipping method type
- **Values**: "standard", "express", "overnight"
- **Default**: "standard"
- **Usage**: Used to fetch shipping cost from ShippingMethod table dynamically

### 2. `delivery_address_id` (UUID, Foreign Key)
- **Purpose**: Reference to customer's delivery address
- **Foreign Key**: `addresses.id`
- **Usage**: Used for tax calculation and shipping

### 3. `discount` (JSON)
- **Purpose**: Store discount information applied to subscription
- **Structure**:
  ```json
  {
    "type": "percentage",  // or "fixed"
    "value": 10,           // 10% off, or $10 if fixed
    "code": "SAVE10"       // optional coupon code
  }
  ```
- **Examples**:
  ```json
  // Percentage discount
  {"type": "percentage", "value": 15, "code": "WELCOME15"}
  
  // Fixed amount discount
  {"type": "fixed", "value": 5.00, "code": "SAVE5"}
  
  // No discount
  null
  ```

### 4. `subscription_metadata` (JSON)
- **Purpose**: Store additional subscription information
- **Structure**:
  ```json
  {
    "variant_quantities": {
      "variant-uuid-1": 2,
      "variant-uuid-2": 1
    },
    "notes": "Customer prefers morning delivery",
    "gift_message": "Happy Birthday!",
    "custom_field": "any value"
  }
  ```
- **Replaces**: Old `variant_quantities` field (deprecated)

### 5. `last_payment_error` (Text)
- **Purpose**: Store error message when payment fails
- **Usage**: Display to user, help with debugging
- **Example**: "Card declined: insufficient funds"

### 6. `price_at_creation` (Float)
- **Purpose**: Store initial price when subscription was created
- **Usage**: Reference only, show price changes to customers
- **Example**: 29.99

## Deprecated Fields

These fields are kept for backward compatibility but NOT used in new code:

- ❌ `price` - Use dynamic calculation instead
- ❌ `subtotal` - Calculate dynamically
- ❌ `total` - Calculate dynamically
- ❌ `shipping_cost` - Calculate dynamically
- ❌ `tax_amount` - Calculate dynamically
- ❌ `tax_rate` - Calculate dynamically
- ❌ `discount_amount` - Calculate dynamically
- ❌ `cost_breakdown` - Calculate dynamically
- ❌ `variant_quantities` - Use `subscription_metadata.variant_quantities` instead

## Updated Subscription Model

```python
class Subscription(BaseModel):
    # Core fields
    user_id: UUID
    name: str
    status: str  # active, cancelled, expired, paused, payment_failed
    currency: str = "USD"
    billing_cycle: str = "monthly"
    auto_renew: bool = True
    
    # Pricing (reference only)
    price_at_creation: float  # Initial price
    
    # Product information
    variant_ids: List[str]  # List of variant UUIDs
    
    # Delivery information
    delivery_type: str = "standard"
    delivery_address_id: UUID
    
    # Discount information
    discount: dict = {
        "type": "percentage",  # or "fixed"
        "value": 10,
        "code": "SAVE10"
    }
    
    # Metadata
    subscription_metadata: dict = {
        "variant_quantities": {
            "variant-uuid": 2
        }
    }
    
    # Lifecycle
    current_period_start: datetime
    current_period_end: datetime
    next_billing_date: datetime
    cancelled_at: datetime
    paused_at: datetime
    pause_reason: str
    last_payment_error: str
```

## Usage Examples

### Creating Subscription with Discount

```python
subscription = Subscription(
    user_id=user_id,
    name="Premium Monthly",
    variant_ids=["var-1", "var-2"],
    delivery_type="express",
    delivery_address_id=address_id,
    discount={
        "type": "percentage",
        "value": 15,
        "code": "WELCOME15"
    },
    subscription_metadata={
        "variant_quantities": {
            "var-1": 2,
            "var-2": 1
        }
    },
    price_at_creation=29.99
)
```

### Calculating Current Price with Discount

```python
# Get current prices
subtotal = calculate_subtotal(variants, quantities)

# Apply discount
if subscription.discount:
    if subscription.discount["type"] == "percentage":
        discount_amount = subtotal * (subscription.discount["value"] / 100)
    else:  # fixed
        discount_amount = subscription.discount["value"]
    
    subtotal_after_discount = subtotal - discount_amount
else:
    subtotal_after_discount = subtotal

# Add shipping and tax
shipping = get_shipping_cost(subscription.delivery_type)
tax = calculate_tax(subtotal_after_discount, address)
total = subtotal_after_discount + shipping + tax
```

### Handling Payment Failure

```python
try:
    payment_result = process_payment(user_id, total)
except PaymentError as e:
    subscription.status = "payment_failed"
    subscription.last_payment_error = str(e)
    await db.commit()
    
    # Notify customer
    send_email(
        user.email,
        "Payment Failed",
        f"Your subscription payment failed: {e}"
    )
```

## Migration

Run the migration to add new fields:

```bash
cd backend
alembic upgrade head
```

This will:
1. Add `delivery_type`, `delivery_address_id`, `discount`, `subscription_metadata`, `last_payment_error`
2. Migrate existing `variant_quantities` to `subscription_metadata`
3. Add foreign key constraint for `delivery_address_id`

## API Response Example

```json
{
  "id": "sub-123",
  "name": "Premium Monthly",
  "status": "active",
  "currency": "USD",
  "billing_cycle": "monthly",
  "variant_ids": ["var-1", "var-2"],
  "delivery_type": "express",
  "delivery_address_id": "addr-456",
  "discount": {
    "type": "percentage",
    "value": 15,
    "code": "WELCOME15"
  },
  "subscription_metadata": {
    "variant_quantities": {
      "var-1": 2,
      "var-2": 1
    }
  },
  "price_at_creation": 29.99,
  "next_billing_date": "2026-03-15T02:00:00Z",
  "current_pricing": {
    "subtotal": 50.00,
    "discount": 7.50,
    "subtotal_after_discount": 42.50,
    "shipping": 15.99,
    "tax": 3.40,
    "total": 61.89
  }
}
```

Note: `current_pricing` is calculated dynamically, not stored.

## Summary

✅ Added `delivery_type`, `delivery_address_id`, `discount`, `subscription_metadata`, `last_payment_error`, `price_at_creation`
✅ Deprecated old price fields (kept for backward compatibility)
✅ All pricing calculated dynamically at billing time
✅ Discount support with percentage or fixed amount
✅ Flexible metadata storage for custom fields
✅ Better error tracking with `last_payment_error`
