import asyncio
import asyncpg
from core.config import settings

async def delete_product(slug='rice'):
    db_url = settings.POSTGRES_DB_URL.replace('postgresql+asyncpg://', 'postgresql://')
    conn = await asyncpg.connect(db_url)
    try:
        # Get the product ID
        product_id = await conn.fetchval(f"SELECT id FROM products WHERE slug = '{slug}'")
        if product_id:
            # Get variant IDs
            variant_ids = await conn.fetch('SELECT id FROM product_variants WHERE product_id = $1', product_id)
            variant_id_list = [row['id'] for row in variant_ids]
            
            if variant_id_list:
                # Delete all variant-related data
                await conn.execute('DELETE FROM inventory WHERE variant_id = ANY($1::uuid[])', variant_id_list)
                await conn.execute('DELETE FROM product_images WHERE variant_id = ANY($1::uuid[])', variant_id_list)
                await conn.execute('DELETE FROM cart_items WHERE variant_id = ANY($1::uuid[])', variant_id_list)
                print(f'✓ Deleted variant-related data')
                
            # Delete variants
            variants_result = await conn.execute('DELETE FROM product_variants WHERE product_id = $1', product_id)
            print(f'✓ Deleted variants: {variants_result}')
            
            # Then delete the product
            product_result = await conn.execute("DELETE FROM products WHERE id = $1", product_id)
            print(f'✓ Deleted product with slug={slug}: {product_result}')
        else:
            print(f'No product with slug={slug} found')
    finally:
        await conn.close()

asyncio.run(delete_product())
