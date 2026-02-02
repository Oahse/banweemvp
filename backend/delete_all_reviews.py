#!/usr/bin/env python3
"""
Delete all reviews from database
"""
import asyncio
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import os
import sys

# Try to get DATABASE_URL from environment, otherwise construct it
DATABASE_URL = os.getenv('POSTGRES_DB_URL') or os.getenv('DATABASE_URL')

if not DATABASE_URL:
    # Try to load from .env if it exists
    try:
        from dotenv import load_dotenv
        load_dotenv()
        DATABASE_URL = os.getenv('POSTGRES_DB_URL') or os.getenv('DATABASE_URL')
    except:
        pass

async def delete_all_reviews():
    if not DATABASE_URL:
        print("❌ DATABASE_URL not set. Please set the environment variable or add to .env")
        sys.exit(1)
    
    # Convert postgresql:// to postgresql+asyncpg:// for async operations
    db_url = DATABASE_URL
    if db_url.startswith("postgresql://"):
        db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    print(f"Database URL: {db_url[:50]}...")
    
    engine = create_async_engine(db_url, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    try:
        async with async_session() as db:
            from models.review import Review
            from models.product import Product
            
            # Get all reviews
            result = await db.execute(select(Review))
            reviews = result.scalars().all()
            
            print(f"\n📊 Found {len(reviews)} reviews\n")
            
            if len(reviews) == 0:
                print("No reviews to delete")
                return
            
            # Delete all reviews
            await db.execute(delete(Review))
            await db.commit()
            print(f"✓ Deleted all {len(reviews)} reviews")
            
            # Reset all product ratings
            result = await db.execute(select(Product))
            products = result.scalars().all()
            
            for product in products:
                product.rating_average = 0.0
                product.rating_count = 0
                product.review_count = 0
            
            await db.commit()
            print(f"✓ Reset ratings for {len(products)} products")
            print("\n✅ Done!")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(delete_all_reviews())
