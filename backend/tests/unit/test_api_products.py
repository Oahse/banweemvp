"""
Tests for products API endpoints
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from decimal import Decimal

from models.product import Product, ProductVariant, Category
from models.user import User


class TestProductsAPI:
    """Test products API endpoints."""
    
    @pytest.mark.asyncio
    async def test_get_products_success(self, async_client: AsyncClient, test_product: Product, test_variant: ProductVariant):
        """Test getting products list."""
        response = await async_client.get("/products")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert len(data["data"]) >= 1
        
        product_data = data["data"][0]
        assert product_data["id"] == str(test_product.id)
        assert product_data["name"] == test_product.name
        assert len(product_data["variants"]) >= 1
    
    @pytest.mark.asyncio
    async def test_get_products_with_filters(self, async_client: AsyncClient, test_product: Product, test_category: Category):
        """Test getting products with filters."""
        response = await async_client.get(f"/products?category_id={test_category.id}&min_price=50&max_price=150")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        
        if data["data"]:
            product_data = data["data"][0]
            assert product_data["category_id"] == str(test_category.id)
    
    @pytest.mark.asyncio
    async def test_get_products_with_search(self, async_client: AsyncClient, test_product: Product):
        """Test getting products with search query."""
        response = await async_client.get(f"/products?search={test_product.name}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        
        if data["data"]:
            product_data = data["data"][0]
            assert test_product.name.lower() in product_data["name"].lower()
    
    @pytest.mark.asyncio
    async def test_get_products_pagination(self, async_client: AsyncClient, test_product: Product):
        """Test products pagination."""
        response = await async_client.get("/products?page=1&limit=10")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "pagination" in data
        assert data["pagination"]["page"] == 1
        assert data["pagination"]["limit"] == 10
    
    @pytest.mark.asyncio
    async def test_get_product_by_id_success(self, async_client: AsyncClient, test_product: Product, test_variant: ProductVariant):
        """Test getting product by ID."""
        response = await async_client.get(f"/products/{test_product.id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["id"] == str(test_product.id)
        assert data["data"]["name"] == test_product.name
        assert len(data["data"]["variants"]) >= 1
    
    @pytest.mark.asyncio
    async def test_get_product_by_id_not_found(self, async_client: AsyncClient):
        """Test getting nonexistent product."""
        fake_id = uuid4()
        response = await async_client.get(f"/products/{fake_id}")
        
        assert response.status_code == 404
        data = response.json()
        assert data["success"] is False
        assert "not found" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_get_product_variants(self, async_client: AsyncClient, test_product: Product, test_variant: ProductVariant):
        """Test getting product variants."""
        response = await async_client.get(f"/products/{test_product.id}/variants")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert len(data["data"]) >= 1
        
        variant_data = data["data"][0]
        assert variant_data["id"] == str(test_variant.id)
        assert variant_data["name"] == test_variant.name
        assert variant_data["sku"] == test_variant.sku
    
    @pytest.mark.asyncio
    async def test_get_variant_by_id(self, async_client: AsyncClient, test_variant: ProductVariant):
        """Test getting variant by ID."""
        response = await async_client.get(f"/products/variants/{test_variant.id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["id"] == str(test_variant.id)
        assert data["data"]["name"] == test_variant.name
        assert data["data"]["base_price"] == str(test_variant.base_price)
    
    @pytest.mark.asyncio
    async def test_get_variant_qrcode(self, async_client: AsyncClient, test_variant: ProductVariant):
        """Test getting variant QR code."""
        response = await async_client.get(f"/products/variants/{test_variant.id}/qrcode")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "qr_code" in data["data"]
    
    @pytest.mark.asyncio
    async def test_get_variant_barcode(self, async_client: AsyncClient, test_variant: ProductVariant):
        """Test getting variant barcode."""
        response = await async_client.get(f"/products/variants/{test_variant.id}/barcode")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "barcode" in data["data"]
    
    @pytest.mark.asyncio
    async def test_get_product_recommendations(self, async_client: AsyncClient, test_product: Product):
        """Test getting product recommendations."""
        response = await async_client.get(f"/products/{test_product.id}/recommendations")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert isinstance(data["data"], list)
    
    @pytest.mark.asyncio
    async def test_search_products(self, async_client: AsyncClient, test_product: Product):
        """Test product search endpoint."""
        response = await async_client.get(f"/products/search?q={test_product.name}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert isinstance(data["data"], list)
    
    @pytest.mark.asyncio
    async def test_get_categories(self, async_client: AsyncClient, test_category: Category):
        """Test getting categories."""
        response = await async_client.get("/products/categories")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert len(data["data"]) >= 1
        
        category_data = data["data"][0]
        assert category_data["id"] == str(test_category.id)
        assert category_data["name"] == test_category.name


class TestProductsSupplierAPI:
    """Test supplier-only product endpoints."""
    
    @pytest.mark.asyncio
    async def test_create_product_success(self, async_client: AsyncClient, supplier_auth_headers: dict, test_category: Category):
        """Test creating product as supplier."""
        product_data = {
            "name": "New Product",
            "description": "A new product",
            "category_id": str(test_category.id),
            "brand": "Test Brand",
            "is_active": True,
            "is_featured": False
        }
        
        response = await async_client.post("/products", json=product_data, headers=supplier_auth_headers)
        
        assert response.status_code == 201
        data = response.json()
        assert data["success"] is True
        assert data["data"]["name"] == product_data["name"]
        assert data["data"]["brand"] == product_data["brand"]
    
    @pytest.mark.asyncio
    async def test_create_product_unauthorized(self, async_client: AsyncClient, auth_headers: dict, test_category: Category):
        """Test creating product as customer (should fail)."""
        product_data = {
            "name": "New Product",
            "description": "A new product",
            "category_id": str(test_category.id),
            "brand": "Test Brand",
            "is_active": True,
            "is_featured": False
        }
        
        response = await async_client.post("/products", json=product_data, headers=auth_headers)
        
        assert response.status_code == 403
        data = response.json()
        assert data["success"] is False
        assert "permission" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_update_product_success(self, async_client: AsyncClient, supplier_auth_headers: dict, test_product: Product):
        """Test updating product as supplier."""
        update_data = {
            "name": "Updated Product Name",
            "description": "Updated description",
            "is_featured": True
        }
        
        response = await async_client.put(f"/products/{test_product.id}", json=update_data, headers=supplier_auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["name"] == update_data["name"]
        assert data["data"]["description"] == update_data["description"]
        assert data["data"]["is_featured"] is True
    
    @pytest.mark.asyncio
    async def test_delete_product_success(self, async_client: AsyncClient, supplier_auth_headers: dict, db_session: AsyncSession, test_category: Category):
        """Test deleting product as supplier."""
        # Create a product to delete
        product = Product(
            id=uuid4(),
            name="Product to Delete",
            description="Will be deleted",
            category_id=test_category.id,
            brand="Test Brand",
            is_active=True
        )
        db_session.add(product)
        await db_session.commit()
        
        response = await async_client.delete(f"/products/{product.id}", headers=supplier_auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Product deleted successfully"
    
    @pytest.mark.asyncio
    async def test_create_variant_success(self, async_client: AsyncClient, supplier_auth_headers: dict, test_product: Product):
        """Test creating product variant."""
        variant_data = {
            "name": "New Variant",
            "sku": "NEW-001",
            "base_price": "149.99",
            "sale_price": "129.99",
            "weight": "2.0",
            "is_active": True
        }
        
        response = await async_client.post(f"/products/{test_product.id}/variants", json=variant_data, headers=supplier_auth_headers)
        
        assert response.status_code == 201
        data = response.json()
        assert data["success"] is True
        assert data["data"]["name"] == variant_data["name"]
        assert data["data"]["sku"] == variant_data["sku"]
        assert data["data"]["base_price"] == variant_data["base_price"]
    
    @pytest.mark.asyncio
    async def test_update_variant_success(self, async_client: AsyncClient, supplier_auth_headers: dict, test_variant: ProductVariant):
        """Test updating product variant."""
        update_data = {
            "name": "Updated Variant",
            "base_price": "199.99",
            "sale_price": "179.99"
        }
        
        response = await async_client.put(f"/products/variants/{test_variant.id}", json=update_data, headers=supplier_auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["name"] == update_data["name"]
        assert data["data"]["base_price"] == update_data["base_price"]


class TestProductsValidation:
    """Test product validation and edge cases."""
    
    @pytest.mark.asyncio
    async def test_create_product_invalid_category(self, async_client: AsyncClient, supplier_auth_headers: dict):
        """Test creating product with invalid category."""
        product_data = {
            "name": "New Product",
            "description": "A new product",
            "category_id": str(uuid4()),  # Non-existent category
            "brand": "Test Brand",
            "is_active": True
        }
        
        response = await async_client.post("/products", json=product_data, headers=supplier_auth_headers)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "category" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_create_variant_duplicate_sku(self, async_client: AsyncClient, supplier_auth_headers: dict, test_product: Product, test_variant: ProductVariant):
        """Test creating variant with duplicate SKU."""
        variant_data = {
            "name": "Duplicate SKU Variant",
            "sku": test_variant.sku,  # Duplicate SKU
            "base_price": "99.99",
            "weight": "1.0",
            "is_active": True
        }
        
        response = await async_client.post(f"/products/{test_product.id}/variants", json=variant_data, headers=supplier_auth_headers)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "sku" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_get_products_invalid_filters(self, async_client: AsyncClient):
        """Test getting products with invalid filters."""
        response = await async_client.get("/products?min_price=invalid&max_price=also_invalid")
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_get_products_negative_pagination(self, async_client: AsyncClient):
        """Test getting products with negative pagination values."""
        response = await async_client.get("/products?page=-1&limit=-10")
        
        assert response.status_code == 422


class TestProductsPerformance:
    """Test product API performance and optimization."""
    
    @pytest.mark.asyncio
    async def test_get_products_large_limit(self, async_client: AsyncClient):
        """Test getting products with large limit (should be capped)."""
        response = await async_client.get("/products?limit=1000")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        # Should be capped to maximum allowed limit
        assert data["pagination"]["limit"] <= 100
    
    @pytest.mark.asyncio
    async def test_search_empty_query(self, async_client: AsyncClient):
        """Test search with empty query."""
        response = await async_client.get("/products/search?q=")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert isinstance(data["data"], list)
    
    @pytest.mark.asyncio
    async def test_search_special_characters(self, async_client: AsyncClient):
        """Test search with special characters."""
        response = await async_client.get("/products/search?q=test%20%26%20product")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert isinstance(data["data"], list)