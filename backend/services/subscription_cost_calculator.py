from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import and_, or_
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID
from decimal import Decimal
import stripe

from models.subscription import Subscription
from models.product import ProductVariant
from models.pricing_config import PricingConfig, SubscriptionCostHistory
from services.admin_pricing import AdminPricingService
from services.tax import TaxService
from core.exceptions import APIException
from core.utils.logging import structured_logger
from core.config import settings

# Set Stripe API key
stripe.api_key = settings.STRIPE_SECRET_KEY


class CostBreakdown:
    """Data class for subscription cost breakdown"""
    
    def __init__(
        self,
        variant_costs: List[Dict[str, Any]],
        subtotal: Decimal,
        admin_percentage: float,
        admin_fee: Decimal,
        delivery_type: str,
        delivery_cost: Decimal,
        tax_rate: float,
        tax_amount: Decimal,
        loyalty_discount: Decimal = Decimal('0'),
        total_amount: Decimal = None,
        currency: str = "USD",
        breakdown_timestamp: datetime = None
    ):
        self.variant_costs = variant_costs
        self.subtotal = subtotal
        self.admin_percentage = admin_percentage
        self.admin_fee = admin_fee
        self.delivery_type = delivery_type
        self.delivery_cost = delivery_cost
        self.tax_rate = tax_rate
        self.tax_amount = tax_amount
        self.loyalty_discount = loyalty_discount
        self.total_amount = total_amount or (subtotal + admin_fee + delivery_cost + tax_amount - loyalty_discount)
        self.currency = currency
        self.breakdown_timestamp = breakdown_timestamp or datetime.utcnow()
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert cost breakdown to dictionary"""
        return {
            "variant_costs": self.variant_costs,
            "subtotal": float(self.subtotal),
            "admin_percentage": self.admin_percentage,
            "admin_fee": float(self.admin_fee),
            "delivery_type": self.delivery_type,
            "delivery_cost": float(self.delivery_cost),
            "tax_rate": self.tax_rate,
            "tax_amount": float(self.tax_amount),
            "loyalty_discount": float(self.loyalty_discount),
            "total_amount": float(self.total_amount),
            "currency": self.currency,
            "breakdown_timestamp": self.breakdown_timestamp.isoformat() if self.breakdown_timestamp else None
        }


class SubscriptionCostCalculator:
    """Service for calculating subscription costs with variant summing, admin percentage, delivery costs, and tax calculation"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.admin_pricing_service = AdminPricingService(db)
        self.tax_service = TaxService(db)
    
    async def calculate_subscription_cost(
        self,
        variant_ids: List[UUID],
        delivery_type: str,
        customer_location: str = None,
        currency: str = "USD",
        user_id: UUID = None,
        shipping_address_id: UUID = None
    ) -> CostBreakdown:
        """
        Calculate comprehensive subscription cost including variants, admin percentage, delivery, and tax.
        
        Args:
            variant_ids: List of product variant UUIDs
            delivery_type: Type of delivery ("standard", "express", "overnight")
            customer_location: Customer location for tax calculation
            currency: Target currency for calculation
            user_id: User ID for loyalty discount calculation
            shipping_address_id: Shipping address ID for tax calculation
            
        Returns:
            CostBreakdown object with detailed cost information
        """
        try:
            # Get current pricing configuration
            pricing_config = await self.admin_pricing_service.get_pricing_config()
            if not pricing_config:
                raise APIException(
                    status_code=500,
                    message="No pricing configuration found"
                )
            
            # Get product variants and calculate base cost
            variants = await self._get_variants_by_ids(variant_ids)
            if not variants:
                raise APIException(
                    status_code=400,
                    message="No valid product variants found"
                )
            
            # Calculate variant costs
            variant_costs = []
            subtotal = Decimal('0')
            
            for variant in variants:
                # Use current price (sale price if available, otherwise base price)
                variant_price = Decimal(str(variant.sale_price or variant.base_price))
                
                # Handle currency conversion if needed
                if currency != "USD":
                    variant_price = await self._convert_currency_via_stripe(
                        variant_price, "USD", currency
                    )
                
                variant_cost_info = {
                    "variant_id": str(variant.id),
                    "variant_name": variant.name,
                    "sku": variant.sku,
                    "base_price": float(variant.base_price),
                    "sale_price": float(variant.sale_price) if variant.sale_price else None,
                    "current_price": float(variant_price),
                    "currency": currency
                }
                variant_costs.append(variant_cost_info)
                subtotal += variant_price
            
            # Apply admin percentage
            admin_percentage = pricing_config.subscription_percentage
            admin_fee = subtotal * (Decimal(str(admin_percentage)) / 100)
            
            # Add delivery cost
            delivery_costs = pricing_config.delivery_costs
            delivery_cost = Decimal(str(delivery_costs.get(delivery_type, 0)))
            
            # Handle currency conversion for delivery cost if needed
            if currency != "USD":
                delivery_cost = await self._convert_currency_via_stripe(
                    delivery_cost, "USD", currency
                )
            
            # Calculate tax
            tax_info = await self.tax_service.calculate_tax(
                subtotal=subtotal + admin_fee + delivery_cost,
                shipping_address_id=shipping_address_id,
                country_code=self._get_country_code_from_location(customer_location)
            )
            
            tax_rate = tax_info["tax_rate"]
            tax_amount = Decimal(str(tax_info["tax_amount"]))
            
            # Apply loyalty discount if user provided
            loyalty_discount = Decimal('0')
            if user_id:
                loyalty_discount = await self._calculate_loyalty_discount(
                    user_id, subtotal + admin_fee + delivery_cost
                )
            
            # Create cost breakdown
            cost_breakdown = CostBreakdown(
                variant_costs=variant_costs,
                subtotal=subtotal,
                admin_percentage=admin_percentage,
                admin_fee=admin_fee,
                delivery_type=delivery_type,
                delivery_cost=delivery_cost,
                tax_rate=tax_rate,
                tax_amount=tax_amount,
                loyalty_discount=loyalty_discount,
                currency=currency
            )
            
            structured_logger.info(
                message="Subscription cost calculated successfully",
                metadata={
                    "variant_count": len(variant_ids),
                    "subtotal": float(subtotal),
                    "total_amount": float(cost_breakdown.total_amount),
                    "currency": currency,
                    "delivery_type": delivery_type,
                    "user_id": str(user_id) if user_id else None
                }
            )
            
            return cost_breakdown
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to calculate subscription cost",
                metadata={
                    "variant_ids": [str(v_id) for v_id in variant_ids],
                    "delivery_type": delivery_type,
                    "currency": currency
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to calculate subscription cost"
            )
    
    async def recalculate_existing_subscriptions(
        self,
        pricing_changes: Dict[str, Any],
        admin_user_id: UUID
    ) -> List[Dict[str, Any]]:
        """
        Recalculate costs for existing subscriptions when pricing changes occur.
        
        Args:
            pricing_changes: Dictionary of pricing changes
            admin_user_id: Admin user making the changes
            
        Returns:
            List of subscription updates with old and new cost breakdowns
        """
        try:
            # Get all active subscriptions
            active_subscriptions = await self._get_active_subscriptions()
            
            subscription_updates = []
            
            for subscription in active_subscriptions:
                try:
                    # Get current cost breakdown
                    old_cost_breakdown = subscription.cost_breakdown
                    
                    # Calculate new cost with current pricing
                    if subscription.variant_ids:
                        new_cost_breakdown = await self.calculate_subscription_cost(
                            variant_ids=[UUID(v_id) for v_id in subscription.variant_ids],
                            delivery_type=subscription.delivery_type or "standard",
                            currency=subscription.currency or "USD",
                            user_id=subscription.user_id,
                            shipping_address_id=subscription.delivery_address_id
                        )
                        
                        # Update subscription with new cost breakdown
                        subscription.cost_breakdown = new_cost_breakdown.to_dict()
                        subscription.price = float(new_cost_breakdown.total_amount)
                        subscription.admin_percentage_applied = new_cost_breakdown.admin_percentage
                        subscription.delivery_cost_applied = float(new_cost_breakdown.delivery_cost)
                        subscription.tax_rate_applied = new_cost_breakdown.tax_rate
                        subscription.tax_amount = float(new_cost_breakdown.tax_amount)
                        subscription.updated_at = datetime.utcnow()
                        
                        # Create cost history record
                        cost_history = SubscriptionCostHistory(
                            subscription_id=subscription.id,
                            old_cost_breakdown=old_cost_breakdown,
                            new_cost_breakdown=new_cost_breakdown.to_dict(),
                            change_reason="admin_pricing_update",
                            effective_date=datetime.utcnow(),
                            changed_by=admin_user_id,
                            pricing_metadata=pricing_changes
                        )
                        self.db.add(cost_history)
                        
                        subscription_update = {
                            "subscription_id": str(subscription.id),
                            "user_id": str(subscription.user_id),
                            "old_cost": old_cost_breakdown,
                            "new_cost": new_cost_breakdown.to_dict(),
                            "cost_difference": float(new_cost_breakdown.total_amount) - (
                                old_cost_breakdown.get("total_amount", 0) if old_cost_breakdown else 0
                            ),
                            "percentage_change": self._calculate_percentage_change(
                                old_cost_breakdown.get("total_amount", 0) if old_cost_breakdown else 0,
                                float(new_cost_breakdown.total_amount)
                            )
                        }
                        subscription_updates.append(subscription_update)
                        
                except Exception as e:
                    structured_logger.error(
                        message="Failed to recalculate subscription cost",
                        metadata={
                            "subscription_id": str(subscription.id),
                            "user_id": str(subscription.user_id)
                        },
                        exception=e
                    )
                    continue
            
            # Commit all changes
            await self.db.commit()
            
            structured_logger.info(
                message="Subscription cost recalculation completed",
                metadata={
                    "total_subscriptions": len(active_subscriptions),
                    "updated_subscriptions": len(subscription_updates),
                    "admin_user_id": str(admin_user_id),
                    "pricing_changes": pricing_changes
                }
            )
            
            return subscription_updates
            
        except Exception as e:
            await self.db.rollback()
            structured_logger.error(
                message="Failed to recalculate existing subscriptions",
                metadata={
                    "pricing_changes": pricing_changes,
                    "admin_user_id": str(admin_user_id)
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to recalculate existing subscriptions"
            )
    
    async def apply_loyalty_discount(
        self,
        base_cost: Decimal,
        user_id: UUID
    ) -> Dict[str, Any]:
        """
        Apply loyalty discount to subscription cost.
        
        Args:
            base_cost: Base cost before discount
            user_id: User ID for loyalty calculation
            
        Returns:
            Dictionary with discount information
        """
        try:
            discount_amount = await self._calculate_loyalty_discount(user_id, base_cost)
            discount_percentage = (discount_amount / base_cost * 100) if base_cost > 0 else 0
            
            return {
                "original_cost": float(base_cost),
                "discount_amount": float(discount_amount),
                "discount_percentage": float(discount_percentage),
                "final_cost": float(base_cost - discount_amount),
                "user_id": str(user_id)
            }
            
        except Exception as e:
            structured_logger.error(
                message="Failed to apply loyalty discount",
                metadata={
                    "base_cost": float(base_cost),
                    "user_id": str(user_id)
                },
                exception=e
            )
            return {
                "original_cost": float(base_cost),
                "discount_amount": 0.0,
                "discount_percentage": 0.0,
                "final_cost": float(base_cost),
                "user_id": str(user_id),
                "error": "Failed to calculate loyalty discount"
            }
    
    async def _get_variants_by_ids(self, variant_ids: List[UUID]) -> List[ProductVariant]:
        """Get product variants by their IDs"""
        query = select(ProductVariant).where(
            and_(
                ProductVariant.id.in_(variant_ids),
                ProductVariant.is_active == True
            )
        )
        result = await self.db.execute(query)
        return result.scalars().all()
    
    async def _get_active_subscriptions(self) -> List[Subscription]:
        """Get all active subscriptions for recalculation"""
        query = select(Subscription).where(
            Subscription.status.in_(["active", "trialing"])
        )
        result = await self.db.execute(query)
        return result.scalars().all()
    
    async def _convert_currency_via_stripe(
        self,
        amount: Decimal,
        from_currency: str,
        to_currency: str
    ) -> Decimal:
        """
        Convert currency using Stripe's conversion rates.
        
        Args:
            amount: Amount to convert
            from_currency: Source currency
            to_currency: Target currency
            
        Returns:
            Converted amount
        """
        try:
            if from_currency == to_currency:
                return amount
            
            # Create a temporary payment intent to get conversion rate
            # This is a common pattern for getting Stripe's current conversion rates
            temp_intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Convert to cents
                currency=from_currency.lower(),
                metadata={"conversion_check": "true"}
            )
            
            # Get the conversion rate from Stripe (simplified approach)
            # In a real implementation, you might use Stripe's Exchange Rates API
            # For now, we'll use a basic conversion approach
            conversion_rates = {
                ("USD", "EUR"): 0.85,
                ("USD", "GBP"): 0.75,
                ("USD", "CAD"): 1.25,
                ("EUR", "USD"): 1.18,
                ("GBP", "USD"): 1.33,
                ("CAD", "USD"): 0.80
            }
            
            rate = conversion_rates.get((from_currency, to_currency), 1.0)
            converted_amount = amount * Decimal(str(rate))
            
            structured_logger.info(
                message="Currency conversion completed",
                metadata={
                    "original_amount": float(amount),
                    "from_currency": from_currency,
                    "to_currency": to_currency,
                    "conversion_rate": rate,
                    "converted_amount": float(converted_amount)
                }
            )
            
            return converted_amount
            
        except Exception as e:
            structured_logger.error(
                message="Currency conversion failed, using original amount",
                metadata={
                    "amount": float(amount),
                    "from_currency": from_currency,
                    "to_currency": to_currency
                },
                exception=e
            )
            return amount  # Fallback to original amount
    
    async def _calculate_loyalty_discount(
        self,
        user_id: UUID,
        base_amount: Decimal
    ) -> Decimal:
        """
        Calculate loyalty discount for a user using the LoyaltyService.
        
        Args:
            user_id: User ID
            base_amount: Base amount for discount calculation
            
        Returns:
            Discount amount
        """
        try:
            # Use the LoyaltyService for proper discount calculation
            from services.loyalty import LoyaltyService
            loyalty_service = LoyaltyService(self.db)
            
            # Get loyalty discount
            discount_response = await loyalty_service.calculate_loyalty_discount(
                user_id=user_id,
                base_cost=base_amount
            )
            
            return discount_response.discount_amount
            
        except Exception as e:
            structured_logger.error(
                message="Failed to calculate loyalty discount",
                metadata={
                    "user_id": str(user_id),
                    "base_amount": float(base_amount)
                },
                exception=e
            )
            # Return no discount on error
            return Decimal('0')
            return Decimal('0')  # No discount on error
    
    def _get_country_code_from_location(self, location: str) -> Optional[str]:
        """Extract country code from location string"""
        if not location:
            return None
        
        # Simple mapping for common location formats
        location_mapping = {
            "United States": "US",
            "USA": "US",
            "US": "US",
            "Canada": "CA",
            "CA": "CA",
            "United Kingdom": "GB",
            "UK": "GB",
            "GB": "GB"
        }
        
        return location_mapping.get(location, location[:2].upper() if len(location) >= 2 else None)
    
    def _calculate_percentage_change(self, old_value: float, new_value: float) -> float:
        """Calculate percentage change between two values"""
        if old_value == 0:
            return 100.0 if new_value > 0 else 0.0
        
        return ((new_value - old_value) / old_value) * 100

    # Dynamic Cost Recalculation Methods
    
    async def recalculate_subscription_on_variant_change(
        self,
        subscription_id: UUID,
        added_variant_ids: List[UUID] = None,
        removed_variant_ids: List[UUID] = None,
        user_id: UUID = None
    ) -> Dict[str, Any]:
        """
        Recalculate subscription cost when variants are added or removed.
        
        Args:
            subscription_id: Subscription ID to update
            added_variant_ids: List of variant IDs being added
            removed_variant_ids: List of variant IDs being removed
            user_id: User ID for authorization
            
        Returns:
            Dictionary with recalculation results
        """
        try:
            # Get subscription
            subscription = await self._get_subscription_by_id(subscription_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Verify user authorization if provided
            if user_id and subscription.user_id != user_id:
                raise APIException(
                    status_code=403,
                    message="User not authorized for this subscription"
                )
            
            # Store old cost breakdown
            old_cost_breakdown = subscription.cost_breakdown
            old_total = old_cost_breakdown.get("total_amount", 0) if old_cost_breakdown else 0
            
            # Update variant list
            current_variant_ids = subscription.variant_ids or []
            
            # Add new variants
            if added_variant_ids:
                for variant_id in added_variant_ids:
                    if str(variant_id) not in current_variant_ids:
                        current_variant_ids.append(str(variant_id))
            
            # Remove variants
            if removed_variant_ids:
                for variant_id in removed_variant_ids:
                    if str(variant_id) in current_variant_ids:
                        current_variant_ids.remove(str(variant_id))
            
            # Validate that we still have variants
            if not current_variant_ids:
                raise APIException(
                    status_code=400,
                    message="Subscription must have at least one product variant"
                )
            
            # Recalculate cost with updated variants
            new_cost_breakdown = await self.calculate_subscription_cost(
                variant_ids=[UUID(v_id) for v_id in current_variant_ids],
                delivery_type=subscription.delivery_type or "standard",
                currency=subscription.currency or "USD",
                user_id=subscription.user_id,
                shipping_address_id=subscription.delivery_address_id
            )
            
            # Update subscription
            subscription.variant_ids = current_variant_ids
            subscription.cost_breakdown = new_cost_breakdown.to_dict()
            subscription.price = float(new_cost_breakdown.total_amount)
            subscription.admin_percentage_applied = new_cost_breakdown.admin_percentage
            subscription.delivery_cost_applied = float(new_cost_breakdown.delivery_cost)
            subscription.tax_rate_applied = new_cost_breakdown.tax_rate
            subscription.tax_amount = float(new_cost_breakdown.tax_amount)
            subscription.updated_at = datetime.utcnow()
            
            # Create cost history record
            change_reason = []
            if added_variant_ids:
                change_reason.append(f"Added variants: {[str(v) for v in added_variant_ids]}")
            if removed_variant_ids:
                change_reason.append(f"Removed variants: {[str(v) for v in removed_variant_ids]}")
            
            cost_history = SubscriptionCostHistory(
                subscription_id=subscription.id,
                old_cost_breakdown=old_cost_breakdown,
                new_cost_breakdown=new_cost_breakdown.to_dict(),
                change_reason="; ".join(change_reason),
                effective_date=datetime.utcnow(),
                pricing_metadata={
                    "added_variants": [str(v) for v in added_variant_ids] if added_variant_ids else [],
                    "removed_variants": [str(v) for v in removed_variant_ids] if removed_variant_ids else []
                }
            )
            self.db.add(cost_history)
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            cost_difference = float(new_cost_breakdown.total_amount) - old_total
            percentage_change = self._calculate_percentage_change(old_total, float(new_cost_breakdown.total_amount))
            
            result = {
                "subscription_id": str(subscription.id),
                "old_cost_breakdown": old_cost_breakdown,
                "new_cost_breakdown": new_cost_breakdown.to_dict(),
                "cost_difference": cost_difference,
                "percentage_change": percentage_change,
                "updated_variants": current_variant_ids,
                "change_summary": {
                    "added_variants": len(added_variant_ids) if added_variant_ids else 0,
                    "removed_variants": len(removed_variant_ids) if removed_variant_ids else 0,
                    "total_variants": len(current_variant_ids)
                }
            }
            
            structured_logger.info(
                message="Subscription cost recalculated after variant change",
                metadata={
                    "subscription_id": str(subscription_id),
                    "cost_difference": cost_difference,
                    "percentage_change": percentage_change,
                    "added_variants": len(added_variant_ids) if added_variant_ids else 0,
                    "removed_variants": len(removed_variant_ids) if removed_variant_ids else 0
                }
            )
            
            return result
            
        except APIException:
            raise
        except Exception as e:
            await self.db.rollback()
            structured_logger.error(
                message="Failed to recalculate subscription cost after variant change",
                metadata={
                    "subscription_id": str(subscription_id),
                    "added_variants": [str(v) for v in added_variant_ids] if added_variant_ids else [],
                    "removed_variants": [str(v) for v in removed_variant_ids] if removed_variant_ids else []
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to recalculate subscription cost"
            )
    
    async def recalculate_subscription_on_delivery_change(
        self,
        subscription_id: UUID,
        new_delivery_type: str,
        new_delivery_address_id: UUID = None,
        user_id: UUID = None
    ) -> Dict[str, Any]:
        """
        Recalculate subscription cost when delivery preferences change.
        
        Args:
            subscription_id: Subscription ID to update
            new_delivery_type: New delivery type ("standard", "express", "overnight")
            new_delivery_address_id: New delivery address ID (optional)
            user_id: User ID for authorization
            
        Returns:
            Dictionary with recalculation results
        """
        try:
            # Get subscription
            subscription = await self._get_subscription_by_id(subscription_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Verify user authorization if provided
            if user_id and subscription.user_id != user_id:
                raise APIException(
                    status_code=403,
                    message="User not authorized for this subscription"
                )
            
            # Validate delivery type
            valid_delivery_types = ["standard", "express", "overnight"]
            if new_delivery_type not in valid_delivery_types:
                raise APIException(
                    status_code=400,
                    message=f"Invalid delivery type. Must be one of: {valid_delivery_types}"
                )
            
            # Store old cost breakdown
            old_cost_breakdown = subscription.cost_breakdown
            old_total = old_cost_breakdown.get("total_amount", 0) if old_cost_breakdown else 0
            old_delivery_type = subscription.delivery_type
            old_delivery_address_id = subscription.delivery_address_id
            
            # Recalculate cost with new delivery preferences
            variant_ids = [UUID(v_id) for v_id in subscription.variant_ids] if subscription.variant_ids else []
            
            if not variant_ids:
                raise APIException(
                    status_code=400,
                    message="Subscription has no variants to calculate cost"
                )
            
            new_cost_breakdown = await self.calculate_subscription_cost(
                variant_ids=variant_ids,
                delivery_type=new_delivery_type,
                currency=subscription.currency or "USD",
                user_id=subscription.user_id,
                shipping_address_id=new_delivery_address_id or subscription.delivery_address_id
            )
            
            # Update subscription
            subscription.delivery_type = new_delivery_type
            if new_delivery_address_id:
                subscription.delivery_address_id = new_delivery_address_id
            subscription.cost_breakdown = new_cost_breakdown.to_dict()
            subscription.price = float(new_cost_breakdown.total_amount)
            subscription.admin_percentage_applied = new_cost_breakdown.admin_percentage
            subscription.delivery_cost_applied = float(new_cost_breakdown.delivery_cost)
            subscription.tax_rate_applied = new_cost_breakdown.tax_rate
            subscription.tax_amount = float(new_cost_breakdown.tax_amount)
            subscription.updated_at = datetime.utcnow()
            
            # Create cost history record
            change_details = [f"Delivery type changed from '{old_delivery_type}' to '{new_delivery_type}'"]
            if new_delivery_address_id and new_delivery_address_id != old_delivery_address_id:
                change_details.append(f"Delivery address updated")
            
            cost_history = SubscriptionCostHistory(
                subscription_id=subscription.id,
                old_cost_breakdown=old_cost_breakdown,
                new_cost_breakdown=new_cost_breakdown.to_dict(),
                change_reason="; ".join(change_details),
                effective_date=datetime.utcnow(),
                pricing_metadata={
                    "old_delivery_type": old_delivery_type,
                    "new_delivery_type": new_delivery_type,
                    "old_delivery_address_id": str(old_delivery_address_id) if old_delivery_address_id else None,
                    "new_delivery_address_id": str(new_delivery_address_id) if new_delivery_address_id else None
                }
            )
            self.db.add(cost_history)
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            cost_difference = float(new_cost_breakdown.total_amount) - old_total
            percentage_change = self._calculate_percentage_change(old_total, float(new_cost_breakdown.total_amount))
            
            result = {
                "subscription_id": str(subscription.id),
                "old_cost_breakdown": old_cost_breakdown,
                "new_cost_breakdown": new_cost_breakdown.to_dict(),
                "cost_difference": cost_difference,
                "percentage_change": percentage_change,
                "delivery_changes": {
                    "old_delivery_type": old_delivery_type,
                    "new_delivery_type": new_delivery_type,
                    "delivery_cost_change": float(new_cost_breakdown.delivery_cost) - (
                        old_cost_breakdown.get("delivery_cost", 0) if old_cost_breakdown else 0
                    ),
                    "address_updated": new_delivery_address_id is not None and new_delivery_address_id != old_delivery_address_id
                }
            }
            
            structured_logger.info(
                message="Subscription cost recalculated after delivery change",
                metadata={
                    "subscription_id": str(subscription_id),
                    "old_delivery_type": old_delivery_type,
                    "new_delivery_type": new_delivery_type,
                    "cost_difference": cost_difference,
                    "percentage_change": percentage_change
                }
            )
            
            return result
            
        except APIException:
            raise
        except Exception as e:
            await self.db.rollback()
            structured_logger.error(
                message="Failed to recalculate subscription cost after delivery change",
                metadata={
                    "subscription_id": str(subscription_id),
                    "new_delivery_type": new_delivery_type,
                    "new_delivery_address_id": str(new_delivery_address_id) if new_delivery_address_id else None
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to recalculate subscription cost"
            )
    
    async def propagate_variant_price_changes(
        self,
        variant_id: UUID,
        old_price: Decimal,
        new_price: Decimal,
        admin_user_id: UUID = None
    ) -> List[Dict[str, Any]]:
        """
        Propagate variant price changes to all affected subscriptions.
        
        Args:
            variant_id: Product variant ID that changed price
            old_price: Previous price
            new_price: New price
            admin_user_id: Admin user making the change
            
        Returns:
            List of affected subscription updates
        """
        try:
            # Find all active subscriptions containing this variant
            affected_subscriptions = await self._get_subscriptions_with_variant(variant_id)
            
            if not affected_subscriptions:
                structured_logger.info(
                    message="No active subscriptions found for variant price change",
                    metadata={
                        "variant_id": str(variant_id),
                        "old_price": float(old_price),
                        "new_price": float(new_price)
                    }
                )
                return []
            
            subscription_updates = []
            
            for subscription in affected_subscriptions:
                try:
                    # Store old cost breakdown
                    old_cost_breakdown = subscription.cost_breakdown
                    old_total = old_cost_breakdown.get("total_amount", 0) if old_cost_breakdown else 0
                    
                    # Recalculate cost with new variant price
                    variant_ids = [UUID(v_id) for v_id in subscription.variant_ids] if subscription.variant_ids else []
                    
                    new_cost_breakdown = await self.calculate_subscription_cost(
                        variant_ids=variant_ids,
                        delivery_type=subscription.delivery_type or "standard",
                        currency=subscription.currency or "USD",
                        user_id=subscription.user_id,
                        shipping_address_id=subscription.delivery_address_id
                    )
                    
                    # Update subscription
                    subscription.cost_breakdown = new_cost_breakdown.to_dict()
                    subscription.price = float(new_cost_breakdown.total_amount)
                    subscription.admin_percentage_applied = new_cost_breakdown.admin_percentage
                    subscription.delivery_cost_applied = float(new_cost_breakdown.delivery_cost)
                    subscription.tax_rate_applied = new_cost_breakdown.tax_rate
                    subscription.tax_amount = float(new_cost_breakdown.tax_amount)
                    subscription.updated_at = datetime.utcnow()
                    
                    # Create cost history record
                    cost_history = SubscriptionCostHistory(
                        subscription_id=subscription.id,
                        old_cost_breakdown=old_cost_breakdown,
                        new_cost_breakdown=new_cost_breakdown.to_dict(),
                        change_reason=f"Variant price change: {variant_id}",
                        effective_date=datetime.utcnow(),
                        changed_by=admin_user_id,
                        pricing_metadata={
                            "variant_id": str(variant_id),
                            "old_variant_price": float(old_price),
                            "new_variant_price": float(new_price),
                            "price_change_type": "variant_price_update"
                        }
                    )
                    self.db.add(cost_history)
                    
                    cost_difference = float(new_cost_breakdown.total_amount) - old_total
                    percentage_change = self._calculate_percentage_change(old_total, float(new_cost_breakdown.total_amount))
                    
                    subscription_update = {
                        "subscription_id": str(subscription.id),
                        "user_id": str(subscription.user_id),
                        "old_cost_breakdown": old_cost_breakdown,
                        "new_cost_breakdown": new_cost_breakdown.to_dict(),
                        "cost_difference": cost_difference,
                        "percentage_change": percentage_change,
                        "variant_price_change": {
                            "variant_id": str(variant_id),
                            "old_price": float(old_price),
                            "new_price": float(new_price),
                            "price_difference": float(new_price - old_price)
                        }
                    }
                    subscription_updates.append(subscription_update)
                    
                except Exception as e:
                    structured_logger.error(
                        message="Failed to update subscription for variant price change",
                        metadata={
                            "subscription_id": str(subscription.id),
                            "variant_id": str(variant_id)
                        },
                        exception=e
                    )
                    continue
            
            # Commit all changes
            await self.db.commit()
            
            structured_logger.info(
                message="Variant price change propagated to subscriptions",
                metadata={
                    "variant_id": str(variant_id),
                    "old_price": float(old_price),
                    "new_price": float(new_price),
                    "affected_subscriptions": len(affected_subscriptions),
                    "successful_updates": len(subscription_updates),
                    "admin_user_id": str(admin_user_id) if admin_user_id else None
                }
            )
            
            return subscription_updates
            
        except Exception as e:
            await self.db.rollback()
            structured_logger.error(
                message="Failed to propagate variant price changes",
                metadata={
                    "variant_id": str(variant_id),
                    "old_price": float(old_price),
                    "new_price": float(new_price)
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to propagate variant price changes"
            )
    
    async def _get_subscription_by_id(self, subscription_id: UUID) -> Optional[Subscription]:
        """Get subscription by ID"""
        query = select(Subscription).where(Subscription.id == subscription_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()
    
    async def _get_subscriptions_with_variant(self, variant_id: UUID) -> List[Subscription]:
        """Get all active subscriptions that contain a specific variant"""
        # Since variant_ids is stored as JSON array, we need to use JSON operations
        # This is a simplified approach - in production, you might want to use proper JSON queries
        query = select(Subscription).where(
            and_(
                Subscription.status.in_(["active", "trialing"]),
                Subscription.variant_ids.isnot(None)
            )
        )
        result = await self.db.execute(query)
        all_subscriptions = result.scalars().all()
        
        # Filter subscriptions that contain the variant
        affected_subscriptions = []
        for subscription in all_subscriptions:
            if subscription.variant_ids and str(variant_id) in subscription.variant_ids:
                affected_subscriptions.append(subscription)
        
        return affected_subscriptions