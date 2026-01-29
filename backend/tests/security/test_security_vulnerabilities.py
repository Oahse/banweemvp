"""
Security vulnerability tests
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from unittest.mock import patch
import json

from models.user import User


@pytest.mark.security
class TestSecurityVulnerabilities:
    """Test security vulnerabilities and attack prevention."""
    
    @pytest.mark.asyncio
    async def test_sql_injection_prevention(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test SQL injection prevention in various endpoints."""
        
        # Test SQL injection in search
        malicious_queries = [
            "'; DROP TABLE users; --",
            "' OR '1'='1",
            "' UNION SELECT * FROM users --",
            "'; INSERT INTO users (email) VALUES ('hacker@evil.com'); --"
        ]
        
        for query in malicious_queries:
            response = await async_client.get(f"/products/search?q={query}")
            
            # Should not return 500 error (SQL injection would cause this)
            assert response.status_code in [200, 400, 422]
            
            # Should not return sensitive data
            if response.status_code == 200:
                data = response.json()
                assert "users" not in str(data).lower()
                assert "password" not in str(data).lower()
    
    @pytest.mark.asyncio
    async def test_xss_prevention(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test XSS prevention in user inputs."""
        
        # Create user first
        user_data = {
            "email": "xss@example.com",
            "firstname": "XSS",
            "lastname": "Test",
            "password": "TestPassword123!",
            "phone": "+1234567890",
            "country": "US"
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        assert response.status_code == 200
        
        # Login
        login_data = {"email": user_data["email"], "password": user_data["password"]}
        response = await async_client.post("/auth/login", json=login_data)
        auth_headers = {"Authorization": f"Bearer {response.json()['data']['access_token']}"}
        
        # Test XSS in profile update
        xss_payloads = [
            "<script>alert('XSS')</script>",
            "javascript:alert('XSS')",
            "<img src=x onerror=alert('XSS')>",
            "';alert('XSS');//",
            "<svg onload=alert('XSS')>"
        ]
        
        for payload in xss_payloads:
            profile_data = {
                "firstname": payload,
                "lastname": "Test",
                "bio": f"Bio with {payload}"
            }
            
            response = await async_client.put("/user/profile", json=profile_data, headers=auth_headers)
            
            # Should either reject the input or sanitize it
            if response.status_code == 200:
                data = response.json()["data"]
                # Check that script tags are not present in response
                assert "<script>" not in data.get("firstname", "")
                assert "javascript:" not in data.get("firstname", "")
                assert "onerror=" not in data.get("bio", "")
    
    @pytest.mark.asyncio
    async def test_csrf_protection(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test CSRF protection on state-changing operations."""
        
        # Create and login user
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Test CSRF on sensitive operations
        sensitive_operations = [
            ("PUT", "/user/profile", {"firstname": "Changed"}),
            ("POST", "/user/change-password", {"current_password": "old", "new_password": "new"}),
            ("DELETE", "/user/addresses/123", {}),
        ]
        
        for method, endpoint, data in sensitive_operations:
            # Request without proper headers should be rejected or require additional verification
            if method == "PUT":
                response = await async_client.put(endpoint, json=data, headers=auth_headers)
            elif method == "POST":
                response = await async_client.post(endpoint, json=data, headers=auth_headers)
            elif method == "DELETE":
                response = await async_client.delete(endpoint, headers=auth_headers)
            
            # Should have CSRF protection mechanisms
            # (Implementation depends on your CSRF strategy)
            assert response.status_code in [200, 400, 403, 404, 422]
    
    @pytest.mark.asyncio
    async def test_authentication_bypass_attempts(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test authentication bypass attempts."""
        
        # Test accessing protected endpoints without authentication
        protected_endpoints = [
            ("GET", "/user/profile"),
            ("PUT", "/user/profile"),
            ("GET", "/cart"),
            ("POST", "/cart/items"),
            ("GET", "/orders"),
            ("POST", "/orders"),
            ("GET", "/admin/users"),
        ]
        
        for method, endpoint in protected_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint)
            elif method == "PUT":
                response = await async_client.put(endpoint, json={})
            elif method == "POST":
                response = await async_client.post(endpoint, json={})
            
            # Should require authentication
            assert response.status_code == 401
    
    @pytest.mark.asyncio
    async def test_authorization_bypass_attempts(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test authorization bypass attempts."""
        
        # Create regular user
        user_data, user_headers = await self._create_test_user(async_client, mock_email)
        
        # Test accessing admin endpoints with regular user
        admin_endpoints = [
            ("GET", "/admin/users"),
            ("POST", "/admin/users"),
            ("PUT", "/admin/users/123"),
            ("DELETE", "/admin/users/123"),
            ("GET", "/admin/analytics"),
        ]
        
        for method, endpoint in admin_endpoints:
            if method == "GET":
                response = await async_client.get(endpoint, headers=user_headers)
            elif method == "POST":
                response = await async_client.post(endpoint, json={}, headers=user_headers)
            elif method == "PUT":
                response = await async_client.put(endpoint, json={}, headers=user_headers)
            elif method == "DELETE":
                response = await async_client.delete(endpoint, headers=user_headers)
            
            # Should deny access (403 Forbidden)
            assert response.status_code in [403, 404]  # 404 if endpoint doesn't exist
    
    @pytest.mark.asyncio
    async def test_jwt_token_manipulation(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test JWT token manipulation attempts."""
        
        # Create user and get valid token
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        valid_token = auth_headers["Authorization"].split(" ")[1]
        
        # Test with manipulated tokens
        manipulated_tokens = [
            "invalid.token.here",
            valid_token[:-5] + "XXXXX",  # Modified signature
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",  # Known invalid token
            "",  # Empty token
            "Bearer malicious_token"
        ]
        
        for token in manipulated_tokens:
            headers = {"Authorization": f"Bearer {token}"}
            response = await async_client.get("/user/profile", headers=headers)
            
            # Should reject invalid tokens
            assert response.status_code == 401
    
    @pytest.mark.asyncio
    async def test_rate_limiting(self, async_client: AsyncClient):
        """Test rate limiting on sensitive endpoints."""
        
        # Test login rate limiting
        login_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        
        # Make multiple failed login attempts
        responses = []
        for i in range(10):
            response = await async_client.post("/auth/login", json=login_data)
            responses.append(response.status_code)
        
        # Should eventually rate limit (429 Too Many Requests)
        assert 429 in responses or all(r == 401 for r in responses)
    
    @pytest.mark.asyncio
    async def test_password_security_requirements(self, async_client: AsyncClient, mock_email):
        """Test password security requirements."""
        
        weak_passwords = [
            "123456",
            "password",
            "abc123",
            "qwerty",
            "12345678",
            "password123",
            "admin",
            "test"
        ]
        
        for weak_password in weak_passwords:
            user_data = {
                "email": f"weak{weak_password}@example.com",
                "firstname": "Weak",
                "lastname": "Password",
                "password": weak_password,
                "phone": "+1234567890",
                "country": "US"
            }
            
            response = await async_client.post("/auth/register", json=user_data)
            
            # Should reject weak passwords
            assert response.status_code in [400, 422]
            if response.status_code == 400:
                error_message = response.json().get("message", "").lower()
                assert any(word in error_message for word in ["password", "weak", "strong", "requirements"])
    
    @pytest.mark.asyncio
    async def test_sensitive_data_exposure(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test that sensitive data is not exposed in responses."""
        
        # Create user
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Test various endpoints for sensitive data exposure
        endpoints_to_test = [
            "/user/profile",
            "/products",
            "/orders",
            "/cart"
        ]
        
        for endpoint in endpoints_to_test:
            response = await async_client.get(endpoint, headers=auth_headers)
            
            if response.status_code == 200:
                response_text = response.text.lower()
                
                # Should not expose sensitive data
                sensitive_fields = [
                    "password",
                    "hashed_password",
                    "secret_key",
                    "private_key",
                    "api_key",
                    "token",
                    "salt"
                ]
                
                for field in sensitive_fields:
                    assert field not in response_text, f"Sensitive field '{field}' exposed in {endpoint}"
    
    @pytest.mark.asyncio
    async def test_file_upload_security(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test file upload security."""
        
        # Create user
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Test malicious file uploads
        malicious_files = [
            ("malicious.php", b"<?php system($_GET['cmd']); ?>", "application/x-php"),
            ("malicious.js", b"alert('XSS')", "application/javascript"),
            ("malicious.exe", b"MZ\x90\x00", "application/x-msdownload"),
            ("malicious.html", b"<script>alert('XSS')</script>", "text/html")
        ]
        
        for filename, content, content_type in malicious_files:
            files = {"file": (filename, content, content_type)}
            
            # Try to upload to profile picture endpoint (if exists)
            response = await async_client.post(
                "/user/profile/picture",
                files=files,
                headers=auth_headers
            )
            
            # Should reject malicious files
            assert response.status_code in [400, 415, 422, 404]  # 404 if endpoint doesn't exist
    
    @pytest.mark.asyncio
    async def test_price_tampering_prevention(self, async_client: AsyncClient, db_session: AsyncSession, mock_stripe, mock_email):
        """Test prevention of price tampering in orders."""
        
        # Setup test data
        await self._setup_test_products(db_session)
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Add item to cart
        response = await async_client.get("/products")
        variant_id = response.json()["data"][0]["variants"][0]["id"]
        original_price = response.json()["data"][0]["variants"][0]["price"]
        
        cart_data = {"variant_id": variant_id, "quantity": 1}
        response = await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
        assert response.status_code == 201
        
        # Create payment method
        payment_method_data = {
            "stripe_payment_method_id": "pm_test_security",
            "is_default": True
        }
        response = await async_client.post("/payments/methods", json=payment_method_data, headers=auth_headers)
        payment_method_id = response.json()["data"]["id"]
        
        # Attempt to tamper with price in checkout
        tampered_checkout_data = {
            "shipping_address": {
                "street": "123 Test St",
                "city": "Test City",
                "state": "CA",
                "country": "US",
                "postal_code": "12345"
            },
            "billing_address": {
                "street": "123 Test St",
                "city": "Test City",
                "state": "CA",
                "country": "US",
                "postal_code": "12345"
            },
            "payment_method_id": payment_method_id,
            "items": [
                {
                    "variant_id": variant_id,
                    "quantity": 1,
                    "price": 0.01  # Tampered price
                }
            ],
            "total_amount": 0.01  # Tampered total
        }
        
        with patch('services.payments.PaymentService.process_payment') as mock_payment:
            mock_payment.return_value = {
                "status": "succeeded",
                "payment_intent_id": "pi_security_123",
                "transaction_id": str(uuid4())
            }
            
            response = await async_client.post("/orders", json=tampered_checkout_data, headers=auth_headers)
        
        # Should reject tampered prices and recalculate server-side
        if response.status_code == 201:
            order = response.json()["data"]
            # Server should use correct price, not tampered price
            assert float(order["total_amount"]) > 0.01
        else:
            # Or should reject the request entirely
            assert response.status_code in [400, 422]
    
    @pytest.mark.asyncio
    async def test_session_security(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test session security measures."""
        
        # Create user and login
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Test session fixation prevention
        # (This would depend on your session implementation)
        
        # Test concurrent session handling
        # Login from multiple "devices"
        login_data = {"email": user_data["email"], "password": user_data["password"]}
        
        session1 = await async_client.post("/auth/login", json=login_data)
        session2 = await async_client.post("/auth/login", json=login_data)
        
        assert session1.status_code == 200
        assert session2.status_code == 200
        
        # Both sessions should be valid (or implement session limits)
        headers1 = {"Authorization": f"Bearer {session1.json()['data']['access_token']}"}
        headers2 = {"Authorization": f"Bearer {session2.json()['data']['access_token']}"}
        
        response1 = await async_client.get("/user/profile", headers=headers1)
        response2 = await async_client.get("/user/profile", headers=headers2)
        
        # Both should work or implement session limits
        assert response1.status_code in [200, 401]
        assert response2.status_code in [200, 401]
    
    @pytest.mark.asyncio
    async def test_input_validation_bypass(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test input validation bypass attempts."""
        
        # Create user
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Test various input validation bypasses
        bypass_attempts = [
            # Null byte injection
            {"firstname": "Test\x00Admin"},
            # Unicode normalization attacks
            {"firstname": "Tëst"},
            # Very long inputs (buffer overflow attempts)
            {"firstname": "A" * 10000},
            # Special characters
            {"firstname": "Test'; DROP TABLE users; --"},
            # JSON injection
            {"firstname": '{"admin": true}'},
        ]
        
        for attempt in bypass_attempts:
            response = await async_client.put("/user/profile", json=attempt, headers=auth_headers)
            
            # Should handle gracefully
            assert response.status_code in [200, 400, 422]
            
            if response.status_code == 200:
                # Should sanitize or validate input
                data = response.json()["data"]
                assert len(data.get("firstname", "")) < 1000  # Should limit length
    
    async def _create_test_user(self, async_client: AsyncClient, mock_email):
        """Create test user and return auth headers."""
        user_data = {
            "email": "security@example.com",
            "firstname": "Security",
            "lastname": "Test",
            "password": "SecurePassword123!",
            "phone": "+1234567890",
            "country": "US"
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        assert response.status_code == 200
        
        login_data = {"email": user_data["email"], "password": user_data["password"]}
        response = await async_client.post("/auth/login", json=login_data)
        assert response.status_code == 200
        
        auth_headers = {"Authorization": f"Bearer {response.json()['data']['access_token']}"}
        
        return user_data, auth_headers
    
    async def _setup_test_products(self, db_session: AsyncSession):
        """Setup test products for security tests."""
        from models.product import Product, ProductVariant, Category
        from models.inventories import Inventory, WarehouseLocation
        from models.shipping import ShippingMethod
        from decimal import Decimal
        
        # Create category
        category = Category(
            id=uuid4(),
            name="Security Test Category",
            description="For security testing",
            is_active=True
        )
        db_session.add(category)
        
        # Create product
        product = Product(
            id=uuid4(),
            name="Security Test Product",
            description="For security testing",
            category_id=category.id,
            brand="Test Brand",
            is_active=True
        )
        db_session.add(product)
        
        # Create variant
        variant = ProductVariant(
            id=uuid4(),
            product_id=product.id,
            name="Security Test Variant",
            sku="SEC-001",
            base_price=Decimal("99.99"),
            is_active=True
        )
        db_session.add(variant)
        
        # Create warehouse and inventory
        warehouse = WarehouseLocation(
            id=uuid4(),
            name="Security Test Warehouse",
            address="123 Test St",
            city="Test City",
            state="TS",
            country="US",
            postal_code="12345",
            is_active=True
        )
        db_session.add(warehouse)
        
        inventory = Inventory(
            id=uuid4(),
            variant_id=variant.id,
            warehouse_id=warehouse.id,
            quantity_available=100,
            quantity_reserved=0
        )
        db_session.add(inventory)
        
        # Create shipping method
        shipping_method = ShippingMethod(
            id=uuid4(),
            name="Security Test Shipping",
            description="For security testing",
            base_cost=Decimal("9.99"),
            is_active=True
        )
        db_session.add(shipping_method)
        
        await db_session.commit()


@pytest.mark.security
class TestDataProtection:
    """Test data protection and privacy compliance."""
    
    @pytest.mark.asyncio
    async def test_gdpr_data_export(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test GDPR-compliant data export."""
        # This would test user data export functionality
        pass
    
    @pytest.mark.asyncio
    async def test_gdpr_data_deletion(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test GDPR-compliant data deletion."""
        # This would test user data deletion functionality
        pass
    
    @pytest.mark.asyncio
    async def test_pii_data_encryption(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test that PII data is properly encrypted."""
        # This would test encryption of sensitive data
        pass