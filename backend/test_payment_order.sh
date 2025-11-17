#!/bin/bash

# Payment and Order Flow Test Script
# This script tests the complete payment and order flow

echo "=========================================="
echo "Payment and Order Flow Test"
echo "=========================================="
echo ""

# Check if backend is running
echo "Checking if backend is running..."
if ! curl -s http://localhost:8000/api/v1/health > /dev/null 2>&1; then
    echo "❌ Backend is not running on http://localhost:8000"
    echo "Please start the backend server first:"
    echo "  cd backend"
    echo "  source .venv/bin/activate"
    echo "  uvicorn main:app --reload"
    exit 1
fi

echo "✅ Backend is running"
echo ""

# Run the test
echo "Running payment and order flow tests..."
echo ""

python3 test_payment_order_flow.py

# Capture exit code
EXIT_CODE=$?

echo ""
echo "=========================================="
if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Some tests failed"
fi
echo "=========================================="

exit $EXIT_CODE
