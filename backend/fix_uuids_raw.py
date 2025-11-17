"""
Fix UUID format in database using raw SQL to bypass SQLAlchemy type conversion
"""
import sqlite3

def fix_uuids():
    # Connect directly to SQLite database
    conn = sqlite3.connect('db1.db')
    cursor = conn.cursor()
    
    print("Fixing UUID format in product_variants...")
    
    # Get all variants with their product_ids (raw, no conversion)
    cursor.execute("SELECT id, product_id FROM product_variants")
    variants = cursor.fetchall()
    
    print(f"Found {len(variants)} variants to check")
    
    fixed_count = 0
    for variant_id, product_id in variants:
        # Check if product_id needs fixing (no hyphens)
        if '-' not in product_id:
            # Add hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
            fixed_id = f"{product_id[:8]}-{product_id[8:12]}-{product_id[12:16]}-{product_id[16:20]}-{product_id[20:]}"
            
            if fixed_count < 5:  # Show first 5
                print(f"  Fixing: {product_id} -> {fixed_id}")
            
            cursor.execute(
                "UPDATE product_variants SET product_id = ? WHERE id = ?",
                (fixed_id, variant_id)
            )
            fixed_count += 1
            
            if fixed_count % 50 == 0:
                print(f"  Fixed {fixed_count} variants...")
    
    conn.commit()
    print(f"✓ Fixed {fixed_count} variant product_ids")
    
    # Verify the fix
    cursor.execute("""
        SELECT COUNT(*) 
        FROM products p
        JOIN product_variants v ON p.id = v.product_id
        WHERE p.featured = 1
    """)
    count = cursor.fetchone()[0]
    print(f"✓ Verification: {count} variants now properly linked to featured products")
    
    conn.close()

if __name__ == "__main__":
    fix_uuids()
