#!/usr/bin/env python3
"""
Fix variant_id in product_images using raw SQL updates
"""
import sqlite3

def format_uuid(uuid_str):
    """Convert UUID string to standard format with hyphens"""
    clean = uuid_str.replace('-', '')
    if len(clean) == 32:
        return f"{clean[0:8]}-{clean[8:12]}-{clean[12:16]}-{clean[16:20]}-{clean[20:32]}"
    return uuid_str

def main():
    conn = sqlite3.connect('db1.db')
    cursor = conn.cursor()
    
    # Get all unique variant_ids
    cursor.execute("SELECT DISTINCT variant_id FROM product_images")
    variant_ids = [row[0] for row in cursor.fetchall()]
    
    print(f"Found {len(variant_ids)} unique variant IDs")
    
    fixed_count = 0
    for old_variant_id in variant_ids:
        new_variant_id = format_uuid(old_variant_id)
        
        if old_variant_id != new_variant_id:
            # Update all images with this variant_id
            cursor.execute(
                "UPDATE product_images SET variant_id = ? WHERE variant_id = ?",
                (new_variant_id, old_variant_id)
            )
            fixed_count += cursor.rowcount
            
            if fixed_count % 100 == 0:
                print(f"Fixed {fixed_count} images...")
    
    conn.commit()
    print(f"\nFixed {fixed_count} image records")
    
    # Verify
    cursor.execute("""
        SELECT COUNT(*) 
        FROM product_images pi
        JOIN product_variants pv ON pi.variant_id = pv.id
    """)
    linked_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM product_images")
    total_count = cursor.fetchone()[0]
    
    print(f"Total images: {total_count}")
    print(f"Images linked to variants: {linked_count}")
    
    # Show samples
    cursor.execute("""
        SELECT pi.id, pi.variant_id, pv.name
        FROM product_images pi
        JOIN product_variants pv ON pi.variant_id = pv.id
        LIMIT 5
    """)
    print("\nSample linked images:")
    for img_id, var_id, var_name in cursor.fetchall():
        print(f"  Image: {img_id[:8]}... -> Variant: {var_id[:8]}... ({var_name})")
    
    conn.close()

if __name__ == "__main__":
    main()
