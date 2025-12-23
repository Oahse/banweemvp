from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import and_, or_, func
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from uuid import UUID
from decimal import Decimal

from models.subscription import Subscription
from models.product import ProductVariant
from models.pricing_config import SubscriptionCostHistory
from services.subscription_cost_calculator import SubscriptionCostCalculator
from core.exceptions import APIException
from core.utils.logging import structured_logger


class DynamicCostRecalculator:
    """Service for handling real-time cost recalculation when subscription parameters change"""
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.cost_calculator = SubscriptionCostCalculator(db)
    
    async def handle_real_time_variant_change(
        self,
        subscription_id: UUID,
        variant_changes: Dict[str, List[UUID]],
        user_id: UUID = None,
        notify_user: bool = True
    ) -> Dict[str, Any]:
        """
        Handle real-time recalculation when variants are added/removed from subscription.
        
        Args:
            subscription_id: Subscription ID to update
            variant_changes: Dict with 'added' and 'removed' variant ID lists
            user_id: User ID for authorization
            notify_user: Whether to send notification to user
            
        Returns:
            Dictionary with recalculation results and notification status
        """
        try:
            added_variants = variant_changes.get('added', [])
            removed_variants = variant_changes.get('removed', [])
            
            # Perform the recalculation
            recalc_result = await self.cost_calculator.recalculate_subscription_on_variant_change(
                subscription_id=subscription_id,
                added_variant_ids=added_variants,
                removed_variant_ids=removed_variants,
                user_id=user_id
            )
            
            # Send real-time notification if requested
            notification_result = None
            if notify_user:
                notification_result = await self._send_cost_change_notification(
                    subscription_id=subscription_id,
                    cost_change_info=recalc_result,
                    change_type="variant_modification"
                )
            
            # Log the real-time change
            await self._log_real_time_change(
                subscription_id=subscription_id,
                change_type="variant_modification",
                change_details=variant_changes,
                cost_impact=recalc_result.get('cost_difference', 0)
            )
            
            result = {
                "recalculation": recalc_result,
                "notification": notification_result,
                "real_time_processing": {
                    "processed_at": datetime.utcnow().isoformat(),
                    "processing_time_ms": self._calculate_processing_time(),
                    "change_type": "variant_modification",
                    "immediate_effect": True
                }
            }
            
            structured_logger.info(
                message="Real-time variant change processed successfully",
                metadata={
                    "subscription_id": str(subscription_id),
                    "added_variants": len(added_variants),
                    "removed_variants": len(removed_variants),
                    "cost_difference": recalc_result.get('cost_difference', 0),
                    "notification_sent": notify_user
                }
            )
            
            return result
            
        except Exception as e:
            structured_logger.error(
                message="Failed to handle real-time variant change",
                metadata={
                    "subscription_id": str(subscription_id),
                    "variant_changes": variant_changes
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to process real-time variant change"
            )
    
    async def handle_real_time_delivery_change(
        self,
        subscription_id: UUID,
        delivery_changes: Dict[str, Any],
        user_id: UUID = None,
        notify_user: bool = True
    ) -> Dict[str, Any]:
        """
        Handle real-time recalculation when delivery preferences change.
        
        Args:
            subscription_id: Subscription ID to update
            delivery_changes: Dict with delivery type and address changes
            user_id: User ID for authorization
            notify_user: Whether to send notification to user
            
        Returns:
            Dictionary with recalculation results and notification status
        """
        try:
            new_delivery_type = delivery_changes.get('delivery_type')
            new_delivery_address_id = delivery_changes.get('delivery_address_id')
            
            # Perform the recalculation
            recalc_result = await self.cost_calculator.recalculate_subscription_on_delivery_change(
                subscription_id=subscription_id,
                new_delivery_type=new_delivery_type,
                new_delivery_address_id=new_delivery_address_id,
                user_id=user_id
            )
            
            # Send real-time notification if requested
            notification_result = None
            if notify_user:
                notification_result = await self._send_cost_change_notification(
                    subscription_id=subscription_id,
                    cost_change_info=recalc_result,
                    change_type="delivery_modification"
                )
            
            # Log the real-time change
            await self._log_real_time_change(
                subscription_id=subscription_id,
                change_type="delivery_modification",
                change_details=delivery_changes,
                cost_impact=recalc_result.get('cost_difference', 0)
            )
            
            result = {
                "recalculation": recalc_result,
                "notification": notification_result,
                "real_time_processing": {
                    "processed_at": datetime.utcnow().isoformat(),
                    "processing_time_ms": self._calculate_processing_time(),
                    "change_type": "delivery_modification",
                    "immediate_effect": True
                }
            }
            
            structured_logger.info(
                message="Real-time delivery change processed successfully",
                metadata={
                    "subscription_id": str(subscription_id),
                    "delivery_type": new_delivery_type,
                    "cost_difference": recalc_result.get('cost_difference', 0),
                    "notification_sent": notify_user
                }
            )
            
            return result
            
        except Exception as e:
            structured_logger.error(
                message="Failed to handle real-time delivery change",
                metadata={
                    "subscription_id": str(subscription_id),
                    "delivery_changes": delivery_changes
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to process real-time delivery change"
            )
    
    async def propagate_price_changes_to_subscriptions(
        self,
        price_change_events: List[Dict[str, Any]],
        admin_user_id: UUID = None,
        batch_size: int = 50
    ) -> Dict[str, Any]:
        """
        Propagate multiple price changes to existing subscriptions in batches.
        
        Args:
            price_change_events: List of price change events
            admin_user_id: Admin user making the changes
            batch_size: Number of subscriptions to process per batch
            
        Returns:
            Dictionary with propagation results
        """
        try:
            total_affected_subscriptions = 0
            successful_updates = 0
            failed_updates = 0
            propagation_results = []
            
            for price_event in price_change_events:
                variant_id = UUID(price_event['variant_id'])
                old_price = Decimal(str(price_event['old_price']))
                new_price = Decimal(str(price_event['new_price']))
                
                try:
                    # Propagate this specific price change
                    updates = await self.cost_calculator.propagate_variant_price_changes(
                        variant_id=variant_id,
                        old_price=old_price,
                        new_price=new_price,
                        admin_user_id=admin_user_id
                    )
                    
                    total_affected_subscriptions += len(updates)
                    successful_updates += len(updates)
                    
                    propagation_results.append({
                        "variant_id": str(variant_id),
                        "price_change": {
                            "old_price": float(old_price),
                            "new_price": float(new_price),
                            "difference": float(new_price - old_price)
                        },
                        "affected_subscriptions": len(updates),
                        "status": "success",
                        "updates": updates
                    })
                    
                except Exception as e:
                    failed_updates += 1
                    propagation_results.append({
                        "variant_id": str(variant_id),
                        "price_change": {
                            "old_price": float(old_price),
                            "new_price": float(new_price),
                            "difference": float(new_price - old_price)
                        },
                        "affected_subscriptions": 0,
                        "status": "failed",
                        "error": str(e)
                    })
                    
                    structured_logger.error(
                        message="Failed to propagate price change for variant",
                        metadata={
                            "variant_id": str(variant_id),
                            "old_price": float(old_price),
                            "new_price": float(new_price)
                        },
                        exception=e
                    )
            
            # Send batch notification to affected users
            if successful_updates > 0:
                await self._send_batch_price_change_notifications(propagation_results)
            
            result = {
                "propagation_summary": {
                    "total_price_changes": len(price_change_events),
                    "total_affected_subscriptions": total_affected_subscriptions,
                    "successful_updates": successful_updates,
                    "failed_updates": failed_updates,
                    "success_rate": (successful_updates / total_affected_subscriptions * 100) if total_affected_subscriptions > 0 else 0
                },
                "propagation_results": propagation_results,
                "processing_info": {
                    "processed_at": datetime.utcnow().isoformat(),
                    "batch_size": batch_size,
                    "admin_user_id": str(admin_user_id) if admin_user_id else None
                }
            }
            
            structured_logger.info(
                message="Price change propagation completed",
                metadata={
                    "total_price_changes": len(price_change_events),
                    "total_affected_subscriptions": total_affected_subscriptions,
                    "successful_updates": successful_updates,
                    "failed_updates": failed_updates
                }
            )
            
            return result
            
        except Exception as e:
            structured_logger.error(
                message="Failed to propagate price changes to subscriptions",
                metadata={
                    "price_change_events_count": len(price_change_events),
                    "admin_user_id": str(admin_user_id) if admin_user_id else None
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to propagate price changes to subscriptions"
            )
    
    async def get_real_time_cost_preview(
        self,
        subscription_id: UUID,
        proposed_changes: Dict[str, Any],
        user_id: UUID = None
    ) -> Dict[str, Any]:
        """
        Get real-time cost preview for proposed subscription changes without applying them.
        
        Args:
            subscription_id: Subscription ID to preview changes for
            proposed_changes: Dictionary of proposed changes
            user_id: User ID for authorization
            
        Returns:
            Dictionary with cost preview information
        """
        try:
            # Get current subscription
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
            
            # Get current cost breakdown
            current_cost = subscription.cost_breakdown or {}
            current_total = current_cost.get("total_amount", 0)
            
            # Calculate proposed cost based on changes
            variant_ids = subscription.variant_ids or []
            delivery_type = subscription.delivery_type or "standard"
            delivery_address_id = subscription.delivery_address_id
            
            # Apply proposed variant changes
            if 'variant_changes' in proposed_changes:
                variant_changes = proposed_changes['variant_changes']
                if 'added' in variant_changes:
                    for variant_id in variant_changes['added']:
                        if str(variant_id) not in variant_ids:
                            variant_ids.append(str(variant_id))
                if 'removed' in variant_changes:
                    for variant_id in variant_changes['removed']:
                        if str(variant_id) in variant_ids:
                            variant_ids.remove(str(variant_id))
            
            # Apply proposed delivery changes
            if 'delivery_type' in proposed_changes:
                delivery_type = proposed_changes['delivery_type']
            if 'delivery_address_id' in proposed_changes:
                delivery_address_id = proposed_changes['delivery_address_id']
            
            # Calculate new cost
            if variant_ids:
                new_cost_breakdown = await self.cost_calculator.calculate_subscription_cost(
                    variant_ids=[UUID(v_id) for v_id in variant_ids],
                    delivery_type=delivery_type,
                    currency=subscription.currency or "USD",
                    user_id=subscription.user_id,
                    shipping_address_id=delivery_address_id
                )
                
                new_total = float(new_cost_breakdown.total_amount)
                cost_difference = new_total - current_total
                percentage_change = self._calculate_percentage_change(current_total, new_total)
                
                preview = {
                    "subscription_id": str(subscription_id),
                    "current_cost": current_cost,
                    "proposed_cost": new_cost_breakdown.to_dict(),
                    "cost_comparison": {
                        "current_total": current_total,
                        "proposed_total": new_total,
                        "cost_difference": cost_difference,
                        "percentage_change": percentage_change,
                        "is_increase": cost_difference > 0,
                        "is_decrease": cost_difference < 0
                    },
                    "proposed_changes": proposed_changes,
                    "preview_generated_at": datetime.utcnow().isoformat(),
                    "preview_valid_for_minutes": 15  # Preview expires after 15 minutes
                }
            else:
                preview = {
                    "subscription_id": str(subscription_id),
                    "error": "No variants remaining after proposed changes",
                    "current_cost": current_cost,
                    "proposed_changes": proposed_changes
                }
            
            structured_logger.info(
                message="Real-time cost preview generated",
                metadata={
                    "subscription_id": str(subscription_id),
                    "cost_difference": preview.get("cost_comparison", {}).get("cost_difference", 0),
                    "has_variant_changes": 'variant_changes' in proposed_changes,
                    "has_delivery_changes": any(k in proposed_changes for k in ['delivery_type', 'delivery_address_id'])
                }
            )
            
            return preview
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to generate real-time cost preview",
                metadata={
                    "subscription_id": str(subscription_id),
                    "proposed_changes": proposed_changes
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to generate cost preview"
            )
    
    async def _send_cost_change_notification(
        self,
        subscription_id: UUID,
        cost_change_info: Dict[str, Any],
        change_type: str
    ) -> Dict[str, Any]:
        """Send real-time notification about cost changes"""
        try:
            # This would integrate with the notification service
            # For now, we'll return a mock notification result
            notification_result = {
                "notification_sent": True,
                "notification_type": "cost_change",
                "change_type": change_type,
                "cost_difference": cost_change_info.get('cost_difference', 0),
                "notification_channels": ["email", "websocket"],
                "sent_at": datetime.utcnow().isoformat()
            }
            
            return notification_result
            
        except Exception as e:
            structured_logger.error(
                message="Failed to send cost change notification",
                metadata={
                    "subscription_id": str(subscription_id),
                    "change_type": change_type
                },
                exception=e
            )
            return {
                "notification_sent": False,
                "error": str(e)
            }
    
    async def _send_batch_price_change_notifications(
        self,
        propagation_results: List[Dict[str, Any]]
    ) -> None:
        """Send batch notifications for price changes"""
        try:
            # Group notifications by user
            user_notifications = {}
            
            for result in propagation_results:
                if result.get('status') == 'success':
                    for update in result.get('updates', []):
                        user_id = update.get('user_id')
                        if user_id not in user_notifications:
                            user_notifications[user_id] = []
                        user_notifications[user_id].append({
                            "subscription_id": update.get('subscription_id'),
                            "cost_difference": update.get('cost_difference'),
                            "variant_id": result.get('variant_id')
                        })
            
            # Send notifications (mock implementation)
            for user_id, notifications in user_notifications.items():
                structured_logger.info(
                    message="Batch price change notification prepared",
                    metadata={
                        "user_id": user_id,
                        "affected_subscriptions": len(notifications)
                    }
                )
            
        except Exception as e:
            structured_logger.error(
                message="Failed to send batch price change notifications",
                exception=e
            )
    
    async def _log_real_time_change(
        self,
        subscription_id: UUID,
        change_type: str,
        change_details: Dict[str, Any],
        cost_impact: float
    ) -> None:
        """Log real-time changes for audit purposes"""
        try:
            structured_logger.info(
                message="Real-time subscription change logged",
                metadata={
                    "subscription_id": str(subscription_id),
                    "change_type": change_type,
                    "change_details": change_details,
                    "cost_impact": cost_impact,
                    "timestamp": datetime.utcnow().isoformat(),
                    "processing_mode": "real_time"
                }
            )
        except Exception as e:
            structured_logger.error(
                message="Failed to log real-time change",
                exception=e
            )
    
    async def _get_subscription_by_id(self, subscription_id: UUID) -> Optional[Subscription]:
        """Get subscription by ID"""
        query = select(Subscription).where(Subscription.id == subscription_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()
    
    def _calculate_processing_time(self) -> int:
        """Calculate processing time in milliseconds (mock implementation)"""
        # In a real implementation, this would track actual processing time
        return 150  # Mock 150ms processing time
    
    def _calculate_percentage_change(self, old_value: float, new_value: float) -> float:
        """Calculate percentage change between two values"""
        if old_value == 0:
            return 100.0 if new_value > 0 else 0.0
        
        return ((new_value - old_value) / old_value) * 100