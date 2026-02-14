# Promocode Scheduler - Automatic Status Management

## Overview
The promocode scheduler automatically manages promocode lifecycle by activating and deactivating promocodes based on their validity dates and usage limits. It runs as a cron job in the ARQ worker at 12 AM (midnight) daily.

## Features

### 1. Automatic Activation
Promocodes are automatically activated when:
- Current time is past `valid_from` date (or `valid_from` is null)
- Current time is before `valid_until` date (or `valid_until` is null)
- Usage count is below `usage_limit` (or `usage_limit` is null)
- Promocode is currently inactive

### 2. Automatic Deactivation
Promocodes are automatically deactivated when:
- **Expired**: Current time is past `valid_until` date
- **Usage Limit Reached**: `used_count` >= `usage_limit`
- **Not Yet Valid**: Current time is before `valid_from` date

### 3. Usage Tracking
- `used_count` is incremented when a promocode is applied
- When `used_count` reaches `usage_limit`, the promocode is automatically deactivated
- Scheduler runs daily to ensure consistency

## Database Model

```python
class Promocode(BaseModel):
    code = Column(String(50), unique=True, nullable=False)
    description = Column(Text, nullable=True)
    discount_type = Column(String(20), nullable=False)  # percentage, fixed
    value = Column(Float, nullable=False)
    minimum_order_amount = Column(Float, nullable=True)
    maximum_discount_amount = Column(Float, nullable=True)
    usage_limit = Column(Integer, nullable=True)
    used_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_until = Column(DateTime(timezone=True), nullable=True)
```

## Scheduler Logic

### Update Flow
1. **Find Promocodes to Activate**
   - Query: `is_active = False AND (valid_from <= now OR valid_from IS NULL) AND (valid_until > now OR valid_until IS NULL) AND (used_count < usage_limit OR usage_limit IS NULL)`
   - Action: Set `is_active = True`

2. **Find Expired Promocodes**
   - Query: `is_active = True AND valid_until <= now`
   - Action: Set `is_active = False`

3. **Find Usage Limit Reached**
   - Query: `is_active = True AND used_count >= usage_limit`
   - Action: Set `is_active = False`

4. **Find Not Yet Valid**
   - Query: `is_active = True AND valid_from > now`
   - Action: Set `is_active = False`

### Cron Schedule
```python
cron(
    update_promocode_statuses_task,
    hour=0,  # Run at 12 AM (midnight)
    minute=0,
    run_at_startup=False,
    unique=True,
    timeout=300,  # 5 minutes timeout
)
```

## Service Methods

### PromoCodeScheduler

#### `update_promocode_statuses()`
Main method that updates all promocode statuses based on current time and usage.

**Returns:**
```python
{
    "success": True,
    "activated_count": 5,
    "deactivated_count": 3,
    "total_updated": 8,
    "timestamp": "2026-02-13T00:00:00Z",
    "results": [
        {
            "code": "SUMMER2026",
            "action": "activated",
            "reason": "validity period started",
            "valid_from": "2026-02-13T00:00:00Z",
            "valid_until": "2026-08-31T23:59:59Z"
        },
        {
            "code": "EXPIRED10",
            "action": "deactivated",
            "reason": "expired",
            "valid_until": "2026-02-12T23:59:59Z"
        }
    ]
}
```

#### `get_active_promocodes()`
Returns all currently active and valid promocodes.

#### `get_expired_promocodes()`
Returns all expired promocodes.

### PromocodeService

#### `increment_usage(promocode_id: UUID)`
Increments the `used_count` when a promocode is applied. Automatically deactivates if usage limit is reached.

#### `validate_promocode(code: str)`
Validates a promocode before application.

**Returns:** `(is_valid: bool, error_message: Optional[str], promocode: Optional[Promocode])`

**Validation Checks:**
- Promocode exists
- Promocode is active
- Current time is after `valid_from`
- Current time is before `valid_until`
- Usage count is below limit

## Usage Examples

### 1. Manual Trigger (for testing)
```python
from core.arq_worker import enqueue_promocode_update

# Enqueue the task manually
await enqueue_promocode_update()
```

### 2. Apply Promocode (with usage tracking)
```python
from services.promocode.service import PromocodeService

promocode_service = PromocodeService(db)

# Validate promocode
is_valid, error, promocode = await promocode_service.validate_promocode("SUMMER2026")

if is_valid:
    # Apply discount to order
    discount_amount = calculate_discount(order_total, promocode)
    
    # Increment usage count
    await promocode_service.increment_usage(promocode.id)
else:
    raise Exception(error)
```

