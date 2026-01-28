#!/bin/bash

# Seed tax rates and shipping methods
echo "Seeding tax rates and shipping methods..."

cd "$(dirname "$0")"

# Run the seeding script
python scripts/seed_tax_and_shipping.py

echo "Seeding completed!"