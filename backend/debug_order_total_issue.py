#!/usr/bin/env python3
"""
Comprehensive debugging script to trace the order total calculation issue
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

async def debug_order_totals():
    """Debug order totals by examining actual database records"""
    
    # Create database connection
    engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        print("🔍 Debugging Order Total Calculation Issue")
        print("=" * 60)
        
        # Get recent orders with calculation issues
        print("\n1. Finding recent orders with potential calculation issues...")
        
        query = select(Order).options().order_by(Order.created_at.desc()).limit(10)
        result = await db.execute(query)
        orders = result.scalars().all()
        
        print(f"   Found {len(orders)} recent orders")
        
        for order in orders:
            print(f"\n📋 Order {order.order_number} (ID: {order.id})")
            print(f"   Created: {order.created_at}")
            print(f"   Status: {order.order_status}")
            
            # Get order items
            items_query = select(OrderItem).where(OrderItem.order_id == order.id)
            items_result = await db.execute(items_query)
            items = items_result.scalars().all()
            
            # Calculate expected totals
            items_subtotal = sum(item.total_price for item in items)
            
            print(f"   📊 Financial Breakdown:")
            print(f"      Items subtotal (from OrderItems): ${items_subtotal:.2f}")
            print(f"      Order subtotal (from Order):      ${order.subtotal:.2f}")
            print(f"      Shipping amount:                   ${order.shipping_amount:.2f}")
            print(f"      Tax amount:                        ${order.tax_amount:.2f}")
            print(f"      Discount amount:                   ${order.discount_amount:.2f}")
            print(f"      Order total_amount:                ${order.total_amount:.2f}")
            
            # Calculate what the total should be
            expected_total = order.subtotal + order.shipping_amount + order.tax_amount - order.discount_amount
            print(f"      Expected total (calculated):       ${expected_total:.2f}")
            
            # Check for discrepancies
            subtotal_mismatch = abs(items_subtotal - order.subtotal) > 0.01
            total_mismatch = abs(expected_total - order.total_amount) > 0.01
            
            if subtotal_mismatch:
                print(f"      ❌ SUBTOTAL MISMATCH: Items=${items_subtotal:.2f} vs Order=${order.subtotal:.2f}")
                print(f"         Difference: ${items_subtotal - order.subtotal:.2f}")
            
            if total_mismatch:
                print(f"      ❌ TOTAL MISMATCH: Expected=${expected_total:.2f} vs Stored=${order.total_amount:.2f}")
                print(f"         Difference: ${expected_total - order.total_amount:.2f}")
                
                # Check if total equals subtotal (the reported issue)
                if abs(order.total_amount - order.subtotal) < 0.01:
                    print(f"      🎯 FOUND THE BUG: total_amount equals subtotal!")
                    print(f"         This means shipping and tax are not being added to total")
            
            if not subtotal_mismatch and not total_mismatch:
                print(f"      ✅ Order calculations are correct")
            
            print(f"   📦 Order Items ({len(items)}):")
            for i, item in enumerate(items, 1):
                print(f"      {i}. Variant {item.variant_id}: {item.quantity} × ${item.price_per_unit:.2f} = ${item.total_price:.2f}")
        
        print("\n" + "=" * 60)
        print("🎯 SUMMARY:")
        
        # Find orders where total_amount equals subtotal
        problem_orders = []
        for order in orders:
            expected_total = order.subtotal + order.shipping_amount + order.tax_amount - order.discount_amount
            if abs(order.total_amount - order.subtotal) < 0.01 and abs(expected_total - order.total_amount) > 0.01:
                problem_orders.append(order)
        
        if problem_orders:
            print(f"   Found {len(problem_orders)} orders where total_amount equals subtotal")
            print("   This confirms the bug: shipping and tax are not being added to total_amount")
            
            print("\n🔧 RECOMMENDED FIXES:")
            print("   1. Check if there's a database trigger modifying total_amount")
            print("   2. Check if there's a post-save hook or event listener")
            print("   3. Check if the order is being updated after creation")
            print("   4. Add logging to track when total_amount gets modified")
            print("   5. Check if there's a race condition in the order creation process")
        else:
            print("   No orders found with total_amount = subtotal issue")
            print("   The calculation bug might be intermittent or already fixed")

async def main():
    try:
        await debug_order_totals()
    except Exception as e:
        print(f"❌ Error during debugging: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())