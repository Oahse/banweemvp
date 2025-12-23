from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc, func
from sqlalchemy.orm import selectinload # Import selectinload
from typing import Optional, List, Dict # Import Dict
from fastapi import BackgroundTasks
from models.subscription import Subscription # Import Subscription
from models.product import ProductVariant # Import ProductVariant for linking
from models.user import User
from schemas.subscription import SubscriptionCreate, SubscriptionUpdate
from schemas.product import ProductVariantResponse # Import ProductVariantResponse
from core.exceptions import APIException
from core.utils.messages.email import send_email
from core.config import settings
from uuid import uuid4, UUID
from datetime import datetime


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

    async def create_subscription(self, subscription_data: SubscriptionCreate, user_id: UUID) -> Subscription:
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
