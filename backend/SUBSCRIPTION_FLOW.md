# Subscription Billing Flow

## Overview

This document explains how automatic subscription billing works in the application.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ARQ Worker (Always Running)                  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │  Cron Job: Daily at 2:00 AM UTC                                │ │
│  │  Task: process_subscription_orders_task                        │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  When triggered:                                                    │
│  1. Query database for due subscriptions                           │
│  2. For each subscription:                                         │
│     ┌──────────────────────────────────────────────────────────┐  │
│     │ a. Get current product prices                            │  │
│     │ b. Calculate total with tax and shipping                 │  │
│     │ c. Process payment via Stripe                            │  │
│     │ d. If payment succeeds:                                  │  │
│     │    - Create order                                        │  │
│     │    - Update inventory (decrement stock)                  │  │
│     │    - Update subscription billing dates                   │  │
│     │    - Send order confirmation email                       │  │
│     │ e. If payment fails:                                     │  │
│     │    - Mark subscription as 'payment_failed'               │  │
│     │    - Store error message                                 │  │
│     │    - Do NOT create order                                 │  │
│     └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## Step-by-Step Flow

### 1. Subscription Creation
When a user creates a subscription:
- `status` = "active"
- `next_billing_date` = calculated based on billing cycle
- `auto_renew` = true
- `variant_ids` = list of product variants
- `delivery_address_id` = shipping address

### 2. ARQ Worker Monitoring
The ARQ worker runs continuously and checks every day at 2 AM:

```sql
SELECT * FROM subscriptions
WHERE status = 'active'
  AND next_billing_date <= NOW()
  AND auto_renew = true;
```

### 3. Payment Processing (FIRST)
For each due subscription:

```python
# Get user's default payment method
payment_method = get_default_payment_method(user_id)

# Process payment via Stripe
payment_result = stripe.PaymentIntent.create(
    amount=total_amount * 100,  # Convert to cents
    customer=user.stripe_customer_id,
    payment_method=payment_method.stripe_payment_method_id
)

# Confirm payment
confirmed = stripe.PaymentIntent.confirm(payment_intent.id)
```

**If payment fails:**
- Subscription status → `payment_failed`
- Error stored in `last_payment_error`
- NO order created
- NO inventory updated
- Process stops here

**If payment succeeds:**
- Continue to order creation

### 4. Order Creation (ONLY after successful payment)
```python
order = Order(
    order_number=f"SUB-{timestamp}-{uuid}",
    user_id=subscription.user_id,
    order_status="confirmed",  # Already paid
    payment_status="paid",     # Payment succeeded
    total_amount=calculated_total,
    subscription_id=subscription.id
)
```

### 5. Inventory Update
For each product in the order:
```python
inventory.quantity -= order_item.quantity
```

This happens atomically in the same database transaction.

### 6. Subscription Update
```python
# Update billing dates based on cycle
if billing_cycle == "weekly":
    next_billing_date = current_date + 7 days
elif billing_cycle == "monthly":
    next_billing_date = current_date + 30 days
elif billing_cycle == "yearly":
    next_billing_date = current_date + 365 days

subscription.next_billing_date = next_billing_date
subscription.status = "active"
```

### 7. Email Notification
Send order confirmation email via ARQ background task:
```python
send_email_task(
    "order_confirmation",
    user.email,
    order_number=order.order_number,
    total_amount=order.total_amount,
    items=order_items
)
```

