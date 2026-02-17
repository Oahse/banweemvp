"""
Logging Examples - Following Banwee Guidelines
ERROR: Critical failures (Database connection failed, Payment rejected)
WARNING: Performance issues (High memory usage, API took 3 seconds)
INFO: Business milestones only (User signed up, Order #555 completed, Server started)
"""

from core.logging import get_structured_logger
import time
import os

logger = get_structured_logger(__name__)

class ExampleService:
    """Example service demonstrating proper logging usage"""
    
    async def database_operation(self):
        """Example: ERROR - Database connection failed"""
        try:
            # Simulate database connection failure
            raise ConnectionError("Connection timeout")
        except Exception as e:
            logger.error("Database connection failed", exception=e, metadata={
                "database": "postgresql",
                "host": "localhost:5432",
                "retry_count": 3,
                "operation": "user_authentication"
            })
            raise
    
    async def process_payment(self, payment_intent_id: str, amount: float, user_id: str):
        """Example: ERROR - Payment rejected"""
        try:
            # Simulate payment failure
            raise Exception("Insufficient funds")
        except Exception as e:
            logger.error("Payment rejected", exception=e, metadata={
                "payment_intent_id": payment_intent_id,
                "amount": amount,
                "currency": "USD",
                "user_id": user_id,
                "error_type": "insufficient_funds"
            })
            raise
    
    async def slow_api_operation(self, endpoint: str, user_id: str):
        """Example: WARNING - API took 3 seconds (slow)"""
        start_time = time.time()
        
        # Simulate slow operation
        time.sleep(3.5)
        
        duration_ms = (time.time() - start_time) * 1000
        
        if duration_ms > 3000:
            logger.warning("API took 3 seconds (slow)", metadata={
                "endpoint": endpoint,
                "duration_ms": round(duration_ms, 2),
                "threshold_ms": 3000,
                "user_id": user_id,
                "performance_impact": "high"
            })
    
    def check_memory_usage(self):
        """Example: WARNING - High memory usage"""
        import psutil
        
        memory_percent = psutil.virtual_memory().percent
        
        if memory_percent > 80:
            logger.warning("High memory usage", metadata={
                "memory_usage_percent": memory_percent,
                "threshold": 80.0,
                "process_id": os.getpid(),
                "available_memory_gb": psutil.virtual_memory().available / (1024**3),
                "severity": "high"
            })
    
    async def user_signup(self, user_id: str, email: str, signup_method: str):
        """Example: INFO - User signed up (milestone)"""
        # User signup logic here...
        
        logger.info("User signed up", metadata={
            "user_id": user_id,
            "email": email,
            "signup_method": signup_method,
            "timestamp": time.time(),
            "milestone": "user_acquisition"
        })
    
    async def complete_order(self, order_id: str, user_id: str, total_amount: float, items_count: int):
        """Example: INFO - Order #555 completed (milestone)"""
        # Order completion logic here...
        
        logger.info("Order completed", metadata={
            "order_id": order_id,
            "user_id": user_id,
            "total_amount": total_amount,
            "items_count": items_count,
            "payment_status": "completed",
            "fulfillment_status": "pending",
            "milestone": "revenue"
        })
    
    def server_startup(self, port: int, environment: str, version: str):
        """Example: INFO - Server started (milestone)"""
        logger.info("Server started", metadata={
            "port": port,
            "environment": environment,
            "version": version,
            "startup_time": time.time(),
            "milestone": "system_event"
        })
    
    async def redis_fallback(self, operation: str, redis_host: str):
        """Example: WARNING - Redis unavailable, using fallback"""
        logger.warning("Redis unavailable, using database fallback", metadata={
            "redis_host": redis_host,
            "fallback": "database_lock",
            "operation": operation,
            "impact": "reduced_performance",
            "retry_scheduled": True
        })
    
    async def stock_adjustment(self, variant_id: str, previous_qty: int, new_qty: int, reason: str):
        """Example: INFO - Stock adjustment (business event)"""
        adjustment = new_qty - previous_qty
        
        logger.info("Stock adjusted", metadata={
            "variant_id": variant_id,
            "previous_quantity": previous_qty,
            "new_quantity": new_qty,
            "adjustment": adjustment,
            "reason": reason,
            "business_event": "inventory_management"
        })

# Usage examples:
async def main():
    service = ExampleService()
    
    # ERROR examples
    try:
        await service.database_operation()
    except:
        pass
    
    try:
        await service.process_payment("pi_1234567890", 99.99, "user_123")
    except:
        pass
    
    # WARNING examples
    await service.slow_api_operation("/api/v1/orders", "user_123")
    service.check_memory_usage()
    await service.redis_fallback("inventory_lock", "localhost:6379")
    
    # INFO examples (milestones only)
    await service.user_signup("user_456", "user@example.com", "email")
    await service.complete_order("order_555", "user_456", 199.99, 3)
    service.server_startup(8000, "production", "1.0.0")
    await service.stock_adjustment("variant_789", 100, 95, "order_purchase")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
