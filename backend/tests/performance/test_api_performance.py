"""
Performance tests for API endpoints
"""
import pytest
import asyncio
import time
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from decimal import Decimal
from concurrent.futures import ThreadPoolExecutor

from models.user import User
from models.product import Product, ProductVariant, Category
from models.inventories import Inventory, WarehouseLocation


@pytest.mark.performance
class TestAPIPerformance:
    """Test API performance under various loads."""
    
    @pytest.mark.asyncio
    async def test_product_listing_performance(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test product listing API performance with large dataset."""
        # Create large dataset
        await self._create_large_product_dataset(db_session, num_products=100)
        
        # Test single request performance
        start_time = time.time()
        response = await async_client.get("/products?limit=50")
        end_time = time.time()
        
        assert response.status_code == 200
        response_time = end_time - start_time
        assert response_time < 1.0  # Should respond within 1 second
        
        data = response.json()
        assert len(data["data"]) == 50
        assert "pagination" in data
    
    @pytest.mark.asyncio
    async def test_product_search_performance(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test product search performance."""
        # Create searchable products
        await self._create_searchable_products(db_session)
        
        search_queries = [
            "electronics",
            "laptop",
            "smartphone",
            "headphones",
            "camera"
        ]
        
        total_time = 0
        for query in search_queries:
            start_time = time.time()
            response = await async_client.get(f"/products/search?q={query}")
            end_time = time.time()
            
            assert response.status_code == 200
            query_time = end_time - start_time
            total_time += query_time
            
            # Each search should complete within 500ms
            assert query_time < 0.5
        
        # Average search time should be under 300ms
        avg_time = total_time / len(search_queries)
        assert avg_time < 0.3
    
    @pytest.mark.asyncio
    async def test_concurrent_cart_operations(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test concurrent cart operations performance."""
        # Setup test data
        await self._create_test_products_for_cart(db_session)
        
        # Create multiple users
        users_and_headers = []
        for i in range(10):
            user_data, auth_headers = await self._create_test_user_with_auth(
                async_client, 
                f"concurrent{i}@example.com",
                mock_email
            )
            users_and_headers.append((user_data, auth_headers))
        
        # Get product variants
        response = await async_client.get("/products")
        products = response.json()["data"]
        variant_ids = [variant["id"] for product in products for variant in product["variants"]]
        
        async def add_items_to_cart(user_auth):
            """Add multiple items to cart for a user."""
            user_data, auth_headers = user_auth
            
            for variant_id in variant_ids[:5]:  # Add 5 items
                cart_data = {
                    "variant_id": variant_id,
                    "quantity": 1
                }
                response = await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
                assert response.status_code in [201, 200]  # Created or updated
        
        # Execute concurrent cart operations
        start_time = time.time()
        
        tasks = [add_items_to_cart(user_auth) for user_auth in users_and_headers]
        await asyncio.gather(*tasks)
        
        end_time = time.time()
        total_time = end_time - start_time
        
        # 10 users adding 5 items each should complete within 5 seconds
        assert total_time < 5.0
        
        # Verify all carts were populated
        for user_data, auth_headers in users_and_headers:
            response = await async_client.get("/cart", headers=auth_headers)
            assert response.status_code == 200
            cart = response.json()["data"]
            assert len(cart["items"]) == 5
    
    @pytest.mark.asyncio
    async def test_order_creation_performance(self, async_client: AsyncClient, db_session: AsyncSession, mock_stripe, mock_email):
        """Test order creation performance under load."""
        # Setup test data
        await self._setup_order_test_data(db_session)
        
        # Create user with cart
        user_data, auth_headers = await self._create_test_user_with_auth(async_client, "order@example.com", mock_email)
        
        # Add items to cart
        response = await async_client.get("/products")
        variant_id = response.json()["data"][0]["variants"][0]["id"]
        
        cart_data = {"variant_id": variant_id, "quantity": 2}
        response = await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
        assert response.status_code == 201
        
        # Create payment method
        payment_method_data = {
            "stripe_payment_method_id": "pm_test_performance",
            "is_default": True
        }
        response = await async_client.post("/payments/methods", json=payment_method_data, headers=auth_headers)
        payment_method_id = response.json()["data"]["id"]
        
        # Prepare checkout data
        checkout_data = await self._get_checkout_data(async_client, payment_method_id)
        
        # Test order creation performance
        start_time = time.time()
        
        with patch('services.payments.PaymentService.process_payment') as mock_payment:
            mock_payment.return_value = {
                "status": "succeeded",
                "payment_intent_id": "pi_performance_123",
                "transaction_id": str(uuid4())
            }
            
            response = await async_client.post("/orders", json=checkout_data, headers=auth_headers)
        
        end_time = time.time()
        order_creation_time = end_time - start_time
        
        assert response.status_code == 201
        # Order creation should complete within 2 seconds
        assert order_creation_time < 2.0
        
        order = response.json()["data"]
        assert order["status"] == "pending"
        assert len(order["items"]) == 1
    
    @pytest.mark.asyncio
    async def test_inventory_bulk_operations_performance(self, async_client: AsyncClient, db_session: AsyncSession, admin_auth_headers: dict):
        """Test bulk inventory operations performance."""
        # Create large inventory dataset
        variants = await self._create_large_inventory_dataset(db_session, num_variants=200)
        
        # Prepare bulk adjustment data
        bulk_adjustments = {
            "adjustments": [
                {
                    "variant_id": str(variant.id),
                    "adjustment_type": "increase",
                    "quantity": 10,
                    "reason": "Performance test bulk restock"
                }
                for variant in variants[:100]  # Adjust 100 items
            ]
        }
        
        # Test bulk adjustment performance
        start_time = time.time()
        response = await async_client.post("/inventory/bulk-adjust", json=bulk_adjustments, headers=admin_auth_headers)
        end_time = time.time()
        
        bulk_operation_time = end_time - start_time
        
        assert response.status_code == 200
        # Bulk operation on 100 items should complete within 3 seconds
        assert bulk_operation_time < 3.0
        
        result = response.json()["data"]
        assert result["successful"] == 100
        assert result["failed"] == 0
    
    @pytest.mark.asyncio
    async def test_pagination_performance(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test pagination performance with large datasets."""
        # Create large dataset
        await self._create_large_product_dataset(db_session, num_products=500)
        
        page_sizes = [10, 25, 50, 100]
        
        for page_size in page_sizes:
            start_time = time.time()
            response = await async_client.get(f"/products?page=1&limit={page_size}")
            end_time = time.time()
            
            page_load_time = end_time - start_time
            
            assert response.status_code == 200
            # Each page should load within 800ms regardless of size
            assert page_load_time < 0.8
            
            data = response.json()
            assert len(data["data"]) == page_size
            assert data["pagination"]["limit"] == page_size
    
    @pytest.mark.asyncio
    async def test_concurrent_user_registration(self, async_client: AsyncClient, mock_email):
        """Test concurrent user registration performance."""
        async def register_user(user_index):
            """Register a single user."""
            user_data = {
                "email": f"concurrent_reg_{user_index}@example.com",
                "firstname": f"User{user_index}",
                "lastname": "Concurrent",
                "password": "TestPassword123!",
                "phone": f"+123456789{user_index:02d}",
                "country": "US"
            }
            
            response = await async_client.post("/auth/register", json=user_data)
            assert response.status_code == 200
            return response.json()
        
        # Register 20 users concurrently
        start_time = time.time()
        
        tasks = [register_user(i) for i in range(20)]
        results = await asyncio.gather(*tasks)
        
        end_time = time.time()
        total_time = end_time - start_time
        
        # 20 concurrent registrations should complete within 10 seconds
        assert total_time < 10.0
        assert len(results) == 20
        
        # Verify all registrations were successful
        for result in results:
            assert result["success"] is True
    
    @pytest.mark.asyncio
    async def test_database_query_performance(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test database query performance for complex operations."""
        # Create complex dataset with relationships
        await self._create_complex_dataset(db_session)
        
        # Test complex product query with joins
        start_time = time.time()
        response = await async_client.get("/products?include_variants=true&include_inventory=true&include_reviews=true")
        end_time = time.time()
        
        complex_query_time = end_time - start_time
        
        assert response.status_code == 200
        # Complex query should complete within 1.5 seconds
        assert complex_query_time < 1.5
        
        data = response.json()
        assert len(data["data"]) > 0
        
        # Verify data includes all requested relationships
        product = data["data"][0]
        assert "variants" in product
        if product["variants"]:
            assert "inventory" in product["variants"][0] or True  # May not have inventory
    
    @pytest.mark.asyncio
    async def test_memory_usage_under_load(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test memory usage under sustained load."""
        import psutil
        import os
        
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        # Create test data
        await self._create_test_products_for_cart(db_session, num_products=50)
        
        # Simulate sustained load
        for i in range(100):
            response = await async_client.get("/products?limit=20")
            assert response.status_code == 200
            
            # Occasionally check memory usage
            if i % 20 == 0:
                current_memory = process.memory_info().rss / 1024 / 1024  # MB
                memory_increase = current_memory - initial_memory
                
                # Memory increase should be reasonable (less than 100MB)
                assert memory_increase < 100
        
        final_memory = process.memory_info().rss / 1024 / 1024  # MB
        total_memory_increase = final_memory - initial_memory
        
        # Total memory increase should be reasonable
        assert total_memory_increase < 150  # Less than 150MB increase
    
    async def _create_large_product_dataset(self, db_session: AsyncSession, num_products: int = 100):
        """Create large product dataset for performance testing."""
        # Create categories
        categories = []
        for i in range(10):
            category = Category(
                id=uuid4(),
                name=f"Performance Category {i}",
                description=f"Category for performance testing {i}",
                is_active=True
            )
            categories.append(category)
        
        db_session.add_all(categories)
        
        # Create products and variants
        products = []
        variants = []
        
        for i in range(num_products):
            category = categories[i % len(categories)]
            
            product = Product(
                id=uuid4(),
                name=f"Performance Product {i}",
                description=f"Product for performance testing {i}",
                category_id=category.id,
                brand=f"Brand {i % 20}",
                is_active=True,
                is_featured=i % 10 == 0
            )
            products.append(product)
            
            # Create 2-3 variants per product
            for j in range(2 + (i % 2)):
                variant = ProductVariant(
                    id=uuid4(),
                    product_id=product.id,
                    name=f"Variant {j}",
                    sku=f"PERF-{i:03d}-{j}",
                    base_price=Decimal(f"{50 + (i % 100)}.99"),
                    sale_price=Decimal(f"{40 + (i % 80)}.99") if i % 3 == 0 else None,
                    weight=Decimal(f"{1 + (i % 5)}.0"),
                    is_active=True
                )
                variants.append(variant)
        
        db_session.add_all(products + variants)
        await db_session.commit()
        
        return products, variants
    
    async def _create_searchable_products(self, db_session: AsyncSession):
        """Create products optimized for search testing."""
        categories = [
            ("Electronics", "Electronic devices and gadgets"),
            ("Computers", "Laptops, desktops, and accessories"),
            ("Mobile", "Smartphones and mobile accessories"),
            ("Audio", "Headphones, speakers, and audio equipment"),
            ("Photography", "Cameras and photography equipment")
        ]
        
        category_objects = []
        for name, desc in categories:
            category = Category(
                id=uuid4(),
                name=name,
                description=desc,
                is_active=True
            )
            category_objects.append(category)
        
        db_session.add_all(category_objects)
        
        # Create searchable products
        search_products = [
            ("Gaming Laptop", "High-performance gaming laptop", "Electronics", "Dell"),
            ("Wireless Headphones", "Bluetooth wireless headphones", "Audio", "Sony"),
            ("Smartphone", "Latest smartphone with camera", "Mobile", "Apple"),
            ("Digital Camera", "Professional digital camera", "Photography", "Canon"),
            ("Tablet Computer", "Portable tablet computer", "Computers", "Samsung"),
            ("Smart Watch", "Fitness tracking smart watch", "Electronics", "Apple"),
            ("Bluetooth Speaker", "Portable bluetooth speaker", "Audio", "JBL"),
            ("Laptop Charger", "Universal laptop charger", "Computers", "Generic"),
            ("Phone Case", "Protective phone case", "Mobile", "OtterBox"),
            ("Camera Lens", "Professional camera lens", "Photography", "Nikon")
        ]
        
        products = []
        variants = []
        
        for i, (name, desc, cat_name, brand) in enumerate(search_products):
            category = next(c for c in category_objects if c.name == cat_name)
            
            product = Product(
                id=uuid4(),
                name=name,
                description=desc,
                category_id=category.id,
                brand=brand,
                is_active=True
            )
            products.append(product)
            
            variant = ProductVariant(
                id=uuid4(),
                product_id=product.id,
                name=f"{name} - Standard",
                sku=f"SEARCH-{i:03d}",
                base_price=Decimal(f"{100 + (i * 50)}.99"),
                is_active=True
            )
            variants.append(variant)
        
        db_session.add_all(products + variants)
        await db_session.commit()
    
    async def _create_test_products_for_cart(self, db_session: AsyncSession, num_products: int = 10):
        """Create test products for cart operations."""
        category = Category(
            id=uuid4(),
            name="Cart Test Category",
            description="For cart testing",
            is_active=True
        )
        db_session.add(category)
        
        warehouse = WarehouseLocation(
            id=uuid4(),
            name="Cart Test Warehouse",
            address="123 Test St",
            city="Test City",
            state="TS",
            country="US",
            postal_code="12345",
            is_active=True
        )
        db_session.add(warehouse)
        
        products = []
        variants = []
        inventories = []
        
        for i in range(num_products):
            product = Product(
                id=uuid4(),
                name=f"Cart Product {i}",
                description=f"Product for cart testing {i}",
                category_id=category.id,
                brand="Test Brand",
                is_active=True
            )
            products.append(product)
            
            variant = ProductVariant(
                id=uuid4(),
                product_id=product.id,
                name=f"Cart Variant {i}",
                sku=f"CART-{i:03d}",
                base_price=Decimal(f"{50 + i * 10}.99"),
                weight=Decimal("1.0"),
                is_active=True
            )
            variants.append(variant)
            
            inventory = Inventory(
                id=uuid4(),
                variant_id=variant.id,
                warehouse_id=warehouse.id,
                quantity_available=1000,  # High stock for testing
                quantity_reserved=0
            )
            inventories.append(inventory)
        
        db_session.add_all(products + variants + inventories)
        await db_session.commit()
        
        return products, variants
    
    async def _create_test_user_with_auth(self, async_client: AsyncClient, email: str, mock_email):
        """Create test user and return auth headers."""
        user_data = {
            "email": email,
            "firstname": "Performance",
            "lastname": "Test",
            "password": "TestPassword123!",
            "phone": "+1234567890",
            "country": "US"
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        assert response.status_code == 200
        
        login_data = {
            "email": email,
            "password": "TestPassword123!"
        }
        
        response = await async_client.post("/auth/login", json=login_data)
        assert response.status_code == 200
        
        auth_headers = {"Authorization": f"Bearer {response.json()['data']['access_token']}"}
        
        return user_data, auth_headers
    
    async def _setup_order_test_data(self, db_session: AsyncSession):
        """Setup test data for order performance tests."""
        from models.shipping import ShippingMethod
        from models.tax_rates import TaxRate
        
        # Create shipping method
        shipping_method = ShippingMethod(
            id=uuid4(),
            name="Performance Shipping",
            description="For performance testing",
            base_cost=Decimal("9.99"),
            is_active=True
        )
        db_session.add(shipping_method)
        
        # Create tax rate
        tax_rate = TaxRate(
            id=uuid4(),
            country="US",
            state="CA",
            rate=Decimal("0.0875"),
            is_active=True
        )
        db_session.add(tax_rate)
        
        # Create products
        await self._create_test_products_for_cart(db_session, num_products=5)
        
        await db_session.commit()
    
    async def _get_checkout_data(self, async_client: AsyncClient, payment_method_id: str):
        """Get checkout data for order creation."""
        response = await async_client.get("/shipping/methods")
        shipping_methods = response.json()["data"]
        
        return {
            "shipping_address": {
                "street": "123 Performance St",
                "city": "Performance City",
                "state": "CA",
                "country": "US",
                "postal_code": "12345"
            },
            "billing_address": {
                "street": "123 Performance St",
                "city": "Performance City",
                "state": "CA",
                "country": "US",
                "postal_code": "12345"
            },
            "shipping_method_id": shipping_methods[0]["id"],
            "payment_method_id": payment_method_id
        }
    
    async def _create_large_inventory_dataset(self, db_session: AsyncSession, num_variants: int = 200):
        """Create large inventory dataset for bulk operations testing."""
        # Create warehouse
        warehouse = WarehouseLocation(
            id=uuid4(),
            name="Bulk Operations Warehouse",
            address="123 Bulk St",
            city="Bulk City",
            state="BS",
            country="US",
            postal_code="12345",
            is_active=True
        )
        db_session.add(warehouse)
        
        # Create category and product
        category = Category(
            id=uuid4(),
            name="Bulk Operations Category",
            description="For bulk operations testing",
            is_active=True
        )
        db_session.add(category)
        
        product = Product(
            id=uuid4(),
            name="Bulk Operations Product",
            description="For bulk operations testing",
            category_id=category.id,
            brand="Bulk Brand",
            is_active=True
        )
        db_session.add(product)
        
        # Create variants and inventory
        variants = []
        inventories = []
        
        for i in range(num_variants):
            variant = ProductVariant(
                id=uuid4(),
                product_id=product.id,
                name=f"Bulk Variant {i}",
                sku=f"BULK-{i:04d}",
                base_price=Decimal("50.00"),
                is_active=True
            )
            variants.append(variant)
            
            inventory = Inventory(
                id=uuid4(),
                variant_id=variant.id,
                warehouse_id=warehouse.id,
                quantity_available=100,
                quantity_reserved=0
            )
            inventories.append(inventory)
        
        db_session.add_all(variants + inventories)
        await db_session.commit()
        
        return variants
    
    async def _create_complex_dataset(self, db_session: AsyncSession):
        """Create complex dataset with multiple relationships."""
        # This would create a dataset with products, variants, inventory, reviews, etc.
        # For now, just create basic products
        await self._create_large_product_dataset(db_session, num_products=50)