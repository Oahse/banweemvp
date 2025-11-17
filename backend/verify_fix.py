"""
Verification script to test that UUIDs are working correctly
Run this after restarting the backend server
"""
import asyncio
from sqlalchemy import select
from core.database import AsyncSessionDB
from models.product import Product, ProductVariant
from services.products import ProductService

async def verify_fix():
    async with AsyncSessionDB() as session:
        print("=" * 60)
        print("VERIFICATION TEST")
        print("=" * 60)
        
        # Test 1: Get featured products through service
        print("\n1. Testing ProductService.get_featured_products()...")
        product_service = ProductService(session)
        featured = await product_service.get_featured_products(limit=4)
        
        print(f"   ✓ Returned {len(featured)} featured products")
        
        has_variants = False
        for p in featured:
            variant_count = len(p.variants)
            print(f"   - {p.name}: {variant_count} variants")
            if variant_count > 0:
                has_variants = True
                # Show first variant
                v = p.variants[0]
                print(f"     └─ {v.name}: ${v.current_price}")
        
        if has_variants:
            print("\n   ✅ SUCCESS: Products have variants!")
        else:
            print("\n   ❌ FAIL: No products have variants")
            return False
        
        # Test 2: Direct database query
        print("\n2. Testing direct database query...")
        result = await session.execute(
            select(Product).where(Product.featured == True).limit(1)
        )
        product = result.scalar_one_or_none()
        
        if product:
            print(f"   ✓ Found product: {product.name}")
            print(f"   ✓ Product ID: {product.id}")
            
            # Query variants
            variant_result = await session.execute(
                select(ProductVariant).where(ProductVariant.product_id == product.id)
            )
            variants = variant_result.scalars().all()
            print(f"   ✓ Found {len(variants)} variants")
            
            if len(variants) > 0:
                print("\n   ✅ SUCCESS: Direct query works!")
                return True
            else:
                print("\n   ❌ FAIL: Direct query found no variants")
                return False
        else:
            print("   ❌ No featured products found")
            return False

if __name__ == "__main__":
    result = asyncio.run(verify_fix())
    print("\n" + "=" * 60)
    if result:
        print("ALL TESTS PASSED ✅")
        print("The home page should now load products with variants!")
    else:
        print("TESTS FAILED ❌")
        print("Please check the database and code")
    print("=" * 60)
