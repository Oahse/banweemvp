#!/bin/bash

# Banwee Database Initialization Script
# This script initializes the database with tables and seed data

set -e  # Exit on any error

echo "🗄️  Initializing Banwee Database..."
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_error ".env file not found!"
    print_error "Please create a .env file with your Neon PostgreSQL URL"
    exit 1
fi

# Load environment variables
source .env

# Verify required environment variables
print_step "Verifying database configuration..."

if [ -z "$POSTGRES_DB_URL" ]; then
    print_error "POSTGRES_DB_URL is not set in .env file"
    print_error "Please add your Neon PostgreSQL URL to the .env file"
    exit 1
fi

print_status "Database URL found: ${POSTGRES_DB_URL%%@*}@***"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

print_status "Python 3 is available"

# Setup Python virtual environment for backend
print_step "Setting up Python environment..."
cd backend

if [ ! -d ".venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv .venv
fi

print_status "Activating virtual environment..."
source .venv/bin/activate

# Install Python dependencies
print_step "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

print_status "Dependencies installed successfully"

# Parse command line arguments
SEED_DATA=true
NUM_PRODUCTS=50
NUM_USERS=25
BATCH_SIZE=50

while [[ $# -gt 0 ]]; do
    case $1 in
        --no-seed)
            SEED_DATA=false
            shift
            ;;
        --products)
            NUM_PRODUCTS="$2"
            shift 2
            ;;
        --users)
            NUM_USERS="$2"
            shift 2
            ;;
        --batch-size)
            BATCH_SIZE="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --no-seed         Create tables only, skip seeding data"
            echo "  --products NUM    Number of products to create (default: 50)"
            echo "  --users NUM       Number of users to create (default: 25)"
            echo "  --batch-size NUM  Batch size for database operations (default: 50)"
            echo "  -h, --help        Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            print_error "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Initialize database
print_step "Initializing database..."

if [ "$SEED_DATA" = true ]; then
    print_status "Creating tables and seeding data..."
    print_status "Configuration: $NUM_PRODUCTS products, $NUM_USERS users, batch size $BATCH_SIZE"
    python init_db.py --seed --products $NUM_PRODUCTS --users $NUM_USERS --batch-size $BATCH_SIZE
else
    print_status "Creating tables only (no seed data)..."
    python init_db.py
fi

if [ $? -eq 0 ]; then
    print_status "Database initialization completed successfully!"
    echo ""
    echo "🎉 Database Ready!"
    echo "=================="
    echo ""
    if [ "$SEED_DATA" = true ]; then
        echo "📊 Seeded Data:"
        echo "   • $NUM_USERS users (including admin and suppliers)"
        echo "   • $NUM_PRODUCTS products with variants"
        echo "   • Categories, shipping methods, tax rates"
        echo "   • Sample orders, reviews, and wishlists"
        echo ""
        echo "🔐 Default Login Credentials:"
        echo "   Admin: admin@banwee.com / admin123"
        echo "   Supplier: supplier1@banwee.com / supplier1123"
        echo "   Customer: customer1@example.com / customer1123"
        echo ""
        echo "🎫 Available Discount Codes:"
        echo "   • WELCOME10 - 10% off for new customers"
        echo "   • SAVE20 - 20% off orders over $100"
        echo "   • FREESHIP - Free shipping on any order"
        echo ""
    fi
    echo "✅ Your database is ready for use!"
else
    print_error "Database initialization failed!"
    exit 1
fi

# Go back to root directory
cd ..

echo ""
echo "🚀 Next Steps:"
echo "   1. Run './start-app.sh' to start the full application"
echo "   2. Or start backend/frontend separately:"
echo "      • Backend: cd backend && source .venv/bin/activate && python -m uvicorn main:app --reload"
echo "      • Frontend: cd frontend && npm install && npm run dev"