#!/usr/bin/env python3
"""
Fix all UUID format issues in the database
Ensures all UUIDs have hyphens in the correct format
"""
import sqlite3

def format_uuid_sql():
    """Return SQL expression to format UUID"""
    return """
    substr(COLUMN, 1, 8) || '-' || 
    substr(COLUMN, 9, 4) || '-' || 
    substr(COLUMN, 13, 4) || '-' || 
    substr(COLUMN, 17, 4) || '-' || 
    substr(COLUMN, 21)
    """

def fix_table_column(cursor, table, column):
    """Fix UUID format in a specific table column"""
    print(f"Fixing {table}.{column}...")
    
    # Check how many need fixing
    cursor.execute(f"SELECT COUNT(*) FROM {table} WHERE length({column}) = 32")
    count = cursor.fetchone()[0]
    
    if count == 0:
        print(f"  ✓ All {column} values already formatted correctly")
        return 0
    
    # Fix the UUIDs
    sql = f"""
    UPDATE {table} 
    SET {column} = substr({column}, 1, 8) || '-' || 
                   substr({column}, 9, 4) || '-' || 
                   substr({column}, 13, 4) || '-' || 
                   substr({column}, 17, 4) || '-' || 
                   substr({column}, 21)
    WHERE length({column}) = 32
    """
    cursor.execute(sql)
    
    print(f"  ✓ Fixed {count} records")
    return count

def main():
    conn = sqlite3.connect('db1.db')
    cursor = conn.cursor()
    
    print("=" * 60)
    print("Fixing UUID Format Issues")
    print("=" * 60)
    
    total_fixed = 0
    
    # Fix products table
    total_fixed += fix_table_column(cursor, 'products', 'category_id')
    total_fixed += fix_table_column(cursor, 'products', 'supplier_id')
    
    # Fix product_variants table
    total_fixed += fix_table_column(cursor, 'product_variants', 'product_id')
    
    # Fix product_images table
    total_fixed += fix_table_column(cursor, 'product_images', 'variant_id')
    
    # Fix cart_items table
    total_fixed += fix_table_column(cursor, 'cart_items', 'cart_id')
    total_fixed += fix_table_column(cursor, 'cart_items', 'variant_id')
    
    # Fix wishlist_items table
    total_fixed += fix_table_column(cursor, 'wishlist_items', 'wishlist_id')
    total_fixed += fix_table_column(cursor, 'wishlist_items', 'product_id')
    total_fixed += fix_table_column(cursor, 'wishlist_items', 'variant_id')
    
    # Fix orders table
    total_fixed += fix_table_column(cursor, 'orders', 'user_id')
    
    # Fix order_items table
    total_fixed += fix_table_column(cursor, 'order_items', 'order_id')
    total_fixed += fix_table_column(cursor, 'order_items', 'variant_id')
    
    # Fix reviews table
    total_fixed += fix_table_column(cursor, 'reviews', 'product_id')
    total_fixed += fix_table_column(cursor, 'reviews', 'user_id')
    
    # Fix addresses table
    total_fixed += fix_table_column(cursor, 'addresses', 'user_id')
    
    conn.commit()
    
    print("=" * 60)
    print(f"Total records fixed: {total_fixed}")
    print("=" * 60)
    
    # Verify relationships
    print("\nVerifying relationships...")
    
    # Products -> Categories
    cursor.execute("""
        SELECT COUNT(*) FROM products p
        JOIN categories c ON p.category_id = c.id
    """)
    print(f"  Products with categories: {cursor.fetchone()[0]}")
    
    # Products -> Suppliers
    cursor.execute("""
        SELECT COUNT(*) FROM products p
        JOIN users u ON p.supplier_id = u.id
    """)
    print(f"  Products with suppliers: {cursor.fetchone()[0]}")
    
    # Variants -> Products
    cursor.execute("""
        SELECT COUNT(*) FROM product_variants pv
        JOIN products p ON pv.product_id = p.id
    """)
    print(f"  Variants with products: {cursor.fetchone()[0]}")
    
    # Images -> Variants
    cursor.execute("""
        SELECT COUNT(*) FROM product_images pi
        JOIN product_variants pv ON pi.variant_id = pv.id
    """)
    print(f"  Images with variants: {cursor.fetchone()[0]}")
    
    print("\n✓ All UUID format issues fixed!")
    
    conn.close()

if __name__ == "__main__":
    main()
