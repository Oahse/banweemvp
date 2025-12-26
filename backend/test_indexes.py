#!/usr/bin/env python3
"""
Test script to verify that database indexes are created properly.
"""

import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from core.config import settings
from core.database import Base
from models.user import User, Address
from models.product import Product, ProductVariant, Category
from models.orders import Order, OrderItem
from models.payments import PaymentMethod, PaymentIntent, Transaction
from models.subscriptions import Subscription
from models.blog import BlogPost, BlogCategory
from models.review import Review
from models.cart import Cart, CartItem
from models.loyalty import LoyaltyAccount, PointsTransaction
from models.notifications import Notification, NotificationPreference
from models.inventories import Inventory, WarehouseLocation
from models.wishlist import Wishlist, WishlistItem
from models.promocode import Promocode
from models.shipping import ShippingMethod


async def test_indexes():
    """Test that indexes are created properly"""
    print("🔍 Testing database indexes...")
    
    db_uri = settings.SQLALCHEMY_DATABASE_URI
    # Create a simple async engine without the complex pool configuration
    engine = create_async_engine(db_uri, echo=False)
    
    try:
        # Create tables with indexes
        async with engine.begin() as conn:
            print("🗑️  Dropping existing tables...")
            await conn.run_sync(Base.metadata.drop_all)
            print("🏗️  Creating new tables with indexes...")
            await conn.run_sync(Base.metadata.create_all)
        
        # Query to check indexes in PostgreSQL
        async with engine.begin() as conn:
            print("📊 Checking created indexes...")
            
            # Query to get all indexes
            result = await conn.execute(text("""
                SELECT 
                    schemaname,
                    tablename,
                    indexname,
                    indexdef
                FROM pg_indexes 
                WHERE schemaname = 'public' 
                AND indexname LIKE 'idx_%'
                ORDER BY tablename, indexname;
            """))
            
            indexes = result.fetchall()
            
            if indexes:
                print(f"✅ Found {len(indexes)} custom indexes:")
                
                # Group by table
                table_indexes = {}
                for schema, table, index_name, index_def in indexes:
                    if table not in table_indexes:
                        table_indexes[table] = []
                    table_indexes[table].append((index_name, index_def))
                
                # Print organized results
                for table_name in sorted(table_indexes.keys()):
                    print(f"\n📋 Table: {table_name}")
                    for index_name, index_def in table_indexes[table_name]:
                        # Extract column names from index definition
                        if "(" in index_def and ")" in index_def:
                            columns_part = index_def.split("(")[1].split(")")[0]
                            print(f"   🔗 {index_name}: {columns_part}")
                        else:
                            print(f"   🔗 {index_name}")
                
                # Check for specific important indexes
                important_indexes = [
                    'idx_users_email',
                    'idx_products_name',
                    'idx_orders_user_id',
                    'idx_payment_intents_stripe_id',
                    'idx_subscriptions_user_status',
                    'idx_reviews_product_approved',
                    'idx_blog_posts_published_date'
                ]
                
                found_indexes = [idx[2] for idx in indexes]
                print(f"\n🎯 Checking important indexes:")
                for important_idx in important_indexes:
                    if important_idx in found_indexes:
                        print(f"   ✅ {important_idx}")
                    else:
                        print(f"   ❌ {important_idx} - NOT FOUND")
                
            else:
                print("❌ No custom indexes found!")
                
        await engine.dispose()
        print("\n✅ Index test completed successfully!")
        
    except Exception as e:
        print(f"❌ Error testing indexes: {e}")
        await engine.dispose()
        raise


if __name__ == "__main__":
    asyncio.run(test_indexes())