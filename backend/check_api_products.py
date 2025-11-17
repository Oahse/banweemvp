import asyncio
from sqlalchemy import select
from core.database import AsyncSessionDB
from models.product import Product, ProductVariant

async def check_specific_products():
    async with AsyncSessionDB() as session:
        # Check the products the API is returning
        product_names = ['Quality Coconut Milk', 'Pure Pumpkin Seed', 'Organic Cereal', 'Fresh Kidney Bean']
        
        for name in product_names:
            result = await session.execute(
                select(Product).where(Product.name == name)
            )
            product = result.scalar_one_or_none()
            
            if product:
                variant_result = await session.execute(
                    select(ProductVariant).where(ProductVariant.product_id == product.id)
                )
                variants = variant_result.scalars().all()
                print(f'{name}: {len(variants)} variants in DB')
                if variants:
                    for v in variants[:2]:
                        print(f'  - {v.name}: ${v.base_price}')
            else:
                print(f'{name}: NOT FOUND')

if __name__ == "__main__":
    asyncio.run(check_specific_products())
