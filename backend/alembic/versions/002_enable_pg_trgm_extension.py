"""Enable pg_trgm extension for fuzzy text search

Revision ID: 002_enable_pg_trgm
Revises: 001_discount_mgmt
Create Date: 2024-01-28 16:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '002_enable_pg_trgm'
down_revision = '001_discount_mgmt'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Enable pg_trgm extension for fuzzy text search and similarity functions
    op.execute('CREATE EXTENSION IF NOT EXISTS pg_trgm;')
    
    # Create GIN indexes for better performance on text search
    # These indexes will significantly improve similarity() function performance
    
    # Products table indexes
    op.execute('CREATE INDEX IF NOT EXISTS idx_products_name_gin ON products USING gin (name gin_trgm_ops);')
    op.execute('CREATE INDEX IF NOT EXISTS idx_products_description_gin ON products USING gin (description gin_trgm_ops);')
    
    # Categories table indexes
    op.execute('CREATE INDEX IF NOT EXISTS idx_categories_name_gin ON categories USING gin (name gin_trgm_ops);')
    op.execute('CREATE INDEX IF NOT EXISTS idx_categories_description_gin ON categories USING gin (description gin_trgm_ops);')
    
    # Users table indexes for search functionality
    op.execute('CREATE INDEX IF NOT EXISTS idx_users_firstname_gin ON users USING gin (firstname gin_trgm_ops);')
    op.execute('CREATE INDEX IF NOT EXISTS idx_users_lastname_gin ON users USING gin (lastname gin_trgm_ops);')
    op.execute('CREATE INDEX IF NOT EXISTS idx_users_email_gin ON users USING gin (email gin_trgm_ops);')
    
    # Product variants table indexes (if they exist and need search)
    op.execute('CREATE INDEX IF NOT EXISTS idx_product_variants_name_gin ON product_variants USING gin (name gin_trgm_ops);')
    op.execute('CREATE INDEX IF NOT EXISTS idx_product_variants_sku_gin ON product_variants USING gin (sku gin_trgm_ops);')


def downgrade() -> None:
    # Drop the GIN indexes
    op.execute('DROP INDEX IF EXISTS idx_products_name_gin;')
    op.execute('DROP INDEX IF EXISTS idx_products_description_gin;')
    op.execute('DROP INDEX IF EXISTS idx_categories_name_gin;')
    op.execute('DROP INDEX IF EXISTS idx_categories_description_gin;')
    op.execute('DROP INDEX IF EXISTS idx_users_firstname_gin;')
    op.execute('DROP INDEX IF EXISTS idx_users_lastname_gin;')
    op.execute('DROP INDEX IF EXISTS idx_users_email_gin;')
    op.execute('DROP INDEX IF EXISTS idx_product_variants_name_gin;')
    op.execute('DROP INDEX IF EXISTS idx_product_variants_sku_gin;')
    
    # Note: We don't drop the extension as it might be used by other parts of the system
    # If you really need to drop it, uncomment the line below:
    # op.execute('DROP EXTENSION IF EXISTS pg_trgm;')