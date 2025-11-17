import asyncio
from sqlalchemy import select, text
from core.database import AsyncSessionDB
from models.product import Product, ProductVariant

async def check_id_mismatch():
    async with AsyncSessionDB() as session:
        # Get a product
        result = await session.execute(
            select(Product.id, Product.name).where(Product.featured == True).limit(1)
        )
        product = result.first()
        if not product:
            print("No featured products found")
            return
            
        product_id = product.id
        product_name = product.name
        print(f"Product: {product_name}")
        print(f"Product ID: {product_id}")
        print(f"Product ID type: {type(product_id)}")
        print(f"Product ID repr: {repr(product_id)}")
        
        # Try to find variants with this product_id
        result = await session.execute(
            select(ProductVariant.id, ProductVariant.product_id, ProductVariant.name)
            .where(ProductVariant.product_id == product_id)
        )
        variants = result.all()
        print(f"\nVariants found with direct match: {len(variants)}")
        
        # Try to find variants with string comparison
        result = await session.execute(
            select(ProductVariant.id, ProductVariant.product_id, ProductVariant.name)
            .where(ProductVariant.product_id == str(product_id))
        )
        variants_str = result.all()
        print(f"Variants found with string match: {len(variants_str)}")
        
        # Get any variant and check its product_id
        result = await session.execute(
            select(ProductVariant.id, ProductVariant.product_id, ProductVariant.name, ProductVariant.sku)
            .limit(5)
        )
        print("\nSample variants:")
        for v in result:
            print(f"  - {v.name} (SKU: {v.sku})")
            print(f"    product_id: {v.product_id}")
            print(f"    product_id type: {type(v.product_id)}")
            print(f"    product_id repr: {repr(v.product_id)}")
            
            # Check if this product exists
            prod_result = await session.execute(
                select(Product.id, Product.name).where(Product.id == v.product_id)
            )
            prod = prod_result.first()
            if prod:
                print(f"    ✓ Product exists: {prod.name}")
            else:
                print(f"    ✗ Product NOT FOUND")

if __name__ == "__main__":
    asyncio.run(check_id_mismatch())
