#!/usr/bin/env python3
"""
Test the actual invoice API endpoint
"""

import asyncio
import sys
import uuid
from datetime import datetime
sys.path.insert(0, '/app')

from core.database import AsyncSessionDB
from models.orders import Order, OrderItem, OrderStatus, PaymentStatus
from models.user import User
from sqlalchemy import select
import httpx


async def create_test_order():
    """Create a test order for invoice generation"""
    async with AsyncSessionDB() as db:
        # Check if we have any users
        user_result = await db.execute(select(User).limit(1))
        user = user_result.scalar_one_or_none()
        
        if not user:
            # Create a test user
            user = User(
                id=uuid.uuid4(),
                email="test@example.com",
                first_name="Test",
                last_name="User",
                phone_number="+1-555-TEST"
            )
            db.add(user)
            await db.flush()
        
        # Create a test order
        order_id = uuid.uuid4()
        order = Order(
            id=order_id,
            order_number=f"ORD-{datetime.now().strftime('%Y%m%d')}-001",
            user_id=user.id,
            order_status=OrderStatus.CONFIRMED,
            payment_status=PaymentStatus.PAID,
            subtotal=99.99,
            tax_amount=8.50,
            shipping_amount=9.99,
            discount_amount=5.00,
            total_amount=113.48,
            currency="USD",
            billing_address={
                "name": "Test User",
                "street": "123 Test Street",
                "city": "Test City",
                "state": "TS",
                "postal_code": "12345",
                "country": "US"
            },
            shipping_address={
                "name": "Test User",
                "street": "123 Test Street", 
                "city": "Test City",
                "state": "TS",
                "postal_code": "12345",
                "country": "US"
            },
            confirmed_at=datetime.now()
        )
        
        db.add(order)
        
        # Add some order items
        item1 = OrderItem(
            id=uuid.uuid4(),
            order_id=order_id,
            product_name="Test Product 1",
            variant_name="Standard",
            quantity=2,
            unit_price=29.99,
            total_price=59.98
        )
        
        item2 = OrderItem(
            id=uuid.uuid4(),
            order_id=order_id,
            product_name="Test Product 2", 
            variant_name="Premium",
            quantity=1,
            unit_price=39.99,
            total_price=39.99
        )
        
        db.add(item1)
        db.add(item2)
        
        await db.commit()
        
        print(f"✅ Created test order: {order_id}")
        return str(order_id)


async def test_invoice_api():
    """Test the invoice API endpoint"""
    print("🧪 Testing Invoice API Endpoint...")
    
    try:
        # Create a test order
        order_id = await create_test_order()
        
        # Test the invoice API endpoint
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"http://localhost:8000/v1/orders/{order_id}/invoice",
                timeout=30.0
            )
            
            if response.status_code == 200:
                # Check if we got a PDF
                content_type = response.headers.get('content-type', '')
                content_length = len(response.content)
                
                print(f"   ✅ API Response: {response.status_code}")
                print(f"   📄 Content-Type: {content_type}")
                print(f"   📊 Content Length: {content_length:,} bytes")
                
                if 'application/pdf' in content_type and content_length > 1000:
                    print(f"   ✅ PDF generated successfully!")
                    
                    # Save the PDF for inspection
                    with open('/tmp/test_invoice.pdf', 'wb') as f:
                        f.write(response.content)
                    print(f"   💾 PDF saved to /tmp/test_invoice.pdf")
                    
                    return True
                else:
                    print(f"   ❌ Invalid PDF response")
                    print(f"   📝 Response content: {response.text[:200]}...")
                    return False
            else:
                print(f"   ❌ API Error: {response.status_code}")
                print(f"   📝 Response: {response.text}")
                return False
                
    except Exception as e:
        print(f"   ❌ Exception: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = asyncio.run(test_invoice_api())
    if success:
        print("\n✅ Invoice API is working correctly!")
        print("🎉 End-to-end invoice generation successful!")
    else:
        print("\n❌ Invoice API test failed")
        sys.exit(1)