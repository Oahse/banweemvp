"""
Simple test to debug greenlet errors
"""
import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from uuid import uuid4
from decimal import Decimal

from models.user import User, Address
from models.product import Product, ProductVariant, Category
from models.cart import Cart, CartItem
from models.shipping import ShippingMethod
from models.payment import PaymentMethod
from services.order import OrderService
from schemas.order import CheckoutRequest
from fastapi import BackgroundTasks


@pytest.mark.asyncio
async def test_simple_order_placement(db_session: AsyncSession):
    """Simple test to debug greenlet errors"""
    
    # Setup: Create test user
    user = User(
        id=uuid4(),
        email=f"test_{uuid4()}@example.com",
        firstname="Test",
        lastname="User",
        role="Customer",
        active=True,
        verified=True,
        hashed_password="hashed_password"
    )
    db_session.add(user)
    
    # Create test category
    category = Category(
        id=uuid4(),
        name=f"Category-{uuid4()}",
        description="Test Category",
        is_active=True
    )
    db_session.add(category)
    
    # Create test product and variant
    product = Product(
        id=uuid4(),
        name="Test Product",
        description="Test Description",
        category_id=category.id,
        supplier_id=user.id,
        is_active=True
    )
    db_session.add(product)
    
    variant = ProductVariant(
        id=uuid4(),
        product_id=product.id,
        name="Default",
        sku=f"SKU-{uuid4()}",
        base_price=Decimal("99.99"),
        stock=100
    )
    db_session.add(variant)
    
    # Create cart with items
    cart = Cart(
        id=uuid4(),
        user_id=user.id
    )
    db_session.add(cart)
    
    cart_item = CartItem(
        id=uuid4(),
        cart_id=cart.id,
        variant_id=variant.id,
        quantity=1,
        price_per_unit=Decimal("99.99"),
        total_price=Decimal("99.99"),
        saved_for_later=False
    )
    db_session.add(cart_item)
    
    # Create shipping address
    address_id = uuid4()
    address = Address(
        id=address_id,
        user_id=user.id,
        street="123 Test St",
        city="Test City",
        state="TS",
        post_code="12345",
        country="Test Country"
    )
    db_session.add(address)
    
    # Create shipping method
    shipping_method_id = uuid4()
    shipping_method = ShippingMethod(
        id=shipping_method_id,
        name="Standard Shipping",
        description="5-7 business days",
        price=Decimal("9.99"),
        estimated_days=7
    )
    db_session.add(shipping_method)
    
    # Create payment method
    payment_method_id = uuid4()
    payment_method = PaymentMethod(
        id=payment_method_id,
        user_id=user.id,
        type="card",
        provider="stripe",
        last_four="4242",
        is_default=True
    )
    db_session.add(payment_method)
    
    # Store IDs before commit to avoid accessing expired attributes
    cart_id = cart.id
    user_id = user.id
    
    await db_session.commit()
    
    # Refresh cart with eager loading to avoid greenlet errors
    cart_query = select(Cart).where(Cart.id == cart_id).options(
        selectinload(Cart.items).selectinload(CartItem.variant)
    )
    cart_result = await db_session.execute(cart_query)
    cart = cart_result.scalar_one()
    
    # Test: Place order
    order_service = OrderService(db_session)
    background_tasks = BackgroundTasks()
    
    # Create checkout request
    checkout_request = CheckoutRequest(
        shipping_address_id=address_id,
        shipping_method_id=shipping_method_id,
        payment_method_id=payment_method_id,
        notes="Test order"
    )
    
    # Mock the payment service and Celery tasks
    from unittest.mock import AsyncMock, patch, MagicMock
    import sys
    
    # Mock payment processing to return success
    async def mock_process_payment(*args, **kwargs):
        return {"status": "success", "payment_intent_id": "test_intent"}
    
    # Mock Celery task modules to avoid import errors
    mock_email_module = MagicMock()
    mock_email_task = MagicMock()
    mock_email_task.delay = MagicMock()
    mock_email_module.send_order_confirmation_email = mock_email_task
    
    mock_notification_module = MagicMock()
    mock_notification_task = MagicMock()
    mock_notification_task.delay = MagicMock()
    mock_notification_module.create_notification = mock_notification_task
    
    sys.modules['tasks.email_tasks'] = mock_email_module
    sys.modules['tasks.notification_tasks'] = mock_notification_module
    
    try:
        with patch('services.payment.PaymentService.process_payment', new=mock_process_payment):
            # This should complete without greenlet errors
            order = await order_service.place_order(
                user_id=user_id,
                request=checkout_request,
                background_tasks=background_tasks
            )
            
            # Verify order was created
            assert order is not None
            assert order.user_id == str(user_id)
    finally:
        # Clean up mocked modules
        if 'tasks.email_tasks' in sys.modules:
            del sys.modules['tasks.email_tasks']
        if 'tasks.notification_tasks' in sys.modules:
            del sys.modules['tasks.notification_tasks']
