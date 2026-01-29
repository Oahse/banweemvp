#!/bin/sh
# Script to reset and regenerate Alembic migrations

echo "🧹 Resetting Alembic migrations..."

# Remove existing alembic configuration
if [ -d "alembic" ]; then
    echo "📁 Removing existing alembic directory..."
    rm -rf alembic
fi

if [ -f "alembic.ini" ]; then
    echo "📄 Removing existing alembic.ini..."
    rm -f alembic.ini
fi

echo "✅ Cleanup completed"

# Ensure pg_trgm extension is enabled after reset
echo "🔧 Preparing database for migrations..."
python migration_helper.py
if [ $? -eq 0 ]; then
    echo "✅ Database preparation completed successfully"
else
    echo "⚠️ Database preparation failed, but continuing..."
fi

echo "🔄 Run ./migrate.sh to reinitialize Alembic"