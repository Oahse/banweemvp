# Subscription Price Updates - How It Works

## Question: What happens if a product variant price is updated?

## Answer: Subscriptions ALWAYS use CURRENT prices at billing time ✅

### How It Works

When the subscription renewal runs (daily at 2 AM), it:

1. **Fetches current product variants from database**
   ```python
   variants = await db.execute(
       select(ProductVariant).where(
           ProductVariant.id.in_(subscription.variant_ids)
       )
   )
   ```

2. **Recalculates pricing with CURRENT prices**
   ```python
   updated_cost = await _recalculate_subscription_pricing(subscription, variants)
   ```
   
   This function:
   - Gets the CURRENT `sale_price` or `base_price` from each variant
   - Recalculates subtotal with current prices
   - Recalculates tax based on current prices
   - Recalculates shipping
   - Returns updated total

3. **Creates order with CURRENT prices**
   ```python
   order = Order(
       subtotal=updated_cost["subtotal"],        # Current prices
       tax_amount=updated_cost["tax_amount"],    # Current tax
       shipping_cost=updated_cost["delivery_cost"],
       total_amount=updated_cost["total_amount"] # Current total
   )
   ```

4. **Updates subscription with new pricing**
   ```python
   subscription.price = updated_cost["total_amount"]
   subscription.cost_breakdown = updated_cost
   subscription.tax_amount = updated_cost["tax_amount"]
   subscription.subtotal = updated_cost["subtotal"]
   ```

## Example Scenarios

### Scenario 1: Price Increase

**Initial subscription:**
- Product A: $10
- Product B: $15
- Total: $25

**Price updated:**
- Product A: $12 (increased)
- Product B: $15 (same)

**Next billing (at 2 AM):**
- System fetches current prices: $12 and $15
- Calculates new total: $27
- Charges customer: $27
- Creates order with: $27
- Updates subscription.price to: $27

### Scenario 2: Price Decrease

**Initial subscription:**
- Product A: $20
- Total: $20

**Price updated:**
- Product A: $15 (decreased)

**Next billing (at 2 AM):**
- System fetches current price: $15
- Calculates new total: $15
- Charges customer: $15 (less than before!)
- Creates order with: $15
- Updates subscription.price to: $15

### Scenario 3: Product Discontinued

**Initial subscription:**
- Product A: $10
- Product B: $15

**Product B discontinued:**
- Product B deleted or marked inactive

**Next billing (at 2 AM):**
- System tries to fetch variants
- Product B not found or inactive
- Subscription processing FAILS
- Subscription marked as `payment_failed`
- Customer notified
- Admin can manually resolve

## Benefits

### For Customers
✅ Always get current market prices
✅ Benefit from price decreases automatically
✅ Transparent pricing (see current prices in subscription details)

### For Business
✅ No need to manually update subscriptions when prices change
✅ Pricing stays consistent with regular orders
✅ Easy to run promotions (price changes apply to subscriptions too)

### For System
✅ Single source of truth (ProductVariant table)
✅ No price synchronization needed
✅ Automatic price updates

## Important Notes

### 1. Customer Notification
Consider notifying customers when subscription price changes significantly:

```python
# In subscription_scheduler.py
old_price = subscription.price
new_price = updated_cost["total_amount"]

if abs(new_price - old_price) > (old_price * 0.1):  # 10% change
    # Send price change notification email
    send_email_task(
        "subscription_price_change",
        user.email,
        old_price=old_price,
        new_price=new_price,
        change_percentage=((new_price - old_price) / old_price) * 100
    )
```

### 2. Price Lock Option (Future Enhancement)
If you want to offer price-locked subscriptions:

```python
# Add to Subscription model
price_locked: bool = False
locked_price: float = None

# In subscription_scheduler.py
if subscription.price_locked:
    # Use locked_price instead of recalculating
    total_amount = subscription.locked_price
else:
    # Use current prices (default behavior)
    updated_cost = await _recalculate_subscription_pricing(...)
    total_amount = updated_cost["total_amount"]
```

### 3. Price History
The system maintains price history automatically:

```sql
-- View price changes over time
SELECT 
    o.order_number,
    o.created_at,
    o.total_amount,
    s.id as subscription_id
FROM orders o
JOIN subscriptions s ON o.subscription_id = s.id
WHERE s.id = 'subscription-uuid'
ORDER BY o.created_at DESC;
```

## Database Schema

### Subscription Table
```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    variant_ids JSONB,              -- List of variant IDs (not prices!)
    price DECIMAL(10, 2),            -- Updated each billing cycle
    cost_breakdown JSONB,            -- Updated each billing cycle
    subtotal DECIMAL(10, 2),         -- Updated each billing cycle
    tax_amount DECIMAL(10, 2),       -- Updated each billing cycle
    shipping_cost DECIMAL(10, 2),    -- Updated each billing cycle
    next_billing_date TIMESTAMP
);
```

### ProductVariant Table (Source of Truth)
```sql
CREATE TABLE product_variants (
    id UUID PRIMARY KEY,
    base_price DECIMAL(10, 2),       -- Current base price
    sale_price DECIMAL(10, 2),       -- Current sale price (if on sale)
    updated_at TIMESTAMP              -- When price was last updated
);
```

## Testing Price Updates

### Test 1: Update price before billing
```python
# 1. Create subscription with Product A at $10
subscription = create_subscription(variant_ids=[product_a_id])

# 2. Update product price
product_a.base_price = 15.00
db.commit()

# 3. Trigger subscription processing
await process_subscription_orders_task()

# 4. Verify order was created with new price
order = get_latest_order(subscription_id)
assert order.total_amount == 15.00  # New price!
```

### Test 2: Price decrease
```python
# 1. Create subscription with Product A at $20
subscription = create_subscription(variant_ids=[product_a_id])

# 2. Decrease product price
product_a.base_price = 12.00
db.commit()

# 3. Trigger subscription processing
await process_subscription_orders_task()

# 4. Verify customer was charged less
order = get_latest_order(subscription_id)
assert order.total_amount == 12.00  # Lower price!
```

## Summary

✅ **Subscriptions use CURRENT prices** - Not the price when subscription was created
✅ **Automatic updates** - No manual intervention needed
✅ **Transparent** - Customers see current prices
✅ **Fair** - Customers benefit from price decreases
✅ **Simple** - Single source of truth (ProductVariant table)

The system is designed to always charge current market prices, making it fair for both customers and business!
