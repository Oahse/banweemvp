# Subscription System Implementation

## Overview
Complete subscription system with dynamic pricing, historical tracking, and automated billing.

## Architecture

### Models (`backend/models/subscriptions.py`)
- `Subscription`: Main subscription model with historical and current pricing
- `SubscriptionProduct`: Tracks products in subscriptions with removal tracking

### Services
- `SubscriptionService` (`backend/services/subscriptions/service.py`): Core subscription management
- `SubscriptionScheduler` (`backend/services/subscriptions/scheduler.py`): Automated billing and order creation

### Schemas (`backend/schemas/subscriptions.py`)
- `CreateSubscription`: Create new subscription
- `UpdateSubscription`: Update existing subscription
- `SubscriptionResponse`: API response format

## Key Features

### 1. Dynamic Pricing
- **Historical Prices**: Stored at creation, never change
  - `price_at_creation`
  - `variant_prices_at_creation`
  - `shipping_amount_at_creation`
  - `tax_amount_at_creation`
  - `tax_rate_at_creation`

- **Current Prices**: Calculated dynamically at billing time
  - `current_variant_prices`
  - `current_shipping_amount`
  - `current_tax_amount`
  - `current_tax_rate`

### 2. Discount Handling
Discounts are stored as separate fields:
```python
discount_id: UUID  # Reference to promocode
discount_type: str  # "percentage" or "fixed"
discount_value: float  # 10 for 10% or $10
discount_code: str  # "SAVE10"
```

### 3. Shipping Cost Lookup
Shipping costs are fetched dynamically from the database:
- Matches delivery type to shipping method name
- Falls back to cheapest method if no match
- No hardcoded shipping costs

### 4. Payment-First Flow
1. Calculate current pricing
2. Process payment
3. Create order (only if payment succeeds)
4. Create order items
5. Update inventory
6. Update subscription billing dates

### 5. Automated Billing
ARQ cron job runs daily at 2 AM:
```python
cron(
    process_subscription_orders_task,
    name='process_subscription_orders',
    hour=2,
    minute=0,
    run_at_startup=False
)
```

## API Endpoints

### Create Subscription
```
POST /v1/subscriptions/
Body: {
  "name": "Monthly Coffee Box",
  "variant_ids": ["uuid1", "uuid2"],
  "variant_quantities": {"uuid1": 2, "uuid2": 1},
  "delivery_type": "standard",
  "delivery_address_id": "uuid",
  "billing_cycle": "monthly",
  "currency": "USD",
  "discount_code": "SAVE10"
}
```

### Get User Subscriptions
```
GET /v1/subscriptions/
Query: ?page=1&limit=10
```

### Get Subscription by ID
```
GET /v1/subscriptions/{subscription_id}
```

### Update Subscription
```
PUT /v1/subscriptions/{subscription_id}
Body: {
  "name": "Updated Name",
  "delivery_type": "express",
  "auto_renew": true
}
```

### Cancel Subscription
```
POST /v1/subscriptions/{subscription_id}/cancel
Body: {
  "reason": "No longer needed"
}
```

### Pause Subscription
```
POST /v1/subscriptions/{subscription_id}/pause
Body: {
  "reason": "Vacation"
}
```

### Resume Subscription
```
POST /v1/subscriptions/{subscription_id}/resume
```

## Database Migrations

Run migrations to update the subscription model:
```bash
cd backend
alembic upgrade head
```

Migrations include:
- `2026_02_13_final_subscription_model.py`: Final model structure
- `2026_02_13_update_discount_fields.py`: Discount field updates

## Service Methods

### SubscriptionService

#### create()
Creates a new subscription with historical pricing.

#### update()
Updates subscription details (name, delivery, variants, etc.).

#### cancel()
Cancels a subscription (soft delete).

#### pause()
Pauses an active subscription.

#### resume()
Resumes a paused or cancelled subscription.

#### get_by_id()
Gets a subscription by ID with optional user filtering.

#### get_user_subscriptions()
Gets all subscriptions for a user with optional status filter.

#### recalculate_current_pricing()
Recalculates current pricing based on latest product prices.

### SubscriptionScheduler

#### process_due_subscriptions()
Processes all subscriptions due for billing.

#### process_subscription()
Processes a single subscription:
1. Recalculates current pricing
2. Processes payment
3. Creates order (if payment succeeds)
4. Updates inventory
5. Updates subscription billing dates

## Configuration

### ARQ Worker
Start the ARQ worker separately from FastAPI:
```bash
python backend/start_arq_worker.py
```

### Environment Variables
```
DATABASE_URL=postgresql+asyncpg://...
REDIS_URL=redis://localhost:6379
```

## Testing

### Manual Subscription Processing
```python
from services.subscriptions.scheduler import SubscriptionScheduler

scheduler = SubscriptionScheduler(db)
result = await scheduler.process_due_subscriptions()
```

### Check Subscription Status
```python
from services.subscriptions.service import SubscriptionService

service = SubscriptionService(db)
subscription = await service.get_by_id(subscription_id)
print(subscription.to_dict(include_products=True))
```

## Notes

- Subscriptions always bill at current prices, not historical prices
- Historical prices are stored for reference only
- Payment must succeed before order is created
- Inventory is updated after successful payment
- Email notifications are sent after successful order creation
- Shipping costs are fetched from database dynamically
- Discounts are applied at creation and stored for reference
