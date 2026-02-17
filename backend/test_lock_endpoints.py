#!/usr/bin/env python3
"""
Test endpoints to verify distributed locks are working
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from datetime import datetime
import asyncio
import time

from core.dependencies import get_db, get_redis_lock_service
from services.inventory import InventoryService
from schemas.inventory import StockAdjustmentCreate

router = APIRouter(prefix="/api/v1/test", tags=["test"])

@router.post("/inventory/test-decrement")
async def test_stock_decrement(
    variant_id: str,
    quantity: int = 1,
    reason: str = "test",
    db: AsyncSession = Depends(get_db),
    lock_service = Depends(get_redis_lock_service)
):
    """Test endpoint for concurrent stock decrement"""
    try:
        # Convert string to UUID
        variant_uuid = UUID(variant_id)
        
        # Create inventory service with lock service
        inventory_service = InventoryService(db, lock_service)
        
        # Create adjustment data
        adjustment_data = StockAdjustmentCreate(
            variant_id=variant_uuid,
            quantity_change=-quantity,
            reason=reason
        )
        
        # Perform stock adjustment with distributed locks
        start_time = time.time()
        result = await inventory_service.adjust_stock(adjustment_data, commit=True)
        end_time = time.time()
        
        return {
            "success": True,
            "message": "Stock decrement test completed",
            "variant_id": variant_id,
            "quantity_decremented": quantity,
            "duration_ms": (end_time - start_time) * 1000,
            "timestamp": datetime.utcnow().isoformat(),
            "lock_service_available": lock_service is not None
        }
        
    except Exception as e:
        return {
            "success": False,
            "message": f"Test failed: {str(e)}",
            "variant_id": variant_id,
            "quantity_requested": quantity,
            "timestamp": datetime.utcnow().isoformat(),
            "lock_service_available": lock_service is not None
        }

@router.post("/inventory/test-concurrent-access")
async def test_concurrent_access(
    variant_id: str,
    lock_duration: int = 5,  # seconds
    db: AsyncSession = Depends(get_db),
    lock_service = Depends(get_redis_lock_service)
):
    """Test endpoint that holds a lock for specified duration"""
    try:
        variant_uuid = UUID(variant_id)
        
        if not lock_service:
            raise HTTPException(status_code=503, detail="Lock service not available")
        
        # Acquire distributed lock
        lock = lock_service.get_inventory_lock(variant_uuid, timeout=lock_duration + 10)
        
        async with lock:
            # Simulate work while holding the lock
            await asyncio.sleep(lock_duration)
            
            return {
                "success": True,
                "message": f"Held lock for {lock_duration} seconds",
                "variant_id": variant_id,
                "lock_duration_seconds": lock_duration,
                "timestamp": datetime.utcnow().isoformat()
            }
            
    except Exception as e:
        return {
            "success": False,
            "message": f"Concurrent access test failed: {str(e)}",
            "variant_id": variant_id,
            "requested_lock_duration": lock_duration,
            "timestamp": datetime.utcnow().isoformat()
        }

@router.get("/locks/status")
async def get_lock_status(lock_service = Depends(get_redis_lock_service)):
    """Get current lock status and statistics"""
    try:
        if not lock_service:
            return {
                "lock_service_available": False,
                "message": "Redis lock service not available"
            }
        
        stats = await lock_service.get_lock_stats()
        return {
            "lock_service_available": True,
            "timestamp": datetime.utcnow().isoformat(),
            **stats
        }
        
    except Exception as e:
        return {
            "lock_service_available": False,
            "message": f"Error getting lock status: {str(e)}",
            "timestamp": datetime.utcnow().isoformat()
        }

@router.post("/locks/clear-test-locks")
async def clear_test_locks(lock_service = Depends(get_redis_lock_service)):
    """Clear all test locks (for cleanup)"""
    try:
        if not lock_service:
            raise HTTPException(status_code=503, detail="Lock service not available")
        
        # Get all active locks
        active_locks = await lock_service.get_active_locks()
        
        # Clear locks with "test" in the key
        cleared_count = 0
        redis_client = await lock_service._get_redis()
        
        for lock_info in active_locks:
            key = lock_info.get("key", "")
            if "test" in key.lower():
                await redis_client.delete(key)
                cleared_count += 1
        
        return {
            "success": True,
            "message": f"Cleared {cleared_count} test locks",
            "total_active_locks_before": len(active_locks),
            "locks_cleared": cleared_count,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        return {
            "success": False,
            "message": f"Failed to clear test locks: {str(e)}",
            "timestamp": datetime.utcnow().isoformat()
        }
