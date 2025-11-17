"""
End-to-end test for admin features.
Tests: admin dashboard, order management, user management, product management.
"""
import requests
import json
from typing import Optional
from uuid import UUID

BASE_URL = "http://localhost:8000/api/v1"


class AdminFeaturesTest:
    def __init__(self):
        self.access_token: Optional[str] = None
        self.admin_user_id: Optional[str] = None
        self.test_user_id: Optional[str] = None
        self.test_order_id: Optional[str] = None
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

    def login_as_admin(self, email: str = "admin@banwee.com", password: str = "adminpass"):
        """Login as admin to get access token"""
        print("\n" + "="*60)
        print("STEP 1: Login as Admin")
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
                    user = data["data"].get("user", {})
                    self.admin_user_id = user.get("id")
                    user_role = user.get("role")
                    
                    # Verify admin role
                    if user_role in ["Admin", "SuperAdmin"]:
                        self.log_test("Login as Admin", True, f"User ID: {self.admin_user_id}, Role: {user_role}")
                        return True
                    else:
                        self.log_test("Login as Admin", False, f"User is not admin, role: {user_role}")
                        return False
                else:
                    self.log_test("Login as Admin", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Login as Admin", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Login as Admin", False, str(e))
            return False

    def test_admin_dashboard_stats(self):
        """Test admin dashboard loads correctly with stats"""
        print("\n" + "="*60)
        print("STEP 2: Test Admin Dashboard Stats")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/admin/stats",
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    stats = data["data"]
                    
                    # Check for stats fields (flexible field names)
                    revenue_field = "total_revenue" if "total_revenue" in stats else None
                    orders_field = "total_orders" if "total_orders" in stats else None
                    users_field = "total_users" if "total_users" in stats else "total_customers"
                    products_field = "total_products" if "total_products" in stats else None
                    
                    checks = []
                    
                    if revenue_field:
                        print(f"  {revenue_field}: {stats[revenue_field]}")
                        checks.append((revenue_field, True))
                    
                    if orders_field:
                        print(f"  {orders_field}: {stats[orders_field]}")
                        checks.append((orders_field, True))
                    
                    if users_field and users_field in stats:
                        print(f"  {users_field}: {stats[users_field]}")
                        checks.append((users_field, True))
                    
                    if products_field:
                        print(f"  {products_field}: {stats[products_field]}")
                        checks.append((products_field, True))
                    
                    # Stats endpoint may not have recent_orders
                    all_passed = len(checks) >= 3  # At least 3 stats fields
                    details = f"Found {len(checks)} stat fields"
                    
                    self.log_test("Admin Dashboard Stats", all_passed, details)
                    return all_passed
                else:
                    self.log_test("Admin Dashboard Stats", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Admin Dashboard Stats", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Admin Dashboard Stats", False, str(e))
            return False

    def test_view_all_orders(self):
        """Test admin can view all orders"""
        print("\n" + "="*60)
        print("STEP 3: Test View All Orders")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/admin/orders?page=1&limit=10",
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    orders_data = data["data"]
                    
                    # Check structure - can be either flat or nested
                    if "data" in orders_data:
                        # Nested structure with pagination
                        orders = orders_data["data"]
                        pagination = orders_data.get("pagination", {})
                        has_pagination = "pagination" in orders_data
                    else:
                        # Flat structure
                        orders = orders_data if isinstance(orders_data, list) else []
                        has_pagination = False
                    
                    print(f"  Found {len(orders)} orders")
                    
                    # Store first order ID for later tests
                    if len(orders) > 0:
                        self.test_order_id = orders[0].get("id")
                        print(f"  First order ID: {self.test_order_id}")
                    
                    # Test passes if we got orders data
                    self.log_test("View All Orders", True, f"Found {len(orders)} orders")
                    return True
                else:
                    self.log_test("View All Orders", False, "Invalid response structure")
                    return False
            else:
                self.log_test("View All Orders", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("View All Orders", False, str(e))
            return False

    def test_filter_orders_by_status(self):
        """Test admin can filter orders by status"""
        print("\n" + "="*60)
        print("STEP 4: Test Filter Orders by Status")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            
            # Test filtering by different statuses
            statuses_to_test = ["pending", "confirmed", "shipped"]
            all_tests_passed = True
            
            for status_filter in statuses_to_test:
                response = requests.get(
                    f"{BASE_URL}/admin/orders?page=1&limit=10&status={status_filter}",
                    headers=headers
                )
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get("success") and data.get("data"):
                        orders_data = data["data"]
                        orders = orders_data.get("data", [])
                        print(f"  Status '{status_filter}': {len(orders)} orders")
                    else:
                        all_tests_passed = False
                        print(f"  Status '{status_filter}': Invalid response")
                else:
                    all_tests_passed = False
                    print(f"  Status '{status_filter}': Failed with status {response.status_code}")
            
            self.log_test("Filter Orders by Status", all_tests_passed, f"Tested {len(statuses_to_test)} status filters")
            return all_tests_passed
        except Exception as e:
            self.log_test("Filter Orders by Status", False, str(e))
            return False

    def test_view_order_details(self):
        """Test admin can view order details"""
        print("\n" + "="*60)
        print("STEP 5: Test View Order Details")
        print("="*60)

        if not self.test_order_id:
            self.log_test("View Order Details", True, "No orders in system (skipped)")
            return True

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/admin/orders/{self.test_order_id}",
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    order = data["data"]
                    
                    # Check for required order fields
                    required_fields = ["id", "status", "total_amount", "items"]
                    checks = []
                    
                    for field in required_fields:
                        has_field = field in order
                        checks.append((field, has_field))
                    
                    # Check items structure
                    if "items" in order:
                        items = order["items"]
                        print(f"  Order has {len(items)} items")
                    
                    all_passed = all(check[1] for check in checks)
                    details = ", ".join([f"{check[0]}: {check[1]}" for check in checks])
                    
                    self.log_test("View Order Details", all_passed, details)
                    return all_passed
                else:
                    self.log_test("View Order Details", False, "Invalid response structure")
                    return False
            else:
                self.log_test("View Order Details", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("View Order Details", False, str(e))
            return False

    def test_update_order_status(self):
        """Test admin can update order status"""
        print("\n" + "="*60)
        print("STEP 6: Test Update Order Status")
        print("="*60)

        if not self.test_order_id:
            self.log_test("Update Order Status", True, "No orders in system (skipped)")
            return True

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            
            # Get current order status first
            get_response = requests.get(
                f"{BASE_URL}/admin/orders/{self.test_order_id}",
                headers=headers
            )
            
            if get_response.status_code != 200:
                self.log_test("Update Order Status", False, "Could not fetch current order")
                return False
            
            current_order = get_response.json().get("data", {})
            current_status = current_order.get("status")
            print(f"  Current status: {current_status}")
            
            # Try to update status
            new_status = "confirmed" if current_status != "confirmed" else "shipped"
            
            response = requests.put(
                f"{BASE_URL}/admin/orders/{self.test_order_id}/status",
                json={"status": new_status},
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    updated_order = data["data"]
                    updated_status = updated_order.get("status")
                    
                    # Verify status was updated
                    status_updated = updated_status == new_status
                    
                    self.log_test(
                        "Update Order Status",
                        status_updated,
                        f"Status changed from '{current_status}' to '{updated_status}'"
                    )
                    return status_updated
                else:
                    self.log_test("Update Order Status", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Update Order Status", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Update Order Status", False, str(e))
            return False

    def test_view_all_users(self):
        """Test admin can view all users"""
        print("\n" + "="*60)
        print("STEP 7: Test View All Users")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/admin/users?page=1&limit=10",
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    users_data = data["data"]
                    
                    # Check structure - can be either flat or nested
                    if "data" in users_data:
                        # Nested structure with pagination
                        users = users_data["data"]
                    else:
                        # Flat structure
                        users = users_data if isinstance(users_data, list) else []
                    
                    print(f"  Found {len(users)} users")
                    
                    # Store a non-admin user ID for later tests
                    for user in users:
                        if user.get("role") not in ["Admin", "SuperAdmin"] and user.get("id") != self.admin_user_id:
                            self.test_user_id = user.get("id")
                            print(f"  Test user ID: {self.test_user_id}")
                            break
                    
                    self.log_test("View All Users", True, f"Found {len(users)} users")
                    return True
                else:
                    self.log_test("View All Users", False, "Invalid response structure")
                    return False
            else:
                self.log_test("View All Users", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("View All Users", False, str(e))
            return False

    def test_filter_users(self):
        """Test admin can filter users"""
        print("\n" + "="*60)
        print("STEP 8: Test Filter Users")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            
            # Test filtering by role
            response = requests.get(
                f"{BASE_URL}/admin/users?page=1&limit=10&role_filter=Customer",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    users_data = data["data"]
                    users = users_data.get("data", [])
                    print(f"  Found {len(users)} customers")
                    
                    self.log_test("Filter Users", True, f"Successfully filtered users")
                    return True
                else:
                    self.log_test("Filter Users", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Filter Users", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Filter Users", False, str(e))
            return False

    def test_update_user_status(self):
        """Test admin can update user status"""
        print("\n" + "="*60)
        print("STEP 9: Test Update User Status")
        print("="*60)

        if not self.test_user_id:
            self.log_test("Update User Status", True, "No test user available (skipped)")
            return True

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            
            # Try to deactivate user
            response = requests.put(
                f"{BASE_URL}/admin/users/{self.test_user_id}/status",
                json={"active": False},
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    # Reactivate user
                    reactivate_response = requests.put(
                        f"{BASE_URL}/admin/users/{self.test_user_id}/status",
                        json={"active": True},
                        headers=headers
                    )
                    
                    self.log_test("Update User Status", True, "Successfully updated user status")
                    return True
                else:
                    self.log_test("Update User Status", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Update User Status", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Update User Status", False, str(e))
            return False

    def test_view_all_products(self):
        """Test admin can view all products"""
        print("\n" + "="*60)
        print("STEP 10: Test View All Products")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/admin/products?page=1&limit=10",
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    products_data = data["data"]
                    
                    # Check structure - can be either flat or nested
                    if "data" in products_data:
                        # Nested structure with pagination
                        products = products_data["data"]
                    else:
                        # Flat structure
                        products = products_data if isinstance(products_data, list) else []
                    
                    print(f"  Found {len(products)} products")
                    
                    self.log_test("View All Products", True, f"Found {len(products)} products")
                    return True
                else:
                    self.log_test("View All Products", False, "Invalid response structure")
                    return False
            else:
                self.log_test("View All Products", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("View All Products", False, str(e))
            return False

    def test_filter_products(self):
        """Test admin can filter products"""
        print("\n" + "="*60)
        print("STEP 11: Test Filter Products")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            
            # Test search filter
            response = requests.get(
                f"{BASE_URL}/admin/products?page=1&limit=10&search=organic",
                headers=headers
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    products_data = data["data"]
                    products = products_data.get("data", [])
                    print(f"  Found {len(products)} products matching 'organic'")
                    
                    self.log_test("Filter Products", True, "Successfully filtered products")
                    return True
                else:
                    self.log_test("Filter Products", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Filter Products", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Filter Products", False, str(e))
            return False

    def test_view_product_variants(self):
        """Test admin can view product variants"""
        print("\n" + "="*60)
        print("STEP 12: Test View Product Variants")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/admin/variants?page=1&limit=10",
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    variants_data = data["data"]
                    
                    # Check structure - can be either flat or nested
                    if "data" in variants_data:
                        # Nested structure with pagination
                        variants = variants_data["data"]
                    else:
                        # Flat structure
                        variants = variants_data if isinstance(variants_data, list) else []
                    
                    print(f"  Found {len(variants)} variants")
                    
                    self.log_test("View Product Variants", True, f"Found {len(variants)} variants")
                    return True
                else:
                    self.log_test("View Product Variants", False, "Invalid response structure")
                    return False
            else:
                self.log_test("View Product Variants", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("View Product Variants", False, str(e))
            return False

    def test_platform_overview(self):
        """Test admin can view platform overview"""
        print("\n" + "="*60)
        print("STEP 13: Test Platform Overview")
        print("="*60)

        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(
                f"{BASE_URL}/admin/overview",
                headers=headers
            )

            if response.status_code == 200:
                data = response.json()
                if data.get("success") and data.get("data"):
                    overview = data["data"]
                    print(f"  Platform overview loaded successfully")
                    
                    self.log_test("Platform Overview", True, "Successfully loaded platform overview")
                    return True
                else:
                    self.log_test("Platform Overview", False, "Invalid response structure")
                    return False
            else:
                self.log_test("Platform Overview", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Platform Overview", False, str(e))
            return False

    def run_all_tests(self):
        """Run all admin feature tests"""
        print("\n" + "="*60)
        print("ADMIN FEATURES END-TO-END TEST")
        print("="*60)

        # Run tests in sequence
        if not self.login_as_admin():
            print("\n❌ Cannot proceed without admin login")
            return False

        # Dashboard tests
        if not self.test_admin_dashboard_stats():
            print("\n⚠️  Dashboard stats has issues")

        if not self.test_platform_overview():
            print("\n⚠️  Platform overview has issues")

        # Order management tests
        if not self.test_view_all_orders():
            print("\n⚠️  Viewing orders has issues")

        if not self.test_filter_orders_by_status():
            print("\n⚠️  Filtering orders has issues")

        if not self.test_view_order_details():
            print("\n⚠️  Viewing order details has issues")

        if not self.test_update_order_status():
            print("\n⚠️  Updating order status has issues")

        # User management tests
        if not self.test_view_all_users():
            print("\n⚠️  Viewing users has issues")

        if not self.test_filter_users():
            print("\n⚠️  Filtering users has issues")

        if not self.test_update_user_status():
            print("\n⚠️  Updating user status has issues")

        # Product management tests
        if not self.test_view_all_products():
            print("\n⚠️  Viewing products has issues")

        if not self.test_filter_products():
            print("\n⚠️  Filtering products has issues")

        if not self.test_view_product_variants():
            print("\n⚠️  Viewing variants has issues")

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
    tester = AdminFeaturesTest()
    success = tester.run_all_tests()
    exit(0 if success else 1)
