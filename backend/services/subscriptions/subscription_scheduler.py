"""
Subscription Scheduler Service
Handles automatic creation of orders for periodic shipments
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from sqlalchemy.orm import selectinload
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from uuid import UUID
import logging

from models.subscriptions import Subscription
from models.orders import Order, OrderItem, OrderStatus, PaymentStatus, FulfillmentStatus, OrderSource
from models.product import ProductVariant
from models.user import User
from services.notifications import NotificationService
from core.database import get_db

logger = logging.getLogger(__name__)


class SubscriptionSchedulerService:
    """Service for managing subscription shipment scheduling"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.notification_service = NotificationService(db)
    
    async def process_due_subscriptions(self) -> Dict[str, Any]:
        """Process all subscriptions that are due for shipment"""
        current_time = datetime.utcnow()
        
        # Find active subscriptions due for next shipment
        result = await self.db.execute(
            select(Subscription).where(
                and_(
                    Subscription.status == "active",
                    Subscription.next_billing_date <= current_time,
                    Subscription.auto_renew == True
                )
            ).options(selectinload(Subscription.products))
        )
        
        due_subscriptions = result.scalars().all()
        
        processed_count = 0
        failed_count = 0
        results = []
        
        for subscription in due_subscriptions:
            try:
                order = await self.create_subscription_order(subscription)
                if order:
                    processed_count += 1
                    results.append({
                        "subscription_id": str(subscription.id),
                        "order_id": str(order.id),
                        "status": "success"
                    })
                    logger.info(f"Created order {order.order_number} for subscription {subscription.id}")
                else:
                    failed_count += 1
                    results.append({
                        "subscription_id": str(subscription.id),
                        "status": "failed",
                        "reason": "Order creation failed"
                    })
            except Exception as e:
                failed_count += 1
                results.append({
                    "subscription_id": str(subscription.id),
                    "status": "failed",
                    "reason": str(e)
                })
                logger.error(f"Failed to process subscription {subscription.id}: {e}")
        
        return {
            "processed_count": processed_count,
            "failed_count": failed_count,
            "total_due": len(due_subscriptions),
            "results": results
        }
    
    async def create_subscription_order(self, subscription: Subscription) -> Optional[Order]:
        """Create an order from a subscription"""
        try:
            # Get user
            user_result = await self.db.execute(
                select(User).where(User.id == subscription.user_id)
            )
            user = user_result.scalar_one_or_none()
            if not user:
                raise Exception(f"User not found for subscription {subscription.id}")
            
            # Get product variants
            if not subscription.variant_ids:
                raise Exception(f"No products in subscription {subscription.id}")
            
            variant_result = await self.db.execute(
                select(ProductVariant).where(
                    ProductVariant.id.in_([UUID(vid) for vid in subscription.variant_ids])
                )
            )
            variants = variant_result.scalars().all()
            
            if not variants:
                raise Exception(f"No valid variants found for subscription {subscription.id}")
            
            # Create order
            order = Order(
                user_id=subscription.user_id,
                order_number=await self._generate_order_number(),
                order_status=OrderStatus.PENDING,
                payment_status=PaymentStatus.PENDING,
                fulfillment_status=FulfillmentStatus.UNFULFILLED,
                source=OrderSource.API,
                subtotal=0.0,
                tax_amount=subscription.tax_amount or 0.0,
                total_amount=subscription.price or 0.0,
                currency=subscription.currency or "USD",
                # Copy delivery info from subscription
                shipping_address=await self._get_delivery_address(subscription),
                subscription_id=subscription.id,
                subscription_metadata={
                    "subscription_id": str(subscription.id),
                    "billing_cycle": subscription.billing_cycle,
                    "delivery_type": subscription.delivery_type
                }
            )
            
            self.db.add(order)
            await self.db.flush()  # Get order ID
            
            # Create order items
            subtotal = 0.0
            for variant in variants:
                # Default quantity to 1, could be stored in subscription metadata
                quantity = 1
                unit_price = variant.price or 0.0
                line_total = unit_price * quantity
                
                order_item = OrderItem(
                    order_id=order.id,
                    product_variant_id=variant.id,
                    quantity=quantity,
                    unit_price=unit_price,
                    total_price=line_total,
                    product_name=variant.product.name if variant.product else "Unknown Product",
                    variant_name=variant.name or "",
                    sku=variant.sku or ""
                )
                
                self.db.add(order_item)
                subtotal += line_total
            
            # Update order totals
            order.subtotal = subtotal
            order.total_amount = subtotal + (subscription.tax_amount or 0.0)
            
            # Update subscription billing dates
            await self._update_subscription_billing_dates(subscription)
            
            await self.db.commit()
            
            # Send notification
            await self.notification_service.create_notification(
                user_id=subscription.user_id,
                message=f"Your subscription order #{order.order_number} has been created and will be shipped soon!",
                type="info",
                related_id=str(order.id)
            )
            
            return order
            
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Failed to create order for subscription {subscription.id}: {e}")
            raise
    
    async def _generate_order_number(self) -> str:
        """Generate unique order number"""
        import uuid
        timestamp = datetime.utcnow().strftime("%Y%m%d")
        short_uuid = str(uuid.uuid4())[:8].upper()
        return f"SUB-{timestamp}-{short_uuid}"
    
    async def _get_delivery_address(self, subscription: Subscription) -> Dict[str, Any]:
        """Get delivery address for subscription order"""
        # This would typically fetch from a user's saved addresses
        # For now, return a placeholder structure
        return {
            "type": "shipping",
            "delivery_type": subscription.delivery_type or "standard"
        }
    
    async def _update_subscription_billing_dates(self, subscription: Subscription):
        """Update subscription billing dates after creating order"""
        current_period_end = subscription.current_period_end or datetime.utcnow()
        
        # Calculate next billing period based on billing cycle
        if subscription.billing_cycle == "weekly":
            next_period_start = current_period_end
            next_period_end = current_period_end + timedelta(weeks=1)
        elif subscription.billing_cycle == "yearly":
            next_period_start = current_period_end
            next_period_end = current_period_end + timedelta(days=365)
        else:  # monthly (default)
            next_period_start = current_period_end
            next_period_end = current_period_end + timedelta(days=30)
        
        subscription.current_period_start = next_period_start
        subscription.current_period_end = next_period_end
        subscription.next_billing_date = next_period_end
        
        # Update metadata
        if not subscription.subscription_metadata:
            subscription.subscription_metadata = {}
        
        subscription.subscription_metadata.update({
            "last_order_created": datetime.utcnow().isoformat(),
            "orders_created_count": subscription.subscription_metadata.get("orders_created_count", 0) + 1
        })


# Standalone function for background task
async def process_subscription_shipments():
    """Background task function to process subscription shipments"""
    async for db in get_db():
        try:
            scheduler = SubscriptionSchedulerService(db)
            result = await scheduler.process_due_subscriptions()
            logger.info(f"Processed subscription shipments: {result}")
            return result
        except Exception as e:
            logger.error(f"Error processing subscription shipments: {e}")
            raise
        finally:
            await db.close()