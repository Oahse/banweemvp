#!/usr/bin/env python3
"""
Fix UUID format in product_images table to include hyphens
"""
import sqlite3
from uuid import UUID

def format_uuid(uuid_str):
    """Convert UUID string to standard format with hyphens"""
    # Remove any existing hyphens
    clean = uuid_str.replace('-', '')
    
    # Add hyphens in the correct positions
    # Format: 8-4-4-4-12
    if len(clean) == 32:
        return f"{clean[0:8]}-{clean[8:12]}-{clean[12:16]}-{clean[16:20]}-{clean[20:32]}"
    return uuid_str

def main():
    conn = sqlite3.connect('db1.db')
    cursor = conn.cursor()
    
    # Get all product_images
    cursor.execute("SELECT id, variant_id FROM product_images")
    images = cursor.fetchall()
    
    print(f"Found {len(images)} images to fix")
    
    fixed_count = 0
    for image_id, variant_id in images:
        # Format both IDs
        formatted_image_id = format_uuid(image_id)
        formatted_variant_id = format_uuid(variant_id)
        
        # Check if they need updating
        if formatted_image_id != image_id or formatted_variant_id != variant_id:
            # Update the record
            cursor.execute(
                "UPDATE product_images SET id = ?, variant_id = ? WHERE id = ?",
                (formatted_image_id, formatted_variant_id, image_id)
            )
            fixed_count += 1
            
            if fixed_count % 100 == 0:
                print(f"Fixed {fixed_count} images...")
    
    conn.commit()
    print(f"\nFixed {fixed_count} images")
    
    # Verify the fix
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
    
    conn.close()

if __name__ == "__main__":
    main()
