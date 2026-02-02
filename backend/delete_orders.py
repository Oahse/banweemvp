import asyncio
import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from core.config import settings


async def delete_all_orders():
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
    
    async with async_session() as session:
        # Delete order_items first (due to foreign key constraint)
        result1 = await session.execute(text("DELETE FROM order_items"))
        print(f"✓ Deleted all order items from database")
        
        # Then delete orders
        result2 = await session.execute(text("DELETE FROM orders"))
        await session.commit()
        print(f"✓ Deleted all orders from database")
    
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(delete_all_orders())
