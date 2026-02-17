# Logging Guidelines - Banwee E-commerce Platform

## 🚨 **ERROR** - Critical Failures
**Always log when:**
- Database connection failed
- Payment rejected/failed
- Order processing failed
- Authentication failures
- Critical system errors
- Service unavailable
- Data corruption detected

**Examples:**
```python
logger.error("Database connection failed", exception=e, metadata={
    "database": "postgresql",
    "host": "localhost:5432",
    "retry_count": 3
})

logger.error("Payment rejected", exception=e, metadata={
    "payment_intent_id": "pi_1234567890",
    "amount": 99.99,
    "currency": "USD",
    "user_id": "user_123"
})
```

## ⚠️ **WARNING** - Performance Issues & Non-Critical Problems
**Always log when:**
- High memory usage (>80%)
- Slow API responses (>3 seconds)
- Redis unavailable (fallbacks)
- Cache misses
- Rate limiting active
- Deprecated API usage
- Retry attempts

**Examples:**
```python
logger.warning("High memory usage detected", metadata={
    "memory_usage_percent": 85.2,
    "threshold": 80.0,
    "process_id": os.getpid()
})

logger.warning("API took 3 seconds (slow)", metadata={
    "endpoint": "/api/v1/orders",
    "duration_ms": 3000,
    "threshold_ms": 2000,
    "user_id": "user_123"
})

logger.warning("Redis unavailable, using database fallback", metadata={
    "redis_host": "localhost:6379",
    "fallback": "database_lock",
    "operation": "inventory_lock"
})
```

## ℹ️ **INFO** - Business Milestones & Important Events
**Only log milestones:**
- User signed up
- Order completed (e.g., "Order #555 completed")
- Server started
- Payment processed successfully
- Stock adjustments
- Critical business events
- Configuration loaded

**Examples:**
```python
logger.info("User signed up", metadata={
    "user_id": "user_123",
    "email": "user@example.com",
    "signup_method": "email"
})

logger.info("Order #555 completed", metadata={
    "order_id": "order_555",
    "user_id": "user_123",
    "total_amount": 199.99,
    "payment_status": "completed"
})

logger.info("Server started", metadata={
    "port": 8000,
    "environment": "production",
    "version": "1.0.0"
})

logger.info("Stock adjusted", metadata={
    "variant_id": "variant_123",
    "previous_quantity": 100,
    "new_quantity": 95,
    "adjustment": -5,
    "reason": "order_purchase"
})
```

## 🚫 **DO NOT LOG**
- Debug information (use structured metadata instead)
- Verbose request/response bodies
- Every single API call
- Development-only information
- Sensitive data (passwords, tokens, PII)

## 📁 **Log File Structure**
```
logs/
├── banwee.log              # INFO, WARNING, ERROR (all structured logs)
├── banwee_error.log        # ERROR only (critical failures)
├── services.inventory.log      # INFO, WARNING, ERROR
├── services.inventory_error.log  # ERROR only
├── services.orders.log          # INFO, WARNING, ERROR
├── services.orders_error.log    # ERROR only
└── ... (other services follow same pattern)
```

## 🔧 **Implementation Examples**

### **Error Logging - Critical Failures**
```python
try:
    await process_payment(payment_intent_id)
except Exception as e:
    logger.error("Payment processing failed", exception=e, metadata={
        "payment_intent_id": payment_intent_id,
        "user_id": user_id,
        "amount": amount,
        "currency": currency
    })
    raise
```

### **Warning Logging - Performance Issues**
```python
start_time = time.time()
result = await expensive_operation()
duration_ms = (time.time() - start_time) * 1000

if duration_ms > 3000:
    logger.warning("Slow operation detected", metadata={
        "operation": "expensive_operation",
        "duration_ms": duration_ms,
        "threshold_ms": 3000,
        "user_id": user_id
    })
```

### **Info Logging - Business Milestones**
```python
async def complete_order(order_id: UUID, user_id: UUID):
    # ... order completion logic ...
    
    logger.info("Order completed", metadata={
        "order_id": str(order_id),
        "user_id": str(user_id),
        "total_amount": float(order.total),
        "payment_status": "completed",
        "items_count": len(order.items)
    })
```

## 🎯 **Key Principles**
1. **ERROR** = Things that break functionality
2. **WARNING** = Things that impact performance but don't break functionality
3. **INFO** = Important business milestones only
4. **Always include relevant metadata** for context
5. **Never log sensitive information**
6. **Use structured format** for easy parsing and monitoring

## 📊 **Monitoring & Alerting**
- **ERROR logs** should trigger immediate alerts
- **WARNING logs** should trigger performance monitoring alerts
- **INFO logs** should be used for business metrics and dashboards

---

**Follow these guidelines to maintain consistent, meaningful logging across the entire platform.**
