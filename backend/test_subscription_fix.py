#!/usr/bin/env python3
"""
Test script to verify the subscription service fixes
"""
import asyncio
import sys
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_db_session
from services.subscriptions.subscription import SubscriptionService
from models.product import ProductVariant

async def test_subscription_service():
    """Test that the subscription service can be instantiated and basic methods work"""
    try:
        # Get database session
        async with get_db_session() as db:
            service = SubscriptionService(db)
            print("✓ SubscriptionService instantiated successfully")
            
            # Test that we can call calculate_subscription_cost with empty list (should handle gracefully)
            try:
                # This should raise an HTTPException for empty variants, which is expected behavior
                await service.calculate_subscription_cost(
                    variant_ids=[],
                    delivery_type="standard",
                    currency="USD"
                )
            except Exception as e:
                if "No valid variants found" in str(e):
                    print("✓ calculate_subscription_cost handles empty variants correctly")
                else:
                    print(f"✗ Unexpected error in calculate_subscription_cost: {e}")
                    return False
            
            print("✓ All basic tests passed")
            return True
            
    except Exception as e:
        print(f"✗ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    result = asyncio.run(test_subscription_service())
    sys.exit(0 if result else 1)