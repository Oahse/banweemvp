"""
Unit tests for role-based access control
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4

from models.user import User, UserRole


@pytest.mark.unit
class TestRoleBasedAccess:
    """Test role-based access control for different user types."""
    
    @pytest.mark.asyncio
    async def test_customer_access_permissions(self, async_client: AsyncClient, db_session: AsyncSession, test_user: User, auth_headers: dict):
        """Test customer user access permissions."""
        
        # Customer should have access to these endpoints
        customer_allowed_endpoints = [
            ("GET", "/user/profile"),
            ("PUT", "/user/profile"),
            ("GET", "/products"),
            ("GET", "/products/search"),
            ("GET", "/cart"),
            ("POST", "/cart/items"),
            ("GET", "/orders"),
            ("POST", "/orders"),
            ("GET", "/user/addresses"),
            ("POST", "/user/addresses"),
            ("GET", "/payments/methods"),
            ("POST", "/payments/methods"),
            ("GET", "/wishlist"),
            ("POST", "/wishlist/items"),
            ("GET", "/subscriptions"),
            ("POST", "/subscriptions"),
        ]
        
        for method, endpoint in customer_allowed_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint, headers=auth_headers)
            elif method == "POST":
                response = await async_client.post(endpoint, json={}, headers=auth_headers)
            elif method == "PUT":
                response = await async_client.put(endpoint, json={}, headers=auth_headers)
            
            # Should not be forbidden (may be 400/422 for invalid data, but not 403)
            assert response.status_code != 403, f"Customer should have access to {method} {endpoint}"
        
        # Customer should NOT have access to these endpoints
        customer_forbidden_endpoints = [
            ("GET", "/admin/users"),
            ("POST", "/admin/users"),
            ("PUT", "/admin/users/123"),
            ("DELETE", "/admin/users/123"),
            ("GET", "/admin/analytics"),
            ("GET", "/admin/orders"),
            ("PUT", "/admin/orders/123/status"),
            ("GET", "/admin/products"),
            ("POST", "/admin/products"),
            ("PUT", "/admin/products/123"),
            ("DELETE", "/admin/products/123"),
            ("GET", "/admin/inventory"),
            ("POST", "/admin/inventory/adjust"),
            ("GET", "/supplier/products"),
            ("POST", "/supplier/products"),
            ("PUT", "/supplier/products/123"),
            ("GET", "/supplier/inventory"),
            ("POST", "/supplier/inventory/adjust"),
        ]
        
        for method, endpoint in customer_forbidden_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint, headers=auth_headers)
            elif method == "POST":
                response = await async_client.post(endpoint, json={}, headers=auth_headers)
            elif method == "PUT":
                response = await async_client.put(endpoint, json={}, headers=auth_headers)
            elif method == "DELETE":
                response = await async_client.delete(endpoint, headers=auth_headers)
            
            # Should be forbidden
            assert response.status_code == 403, f"Customer should NOT have access to {method} {endpoint}"
    
    @pytest.mark.asyncio
    async def test_admin_access_permissions(self, async_client: AsyncClient, db_session: AsyncSession, admin_user: User, admin_auth_headers: dict):
        """Test admin user access permissions."""
        
        # Admin should have access to ALL endpoints
        admin_allowed_endpoints = [
            # Customer endpoints
            ("GET", "/user/profile"),
            ("GET", "/products"),
            ("GET", "/cart"),
            ("GET", "/orders"),
            # Admin-specific endpoints
            ("GET", "/admin/users"),
            ("GET", "/admin/analytics"),
            ("GET", "/admin/orders"),
            ("GET", "/admin/products"),
            ("GET", "/admin/inventory"),
            ("GET", "/admin/reports"),
            ("GET", "/admin/settings"),
            # Supplier endpoints (admin can access)
            ("GET", "/supplier/products"),
            ("GET", "/supplier/inventory"),
        ]
        
        for method, endpoint in admin_allowed_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint, headers=admin_auth_headers)
            elif method == "POST":
                response = await async_client.post(endpoint, json={}, headers=admin_auth_headers)
            elif method == "PUT":
                response = await async_client.put(endpoint, json={}, headers=admin_auth_headers)
            
            # Should not be forbidden
            assert response.status_code != 403, f"Admin should have access to {method} {endpoint}"
    
    @pytest.mark.asyncio
    async def test_supplier_access_permissions(self, async_client: AsyncClient, db_session: AsyncSession, supplier_user: User, supplier_auth_headers: dict):
        """Test supplier user access permissions."""
        
        # Supplier should have access to these endpoints
        supplier_allowed_endpoints = [
            # Basic user endpoints
            ("GET", "/user/profile"),
            ("PUT", "/user/profile"),
            # Product management (their own products)
            ("GET", "/supplier/products"),
            ("POST", "/supplier/products"),
            ("PUT", "/supplier/products/123"),
            # Inventory management (their own inventory)
            ("GET", "/supplier/inventory"),
            ("POST", "/supplier/inventory/adjust"),
            # Orders related to their products
            ("GET", "/supplier/orders"),
            # Analytics for their products
            ("GET", "/supplier/analytics"),
            # Public endpoints
            ("GET", "/products"),
            ("GET", "/products/search"),
        ]
        
        for method, endpoint in supplier_allowed_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint, headers=supplier_auth_headers)
            elif method == "POST":
                response = await async_client.post(endpoint, json={}, headers=supplier_auth_headers)
            elif method == "PUT":
                response = await async_client.put(endpoint, json={}, headers=supplier_auth_headers)
            
            # Should not be forbidden
            assert response.status_code != 403, f"Supplier should have access to {method} {endpoint}"
        
        # Supplier should NOT have access to these endpoints
        supplier_forbidden_endpoints = [
            # Admin-only endpoints
            ("GET", "/admin/users"),
            ("POST", "/admin/users"),
            ("GET", "/admin/analytics"),
            ("GET", "/admin/settings"),
            ("PUT", "/admin/settings"),
            # Customer-specific endpoints
            ("GET", "/cart"),
            ("POST", "/cart/items"),
            ("GET", "/wishlist"),
            ("POST", "/orders"),  # Suppliers don't place orders
            ("GET", "/subscriptions"),
        ]
        
        for method, endpoint in supplier_forbidden_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint, headers=supplier_auth_headers)
            elif method == "POST":
                response = await async_client.post(endpoint, json={}, headers=supplier_auth_headers)
            elif method == "PUT":
                response = await async_client.put(endpoint, json={}, headers=supplier_auth_headers)
            
            # Should be forbidden
            assert response.status_code == 403, f"Supplier should NOT have access to {method} {endpoint}"
    
    @pytest.mark.asyncio
    async def test_unauthenticated_access(self, async_client: AsyncClient):
        """Test unauthenticated user access permissions."""
        
        # Public endpoints that don't require authentication
        public_endpoints = [
            ("GET", "/"),
            ("GET", "/health"),
            ("GET", "/products"),
            ("GET", "/products/search"),
            ("GET", "/products/123"),
            ("GET", "/categories"),
            ("GET", "/brands"),
            ("POST", "/auth/register"),
            ("POST", "/auth/login"),
            ("POST", "/auth/forgot-password"),
            ("POST", "/auth/reset-password"),
            ("POST", "/auth/verify-email"),
        ]
        
        for method, endpoint in public_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint)
            elif method == "POST":
                response = await async_client.post(endpoint, json={})
            
            # Should not require authentication (may be 400/422 for invalid data, but not 401)
            assert response.status_code != 401, f"Public endpoint {method} {endpoint} should not require authentication"
        
        # Protected endpoints that require authentication
        protected_endpoints = [
            ("GET", "/user/profile"),
            ("GET", "/cart"),
            ("GET", "/orders"),
            ("GET", "/admin/users"),
            ("GET", "/supplier/products"),
        ]
        
        for method, endpoint in protected_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint)
            elif method == "POST":
                response = await async_client.post(endpoint, json={})
            
            # Should require authentication
            assert response.status_code == 401, f"Protected endpoint {method} {endpoint} should require authentication"
    
    @pytest.mark.asyncio
    async def test_cross_tenant_data_access(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test that users cannot access other users' data."""
        
        # Create two different users
        user1 = User(
            id=uuid4(),
            email="user1@example.com",
            firstname="User",
            lastname="One",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role=UserRole.CUSTOMER,
            verified=True,
            is_active=True
        )
        
        user2 = User(
            id=uuid4(),
            email="user2@example.com",
            firstname="User",
            lastname="Two",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role=UserRole.CUSTOMER,
            verified=True,
            is_active=True
        )
        
        db_session.add_all([user1, user2])
        await db_session.commit()
        
        # Create auth headers for both users
        from services.auth import AuthService
        auth_service = AuthService(db_session)
        
        user1_token = auth_service.create_access_token(data={"sub": str(user1.id)})
        user2_token = auth_service.create_access_token(data={"sub": str(user2.id)})
        
        user1_headers = {"Authorization": f"Bearer {user1_token}"}
        user2_headers = {"Authorization": f"Bearer {user2_token}"}
        
        # User1 should not be able to access User2's data
        cross_tenant_endpoints = [
            f"/user/{user2.id}/profile",
            f"/user/{user2.id}/orders",
            f"/user/{user2.id}/addresses",
            f"/user/{user2.id}/payment-methods",
        ]
        
        for endpoint in cross_tenant_endpoints:
            response = await async_client.get(endpoint, headers=user1_headers)
            
            # Should be forbidden or not found
            assert response.status_code in [403, 404], f"User1 should not access User2's data at {endpoint}"
    
    @pytest.mark.asyncio
    async def test_supplier_product_isolation(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test that suppliers can only manage their own products."""
        
        # Create two suppliers
        supplier1 = User(
            id=uuid4(),
            email="supplier1@example.com",
            firstname="Supplier",
            lastname="One",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role=UserRole.SUPPLIER,
            verified=True,
            is_active=True
        )
        
        supplier2 = User(
            id=uuid4(),
            email="supplier2@example.com",
            firstname="Supplier",
            lastname="Two",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role=UserRole.SUPPLIER,
            verified=True,
            is_active=True
        )
        
        db_session.add_all([supplier1, supplier2])
        await db_session.commit()
        
        # Create auth headers
        from services.auth import AuthService
        auth_service = AuthService(db_session)
        
        supplier1_token = auth_service.create_access_token(data={"sub": str(supplier1.id)})
        supplier2_token = auth_service.create_access_token(data={"sub": str(supplier2.id)})
        
        supplier1_headers = {"Authorization": f"Bearer {supplier1_token}"}
        supplier2_headers = {"Authorization": f"Bearer {supplier2_token}"}
        
        # Create products for each supplier (this would be done through proper API calls)
        # For this test, we'll simulate trying to access another supplier's products
        
        # Supplier1 should not be able to modify Supplier2's products
        response = await async_client.put(
            "/supplier/products/supplier2-product-123",
            json={"name": "Modified Product"},
            headers=supplier1_headers
        )
        
        # Should be forbidden or not found
        assert response.status_code in [403, 404], "Supplier should not modify other supplier's products"
        
        # Supplier1 should not see Supplier2's products in their product list
        response = await async_client.get("/supplier/products", headers=supplier1_headers)
        
        if response.status_code == 200:
            products = response.json().get("data", [])
            # Should only see their own products (none in this test case)
            supplier2_products = [p for p in products if "supplier2" in p.get("id", "")]
            assert len(supplier2_products) == 0, "Supplier should not see other supplier's products"
    
    @pytest.mark.asyncio
    async def test_admin_can_access_all_data(self, async_client: AsyncClient, db_session: AsyncSession, admin_auth_headers: dict):
        """Test that admin users can access all data across tenants."""
        
        # Admin should be able to access user management endpoints
        admin_endpoints = [
            "/admin/users",
            "/admin/orders",
            "/admin/products",
            "/admin/suppliers",
            "/admin/analytics",
            "/admin/reports",
        ]
        
        for endpoint in admin_endpoints:
            response = await async_client.get(endpoint, headers=admin_auth_headers)
            
            # Should not be forbidden
            assert response.status_code != 403, f"Admin should have access to {endpoint}"
    
    @pytest.mark.asyncio
    async def test_role_elevation_prevention(self, async_client: AsyncClient, db_session: AsyncSession, test_user: User, auth_headers: dict):
        """Test that users cannot elevate their own roles."""
        
        # Customer tries to update their role to admin
        profile_update = {
            "role": "admin",
            "firstname": "Updated Name"
        }
        
        response = await async_client.put("/user/profile", json=profile_update, headers=auth_headers)
        
        # Should either ignore the role field or reject the request
        if response.status_code == 200:
            updated_user = response.json()["data"]
            # Role should not have changed
            assert updated_user["role"] != "admin", "User should not be able to elevate their own role"
        else:
            # Or the request should be rejected
            assert response.status_code in [400, 403, 422], "Role elevation attempt should be rejected"
    
    @pytest.mark.asyncio
    async def test_api_key_based_access(self, async_client: AsyncClient):
        """Test API key-based access for system integrations."""
        
        # Test with valid API key
        api_headers = {"X-API-Key": "valid_api_key_123"}
        
        response = await async_client.get("/api/products", headers=api_headers)
        
        # Should allow access with valid API key
        assert response.status_code != 401, "Valid API key should allow access"
        
        # Test with invalid API key
        invalid_api_headers = {"X-API-Key": "invalid_api_key"}
        
        response = await async_client.get("/api/products", headers=invalid_api_headers)
        
        # Should reject invalid API key
        assert response.status_code == 401, "Invalid API key should be rejected"
    
    @pytest.mark.asyncio
    async def test_rate_limiting_by_role(self, async_client: AsyncClient, db_session: AsyncSession, test_user: User, admin_user: User, auth_headers: dict, admin_auth_headers: dict):
        """Test that rate limiting is applied differently based on user role."""
        
        # Make multiple requests as customer (should be rate limited)
        customer_responses = []
        for i in range(20):
            response = await async_client.get("/products", headers=auth_headers)
            customer_responses.append(response.status_code)
        
        # Should eventually get rate limited
        rate_limited = any(status == 429 for status in customer_responses)
        
        # Make multiple requests as admin (should have higher limits)
        admin_responses = []
        for i in range(20):
            response = await async_client.get("/admin/users", headers=admin_auth_headers)
            admin_responses.append(response.status_code)
        
        # Admin should have higher rate limits
        admin_rate_limited = any(status == 429 for status in admin_responses)
        
        # Customer should be more likely to be rate limited than admin
        if rate_limited:
            # If customer was rate limited, admin should be less likely to be rate limited
            assert not admin_rate_limited or admin_responses.count(429) < customer_responses.count(429)
    
    @pytest.mark.asyncio
    async def test_feature_flags_by_role(self, async_client: AsyncClient, db_session: AsyncSession, test_user: User, admin_user: User, auth_headers: dict, admin_auth_headers: dict):
        """Test that feature flags work correctly for different roles."""
        
        # Test beta feature access
        response = await async_client.get("/beta/new-feature", headers=auth_headers)
        customer_has_access = response.status_code != 403
        
        response = await async_client.get("/beta/new-feature", headers=admin_auth_headers)
        admin_has_access = response.status_code != 403
        
        # Admin should have access to beta features, customers might not
        if not customer_has_access:
            assert admin_has_access, "Admin should have access to beta features"
    
    @pytest.mark.asyncio
    async def test_data_export_permissions(self, async_client: AsyncClient, db_session: AsyncSession, test_user: User, admin_user: User, auth_headers: dict, admin_auth_headers: dict):
        """Test data export permissions by role."""
        
        # Customer should be able to export their own data
        response = await async_client.post("/user/export-data", headers=auth_headers)
        assert response.status_code != 403, "Customer should be able to export their own data"
        
        # Admin should be able to export system data
        response = await async_client.post("/admin/export-data", json={"type": "users"}, headers=admin_auth_headers)
        assert response.status_code != 403, "Admin should be able to export system data"
        
        # Customer should NOT be able to export system data
        response = await async_client.post("/admin/export-data", json={"type": "users"}, headers=auth_headers)
        assert response.status_code == 403, "Customer should not be able to export system data"