import asyncio
from sqlalchemy import select, func
from core.database import AsyncSessionDB
from models.product import Product, ProductVariant

async def check_variants():
    async with AsyncSessionDB() as session:
        # Get sample variants
        result = await session.execute(
            select(ProductVariant.id, ProductVariant.product_id, ProductVariant.sku, ProductVariant.name)
            .limit(10)
        )
        print('Sample variants:')
        for row in result:
            print(f'  - Variant: {row.name} (SKU: {row.sku})')
            print(f'    Product ID: {row.product_id}')
            
            # Check if product exists
            product_result = await session.execute(
                select(Product.id, Product.name).where(Product.id == row.product_id)
            )
            product = product_result.first()
            if product:
                print(f'    Product exists: {product.name}')
            else:
                print(f'    ⚠️ Product NOT FOUND for this variant!')
        
        # Count orphaned variants
        result = await session.execute(
            select(func.count(ProductVariant.id))
            .outerjoin(Product, ProductVariant.product_id == Product.id)
            .where(Product.id.is_(None))
        )
        orphaned_count = result.scalar()
        print(f'\n⚠️ Orphaned variants (no matching product): {orphaned_count}')

if __name__ == "__main__":
    asyncio.run(check_variants())
