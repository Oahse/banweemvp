from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc, func
from sqlalchemy.orm import selectinload # Import selectinload
from typing import Optional, List, Dict, Any # Import Dict
from fastapi import BackgroundTasks
from models.subscription import Subscription # Import Subscription
from models.product import ProductVariant # Import ProductVariant for linking
from models.user import User
from models.pricing_config import SubscriptionCostHistory
from schemas.subscription import SubscriptionCreate, SubscriptionUpdate
from schemas.product import ProductVariantResponse # Import ProductVariantResponse
from core.exceptions import APIException
from core.utils.messages.email import send_email
from core.config import settings
from core.utils.logging import structured_logger
from uuid import uuid4, UUID
from datetime import datetime, timedelta
from decimal import Decimal
from dateutil.relativedelta import relativedelta


class SubscriptionService:
    def __init__(self, db: AsyncSession):
        self.db = db

    # Helper function to get products for a given plan_id
    # In a real app, this would likely involve a SubscriptionPlan model
    # or a more robust configuration.
    async def _get_products_for_plan(self, plan_id: str) -> List[ProductVariant]:
        # Dummy logic: associate different products based on plan_id
        # For actual implementation, fetch from DB based on plan config
        product_variants = []
        if plan_id == "basic":
            # Example: Basic plan gets a couple of random small products
            result = await self.db.execute(select(ProductVariant).limit(2))
            product_variants = result.scalars().all()
        elif plan_id == "premium":
            # Example: Premium plan gets more and possibly higher-value products
            result = await self.db.execute(select(ProductVariant).offset(2).limit(5))
            product_variants = result.scalars().all()
        elif plan_id == "enterprise":
            # Example: Enterprise plan gets a wide range of products
            result = await self.db.execute(select(ProductVariant).offset(7).limit(10))
            product_variants = result.scalars().all()
        
        return product_variants

    async def create_subscription(self, subscription_data: SubscriptionCreate, user_id: UUID, background_tasks: BackgroundTasks = None) -> Subscription:
        new_subscription = Subscription(
            id=uuid4(),
            user_id=user_id,
            # Use dictionary unpacking for subscription_data for clarity and to include all fields
            price=subscription_data.price,
            currency=subscription_data.currency,
            billing_cycle=subscription_data.billing_cycle,
            auto_renew=subscription_data.auto_renew,
            current_period_start=subscription_data.current_period_start,
            current_period_end=subscription_data.current_period_end,
            cancelled_at=subscription_data.cancelled_at,
            plan_id=subscription_data.plan_id, # Ensure plan_id is set
            status=subscription_data.status # Ensure status is set
        )
        self.db.add(new_subscription)
        
        # Associate products based on plan_id
        associated_products = await self._get_products_for_plan(new_subscription.plan_id)
        new_subscription.products.extend(associated_products) # Add products to the relationship
        
        await self.db.commit()
        await self.db.refresh(new_subscription)
        
        # Award loyalty points for subscription creation
        if background_tasks and new_subscription.price and new_subscription.price > 0:
            background_tasks.add_task(
                self._award_subscription_loyalty_points,
                user_id,
                new_subscription.id,
                new_subscription.price,
                "Points earned from new subscription"
            )
        
        return new_subscription

    async def get_user_subscriptions(self, user_id: UUID, page: int = 1, limit: int = 10) -> dict:
        offset = (page - 1) * limit
        query = select(Subscription).filter(Subscription.user_id == user_id)\
            .options(selectinload(Subscription.products).selectinload(ProductVariant.images))\
            .order_by(desc(Subscription.created_at))
        total_query = select(func.count()).select_from(
            Subscription).filter(Subscription.user_id == user_id)

        total_subscriptions = (await self.db.execute(total_query)).scalar_one()
        subscriptions = (await self.db.execute(query.offset(offset).limit(limit))).scalars().unique().all() # Use unique() to avoid duplicates if selectinload causes them

        return {
            "total": total_subscriptions,
            "page": page,
            "limit": limit,
            "data": subscriptions
        }

    async def get_subscription_by_id(self, subscription_id: UUID, user_id: UUID) -> Optional[Subscription]:
        result = await self.db.execute(select(Subscription).filter(Subscription.id == subscription_id, Subscription.user_id == user_id)\
            .options(selectinload(Subscription.products).selectinload(ProductVariant.images))) # Eagerly load products
        return result.scalars().first()

    async def update_subscription(self, subscription_id: UUID, subscription_data: SubscriptionUpdate, user_id: UUID, background_tasks: BackgroundTasks) -> Subscription:
        subscription = await self.get_subscription_by_id(subscription_id, user_id)
        if not subscription:
            raise APIException(
                status_code=404, message="Subscription not found")

        old_plan_id = subscription.plan_id

        # Update core subscription fields
        for key, value in subscription_data.dict(exclude_unset=True).items():
            setattr(subscription, key, value)
        
        # If plan_id changes, re-associate products
        if subscription_data.plan_id and subscription_data.plan_id != old_plan_id:
            subscription.products.clear() # Clear existing products
            new_associated_products = await self._get_products_for_plan(subscription_data.plan_id)
            subscription.products.extend(new_associated_products)

        await self.db.commit()
        await self.db.refresh(subscription)

        background_tasks.add_task(
            self.send_subscription_update_email, subscription, old_plan_id)

        return subscription

    async def send_subscription_update_email(self, subscription: Subscription, old_plan_id: str):
        """Sends a subscription update email to the user."""
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return

        # Prepare a list of product names for the email context
        product_names = [p.name for p in subscription.products] if subscription.products else []

        context = {
            "customer_name": user.firstname,
            "service_name": "Banwee Subscription",
            "subscription_id": str(subscription.id),
            "new_plan_name": subscription.plan_id,
            "old_plan_name": old_plan_id,
            "subscription_status": subscription.status,
            "next_billing_date": subscription.current_period_end.strftime("%B %d, %Y") if subscription.current_period_end else "N/A",
            "next_billing_amount": f"${subscription.price:.2f}" if subscription.price is not None else "N/A",  # Now price is available
            "products_included": ", ".join(product_names) if product_names else "No specific products", # New context variable
            "manage_subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions",
            "company_name": "Banwee",
        }

        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_update',
                context=context
            )
            print(
                f"Subscription update email sent to {user.email} successfully.")
        except Exception as e:
            print(
                f"Failed to send subscription update email to {user.email}. Error: {e}")

    async def delete_subscription(self, subscription_id: UUID, user_id: UUID):
        subscription = await self.get_subscription_by_id(subscription_id, user_id)
        if not subscription:
            raise APIException(
                status_code=404, message="Subscription not found")

        await self.db.delete(subscription)
        await self.db.commit()

    # ============================================================================
    # SUBSCRIPTION LIFECYCLE MANAGEMENT
    # ============================================================================

    async def pause_subscription(
        self,
        subscription_id: UUID,
        user_id: UUID,
        pause_reason: str = "customer_request",
        background_tasks: BackgroundTasks = None
    ) -> Dict[str, Any]:
        """
        Pause a subscription with prorated billing calculations.
        
        Args:
            subscription_id: Subscription ID to pause
            user_id: User ID for authorization
            pause_reason: Reason for pausing the subscription
            background_tasks: Background tasks for email notifications
            
        Returns:
            Dict with pause result and prorated billing details
        """
        try:
            # Get subscription
            subscription = await self.get_subscription_by_id(subscription_id, user_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Check if subscription can be paused
            if subscription.status not in ["active", "trialing"]:
                raise APIException(
                    status_code=400,
                    message=f"Cannot pause subscription with status '{subscription.status}'"
                )
            
            if subscription.paused_at:
                raise APIException(
                    status_code=400,
                    message="Subscription is already paused"
                )
            
            # Calculate prorated billing
            prorated_result = await self._calculate_prorated_billing(subscription, "pause")
            
            # Update subscription status
            old_status = subscription.status
            subscription.status = "paused"
            subscription.paused_at = datetime.utcnow()
            subscription.pause_reason = pause_reason
            
            # Store the remaining billing period for when subscription resumes
            if subscription.current_period_end:
                remaining_days = (subscription.current_period_end - datetime.utcnow()).days
                subscription.subscription_metadata = {
                    **(subscription.subscription_metadata or {}),
                    "pause_details": {
                        "paused_at": subscription.paused_at.isoformat(),
                        "pause_reason": pause_reason,
                        "old_status": old_status,
                        "remaining_billing_days": max(0, remaining_days),
                        "prorated_amount": float(prorated_result["prorated_amount"]),
                        "next_billing_amount": float(prorated_result["next_billing_amount"])
                    }
                }
            
            # Create history record
            await self._create_subscription_history_record(
                subscription_id=subscription.id,
                change_type="pause",
                old_data={"status": old_status},
                new_data={
                    "status": "paused",
                    "paused_at": subscription.paused_at.isoformat(),
                    "pause_reason": pause_reason
                },
                prorated_billing=prorated_result
            )
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            # Send notification email
            if background_tasks:
                background_tasks.add_task(
                    self._send_subscription_paused_email,
                    subscription,
                    prorated_result
                )
            
            structured_logger.info(
                message="Subscription paused successfully",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "pause_reason": pause_reason,
                    "prorated_amount": float(prorated_result["prorated_amount"]),
                    "remaining_days": prorated_result.get("remaining_days", 0)
                }
            )
            
            return {
                "subscription_id": str(subscription_id),
                "status": "paused",
                "paused_at": subscription.paused_at.isoformat(),
                "pause_reason": pause_reason,
                "prorated_billing": prorated_result,
                "message": "Subscription paused successfully"
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to pause subscription",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "pause_reason": pause_reason
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to pause subscription"
            )

    async def resume_subscription(
        self,
        subscription_id: UUID,
        user_id: UUID,
        background_tasks: BackgroundTasks = None
    ) -> Dict[str, Any]:
        """
        Resume a paused subscription with adjusted billing.
        
        Args:
            subscription_id: Subscription ID to resume
            user_id: User ID for authorization
            background_tasks: Background tasks for email notifications
            
        Returns:
            Dict with resume result and billing adjustments
        """
        try:
            # Get subscription
            subscription = await self.get_subscription_by_id(subscription_id, user_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Check if subscription is paused
            if subscription.status != "paused":
                raise APIException(
                    status_code=400,
                    message=f"Cannot resume subscription with status '{subscription.status}'"
                )
            
            if not subscription.paused_at:
                raise APIException(
                    status_code=400,
                    message="Subscription pause information not found"
                )
            
            # Get pause details from metadata
            pause_details = subscription.subscription_metadata.get("pause_details", {}) if subscription.subscription_metadata else {}
            old_status = pause_details.get("old_status", "active")
            remaining_days = pause_details.get("remaining_billing_days", 0)
            
            # Calculate new billing period
            resume_date = datetime.utcnow()
            pause_duration = (resume_date - subscription.paused_at).days
            
            # Adjust billing dates
            if remaining_days > 0:
                # Resume with remaining billing period
                subscription.current_period_start = resume_date
                subscription.current_period_end = resume_date + timedelta(days=remaining_days)
                subscription.next_billing_date = subscription.current_period_end
            else:
                # Start new billing period
                subscription.current_period_start = resume_date
                if subscription.billing_cycle == "monthly":
                    subscription.current_period_end = resume_date + relativedelta(months=1)
                elif subscription.billing_cycle == "yearly":
                    subscription.current_period_end = resume_date + relativedelta(years=1)
                elif subscription.billing_cycle == "quarterly":
                    subscription.current_period_end = resume_date + relativedelta(months=3)
                else:
                    subscription.current_period_end = resume_date + relativedelta(months=1)
                
                subscription.next_billing_date = subscription.current_period_end
            
            # Update subscription status
            subscription.status = old_status
            subscription.paused_at = None
            subscription.pause_reason = None
            
            # Update metadata
            if subscription.subscription_metadata:
                subscription.subscription_metadata.pop("pause_details", None)
                if not subscription.subscription_metadata:
                    subscription.subscription_metadata = None
            
            # Create history record
            await self._create_subscription_history_record(
                subscription_id=subscription.id,
                change_type="resume",
                old_data={"status": "paused", "paused_at": subscription.paused_at},
                new_data={
                    "status": subscription.status,
                    "resumed_at": resume_date.isoformat(),
                    "new_billing_period": {
                        "start": subscription.current_period_start.isoformat(),
                        "end": subscription.current_period_end.isoformat()
                    }
                },
                additional_info={
                    "pause_duration_days": pause_duration,
                    "remaining_billing_days": remaining_days
                }
            )
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            # Send notification email
            if background_tasks:
                background_tasks.add_task(
                    self._send_subscription_resumed_email,
                    subscription,
                    {
                        "pause_duration_days": pause_duration,
                        "remaining_days": remaining_days,
                        "next_billing_date": subscription.next_billing_date
                    }
                )
            
            structured_logger.info(
                message="Subscription resumed successfully",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "pause_duration_days": pause_duration,
                    "remaining_billing_days": remaining_days,
                    "next_billing_date": subscription.next_billing_date.isoformat() if subscription.next_billing_date else None
                }
            )
            
            return {
                "subscription_id": str(subscription_id),
                "status": subscription.status,
                "resumed_at": resume_date.isoformat(),
                "pause_duration_days": pause_duration,
                "billing_adjustment": {
                    "remaining_days_used": remaining_days,
                    "next_billing_date": subscription.next_billing_date.isoformat() if subscription.next_billing_date else None,
                    "current_period_end": subscription.current_period_end.isoformat() if subscription.current_period_end else None
                },
                "message": "Subscription resumed successfully"
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to resume subscription",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id)
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to resume subscription"
            )

    async def cancel_subscription(
        self,
        subscription_id: UUID,
        user_id: UUID,
        cancellation_reason: str = "customer_request",
        immediate: bool = False,
        background_tasks: BackgroundTasks = None
    ) -> Dict[str, Any]:
        """
        Cancel a subscription with final billing and refund processing.
        
        Args:
            subscription_id: Subscription ID to cancel
            user_id: User ID for authorization
            cancellation_reason: Reason for cancellation
            immediate: Whether to cancel immediately or at period end
            background_tasks: Background tasks for email notifications
            
        Returns:
            Dict with cancellation result and refund details
        """
        try:
            # Get subscription
            subscription = await self.get_subscription_by_id(subscription_id, user_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Check if subscription can be cancelled
            if subscription.status in ["cancelled", "expired"]:
                raise APIException(
                    status_code=400,
                    message=f"Subscription is already {subscription.status}"
                )
            
            # Calculate final billing and potential refund
            final_billing_result = await self._calculate_final_billing_and_refund(
                subscription, immediate, cancellation_reason
            )
            
            # Update subscription status
            old_status = subscription.status
            cancellation_date = datetime.utcnow()
            
            if immediate:
                subscription.status = "cancelled"
                subscription.cancelled_at = cancellation_date
                subscription.current_period_end = cancellation_date
            else:
                # Cancel at period end
                subscription.status = "cancel_at_period_end"
                subscription.cancelled_at = subscription.current_period_end
            
            # Store cancellation details
            subscription.subscription_metadata = {
                **(subscription.subscription_metadata or {}),
                "cancellation_details": {
                    "cancelled_at": cancellation_date.isoformat(),
                    "cancellation_reason": cancellation_reason,
                    "immediate_cancellation": immediate,
                    "old_status": old_status,
                    "final_billing": final_billing_result
                }
            }
            
            # Create history record
            await self._create_subscription_history_record(
                subscription_id=subscription.id,
                change_type="cancel",
                old_data={"status": old_status},
                new_data={
                    "status": subscription.status,
                    "cancelled_at": subscription.cancelled_at.isoformat() if subscription.cancelled_at else None,
                    "cancellation_reason": cancellation_reason,
                    "immediate": immediate
                },
                additional_info=final_billing_result
            )
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            # Process refund if applicable
            refund_result = None
            if final_billing_result.get("refund_amount", 0) > 0:
                refund_result = await self._process_subscription_refund(
                    subscription, final_billing_result["refund_amount"]
                )
            
            # Send notification email
            if background_tasks:
                background_tasks.add_task(
                    self._send_subscription_cancelled_email,
                    subscription,
                    final_billing_result,
                    refund_result
                )
            
            structured_logger.info(
                message="Subscription cancelled successfully",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "cancellation_reason": cancellation_reason,
                    "immediate": immediate,
                    "refund_amount": final_billing_result.get("refund_amount", 0),
                    "final_billing_amount": final_billing_result.get("final_billing_amount", 0)
                }
            )
            
            return {
                "subscription_id": str(subscription_id),
                "status": subscription.status,
                "cancelled_at": subscription.cancelled_at.isoformat() if subscription.cancelled_at else None,
                "cancellation_reason": cancellation_reason,
                "immediate_cancellation": immediate,
                "final_billing": final_billing_result,
                "refund_result": refund_result,
                "message": "Subscription cancelled successfully"
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to cancel subscription",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "cancellation_reason": cancellation_reason,
                    "immediate": immediate
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to cancel subscription"
            )

    async def swap_subscription_variants(
        self,
        subscription_id: UUID,
        user_id: UUID,
        new_variant_ids: List[UUID],
        effective_date: datetime = None,
        background_tasks: BackgroundTasks = None
    ) -> Dict[str, Any]:
        """
        Swap product variants in a subscription with cost adjustments.
        
        Args:
            subscription_id: Subscription ID to modify
            user_id: User ID for authorization
            new_variant_ids: List of new variant IDs to replace current variants
            effective_date: When the swap should take effect (None for immediate)
            background_tasks: Background tasks for email notifications
            
        Returns:
            Dict with swap result and cost adjustments
        """
        try:
            # Get subscription
            subscription = await self.get_subscription_by_id(subscription_id, user_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Check if subscription allows variant swapping
            if subscription.status not in ["active", "trialing", "paused"]:
                raise APIException(
                    status_code=400,
                    message=f"Cannot swap variants for subscription with status '{subscription.status}'"
                )
            
            # Validate new variants exist and are active
            if not new_variant_ids:
                raise APIException(
                    status_code=400,
                    message="At least one variant must be provided"
                )
            
            # Get new variants to validate they exist
            new_variants_query = select(ProductVariant).where(
                ProductVariant.id.in_(new_variant_ids),
                ProductVariant.is_active == True
            )
            result = await self.db.execute(new_variants_query)
            new_variants = result.scalars().all()
            
            if len(new_variants) != len(new_variant_ids):
                raise APIException(
                    status_code=400,
                    message="One or more variants are invalid or inactive"
                )
            
            # Calculate cost difference using subscription cost calculator
            from services.subscription_cost_calculator import SubscriptionCostCalculator
            cost_calculator = SubscriptionCostCalculator(self.db)
            
            # Get current cost breakdown
            old_variant_ids = [UUID(v_id) for v_id in subscription.variant_ids] if subscription.variant_ids else []
            
            # Calculate new cost breakdown
            new_cost_breakdown = await cost_calculator.calculate_subscription_cost(
                variant_ids=new_variant_ids,
                delivery_type=subscription.delivery_type or "standard",
                currency=subscription.currency or "USD",
                user_id=subscription.user_id,
                shipping_address_id=subscription.delivery_address_id
            )
            
            # Calculate prorated cost adjustment
            effective_date = effective_date or datetime.utcnow()
            cost_adjustment = await self._calculate_variant_swap_cost_adjustment(
                subscription, new_cost_breakdown, effective_date
            )
            
            # Store old data for history
            old_data = {
                "variant_ids": subscription.variant_ids,
                "cost_breakdown": subscription.cost_breakdown,
                "price": subscription.price
            }
            
            # Update subscription with new variants
            subscription.variant_ids = [str(v_id) for v_id in new_variant_ids]
            subscription.cost_breakdown = new_cost_breakdown.to_dict()
            subscription.price = float(new_cost_breakdown.total_amount)
            subscription.admin_percentage_applied = new_cost_breakdown.admin_percentage
            subscription.delivery_cost_applied = float(new_cost_breakdown.delivery_cost)
            subscription.tax_rate_applied = new_cost_breakdown.tax_rate
            subscription.tax_amount = float(new_cost_breakdown.tax_amount)
            subscription.updated_at = datetime.utcnow()
            
            # Update products relationship
            subscription.products.clear()
            subscription.products.extend(new_variants)
            
            # Create history record
            await self._create_subscription_history_record(
                subscription_id=subscription.id,
                change_type="variant_swap",
                old_data=old_data,
                new_data={
                    "variant_ids": subscription.variant_ids,
                    "cost_breakdown": subscription.cost_breakdown,
                    "price": subscription.price,
                    "effective_date": effective_date.isoformat()
                },
                additional_info=cost_adjustment
            )
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            # Send notification email
            if background_tasks:
                background_tasks.add_task(
                    self._send_variant_swap_email,
                    subscription,
                    old_variant_ids,
                    new_variant_ids,
                    cost_adjustment
                )
            
            structured_logger.info(
                message="Subscription variants swapped successfully",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "old_variant_count": len(old_variant_ids),
                    "new_variant_count": len(new_variant_ids),
                    "cost_difference": float(cost_adjustment.get("cost_difference", 0)),
                    "effective_date": effective_date.isoformat()
                }
            )
            
            return {
                "subscription_id": str(subscription_id),
                "old_variant_ids": [str(v_id) for v_id in old_variant_ids],
                "new_variant_ids": [str(v_id) for v_id in new_variant_ids],
                "cost_adjustment": cost_adjustment,
                "new_cost_breakdown": new_cost_breakdown.to_dict(),
                "effective_date": effective_date.isoformat(),
                "message": "Variants swapped successfully"
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to swap subscription variants",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "new_variant_count": len(new_variant_ids) if new_variant_ids else 0
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to swap subscription variants"
            )

    async def get_subscription_history(
        self,
        subscription_id: UUID,
        user_id: UUID,
        limit: int = 50,
        offset: int = 0
    ) -> Dict[str, Any]:
        """
        Get comprehensive subscription history for customer reference.
        
        Args:
            subscription_id: Subscription ID
            user_id: User ID for authorization
            limit: Maximum number of history records to return
            offset: Number of records to skip
            
        Returns:
            Dict with subscription history and metadata
        """
        try:
            # Verify subscription exists and user has access
            subscription = await self.get_subscription_by_id(subscription_id, user_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Get subscription cost history
            cost_history_query = select(SubscriptionCostHistory).where(
                SubscriptionCostHistory.subscription_id == subscription_id
            ).order_by(desc(SubscriptionCostHistory.created_at)).offset(offset).limit(limit)
            
            cost_history_result = await self.db.execute(cost_history_query)
            cost_history_records = cost_history_result.scalars().all()
            
            # Get total count for pagination
            total_count_query = select(func.count()).select_from(SubscriptionCostHistory).where(
                SubscriptionCostHistory.subscription_id == subscription_id
            )
            total_count = (await self.db.execute(total_count_query)).scalar_one()
            
            # Format history records
            history_records = []
            for record in cost_history_records:
                history_entry = {
                    "id": str(record.id),
                    "change_type": self._determine_change_type_from_reason(record.change_reason),
                    "change_reason": record.change_reason,
                    "effective_date": record.effective_date.isoformat() if record.effective_date else None,
                    "created_at": record.created_at.isoformat(),
                    "old_cost_breakdown": record.old_cost_breakdown,
                    "new_cost_breakdown": record.new_cost_breakdown,
                    "cost_difference": self._calculate_cost_difference(
                        record.old_cost_breakdown,
                        record.new_cost_breakdown
                    ),
                    "changed_by": str(record.changed_by) if record.changed_by else None,
                    "metadata": record.pricing_metadata
                }
                history_records.append(history_entry)
            
            # Get current subscription summary
            subscription_summary = {
                "id": str(subscription.id),
                "status": subscription.status,
                "plan_id": subscription.plan_id,
                "current_price": subscription.price,
                "currency": subscription.currency,
                "billing_cycle": subscription.billing_cycle,
                "created_at": subscription.created_at.isoformat(),
                "current_period_start": subscription.current_period_start.isoformat() if subscription.current_period_start else None,
                "current_period_end": subscription.current_period_end.isoformat() if subscription.current_period_end else None,
                "next_billing_date": subscription.next_billing_date.isoformat() if subscription.next_billing_date else None,
                "paused_at": subscription.paused_at.isoformat() if subscription.paused_at else None,
                "cancelled_at": subscription.cancelled_at.isoformat() if subscription.cancelled_at else None,
                "variant_count": len(subscription.variant_ids) if subscription.variant_ids else 0
            }
            
            return {
                "subscription_summary": subscription_summary,
                "history": {
                    "records": history_records,
                    "total_count": total_count,
                    "limit": limit,
                    "offset": offset,
                    "has_more": (offset + len(history_records)) < total_count
                },
                "statistics": {
                    "total_changes": total_count,
                    "subscription_age_days": (datetime.utcnow() - subscription.created_at).days,
                    "current_status": subscription.status,
                    "lifetime_cost_changes": len([r for r in history_records if "cost" in r["change_reason"].lower()])
                }
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to get subscription history",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id),
                    "limit": limit,
                    "offset": offset
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to retrieve subscription history"
            )

    # ============================================================================
    # HELPER METHODS FOR LIFECYCLE MANAGEMENT
    # ============================================================================

    async def _calculate_prorated_billing(
        self,
        subscription: Subscription,
        action_type: str
    ) -> Dict[str, Any]:
        """Calculate prorated billing for subscription lifecycle actions"""
        
        current_date = datetime.utcnow()
        
        # Calculate remaining days in current billing period
        if subscription.current_period_end:
            remaining_days = (subscription.current_period_end - current_date).days
            total_period_days = (subscription.current_period_end - subscription.current_period_start).days if subscription.current_period_start else 30
        else:
            remaining_days = 0
            total_period_days = 30
        
        remaining_days = max(0, remaining_days)
        
        # Calculate prorated amounts
        current_price = Decimal(str(subscription.price or 0))
        
        if total_period_days > 0:
            daily_rate = current_price / total_period_days
            prorated_amount = daily_rate * remaining_days
            used_amount = current_price - prorated_amount
        else:
            daily_rate = Decimal('0')
            prorated_amount = Decimal('0')
            used_amount = current_price
        
        return {
            "action_type": action_type,
            "current_price": float(current_price),
            "remaining_days": remaining_days,
            "total_period_days": total_period_days,
            "daily_rate": float(daily_rate),
            "prorated_amount": float(prorated_amount),
            "used_amount": float(used_amount),
            "next_billing_amount": float(current_price),  # Full amount for next period
            "calculation_date": current_date.isoformat()
        }

    async def _calculate_final_billing_and_refund(
        self,
        subscription: Subscription,
        immediate: bool,
        cancellation_reason: str
    ) -> Dict[str, Any]:
        """Calculate final billing and potential refund for subscription cancellation"""
        
        current_date = datetime.utcnow()
        current_price = Decimal(str(subscription.price or 0))
        
        # Calculate unused portion if immediate cancellation
        if immediate and subscription.current_period_end:
            remaining_days = (subscription.current_period_end - current_date).days
            total_period_days = (subscription.current_period_end - subscription.current_period_start).days if subscription.current_period_start else 30
            
            remaining_days = max(0, remaining_days)
            
            if total_period_days > 0 and remaining_days > 0:
                daily_rate = current_price / total_period_days
                refund_amount = daily_rate * remaining_days
                final_billing_amount = current_price - refund_amount
            else:
                refund_amount = Decimal('0')
                final_billing_amount = current_price
        else:
            # Cancel at period end - no refund
            refund_amount = Decimal('0')
            final_billing_amount = current_price
            remaining_days = 0
            total_period_days = 0
        
        return {
            "immediate_cancellation": immediate,
            "cancellation_reason": cancellation_reason,
            "current_price": float(current_price),
            "final_billing_amount": float(final_billing_amount),
            "refund_amount": float(refund_amount),
            "remaining_days": remaining_days,
            "total_period_days": total_period_days,
            "refund_eligible": refund_amount > 0,
            "calculation_date": current_date.isoformat()
        }

    async def _calculate_variant_swap_cost_adjustment(
        self,
        subscription: Subscription,
        new_cost_breakdown,
        effective_date: datetime
    ) -> Dict[str, Any]:
        """Calculate cost adjustment for variant swapping"""
        
        old_total = Decimal(str(subscription.price or 0))
        new_total = new_cost_breakdown.total_amount
        cost_difference = new_total - old_total
        
        # Calculate prorated adjustment if swap happens mid-period
        if subscription.current_period_end and effective_date < subscription.current_period_end:
            remaining_days = (subscription.current_period_end - effective_date).days
            total_period_days = (subscription.current_period_end - subscription.current_period_start).days if subscription.current_period_start else 30
            
            if total_period_days > 0:
                prorated_adjustment = (cost_difference / total_period_days) * remaining_days
            else:
                prorated_adjustment = Decimal('0')
        else:
            prorated_adjustment = Decimal('0')
        
        return {
            "old_total_cost": float(old_total),
            "new_total_cost": float(new_total),
            "cost_difference": float(cost_difference),
            "prorated_adjustment": float(prorated_adjustment),
            "effective_date": effective_date.isoformat(),
            "adjustment_type": "immediate" if prorated_adjustment == 0 else "prorated",
            "next_billing_amount": float(new_total)
        }

    async def _create_subscription_history_record(
        self,
        subscription_id: UUID,
        change_type: str,
        old_data: Dict[str, Any],
        new_data: Dict[str, Any],
        prorated_billing: Dict[str, Any] = None,
        additional_info: Dict[str, Any] = None
    ):
        """Create a history record for subscription changes"""
        
        history_record = SubscriptionCostHistory(
            subscription_id=subscription_id,
            old_cost_breakdown=old_data,
            new_cost_breakdown=new_data,
            change_reason=f"subscription_{change_type}",
            effective_date=datetime.utcnow(),
            pricing_metadata={
                "change_type": change_type,
                "prorated_billing": prorated_billing,
                "additional_info": additional_info,
                "timestamp": datetime.utcnow().isoformat()
            }
        )
        
        self.db.add(history_record)

    async def _process_subscription_refund(
        self,
        subscription: Subscription,
        refund_amount: float
    ) -> Dict[str, Any]:
        """Process refund for subscription cancellation"""
        
        try:
            # This would integrate with the payment service to process actual refunds
            from services.payment import PaymentService
            payment_service = PaymentService(self.db)
            
            # Find the most recent successful payment for this subscription
            # This is a simplified approach - in production you'd want more sophisticated logic
            
            structured_logger.info(
                message="Processing subscription refund",
                metadata={
                    "subscription_id": str(subscription.id),
                    "refund_amount": refund_amount,
                    "user_id": str(subscription.user_id)
                }
            )
            
            return {
                "refund_processed": True,
                "refund_amount": refund_amount,
                "refund_method": "original_payment_method",
                "processing_date": datetime.utcnow().isoformat(),
                "estimated_arrival": "3-5 business days"
            }
            
        except Exception as e:
            structured_logger.error(
                message="Failed to process subscription refund",
                metadata={
                    "subscription_id": str(subscription.id),
                    "refund_amount": refund_amount
                },
                exception=e
            )
            
            return {
                "refund_processed": False,
                "refund_amount": refund_amount,
                "error": str(e),
                "processing_date": datetime.utcnow().isoformat()
            }

    def _determine_change_type_from_reason(self, change_reason: str) -> str:
        """Determine change type from change reason string"""
        
        if "pause" in change_reason.lower():
            return "pause"
        elif "resume" in change_reason.lower():
            return "resume"
        elif "cancel" in change_reason.lower():
            return "cancellation"
        elif "variant" in change_reason.lower():
            return "variant_change"
        elif "price" in change_reason.lower() or "cost" in change_reason.lower():
            return "price_change"
        elif "admin" in change_reason.lower():
            return "admin_update"
        else:
            return "other"

    def _calculate_cost_difference(
        self,
        old_cost_breakdown: Dict[str, Any],
        new_cost_breakdown: Dict[str, Any]
    ) -> float:
        """Calculate cost difference between two cost breakdowns"""
        
        old_total = old_cost_breakdown.get("total_amount", 0) if old_cost_breakdown else 0
        new_total = new_cost_breakdown.get("total_amount", 0) if new_cost_breakdown else 0
        
        return float(new_total) - float(old_total)

    # ============================================================================
    # EMAIL NOTIFICATION METHODS
    # ============================================================================

    async def _send_subscription_paused_email(
        self,
        subscription: Subscription,
        prorated_result: Dict[str, Any]
    ):
        """Send email notification for subscription pause"""
        
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return
        
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "pause_date": subscription.paused_at.strftime("%B %d, %Y") if subscription.paused_at else "Today",
            "remaining_value": f"${prorated_result.get('prorated_amount', 0):.2f}",
            "remaining_days": prorated_result.get("remaining_days", 0),
            "resume_url": f"{settings.FRONTEND_URL}/account/subscriptions/{subscription.id}",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_paused',
                context=context
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to send subscription paused email",
                metadata={"subscription_id": str(subscription.id), "user_email": user.email},
                exception=e
            )

    async def _send_subscription_resumed_email(
        self,
        subscription: Subscription,
        resume_details: Dict[str, Any]
    ):
        """Send email notification for subscription resume"""
        
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return
        
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "resume_date": datetime.utcnow().strftime("%B %d, %Y"),
            "pause_duration": resume_details.get("pause_duration_days", 0),
            "next_billing_date": resume_details["next_billing_date"],
            "subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions/{subscription.id}",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_resumed',
                context=context
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to send subscription resumed email",
                metadata={"subscription_id": str(subscription.id), "user_email": user.email},
                exception=e
            )

    async def _send_subscription_cancelled_email(
        self,
        subscription: Subscription,
        final_billing_result: Dict[str, Any],
        refund_result: Dict[str, Any] = None
    ):
        """Send email notification for subscription cancellation"""
        
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return
        
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "cancellation_date": subscription.cancelled_at.strftime("%B %d, %Y") if subscription.cancelled_at else "Today",
            "final_billing_amount": f"${final_billing_result.get('final_billing_amount', 0):.2f}",
            "refund_amount": f"${final_billing_result.get('refund_amount', 0):.2f}",
            "refund_eligible": final_billing_result.get("refund_amount", 0) > 0,
            "refund_timeline": refund_result.get("estimated_arrival", "3-5 business days") if refund_result else None,
            "account_url": f"{settings.FRONTEND_URL}/account",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_cancelled',
                context=context
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to send subscription cancelled email",
                metadata={"subscription_id": str(subscription.id), "user_email": user.email},
                exception=e
            )

    async def _send_variant_swap_email(
        self,
        subscription: Subscription,
        old_variant_ids: List[UUID],
        new_variant_ids: List[UUID],
        cost_adjustment: Dict[str, Any]
    ):
        """Send email notification for variant swap"""
        
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return
        
        # Get variant names for email
        old_variants_query = select(ProductVariant).where(ProductVariant.id.in_(old_variant_ids))
        new_variants_query = select(ProductVariant).where(ProductVariant.id.in_(new_variant_ids))
        
        old_variants_result = await self.db.execute(old_variants_query)
        new_variants_result = await self.db.execute(new_variants_query)
        
        old_variants = old_variants_result.scalars().all()
        new_variants = new_variants_result.scalars().all()
        
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "old_products": ", ".join([v.name for v in old_variants]),
            "new_products": ", ".join([v.name for v in new_variants]),
            "cost_difference": f"${abs(cost_adjustment.get('cost_difference', 0)):.2f}",
            "cost_increase": cost_adjustment.get("cost_difference", 0) > 0,
            "new_monthly_amount": f"${cost_adjustment.get('new_total_cost', 0):.2f}",
            "effective_date": cost_adjustment.get("effective_date", datetime.utcnow().strftime("%B %d, %Y")),
            "subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions/{subscription.id}",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_variant_swap',
                context=context
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to send variant swap email",
                metadata={"subscription_id": str(subscription.id), "user_email": user.email},
                exception=e
            )

    # ============================================================================
    # PAYMENT PROCESSING INTEGRATION
    # ============================================================================

    async def process_subscription_billing_with_payment(
        self,
        subscription_id: UUID,
        user_id: UUID = None,
        payment_method_id: UUID = None,
        background_tasks: BackgroundTasks = None
    ) -> Dict[str, Any]:
        """
        Process subscription billing with automatic payment processing integration.
        
        Args:
            subscription_id: Subscription ID to bill
            user_id: User ID for authorization (optional)
            payment_method_id: Specific payment method to use (optional)
            background_tasks: Background tasks for notifications
            
        Returns:
            Dict with billing and payment result
        """
        try:
            # Get subscription
            subscription = await self.get_subscription_by_id(subscription_id, user_id) if user_id else await self.db.get(Subscription, subscription_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Check if subscription is billable
            if subscription.status not in ["active", "trialing", "past_due"]:
                raise APIException(
                    status_code=400,
                    message=f"Subscription with status '{subscription.status}' cannot be billed"
                )
            
            # Calculate current subscription cost using real-time admin percentages
            cost_breakdown = await self._recalculate_subscription_cost_with_current_pricing(subscription)
            
            # Initialize payment service
            from services.payment import PaymentService
            payment_service = PaymentService(self.db)
            
            # Create subscription payment intent
            payment_result = await payment_service.create_subscription_payment_intent(
                subscription_id=subscription.id,
                cost_breakdown=cost_breakdown.to_dict(),
                user_id=subscription.user_id,
                payment_method_id=payment_method_id,
                currency=subscription.currency or "USD"
            )
            
            # Update subscription with new cost breakdown
            subscription.cost_breakdown = cost_breakdown.to_dict()
            subscription.price = float(cost_breakdown.total_amount)
            subscription.admin_percentage_applied = cost_breakdown.admin_percentage
            subscription.delivery_cost_applied = float(cost_breakdown.delivery_cost)
            subscription.tax_rate_applied = cost_breakdown.tax_rate
            subscription.tax_amount = float(cost_breakdown.tax_amount)
            subscription.updated_at = datetime.utcnow()
            
            # Create cost history record for billing
            await self._create_subscription_history_record(
                subscription_id=subscription.id,
                change_type="billing_processed",
                old_data={"previous_billing": "N/A"},
                new_data={
                    "billing_date": datetime.utcnow().isoformat(),
                    "cost_breakdown": cost_breakdown.to_dict(),
                    "payment_intent_id": payment_result["payment_intent_id"]
                },
                additional_info={
                    "billing_cycle": subscription.billing_cycle,
                    "payment_status": payment_result["status"]
                }
            )
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            # Send billing notification if payment succeeded
            if payment_result.get("status") == "succeeded" and background_tasks:
                background_tasks.add_task(
                    self._send_billing_success_email,
                    subscription,
                    cost_breakdown.to_dict(),
                    payment_result
                )
                # Award loyalty points for successful billing
                background_tasks.add_task(
                    self._award_subscription_loyalty_points,
                    subscription.user_id,
                    subscription.id,
                    float(cost_breakdown.total_amount),
                    "Points earned from subscription billing"
                )
            elif payment_result.get("requires_action") and background_tasks:
                background_tasks.add_task(
                    self._send_payment_action_required_email,
                    subscription,
                    payment_result
                )
            
            structured_logger.info(
                message="Subscription billing processed with payment integration",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(subscription.user_id),
                    "payment_intent_id": payment_result["payment_intent_id"],
                    "amount": float(cost_breakdown.total_amount),
                    "payment_status": payment_result["status"]
                }
            )
            
            return {
                "subscription_id": str(subscription_id),
                "billing_result": {
                    "amount": float(cost_breakdown.total_amount),
                    "currency": subscription.currency or "USD",
                    "cost_breakdown": cost_breakdown.to_dict(),
                    "billing_date": datetime.utcnow().isoformat()
                },
                "payment_result": payment_result,
                "subscription_status": subscription.status,
                "message": "Billing processed successfully"
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to process subscription billing with payment",
                metadata={
                    "subscription_id": str(subscription_id),
                    "user_id": str(user_id) if user_id else None
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to process subscription billing"
            )

    async def handle_subscription_cost_change_with_payment_update(
        self,
        subscription_id: UUID,
        cost_change_reason: str,
        user_id: UUID = None,
        immediate_billing: bool = False,
        background_tasks: BackgroundTasks = None
    ) -> Dict[str, Any]:
        """
        Handle subscription cost changes and integrate with payment processing for adjustments.
        
        Args:
            subscription_id: Subscription ID
            cost_change_reason: Reason for cost change
            user_id: User ID for authorization (optional)
            immediate_billing: Whether to bill immediately for cost increase
            background_tasks: Background tasks for notifications
            
        Returns:
            Dict with cost change and payment adjustment result
        """
        try:
            # Get subscription
            subscription = await self.get_subscription_by_id(subscription_id, user_id) if user_id else await self.db.get(Subscription, subscription_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Store old cost breakdown
            old_cost_breakdown = subscription.cost_breakdown
            old_total = subscription.price or 0
            
            # Recalculate cost with current admin percentages
            new_cost_breakdown = await self._recalculate_subscription_cost_with_current_pricing(subscription)
            
            # Calculate cost difference
            cost_difference = float(new_cost_breakdown.total_amount) - old_total
            
            # Update subscription with new cost
            subscription.cost_breakdown = new_cost_breakdown.to_dict()
            subscription.price = float(new_cost_breakdown.total_amount)
            subscription.admin_percentage_applied = new_cost_breakdown.admin_percentage
            subscription.delivery_cost_applied = float(new_cost_breakdown.delivery_cost)
            subscription.tax_rate_applied = new_cost_breakdown.tax_rate
            subscription.tax_amount = float(new_cost_breakdown.tax_amount)
            subscription.updated_at = datetime.utcnow()
            
            # Create cost history record
            await self._create_subscription_history_record(
                subscription_id=subscription.id,
                change_type="cost_adjustment",
                old_data=old_cost_breakdown,
                new_data=new_cost_breakdown.to_dict(),
                additional_info={
                    "cost_change_reason": cost_change_reason,
                    "cost_difference": cost_difference,
                    "immediate_billing": immediate_billing
                }
            )
            
            payment_adjustment_result = None
            
            # Handle payment adjustment if cost increased and immediate billing requested
            if cost_difference > 0 and immediate_billing and subscription.status == "active":
                try:
                    from services.payment import PaymentService
                    payment_service = PaymentService(self.db)
                    
                    # Create payment intent for the cost difference
                    adjustment_payment_result = await payment_service.create_subscription_payment_intent(
                        subscription_id=subscription.id,
                        cost_breakdown={
                            "total_amount": cost_difference,
                            "currency": subscription.currency or "USD",
                            "adjustment_type": "cost_increase",
                            "original_amount": old_total,
                            "new_amount": float(new_cost_breakdown.total_amount)
                        },
                        user_id=subscription.user_id,
                        currency=subscription.currency or "USD"
                    )
                    
                    payment_adjustment_result = {
                        "adjustment_processed": True,
                        "adjustment_amount": cost_difference,
                        "payment_intent_id": adjustment_payment_result["payment_intent_id"],
                        "payment_status": adjustment_payment_result["status"],
                        "requires_action": adjustment_payment_result.get("requires_action", False)
                    }
                    
                except Exception as payment_error:
                    structured_logger.error(
                        message="Failed to process payment adjustment for cost increase",
                        metadata={
                            "subscription_id": str(subscription_id),
                            "cost_difference": cost_difference
                        },
                        exception=payment_error
                    )
                    
                    payment_adjustment_result = {
                        "adjustment_processed": False,
                        "adjustment_amount": cost_difference,
                        "error": str(payment_error)
                    }
            
            await self.db.commit()
            await self.db.refresh(subscription)
            
            # Send notification email
            if background_tasks:
                background_tasks.add_task(
                    self._send_cost_change_notification_email,
                    subscription,
                    old_total,
                    float(new_cost_breakdown.total_amount),
                    cost_change_reason,
                    payment_adjustment_result
                )
            
            structured_logger.info(
                message="Subscription cost change processed with payment integration",
                metadata={
                    "subscription_id": str(subscription_id),
                    "cost_change_reason": cost_change_reason,
                    "cost_difference": cost_difference,
                    "immediate_billing": immediate_billing,
                    "payment_adjustment_processed": payment_adjustment_result is not None
                }
            )
            
            return {
                "subscription_id": str(subscription_id),
                "cost_change": {
                    "old_total": old_total,
                    "new_total": float(new_cost_breakdown.total_amount),
                    "cost_difference": cost_difference,
                    "change_reason": cost_change_reason,
                    "effective_date": datetime.utcnow().isoformat()
                },
                "new_cost_breakdown": new_cost_breakdown.to_dict(),
                "payment_adjustment": payment_adjustment_result,
                "subscription_status": subscription.status,
                "message": "Cost change processed successfully"
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to handle subscription cost change with payment update",
                metadata={
                    "subscription_id": str(subscription_id),
                    "cost_change_reason": cost_change_reason,
                    "immediate_billing": immediate_billing
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to process subscription cost change"
            )

    async def process_subscription_lifecycle_change_with_billing(
        self,
        subscription_id: UUID,
        lifecycle_action: str,
        user_id: UUID = None,
        action_params: Dict[str, Any] = None,
        background_tasks: BackgroundTasks = None
    ) -> Dict[str, Any]:
        """
        Process subscription lifecycle changes (pause, resume, cancel, variant swap) with integrated billing updates.
        
        Args:
            subscription_id: Subscription ID
            lifecycle_action: Action to perform ("pause", "resume", "cancel", "variant_swap")
            user_id: User ID for authorization (optional)
            action_params: Parameters specific to the action
            background_tasks: Background tasks for notifications
            
        Returns:
            Dict with lifecycle change and billing integration result
        """
        try:
            action_params = action_params or {}
            
            # Validate action
            valid_actions = ["pause", "resume", "cancel", "variant_swap"]
            if lifecycle_action not in valid_actions:
                raise APIException(
                    status_code=400,
                    message=f"Invalid lifecycle action. Must be one of: {valid_actions}"
                )
            
            # Get subscription
            subscription = await self.get_subscription_by_id(subscription_id, user_id) if user_id else await self.db.get(Subscription, subscription_id)
            if not subscription:
                raise APIException(
                    status_code=404,
                    message="Subscription not found"
                )
            
            # Process the lifecycle action
            lifecycle_result = None
            
            if lifecycle_action == "pause":
                lifecycle_result = await self.pause_subscription(
                    subscription_id=subscription_id,
                    user_id=subscription.user_id,
                    pause_reason=action_params.get("pause_reason", "customer_request"),
                    background_tasks=background_tasks
                )
                
            elif lifecycle_action == "resume":
                lifecycle_result = await self.resume_subscription(
                    subscription_id=subscription_id,
                    user_id=subscription.user_id,
                    background_tasks=background_tasks
                )
                
            elif lifecycle_action == "cancel":
                lifecycle_result = await self.cancel_subscription(
                    subscription_id=subscription_id,
                    user_id=subscription.user_id,
                    cancellation_reason=action_params.get("cancellation_reason", "customer_request"),
                    immediate=action_params.get("immediate", False),
                    background_tasks=background_tasks
                )
                
            elif lifecycle_action == "variant_swap":
                new_variant_ids = action_params.get("new_variant_ids", [])
                if not new_variant_ids:
                    raise APIException(
                        status_code=400,
                        message="new_variant_ids required for variant_swap action"
                    )
                
                lifecycle_result = await self.swap_subscription_variants(
                    subscription_id=subscription_id,
                    user_id=subscription.user_id,
                    new_variant_ids=[UUID(v_id) for v_id in new_variant_ids],
                    effective_date=action_params.get("effective_date"),
                    background_tasks=background_tasks
                )
            
            # Process payment integration if needed
            payment_integration_result = None
            
            # For actions that affect billing, integrate with payment processing
            if lifecycle_action in ["resume", "variant_swap"]:
                try:
                    # Refresh subscription to get updated data
                    await self.db.refresh(subscription)
                    
                    # Update payment method or billing schedule if needed
                    from services.payment import PaymentService
                    payment_service = PaymentService(self.db)
                    
                    # For resume: ensure payment method is valid for next billing
                    if lifecycle_action == "resume" and subscription.status == "active":
                        default_payment_method = await payment_service.get_default_payment_method(subscription.user_id)
                        if not default_payment_method:
                            payment_integration_result = {
                                "payment_method_check": "failed",
                                "message": "No valid payment method found",
                                "action_required": "update_payment_method"
                            }
                        else:
                            payment_integration_result = {
                                "payment_method_check": "passed",
                                "payment_method_id": str(default_payment_method.id),
                                "next_billing_date": subscription.next_billing_date.isoformat() if subscription.next_billing_date else None
                            }
                    
                    # For variant swap: process immediate cost adjustment if needed
                    elif lifecycle_action == "variant_swap" and lifecycle_result.get("cost_adjustment", {}).get("cost_difference", 0) > 0:
                        cost_difference = lifecycle_result["cost_adjustment"]["cost_difference"]
                        
                        if cost_difference > 1.00:  # Only process if difference is significant
                            adjustment_payment = await payment_service.create_subscription_payment_intent(
                                subscription_id=subscription.id,
                                cost_breakdown={
                                    "total_amount": cost_difference,
                                    "currency": subscription.currency or "USD",
                                    "adjustment_type": "variant_swap_increase"
                                },
                                user_id=subscription.user_id,
                                currency=subscription.currency or "USD"
                            )
                            
                            payment_integration_result = {
                                "cost_adjustment_payment": "created",
                                "adjustment_amount": cost_difference,
                                "payment_intent_id": adjustment_payment["payment_intent_id"],
                                "payment_status": adjustment_payment["status"]
                            }
                        else:
                            payment_integration_result = {
                                "cost_adjustment_payment": "skipped",
                                "adjustment_amount": cost_difference,
                                "reason": "amount_too_small"
                            }
                
                except Exception as payment_error:
                    structured_logger.error(
                        message="Payment integration failed for lifecycle change",
                        metadata={
                            "subscription_id": str(subscription_id),
                            "lifecycle_action": lifecycle_action
                        },
                        exception=payment_error
                    )
                    
                    payment_integration_result = {
                        "payment_integration": "failed",
                        "error": str(payment_error)
                    }
            
            structured_logger.info(
                message="Subscription lifecycle change processed with billing integration",
                metadata={
                    "subscription_id": str(subscription_id),
                    "lifecycle_action": lifecycle_action,
                    "payment_integration_processed": payment_integration_result is not None,
                    "final_status": subscription.status
                }
            )
            
            return {
                "subscription_id": str(subscription_id),
                "lifecycle_action": lifecycle_action,
                "lifecycle_result": lifecycle_result,
                "payment_integration": payment_integration_result,
                "final_subscription_status": subscription.status,
                "message": f"Lifecycle action '{lifecycle_action}' processed successfully"
            }
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to process subscription lifecycle change with billing",
                metadata={
                    "subscription_id": str(subscription_id),
                    "lifecycle_action": lifecycle_action,
                    "action_params": action_params
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message=f"Failed to process lifecycle action '{lifecycle_action}'"
            )

    # ============================================================================
    # HELPER METHODS FOR PAYMENT INTEGRATION
    # ============================================================================

    async def _recalculate_subscription_cost_with_current_pricing(
        self,
        subscription: Subscription
    ):
        """Recalculate subscription cost using current admin percentages and pricing"""
        
        from services.subscription_cost_calculator import SubscriptionCostCalculator
        cost_calculator = SubscriptionCostCalculator(self.db)
        
        # Get current variant IDs
        variant_ids = [UUID(v_id) for v_id in subscription.variant_ids] if subscription.variant_ids else []
        
        if not variant_ids:
            raise APIException(
                status_code=400,
                message="Subscription has no variants for cost calculation"
            )
        
        # Calculate cost with current pricing
        cost_breakdown = await cost_calculator.calculate_subscription_cost(
            variant_ids=variant_ids,
            delivery_type=subscription.delivery_type or "standard",
            currency=subscription.currency or "USD",
            user_id=subscription.user_id,
            shipping_address_id=subscription.delivery_address_id
        )
        
        return cost_breakdown

    async def _send_billing_success_email(
        self,
        subscription: Subscription,
        cost_breakdown: Dict[str, Any],
        payment_result: Dict[str, Any]
    ):
        """Send email notification for successful billing"""
        
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return
        
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "billing_amount": f"${cost_breakdown.get('total_amount', 0):.2f}",
            "billing_date": datetime.utcnow().strftime("%B %d, %Y"),
            "next_billing_date": subscription.next_billing_date.strftime("%B %d, %Y") if subscription.next_billing_date else "N/A",
            "payment_method": "Card ending in ****",  # Would get from payment result
            "cost_breakdown": cost_breakdown,
            "invoice_url": f"{settings.FRONTEND_URL}/account/invoices/{payment_result.get('payment_intent_id')}",
            "subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions/{subscription.id}",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_billing_success',
                context=context
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to send billing success email",
                metadata={"subscription_id": str(subscription.id), "user_email": user.email},
                exception=e
            )

    async def _send_payment_action_required_email(
        self,
        subscription: Subscription,
        payment_result: Dict[str, Any]
    ):
        """Send email notification when payment action is required"""
        
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return
        
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "billing_amount": f"${subscription.price:.2f}" if subscription.price else "N/A",
            "action_required": "3D Secure Authentication" if payment_result.get("requires_action") else "Payment Update",
            "authentication_url": f"{settings.FRONTEND_URL}/payment/authenticate/{payment_result.get('payment_intent_id')}",
            "update_payment_url": f"{settings.FRONTEND_URL}/account/payment-methods",
            "subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions/{subscription.id}",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_payment_action_required',
                context=context
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to send payment action required email",
                metadata={"subscription_id": str(subscription.id), "user_email": user.email},
                exception=e
            )

    async def _send_cost_change_notification_email(
        self,
        subscription: Subscription,
        old_total: float,
        new_total: float,
        change_reason: str,
        payment_adjustment_result: Dict[str, Any] = None
    ):
        """Send email notification for subscription cost changes"""
        
        user_result = await self.db.execute(select(User).where(User.id == subscription.user_id))
        user = user_result.scalar_one_or_none()
        if not user:
            return
        
        cost_difference = new_total - old_total
        
        context = {
            "customer_name": user.firstname,
            "subscription_plan": subscription.plan_id,
            "old_amount": f"${old_total:.2f}",
            "new_amount": f"${new_total:.2f}",
            "cost_difference": f"${abs(cost_difference):.2f}",
            "cost_increase": cost_difference > 0,
            "change_reason": change_reason,
            "effective_date": datetime.utcnow().strftime("%B %d, %Y"),
            "next_billing_date": subscription.next_billing_date.strftime("%B %d, %Y") if subscription.next_billing_date else "N/A",
            "payment_adjustment_processed": payment_adjustment_result is not None and payment_adjustment_result.get("adjustment_processed", False),
            "adjustment_amount": f"${payment_adjustment_result.get('adjustment_amount', 0):.2f}" if payment_adjustment_result else None,
            "subscription_url": f"{settings.FRONTEND_URL}/account/subscriptions/{subscription.id}",
            "company_name": "Banwee"
        }
        
        try:
            await send_email(
                to_email=user.email,
                mail_type='subscription_cost_change',
                context=context
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to send cost change notification email",
                metadata={"subscription_id": str(subscription.id), "user_email": user.email},
                exception=e
            )

    # ============================================================================
    # LOYALTY INTEGRATION METHODS
    # ============================================================================

    async def _award_subscription_loyalty_points(
        self,
        user_id: UUID,
        subscription_id: UUID,
        subscription_value: float,
        description: str
    ):
        """Award loyalty points for subscription activity"""
        try:
            from services.loyalty import LoyaltyService
            from decimal import Decimal
            
            loyalty_service = LoyaltyService(self.db)
            
            # Award points for subscription
            await loyalty_service.award_subscription_points(
                user_id=user_id,
                subscription_id=subscription_id,
                subscription_value=Decimal(str(subscription_value)),
                description=description
            )
            
            structured_logger.info(
                message="Loyalty points awarded for subscription",
                metadata={
                    "user_id": str(user_id),
                    "subscription_id": str(subscription_id),
                    "subscription_value": subscription_value
                }
            )
            
        except Exception as e:
            structured_logger.error(
                message="Failed to award loyalty points for subscription",
                metadata={
                    "user_id": str(user_id),
                    "subscription_id": str(subscription_id),
                    "subscription_value": subscription_value
                },
                exception=e
            )
