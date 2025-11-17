#!/bin/bash

# Manual Wishlist Flow Test Script
# This script tests the complete wishlist functionality end-to-end

BASE_URL="http://localhost:8000/api/v1"

echo "============================================================"
echo "WISHLIST END-TO-END FLOW TEST"
echo "============================================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Login
echo -e "\n${YELLOW}STEP 1: Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@banwee.com","password":"adminpass"}')

echo "$LOGIN_RESPONSE" | python3 -m json.tool

ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data']['access_token'])" 2>/dev/null)
USER_ID=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['data']['user']['id'])" 2>/dev/null)

if [ -z "$ACCESS_TOKEN" ]; then
    echo -e "${RED}❌ Login failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Login successful${NC}"
echo "User ID: $USER_ID"
echo "Token: ${ACCESS_TOKEN:0:20}..."

# Step 2: Create a product variant for testing (if needed)
echo -e "\n${YELLOW}STEP 2: Get or Create Product with Variant${NC}"

# First, try to get existing products
PRODUCTS_RESPONSE=$(curl -s -X GET "${BASE_URL}/products?page=1&per_page=1")
PRODUCT_ID=$(echo "$PRODUCTS_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); products=data.get('data', {}); product_list=products.get('data', []) if isinstance(products, dict) else products; print(product_list[0]['id'] if product_list else '')" 2>/dev/null)

if [ -z "$PRODUCT_ID" ]; then
    echo -e "${RED}❌ No products found${NC}"
    exit 1
fi

echo "Product ID: $PRODUCT_ID"

# Get product details to check for variants
PRODUCT_DETAIL=$(curl -s -X GET "${BASE_URL}/products/${PRODUCT_ID}")
echo "$PRODUCT_DETAIL" | python3 -m json.tool | head -30

VARIANT_ID=$(echo "$PRODUCT_DETAIL" | python3 -c "import sys, json; data=json.load(sys.stdin); variants=data.get('data', {}).get('variants', []); print(variants[0]['id'] if variants else '')" 2>/dev/null)

if [ -z "$VARIANT_ID" ]; then
    echo -e "${YELLOW}⚠️  No variants found for product. Creating one...${NC}"
    
    # Create a variant for the product (requires admin access)
    CREATE_VARIANT_RESPONSE=$(curl -s -X POST "${BASE_URL}/admin/products/${PRODUCT_ID}/variants" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${ACCESS_TOKEN}" \
      -d '{
        "sku": "TEST-VAR-001",
        "name": "Test Variant",
        "base_price": 10.99,
        "sale_price": 8.99,
        "stock": 100,
        "weight": 1.0,
        "dimensions": {"length": 10, "width": 10, "height": 10},
        "is_active": true
      }')
    
    echo "$CREATE_VARIANT_RESPONSE" | python3 -m json.tool
    
    VARIANT_ID=$(echo "$CREATE_VARIANT_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('data', {}).get('id', ''))" 2>/dev/null)
    
    if [ -z "$VARIANT_ID" ]; then
        echo -e "${RED}❌ Failed to create variant${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Variant created${NC}"
fi

echo "Variant ID: $VARIANT_ID"

# Step 3: Create Wishlist
echo -e "\n${YELLOW}STEP 3: Create Wishlist${NC}"
CREATE_WISHLIST_RESPONSE=$(curl -s -X POST "${BASE_URL}/users/${USER_ID}/wishlists" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d '{"name":"Test Wishlist","is_default":true}')

echo "$CREATE_WISHLIST_RESPONSE" | python3 -m json.tool

WISHLIST_ID=$(echo "$CREATE_WISHLIST_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('data', {}).get('id', ''))" 2>/dev/null)

if [ -z "$WISHLIST_ID" ]; then
    echo -e "${RED}❌ Failed to create wishlist${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Wishlist created${NC}"
echo "Wishlist ID: $WISHLIST_ID"

# Step 4: Add Item to Wishlist
echo -e "\n${YELLOW}STEP 4: Add Item to Wishlist${NC}"
ADD_ITEM_RESPONSE=$(curl -s -X POST "${BASE_URL}/users/${USER_ID}/wishlists/${WISHLIST_ID}/items" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d "{\"product_id\":\"${PRODUCT_ID}\",\"variant_id\":\"${VARIANT_ID}\",\"quantity\":1}")

echo "$ADD_ITEM_RESPONSE" | python3 -m json.tool

WISHLIST_ITEM_ID=$(echo "$ADD_ITEM_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('data', {}).get('id', ''))" 2>/dev/null)

if [ -z "$WISHLIST_ITEM_ID" ]; then
    echo -e "${RED}❌ Failed to add item to wishlist${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Item added to wishlist${NC}"
