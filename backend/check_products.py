import asyncio
from sqlalchemy import select, func
from core.database import AsyncSessionDB
from models.product import Product, ProductVariant

async def check_products():
    async with AsyncSessionDB() as session:
        # Count products
        result = await session.execute(select(func.count(Product.id)))
        product_count = result.scalar()
        print(f'Total products: {product_count}')
        
        # Count featured products
        result = await session.execute(select(func.count(Product.id)).where(Product.featured == True))
        featured_count = result.scalar()
        print(f'Featured products: {featured_count}')
        
        # Count variants
        result = await session.execute(select(func.count(ProductVariant.id)))
        variant_count = result.scalar()
        print(f'Total variants: {variant_count}')
        
        # Get sample products with variants
        result = await session.execute(
            select(Product.id, Product.name, Product.featured, func.count(ProductVariant.id).label('variant_count'))
            .join(ProductVariant, Product.id == ProductVariant.product_id, isouter=True)
            .group_by(Product.id, Product.name, Product.featured)
            .limit(5)
        )
        print('\nSample products:')
        for row in result:
            print(f'  - {row.name} (Featured: {row.featured}, Variants: {row.variant_count})')

if __name__ == "__main__":
    asyncio.run(check_products())