### 3. Create Promocode with Validity Dates
```python
from schemas.promos import PromocodeCreate
from datetime import datetime, timezone, timedelta

# Create a promocode valid for 30 days with usage limit
promocode_data = PromocodeCreate(
    code="WELCOME30",
    discount_type="percentage",
    value=30.0,
    is_active=False,  # Will be activated by scheduler when valid_from is reached
    valid_from=datetime.now(timezone.utc),
    valid_until=datetime.now(timezone.utc) + timedelta(days=30),
    usage_limit=100,
    minimum_order_amount=50.0
)

promocode = await promocode_service.create_promocode(promocode_data)
```

## Monitoring

### Logs
The scheduler logs all actions:
```
✅ Activated promocode: SUMMER2026
❌ Deactivated expired promocode: EXPIRED10
❌ Deactivated promocode (limit reached): POPULAR50 (100/100)
✅ Promocode status update completed: 5 activated, 3 deactivated
```

### Check Scheduler Status
```bash
# View ARQ worker logs
tail -f logs/arq_worker.log | grep promocode

# Check last run
grep "Promocode status update completed" logs/arq_worker.log | tail -1
```

## Testing

### 1. Test Scheduler Manually
```python
from services.promocode.scheduler import PromoCodeScheduler
from core.db import get_db

async def test_scheduler():
    async for db in get_db():
        scheduler = PromoCodeScheduler(db)
        result = await scheduler.update_promocode_statuses()
        print(result)
        break

# Run test
import asyncio
asyncio.run(test_scheduler())
```

### 2. Test Promocode Lifecycle
```python
# Create promocode that expires in 1 minute
promocode = await promocode_service.create_promocode(
    PromocodeCreate(
        code="TEST1MIN",
        discount_type="fixed",
        value=10.0,
        valid_from=datetime.now(timezone.utc),
        valid_until=datetime.now(timezone.utc) + timedelta(minutes=1)
    )
)

# Wait 2 minutes
await asyncio.sleep(120)

# Run scheduler
result = await scheduler.update_promocode_statuses()

# Verify promocode is deactivated
updated_promocode = await promocode_service.get_promocode_by_code("TEST1MIN")
assert updated_promocode.is_active == False
```

## Best Practices

1. **Set Validity Dates**: Always set `valid_from` and `valid_until` for time-limited promotions
2. **Set Usage Limits**: Use `usage_limit` to prevent abuse
3. **Monitor Usage**: Track `used_count` to gauge promotion effectiveness
4. **Test Before Launch**: Create test promocodes and verify scheduler behavior
5. **Check Logs**: Monitor scheduler logs for any issues
6. **Timezone Awareness**: All dates are stored in UTC

## Troubleshooting

### Promocode Not Activating
- Check `valid_from` is in the past
- Check `valid_until` is in the future
- Check `usage_limit` not reached
- Check scheduler is running (view logs)

### Promocode Not Deactivating
- Check `valid_until` is in the past
- Check scheduler is running
- Manually trigger: `await enqueue_promocode_update()`

### Scheduler Not Running
```bash
# Check ARQ worker status
ps aux | grep arq

# Restart ARQ worker
supervisorctl restart arq_worker

# Check cron job configuration
grep "update_promocode_statuses_task" backend/core/arq_worker.py
```

## Integration with Orders

When applying a promocode to an order:

```python
# 1. Validate promocode
is_valid, error, promocode = await promocode_service.validate_promocode(code)

if not is_valid:
    raise APIException(status_code=400, message=error)

# 2. Check minimum order amount
if promocode.minimum_order_amount and order_total < promocode.minimum_order_amount:
    raise APIException(
        status_code=400, 
        message=f"Minimum order amount is ${promocode.minimum_order_amount}"
    )

# 3. Calculate discount
if promocode.discount_type == "percentage":
    discount = order_total * (promocode.value / 100)
else:  # fixed
    discount = promocode.value

# 4. Apply maximum discount cap
if promocode.maximum_discount_amount:
    discount = min(discount, promocode.maximum_discount_amount)

# 5. Apply discount to order
order.discount_amount = discount
order.total_amount = order_total - discount
order.promocode_id = promocode.id

# 6. Increment usage count
await promocode_service.increment_usage(promocode.id)

# 7. Save order
await db.commit()
```

## Future Enhancements

1. **User-Specific Limits**: Track usage per user
2. **Category Restrictions**: Limit promocodes to specific product categories
3. **Stacking Rules**: Define which promocodes can be combined
4. **Auto-Generation**: Generate unique codes in bulk
5. **Analytics**: Track conversion rates and revenue impact
6. **Email Notifications**: Notify admins when promocodes expire or reach limits
