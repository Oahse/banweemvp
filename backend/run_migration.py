#!/usr/bin/env python3
"""
Safe Migration Runner for Subscription Payment Enhancements

This script safely applies the enhanced subscription payment models migration
with automatic backup and rollback capabilities.

Usage:
    python run_migration.py --database-url "postgresql://user:pass@host/db"
    
Requirements addressed:
- 17.2: Create database backups before applying schema changes
- 17.3: Validate data integrity and foreign key constraints  
- 17.4: Provide rollback scripts for each migration step
- 17.5: Preserve all existing data without loss
"""

import os
import sys
import argparse
import logging
from pathlib import Path

# Add current directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

from migration_utils import MigrationManager

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def main():
    parser = argparse.ArgumentParser(
        description='Safe Migration Runner for Subscription Payment Enhancements'
    )
    parser.add_argument(
        '--database-url', 
        required=True,
        help='Database URL (e.g., postgresql://user:pass@host/db)'
    )
    parser.add_argument(
        '--backup-dir',
        default='migration_backups',
        help='Directory to store backups (default: migration_backups)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Create backup only, do not run migration'
    )
    parser.add_argument(
        '--force',
        action='store_true',
        help='Force migration even if validation fails'
    )
    
    args = parser.parse_args()
    
    # Initialize migration manager
    manager = MigrationManager(args.database_url, args.backup_dir)
    
    logger.info("Starting subscription payment enhancements migration...")
    logger.info(f"Database URL: {args.database_url}")
    logger.info(f"Backup directory: {args.backup_dir}")
    
    try:
        # Create backup first
        logger.info("Creating pre-migration backup...")
        backup_path = manager.create_backup("pre_subscription_enhancements_migration")
        logger.info(f"Backup created: {backup_path}")
        
        if args.dry_run:
            logger.info("Dry run mode - backup created, migration not executed")
            return
            
        # Prepare migration command
        migration_command = [
            sys.executable, '-m', 'alembic', 'upgrade', '003'
        ]
        
        logger.info("Running migration with automatic rollback on failure...")
        success, message = manager.run_migration_with_backup(migration_command)
        
        if success:
            logger.info("✓ Migration completed successfully!")
            logger.info(f"Backup available at: {message}")
            
            # List new tables created
            logger.info("New tables created:")
            new_tables = [
                "pricing_configs",
                "subscription_cost_history", 
                "payment_intents",
                "subscription_analytics",
                "payment_analytics",
                "loyalty_accounts",
                "points_transactions"
            ]
            for table in new_tables:
                logger.info(f"  - {table}")
                
            logger.info("Enhanced subscription model fields added to existing tables")
            
        else:
            logger.error("✗ Migration failed!")
            logger.error(message)
            
            if not args.force:
                logger.info("Use --force to override validation failures")
                sys.exit(1)
            else:
                logger.warning("Continuing despite failures due to --force flag")
                
    except Exception as e:
        logger.error(f"Migration failed with error: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()