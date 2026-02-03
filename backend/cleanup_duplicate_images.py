"""
Cleanup script to remove duplicate product images.
Keeps only unique images per variant based on ID.
"""
import asyncio
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from core.db import db_manager, initialize_db
from core.config import settings
from models.product import ProductImage, ProductVariant

async def cleanup_duplicate_images():
    """Remove duplicate image records"""
    initialize_db(settings.SQLALCHEMY_DATABASE_URI, settings.ENVIRONMENT == "local")
    
    async with db_manager.get_session_with_retry() as db:
        # Get all variants
        result = await db.execute(select(ProductVariant))
        variants = result.scalars().all()
        
        total_deleted = 0
        
        for variant in variants:
            # Load images for this variant
            img_result = await db.execute(
                select(ProductImage)
                .where(ProductImage.variant_id == variant.id)
                .order_by(ProductImage.created_at)
            )
            images = img_result.scalars().all()
            
            if len(images) > 0:
                print(f"\nVariant {variant.sku}: {len(images)} images")
                
                # Group by URL to find duplicates
                seen_urls = {}
                for img in images:
                    if img.url in seen_urls:
                        # Duplicate found! Delete it
                        print(f"  ❌ Deleting duplicate: {img.id} - {img.url[:50]}")
                        await db.delete(img)
                        total_deleted += 1
                    else:
                        seen_urls[img.url] = img
                        print(f"  ✅ Keeping: {img.id} - {img.url[:50]}")
        
        await db.commit()
        print(f"\n🎉 Cleanup complete! Deleted {total_deleted} duplicate images.")

if __name__ == "__main__":
    asyncio.run(cleanup_duplicate_images())
