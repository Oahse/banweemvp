# Enhanced Subscription Payment Models Migration

This document provides instructions for safely migrating the database to support the enhanced subscription payment system with admin-configurable pricing, comprehensive cost tracking, Stripe integration, and loyalty features.

## Overview

This migration adds the following new database models and enhancements:

### New Tables Created
- `pricing_configs` - Admin-configurable pricing settings
- `subscription_cost_history` - Historical cost change tracking  
- `payment_intents` - Enhanced Stripe payment intent tracking
- `subscription_analytics` - Daily subscription metrics
- `payment_analytics` - Daily payment performance metrics
- `loyalty_accounts` - Customer loyalty accounts with points and tiers
- `points_transactions` - Individual loyalty points transactions

### Enhanced Existing Tables
- `subscriptions` - Added 14 new fields for variant tracking, cost breakdown, delivery management, and loyalty integration

## Safety Features

This migration includes comprehensive safety features as required by the specification:

- **Automatic Backup Creation** - Database backup created before any changes
- **Data Integrity Validation** - Foreign key constraints and data consistency checks
- **Automatic Rollback** - Restore from backup if migration or validation fails
- **Detailed Logging** - Complete audit trail of all migration steps

## Prerequisites

1. **Database Access** - Ensure you have admin access to the PostgreSQL database
2. **Backup Space** - Ensure sufficient disk space for database backup
3. **Dependencies** - Install required Python packages:
   ```bash
   pip install asyncpg psycopg2-binary alembic sqlalchemy
   ```
4. **PostgreSQL Tools** - Ensure `pg_dump` and `pg_restore` are available in PATH

## Migration Process

### Step 1: Prepare Environment

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment
source .venv/bin/activate

# Verify database connection
python -c "import asyncpg; print('Dependencies OK')"
```

### Step 2: Create Pre-Migration Backup (Recommended)

```bash
# Create manual backup before starting
python migration_utils.py --database-url "postgresql://user:pass@host/db" backup --name "pre_migration_manual"
```

### Step 3: Run Migration with Safety Features

```bash
# Run migration with automatic backup and rollback
python run_migration.py --database-url "postgresql://user:pass@host/db"
```

#### Alternative: Dry Run (Backup Only)

```bash
# Create backup without running migration
python run_migration.py --database-url "postgresql://user:pass@host/db" --dry-run
```

### Step 4: Verify Migration Success

```bash
# Validate data integrity
python migration_utils.py --database-url "postgresql://user:pass@host/db" validate

# List available backups
python migration_utils.py --database-url "postgresql://user:pass@host/db" list
```

## Rollback Procedure

If you need to rollback the migration:

### Option 1: Automatic Rollback (if migration failed)
The migration script automatically restores from backup if the migration fails or validation fails.

### Option 2: Manual Rollback

```bash
# List available backups
python migration_utils.py --database-url "postgresql://user:pass@host/db" list

# Restore from specific backup
python migration_utils.py --database-url "postgresql://user:pass@host/db" restore /path/to/backup.sql
```

### Option 3: Alembic Downgrade

```bash
# Downgrade using alembic (removes new tables and columns)
source .venv/bin/activate
python -m alembic downgrade d6d022bcff3b
```

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Verify database URL format: `postgresql://user:password@host:port/database`
   - Ensure database server is running and accessible
   - Check firewall and network connectivity

2. **Permission Denied**
   - Ensure database user has CREATE, ALTER, and DROP privileges
   - Verify pg_dump and pg_restore permissions

3. **Backup Failed**
   - Check disk space in backup directory
   - Verify pg_dump is installed and in PATH
   - Ensure database user has SELECT privileges on all tables

4. **Migration Failed**
   - Check migration logs in `migration.log`
   - Verify all model imports are working
   - Ensure no conflicting table names exist

### Recovery Steps

If migration fails and automatic rollback doesn't work:

1. **Stop Application** - Stop all application processes using the database
2. **Manual Restore** - Use pg_restore to restore from backup
3. **Verify Restoration** - Run validation checks
4. **Investigate Issue** - Check logs and fix underlying problem
5. **Retry Migration** - Re-run migration after fixing issues

## Validation Checks

The migration performs these validation checks:

- **Foreign Key Constraints** - Ensures all foreign keys are valid
- **Data Constraints** - Verifies check constraints and unique constraints  
- **Index Integrity** - Checks index consistency
- **Table Statistics** - Validates table row counts and statistics

## Post-Migration Steps

After successful migration:

1. **Update Application Code** - Deploy updated models and services
2. **Initialize Default Data** - Create default pricing configuration
3. **Test Core Functionality** - Verify subscription and payment flows
4. **Monitor Performance** - Watch for any performance impacts
5. **Clean Old Backups** - Archive or remove old backup files as needed

## Migration Metadata

- **Migration ID**: 003
- **Previous Migration**: d6d022bcff3b (merge search and inventory heads)
- **Tables Added**: 7 new tables
- **Columns Added**: 14 new columns to subscriptions table
- **Estimated Downtime**: 2-5 minutes (depending on data size)

## Support

For issues with this migration:

1. Check the `migration.log` file for detailed error messages
2. Verify all prerequisites are met
3. Ensure database backup is available before attempting fixes
4. Contact the development team with log files and error details

## Files Created/Modified

- `backend/models/pricing_config.py` - New pricing configuration models
- `backend/models/payment_intent.py` - Enhanced payment intent model
- `backend/models/analytics.py` - Analytics models for reporting
- `backend/models/loyalty.py` - Customer loyalty system models
- `backend/models/subscription.py` - Enhanced subscription model
- `backend/models/user.py` - Added loyalty and payment intent relationships
- `backend/alembic/versions/003_add_enhanced_subscription_payment_models.py` - Migration script
- `backend/migration_utils.py` - Migration utilities with backup/rollback
- `backend/run_migration.py` - Safe migration runner script