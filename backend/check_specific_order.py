#!/usr/bin/env python3
"""
Check the specific order that's showing the wrong calculation
"""

import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, and_
from models.orders import Order, OrderItem
from models.user import User
from core.config import settings
from core.logging import get_structured_logger

logger = get_structured_logger(__name__)

async def check_order():
    """Check the specific order f76d600f-eb4b-49b0-8740-5febef39bff2"""
    
    # Create database connection
    engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        print("🔍 Checking Order f76d600f-eb4b-49b0-8740-5febef39bff2")
        print("=" * 60)
        
        # Get the specific order
        order_id = "f76d600f-eb4b-49b0-8740-5febef39bff2"
        
        query = select(Order).where(Order.id == order_id)
        result = await db.execute(query)
        order = result.scalar_one_or_none()
        
        if not order:
            print(f"❌ Order {order_id} not found in database")
            return
        
        print(f"📋 Order Details:")
        print(f"   ID: {order.id}")
        print(f"   Order Number: {order.order_number}")
        print(f"   Created: {order.created_at}")
        print(f"   Status: {order.order_status}")
        print(f"   User ID: {order.user_id}")
        
        print(f"\n💰 Financial Breakdown:")
        print(f"   Subtotal:        ${order.subtotal:.2f}")
        print(f"   Shipping Amount: ${order.shipping_amount:.2f}")
        print(f"   Tax Amount:      ${order.tax_amount:.2f}")
        print(f"   Discount Amount: ${order.discount_amount:.2f}")
        print(f"   Total Amount:    ${order.total_amount:.2f}")
        print(f"   Currency:        {order.currency}")
        
        # Calculate what the total should be
        expected_total = order.subtotal + order.shipping_amount + order.tax_amount - order.discount_amount
        print(f"\n🧮 Calculation Check:")
        print(f"   Expected Total: ${expected_total:.2f}")
        print(f"   Stored Total:   ${order.total_amount:.2f}")
        
        difference = abs(expected_total - order.total_amount)
        if difference > 0.01:
            print(f"   ❌ CALCULATION ERROR!")
            print(f"   💰 Difference: ${difference:.2f}")
            
            # Check if total equals subtotal (the specific bug)
            if abs(order.total_amount - order.subtotal) < 0.01:
                print(f"   🎯 CONFIRMED BUG: total_amount equals subtotal!")
                print(f"      This means shipping (${order.shipping_amount:.2f}) and tax (${order.tax_amount:.2f}) were not added")
        else:
            print(f"   ✅ Calculation is correct")
        
        # Get order items
        items_query = select(OrderItem).where(OrderItem.order_id == order.id)
        items_result = await db.execute(items_query)
        items = items_result.scalars().all()
        
        print(f"\n📦 Order Items ({len(items)}):")
        items_subtotal = 0
        for i, item in enumerate(items, 1):
            print(f"   {i}. Variant {item.variant_id}: {item.quantity} × ${item.price_per_unit:.2f} = ${item.total_price:.2f}")
            items_subtotal += item.total_price
        
        print(f"\n🔍 Items Subtotal Check:")
        print(f"   Sum of item totals: ${items_subtotal:.2f}")
        print(f"   Order subtotal:     ${order.subtotal:.2f}")
        
        if abs(items_subtotal - order.subtotal) > 0.01:
            print(f"   ❌ SUBTOTAL MISMATCH!")
            print(f"   💰 Difference: ${abs(items_subtotal - order.subtotal):.2f}")
        else:
            print(f"   ✅ Subtotal matches items")
        
        print(f"\n📅 Timestamps:")
        print(f"   Created:    {order.created_at}")
        print(f"   Updated:    {order.updated_at}")
        print(f"   Confirmed:  {order.confirmed_at}")
        
        print(f"\n🔧 Debug Info:")
        print(f"   Idempotency Key: {order.idempotency_key}")
        print(f"   Source: {order.source}")
        print(f"   Payment Status: {order.payment_status}")
        print(f"   Fulfillment Status: {order.fulfillment_status}")

async def main():
    try:
        await check_order()
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())