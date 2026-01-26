#!/bin/sh
# Migration script for Docker container startup

echo "🔄 Running database setup..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
python -c "
import asyncio
import sys
from sqlalchemy.ext.asyncio import create_async_engine
from core.config import settings

async def wait_for_db():
    engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI)
    max_retries = 30
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            from sqlalchemy import text
            async with engine.connect() as conn:
                await conn.execute(text('SELECT 1'))
            print('✅ Database is ready!')
            await engine.dispose()
            return True
        except Exception as e:
            retry_count += 1
            print(f'⏳ Waiting for database... ({retry_count}/{max_retries})')
            await asyncio.sleep(2)
    
    print('❌ Database connection failed after maximum retries')
    await engine.dispose()
    return False

if not asyncio.run(wait_for_db()):
    sys.exit(1)
"

if [ $? -ne 0 ]; then
    echo "❌ Database connection failed"
    exit 1
fi

# Check if database is already initialized by checking for products
PRODUCT_COUNT=$(python -c "
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from core.config import settings

async def check_products():
    engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI)
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text('SELECT COUNT(*) FROM products'))
            count = result.scalar()
            print(count if count else 0)
    except Exception as e:
        print(0)
    finally:
        await engine.dispose()

asyncio.run(check_products())
" 2>/dev/null)

# If database already has products, skip initialization
if [ "$PRODUCT_COUNT" != "0" ] && [ -n "$PRODUCT_COUNT" ]; then
    echo "✅ Database already initialized with $PRODUCT_COUNT products"
    echo "✅ Database setup completed successfully"
    echo "🚀 Starting FastAPI server..."
    exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload
fi

# If no tables exist, initialize and seed the database
if [ "$TABLES_EXIST" = "0" ] || [ -z "$TABLES_EXIST" ]; then
    echo "📝 No tables found, initializing and seeding database..."
    python init_db.py --seed
    if [ $? -eq 0 ]; then
        echo "✅ Database initialized and seeded successfully"
    else
        echo "❌ Database initialization failed"
        exit 1
    fi
else
    echo "✅ Database tables already exist"
    
    # Check if database has products
    PRODUCT_COUNT=$(python -c "
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from core.config import settings

async def check_products():
    engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI)
    try:
        async with engine.connect() as conn:
            result = await conn.execute(text('SELECT COUNT(*) FROM products'))
            count = result.scalar()
            print(count if count else 0)
    except Exception as e:
        print(0)
    finally:
        await engine.dispose()

asyncio.run(check_products())
" 2>/dev/null)
    
    # If no products, seed the database
    if [ "$PRODUCT_COUNT" = "0" ] || [ -z "$PRODUCT_COUNT" ]; then
        echo "📝 No products found, seeding database..."
        python init_db.py --seed
        if [ $? -eq 0 ]; then
            echo "✅ Database seeded successfully"
        else
            echo "⚠️ Database seeding failed, but continuing..."
        fi
    else
        echo "✅ Database has $PRODUCT_COUNT products"
    fi
fi

echo "✅ Database setup completed successfully"

echo "🚀 Starting FastAPI server..."
exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload
