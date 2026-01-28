"""
Tests for cart API endpoints
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4

from models.cart import Cart, CartItem
from models.product import ProductVariant
from models.user import User


class TestCartAPI:
    """Test cart API endpoints."""
    
    @pytest.mark.asyncio
    async def test_get_cart_success(self, async_client: AsyncClient, auth_headers: dict, test_cart: Cart, test_cart_item: CartItem):
        """Test getting user's cart."""
        response = await async_client.get("/cart", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["id"] == str(test_cart.id)
        assert len(data["data"]["items"]) >= 1
        
        item_data = data["data"]["items"][0]
        assert item_data["id"] == str(test_cart_item.id)
        assert item_data["quantity"] == test_cart_item.quantity
    
    @pytest.mark.asyncio
    async def test_get_cart_empty(self, async_client: AsyncClient, auth_headers: dict):
        """Test getting empty cart."""
        response = await async_client.get("/cart", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        # Should create empty cart if none exists
        assert "id" in data["data"]
        assert data["data"]["items"] == []
    
    @pytest.mark.asyncio
    async def test_get_cart_unauthorized(self, async_client: AsyncClient):
        """Test getting cart without authentication."""
        response = await async_client.get("/cart")
        
        assert response.status_code == 401
    
    @pytest.mark.asyncio
    async def test_add_item_to_cart_success(self, async_client: AsyncClient, auth_headers: dict, test_variant: ProductVariant, test_inventory):
        """Test adding item to cart."""
        item_data = {
            "variant_id": str(test_variant.id),
            "quantity": 3
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 201
        data = response.json()
        assert data["success"] is True
        assert data["data"]["variant_id"] == str(test_variant.id)
        assert data["data"]["quantity"] == 3
    
    @pytest.mark.asyncio
    async def test_add_item_to_cart_existing_variant(self, async_client: AsyncClient, auth_headers: dict, test_cart_item: CartItem):
        """Test adding existing variant to cart (should update quantity)."""
        item_data = {
            "variant_id": str(test_cart_item.variant_id),
            "quantity": 2
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        # Should add to existing quantity
        assert data["data"]["quantity"] == test_cart_item.quantity + 2
    
    @pytest.mark.asyncio
    async def test_add_item_invalid_variant(self, async_client: AsyncClient, auth_headers: dict):
        """Test adding item with invalid variant ID."""
        item_data = {
            "variant_id": str(uuid4()),
            "quantity": 1
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 404
        data = response.json()
        assert data["success"] is False
        assert "variant not found" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_add_item_insufficient_stock(self, async_client: AsyncClient, auth_headers: dict, test_variant: ProductVariant, test_inventory):
        """Test adding item with quantity exceeding stock."""
        item_data = {
            "variant_id": str(test_variant.id),
            "quantity": test_inventory.quantity_available + 10  # More than available
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "insufficient stock" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_add_item_zero_quantity(self, async_client: AsyncClient, auth_headers: dict, test_variant: ProductVariant):
        """Test adding item with zero quantity."""
        item_data = {
            "variant_id": str(test_variant.id),
            "quantity": 0
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_update_cart_item_success(self, async_client: AsyncClient, auth_headers: dict, test_cart_item: CartItem, test_inventory):
        """Test updating cart item quantity."""
        update_data = {
            "quantity": 5
        }
        
        response = await async_client.put(f"/cart/items/{test_cart_item.id}", json=update_data, headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["quantity"] == 5
    
    @pytest.mark.asyncio
    async def test_update_cart_item_not_found(self, async_client: AsyncClient, auth_headers: dict):
        """Test updating nonexistent cart item."""
        update_data = {
            "quantity": 5
        }
        
        response = await async_client.put(f"/cart/items/{uuid4()}", json=update_data, headers=auth_headers)
        
        assert response.status_code == 404
        data = response.json()
        assert data["success"] is False
        assert "not found" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_update_cart_item_insufficient_stock(self, async_client: AsyncClient, auth_headers: dict, test_cart_item: CartItem, test_inventory):
        """Test updating cart item with insufficient stock."""
        update_data = {
            "quantity": test_inventory.quantity_available + 10
        }
        
        response = await async_client.put(f"/cart/items/{test_cart_item.id}", json=update_data, headers=auth_headers)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "insufficient stock" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_remove_cart_item_success(self, async_client: AsyncClient, auth_headers: dict, test_cart_item: CartItem):
        """Test removing cart item."""
        response = await async_client.delete(f"/cart/items/{test_cart_item.id}", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Item removed from cart"
    
    @pytest.mark.asyncio
    async def test_remove_cart_item_not_found(self, async_client: AsyncClient, auth_headers: dict):
        """Test removing nonexistent cart item."""
        response = await async_client.delete(f"/cart/items/{uuid4()}", headers=auth_headers)
        
        assert response.status_code == 404
        data = response.json()
        assert data["success"] is False
        assert "not found" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_clear_cart_success(self, async_client: AsyncClient, auth_headers: dict, test_cart: Cart, test_cart_item: CartItem):
        """Test clearing cart."""
        response = await async_client.post("/cart/clear", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Cart cleared successfully"
    
    @pytest.mark.asyncio
    async def test_validate_cart_success(self, async_client: AsyncClient, auth_headers: dict, test_cart: Cart, test_cart_item: CartItem, test_inventory):
        """Test cart validation."""
        response = await async_client.post("/cart/validate", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "validation_result" in data["data"]
        assert data["data"]["validation_result"]["is_valid"] is True
    
    @pytest.mark.asyncio
    async def test_validate_cart_with_issues(self, async_client: AsyncClient, auth_headers: dict, db_session: AsyncSession, test_cart: Cart, test_variant: ProductVariant, test_inventory):
        """Test cart validation with stock issues."""
        # Create cart item with quantity exceeding stock
        cart_item = CartItem(
            id=uuid4(),
            cart_id=test_cart.id,
            variant_id=test_variant.id,
            quantity=test_inventory.quantity_available + 10
        )
        db_session.add(cart_item)
        await db_session.commit()
        
        response = await async_client.post("/cart/validate", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["validation_result"]["is_valid"] is False
        assert len(data["data"]["validation_result"]["issues"]) > 0


class TestCartSecurity:
    """Test cart security and authorization."""
    
    @pytest.mark.asyncio
    async def test_access_other_user_cart_item(self, async_client: AsyncClient, auth_headers: dict, db_session: AsyncSession, test_variant: ProductVariant):
        """Test accessing another user's cart item."""
        # Create another user and their cart item
        other_user = User(
            id=uuid4(),
            email="other@example.com",
            firstname="Other",
            lastname="User",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role="customer",
            verified=True,
            is_active=True
        )
        db_session.add(other_user)
        
        other_cart = Cart(
            id=uuid4(),
            user_id=other_user.id
        )
        db_session.add(other_cart)
        
        other_cart_item = CartItem(
            id=uuid4(),
            cart_id=other_cart.id,
            variant_id=test_variant.id,
            quantity=1
        )
        db_session.add(other_cart_item)
        await db_session.commit()
        
        # Try to update other user's cart item
        update_data = {"quantity": 5}
        response = await async_client.put(f"/cart/items/{other_cart_item.id}", json=update_data, headers=auth_headers)
        
        assert response.status_code == 404  # Should not find item (security)
    
    @pytest.mark.asyncio
    async def test_remove_other_user_cart_item(self, async_client: AsyncClient, auth_headers: dict, db_session: AsyncSession, test_variant: ProductVariant):
        """Test removing another user's cart item."""
        # Create another user and their cart item
        other_user = User(
            id=uuid4(),
            email="other2@example.com",
            firstname="Other",
            lastname="User",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role="customer",
            verified=True,
            is_active=True
        )
        db_session.add(other_user)
        
        other_cart = Cart(
            id=uuid4(),
            user_id=other_user.id
        )
        db_session.add(other_cart)
        
        other_cart_item = CartItem(
            id=uuid4(),
            cart_id=other_cart.id,
            variant_id=test_variant.id,
            quantity=1
        )
        db_session.add(other_cart_item)
        await db_session.commit()
        
        # Try to remove other user's cart item
        response = await async_client.delete(f"/cart/items/{other_cart_item.id}", headers=auth_headers)
        
        assert response.status_code == 404  # Should not find item (security)


class TestCartValidation:
    """Test cart validation and edge cases."""
    
    @pytest.mark.asyncio
    async def test_add_item_negative_quantity(self, async_client: AsyncClient, auth_headers: dict, test_variant: ProductVariant):
        """Test adding item with negative quantity."""
        item_data = {
            "variant_id": str(test_variant.id),
            "quantity": -1
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_update_item_negative_quantity(self, async_client: AsyncClient, auth_headers: dict, test_cart_item: CartItem):
        """Test updating item with negative quantity."""
        update_data = {
            "quantity": -5
        }
        
        response = await async_client.put(f"/cart/items/{test_cart_item.id}", json=update_data, headers=auth_headers)
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_add_item_inactive_variant(self, async_client: AsyncClient, auth_headers: dict, db_session: AsyncSession, test_product):
        """Test adding inactive variant to cart."""
        # Create inactive variant
        inactive_variant = ProductVariant(
            id=uuid4(),
            product_id=test_product.id,
            name="Inactive Variant",
            sku="INACTIVE-001",
            base_price=99.99,
            is_active=False
        )
        db_session.add(inactive_variant)
        await db_session.commit()
        
        item_data = {
            "variant_id": str(inactive_variant.id),
            "quantity": 1
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "inactive" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_add_item_large_quantity(self, async_client: AsyncClient, auth_headers: dict, test_variant: ProductVariant):
        """Test adding item with very large quantity."""
        item_data = {
            "variant_id": str(test_variant.id),
            "quantity": 999999
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        # Should either fail validation or be limited
        assert response.status_code in [400, 422]


class TestCartPricing:
    """Test cart pricing calculations."""
    
    @pytest.mark.asyncio
    async def test_cart_total_calculation(self, async_client: AsyncClient, auth_headers: dict, test_cart: Cart, test_cart_item: CartItem, test_variant: ProductVariant):
        """Test cart total calculation."""
        response = await async_client.get("/cart", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        
        # Check if pricing information is included
        cart_data = data["data"]
        if "total" in cart_data:
            expected_total = float(test_variant.sale_price or test_variant.base_price) * test_cart_item.quantity
            assert float(cart_data["total"]) == expected_total
    
    @pytest.mark.asyncio
    async def test_cart_with_sale_prices(self, async_client: AsyncClient, auth_headers: dict, db_session: AsyncSession, test_product):
        """Test cart calculation with sale prices."""
        # Create variant with sale price
        variant_with_sale = ProductVariant(
            id=uuid4(),
            product_id=test_product.id,
            name="Sale Variant",
            sku="SALE-001",
            base_price=100.00,
            sale_price=80.00,
            is_active=True
        )
        db_session.add(variant_with_sale)
        await db_session.commit()
        
        # Add to cart
        item_data = {
            "variant_id": str(variant_with_sale.id),
            "quantity": 2
        }
        
        response = await async_client.post("/cart/items", json=item_data, headers=auth_headers)
        
        assert response.status_code == 201
        data = response.json()
        assert data["success"] is True
        
        # Should use sale price, not base price
        if "unit_price" in data["data"]:
            assert float(data["data"]["unit_price"]) == 80.00