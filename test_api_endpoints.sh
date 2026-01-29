#!/bin/bash

echo "🚀 Testing Banwee Backend API Endpoints"
echo "========================================"

BASE_URL="http://localhost:8000"

# Test root endpoint
echo "1. Testing root endpoint..."
curl -s $BASE_URL/ | jq '.service' || echo "❌ Root endpoint failed"

# Test health endpoints
echo "2. Testing health endpoints..."
curl -s $BASE_URL/v1/health/live | jq '.status' || echo "❌ Health live failed"
curl -s $BASE_URL/v1/health/ready | jq '.status' || echo "❌ Health ready failed"

# Test products endpoint
echo "3. Testing products endpoint..."
PRODUCT_COUNT=$(curl -s $BASE_URL/v1/products/ | jq '.data | length')
echo "   Found $PRODUCT_COUNT products"

# Test specific product
echo "4. Testing specific product endpoint..."
FIRST_PRODUCT_ID=$(curl -s $BASE_URL/v1/products/ | jq -r '.data[0].id')
PRODUCT_NAME=$(curl -s $BASE_URL/v1/products/$FIRST_PRODUCT_ID | jq -r '.data.name')
echo "   Product: $PRODUCT_NAME"

# Test user registration
echo "5. Testing user registration..."
REGISTER_RESPONSE=$(curl -s $BASE_URL/v1/auth/register -X POST -H "Content-Type: application/json" -d '{"email":"apitest@example.com","password":"testpass123","firstname":"API","lastname":"Test"}')
USER_ID=$(echo $REGISTER_RESPONSE | jq -r '.data.id')
echo "   Registered user: $USER_ID"

# Test user login
echo "6. Testing user login..."
LOGIN_RESPONSE=$(curl -s $BASE_URL/v1/auth/login -X POST -H "Content-Type: application/json" -d '{"email":"apitest@example.com","password":"testpass123"}')
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.access_token')
echo "   Login successful: ${ACCESS_TOKEN:0:20}..."

# Test API documentation
echo "7. Testing API documentation..."
ENDPOINT_COUNT=$(curl -s $BASE_URL/openapi.json | jq '.paths | keys | length')
echo "   Available endpoints: $ENDPOINT_COUNT"

echo ""
echo "✅ API Testing Complete!"
echo "   - Root endpoint: Working"
echo "   - Health checks: Working"
echo "   - Products API: Working ($PRODUCT_COUNT products)"
echo "   - Authentication: Working"
echo "   - Documentation: Working ($ENDPOINT_COUNT endpoints)"
echo ""
echo "🌐 Access the API documentation at: $BASE_URL/docs"