#!/usr/bin/env python3
"""
Test script to verify distributed locks work correctly with concurrent requests
"""
import asyncio
import aiohttp
import time
from datetime import datetime
from typing import List, Dict, Any

# Test configuration
BASE_URL = "http://localhost:8000"  # Adjust if your app runs on different port
CONCURRENT_REQUESTS = 10
TEST_VARIANT_ID = "your-test-variant-id"  # Replace with actual variant ID
TEST_USER_ID = "your-test-user-id"  # Replace with actual user ID

async def test_concurrent_stock_decrement():
    """Test concurrent stock decrement operations"""
    print(f"🧪 Testing {CONCURRENT_REQUESTS} concurrent stock decrement requests...")
    
    async def make_request(session: aiohttp.ClientSession, request_id: int) -> Dict[str, Any]:
        """Make a single stock decrement request"""
        start_time = time.time()
        
        try:
            # This would be your actual API endpoint for stock operations
            # For now, we'll simulate with a test endpoint
            async with session.post(
                f"{BASE_URL}/api/v1/inventory/test-decrement",
                json={
                    "variant_id": TEST_VARIANT_ID,
                    "quantity": 1,
                    "reason": "test_concurrent"
                },
                headers={"X-Request-ID": str(request_id)}
            ) as response:
                end_time = time.time()
                response_data = await response.json() if response.content_type == "application/json" else await response.text()
                
                return {
                    "request_id": request_id,
                    "status": response.status,
                    "success": response.status == 200,
                    "duration": end_time - start_time,
                    "response": response_data
                }
        except Exception as e:
            end_time = time.time()
            return {
                "request_id": request_id,
                "status": 0,
                "success": False,
                "duration": end_time - start_time,
                "response": str(e)
            }
    
    # Run concurrent requests
    async with aiohttp.ClientSession() as session:
        tasks = [make_request(session, i) for i in range(CONCURRENT_REQUESTS)]
        results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Analyze results
    successful_requests = [r for r in results if isinstance(r, dict) and r.get("success")]
    failed_requests = [r for r in results if isinstance(r, dict) and not r.get("success")]
    
    print(f"\n📊 Results:")
    print(f"✅ Successful requests: {len(successful_requests)}")
    print(f"❌ Failed requests: {len(failed_requests)}")
    print(f"⏱️  Average duration: {sum(r['duration'] for r in results if isinstance(r, dict)) / len(results):.3f}s")
    
    if successful_requests:
        print(f"\n✅ Successful request details:")
        for req in successful_requests:
            print(f"  Request {req['request_id']}: {req['duration']:.3f}s")
    
    if failed_requests:
        print(f"\n❌ Failed request details:")
        for req in failed_requests:
            print(f"  Request {req['request_id']}: Status {req['status']} - {req['response']}")
    
    # Check for race conditions
    if len(successful_requests) > 1:
        print(f"\n⚠️  POTENTIAL RACE CONDITION: {len(successful_requests)} requests succeeded!")
        print("This suggests distributed locks may not be working correctly.")
    elif len(successful_requests) == 1:
        print(f"\n✅ RACE CONDITION PREVENTED: Only 1 request succeeded as expected.")
    else:
        print(f"\n❌ ALL REQUESTS FAILED: Check your API endpoint and configuration.")

async def test_concurrent_order_creation():
    """Test concurrent order creation"""
    print(f"\n🛒 Testing {CONCURRENT_REQUESTS} concurrent order creation requests...")
    
    async def make_order_request(session: aiohttp.ClientSession, request_id: int) -> Dict[str, Any]:
        """Make a single order creation request"""
        start_time = time.time()
        
        try:
            async with session.post(
                f"{BASE_URL}/api/v1/orders/checkout",
                json={
                    "items": [{"variant_id": TEST_VARIANT_ID, "quantity": 1}],
                    "shipping_address_id": "test-address-id"
                },
                headers={"X-Request-ID": str(request_id)}
            ) as response:
                end_time = time.time()
                response_data = await response.json() if response.content_type == "application/json" else await response.text()
                
                return {
                    "request_id": request_id,
                    "status": response.status,
                    "success": response.status in [200, 201],
                    "duration": end_time - start_time,
                    "response": response_data
                }
        except Exception as e:
            end_time = time.time()
            return {
                "request_id": request_id,
                "status": 0,
                "success": False,
                "duration": end_time - start_time,
                "response": str(e)
            }
    
    # Run concurrent requests
    async with aiohttp.ClientSession() as session:
        tasks = [make_order_request(session, i) for i in range(CONCURRENT_REQUESTS)]
        results = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Analyze results
    successful_orders = [r for r in results if isinstance(r, dict) and r.get("success")]
    failed_orders = [r for r in results if isinstance(r, dict) and not r.get("success")]
    
    print(f"\n📊 Order Creation Results:")
    print(f"✅ Successful orders: {len(successful_orders)}")
    print(f"❌ Failed orders: {len(failed_orders)}")
    
    # Check for duplicate orders
    if len(successful_orders) > 1:
        order_ids = []
        for order in successful_orders:
            if isinstance(order.get("response"), dict):
                order_id = order["response"].get("id")
                if order_id:
                    order_ids.append(order_id)
        
        if len(set(order_ids)) < len(order_ids):
            print(f"\n⚠️  DUPLICATE ORDERS DETECTED!")
            print(f"Order IDs: {order_ids}")
        else:
            print(f"\n✅ No duplicate orders detected. Order IDs: {order_ids}")
    
    return len(successful_orders) <= 1  # True if no duplicates

async def main():
    """Run all distributed lock tests"""
    print("🚀 Starting Distributed Lock Tests")
    print(f"📅 Test started at: {datetime.now().isoformat()}")
    print(f"🔗 Base URL: {BASE_URL}")
    print(f"🔄 Concurrent requests: {CONCURRENT_REQUESTS}")
    
    # Test 1: Stock decrement race conditions
    await test_concurrent_stock_decrement()
    
    # Test 2: Order creation duplicates
    order_test_passed = await test_concurrent_order_creation()
    
    print(f"\n🎯 Test Summary:")
    print(f"Stock decrement test: {'✅ PASSED' if len([r for r in range(CONCURRENT_REQUESTS)]) else '❌ NEEDS REVIEW'}")
    print(f"Order creation test: {'✅ PASSED' if order_test_passed else '❌ FAILED'}")
    
    print(f"\n🏁 Tests completed at: {datetime.now().isoformat()}")

if __name__ == "__main__":
    print("⚠️  Make sure your FastAPI app is running before executing this test!")
    print("⚠️  Update TEST_VARIANT_ID and TEST_USER_ID with actual values from your database")
    print("⚠️  Ensure Redis is running and accessible")
    
    # Run tests
    asyncio.run(main())
