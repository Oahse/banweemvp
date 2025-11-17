import asyncio
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from core.database import AsyncSessionDB
from models.product import Product, ProductVariant
from services.products import ProductService

async def debug_home_api():
    async with AsyncSessionDB() as session:
        product_service = ProductService(session)
        
        print("=" * 60)
        print("Testing get_featured_products...")
        featured = await product_service.get_featured_products(limit=4)
        
        print(f"\nReturned {len(featured)} featured products:")
        for p in featured:
            print(f"\n  Product: {p.name} (ID: {p.id})")
            print(f"    Variants in response: {len(p.variants)}")
            print(f"    Primary variant: {p.primary_variant}")
            
            # Check database directly
            db_query = select(ProductVariant).where(ProductVariant.product_id == p.id)
            db_result = await session.execute(db_query)
            db_variants = db_result.scalars().all()
            print(f"    Variants in DB: {len(db_variants)}")
            
            if db_variants:
                for v in db_variants[:2]:
                    print(f"      - {v.name} (SKU: {v.sku}): ${v.base_price}")

if __name__ == "__main__":
    asyncio.run(debug_home_api())
