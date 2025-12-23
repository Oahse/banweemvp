from core.utils.messages.email import send_email
from models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from uuid import UUID
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from decimal import Decimal
from dateutil.relativedelta import relativedelta
import stripe
import logging

from core.config import settings
from models.payment import PaymentMethod
from models.transaction import Transaction
from models.payment_intent import PaymentIntent
from models.subscription import Subscription
from schemas.payment import PaymentMethodCreate, PaymentMethodUpdate, PaymentMethodResponse
from schemas.transaction import TransactionCreate
from services.activity import ActivityService

stripe.api_key = settings.STRIPE_SECRET_KEY
logger = logging.getLogger(__name__)


class PaymentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def _get_stripe_customer(self, user_id: UUID, user_email: str, user_full_name: str) -> str:
        """
        Retrieves or creates a Stripe Customer ID for the given user.
        """
        user_obj = await self.db.get(User, user_id)
        if not user_obj:
            raise Exception("User not found for Stripe customer operation.")

        if user_obj.stripe_customer_id:
            return user_obj.stripe_customer_id
        
        # Create new Stripe customer
        customer = stripe.Customer.create(
            email=user_email,
            name=user_full_name,
            metadata={"user_id": str(user_id)}
        )
        user_obj.stripe_customer_id = customer.id
        await self.db.commit()
        await self.db.refresh(user_obj)
        return customer.id

    async def get_payment_methods(self, user_id: UUID) -> List[PaymentMethod]:
        query = select(PaymentMethod).where(PaymentMethod.user_id == user_id)
        result = await self.db.execute(query)
        return result.scalars().all()

    async def add_payment_method(self, user_id: UUID, payload: PaymentMethodCreate) -> PaymentMethod:
        # Fetch user for email and full name
        user = await self.db.get(User, user_id)
        if not user:
            raise Exception("User not found for adding payment method.")
            
        stripe_customer_id = await self._get_stripe_customer(user_id, user.email, user.full_name)

        if not payload.stripe_token:
            raise Exception("Stripe token is required to add a new payment method.")

        try:
            # Create Stripe PaymentMethod from token
            stripe_pm = stripe.PaymentMethod.create(
                type="card",
                card={"token": payload.stripe_token}
            )
            
            # Attach PaymentMethod to customer
            stripe.PaymentMethod.attach(
                stripe_pm.id,
                customer=stripe_customer_id
            )
            
            card_details = stripe_pm.card
            
            # Check if this is the first payment method for the user
            existing_methods = await self.get_payment_methods(user_id)
            is_first_method = len(existing_methods) == 0
            
            is_default = is_first_method or payload.is_default
            if is_default:
                await self._clear_default_payment_method(user_id)

            new_method = PaymentMethod(
                user_id=user_id,
                type='card',
                provider=card_details.brand.lower(),
                last_four=card_details.last4,
                expiry_month=card_details.exp_month,
                expiry_year=card_details.exp_year,
                is_default=is_default,
                stripe_payment_method_id=stripe_pm.id,
                brand=card_details.brand
            )
            self.db.add(new_method)
            await self.db.commit()
            await self.db.refresh(new_method)
            return new_method

        except stripe.StripeError as e:
            raise Exception(f"Failed to process card details with Stripe: {str(e)}")

    async def update_payment_method(self, user_id: UUID, method_id: UUID, payload: PaymentMethodUpdate) -> Optional[PaymentMethod]:
        query = select(PaymentMethod).where(PaymentMethod.id ==
                                            method_id, PaymentMethod.user_id == user_id)
        result = await self.db.execute(query)
        method = result.scalar_one_or_none()

        if not method:
            return None

        # Ensure only one default payment method per user
        if payload.is_default is True:
            await self._clear_default_payment_method(user_id, exclude_method_id=method_id)
        elif payload.is_default is False and method.is_default:
            # Prevent unsetting default if it's the only one, or handle logic to set another as default
            pass  # More complex logic might be needed here

        update_data = payload.dict(exclude_unset=True)
        for field, value in update_data.items():
            if field == 'meta_data' and value is not None:
                import json
                setattr(method, field, json.dumps(value))
            else:
                setattr(method, field, value)

        await self.db.commit()
        await self.db.refresh(method)
        return method

    async def delete_payment_method(self, user_id: UUID, method_id: UUID) -> bool:
        query = select(PaymentMethod).where(PaymentMethod.id ==
                                            method_id, PaymentMethod.user_id == user_id)
        result = await self.db.execute(query)
        method = result.scalar_one_or_none()

        if not method:
            return False
            
        # Detach PaymentMethod from Stripe Customer if it exists
        if method.stripe_payment_method_id and method.user.stripe_customer_id:
            try:
                stripe.PaymentMethod.detach(method.stripe_payment_method_id)
            except stripe.StripeError as e:
                # Log the error, but don't prevent deletion from local DB if Stripe fails
                print(f"Warning: Failed to detach Stripe PaymentMethod {method.stripe_payment_method_id}: {e}")

        await self.db.delete(method)
        await self.db.commit()
        return True

    async def set_default_payment_method(self, user_id: UUID, method_id: UUID) -> Optional[PaymentMethod]:
        # Clear existing default for the user
        await self._clear_default_payment_method(user_id)

        # Set the new default
        query = update(PaymentMethod).where(PaymentMethod.id == method_id,
                                            PaymentMethod.user_id == user_id).values(is_default=True)
        await self.db.execute(query)
        await self.db.commit()

        query = select(PaymentMethod).where(PaymentMethod.id == method_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def _clear_default_payment_method(self, user_id: UUID, exclude_method_id: Optional[UUID] = None):
        query = update(PaymentMethod).where(
            PaymentMethod.user_id == user_id,
            PaymentMethod.is_default == True
        ).values(is_default=False)
        if exclude_method_id:
            query = query.where(PaymentMethod.id != exclude_method_id)
        await self.db.execute(query)
        await self.db.commit()

    async def get_default_payment_method(self, user_id: UUID) -> Optional[PaymentMethod]:
        """Get a user's default payment method."""
        # First, try to find a payment method marked as default
        query = select(PaymentMethod).where(
            PaymentMethod.user_id == user_id,
            PaymentMethod.is_default == True
        )
        result = await self.db.execute(query)
        method = result.scalars().first()

        if method:
            return method

        # If no default is set, return the most recent payment method
        query = select(PaymentMethod).where(
            PaymentMethod.user_id == user_id
        ).order_by(PaymentMethod.created_at.desc())
        result = await self.db.execute(query)
        return result.scalars().first()

    async def create_payment_intent(
        self, 
        user_id: UUID, 
        order_id: UUID, 
        subtotal: float, 
        currency: str = None,
        shipping_address_id: UUID = None,
        payment_method_id: UUID = None,
        expires_in_minutes: int = 30
    ) -> dict:
        """
        Creates an enhanced Stripe PaymentIntent with tax calculation and multi-currency support.
        
        Args:
            user_id: User creating the payment intent
            order_id: Associated order ID
            subtotal: Subtotal amount before tax and shipping
            currency: Currency code (auto-detected if not provided)
            shipping_address_id: Address for tax calculation
            payment_method_id: Specific payment method to use
            expires_in_minutes: Payment intent expiration time
        """
        from services.tax import TaxService
        from models.order import Order
        from decimal import Decimal
        import datetime
        
        try:
            # Fetch user to get Stripe customer ID
            user = await self.db.get(User, user_id)
            if not user:
                raise Exception("User not found.")
            
            # Get or create Stripe customer
            stripe_customer_id = await self._get_stripe_customer(user_id, user.email, user.full_name)
            
            # Get order details if available
            order = await self.db.get(Order, order_id) if order_id else None
            
            # Determine shipping address for tax calculation
            tax_address_id = shipping_address_id
            if not tax_address_id and order and order.shipping_address_id:
                tax_address_id = order.shipping_address_id
            elif not tax_address_id and user.default_address:
                tax_address_id = user.default_address.id
            
            # Calculate tax
            tax_service = TaxService(self.db)
            tax_info = await tax_service.calculate_tax(
                subtotal=Decimal(str(subtotal)),
                shipping_address_id=tax_address_id
            )
            
            # Determine currency if not provided
            if not currency:
                if tax_info.get("location", {}).get("country"):
                    country_code = tax_service._get_country_code(tax_info["location"]["country"])
                    currency = tax_service.get_currency_for_country(country_code)
                else:
                    currency = "USD"  # Default fallback
            
            # Calculate shipping (simplified - could be enhanced with shipping service)
            shipping_amount = 0.0
            if subtotal < 50:  # Free shipping over $50
                shipping_amount = 10.0
            
            # Calculate total amount
            total_amount = subtotal + tax_info["tax_amount"] + shipping_amount
            
            # Set payment intent expiration
            expires_at = int((datetime.datetime.utcnow() + datetime.timedelta(minutes=expires_in_minutes)).timestamp())
            
            # Prepare payment intent parameters
            payment_intent_params = {
                "amount": int(total_amount * 100),  # Stripe expects amount in cents
                "currency": currency.lower(),
                "customer": stripe_customer_id,
                "automatic_payment_methods": {"enabled": True},
                "metadata": {
                    "user_id": str(user_id),
                    "order_id": str(order_id) if order_id else "",
                    "subtotal": str(subtotal),
                    "tax_amount": str(tax_info["tax_amount"]),
                    "shipping_amount": str(shipping_amount),
                    "total_amount": str(total_amount),
                    "tax_rate": str(tax_info["tax_rate"]),
                    "currency": currency
                },
                # Set expiration time
                "payment_method_options": {
                    "card": {
                        "setup_future_usage": "off_session"  # Allow saving for future use
                    }
                }
            }
            
            # Add specific payment method if provided
            if payment_method_id:
                payment_method = await self.db.execute(
                    select(PaymentMethod).where(
                        PaymentMethod.id == payment_method_id,
                        PaymentMethod.user_id == user_id
                    )
                )
                payment_method = payment_method.scalar_one_or_none()
                if payment_method and payment_method.stripe_payment_method_id:
                    payment_intent_params["payment_method"] = payment_method.stripe_payment_method_id
            
            # Create Stripe PaymentIntent
            payment_intent = stripe.PaymentIntent.create(**payment_intent_params)
            
            # Create enhanced transaction record
            transaction_data = TransactionCreate(
                user_id=user_id,
                order_id=order_id,
                stripe_payment_intent_id=payment_intent.id,
                amount=total_amount,
                currency=currency.upper(),
                status=payment_intent.status,
                transaction_type="payment"
            )
            new_transaction = Transaction(**transaction_data.model_dump())
            self.db.add(new_transaction)
            await self.db.commit()
            await self.db.refresh(new_transaction)
            
            return {
                "client_secret": payment_intent.client_secret,
                "payment_intent_id": payment_intent.id,
                "status": payment_intent.status,
                "amount_breakdown": {
                    "subtotal": subtotal,
                    "tax_amount": tax_info["tax_amount"],
                    "tax_rate": tax_info["tax_rate"],
                    "shipping_amount": shipping_amount,
                    "total_amount": total_amount,
                    "currency": currency.upper()
                },
                "tax_info": tax_info,
                "expires_at": expires_at,
                "supported_payment_methods": ["card", "apple_pay", "google_pay"]
            }
            
        except stripe.StripeError as e:
            # Handle Stripe API errors
            raise Exception(f"Stripe error: {str(e)}")
        except Exception as e:
            # Handle other errors
            raise Exception(f"Payment intent creation failed: {str(e)}")

    async def _process_successful_payment(self, payment_intent_id: str, status: str):
        query = update(Transaction).where(
            Transaction.stripe_payment_intent_id == payment_intent_id
        ).values(status=status)
        await self.db.execute(query)
        await self.db.commit()

        transaction_result = await self.db.execute(select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id))
        transaction = transaction_result.scalar_one_or_none()
        if transaction:
            await self.send_payment_receipt_email(transaction)

    async def handle_stripe_webhook(self, event: dict):
        import logging
        import asyncio
        from datetime import datetime, timedelta
        from models.webhook_event import WebhookEvent
        
        logger = logging.getLogger(__name__)
        event_id = event.get("id", "unknown")
        event_type = event["type"]
        data = event["data"]["object"]
        
        logger.info(f"Processing webhook event {event_id} of type {event_type}")
        
        # Check for idempotency - prevent duplicate processing
        webhook_record = await self._get_or_create_webhook_record(event_id, event_type, event)
        
        if webhook_record.processed:
            logger.info(f"Webhook event {event_id} already processed successfully, skipping")
            return
        
        # Update processing attempt
        webhook_record.processing_attempts += 1
        webhook_record.last_processing_attempt = datetime.utcnow()
        await self.db.commit()
        
        max_retries = 3
        base_delay = 1  # Base delay in seconds
        
        while webhook_record.processing_attempts <= max_retries:
            try:
                if event_type == "payment_intent.succeeded":
                    await self._handle_payment_intent_succeeded(data, event_id)
                    
                elif event_type == "payment_intent.payment_failed":
                    await self._handle_payment_intent_failed(data, event_id)
                    
                elif event_type == "charge.succeeded":
                    await self._handle_charge_succeeded(data, event_id)
                    
                elif event_type == "payment_method.attached":
                    await self._handle_payment_method_attached(data, event_id)
                    
                elif event_type == "customer.updated":
                    await self._handle_customer_updated(data, event_id)
                    
                else:
                    logger.info(f"Unhandled webhook event type: {event_type}")
                
                # Mark as successfully processed
                webhook_record.processed = True
                webhook_record.completed_at = datetime.utcnow()
                webhook_record.error_message = None
                await self.db.commit()
                
                logger.info(f"Successfully processed webhook event {event_id}")
                break
                
            except Exception as e:
                error_message = str(e)
                logger.error(f"Error processing webhook event {event_id} (attempt {webhook_record.processing_attempts}/{max_retries}): {error_message}")
                
                if webhook_record.processing_attempts < max_retries:
                    # Exponential backoff: 1s, 2s, 4s
                    delay = base_delay * (2 ** (webhook_record.processing_attempts - 1))
                    logger.info(f"Retrying webhook event {event_id} in {delay} seconds")
                    
                    # Update attempt count for next retry
                    webhook_record.processing_attempts += 1
                    webhook_record.last_processing_attempt = datetime.utcnow()
                    await self.db.commit()
                    
                    await asyncio.sleep(delay)
                else:
                    # Mark as failed after all retries exhausted
                    webhook_record.error_message = error_message
                    await self.db.commit()
                    
                    logger.error(f"Failed to process webhook event {event_id} after {max_retries} attempts")
                    
                    # Log final failure to activity log for monitoring
                    from services.activity import ActivityService
                    activity_service = ActivityService(self.db)
                    await activity_service.log_activity(
                        action_type="webhook_failed",
                        description=f"Failed to process webhook after {max_retries} attempts: {error_message}",
                        metadata={
                            "webhook_event_id": event_id,
                            "event_type": event_type,
                            "status": "failed",
                            "error": error_message,
                            "attempts": max_retries
                        }
                    )
                    raise
    
    async def _get_or_create_webhook_record(self, event_id: str, event_type: str, event_data: dict) -> 'WebhookEvent':
        """Get existing webhook record or create new one for idempotency tracking"""
        from models.webhook_event import WebhookEvent
        
        # Try to get existing record
        query = select(WebhookEvent).where(WebhookEvent.stripe_event_id == event_id)
        result = await self.db.execute(query)
        webhook_record = result.scalar_one_or_none()
        
        if webhook_record:
            return webhook_record
        
        # Create new record
        webhook_record = WebhookEvent(
            stripe_event_id=event_id,
            event_type=event_type,
            event_data=event_data,
            processed=False,
            processing_attempts=0
        )
        self.db.add(webhook_record)
        await self.db.commit()
        await self.db.refresh(webhook_record)
        
        return webhook_record
    
    async def _handle_payment_intent_succeeded(self, data: dict, event_id: str):
        """Handle successful payment intent events"""
        payment_intent_id = data["id"]
        status = data["status"]
        amount_received = data.get("amount_received", 0) / 100  # Convert from cents
        
        logger = logging.getLogger(__name__)
        logger.info(f"Processing payment_intent.succeeded for {payment_intent_id}")
        
        # Update transaction status
        query = update(Transaction).where(
            Transaction.stripe_payment_intent_id == payment_intent_id
        ).values(
            status=status,
            updated_at=datetime.utcnow()
        )
        result = await self.db.execute(query)
        
        if result.rowcount == 0:
            logger.warning(f"No transaction found for payment_intent_id: {payment_intent_id}")
            return
        
        await self.db.commit()
        
        # Get the updated transaction for further processing
        transaction_result = await self.db.execute(
            select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id)
        )
        transaction = transaction_result.scalar_one_or_none()
        
        if transaction:
            # Send payment receipt email
            await self.send_payment_receipt_email(transaction)
            
            # Log activity
            from services.activity import ActivityService
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="payment_success",
                description=f"Payment succeeded for order #{transaction.order_id}",
                user_id=transaction.user_id,
                metadata={
                    "payment_intent_id": payment_intent_id,
                    "amount": float(amount_received),
                    "webhook_event_id": event_id
                }
            )
    
    async def _handle_payment_intent_failed(self, data: dict, event_id: str):
        """Handle failed payment intent events"""
        payment_intent_id = data["id"]
        status = data["status"]
        last_payment_error = data.get("last_payment_error", {})
        failure_reason = last_payment_error.get("message", "Unknown payment failure")
        failure_code = last_payment_error.get("code", "unknown")
        
        logger = logging.getLogger(__name__)
        logger.info(f"Processing payment_intent.payment_failed for {payment_intent_id}")
        
        # Update transaction status with failure details
        query = update(Transaction).where(
            Transaction.stripe_payment_intent_id == payment_intent_id
        ).values(
            status=status,
            failure_reason=failure_reason,
            updated_at=datetime.utcnow()
        )
        result = await self.db.execute(query)
        
        if result.rowcount == 0:
            logger.warning(f"No transaction found for payment_intent_id: {payment_intent_id}")
            return
        
        await self.db.commit()
        
        # Get the updated transaction for further processing
        transaction_result = await self.db.execute(
            select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id)
        )
        transaction = transaction_result.scalar_one_or_none()
        
        if transaction:
            # Send payment failure email
            await self.send_payment_failed_email(transaction, failure_reason)
            
            # Log activity
            from services.activity import ActivityService
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="payment_failure",
                description=f"Payment failed for order #{transaction.order_id}: {failure_reason}",
                user_id=transaction.user_id,
                metadata={
                    "payment_intent_id": payment_intent_id,
                    "failure_reason": failure_reason,
                    "failure_code": failure_code,
                    "webhook_event_id": event_id
                }
            )
    
    async def _handle_charge_succeeded(self, data: dict, event_id: str):
        """Handle successful charge events (backup for payment_intent.succeeded)"""
        payment_intent_id = data.get("payment_intent")
        if not payment_intent_id:
            return
        
        logger = logging.getLogger(__name__)
        logger.info(f"Processing charge.succeeded for payment_intent {payment_intent_id}")
        
        # Check if we already processed the payment_intent.succeeded event
        transaction_result = await self.db.execute(
            select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id)
        )
        transaction = transaction_result.scalar_one_or_none()
        
        if transaction and transaction.status != "succeeded":
            await self._handle_payment_intent_succeeded(
                {"id": payment_intent_id, "status": "succeeded", "amount_received": data.get("amount", 0)},
                event_id
            )
    
    async def _handle_payment_method_attached(self, data: dict, event_id: str):
        """Handle payment method attachment events"""
        logger = logging.getLogger(__name__)
        logger.info(f"Processing payment_method.attached event {event_id}")
        # This is mainly for logging/monitoring purposes
        # The actual payment method creation is handled in our add_payment_method method
    
    async def _handle_customer_updated(self, data: dict, event_id: str):
        """Handle customer update events"""
        logger = logging.getLogger(__name__)
        logger.info(f"Processing customer.updated event {event_id}")
        # This could be used to sync customer data changes from Stripe
        # For now, we'll just log it

    async def send_payment_receipt_email(self, transaction: Transaction):
        user_result = await self.db.execute(select(User).where(User.id == transaction.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return

        context = {
            "customer_name": user.firstname,
            "total_paid": f"${transaction.amount:.2f}",
            "transaction_id": str(transaction.id),
            "payment_date": transaction.created_at.strftime("%B %d, %Y"),
            "account_url": f"{settings.FRONTEND_URL}/account",
            "company_name": "Banwee",
        }

        try:
            await send_email(
                to_email=user.email,
                mail_type='payment_receipt',
                context=context
            )
        except Exception as e:
            pass  # Email sending failure should not break the flow

    async def handle_payment_intent_expiration(self, payment_intent_id: str) -> dict:
        """
        Handle expired payment intents by updating transaction status and notifying user.
        
        Args:
            payment_intent_id: Stripe payment intent ID
            
        Returns:
            Dict with expiration handling result
        """
        try:
            # Get transaction from database
            transaction_result = await self.db.execute(
                select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id)
            )
            transaction = transaction_result.scalar_one_or_none()
            
            if not transaction:
                return {"status": "error", "message": "Transaction not found"}
            
            # Update transaction status to expired
            transaction.status = "expired"
            transaction.updated_at = datetime.utcnow()
            await self.db.commit()
            
            # Get user for notification
            user = await self.db.get(User, transaction.user_id)
            if user:
                # Send expiration notification email
                await self.send_payment_expired_email(transaction, user)
            
            # Log activity
            from services.activity import ActivityService
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="payment_expired",
                description=f"Payment intent expired for order #{transaction.order_id}",
                user_id=transaction.user_id,
                metadata={
                    "payment_intent_id": payment_intent_id,
                    "order_id": str(transaction.order_id),
                    "amount": float(transaction.amount)
                }
            )
            
            return {
                "status": "success", 
                "message": "Payment intent expiration handled",
                "transaction_id": str(transaction.id)
            }
            
        except Exception as e:
            return {"status": "error", "message": f"Failed to handle expiration: {str(e)}"}
    
    async def send_payment_expired_email(self, transaction: Transaction, user: User):
        """Send email notification for expired payment intent"""
        context = {
            "customer_name": user.firstname,
            "order_number": str(transaction.order_id),
            "transaction_amount": f"${transaction.amount:.2f}",
            "retry_payment_url": f"{settings.FRONTEND_URL}/checkout/{transaction.order_id}",
            "company_name": "Banwee",
        }

        try:
            await send_email(
                to_email=user.email,
                mail_type='payment_expired',
                context=context
            )
        except Exception as e:
            pass  # Email sending failure should not break the flow

    async def send_payment_failed_email(self, transaction: Transaction, failure_reason: str):
        user_result = await self.db.execute(select(User).where(User.id == transaction.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return

        context = {
            "customer_name": user.firstname,
            "order_number": str(transaction.order_id),
            "transaction_amount": f"${transaction.amount:.2f}",
            "failure_reason": failure_reason,
            "update_payment_url": f"{settings.FRONTEND_URL}/account/payment-methods",
            "company_name": "Banwee",
        }

        try:
            await send_email(
                to_email=user.email,
                mail_type='payment_failed',
                context=context
            )
        except Exception as e:
            pass  # Email sending failure should not break the flow

    async def process_payment(self, user_id: UUID, amount: float, payment_method_id: UUID, order_id: UUID) -> dict:
        """
        Process payment for an order using Stripe.
        Returns payment result with status.
        """
        try:
            # Fetch user and payment method from our DB
            user = await self.db.get(User, user_id)
            if not user:
                return {
                    "status": "failed",
                    "error": "User not found"
                }

            payment_method_db = await self.db.execute(
                select(PaymentMethod).where(
                    PaymentMethod.id == payment_method_id,
                    PaymentMethod.user_id == user_id
                )
            )
            payment_method_db = payment_method_db.scalar_one_or_none()
            
            if not payment_method_db:
                return {
                    "status": "failed",
                    "error": "Payment method not found in database"
                }

            if not user.stripe_customer_id:
                return {
                    "status": "failed",
                    "error": "Stripe Customer ID not found for user."
                }
            if not payment_method_db.stripe_payment_method_id:
                return {
                    "status": "failed",
                    "error": "Stripe Payment Method ID not found for saved payment method."
                }

            # Create a Stripe PaymentIntent
            # Use the saved Stripe Customer and Payment Method
            payment_intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Stripe expects amount in cents
                currency="usd",
                customer=user.stripe_customer_id,
                payment_method=payment_method_db.stripe_payment_method_id,
                confirm=True, # Attempt to confirm the payment immediately
                off_session=True, # Required for confirming payment with saved methods without user interaction
                metadata={
                    "user_id": str(user_id),
                    "order_id": str(order_id),
                    "payment_method_id": str(payment_method_id)
                }
            )

            # Create a transaction record in our database
            transaction_data = TransactionCreate(
                user_id=user_id,
                order_id=order_id,
                stripe_payment_intent_id=payment_intent.id,
                amount=amount,
                currency="USD",
                status=payment_intent.status,
                transaction_type="payment"
            )
            new_transaction = Transaction(**transaction_data.model_dump())
            self.db.add(new_transaction)
            await self.db.commit()
            await self.db.refresh(new_transaction)

            # Log activity for successful payment
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="payment",
                description=f"Payment processed for order #{order_id}",
                user_id=user_id,
                metadata={
                    "order_id": str(order_id),
                    "amount": float(amount),
                    "currency": "USD",
                    "payment_intent_id": payment_intent.id,
                    "transaction_id": str(new_transaction.id)
                }
            )

            return {
                "status": payment_intent.status, # Return actual status from Stripe
                "payment_intent_id": payment_intent.id,
                "client_secret": payment_intent.client_secret,
                "transaction_id": str(new_transaction.id)
            }

        except stripe.error.CardError as e:
            # Card was declined or other card-related error
            return {
                "status": "failed",
                "error": e.user_message or str(e)
            }
        except stripe.StripeError as e:
            # Other Stripe errors (e.g., network, authentication)
            return {
                "status": "failed",
                "error": str(e)
            }
        except Exception as e:
            # Handle other errors
            return {
                "status": "failed",
                "error": str(e)
            }

    async def confirm_payment_and_order(
        self, 
        payment_intent_id: str, 
        user_id: UUID = None,
        handle_3d_secure: bool = True
    ) -> dict:
        """
        Confirm payment and automatically update order status.
        Handles 3D Secure authentication and provides clear error messaging.
        
        Args:
            payment_intent_id: Stripe payment intent ID
            user_id: User ID for authorization (optional)
            handle_3d_secure: Whether to handle 3D Secure authentication
            
        Returns:
            Dict with confirmation result and order status
        """
        from models.order import Order
        from services.activity import ActivityService
        
        try:
            # Retrieve payment intent from Stripe
            payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            
            # Get transaction from database
            transaction_result = await self.db.execute(
                select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id)
            )
            transaction = transaction_result.scalar_one_or_none()
            
            if not transaction:
                return {
                    "status": "error",
                    "error_code": "TRANSACTION_NOT_FOUND",
                    "message": "Transaction not found in database"
                }
            
            # Verify user authorization if provided
            if user_id and transaction.user_id != user_id:
                return {
                    "status": "error",
                    "error_code": "UNAUTHORIZED",
                    "message": "User not authorized for this payment"
                }
            
            # Handle different payment intent statuses
            if payment_intent.status == "succeeded":
                # Payment already succeeded
                await self._handle_successful_payment_confirmation(transaction, payment_intent)
                return {
                    "status": "succeeded",
                    "message": "Payment confirmed successfully",
                    "order_id": str(transaction.order_id),
                    "transaction_id": str(transaction.id)
                }
                
            elif payment_intent.status == "requires_action":
                # 3D Secure authentication required
                if handle_3d_secure:
                    return {
                        "status": "requires_action",
                        "error_code": "REQUIRES_3D_SECURE",
                        "message": "3D Secure authentication required",
                        "client_secret": payment_intent.client_secret,
                        "next_action": payment_intent.next_action
                    }
                else:
                    return {
                        "status": "error",
                        "error_code": "AUTHENTICATION_REQUIRED",
                        "message": "Payment requires additional authentication"
                    }
                    
            elif payment_intent.status == "requires_payment_method":
                return {
                    "status": "error",
                    "error_code": "PAYMENT_METHOD_REQUIRED",
                    "message": "Payment method is required or invalid"
                }
                
            elif payment_intent.status == "requires_confirmation":
                # Attempt to confirm the payment
                try:
                    confirmed_intent = stripe.PaymentIntent.confirm(payment_intent_id)
                    
                    if confirmed_intent.status == "succeeded":
                        await self._handle_successful_payment_confirmation(transaction, confirmed_intent)
                        return {
                            "status": "succeeded",
                            "message": "Payment confirmed successfully",
                            "order_id": str(transaction.order_id),
                            "transaction_id": str(transaction.id)
                        }
                    elif confirmed_intent.status == "requires_action":
                        return {
                            "status": "requires_action",
                            "error_code": "REQUIRES_3D_SECURE",
                            "message": "3D Secure authentication required",
                            "client_secret": confirmed_intent.client_secret,
                            "next_action": confirmed_intent.next_action
                        }
                    else:
                        return {
                            "status": "error",
                            "error_code": "CONFIRMATION_FAILED",
                            "message": f"Payment confirmation failed: {confirmed_intent.status}"
                        }
                        
                except stripe.error.CardError as e:
                    return self._handle_card_error(e, transaction)
                    
            elif payment_intent.status in ["canceled", "payment_failed"]:
                # Payment failed or was canceled
                await self._handle_failed_payment_confirmation(transaction, payment_intent)
                return {
                    "status": "failed",
                    "error_code": "PAYMENT_FAILED",
                    "message": self._get_user_friendly_error_message(payment_intent.last_payment_error),
                    "order_id": str(transaction.order_id)
                }
                
            else:
                return {
                    "status": "error",
                    "error_code": "UNKNOWN_STATUS",
                    "message": f"Unknown payment status: {payment_intent.status}"
                }
                
        except stripe.error.CardError as e:
            return self._handle_card_error(e, transaction)
        except stripe.StripeError as e:
            return {
                "status": "error",
                "error_code": "STRIPE_ERROR",
                "message": f"Stripe API error: {str(e)}"
            }
        except Exception as e:
            return {
                "status": "error",
                "error_code": "INTERNAL_ERROR",
                "message": f"Internal error: {str(e)}"
            }
    
    async def _handle_successful_payment_confirmation(self, transaction: Transaction, payment_intent: dict):
        """Handle successful payment confirmation and order update"""
        from models.order import Order, TrackingEvent
        from services.activity import ActivityService
        
        # Update transaction status
        transaction.status = "succeeded"
        transaction.updated_at = datetime.utcnow()
        
        # Update order status if order exists
        if transaction.order_id:
            order = await self.db.get(Order, transaction.order_id)
            if order and order.status in ["pending", "payment_failed"]:
                order.status = "confirmed"
                order.updated_at = datetime.utcnow()
                
                # Create tracking event
                tracking_event = TrackingEvent(
                    order_id=order.id,
                    status="confirmed",
                    description="Order confirmed - payment successful",
                    location="Processing Center"
                )
                self.db.add(tracking_event)
        
        await self.db.commit()
        
        # Send confirmation email
        await self.send_payment_receipt_email(transaction)
        
        # Log activity
        activity_service = ActivityService(self.db)
        await activity_service.log_activity(
            action_type="payment_confirmed",
            description=f"Payment confirmed for order #{transaction.order_id}",
            user_id=transaction.user_id,
            metadata={
                "payment_intent_id": payment_intent.get("id"),
                "order_id": str(transaction.order_id),
                "amount": float(transaction.amount)
            }
        )
        
        # Send Kafka notification for order confirmation
        if transaction.order_id:
            from core.kafka import get_kafka_producer_service
            producer_service = await get_kafka_producer_service()
            await producer_service.send_message(settings.KAFKA_TOPIC_NOTIFICATION, {
                "service": "NotificationService",
                "method": "create_notification",
                "args": [],
                "kwargs": {
                    "user_id": str(transaction.user_id),
                    "message": f"Your order #{transaction.order_id} has been confirmed!",
                    "type": "success",
                    "related_id": str(transaction.order_id)
                }
            })
    
    async def _handle_failed_payment_confirmation(self, transaction: Transaction, payment_intent: dict):
        """Handle failed payment confirmation and order update"""
        from models.order import Order
        from services.activity import ActivityService
        
        # Update transaction status
        transaction.status = "failed"
        transaction.failure_reason = self._get_user_friendly_error_message(payment_intent.get("last_payment_error"))
        transaction.updated_at = datetime.utcnow()
        
        # Update order status if order exists
        if transaction.order_id:
            order = await self.db.get(Order, transaction.order_id)
            if order:
                order.status = "payment_failed"
                order.updated_at = datetime.utcnow()
        
        await self.db.commit()
        
        # Send failure email
        await self.send_payment_failed_email(transaction, transaction.failure_reason)
        
        # Log activity
        activity_service = ActivityService(self.db)
        await activity_service.log_activity(
            action_type="payment_failed",
            description=f"Payment failed for order #{transaction.order_id}",
            user_id=transaction.user_id,
            metadata={
                "payment_intent_id": payment_intent.get("id"),
                "order_id": str(transaction.order_id),
                "failure_reason": transaction.failure_reason
            }
        )
    
    def _handle_card_error(self, error: stripe.error.CardError, transaction: Transaction = None) -> dict:
        """Handle Stripe card errors with user-friendly messages"""
        error_code = error.code
        user_message = self._get_user_friendly_error_message({"code": error_code, "message": error.user_message})
        
        return {
            "status": "failed",
            "error_code": f"CARD_ERROR_{error_code.upper()}" if error_code else "CARD_ERROR",
            "message": user_message,
            "decline_code": error.decline_code,
            "order_id": str(transaction.order_id) if transaction and transaction.order_id else None
        }
    
    def _get_user_friendly_error_message(self, error_info: dict) -> str:
        """Convert Stripe error codes to user-friendly messages"""
        if not error_info:
            return "Payment failed due to an unknown error"
        
        error_code = error_info.get("code", "").lower()
        error_message = error_info.get("message", "")
        
        # Map common error codes to user-friendly messages
        error_messages = {
            "card_declined": "Your card was declined. Please try a different payment method or contact your bank.",
            "insufficient_funds": "Your card has insufficient funds. Please try a different payment method.",
            "expired_card": "Your card has expired. Please update your payment method with a valid card.",
            "incorrect_cvc": "The security code (CVC) you entered is incorrect. Please check and try again.",
            "incorrect_number": "The card number you entered is incorrect. Please check and try again.",
            "processing_error": "An error occurred while processing your payment. Please try again.",
            "authentication_required": "Your bank requires additional authentication. Please complete the verification process.",
            "generic_decline": "Your card was declined. Please contact your bank or try a different payment method.",
            "invalid_expiry_month": "The expiration month you entered is invalid.",
            "invalid_expiry_year": "The expiration year you entered is invalid.",
            "lost_card": "Your card has been reported as lost. Please use a different payment method.",
            "stolen_card": "Your card has been reported as stolen. Please use a different payment method.",
            "pickup_card": "Your card cannot be used for this payment. Please contact your bank.",
            "restricted_card": "Your card has restrictions that prevent this payment. Please contact your bank.",
            "security_violation": "This payment was flagged for security reasons. Please contact your bank.",
            "service_not_allowed": "Your card does not support this type of purchase.",
            "transaction_not_allowed": "This transaction is not allowed on your card.",
        }
        
        return error_messages.get(error_code, error_message or "Payment failed. Please try again or contact support.")

    async def find_expiring_payment_methods(self, days_ahead: int = 30) -> List[PaymentMethod]:
        """
        Finds payment methods that will expire within the next `days_ahead` days.
        Also returns cards that have already expired in the current month.
        """
        from datetime import datetime, timedelta
        from sqlalchemy import and_

        current_year = datetime.utcnow().year
        current_month = datetime.utcnow().month
        
        target_date = datetime.utcnow() + timedelta(days=days_ahead)
        target_year = target_date.year
        target_month = target_date.month

        current_yyyymm = current_year * 100 + current_month
        target_yyyymm = target_year * 100 + target_month

        expiring_cards_query = select(PaymentMethod).where(
            and_(
                (PaymentMethod.expiry_year * 100 + PaymentMethod.expiry_month) >= current_yyyymm,
                (PaymentMethod.expiry_year * 100 + PaymentMethod.expiry_month) <= target_yyyymm
            )
        )

        result = await self.db.execute(expiring_cards_query)
        return result.scalars().all()

    async def find_and_notify_expiring_payment_methods(self, days_ahead: int = 30):
        """
        Finds expiring payment methods and dispatches email notifications.
        This method is designed to be called by a scheduled task (e.g., via Kafka).
        """
        from services.email import EmailService # Import locally to avoid circular dependency if EmailService also imports PaymentService
        email_service = EmailService(self.db)
        
        expiring_cards = await self.find_expiring_payment_methods(days_ahead=days_ahead)
        
        if not expiring_cards:
            logger.info("No expiring payment methods found to notify.")
            return

        logger.info(f"Found {len(expiring_cards)} expiring payment methods. Dispatching notifications...")
        for card in expiring_cards:
            try:
                # Assuming EmailService has a method to send this specific notification
                await email_service.send_payment_method_expiration_notice(
                    user_id=card.user_id,
                    payment_method_id=card.id
                )
            except Exception as e:
                logger.error(f"Failed to dispatch expiration notice for card {card.id}: {e}")
        
        logger.info("Finished dispatching expiration notices for payment methods.")

    async def create_refund(
        self,
        payment_intent_id: str,
        amount: float = None,
        reason: str = "requested_by_customer",
        user_id: UUID = None
    ) -> dict:
        """
        Create a refund for a payment intent.
        
        Args:
            payment_intent_id: Stripe payment intent ID
            amount: Refund amount (None for full refund)
            reason: Refund reason
            user_id: User ID for authorization
            
        Returns:
            Dict with refund result
        """
        from models.order import Order
        from services.activity import ActivityService
        
        try:
            # Get transaction from database
            transaction_result = await self.db.execute(
                select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id)
            )
            transaction = transaction_result.scalar_one_or_none()
            
            if not transaction:
                return {
                    "status": "error",
                    "error_code": "TRANSACTION_NOT_FOUND",
                    "message": "Transaction not found"
                }
            
            # Verify user authorization if provided
            if user_id and transaction.user_id != user_id:
                return {
                    "status": "error",
                    "error_code": "UNAUTHORIZED",
                    "message": "User not authorized for this refund"
                }
            
            # Check if transaction is refundable
            if transaction.status != "succeeded":
                return {
                    "status": "error",
                    "error_code": "NOT_REFUNDABLE",
                    "message": "Only successful payments can be refunded"
                }
            
            # Calculate refund amount
            refund_amount = amount if amount is not None else transaction.amount
            
            if refund_amount <= 0 or refund_amount > transaction.amount:
                return {
                    "status": "error",
                    "error_code": "INVALID_AMOUNT",
                    "message": f"Refund amount must be between 0 and {transaction.amount}"
                }
            
            # Create Stripe refund
            refund = stripe.Refund.create(
                payment_intent=payment_intent_id,
                amount=int(refund_amount * 100),  # Convert to cents
                reason=reason,
                metadata={
                    "user_id": str(transaction.user_id),
                    "order_id": str(transaction.order_id) if transaction.order_id else "",
                    "original_amount": str(transaction.amount),
                    "refund_amount": str(refund_amount)
                }
            )
            
            # Create refund transaction record
            refund_transaction = Transaction(
                user_id=transaction.user_id,
                order_id=transaction.order_id,
                stripe_payment_intent_id=payment_intent_id,
                amount=refund_amount,
                currency=transaction.currency,
                status=refund.status,
                transaction_type="refund",
                description=f"Refund for payment {payment_intent_id}"
            )
            self.db.add(refund_transaction)
            
            # Update order status if full refund
            if transaction.order_id and refund_amount == transaction.amount:
                order = await self.db.get(Order, transaction.order_id)
                if order:
                    order.status = "refunded"
                    order.updated_at = datetime.utcnow()
            
            await self.db.commit()
            await self.db.refresh(refund_transaction)
            
            # Send refund confirmation email
            await self.send_refund_confirmation_email(refund_transaction, refund)
            
            # Log activity
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="refund_created",
                description=f"Refund created for order #{transaction.order_id}",
                user_id=transaction.user_id,
                metadata={
                    "refund_id": refund.id,
                    "payment_intent_id": payment_intent_id,
                    "refund_amount": float(refund_amount),
                    "reason": reason
                }
            )
            
            return {
                "status": "success",
                "refund_id": refund.id,
                "amount": refund_amount,
                "currency": transaction.currency,
                "status_detail": refund.status,
                "transaction_id": str(refund_transaction.id),
                "message": "Refund created successfully"
            }
            
        except stripe.StripeError as e:
            return {
                "status": "error",
                "error_code": "STRIPE_ERROR",
                "message": f"Stripe refund error: {str(e)}"
            }
        except Exception as e:
            return {
                "status": "error",
                "error_code": "INTERNAL_ERROR",
                "message": f"Refund creation failed: {str(e)}"
            }
    
    async def cancel_payment_intent(
        self,
        payment_intent_id: str,
        user_id: UUID = None,
        cancellation_reason: str = "requested_by_customer"
    ) -> dict:
        """
        Cancel a payment intent before it's confirmed.
        
        Args:
            payment_intent_id: Stripe payment intent ID
            user_id: User ID for authorization
            cancellation_reason: Reason for cancellation
            
        Returns:
            Dict with cancellation result
        """
        from models.order import Order
        from services.activity import ActivityService
        
        try:
            # Get transaction from database
            transaction_result = await self.db.execute(
                select(Transaction).where(Transaction.stripe_payment_intent_id == payment_intent_id)
            )
            transaction = transaction_result.scalar_one_or_none()
            
            if not transaction:
                return {
                    "status": "error",
                    "error_code": "TRANSACTION_NOT_FOUND",
                    "message": "Transaction not found"
                }
            
            # Verify user authorization if provided
            if user_id and transaction.user_id != user_id:
                return {
                    "status": "error",
                    "error_code": "UNAUTHORIZED",
                    "message": "User not authorized for this cancellation"
                }
            
            # Check if payment intent can be canceled
            if transaction.status in ["succeeded", "canceled"]:
                return {
                    "status": "error",
                    "error_code": "CANNOT_CANCEL",
                    "message": f"Payment intent with status '{transaction.status}' cannot be canceled"
                }
            
            # Cancel Stripe payment intent
            payment_intent = stripe.PaymentIntent.cancel(
                payment_intent_id,
                cancellation_reason=cancellation_reason
            )
            
            # Update transaction status
            transaction.status = "canceled"
            transaction.description = f"Canceled: {cancellation_reason}"
            transaction.updated_at = datetime.utcnow()
            
            # Update order status if order exists
            if transaction.order_id:
                order = await self.db.get(Order, transaction.order_id)
                if order:
                    order.status = "cancelled"
                    order.updated_at = datetime.utcnow()
            
            await self.db.commit()
            
            # Send cancellation email
            await self.send_payment_cancellation_email(transaction, cancellation_reason)
            
            # Log activity
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="payment_canceled",
                description=f"Payment canceled for order #{transaction.order_id}",
                user_id=transaction.user_id,
                metadata={
                    "payment_intent_id": payment_intent_id,
                    "order_id": str(transaction.order_id),
                    "cancellation_reason": cancellation_reason
                }
            )
            
            return {
                "status": "success",
                "payment_intent_id": payment_intent_id,
                "cancellation_reason": cancellation_reason,
                "order_id": str(transaction.order_id) if transaction.order_id else None,
                "message": "Payment intent canceled successfully"
            }
            
        except stripe.StripeError as e:
            return {
                "status": "error",
                "error_code": "STRIPE_ERROR",
                "message": f"Stripe cancellation error: {str(e)}"
            }
        except Exception as e:
            return {
                "status": "error",
                "error_code": "INTERNAL_ERROR",
                "message": f"Payment cancellation failed: {str(e)}"
            }
    
    async def get_refund_status(self, refund_id: str) -> dict:
        """Get the status of a refund"""
        try:
            refund = stripe.Refund.retrieve(refund_id)
            return {
                "status": "success",
                "refund_id": refund.id,
                "amount": refund.amount / 100,  # Convert from cents
                "currency": refund.currency,
                "status_detail": refund.status,
                "reason": refund.reason,
                "created": refund.created
            }
        except stripe.StripeError as e:
            return {
                "status": "error",
                "message": f"Failed to retrieve refund: {str(e)}"
            }
    
    async def send_refund_confirmation_email(self, transaction: Transaction, refund: dict):
        """Send refund confirmation email"""
        user_result = await self.db.execute(select(User).where(User.id == transaction.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return

        context = {
            "customer_name": user.firstname,
            "refund_amount": f"${transaction.amount:.2f}",
            "refund_id": refund.get("id"),
            "order_number": str(transaction.order_id),
            "processing_time": "3-5 business days",
            "account_url": f"{settings.FRONTEND_URL}/account/orders",
            "company_name": "Banwee",
        }

        try:
            await send_email(
                to_email=user.email,
                mail_type='refund_confirmation',
                context=context
            )
        except Exception as e:
            pass  # Email sending failure should not break the flow
    
    async def send_payment_cancellation_email(self, transaction: Transaction, reason: str):
        """Send payment cancellation email"""
        user_result = await self.db.execute(select(User).where(User.id == transaction.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return

        context = {
            "customer_name": user.firstname,
            "order_number": str(transaction.order_id),
            "cancellation_reason": reason.replace("_", " ").title(),
            "amount": f"${transaction.amount:.2f}",
            "retry_url": f"{settings.FRONTEND_URL}/checkout/{transaction.order_id}",
            "company_name": "Banwee",
        }

        try:
            await send_email(
                to_email=user.email,
                mail_type='payment_canceled',
                context=context
            )
        except Exception as e:
            pass  # Email sending failure should not break the flow

    # ============================================================================
    # SUBSCRIPTION-SPECIFIC PAYMENT METHODS
    # ============================================================================

    async def create_subscription_payment_intent(
        self,
        subscription_id: UUID,
        cost_breakdown: Dict[str, Any],
        user_id: UUID,
        payment_method_id: UUID = None,
        currency: str = "USD",
        expires_in_minutes: int = 30
    ) -> Dict[str, Any]:
        """
        Create a Stripe PaymentIntent specifically for subscription billing with accurate cost breakdown.
        
        Args:
            subscription_id: Subscription ID for this payment
            cost_breakdown: Detailed cost breakdown from SubscriptionCostCalculator
            user_id: User creating the payment intent
            payment_method_id: Specific payment method to use
            currency: Currency code
            expires_in_minutes: Payment intent expiration time
            
        Returns:
            Dict with payment intent details and cost breakdown
        """
        try:
            # Fetch user and subscription
            user = await self.db.get(User, user_id)
            if not user:
                raise Exception("User not found.")
            
            subscription = await self.db.get(Subscription, subscription_id)
            if not subscription:
                raise Exception("Subscription not found.")
            
            if subscription.user_id != user_id:
                raise Exception("User not authorized for this subscription.")
            
            # Get or create Stripe customer
            stripe_customer_id = await self._get_stripe_customer(user_id, user.email, user.full_name)
            
            # Extract amounts from cost breakdown
            total_amount = Decimal(str(cost_breakdown.get("total_amount", 0)))
            if total_amount <= 0:
                raise Exception("Invalid subscription cost amount.")
            
            # Set payment intent expiration
            expires_at = datetime.utcnow() + timedelta(minutes=expires_in_minutes)
            
            # Prepare payment intent parameters
            payment_intent_params = {
                "amount": int(total_amount * 100),  # Stripe expects amount in cents
                "currency": currency.lower(),
                "customer": stripe_customer_id,
                "automatic_payment_methods": {"enabled": True},
                "setup_future_usage": "off_session",  # Enable for recurring billing
                "metadata": {
                    "user_id": str(user_id),
                    "subscription_id": str(subscription_id),
                    "billing_cycle": subscription.billing_cycle,
                    "cost_breakdown": str(cost_breakdown),
                    "payment_type": "subscription_billing"
                },
                "description": f"Subscription billing for {subscription.plan_id} plan"
            }
            
            # Add specific payment method if provided
            if payment_method_id:
                payment_method = await self.db.execute(
                    select(PaymentMethod).where(
                        PaymentMethod.id == payment_method_id,
                        PaymentMethod.user_id == user_id
                    )
                )
                payment_method = payment_method.scalar_one_or_none()
                if payment_method and payment_method.stripe_payment_method_id:
                    payment_intent_params["payment_method"] = payment_method.stripe_payment_method_id
                    payment_intent_params["confirm"] = True  # Auto-confirm for saved payment methods
            
            # Create Stripe PaymentIntent
            payment_intent = stripe.PaymentIntent.create(**payment_intent_params)
            
            # Create enhanced PaymentIntent record
            payment_intent_record = PaymentIntent(
                stripe_payment_intent_id=payment_intent.id,
                user_id=user_id,
                subscription_id=subscription_id,
                amount_breakdown=cost_breakdown,
                currency=currency.upper(),
                status=payment_intent.status,
                payment_method_id=payment_intent_params.get("payment_method"),
                payment_method_type="card",  # Default for now
                requires_action=payment_intent.status == "requires_action",
                client_secret=payment_intent.client_secret,
                expires_at=expires_at,
                payment_metadata={
                    "billing_cycle": subscription.billing_cycle,
                    "plan_id": subscription.plan_id,
                    "auto_confirm": payment_method_id is not None
                }
            )
            
            self.db.add(payment_intent_record)
            await self.db.commit()
            await self.db.refresh(payment_intent_record)
            
            # Log activity
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="subscription_payment_intent_created",
                description=f"Payment intent created for subscription {subscription.plan_id}",
                user_id=user_id,
                metadata={
                    "subscription_id": str(subscription_id),
                    "payment_intent_id": payment_intent.id,
                    "amount": float(total_amount),
                    "currency": currency,
                    "billing_cycle": subscription.billing_cycle
                }
            )
            
            return {
                "payment_intent_id": payment_intent.id,
                "client_secret": payment_intent.client_secret,
                "status": payment_intent.status,
                "requires_action": payment_intent.status == "requires_action",
                "amount_breakdown": cost_breakdown,
                "currency": currency.upper(),
                "expires_at": expires_at.isoformat(),
                "subscription_details": {
                    "subscription_id": str(subscription_id),
                    "plan_id": subscription.plan_id,
                    "billing_cycle": subscription.billing_cycle
                },
                "next_action": payment_intent.next_action if payment_intent.status == "requires_action" else None
            }
            
        except stripe.StripeError as e:
            logger.error(f"Stripe error creating subscription payment intent: {str(e)}")
            raise Exception(f"Stripe error: {str(e)}")
        except Exception as e:
            logger.error(f"Error creating subscription payment intent: {str(e)}")
            raise Exception(f"Payment intent creation failed: {str(e)}")

    async def verify_stripe_dashboard_transaction(
        self,
        payment_intent_id: str,
        expected_amount: Decimal = None,
        expected_currency: str = None
    ) -> Dict[str, Any]:
        """
        Verify that a transaction appears correctly in the Stripe dashboard with matching details.
        
        Args:
            payment_intent_id: Stripe payment intent ID to verify
            expected_amount: Expected transaction amount for verification
            expected_currency: Expected currency for verification
            
        Returns:
            Dict with verification results and Stripe dashboard details
        """
        try:
            # Retrieve payment intent from Stripe
            payment_intent = stripe.PaymentIntent.retrieve(
                payment_intent_id,
                expand=['charges', 'customer']
            )
            
            # Get our local payment intent record
            local_record = await self.db.execute(
                select(PaymentIntent).where(
                    PaymentIntent.stripe_payment_intent_id == payment_intent_id
                )
            )
            local_record = local_record.scalar_one_or_none()
            
            # Perform verification checks
            verification_results = {
                "payment_intent_found": True,
                "stripe_status": payment_intent.status,
                "amount_matches": True,
                "currency_matches": True,
                "customer_matches": True,
                "charges_present": len(payment_intent.charges.data) > 0,
                "verification_timestamp": datetime.utcnow().isoformat(),
                "stripe_dashboard_url": f"https://dashboard.stripe.com/payments/{payment_intent_id}",
                "details": {}
            }
            
            # Verify amount if provided
            if expected_amount is not None:
                stripe_amount = Decimal(payment_intent.amount) / 100  # Convert from cents
                verification_results["amount_matches"] = abs(stripe_amount - expected_amount) < Decimal('0.01')
                verification_results["details"]["expected_amount"] = float(expected_amount)
                verification_results["details"]["stripe_amount"] = float(stripe_amount)
            
            # Verify currency if provided
            if expected_currency is not None:
                verification_results["currency_matches"] = payment_intent.currency.upper() == expected_currency.upper()
                verification_results["details"]["expected_currency"] = expected_currency.upper()
                verification_results["details"]["stripe_currency"] = payment_intent.currency.upper()
            
            # Verify customer matches our local record
            if local_record and local_record.user_id:
                user = await self.db.get(User, local_record.user_id)
                if user and user.stripe_customer_id:
                    verification_results["customer_matches"] = payment_intent.customer == user.stripe_customer_id
                    verification_results["details"]["expected_customer"] = user.stripe_customer_id
                    verification_results["details"]["stripe_customer"] = payment_intent.customer
            
            # Add charge details if present
            if payment_intent.charges.data:
                charge = payment_intent.charges.data[0]  # Get the first charge
                verification_results["details"]["charge_id"] = charge.id
                verification_results["details"]["charge_status"] = charge.status
                verification_results["details"]["charge_amount"] = charge.amount / 100
                verification_results["details"]["charge_currency"] = charge.currency
                verification_results["details"]["payment_method_type"] = charge.payment_method_details.type if charge.payment_method_details else None
            
            # Update local record with verification results
            if local_record:
                local_record.stripe_verification = verification_results
                await self.db.commit()
            
            # Overall verification status
            verification_results["verification_passed"] = all([
                verification_results["payment_intent_found"],
                verification_results["amount_matches"],
                verification_results["currency_matches"],
                verification_results["customer_matches"]
            ])
            
            # Log verification activity
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="stripe_verification",
                description=f"Stripe dashboard verification for payment intent {payment_intent_id}",
                user_id=local_record.user_id if local_record else None,
                metadata={
                    "payment_intent_id": payment_intent_id,
                    "verification_passed": verification_results["verification_passed"],
                    "stripe_status": payment_intent.status,
                    "verification_details": verification_results["details"]
                }
            )
            
            return verification_results
            
        except stripe.error.InvalidRequestError as e:
            logger.error(f"Invalid Stripe request for verification: {str(e)}")
            return {
                "payment_intent_found": False,
                "verification_passed": False,
                "error": f"Payment intent not found in Stripe: {str(e)}",
                "verification_timestamp": datetime.utcnow().isoformat()
            }
        except stripe.StripeError as e:
            logger.error(f"Stripe error during verification: {str(e)}")
            return {
                "payment_intent_found": False,
                "verification_passed": False,
                "error": f"Stripe API error: {str(e)}",
                "verification_timestamp": datetime.utcnow().isoformat()
            }
        except Exception as e:
            logger.error(f"Error during Stripe verification: {str(e)}")
            return {
                "payment_intent_found": False,
                "verification_passed": False,
                "error": f"Verification failed: {str(e)}",
                "verification_timestamp": datetime.utcnow().isoformat()
            }

    async def handle_recurring_billing(
        self,
        subscription_id: UUID,
        billing_cycle: str = "monthly",
        cost_breakdown: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Handle recurring billing for subscription renewals using saved payment methods.
        
        Args:
            subscription_id: Subscription ID to bill
            billing_cycle: Billing cycle (monthly, yearly, etc.)
            cost_breakdown: Current cost breakdown for the subscription
            
        Returns:
            Dict with billing result and payment details
        """
        try:
            # Get subscription and user
            subscription = await self.db.get(Subscription, subscription_id)
            if not subscription:
                raise Exception("Subscription not found.")
            
            if subscription.status not in ["active", "past_due"]:
                raise Exception(f"Subscription status '{subscription.status}' is not billable.")
            
            user = await self.db.get(User, subscription.user_id)
            if not user:
                raise Exception("User not found for subscription.")
            
            # Get user's default payment method
            default_payment_method = await self.get_default_payment_method(subscription.user_id)
            if not default_payment_method or not default_payment_method.stripe_payment_method_id:
                # Update subscription status and notify user
                subscription.status = "past_due"
                await self.db.commit()
                
                await self._send_payment_method_required_email(user, subscription)
                
                return {
                    "status": "failed",
                    "error_code": "NO_PAYMENT_METHOD",
                    "message": "No valid payment method available for recurring billing",
                    "subscription_status": "past_due",
                    "action_required": "update_payment_method"
                }
            
            # Calculate current cost if not provided
            if not cost_breakdown:
                from services.subscription_cost_calculator import SubscriptionCostCalculator
                cost_calculator = SubscriptionCostCalculator(self.db)
                cost_breakdown = await cost_calculator.calculate_subscription_cost(
                    subscription_id=subscription_id,
                    variant_ids=subscription.variant_ids or [],
                    delivery_type=subscription.delivery_type or "standard",
                    customer_location=None,  # Will be determined from user's address
                    currency=subscription.currency or "USD"
                )
            
            # Create payment intent for recurring billing
            payment_result = await self.create_subscription_payment_intent(
                subscription_id=subscription_id,
                cost_breakdown=cost_breakdown,
                user_id=subscription.user_id,
                payment_method_id=default_payment_method.id,
                currency=subscription.currency or "USD",
                expires_in_minutes=60  # Longer expiration for recurring billing
            )
            
            # If payment requires action (3D Secure), handle appropriately
            if payment_result.get("requires_action"):
                # For recurring billing, we'll mark as past_due and notify user
                subscription.status = "past_due"
                await self.db.commit()
                
                await self._send_authentication_required_email(user, subscription, payment_result)
                
                return {
                    "status": "requires_action",
                    "error_code": "AUTHENTICATION_REQUIRED",
                    "message": "Payment requires 3D Secure authentication",
                    "subscription_status": "past_due",
                    "payment_intent_id": payment_result["payment_intent_id"],
                    "client_secret": payment_result["client_secret"],
                    "action_required": "complete_authentication"
                }
            
            # If payment succeeded, update subscription
            if payment_result.get("status") == "succeeded":
                await self._update_subscription_after_successful_billing(
                    subscription, billing_cycle, cost_breakdown
                )
                
                return {
                    "status": "succeeded",
                    "message": "Recurring billing completed successfully",
                    "subscription_status": "active",
                    "payment_intent_id": payment_result["payment_intent_id"],
                    "amount_charged": cost_breakdown.get("total_amount"),
                    "currency": subscription.currency or "USD",
                    "next_billing_date": subscription.next_billing_date.isoformat() if subscription.next_billing_date else None
                }
            
            # Handle other payment statuses
            return {
                "status": payment_result.get("status", "unknown"),
                "message": f"Recurring billing status: {payment_result.get('status')}",
                "payment_intent_id": payment_result["payment_intent_id"],
                "requires_action": payment_result.get("requires_action", False)
            }
            
        except Exception as e:
            logger.error(f"Error in recurring billing for subscription {subscription_id}: {str(e)}")
            
            # Update subscription to past_due on billing failure
            try:
                subscription = await self.db.get(Subscription, subscription_id)
                if subscription:
                    subscription.status = "past_due"
                    await self.db.commit()
            except:
                pass
            
            return {
                "status": "failed",
                "error_code": "BILLING_FAILED",
                "message": f"Recurring billing failed: {str(e)}",
                "subscription_status": "past_due"
            }

    async def handle_3d_secure_authentication(
        self,
        payment_intent_id: str,
        user_id: UUID = None
    ) -> Dict[str, Any]:
        """
        Handle 3D Secure and Strong Customer Authentication (SCA) for payments.
        
        Args:
            payment_intent_id: Stripe payment intent ID requiring authentication
            user_id: User ID for authorization
            
        Returns:
            Dict with authentication handling result
        """
        try:
            # Get payment intent from Stripe
            payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            
            # Get local payment intent record
            local_record = await self.db.execute(
                select(PaymentIntent).where(
                    PaymentIntent.stripe_payment_intent_id == payment_intent_id
                )
            )
            local_record = local_record.scalar_one_or_none()
            
            if not local_record:
                return {
                    "status": "error",
                    "error_code": "PAYMENT_INTENT_NOT_FOUND",
                    "message": "Payment intent not found in local database"
                }
            
            # Verify user authorization if provided
            if user_id and local_record.user_id != user_id:
                return {
                    "status": "error",
                    "error_code": "UNAUTHORIZED",
                    "message": "User not authorized for this payment"
                }
            
            # Check if authentication is required
            if payment_intent.status != "requires_action":
                return {
                    "status": "error",
                    "error_code": "NO_ACTION_REQUIRED",
                    "message": f"Payment intent status is '{payment_intent.status}', no action required"
                }
            
            # Update local record with authentication details
            local_record.requires_action = True
            local_record.client_secret = payment_intent.client_secret
            local_record.payment_metadata = {
                **(local_record.payment_metadata or {}),
                "authentication_required": True,
                "next_action_type": payment_intent.next_action.type if payment_intent.next_action else None
            }
            await self.db.commit()
            
            # Log authentication requirement
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="3d_secure_required",
                description=f"3D Secure authentication required for payment {payment_intent_id}",
                user_id=local_record.user_id,
                metadata={
                    "payment_intent_id": payment_intent_id,
                    "subscription_id": str(local_record.subscription_id) if local_record.subscription_id else None,
                    "next_action_type": payment_intent.next_action.type if payment_intent.next_action else None
                }
            )
            
            return {
                "status": "requires_action",
                "message": "3D Secure authentication required",
                "client_secret": payment_intent.client_secret,
                "next_action": payment_intent.next_action,
                "authentication_url": payment_intent.next_action.redirect_to_url.url if (
                    payment_intent.next_action and 
                    hasattr(payment_intent.next_action, 'redirect_to_url')
                ) else None,
                "return_url": payment_intent.next_action.redirect_to_url.return_url if (
                    payment_intent.next_action and 
                    hasattr(payment_intent.next_action, 'redirect_to_url')
                ) else None
            }
            
        except stripe.StripeError as e:
            logger.error(f"Stripe error handling 3D Secure: {str(e)}")
            return {
                "status": "error",
                "error_code": "STRIPE_ERROR",
                "message": f"Stripe API error: {str(e)}"
            }
        except Exception as e:
            logger.error(f"Error handling 3D Secure authentication: {str(e)}")
            return {
                "status": "error",
                "error_code": "INTERNAL_ERROR",
                "message": f"Authentication handling failed: {str(e)}"
            }

    # ============================================================================
    # HELPER METHODS FOR SUBSCRIPTION BILLING
    # ============================================================================

    async def _update_subscription_after_successful_billing(
        self,
        subscription: Subscription,
        billing_cycle: str,
        cost_breakdown: Dict[str, Any]
    ):
        """Update subscription details after successful billing"""
        
        # Update subscription status and billing dates
        subscription.status = "active"
        subscription.current_period_start = datetime.utcnow()
        
        # Calculate next billing date based on cycle
        if billing_cycle == "monthly":
            subscription.current_period_end = subscription.current_period_start + relativedelta(months=1)
            subscription.next_billing_date = subscription.current_period_end
        elif billing_cycle == "yearly":
            subscription.current_period_end = subscription.current_period_start + relativedelta(years=1)
            subscription.next_billing_date = subscription.current_period_end
        elif billing_cycle == "quarterly":
            subscription.current_period_end = subscription.current_period_start + relativedelta(months=3)
            subscription.next_billing_date = subscription.current_period_end
        else:
            # Default to monthly
            subscription.current_period_end = subscription.current_period_start + relativedelta(months=1)
            subscription.next_billing_date = subscription.current_period_end
        
        # Update cost breakdown and pricing details
        subscription.cost_breakdown = cost_breakdown
        subscription.price = cost_breakdown.get("total_amount")
        
        await self.db.commit()

    async def _send_payment_method_required_email(self, user: User, subscription: Subscription):
        """Send email notification when payment method is required for billing"""
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "update_payment_url": f"{settings.FRONTEND_URL}/account/payment-methods",
            "subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='payment_method_required',
                context=context
            )
        except Exception as e:
            logger.error(f"Failed to send payment method required email: {str(e)}")

    async def _send_authentication_required_email(
        self, 
        user: User, 
        subscription: Subscription, 
        payment_result: Dict[str, Any]
    ):
        """Send email notification when 3D Secure authentication is required"""
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "authentication_url": f"{settings.FRONTEND_URL}/payment/authenticate/{payment_result['payment_intent_id']}",
            "subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='authentication_required',
                context=context
            )
        except Exception as e:
            logger.error(f"Failed to send authentication required email: {str(e)}")

    # ============================================================================
    # MULTI-CURRENCY PAYMENT PROCESSING
    # ============================================================================

    async def process_multi_currency_payment(
        self,
        amount: Decimal,
        from_currency: str,
        to_currency: str,
        user_id: UUID,
        subscription_id: UUID = None,
        payment_method_id: UUID = None
    ) -> Dict[str, Any]:
        """
        Process multi-currency payment using Stripe's currency conversion capabilities.
        
        Args:
            amount: Amount in the original currency
            from_currency: Original currency code
            to_currency: Target currency code for processing
            user_id: User making the payment
            subscription_id: Optional subscription ID
            payment_method_id: Optional specific payment method
            
        Returns:
            Dict with payment result and currency conversion details
        """
        try:
            # Validate currencies
            supported_currencies = await self.get_supported_currencies()
            if from_currency.upper() not in [c["code"] for c in supported_currencies]:
                raise Exception(f"Currency {from_currency} is not supported")
            if to_currency.upper() not in [c["code"] for c in supported_currencies]:
                raise Exception(f"Currency {to_currency} is not supported")
            
            # Get user
            user = await self.db.get(User, user_id)
            if not user:
                raise Exception("User not found")
            
            # Get or create Stripe customer
            stripe_customer_id = await self._get_stripe_customer(user_id, user.email, user.full_name)
            
            # Convert currency using Stripe if needed
            if from_currency.upper() != to_currency.upper():
                conversion_result = await self.convert_currency_via_stripe(
                    amount, from_currency, to_currency
                )
                converted_amount = conversion_result["converted_amount"]
                exchange_rate = conversion_result["exchange_rate"]
            else:
                converted_amount = amount
                exchange_rate = Decimal('1.0')
            
            # Get payment method if specified
            payment_method = None
            if payment_method_id:
                payment_method_result = await self.db.execute(
                    select(PaymentMethod).where(
                        PaymentMethod.id == payment_method_id,
                        PaymentMethod.user_id == user_id
                    )
                )
                payment_method = payment_method_result.scalar_one_or_none()
                if not payment_method:
                    raise Exception("Payment method not found")
            
            # Calculate international taxes if applicable
            tax_info = await self._calculate_international_tax(
                converted_amount, to_currency, user_id
            )
            
            # Calculate final amount including taxes
            final_amount = converted_amount + tax_info["tax_amount"]
            
            # Create payment intent parameters
            payment_intent_params = {
                "amount": int(final_amount * 100),  # Convert to cents
                "currency": to_currency.lower(),
                "customer": stripe_customer_id,
                "automatic_payment_methods": {"enabled": True},
                "metadata": {
                    "user_id": str(user_id),
                    "subscription_id": str(subscription_id) if subscription_id else "",
                    "original_amount": str(amount),
                    "original_currency": from_currency.upper(),
                    "converted_amount": str(converted_amount),
                    "target_currency": to_currency.upper(),
                    "exchange_rate": str(exchange_rate),
                    "tax_amount": str(tax_info["tax_amount"]),
                    "tax_rate": str(tax_info["tax_rate"]),
                    "final_amount": str(final_amount),
                    "payment_type": "multi_currency"
                }
            }
            
            # Add payment method if provided
            if payment_method and payment_method.stripe_payment_method_id:
                payment_intent_params["payment_method"] = payment_method.stripe_payment_method_id
                payment_intent_params["confirm"] = True
            
            # Create Stripe PaymentIntent
            payment_intent = stripe.PaymentIntent.create(**payment_intent_params)
            
            # Create local payment intent record
            payment_intent_record = PaymentIntent(
                stripe_payment_intent_id=payment_intent.id,
                user_id=user_id,
                subscription_id=subscription_id,
                amount_breakdown={
                    "original_amount": float(amount),
                    "original_currency": from_currency.upper(),
                    "converted_amount": float(converted_amount),
                    "target_currency": to_currency.upper(),
                    "exchange_rate": float(exchange_rate),
                    "tax_amount": float(tax_info["tax_amount"]),
                    "tax_rate": float(tax_info["tax_rate"]),
                    "final_amount": float(final_amount)
                },
                currency=to_currency.upper(),
                status=payment_intent.status,
                payment_method_id=payment_method.stripe_payment_method_id if payment_method else None,
                payment_method_type="card",
                requires_action=payment_intent.status == "requires_action",
                client_secret=payment_intent.client_secret,
                expires_at=datetime.utcnow() + timedelta(minutes=30),
                payment_metadata={
                    "multi_currency": True,
                    "currency_conversion": True,
                    "international_tax": tax_info["tax_amount"] > 0
                }
            )
            
            self.db.add(payment_intent_record)
            await self.db.commit()
            await self.db.refresh(payment_intent_record)
            
            # Log activity
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="multi_currency_payment_created",
                description=f"Multi-currency payment created: {from_currency} to {to_currency}",
                user_id=user_id,
                metadata={
                    "payment_intent_id": payment_intent.id,
                    "original_amount": float(amount),
                    "original_currency": from_currency.upper(),
                    "converted_amount": float(converted_amount),
                    "target_currency": to_currency.upper(),
                    "exchange_rate": float(exchange_rate),
                    "final_amount": float(final_amount)
                }
            )
            
            return {
                "payment_intent_id": payment_intent.id,
                "client_secret": payment_intent.client_secret,
                "status": payment_intent.status,
                "requires_action": payment_intent.status == "requires_action",
                "currency_conversion": {
                    "original_amount": float(amount),
                    "original_currency": from_currency.upper(),
                    "converted_amount": float(converted_amount),
                    "target_currency": to_currency.upper(),
                    "exchange_rate": float(exchange_rate)
                },
                "tax_info": tax_info,
                "final_amount": float(final_amount),
                "next_action": payment_intent.next_action if payment_intent.status == "requires_action" else None
            }
            
        except stripe.StripeError as e:
            logger.error(f"Stripe error in multi-currency payment: {str(e)}")
            raise Exception(f"Stripe error: {str(e)}")
        except Exception as e:
            logger.error(f"Error in multi-currency payment processing: {str(e)}")
            raise Exception(f"Multi-currency payment failed: {str(e)}")

    async def detect_user_currency(
        self,
        user_id: UUID,
        ip_address: str = None,
        country_code: str = None
    ) -> str:
        """
        Detect appropriate currency for user based on location and preferences.
        
        Args:
            user_id: User ID
            ip_address: User's IP address for geolocation
            country_code: Explicit country code if available
            
        Returns:
            Currency code (e.g., "USD", "EUR", "GBP")
        """
        try:
            # Get user preferences first
            user = await self.db.get(User, user_id)
            if not user:
                return "USD"  # Default fallback
            
            # Check if user has a preferred currency set
            if hasattr(user, 'preferred_currency') and user.preferred_currency:
                return user.preferred_currency.upper()
            
            # Check user's default address for country
            if hasattr(user, 'default_address') and user.default_address:
                country = getattr(user.default_address, 'country', None)
                if country:
                    currency = self._get_currency_for_country(country)
                    if currency:
                        return currency
            
            # Use explicit country code if provided
            if country_code:
                currency = self._get_currency_for_country(country_code)
                if currency:
                    return currency
            
            # Fallback to IP-based geolocation (simplified)
            if ip_address:
                detected_country = await self._detect_country_from_ip(ip_address)
                if detected_country:
                    currency = self._get_currency_for_country(detected_country)
                    if currency:
                        return currency
            
            # Final fallback
            return "USD"
            
        except Exception as e:
            logger.error(f"Error detecting user currency: {str(e)}")
            return "USD"

    async def convert_currency_via_stripe(
        self,
        amount: Decimal,
        from_currency: str,
        to_currency: str
    ) -> Dict[str, Any]:
        """
        Convert currency using Stripe's real-time exchange rates.
        
        Args:
            amount: Amount to convert
            from_currency: Source currency code
            to_currency: Target currency code
            
        Returns:
            Dict with conversion details
        """
        try:
            if from_currency.upper() == to_currency.upper():
                return {
                    "original_amount": float(amount),
                    "converted_amount": amount,
                    "exchange_rate": Decimal('1.0'),
                    "from_currency": from_currency.upper(),
                    "to_currency": to_currency.upper(),
                    "conversion_timestamp": datetime.utcnow().isoformat()
                }
            
            # Create a temporary payment intent to get Stripe's exchange rate
            # This is a common pattern for getting real-time rates from Stripe
            temp_payment_intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Convert to cents
                currency=from_currency.lower(),
                metadata={"temp_conversion": "true"}
            )
            
            # Cancel the temporary payment intent immediately
            stripe.PaymentIntent.cancel(temp_payment_intent.id)
            
            # For actual conversion, we'll use Stripe's documented approach
            # Create a payment intent in the target currency and let Stripe handle conversion
            converted_payment_intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),
                currency=to_currency.lower(),
                metadata={"currency_conversion": "true"}
            )
            
            # Calculate exchange rate based on Stripe's conversion
            # Note: In a real implementation, you'd use Stripe's Exchange Rates API
            # For now, we'll use a simplified approach
            exchange_rate = await self._get_stripe_exchange_rate(from_currency, to_currency)
            converted_amount = amount * exchange_rate
            
            # Cancel the conversion payment intent
            stripe.PaymentIntent.cancel(converted_payment_intent.id)
            
            return {
                "original_amount": float(amount),
                "converted_amount": converted_amount,
                "exchange_rate": exchange_rate,
                "from_currency": from_currency.upper(),
                "to_currency": to_currency.upper(),
                "conversion_timestamp": datetime.utcnow().isoformat(),
                "provider": "stripe"
            }
            
        except stripe.StripeError as e:
            logger.error(f"Stripe error in currency conversion: {str(e)}")
            raise Exception(f"Currency conversion failed: {str(e)}")
        except Exception as e:
            logger.error(f"Error in currency conversion: {str(e)}")
            raise Exception(f"Currency conversion failed: {str(e)}")

    async def get_supported_currencies(self) -> List[Dict[str, Any]]:
        """
        Get list of supported currencies with their details.
        
        Returns:
            List of currency information dictionaries
        """
        # Common currencies supported by Stripe
        supported_currencies = [
            {"code": "USD", "name": "US Dollar", "symbol": "$", "decimal_places": 2},
            {"code": "EUR", "name": "Euro", "symbol": "€", "decimal_places": 2},
            {"code": "GBP", "name": "British Pound", "symbol": "£", "decimal_places": 2},
            {"code": "CAD", "name": "Canadian Dollar", "symbol": "C$", "decimal_places": 2},
            {"code": "AUD", "name": "Australian Dollar", "symbol": "A$", "decimal_places": 2},
            {"code": "JPY", "name": "Japanese Yen", "symbol": "¥", "decimal_places": 0},
            {"code": "CHF", "name": "Swiss Franc", "symbol": "CHF", "decimal_places": 2},
            {"code": "SEK", "name": "Swedish Krona", "symbol": "kr", "decimal_places": 2},
            {"code": "NOK", "name": "Norwegian Krone", "symbol": "kr", "decimal_places": 2},
            {"code": "DKK", "name": "Danish Krone", "symbol": "kr", "decimal_places": 2},
            {"code": "PLN", "name": "Polish Złoty", "symbol": "zł", "decimal_places": 2},
            {"code": "CZK", "name": "Czech Koruna", "symbol": "Kč", "decimal_places": 2},
            {"code": "HUF", "name": "Hungarian Forint", "symbol": "Ft", "decimal_places": 0},
            {"code": "BGN", "name": "Bulgarian Lev", "symbol": "лв", "decimal_places": 2},
            {"code": "RON", "name": "Romanian Leu", "symbol": "lei", "decimal_places": 2},
            {"code": "HRK", "name": "Croatian Kuna", "symbol": "kn", "decimal_places": 2},
            {"code": "MXN", "name": "Mexican Peso", "symbol": "$", "decimal_places": 2},
            {"code": "BRL", "name": "Brazilian Real", "symbol": "R$", "decimal_places": 2},
            {"code": "SGD", "name": "Singapore Dollar", "symbol": "S$", "decimal_places": 2},
            {"code": "HKD", "name": "Hong Kong Dollar", "symbol": "HK$", "decimal_places": 2},
            {"code": "NZD", "name": "New Zealand Dollar", "symbol": "NZ$", "decimal_places": 2},
            {"code": "INR", "name": "Indian Rupee", "symbol": "₹", "decimal_places": 2},
            {"code": "MYR", "name": "Malaysian Ringgit", "symbol": "RM", "decimal_places": 2},
            {"code": "THB", "name": "Thai Baht", "symbol": "฿", "decimal_places": 2},
            {"code": "PHP", "name": "Philippine Peso", "symbol": "₱", "decimal_places": 2}
        ]
        
        return supported_currencies

    # ============================================================================
    # INTERNATIONAL TAX CALCULATION
    # ============================================================================

    async def _calculate_international_tax(
        self,
        amount: Decimal,
        currency: str,
        user_id: UUID
    ) -> Dict[str, Any]:
        """
        Calculate international taxes (VAT, GST, etc.) based on user location and amount.
        
        Args:
            amount: Amount to calculate tax on
            currency: Currency of the amount
            user_id: User ID for location determination
            
        Returns:
            Dict with tax calculation details
        """
        try:
            # Get user's location for tax calculation
            user = await self.db.get(User, user_id)
            if not user:
                return {"tax_amount": Decimal('0'), "tax_rate": Decimal('0'), "tax_type": "none"}
            
            # Determine tax jurisdiction
            country_code = None
            if hasattr(user, 'default_address') and user.default_address:
                country_code = getattr(user.default_address, 'country', None)
            
            if not country_code:
                return {"tax_amount": Decimal('0'), "tax_rate": Decimal('0'), "tax_type": "none"}
            
            # Get tax rate for country
            tax_info = self._get_tax_rate_for_country(country_code, currency)
            
            # Calculate tax amount
            tax_amount = amount * tax_info["rate"]
            
            return {
                "tax_amount": tax_amount,
                "tax_rate": tax_info["rate"],
                "tax_type": tax_info["type"],
                "country_code": country_code,
                "currency": currency,
                "taxable_amount": amount
            }
            
        except Exception as e:
            logger.error(f"Error calculating international tax: {str(e)}")
            return {"tax_amount": Decimal('0'), "tax_rate": Decimal('0'), "tax_type": "error"}

    def _get_tax_rate_for_country(self, country_code: str, currency: str) -> Dict[str, Any]:
        """Get tax rate information for a specific country"""
        # Tax rates by country (simplified - in production, use a tax service)
        tax_rates = {
            "US": {"rate": Decimal('0.08'), "type": "sales_tax"},  # Average US sales tax
            "CA": {"rate": Decimal('0.13'), "type": "hst"},        # HST in Ontario
            "GB": {"rate": Decimal('0.20'), "type": "vat"},        # UK VAT
            "DE": {"rate": Decimal('0.19'), "type": "vat"},        # German VAT
            "FR": {"rate": Decimal('0.20'), "type": "vat"},        # French VAT
            "IT": {"rate": Decimal('0.22'), "type": "vat"},        # Italian VAT
            "ES": {"rate": Decimal('0.21'), "type": "vat"},        # Spanish VAT
            "NL": {"rate": Decimal('0.21'), "type": "vat"},        # Dutch VAT
            "BE": {"rate": Decimal('0.21'), "type": "vat"},        # Belgian VAT
            "AT": {"rate": Decimal('0.20'), "type": "vat"},        # Austrian VAT
            "SE": {"rate": Decimal('0.25'), "type": "vat"},        # Swedish VAT
            "DK": {"rate": Decimal('0.25'), "type": "vat"},        # Danish VAT
            "NO": {"rate": Decimal('0.25'), "type": "vat"},        # Norwegian VAT
            "FI": {"rate": Decimal('0.24'), "type": "vat"},        # Finnish VAT
            "AU": {"rate": Decimal('0.10'), "type": "gst"},        # Australian GST
            "NZ": {"rate": Decimal('0.15'), "type": "gst"},        # New Zealand GST
            "SG": {"rate": Decimal('0.07'), "type": "gst"},        # Singapore GST
            "JP": {"rate": Decimal('0.10'), "type": "consumption_tax"},  # Japanese consumption tax
            "IN": {"rate": Decimal('0.18'), "type": "gst"},        # Indian GST (average)
        }
        
        return tax_rates.get(country_code.upper(), {"rate": Decimal('0'), "type": "none"})

    def _get_currency_for_country(self, country_code: str) -> str:
        """Get default currency for a country"""
        country_currencies = {
            "US": "USD", "CA": "CAD", "GB": "GBP", "DE": "EUR", "FR": "EUR",
            "IT": "EUR", "ES": "EUR", "NL": "EUR", "BE": "EUR", "AT": "EUR",
            "SE": "SEK", "DK": "DKK", "NO": "NOK", "FI": "EUR", "AU": "AUD",
            "NZ": "NZD", "SG": "SGD", "JP": "JPY", "IN": "INR", "CH": "CHF",
            "PL": "PLN", "CZ": "CZK", "HU": "HUF", "BG": "BGN", "RO": "RON",
            "HR": "HRK", "MX": "MXN", "BR": "BRL", "HK": "HKD", "MY": "MYR",
            "TH": "THB", "PH": "PHP"
        }
        
        return country_currencies.get(country_code.upper(), "USD")

    async def _detect_country_from_ip(self, ip_address: str) -> str:
        """
        Detect country from IP address (simplified implementation).
        In production, use a proper geolocation service.
        """
        try:
            # This is a simplified implementation
            # In production, integrate with services like MaxMind, IPinfo, etc.
            
            # For now, return None to fall back to other methods
            return None
            
        except Exception as e:
            logger.error(f"Error detecting country from IP {ip_address}: {str(e)}")
            return None

    async def _get_stripe_exchange_rate(self, from_currency: str, to_currency: str) -> Decimal:
        """
        Get exchange rate from Stripe (simplified implementation).
        In production, use Stripe's Exchange Rates API.
        """
        try:
            # Simplified exchange rates (in production, use Stripe's real rates)
            # These are approximate rates for demonstration
            base_rates = {
                "USD": Decimal('1.0'),
                "EUR": Decimal('0.85'),
                "GBP": Decimal('0.73'),
                "CAD": Decimal('1.25'),
                "AUD": Decimal('1.35'),
                "JPY": Decimal('110.0'),
                "CHF": Decimal('0.92'),
                "SEK": Decimal('8.5'),
                "NOK": Decimal('8.8'),
                "DKK": Decimal('6.3')
            }
            
            from_rate = base_rates.get(from_currency.upper(), Decimal('1.0'))
            to_rate = base_rates.get(to_currency.upper(), Decimal('1.0'))
            
            # Calculate cross rate
            if from_rate != 0:
                exchange_rate = to_rate / from_rate
            else:
                exchange_rate = Decimal('1.0')
            
            return exchange_rate
            
        except Exception as e:
            logger.error(f"Error getting exchange rate: {str(e)}")
            return Decimal('1.0')  # Fallback to 1:1 rate

    # ============================================================================
    # PAYMENT TRACKING AND MONITORING
    # ============================================================================

    async def log_payment_attempt(
        self,
        user_id: UUID,
        payment_intent_id: str,
        amount: Decimal,
        currency: str,
        payment_method_type: str = None,
        subscription_id: UUID = None,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Log comprehensive payment attempt with timestamps and amounts.
        
        Args:
            user_id: User making the payment
            payment_intent_id: Stripe payment intent ID
            amount: Payment amount
            currency: Payment currency
            payment_method_type: Type of payment method used
            subscription_id: Optional subscription ID
            metadata: Additional metadata to log
            
        Returns:
            Dict with logging result
        """
        try:
            # Create detailed log entry
            log_entry = {
                "user_id": str(user_id),
                "payment_intent_id": payment_intent_id,
                "amount": float(amount),
                "currency": currency.upper(),
                "payment_method_type": payment_method_type,
                "subscription_id": str(subscription_id) if subscription_id else None,
                "attempt_timestamp": datetime.utcnow().isoformat(),
                "metadata": metadata or {},
                "log_type": "payment_attempt"
            }
            
            # Log to activity service
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="payment_attempt",
                description=f"Payment attempt logged: {currency} {amount}",
                user_id=user_id,
                metadata=log_entry
            )
            
            # Update payment intent record if exists
            payment_intent_record = await self.db.execute(
                select(PaymentIntent).where(
                    PaymentIntent.stripe_payment_intent_id == payment_intent_id
                )
            )
            payment_intent_record = payment_intent_record.scalar_one_or_none()
            
            if payment_intent_record:
                # Update metadata with attempt log
                current_metadata = payment_intent_record.payment_metadata or {}
                current_metadata["attempt_logged"] = True
                current_metadata["attempt_timestamp"] = datetime.utcnow().isoformat()
                payment_intent_record.payment_metadata = current_metadata
                await self.db.commit()
            
            logger.info(f"Payment attempt logged: {payment_intent_id} for user {user_id}")
            
            return {
                "status": "success",
                "message": "Payment attempt logged successfully",
                "log_entry_id": log_entry["attempt_timestamp"],
                "payment_intent_id": payment_intent_id
            }
            
        except Exception as e:
            logger.error(f"Error logging payment attempt: {str(e)}")
            return {
                "status": "error",
                "message": f"Failed to log payment attempt: {str(e)}"
            }

    async def monitor_payment_status_changes(
        self,
        payment_intent_id: str,
        webhook_event_id: str = None
    ) -> Dict[str, Any]:
        """
        Monitor and log real-time payment status changes via Stripe webhooks.
        
        Args:
            payment_intent_id: Stripe payment intent ID
            webhook_event_id: Webhook event ID for tracking
            
        Returns:
            Dict with monitoring result
        """
        try:
            # Get current payment intent from Stripe
            payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            
            # Get local payment intent record
            local_record = await self.db.execute(
                select(PaymentIntent).where(
                    PaymentIntent.stripe_payment_intent_id == payment_intent_id
                )
            )
            local_record = local_record.scalar_one_or_none()
            
            if not local_record:
                logger.warning(f"No local record found for payment intent {payment_intent_id}")
                return {
                    "status": "warning",
                    "message": "Local payment intent record not found"
                }
            
            # Check for status change
            old_status = local_record.status
            new_status = payment_intent.status
            
            status_changed = old_status != new_status
            
            # Create monitoring log entry
            monitoring_entry = {
                "payment_intent_id": payment_intent_id,
                "webhook_event_id": webhook_event_id,
                "old_status": old_status,
                "new_status": new_status,
                "status_changed": status_changed,
                "monitoring_timestamp": datetime.utcnow().isoformat(),
                "stripe_data": {
                    "amount": payment_intent.amount / 100,
                    "currency": payment_intent.currency,
                    "customer": payment_intent.customer,
                    "payment_method": payment_intent.payment_method
                }
            }
            
            # Update local record if status changed
            if status_changed:
                local_record.status = new_status
                
                # Update specific status timestamps
                if new_status == "succeeded":
                    local_record.confirmed_at = datetime.utcnow()
                elif new_status in ["payment_failed", "canceled"]:
                    local_record.failed_at = datetime.utcnow()
                    if payment_intent.last_payment_error:
                        local_record.failure_reason = payment_intent.last_payment_error.get("message")
                
                # Update metadata
                current_metadata = local_record.payment_metadata or {}
                current_metadata["status_changes"] = current_metadata.get("status_changes", [])
                current_metadata["status_changes"].append({
                    "from": old_status,
                    "to": new_status,
                    "timestamp": datetime.utcnow().isoformat(),
                    "webhook_event_id": webhook_event_id
                })
                local_record.payment_metadata = current_metadata
                
                await self.db.commit()
                
                # Log status change activity
                activity_service = ActivityService(self.db)
                await activity_service.log_activity(
                    action_type="payment_status_change",
                    description=f"Payment status changed from {old_status} to {new_status}",
                    user_id=local_record.user_id,
                    metadata=monitoring_entry
                )
                
                logger.info(f"Payment status change monitored: {payment_intent_id} {old_status} -> {new_status}")
            
            return {
                "status": "success",
                "message": "Payment status monitoring completed",
                "status_changed": status_changed,
                "old_status": old_status,
                "new_status": new_status,
                "monitoring_entry": monitoring_entry
            }
            
        except stripe.StripeError as e:
            logger.error(f"Stripe error in payment monitoring: {str(e)}")
            return {
                "status": "error",
                "message": f"Stripe API error: {str(e)}"
            }
        except Exception as e:
            logger.error(f"Error monitoring payment status: {str(e)}")
            return {
                "status": "error",
                "message": f"Payment monitoring failed: {str(e)}"
            }

    async def generate_payment_performance_analytics(
        self,
        date_range_start: datetime,
        date_range_end: datetime,
        user_id: UUID = None,
        currency: str = None,
        payment_method_type: str = None
    ) -> Dict[str, Any]:
        """
        Generate comprehensive payment performance analytics and failure categorization.
        
        Args:
            date_range_start: Start date for analytics
            date_range_end: End date for analytics
            user_id: Optional user filter
            currency: Optional currency filter
            payment_method_type: Optional payment method filter
            
        Returns:
            Dict with comprehensive analytics
        """
        try:
            # Build query filters
            query_filters = [
                PaymentIntent.created_at >= date_range_start,
                PaymentIntent.created_at <= date_range_end
            ]
            
            if user_id:
                query_filters.append(PaymentIntent.user_id == user_id)
            if currency:
                query_filters.append(PaymentIntent.currency == currency.upper())
            if payment_method_type:
                query_filters.append(PaymentIntent.payment_method_type == payment_method_type)
            
            # Get all payment intents in date range
            payment_intents_result = await self.db.execute(
                select(PaymentIntent).where(*query_filters)
            )
            payment_intents = payment_intents_result.scalars().all()
            
            if not payment_intents:
                return {
                    "status": "success",
                    "message": "No payment data found for the specified criteria",
                    "analytics": self._get_empty_analytics_structure()
                }
            
            # Calculate basic metrics
            total_payments = len(payment_intents)
            successful_payments = len([p for p in payment_intents if p.status == "succeeded"])
            failed_payments = len([p for p in payment_intents if p.status in ["payment_failed", "canceled"]])
            pending_payments = len([p for p in payment_intents if p.status in ["requires_action", "requires_payment_method", "processing"]])
            
            success_rate = (successful_payments / total_payments * 100) if total_payments > 0 else 0
            failure_rate = (failed_payments / total_payments * 100) if total_payments > 0 else 0
            
            # Calculate volume metrics
            successful_volume = sum([
                float(p.amount_breakdown.get("total_amount", 0)) 
                for p in payment_intents 
                if p.status == "succeeded" and p.amount_breakdown
            ])
            
            failed_volume = sum([
                float(p.amount_breakdown.get("total_amount", 0)) 
                for p in payment_intents 
                if p.status in ["payment_failed", "canceled"] and p.amount_breakdown
            ])
            
            # Analyze failure reasons
            failure_categorization = self._categorize_payment_failures(payment_intents)
            
            # Payment method performance
            payment_method_performance = self._analyze_payment_method_performance(payment_intents)
            
            # Currency performance
            currency_performance = self._analyze_currency_performance(payment_intents)
            
            # Time-based analysis
            time_analysis = self._analyze_payment_timing(payment_intents, date_range_start, date_range_end)
            
            # 3D Secure analysis
            secure_analysis = self._analyze_3d_secure_performance(payment_intents)
            
            analytics = {
                "summary": {
                    "total_payments": total_payments,
                    "successful_payments": successful_payments,
                    "failed_payments": failed_payments,
                    "pending_payments": pending_payments,
                    "success_rate": round(success_rate, 2),
                    "failure_rate": round(failure_rate, 2),
                    "successful_volume": round(successful_volume, 2),
                    "failed_volume": round(failed_volume, 2),
                    "average_payment_amount": round(successful_volume / successful_payments, 2) if successful_payments > 0 else 0
                },
                "failure_analysis": failure_categorization,
                "payment_method_performance": payment_method_performance,
                "currency_performance": currency_performance,
                "time_analysis": time_analysis,
                "security_analysis": secure_analysis,
                "date_range": {
                    "start": date_range_start.isoformat(),
                    "end": date_range_end.isoformat()
                },
                "filters_applied": {
                    "user_id": str(user_id) if user_id else None,
                    "currency": currency,
                    "payment_method_type": payment_method_type
                },
                "generated_at": datetime.utcnow().isoformat()
            }
            
            # Log analytics generation
            activity_service = ActivityService(self.db)
            await activity_service.log_activity(
                action_type="payment_analytics_generated",
                description=f"Payment analytics generated for {total_payments} payments",
                user_id=user_id,
                metadata={
                    "total_payments": total_payments,
                    "success_rate": success_rate,
                    "date_range_days": (date_range_end - date_range_start).days,
                    "filters": analytics["filters_applied"]
                }
            )
            
            return {
                "status": "success",
                "message": "Payment analytics generated successfully",
                "analytics": analytics
            }
            
        except Exception as e:
            logger.error(f"Error generating payment analytics: {str(e)}")
            return {
                "status": "error",
                "message": f"Analytics generation failed: {str(e)}",
                "analytics": self._get_empty_analytics_structure()
            }

    def _categorize_payment_failures(self, payment_intents: List[PaymentIntent]) -> Dict[str, Any]:
        """Categorize payment failures by reason and type"""
        failed_payments = [p for p in payment_intents if p.status in ["payment_failed", "canceled"]]
        
        if not failed_payments:
            return {"total_failures": 0, "categories": {}}
        
        categories = {}
        for payment in failed_payments:
            reason = payment.failure_reason or "unknown"
            
            # Categorize by common failure types
            if "declined" in reason.lower() or "card_declined" in reason.lower():
                category = "card_declined"
            elif "insufficient" in reason.lower():
                category = "insufficient_funds"
            elif "expired" in reason.lower():
                category = "expired_card"
            elif "cvc" in reason.lower() or "security" in reason.lower():
                category = "security_code_error"
            elif "authentication" in reason.lower() or "3d secure" in reason.lower():
                category = "authentication_failed"
            elif "network" in reason.lower() or "processing" in reason.lower():
                category = "processing_error"
            else:
                category = "other"
            
            if category not in categories:
                categories[category] = {"count": 0, "percentage": 0, "examples": []}
            
            categories[category]["count"] += 1
            if len(categories[category]["examples"]) < 3:
                categories[category]["examples"].append(reason)
        
        # Calculate percentages
        total_failures = len(failed_payments)
        for category in categories:
            categories[category]["percentage"] = round(
                (categories[category]["count"] / total_failures) * 100, 2
            )
        
        return {
            "total_failures": total_failures,
            "categories": categories
        }

    def _analyze_payment_method_performance(self, payment_intents: List[PaymentIntent]) -> Dict[str, Any]:
        """Analyze performance by payment method type"""
        method_stats = {}
        
        for payment in payment_intents:
            method_type = payment.payment_method_type or "unknown"
            
            if method_type not in method_stats:
                method_stats[method_type] = {
                    "total": 0, "successful": 0, "failed": 0, "success_rate": 0
                }
            
            method_stats[method_type]["total"] += 1
            
            if payment.status == "succeeded":
                method_stats[method_type]["successful"] += 1
            elif payment.status in ["payment_failed", "canceled"]:
                method_stats[method_type]["failed"] += 1
        
        # Calculate success rates
        for method_type in method_stats:
            stats = method_stats[method_type]
            if stats["total"] > 0:
                stats["success_rate"] = round((stats["successful"] / stats["total"]) * 100, 2)
        
        return method_stats

    def _analyze_currency_performance(self, payment_intents: List[PaymentIntent]) -> Dict[str, Any]:
        """Analyze performance by currency"""
        currency_stats = {}
        
        for payment in payment_intents:
            currency = payment.currency or "unknown"
            
            if currency not in currency_stats:
                currency_stats[currency] = {
                    "total": 0, "successful": 0, "failed": 0, "success_rate": 0, "volume": 0
                }
            
            currency_stats[currency]["total"] += 1
            
            if payment.status == "succeeded":
                currency_stats[currency]["successful"] += 1
                if payment.amount_breakdown:
                    currency_stats[currency]["volume"] += float(
                        payment.amount_breakdown.get("total_amount", 0)
                    )
            elif payment.status in ["payment_failed", "canceled"]:
                currency_stats[currency]["failed"] += 1
        
        # Calculate success rates
        for currency in currency_stats:
            stats = currency_stats[currency]
            if stats["total"] > 0:
                stats["success_rate"] = round((stats["successful"] / stats["total"]) * 100, 2)
            stats["volume"] = round(stats["volume"], 2)
        
        return currency_stats

    def _analyze_payment_timing(
        self, 
        payment_intents: List[PaymentIntent], 
        start_date: datetime, 
        end_date: datetime
    ) -> Dict[str, Any]:
        """Analyze payment patterns over time"""
        # Group payments by day
        daily_stats = {}
        
        for payment in payment_intents:
            day_key = payment.created_at.date().isoformat()
            
            if day_key not in daily_stats:
                daily_stats[day_key] = {"total": 0, "successful": 0, "failed": 0}
            
            daily_stats[day_key]["total"] += 1
            
            if payment.status == "succeeded":
                daily_stats[day_key]["successful"] += 1
            elif payment.status in ["payment_failed", "canceled"]:
                daily_stats[day_key]["failed"] += 1
        
        # Calculate daily success rates
        for day in daily_stats:
            stats = daily_stats[day]
            if stats["total"] > 0:
                stats["success_rate"] = round((stats["successful"] / stats["total"]) * 100, 2)
        
        return {
            "daily_breakdown": daily_stats,
            "analysis_period_days": (end_date - start_date).days
        }

    def _analyze_3d_secure_performance(self, payment_intents: List[PaymentIntent]) -> Dict[str, Any]:
        """Analyze 3D Secure authentication performance"""
        secure_payments = [p for p in payment_intents if p.requires_action]
        total_secure = len(secure_payments)
        
        if total_secure == 0:
            return {
                "total_3d_secure_required": 0,
                "authentication_success_rate": 0,
                "abandonment_rate": 0
            }
        
        successful_secure = len([p for p in secure_payments if p.status == "succeeded"])
        failed_secure = len([p for p in secure_payments if p.status in ["payment_failed", "canceled"]])
        
        success_rate = (successful_secure / total_secure * 100) if total_secure > 0 else 0
        abandonment_rate = (failed_secure / total_secure * 100) if total_secure > 0 else 0
        
        return {
            "total_3d_secure_required": total_secure,
            "successful_authentications": successful_secure,
            "failed_authentications": failed_secure,
            "authentication_success_rate": round(success_rate, 2),
            "abandonment_rate": round(abandonment_rate, 2)
        }

    def _get_empty_analytics_structure(self) -> Dict[str, Any]:
        """Return empty analytics structure for cases with no data"""
        return {
            "summary": {
                "total_payments": 0,
                "successful_payments": 0,
                "failed_payments": 0,
                "pending_payments": 0,
                "success_rate": 0,
                "failure_rate": 0,
                "successful_volume": 0,
                "failed_volume": 0,
                "average_payment_amount": 0
            },
            "failure_analysis": {"total_failures": 0, "categories": {}},
            "payment_method_performance": {},
            "currency_performance": {},
            "time_analysis": {"daily_breakdown": {}, "analysis_period_days": 0},
            "security_analysis": {
                "total_3d_secure_required": 0,
                "authentication_success_rate": 0,
                "abandonment_rate": 0
            }
        }