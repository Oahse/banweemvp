"""add contact messages table

Revision ID: d4e8f9a1b2c3
Revises: b798a82bfa90
Create Date: 2026-02-07 22:07:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'd4e8f9a1b2c3'
down_revision = 'b798a82bfa90'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create enum types
    op.execute("CREATE TYPE messagestatus AS ENUM ('new', 'in_progress', 'resolved', 'closed')")
    op.execute("CREATE TYPE messagepriority AS ENUM ('low', 'medium', 'high', 'urgent')")
    
    # Create contact_messages table
    op.create_table(
        'contact_messages',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('subject', sa.String(length=255), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('status', postgresql.ENUM('new', 'in_progress', 'resolved', 'closed', name='messagestatus'), nullable=False),
        sa.Column('priority', postgresql.ENUM('low', 'medium', 'high', 'urgent', name='messagepriority'), nullable=False),
        sa.Column('admin_notes', sa.Text(), nullable=True),
        sa.Column('assigned_to', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('resolved_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    
    # Create indexes for better query performance
    op.create_index('ix_contact_messages_status', 'contact_messages', ['status'])
    op.create_index('ix_contact_messages_priority', 'contact_messages', ['priority'])
    op.create_index('ix_contact_messages_created_at', 'contact_messages', ['created_at'])
    op.create_index('ix_contact_messages_email', 'contact_messages', ['email'])


def downgrade() -> None:
    # Drop indexes
    op.drop_index('ix_contact_messages_email', table_name='contact_messages')
    op.drop_index('ix_contact_messages_created_at', table_name='contact_messages')
    op.drop_index('ix_contact_messages_priority', table_name='contact_messages')
    op.drop_index('ix_contact_messages_status', table_name='contact_messages')
    
    # Drop table
    op.drop_table('contact_messages')
    
    # Drop enum types
    op.execute('DROP TYPE messagepriority')
    op.execute('DROP TYPE messagestatus')
