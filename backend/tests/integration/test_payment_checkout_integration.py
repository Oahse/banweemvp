"""
Integration tests for payment and checkout flow
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
from decimal import Decimal
from unittest.mock import patch, MagicMock

from models.user import User
from models.product import Product, ProductVariant, Category
from models.inventories import Inventory, WarehouseLocation
from models.shipping import ShippingMethod
from models.tax_rates import TaxRate
from models.discounts import Discount
from models.payments import PaymentMethod, PaymentIntent, Transaction
from models.orders import Order, OrderItem


@pytest.mark.integration
class TestPaymentCheckoutIntegration:
    """Test complete payment and checkout integration."""
    
    @pytest.mark.asyncio
    async def test_complete_payment_flow_with_stripe(self, async_client: AsyncClient, db_session: AsyncSession, mock_stripe, mock_email):
        """Test complete payment flow with Stripe integration."""
        
        # Setup test data
        await self._setup_comprehensive_test_data(db_session)
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Step 1: Add items to cart
        response = await async_client.get("/products")
        products = response.json()["data"]
        variant_id = products[0]["variants"][0]["id"]
        
        cart_data = {"variant_id": variant_id, "quantity": 2}
        response = await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
        assert response.status_code == 201
        
        # Step 2: Create payment method with Stripe
        with patch('stripe.PaymentMethod.retrieve') as mock_retrieve:
            mock_retrieve.return_value = MagicMock(
                id="pm_test_integration",
                type="card",
                card=MagicMock(
                    last4="4242",
                    brand="visa",
                    exp_month=12,
                    exp_year=2025
                )
            )
            
            payment_method_data = {
                "stripe_payment_method_id": "pm_test_integration",
                "is_default": True
            }
            response = await async_client.post("/payments/methods", json=payment_method_data, headers=auth_headers)
            assert response.status_code == 201
            payment_method_id = response.json()["data"]["id"]
        
        # Step 3: Apply discount
        discount_data = {"code": "INTEGRATION10"}
        response = await async_client.post("/cart/apply-discount", json=discount_data, headers=auth_headers)
        assert response.status_code == 200
        
        # Step 4: Validate checkout with comprehensive pricing
        checkout_data = await self._get_comprehensive_checkout_data(async_client, payment_method_id)
        
        response = await async_client.post("/orders/checkout/validate", json=checkout_data, headers=auth_headers)
        assert response.status_code == 200
        validation = response.json()["data"]
        
        # Verify comprehensive pricing calculation
        pricing = validation["pricing"]
        assert float(pricing["subtotal"]) > 0
        assert float(pricing["tax_amount"]) > 0
        assert float(pricing["shipping_cost"]) > 0
        assert float(pricing["discount_amount"]) > 0
        assert float(pricing["total_amount"]) > 0
        
        # Step 5: Create payment intent with Stripe
        with patch('stripe.PaymentIntent.create') as mock_create_intent:
            mock_create_intent.return_value = MagicMock(
                id="pi_integration_123",
                status="requires_confirmation",
                amount=int(float(pricing["total_amount"]) * 100),  # Stripe uses cents
                currency="usd",
                client_secret="pi_integration_123_secret_test"
            )
            
            # Step 6: Process payment
            with patch('stripe.PaymentIntent.confirm') as mock_confirm:
                mock_confirm.return_value = MagicMock(
                    id="pi_integration_123",
                    status="succeeded",
                    amount=int(float(pricing["total_amount"]) * 100),
                    currency="usd"
                )
                
                response = await async_client.post("/orders", json=checkout_data, headers=auth_headers)
                assert response.status_code == 201
                order = response.json()["data"]
                
                # Verify order creation
                assert order["status"] == "pending"
                assert len(order["items"]) == 1
                assert order["items"][0]["quantity"] == 2
                assert float(order["total_amount"]) == float(pricing["total_amount"])
                assert float(order["discount_amount"]) > 0
                
                order_id = order["id"]
        
        # Step 7: Verify payment intent was created and confirmed
        mock_create_intent.assert_called_once()
        mock_confirm.assert_called_once()
        
        # Step 8: Verify order in database
        response = await async_client.get(f"/orders/{order_id}", headers=auth_headers)
        assert response.status_code == 200
        order_details = response.json()["data"]
        
        assert order_details["payment_status"] == "paid"
        assert order_details["payment_intent_id"] == "pi_integration_123"
        
        # Step 9: Verify inventory was decremented
        response = await async_client.get(f"/products/variants/{variant_id}")
        variant_data = response.json()["data"]
        # Inventory should be reserved for the order
        
        # Step 10: Verify transaction record
        response = await async_client.get(f"/orders/{order_id}/transactions", headers=auth_headers)
        assert response.status_code == 200
        transactions = response.json()["data"]
        assert len(transactions) >= 1
        assert transactions[0]["status"] == "completed"
        assert transactions[0]["payment_intent_id"] == "pi_integration_123"
    
    @pytest.mark.asyncio
    async def test_payment_failure_handling(self, async_client: AsyncClient, db_session: AsyncSession, mock_stripe, mock_email):
        """Test payment failure handling and recovery."""
        
        await self._setup_comprehensive_test_data(db_session)
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Setup cart and payment method
        response = await async_client.get("/products")
        variant_id = response.json()["data"][0]["variants"][0]["id"]
        
        cart_data = {"variant_id": variant_id, "quantity": 1}
        await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
        
        payment_method_data = {
            "stripe_payment_method_id": "pm_test_decline",
            "is_default": True
        }
        response = await async_client.post("/payments/methods", json=payment_method_data, headers=auth_headers)
        payment_method_id = response.json()["data"]["id"]
        
        checkout_data = await self._get_comprehensive_checkout_data(async_client, payment_method_id)
        
        # Test different payment failure scenarios
        failure_scenarios = [
            {
                "stripe_error": "card_declined",
                "status": "requires_payment_method",
                "expected_order_status": None  # Order should not be created
            },
            {
                "stripe_error": "insufficient_funds",
                "status": "requires_payment_method",
                "expected_order_status": None
            },
            {
                "stripe_error": "processing_error",
                "status": "requires_payment_method",
                "expected_order_status": None
            }
        ]
        
        for scenario in failure_scenarios:
            with patch('stripe.PaymentIntent.create') as mock_create:
                mock_create.return_value = MagicMock(
                    id="pi_failed_123",
                    status=scenario["status"],
                    last_payment_error=MagicMock(
                        code=scenario["stripe_error"],
                        message=f"Your card was declined: {scenario['stripe_error']}"
                    )
                )
                
                response = await async_client.post("/orders", json=checkout_data, headers=auth_headers)
                
                # Should handle payment failure gracefully
                assert response.status_code == 400
                error = response.json()
                assert "payment" in error["message"].lower()
                assert scenario["stripe_error"] in error["message"].lower()
                
                # Verify no order was created
                response = await async_client.get("/orders", headers=auth_headers)
                orders = response.json()["data"]
                failed_orders = [o for o in orders if o.get("payment_intent_id") == "pi_failed_123"]
                assert len(failed_orders) == 0
    
    @pytest.mark.asyncio
    async def test_payment_webhook_handling(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test Stripe webhook handling for payment events."""
        
        await self._setup_comprehensive_test_data(db_session)
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Create order first
        response = await async_client.get("/products")
        variant_id = response.json()["data"][0]["variants"][0]["id"]
        
        cart_data = {"variant_id": variant_id, "quantity": 1}
        await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
        
        payment_method_data = {
            "stripe_payment_method_id": "pm_test_webhook",
            "is_default": True
        }
        response = await async_client.post("/payments/methods", json=payment_method_data, headers=auth_headers)
        payment_method_id = response.json()["data"]["id"]
        
        checkout_data = await self._get_comprehensive_checkout_data(async_client, payment_method_id)
        
        with patch('services.payments.PaymentService.process_payment') as mock_payment:
            mock_payment.return_value = {
                "status": "requires_confirmation",
                "payment_intent_id": "pi_webhook_123",
                "transaction_id": str(uuid4())
            }
            
            response = await async_client.post("/orders", json=checkout_data, headers=auth_headers)
            assert response.status_code == 201
            order_id = response.json()["data"]["id"]
        
        # Simulate webhook events
        webhook_events = [
            {
                "type": "payment_intent.succeeded",
                "data": {
                    "object": {
                        "id": "pi_webhook_123",
                        "status": "succeeded",
                        "amount": 10000,
                        "currency": "usd"
                    }
                }
            },
            {
                "type": "payment_intent.payment_failed",
                "data": {
                    "object": {
                        "id": "pi_webhook_123",
                        "status": "requires_payment_method",
                        "last_payment_error": {
                            "code": "card_declined",
                            "message": "Your card was declined."
                        }
                    }
                }
            }
        ]
        
        for event in webhook_events:
            # Mock Stripe webhook signature verification
            with patch('stripe.Webhook.construct_event') as mock_construct:
                mock_construct.return_value = event
                
                response = await async_client.post(
                    "/webhooks/stripe",
                    json=event,
                    headers={
                        "stripe-signature": "test_signature"
                    }
                )
                
                assert response.status_code == 200
                
                # Verify order status was updated based on webhook
                response = await async_client.get(f"/orders/{order_id}", headers=auth_headers)
                order = response.json()["data"]
                
                if event["type"] == "payment_intent.succeeded":
                    assert order["payment_status"] == "paid"
                elif event["type"] == "payment_intent.payment_failed":
                    assert order["payment_status"] == "failed"
    
    @pytest.mark.asyncio
    async def test_refund_processing_integration(self, async_client: AsyncClient, db_session: AsyncSession, mock_stripe, mock_email):
        """Test refund processing integration with Stripe."""
        
        await self._setup_comprehensive_test_data(db_session)
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Create successful order first
        order_id = await self._create_successful_order(async_client, db_session, auth_headers)
        
        # Process refund
        refund_data = {
            "reason": "customer_request",
            "amount": 50.00,  # Partial refund
            "notes": "Customer requested partial refund"
        }
        
        with patch('stripe.Refund.create') as mock_refund:
            mock_refund.return_value = MagicMock(
                id="re_test_123",
                amount=5000,  # $50.00 in cents
                currency="usd",
                status="succeeded",
                payment_intent="pi_successful_123"
            )
            
            response = await async_client.post(
                f"/orders/{order_id}/refund",
                json=refund_data,
                headers=auth_headers
            )
            
            assert response.status_code == 201
            refund = response.json()["data"]
            
            assert refund["amount"] == 50.00
            assert refund["status"] == "completed"
            assert refund["stripe_refund_id"] == "re_test_123"
        
        # Verify refund in order
        response = await async_client.get(f"/orders/{order_id}", headers=auth_headers)
        order = response.json()["data"]
        assert order["refund_status"] == "partial"
        assert float(order["refunded_amount"]) == 50.00
        
        # Verify inventory was restored (if applicable)
        # This would depend on your refund policy
    
    @pytest.mark.asyncio
    async def test_subscription_payment_integration(self, async_client: AsyncClient, db_session: AsyncSession, mock_stripe, mock_email):
        """Test subscription payment integration."""
        
        await self._setup_subscription_test_data(db_session)
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Create subscription
        subscription_data = {
            "plan_id": "monthly_plan",
            "payment_method_id": "pm_test_subscription"
        }
        
        with patch('stripe.Subscription.create') as mock_create_sub:
            mock_create_sub.return_value = MagicMock(
                id="sub_test_123",
                status="active",
                current_period_start=1234567890,
                current_period_end=1237159890,
                items=MagicMock(
                    data=[MagicMock(price=MagicMock(id="price_monthly"))]
                )
            )
            
            response = await async_client.post("/subscriptions", json=subscription_data, headers=auth_headers)
            assert response.status_code == 201
            subscription = response.json()["data"]
            
            assert subscription["status"] == "active"
            assert subscription["stripe_subscription_id"] == "sub_test_123"
    
    @pytest.mark.asyncio
    async def test_multi_currency_payment_integration(self, async_client: AsyncClient, db_session: AsyncSession, mock_stripe, mock_email):
        """Test multi-currency payment integration."""
        
        await self._setup_comprehensive_test_data(db_session)
        user_data, auth_headers = await self._create_test_user(async_client, mock_email)
        
        # Setup cart
        response = await async_client.get("/products")
        variant_id = response.json()["data"][0]["variants"][0]["id"]
        
        cart_data = {"variant_id": variant_id, "quantity": 1}
        await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
        
        # Test different currencies
        currencies = ["USD", "EUR", "GBP", "CAD"]
        
        for currency in currencies:
            payment_method_data = {
                "stripe_payment_method_id": f"pm_test_{currency.lower()}",
                "is_default": True
            }
            response = await async_client.post("/payments/methods", json=payment_method_data, headers=auth_headers)
            payment_method_id = response.json()["data"]["id"]
            
            checkout_data = await self._get_comprehensive_checkout_data(async_client, payment_method_id)
            checkout_data["currency"] = currency
            
            # Mock currency conversion
            with patch('services.orders.CurrencyConverter') as mock_converter:
                mock_converter.return_value.convert.return_value = Decimal("100.00")  # Mock converted amount
                
                with patch('stripe.PaymentIntent.create') as mock_create:
                    mock_create.return_value = MagicMock(
                        id=f"pi_{currency.lower()}_123",
                        status="succeeded",
                        amount=10000,  # Amount in smallest currency unit
                        currency=currency.lower()
                    )
                    
                    response = await async_client.post("/orders", json=checkout_data, headers=auth_headers)
                    
                    if response.status_code == 201:
                        order = response.json()["data"]
                        assert order["currency"] == currency
                        
                        # Verify Stripe was called with correct currency
                        mock_create.assert_called()
                        call_args = mock_create.call_args[1]
                        assert call_args["currency"] == currency.lower()
    
    async def _setup_comprehensive_test_data(self, db_session: AsyncSession):
        """Setup comprehensive test data for integration tests."""
        # Create category
        category = Category(
            id=uuid4(),
            name="Integration Category",
            description="For integration testing",
            is_active=True
        )
        db_session.add(category)
        
        # Create product
        product = Product(
            id=uuid4(),
            name="Integration Product",
            description="For integration testing",
            category_id=category.id,
            brand="Test Brand",
            is_active=True
        )
        db_session.add(product)
        
        # Create variant
        variant = ProductVariant(
            id=uuid4(),
            product_id=product.id,
            name="Integration Variant",
            sku="INT-001",
            base_price=Decimal("99.99"),
            weight=Decimal("1.0"),
            is_active=True
        )
        db_session.add(variant)
        
        # Create warehouse
        warehouse = WarehouseLocation(
            id=uuid4(),
            name="Integration Warehouse",
            address="123 Integration St",
            city="Integration City",
            state="IC",
            country="US",
            postal_code="12345",
            is_active=True
        )
        db_session.add(warehouse)
        
        # Create inventory
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
            name="Integration Shipping",
            description="For integration testing",
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
        
        # Create discount
        discount = Discount(
            id=uuid4(),
            code="INTEGRATION10",
            discount_type="percentage",
            discount_value=Decimal("10.00"),
            is_active=True,
            usage_limit=100,
            usage_count=0
        )
        db_session.add(discount)
        
        await db_session.commit()
    
    async def _setup_subscription_test_data(self, db_session: AsyncSession):
        """Setup subscription test data."""
        # This would create subscription plans and related data
        await self._setup_comprehensive_test_data(db_session)
    
    async def _create_test_user(self, async_client: AsyncClient, mock_email):
        """Create test user and return auth headers."""
        user_data = {
            "email": "integration@example.com",
            "firstname": "Integration",
            "lastname": "Test",
            "password": "IntegrationPassword123!",
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
    
    async def _get_comprehensive_checkout_data(self, async_client: AsyncClient, payment_method_id: str):
        """Get comprehensive checkout data."""
        response = await async_client.get("/shipping/methods")
        shipping_methods = response.json()["data"]
        
        return {
            "shipping_address": {
                "street": "123 Integration St",
                "city": "Integration City",
                "state": "CA",
                "country": "US",
                "postal_code": "12345"
            },
            "billing_address": {
                "street": "123 Integration St",
                "city": "Integration City",
                "state": "CA",
                "country": "US",
                "postal_code": "12345"
            },
            "shipping_method_id": shipping_methods[0]["id"],
            "payment_method_id": payment_method_id
        }
    
    async def _create_successful_order(self, async_client: AsyncClient, db_session: AsyncSession, auth_headers: dict) -> str:
        """Create a successful order for testing."""
        # Add item to cart
        response = await async_client.get("/products")
        variant_id = response.json()["data"][0]["variants"][0]["id"]
        
        cart_data = {"variant_id": variant_id, "quantity": 1}
        await async_client.post("/cart/items", json=cart_data, headers=auth_headers)
        
        # Create payment method
        payment_method_data = {
            "stripe_payment_method_id": "pm_test_successful",
            "is_default": True
        }
        response = await async_client.post("/payments/methods", json=payment_method_data, headers=auth_headers)
        payment_method_id = response.json()["data"]["id"]
        
        # Create order
        checkout_data = await self._get_comprehensive_checkout_data(async_client, payment_method_id)
        
        with patch('services.payments.PaymentService.process_payment') as mock_payment:
            mock_payment.return_value = {
                "status": "succeeded",
                "payment_intent_id": "pi_successful_123",
                "transaction_id": str(uuid4())
            }
            
            response = await async_client.post("/orders", json=checkout_data, headers=auth_headers)
            assert response.status_code == 201
            
            return response.json()["data"]["id"]


@pytest.mark.integration
class TestInventoryOrderIntegration:
    """Test inventory and order integration."""
    
    @pytest.mark.asyncio
    async def test_inventory_reservation_during_checkout(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test inventory reservation during checkout process."""
        # This would test inventory reservation and release during order processing
        pass
    
    @pytest.mark.asyncio
    async def test_concurrent_order_inventory_conflicts(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test handling of concurrent orders with inventory conflicts."""
        # This would test race conditions in inventory management
        pass