## Database Schema

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,  -- 'active', 'payment_failed', 'cancelled'
    billing_cycle VARCHAR(20),     -- 'weekly', 'monthly', 'yearly'
    next_billing_date TIMESTAMP,
    auto_renew BOOLEAN DEFAULT true,
    variant_ids JSONB,             -- List of product variant IDs
    delivery_address_id UUID,
    last_payment_error TEXT,       -- Stores error if payment fails
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE,
    user_id UUID NOT NULL,
    subscription_id UUID,          -- Links to subscription if recurring
    order_status VARCHAR(50),      -- 'confirmed', 'shipped', 'delivered'
    payment_status VARCHAR(50),    -- 'paid', 'failed'
    total_amount DECIMAL(10, 2),
    created_at TIMESTAMP
);
```

## Payment Flow Guarantee

The system ensures **payment happens BEFORE order creation**:

```python
# ❌ OLD WAY (WRONG)
create_order()
update_inventory()
process_payment()  # If this fails, order already exists!

# ✅ NEW WAY (CORRECT)
payment_result = process_payment()
if payment_result.status == "succeeded":
    create_order()
    update_inventory()
    send_confirmation()
else:
    mark_subscription_failed()
    # No order created
```

## Error Handling

### Payment Failures
Common reasons:
- Insufficient funds
- Expired card
- Card declined
- Authentication required

When payment fails:
1. Subscription status → `payment_failed`
2. Error message stored in `last_payment_error`
3. User notified via email
4. Admin can see failed subscriptions in dashboard
5. User can update payment method and retry

### Inventory Issues
If inventory is insufficient:
- Payment is NOT processed
- Subscription remains active
- Next billing date unchanged
- Admin notified of low stock

### System Errors
If system error occurs:
- Transaction rolled back
- No changes persisted
- Error logged
- Admin notified

## Monitoring

### Check Subscription Processing
```sql
-- View recent subscription orders
SELECT 
    o.order_number,
    o.created_at,
    o.payment_status,
    s.billing_cycle,
    s.next_billing_date
FROM orders o
JOIN subscriptions s ON o.subscription_id = s.id
WHERE o.created_at >= NOW() - INTERVAL '7 days'
ORDER BY o.created_at DESC;
```

### Check Failed Subscriptions
```sql
SELECT 
    id,
    user_id,
    status,
    last_payment_error,
    next_billing_date
FROM subscriptions
WHERE status = 'payment_failed'
ORDER BY updated_at DESC;
```

### Check ARQ Worker Status
```bash
# Check if worker is running
ps aux | grep arq

# Check worker logs
tail -f backend/logs/banwee.log | grep subscription
```

## Testing

### Manual Test
```python
# Trigger subscription processing immediately
import asyncio
from backend.core.arq_worker import enqueue_subscription_processing

asyncio.run(enqueue_subscription_processing())
```

### Test Specific Subscription
```python
import asyncio
from backend.core.arq_worker import enqueue_subscription_renewal

subscription_id = "your-uuid-here"
asyncio.run(enqueue_subscription_renewal(subscription_id))
```

## Configuration

### Change Processing Time
Edit `backend/core/arq_worker.py`:

```python
cron_jobs = [
    cron(
        process_subscription_orders_task,
        hour=2,    # Change this (0-23)
        minute=0,  # Change this (0-59)
        run_at_startup=False,
        unique=True,
        timeout=600,
    ),
]
```

### Change Billing Cycles
Supported cycles:
- `weekly` - Every 7 days
- `monthly` - Every 30 days
- `yearly` - Every 365 days

## Best Practices

1. **Always run ARQ worker** - Set up as systemd service for auto-restart
2. **Monitor failed payments** - Check daily for payment_failed subscriptions
3. **Keep payment methods updated** - Remind users before card expiry
4. **Test regularly** - Run manual tests monthly
5. **Backup before processing** - Ensure database backups before 2 AM
6. **Use UTC timezone** - All times in UTC to avoid confusion
7. **Set up alerts** - Get notified when subscriptions fail

## Summary

The subscription system:
- ✅ Runs automatically via ARQ worker
- ✅ Processes payments BEFORE creating orders
- ✅ Updates inventory atomically
- ✅ Handles failures gracefully
- ✅ Sends confirmation emails
- ✅ Requires NO manual intervention

**The ARQ worker MUST be running for subscriptions to work!**
