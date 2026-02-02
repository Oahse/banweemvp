"""
Migration script to ensure all ProductVariants have Inventory records.
This script checks for variants without inventory and creates them.
"""
import asyncio
from uuid import uuid4
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from core.config import settings
from core.utils.uuid_utils import uuid7
from models.product import ProductVariant
from models.inventories import Inventory, WarehouseLocation

async def sync_missing_inventory():
    """Create missing inventory records for all variants."""
    # Create engine and session
    engine = create_async_engine(
        settings.SQLALCHEMY_DATABASE_URI,
        echo=False,
        future=True
    )
    
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    
    async with async_session() as session:
        # Get or create default warehouse location
        result = await session.execute(
            select(WarehouseLocation).where(WarehouseLocation.name == "Main Warehouse")
        )
        default_location = result.scalar_one_or_none()
        
        if not default_location:
            result = await session.execute(
                select(WarehouseLocation).where(WarehouseLocation.name == "Default")
            )
            default_location = result.scalar_one_or_none()
        
        if not default_location:
            print("Creating default warehouse location...")
            default_location = WarehouseLocation(
                id=uuid7(),
                name="Main Warehouse",
                address="Main Warehouse",
                description="Default warehouse location for inventory"
            )
            session.add(default_location)
            await session.flush()
            print(f"✓ Created warehouse: {default_location.name}")
        else:
            print(f"✓ Using existing warehouse: {default_location.name}")
        
        # Get all variants without inventory (using selectinload-friendly approach)
        result = await session.execute(
            select(ProductVariant).outerjoin(ProductVariant.inventory).
            where(ProductVariant.inventory == None)
        )
        variants_without_inventory = result.scalars().unique().all()
        
        print(f"\nFound {len(variants_without_inventory)} variants without inventory")
        
        if variants_without_inventory:
            for i, variant in enumerate(variants_without_inventory, 1):
                print(f"\n[{i}/{len(variants_without_inventory)}] Creating inventory for variant: {variant.sku}")
                
                # Create inventory record with 0 stock by default
                inventory = Inventory(
                    id=uuid7(),
                    variant_id=variant.id,
                    location_id=default_location.id,
                    quantity_available=0,
                    quantity=0,  # Legacy field
                    low_stock_threshold=10,
                    reorder_point=5,
                    inventory_status="active"
                )
                session.add(inventory)
                print(f"  ✓ Created inventory record for {variant.sku}")
            
            await session.commit()
            print(f"\n✓ Successfully created {len(variants_without_inventory)} inventory records!")
        else:
            print("\n✓ All variants already have inventory records!")
        
        # Verify the sync
        result = await session.execute(
            select(ProductVariant).outerjoin(ProductVariant.inventory).
            where(ProductVariant.inventory == None)
        )
        remaining = result.scalars().unique().all()
        
        if remaining:
            print(f"\n✗ WARNING: Still {len(remaining)} variants without inventory!")
        else:
            print(f"\n✓ VERIFICATION PASSED: All variants now have inventory records!")
    
    await engine.dispose()

if __name__ == "__main__":
    print("=" * 60)
    print("ProductVariant Inventory Sync Script")
    print("=" * 60)
    asyncio.run(sync_missing_inventory())
    print("=" * 60)
