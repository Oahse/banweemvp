from sqlalchemy import create_engine, text
from core.config import settings
import re

# Use the correct attribute from settings and clean up the URL
database_url = str(settings.POSTGRES_DB_URL)
# Replace asyncpg with psycopg2
database_url = database_url.replace('postgresql+asyncpg://', 'postgresql://')
# Remove SSL parameters that psycopg2 doesn't accept in the URL
database_url = re.sub(r'\?.*$', '', database_url)

print(f"Connecting to database...")
engine = create_engine(database_url)
with engine.connect() as conn:
    result = conn.execute(text('SELECT COUNT(*) FROM products'))
    count = result.scalar()
    print(f'\n✓ Products in database: {count}')
    
    if count > 0:
        # Show some product names
        result = conn.execute(text('SELECT id, name FROM products LIMIT 5'))
        print('\nSample products:')
        for row in result:
            print(f'  - {row[1]} (ID: {row[0]})')
    else:
        print('\n✓ No products found in database - all products have been successfully deleted!')
