"""
End-to-end test for wishlist functionality.
Tests: adding products, viewing wishlist, adding to cart, removing items.
"""
import requests
import json
from typing import Optional

BASE_URL = "http://localhost:8000/api/v1"

class WishlistFlowTester:
    def __init__(self):
        self.access_token: Optional[str] = None
        self.user_id: Optional[str] = None
        self.wishlist_id: Optional[str] = None
        self.product_id: Optional[str] = None
        self.variant_id: Optional[str] = None
        self.wishlist_item_id: Optional[str] = None
        self.test_results = []
    
    def log_test(self, test_name: str, passed: bool, message: str = ""):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = f"{status}: {test_name}"
        if message:
            result += f" - {message}"
        print(result)
        self.test_results.append({
            "test": test_name,
            "passed": passed,
            "message": message
        })
    
    def login(self, email: str = "admin@banwee.com", password: str = "adminpass"):
        """Login to get access token"""
        print("\n" + "="*60)
        print("STEP 1: Login")
        print("="*60)
        
        try:
            response = requests.post(
                f"{BASE_URL}/auth/login",
                json={"email": email, "password": password}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    self.access_token = data["data"].get("access_token")
                    self.user_id = data["data"].get("user", {}).get("id")
                    self.log_test("Login", True, f"User ID: {self.user_id}")
                    return True
                else:
                    self.log_test("Login", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Login", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Login", False, str(e))
            return False
    
    def get_product(self):
        """Get a product to add to wishlist"""
        print("\n" + "="*60)
        print("STEP 2: Get Product")
        print("="*60)
        
        try:
            # Try to get products with variants
            response = requests.get(f"{BASE_URL}/products?page=1&per_page=50")
            
            if response.status_code == 200:
                data = response.json()
                # Handle nested data structure
                products_data = data.get("data", {})
                if isinstance(products_data, dict):
                    products = products_data.get("data", [])
                else:
                    products = products_data
                
                if len(products) > 0:
                    # Find a product with variants
                    for product in products:
                        # Get product details to check for variants
                        product_id = product.get("id")
                        detail_response = requests.get(f"{BASE_URL}/products/{product_id}")
                        
                        if detail_response.status_code == 200:
                            detail_data = detail_response.json()
                            if detail_data.get("success") and detail_data.get("data"):
                                product_detail = detail_data["data"]
                                variants = product_detail.get("variants", [])
                                
                                if len(variants) > 0:
                                    self.product_id = product_id
                                    self.variant_id = variants[0].get("id")
                                    self.log_test(
                                        "Get Product", 
                                        True, 
                                        f"Product: {product.get('name')}, Variant: {self.variant_id}"
                                    )
                                    return True
                    
                    self.log_test("Get Product", False, "No products with variants found")
                    return False
                else:
                    self.log_test("Get Product", False, "No products found")
                    return False
            else:
                self.log_test("Get Product", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Product", False, str(e))
            return False
    
    def create_wishlist(self):
        """Create a default wishlist"""
        print("\n" + "="*60)
        print("STEP 3: Create Wishlist")
        print("="*60)
        
        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.post(
                f"{BASE_URL}/users/{self.user_id}/wishlists",
                json={"name": "Test Wishlist", "is_default": True},
                headers=headers
            )
            
            if response.status_code in [200, 201]:
                data = response.json()
                if data.get("success") and data.get("data"):
                    self.wishlist_id = data["data"].get("id")
                    self.log_test("Create Wishlist", True, f"Wishlist ID: {self.wishlist_id}")
                    return True
                else:
                    self.log_test("Create Wishlist", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Create Wishlist", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Create Wishlist", False, str(e))
            return False
    
    def add_item_to_wishlist(self):
        """Add product to wishlist"""
        print("\n" + "="*60)
        print("STEP 4: Add Item to Wishlist")
        print("="*60)
        
        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.post(
                f"{BASE_URL}/users/{self.user_id}/wishlists/{self.wishlist_id}/items",
                json={
                    "product_id": self.product_id,
                    "variant_id": self.variant_id,
                    "quantity": 1
                },
                headers=headers
            )
            
            if response.status_code in [200, 201]:
                data = response.json()
                if data.get("success") and data.get("data"):
                    self.wishlist_item_id = data["data"].get("id")
                    self.log_test("Add Item to Wishlist", True, f"Item ID: {self.wishlist_item_id}")
                    return True
                else:
                    self.log_test("Add Item to Wishlist", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Add Item to Wishlist", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Add Item to Wishlist", False, str(e))
            return False
    
    def view_wishlist(self):
        """View wishlist items"""
        print("\n" + "="*60)
        print("STEP 5: View Wishlist")
        print("="*60)
        
        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/users/{self.user_id}/wishlists",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    wishlists = data["data"]
                    if len(wishlists) > 0:
                        wishlist = wishlists[0]
                        items = wishlist.get("items", [])
                        
                        # Check if product has variants loaded
                        if len(items) > 0:
                            item = items[0]
                            product = item.get("product")
                            has_variants = product and product.get("variants") and len(product["variants"]) > 0
                            
                            self.log_test(
                                "View Wishlist", 
                                True, 
                                f"Found {len(items)} items, Product has variants: {has_variants}"
                            )
                            
                            # Additional check for product data completeness
                            if product:
                                print(f"  Product Name: {product.get('name')}")
                                if has_variants:
                                    variant = product["variants"][0]
                                    print(f"  Variant: {variant.get('name')}")
                                    print(f"  Price: ${variant.get('base_price', 0)}")
                            
                            return True
                        else:
                            self.log_test("View Wishlist", False, "No items in wishlist")
                            return False
                    else:
                        self.log_test("View Wishlist", False, "No wishlists found")
                        return False
                else:
                    self.log_test("View Wishlist", False, "Invalid response structure")
                    return False
            else:
                self.log_test("View Wishlist", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("View Wishlist", False, str(e))
            return False
    
    def add_wishlist_item_to_cart(self):
        """Add wishlist item to cart"""
        print("\n" + "="*60)
        print("STEP 6: Add Wishlist Item to Cart")
        print("="*60)
        
        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.post(
                f"{BASE_URL}/cart/add",
                json={
                    "variant_id": self.variant_id,
                    "quantity": 1
                },
                headers=headers
            )
            
            if response.status_code in [200, 201]:
                data = response.json()
                if data.get("success"):
                    cart_data = data.get("data", {})
                    items = cart_data.get("items", [])
                    self.log_test(
                        "Add to Cart from Wishlist", 
                        True, 
                        f"Cart now has {len(items)} items"
                    )
                    return True
                else:
                    self.log_test("Add to Cart from Wishlist", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Add to Cart from Wishlist", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Add to Cart from Wishlist", False, str(e))
            return False
    
    def remove_item_from_wishlist(self):
        """Remove item from wishlist"""
        print("\n" + "="*60)
        print("STEP 7: Remove Item from Wishlist")
        print("="*60)
        
        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.delete(
                f"{BASE_URL}/users/{self.user_id}/wishlists/{self.wishlist_id}/items/{self.wishlist_item_id}",
                headers=headers
            )
            
            if response.status_code in [200, 204]:
                self.log_test("Remove Item from Wishlist", True, "Item removed successfully")
                return True
            else:
                self.log_test("Remove Item from Wishlist", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Remove Item from Wishlist", False, str(e))
            return False
    
    def verify_wishlist_empty(self):
        """Verify wishlist is empty after removal"""
        print("\n" + "="*60)
        print("STEP 8: Verify Wishlist Empty")
        print("="*60)
        
        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/users/{self.user_id}/wishlists",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    wishlists = data["data"]
                    if len(wishlists) > 0:
                        wishlist = wishlists[0]
                        items = wishlist.get("items", [])
                        
                        if len(items) == 0:
                            self.log_test("Verify Wishlist Empty", True, "Wishlist is empty")
                            return True
                        else:
                            self.log_test("Verify Wishlist Empty", False, f"Wishlist still has {len(items)} items")
                            return False
                    else:
                        self.log_test("Verify Wishlist Empty", True, "No wishlists found (acceptable)")
                        return True
                else:
                    self.log_test("Verify Wishlist Empty", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Verify Wishlist Empty", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Verify Wishlist Empty", False, str(e))
            return False
    
    def run_all_tests(self):
        """Run all wishlist flow tests"""
        print("\n" + "="*60)
        print("WISHLIST END-TO-END FLOW TEST")
        print("="*60)
        
        # Run tests in sequence
        if not self.login():
            print("\n❌ Cannot proceed without login")
            return False
        
        if not self.get_product():
            print("\n❌ Cannot proceed without product")
            return False
        
        if not self.create_wishlist():
            print("\n❌ Cannot proceed without wishlist")
            return False
        
        if not self.add_item_to_wishlist():
            print("\n❌ Cannot proceed without adding item")
            return False
        
        if not self.view_wishlist():
            print("\n⚠️  Wishlist viewing has issues")
        
        if not self.add_wishlist_item_to_cart():
            print("\n⚠️  Adding to cart has issues")
        
        if not self.remove_item_from_wishlist():
            print("\n⚠️  Removing item has issues")
        
        if not self.verify_wishlist_empty():
            print("\n⚠️  Wishlist verification has issues")
        
        # Print summary
        print("\n" + "="*60)
        print("TEST SUMMARY")
        print("="*60)
        
        passed = sum(1 for r in self.test_results if r["passed"])
        total = len(self.test_results)
        
        print(f"\nTotal Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total*100):.1f}%")
        
        if passed == total:
            print("\n🎉 All tests passed!")
            return True
        else:
            print("\n⚠️  Some tests failed. Review the output above.")
            return False

if __name__ == "__main__":
    tester = WishlistFlowTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)