echo "Wishlist Item ID: $WISHLIST_ITEM_ID"

# Step 5: View Wishlist
echo -e "\n${YELLOW}STEP 5: View Wishlist${NC}"
VIEW_WISHLIST_RESPONSE=$(curl -s -X GET "${BASE_URL}/users/${USER_ID}/wishlists" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

echo "$VIEW_WISHLIST_RESPONSE" | python3 -m json.tool | head -50

# Check if product has variants loaded
HAS_VARIANTS=$(echo "$VIEW_WISHLIST_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); wishlists=data.get('data', []); items=wishlists[0].get('items', []) if wishlists else []; product=items[0].get('product', {}) if items else {}; variants=product.get('variants', []); print('yes' if variants else 'no')" 2>/dev/null)

if [ "$HAS_VARIANTS" = "yes" ]; then
    echo -e "${GREEN}✅ Wishlist viewed successfully with product variants${NC}"
else
    echo -e "${YELLOW}⚠️  Wishlist viewed but product variants not loaded${NC}"
fi

# Step 6: Add Wishlist Item to Cart
echo -e "\n${YELLOW}STEP 6: Add Wishlist Item to Cart${NC}"
ADD_TO_CART_RESPONSE=$(curl -s -X POST "${BASE_URL}/cart/add" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -d "{\"variant_id\":\"${VARIANT_ID}\",\"quantity\":1}")

echo "$ADD_TO_CART_RESPONSE" | python3 -m json.tool

ADD_TO_CART_SUCCESS=$(echo "$ADD_TO_CART_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print('yes' if data.get('success') else 'no')" 2>/dev/null)

if [ "$ADD_TO_CART_SUCCESS" = "yes" ]; then
    echo -e "${GREEN}✅ Item added to cart from wishlist${NC}"
else
    echo -e "${RED}❌ Failed to add item to cart${NC}"
fi

# Step 7: Remove Item from Wishlist
echo -e "\n${YELLOW}STEP 7: Remove Item from Wishlist${NC}"
REMOVE_ITEM_RESPONSE=$(curl -s -X DELETE "${BASE_URL}/users/${USER_ID}/wishlists/${WISHLIST_ID}/items/${WISHLIST_ITEM_ID}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

echo "$REMOVE_ITEM_RESPONSE" | python3 -m json.tool

REMOVE_SUCCESS=$(echo "$REMOVE_ITEM_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print('yes' if data.get('success') else 'no')" 2>/dev/null)

if [ "$REMOVE_SUCCESS" = "yes" ]; then
    echo -e "${GREEN}✅ Item removed from wishlist${NC}"
else
    echo -e "${RED}❌ Failed to remove item from wishlist${NC}"
fi

# Step 8: Verify Wishlist is Empty
echo -e "\n${YELLOW}STEP 8: Verify Wishlist is Empty${NC}"
VERIFY_WISHLIST_RESPONSE=$(curl -s -X GET "${BASE_URL}/users/${USER_ID}/wishlists" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}")

ITEM_COUNT=$(echo "$VERIFY_WISHLIST_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); wishlists=data.get('data', []); items=wishlists[0].get('items', []) if wishlists else []; print(len(items))" 2>/dev/null)

if [ "$ITEM_COUNT" = "0" ]; then
    echo -e "${GREEN}✅ Wishlist is empty${NC}"
else
    echo -e "${YELLOW}⚠️  Wishlist still has $ITEM_COUNT items${NC}"
fi

# Summary
echo -e "\n============================================================"
echo -e "${GREEN}TEST SUMMARY${NC}"
echo "============================================================"
echo "✅ Login"
echo "✅ Get/Create Product with Variant"
echo "✅ Create Wishlist"
echo "✅ Add Item to Wishlist"
if [ "$HAS_VARIANTS" = "yes" ]; then
    echo "✅ View Wishlist (with variants)"
else
    echo "⚠️  View Wishlist (variants not loaded)"
fi
if [ "$ADD_TO_CART_SUCCESS" = "yes" ]; then
    echo "✅ Add to Cart from Wishlist"
else
    echo "❌ Add to Cart from Wishlist"
fi
if [ "$REMOVE_SUCCESS" = "yes" ]; then
    echo "✅ Remove Item from Wishlist"
else
    echo "❌ Remove Item from Wishlist"
fi
if [ "$ITEM_COUNT" = "0" ]; then
    echo "✅ Verify Wishlist Empty"
else
    echo "⚠️  Verify Wishlist Empty"
fi

echo -e "\n${GREEN}🎉 Wishlist flow test completed!${NC}"
