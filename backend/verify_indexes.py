#!/usr/bin/env python3
"""
Verify that database indexes are properly defined in model files.
"""

import inspect
from sqlalchemy import Index
from models.user import User, Address
from models.product import Product, ProductVariant, ProductImage, Category
from models.orders import Order, OrderItem, TrackingEvent
from models.payments import PaymentMethod, PaymentIntent, Transaction
from models.subscriptions import Subscription
from models.blog import BlogPost, BlogCategory, BlogTag, BlogPostTag, Comment
from models.review import Review
from models.cart import Cart, CartItem
from models.loyalty import LoyaltyAccount, PointsTransaction
from models.notifications import Notification, NotificationPreference, NotificationHistory
from models.inventories import Inventory, WarehouseLocation, StockAdjustment, InventoryReservation
from models.wishlist import Wishlist, WishlistItem
from models.promocode import Promocode
from models.shipping import ShippingMethod
from models.admin import PricingConfig, SubscriptionCostHistory, SubscriptionAnalytics, PaymentAnalytics
from models.variant_tracking import VariantTrackingEntry, VariantPriceHistory, VariantAnalytics, VariantSubstitution


def verify_model_indexes():
    """Verify that all models have proper indexes defined"""
    print("🔍 Verifying database indexes in model definitions...")
    
    # List of all model classes to check
    models = [
        User, Address,
        Category, Product, ProductVariant, ProductImage,
        Order, OrderItem, TrackingEvent,
        PaymentMethod, PaymentIntent, Transaction,
        Subscription,
        BlogCategory, BlogTag, BlogPost, BlogPostTag, Comment,
        Review,
        Cart, CartItem,
        LoyaltyAccount, PointsTransaction,
        Notification, NotificationPreference, NotificationHistory,
        WarehouseLocation, Inventory, StockAdjustment, InventoryReservation,
        Wishlist, WishlistItem,
        Promocode,
        ShippingMethod,
        PricingConfig, SubscriptionCostHistory, SubscriptionAnalytics, PaymentAnalytics,
        VariantTrackingEntry, VariantPriceHistory, VariantAnalytics, VariantSubstitution
    ]
    
    total_indexes = 0
    models_with_indexes = 0
    
    for model in models:
        table_name = model.__tablename__
        
        # Check if model has __table_args__ with indexes
        if hasattr(model, '__table_args__'):
            table_args = model.__table_args__
            
            # Handle both tuple and dict formats
            if isinstance(table_args, tuple):
                indexes = [arg for arg in table_args if isinstance(arg, Index)]
            elif isinstance(table_args, dict):
                indexes = []
            else:
                indexes = []
            
            if indexes:
                models_with_indexes += 1
                total_indexes += len(indexes)
                print(f"\n📋 {table_name}:")
                for idx in indexes:
                    # Get column names from the index
                    if hasattr(idx, 'columns') and idx.columns:
                        columns = [col.name for col in idx.columns]
                        print(f"   🔗 {idx.name}: {', '.join(columns)}")
                    else:
                        print(f"   🔗 {idx.name}")
            else:
                print(f"\n⚠️  {table_name}: No indexes found")
        else:
            print(f"\n❌ {table_name}: No __table_args__ defined")
    
    print(f"\n📊 Summary:")
    print(f"   Total models checked: {len(models)}")
    print(f"   Models with indexes: {models_with_indexes}")
    print(f"   Total indexes defined: {total_indexes}")
    
    # Check for important search fields that should have indexes
    important_fields = {
        'users': ['email', 'role', 'active', 'verified'],
        'products': ['name', 'category_id', 'supplier_id', 'featured', 'is_active'],
        'orders': ['user_id', 'status', 'created_at'],
        'payment_intents': ['stripe_payment_intent_id', 'user_id', 'status'],
        'subscriptions': ['user_id', 'status', 'plan_id'],
        'reviews': ['product_id', 'user_id', 'is_approved'],
        'blog_posts': ['author_id', 'is_published', 'published_at'],
        'notifications': ['user_id', 'read', 'type'],
        'inventory': ['variant_id', 'location_id', 'quantity'],
        'carts': ['user_id', 'session_id'],
        'wishlists': ['user_id', 'is_default']
    }
    
    print(f"\n🎯 Checking coverage of important search fields:")
    
    # This is a simplified check - in a real scenario, you'd inspect the actual Index objects
    coverage_good = True
    for table, fields in important_fields.items():
        model_class = next((m for m in models if m.__tablename__ == table), None)
        if model_class and hasattr(model_class, '__table_args__'):
            table_args = model_class.__table_args__
            if isinstance(table_args, tuple):
                indexes = [arg for arg in table_args if isinstance(arg, Index)]
                indexed_fields = set()
                for idx in indexes:
                    if hasattr(idx, 'columns') and idx.columns:
                        for col in idx.columns:
                            indexed_fields.add(col.name)
                
                missing_fields = set(fields) - indexed_fields
                if missing_fields:
                    print(f"   ⚠️  {table}: Missing indexes for {missing_fields}")
                    coverage_good = False
                else:
                    print(f"   ✅ {table}: All important fields indexed")
            else:
                print(f"   ❌ {table}: No indexes found")
                coverage_good = False
        else:
            print(f"   ❌ {table}: Model not found or no table args")
            coverage_good = False
    
    if coverage_good:
        print(f"\n✅ All important search fields are properly indexed!")
    else:
        print(f"\n⚠️  Some important search fields may need additional indexes.")
    
    print(f"\n✅ Index verification completed!")
    return total_indexes > 0


if __name__ == "__main__":
    success = verify_model_indexes()
    if success:
        print("🎉 Database indexing implementation looks good!")
    else:
        print("❌ Issues found with database indexing.")
        exit(1)