#!/usr/bin/env python
"""
Database Sync Script
Synchronizes product and inventory data to ensure consistency
- Updates product availability_status based on actual inventory levels
- Uses inventory.quantity_available as source of truth
"""

import asyncio
import sys
from pathlib import Path
import logging

# Add backend directory to path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from core.config import settings
from models.product import Product, ProductVariant
from models.inventories import Inventory

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


async def sync_database():
    """Main sync function - synchronize product availability with inventory"""
    
    # Create async engine
    engine = create_async_engine(
        settings.SQLALCHEMY_DATABASE_URI,
        echo=False,
        pool_size=10,
        max_overflow=20
    )
    
    async_session = sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False
    )
    
    try:
        async with async_session() as db:
            logger.info("🔄 Starting database sync...")
            
            # Get all products with variants and inventory
            result = await db.execute(
                select(Product)
                .options(
                    selectinload(Product.variants)
                    .selectinload(ProductVariant.inventory)
                )
            )
            products = result.scalars().all()
            
            logger.info(f"📦 Found {len(products)} products")
            
            updated_count = 0
            out_of_stock_count = 0
            in_stock_count = 0
            
            for product in products:
                # Calculate total stock across all variants
                total_stock = 0
                variant_stocks = []
                
                if product.variants:
                    for variant in product.variants:
                        stock = variant.inventory.quantity_available if variant.inventory else 0
                        total_stock += stock
                        variant_stocks.append({
                            'variant_id': str(variant.id),
                            'sku': variant.sku,
                            'stock': stock
                        })
                
                # Determine availability status
                new_status = "available" if total_stock > 0 else "out_of_stock"
                old_status = product.availability_status
                
                # Update if status changed
                if old_status != new_status:
                    product.availability_status = new_status
                    updated_count += 1
                    
                    status_change = f"{old_status} → {new_status}"
                    logger.info(f"  ✓ {product.name}: {status_change} (stock: {total_stock})")
                    
                    if new_status == "out_of_stock":
                        out_of_stock_count += 1
                    else:
                        in_stock_count += 1
            
            # Commit changes
            await db.commit()
            
            # Summary
            logger.info("\n" + "="*60)
            logger.info("✅ DATABASE SYNC COMPLETED")
            logger.info("="*60)
            logger.info(f"Total Products: {len(products)}")
            logger.info(f"Updated: {updated_count}")
            logger.info(f"  • Went Out of Stock: {out_of_stock_count}")
            logger.info(f"  • Back In Stock: {in_stock_count}")
            logger.info(f"  • No Change: {len(products) - updated_count}")
            logger.info("="*60 + "\n")
            
            if updated_count > 0:
                logger.info(f"✨ Synced {updated_count} products successfully!")
            else:
                logger.info("✨ All products already in sync!")
    
    finally:
        await engine.dispose()


async def main():
    try:
        await sync_database()
    except Exception as e:
        logger.error(f"💥 Sync failed: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("\n⏹️  Sync interrupted by user")
        sys.exit(0)
