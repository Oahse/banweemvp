#!/bin/bash

echo "🔍 Comprehensive Backend API Testing"
echo "===================================="

BASE_URL="http://localhost:8000"

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    local auth_header=$5
    local extra_header=$6
    
    echo -n "Testing $description... "
    
    if [ "$method" = "GET" ]; then
        if [ -n "$auth_header" ]; then
            response=$(curl -s -w "%{http_code}" -H "$auth_header" "$BASE_URL$endpoint")
        else
            response=$(curl -s -w "%{http_code}" "$BASE_URL$endpoint")
        fi
    else
        local curl_cmd="curl -s -w \"%{http_code}\" -X \"$method\" -H \"Content-Type: application/json\""
        
        if [ -n "$auth_header" ]; then
            curl_cmd="$curl_cmd -H \"$auth_header\""
        fi
        
        if [ -n "$extra_header" ]; then
            curl_cmd="$curl_cmd -H \"$extra_header\""
        fi
        
        curl_cmd="$curl_cmd -d \"$data\" \"$BASE_URL$endpoint\""
        
        response=$(eval $curl_cmd)
    fi
    
    http_code="${response: -3}"
    body="${response%???}"
    
    if [[ "$http_code" =~ ^[23] ]]; then
        echo "✅ ($http_code)"
    else
        echo "❌ ($http_code)"
        if [ ${#body} -lt 200 ]; then
            echo "   Error: $body"
        fi
    fi
}

# Create test user and get token
echo "Setting up test user..."
TIMESTAMP=$(date +%s)
REGISTER_DATA="{\"email\":\"test${TIMESTAMP}@example.com\",\"password\":\"testpass123\",\"firstname\":\"Test\",\"lastname\":\"User\"}"
curl -s "$BASE_URL/v1/auth/register" -X POST -H "Content-Type: application/json" -d "$REGISTER_DATA" > /dev/null

LOGIN_DATA='{"email":"comprehensive@test.com","password":"testpass123"}'
LOGIN_RESPONSE=$(curl -s "$BASE_URL/v1/auth/login" -X POST -H "Content-Type: application/json" -d "$LOGIN_DATA")
ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.access_token' 2>/dev/null)
REFRESH_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.refresh_token' 2>/dev/null)
AUTH_HEADER="Authorization: Bearer $ACCESS_TOKEN"

echo ""
echo "🔐 Authentication APIs"
echo "====================="
test_endpoint "POST" "/v1/auth/register" "User Registration" "{\"email\":\"test$(date +%s)@example.com\",\"password\":\"testpass123\",\"firstname\":\"Test2\",\"lastname\":\"User2\"}"
test_endpoint "POST" "/v1/auth/login" "User Login" "$LOGIN_DATA"
test_endpoint "POST" "/v1/auth/refresh" "Token Refresh" "{\"refresh_token\":\"$REFRESH_TOKEN\"}"
test_endpoint "POST" "/v1/auth/logout" "User Logout" '{}' "$AUTH_HEADER"

echo ""
echo "👤 User Management APIs"
echo "======================="
test_endpoint "GET" "/v1/users/profile" "Get User Profile" "" "$AUTH_HEADER"
test_endpoint "PUT" "/v1/users/profile" "Update Profile" '{"firstname":"Updated"}' "$AUTH_HEADER"

echo ""
echo "🛍️ Product APIs"
echo "==============="
test_endpoint "GET" "/v1/products/" "List Products"
test_endpoint "GET" "/v1/products/019c077f-4dfa-7e60-80ba-eb42175d77d0" "Get Product by ID"
test_endpoint "GET" "/v1/products/categories" "List Categories"

echo ""
echo "🛒 Cart APIs"
echo "============"
test_endpoint "GET" "/v1/cart/" "Get Cart" "" "$AUTH_HEADER"
test_endpoint "POST" "/v1/cart/add" "Add to Cart" '{"variant_id":"019c077f-4ee8-7884-a0ca-618307fa3857","quantity":1}' "$AUTH_HEADER"

echo ""
echo "📦 Order APIs"
echo "============="
test_endpoint "GET" "/v1/orders/" "List Orders" "" "$AUTH_HEADER"
test_endpoint "POST" "/v1/orders/" "Create Order" '{"items":[{"variant_id":"019c077f-4ee8-7884-a0ca-618307fa3857","quantity":1}],"shipping_address":{"street":"123 Test St","city":"Test City","state":"TS","country":"US","post_code":"12345"},"payment_method":"stripe"}' "$AUTH_HEADER"

echo ""
echo "💳 Payment APIs"
echo "==============="
test_endpoint "GET" "/v1/payments/methods" "List Payment Methods" "" "$AUTH_HEADER"
test_endpoint "POST" "/v1/payments/intents" "Create Payment Intent" '{"amount":100,"currency":"USD"}' "$AUTH_HEADER"

echo ""
echo "🚚 Shipping APIs"
echo "================"
test_endpoint "GET" "/v1/shipping/methods/" "List Shipping Methods"
test_endpoint "POST" "/v1/shipping/calculate?order_amount=100" "Calculate Shipping" '{}'

echo ""
echo "⭐ Review APIs"
echo "=============="
test_endpoint "GET" "/v1/reviews/" "List Reviews"
test_endpoint "POST" "/v1/reviews/" "Create Review" '{"product_id":"019c077f-4dfa-7e60-80ba-eb42175d77d0","rating":5,"comment":"Great product!"}' "$AUTH_HEADER"

echo ""
echo "❤️ Wishlist APIs"
echo "================"
test_endpoint "GET" "/v1/wishlist/" "Get Current User Wishlist" "" "$AUTH_HEADER"
test_endpoint "POST" "/v1/wishlist/add" "Add to Wishlist" '{"product_id":"019c077f-4dfa-7e60-80ba-eb42175d77d0"}' "$AUTH_HEADER"

echo ""
echo "🔍 Search APIs"
echo "=============="
test_endpoint "GET" "/v1/search/?q=rice" "Search Products"
test_endpoint "GET" "/v1/search/autocomplete?q=ri" "Search Autocomplete"

echo ""
echo "🏥 Health & Admin APIs"
echo "======================"
test_endpoint "GET" "/v1/health/live" "Health Live Check"
test_endpoint "GET" "/v1/health/ready" "Health Ready Check"
test_endpoint "GET" "/v1/health/detailed" "Detailed Health Check"

echo ""
echo "📊 Analytics APIs"
echo "================="
test_endpoint "GET" "/v1/analytics/dashboard" "Analytics Dashboard" "" "$AUTH_HEADER"

echo ""
echo "🎫 Subscription APIs"
echo "===================="
test_endpoint "GET" "/v1/subscriptions/" "List Subscriptions" "" "$AUTH_HEADER"

echo ""
echo "💰 Tax APIs"
echo "==========="
test_endpoint "POST" "/v1/tax/calculate" "Calculate Tax" '{"subtotal":100,"shipping":0,"country_code":"US","state_code":"CA"}'

echo ""
echo "🔧 Webhook APIs"
echo "==============="
test_endpoint "POST" "/v1/webhooks/stripe" "Stripe Webhook" '{"type":"test","data":{"object":{}}}' "" "stripe-signature: t=1234567890,v1=test_signature"

echo ""
echo "📋 Summary"
echo "=========="
echo "Comprehensive API testing completed!"
echo "Check the results above to see which endpoints are working (✅) or failing (❌)"