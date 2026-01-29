#!/bin/sh
# Script to run Alembic migrations with proper database preparation

echo "🚀 Running Alembic migrations..."

# Prepare database (ensure extensions and indexes)
echo "🔧 Preparing database..."
python migration_helper.py
if [ $? -ne 0 ]; then
    echo "⚠️ Database preparation failed, but continuing with migration..."
fi

# Run the migration
if [ -z "$1" ]; then
    echo "📈 Running migration to head..."
    alembic upgrade head
else
    echo "📈 Running migration: $1"
    alembic "$@"
fi

if [ $? -eq 0 ]; then
    echo "✅ Migration completed successfully"
else
    echo "❌ Migration failed"
    exit 1
fi