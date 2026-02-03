#!/usr/bin/env python3
"""
Script to delete all orders from the database
"""

import asyncio
import sys
import os

# Add the backend directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from core.config import settings
from core.db import get_db, initialize_db
from models.orders import Order, OrderItem, TrackingEvent
from sqlalchemy import select, delete, func


async def delete_all_orders():
    """Delete all orders, order items, and tracking events"""
    print("🗑️  Deleting all orders...")
    
    # Initialize database session factory
    initialize_db(settings.SQLALCHEMY_DATABASE_URI, settings.ENVIRONMENT == "local")

    # Get database session
    db_gen = get_db()
    db = await db_gen.__anext__()
    
    try:
        # Count orders before deletion
        count_result = await db.execute(select(func.count(Order.id)))
        order_count = count_result.scalar() or 0
        print(f"📊 Found {order_count} orders to delete")
        
        if order_count == 0:
            print("✅ No orders found to delete")
            return
        
        # Delete in order of dependencies: tracking events -> order items -> orders
        print("🗑️  Deleting all tracking events...")
        result = await db.execute(delete(TrackingEvent))
        print(f"✅ Deleted {result.rowcount} tracking events")
        
        print("🗑️  Deleting all order items...")
        result = await db.execute(delete(OrderItem))
        print(f"✅ Deleted {result.rowcount} order items")
        
        print("🗑️  Deleting all orders...")
        result = await db.execute(delete(Order))
        print(f"✅ Deleted {result.rowcount} orders")
        
        # Commit the transaction
        await db.commit()
        print("✅ All orders deleted successfully")
        
    except Exception as e:
        print(f"❌ Error deleting orders: {e}")
        await db.rollback()
        raise


if __name__ == "__main__":
    asyncio.run(delete_all_orders())
