import asyncio
from sqlalchemy import text
from core.database import AsyncSessionDB

async def fix_uuid_format():
    """Fix UUID format inconsistency in the database."""
    async with AsyncSessionDB() as session:
        print("Fixing UUID format in product_variants...")
        
        # Get all variants with their product_ids
        result = await session.execute(text("""
            SELECT id, product_id FROM product_variants
        """))
        variants = result.all()
        
        print(f"Found {len(variants)} variants to fix")
        
        fixed_count = 0
        for variant_id, product_id in variants:
            # Convert to string if it's a UUID object
            product_id_str = str(product_id)
            
            # Check if product_id needs fixing (no hyphens or wrong length)
            if '-' not in product_id_str or len(product_id_str) != 36:
                # Remove any existing hyphens first
                clean_id = product_id_str.replace('-', '')
                # Add hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                fixed_id = f"{clean_id[:8]}-{clean_id[8:12]}-{clean_id[12:16]}-{clean_id[16:20]}-{clean_id[20:]}"
                
                print(f"  Fixing: {product_id_str} -> {fixed_id}")
                
                await session.execute(
                    text("UPDATE product_variants SET product_id = :fixed_id WHERE id = :variant_id"),
                    {"fixed_id": fixed_id, "variant_id": variant_id}
                )
                fixed_count += 1
                
                if fixed_count % 50 == 0:
                    print(f"  Fixed {fixed_count} variants...")
        
        await session.commit()
        print(f"✓ Fixed {fixed_count} variant product_ids")
        
        # Verify the fix
        result = await session.execute(text("""
            SELECT COUNT(*) 
            FROM products p
            JOIN product_variants v ON p.id = v.product_id
            WHERE p.featured = 1
        """))
        count = result.scalar()
        print(f"✓ Verification: {count} variants now properly linked to featured products")

if __name__ == "__main__":
    asyncio.run(fix_uuid_format())
