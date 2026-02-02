#!/usr/bin/env python3
"""
Script to delete all reviews from the database
Run this script to remove all reviews and reset product ratings
"""

import asyncio
import sys
import os

# Add the backend directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from core.config import settings
from core.db import get_db, initialize_db
from models.review import Review
from models.product import Product
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, func

async def delete_all_reviews():
    """Delete all reviews and reset product ratings"""
    print("🗑️  Deleting all reviews...")
    
    # Initialize database session factory
    initialize_db(settings.SQLALCHEMY_DATABASE_URI, settings.ENVIRONMENT == "local")

    # Get database session
    db_gen = get_db()
    db = await db_gen.__anext__()
    
    try:
        # Count reviews before deletion
        count_result = await db.execute(select(func.count(Review.id)))
        review_count = count_result.scalar() or 0
        print(f"📊 Found {review_count} reviews to delete")
        
        if review_count == 0:
            print("✅ No reviews found to delete")
            return
        
        # Delete all reviews
        await db.execute(delete(Review))
        await db.commit()
        print(f"✅ Successfully deleted {review_count} reviews")
        
        # Reset all product ratings to 0
        products_result = await db.execute(
            select(Product).where(Product.rating_average > 0)
        )
        products = products_result.scalars().all()
        
        if products:
            print(f"🔄 Resetting ratings for {len(products)} products...")
            for product in products:
                product.rating_average = 0.0
                product.rating_count = 0
                product.review_count = 0
                product.updated_at = None
                await db.commit()
            
            print(f"✅ Successfully reset ratings for {len(products)} products")
        else:
            print("✅ No products with ratings to reset")
        
        print("🎉 All reviews and ratings have been successfully deleted!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        await db.rollback()
        sys.exit(1)
    finally:
        await db_gen.aclose()

if __name__ == "__main__":
    asyncio.run(delete_all_reviews())
