from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_, or_, desc, asc
from sqlalchemy.orm import selectinload, joinedload
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime, timedelta
from decimal import Decimal

from models.inventory import Inventory, WarehouseLocation, StockAdjustment
from models.product import ProductVariant, Product
from models.subscription import Subscription
from models.variant_tracking import VariantTrackingEntry, VariantAnalytics
from services.inventory import InventoryService
from services.variant_tracking import VariantTrackingService
from services.notification import NotificationService
from core.exceptions import APIException


class InventoryIntegrationService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.inventory_service = InventoryService(db)
        self.variant_tracking_service = VariantTrackingService(db)
        self.notification_service = NotificationService(db)

    async def get_real_time_stock_levels(
        self,
        variant_ids: Optional[List[UUID]] = None,
        location_id: Optional[UUID] = None
    ) -> List[Dict[str, Any]]:
        """
        Get real-time stock levels for variants.
        Requirements: 3.4, 14.1
        """
        query = select(Inventory).options(
            joinedload(Inventory.variant).joinedload(ProductVariant.product),
            joinedload(Inventory.location)
        )
        
        conditions = []
        if variant_ids:
            conditions.append(Inventory.variant_id.in_(variant_ids))
        if location_id:
            conditions.append(Inventory.location_id == location_id)
        
        if conditions:
            query = query.where(and_(*conditions))
        
        result = await self.db.execute(query)
        inventory_items = result.scalars().all()
        
        stock_levels = []
        for item in inventory_items:
            stock_levels.append({
                "variant_id": str(item.variant_id),
                "variant_name": item.variant.name if item.variant else None,
                "product_name": item.variant.product.name if item.variant and item.variant.product else None,
                "location_id": str(item.location_id),
                "location_name": item.location.name if item.location else None,
                "current_quantity": item.quantity,
                "low_stock_threshold": item.low_stock_threshold,
                "is_low_stock": item.quantity <= item.low_stock_threshold,
                "is_out_of_stock": item.quantity <= 0,
                "last_updated": item.updated_at.isoformat() if item.updated_at else None
            })
        
        return stock_levels

    async def handle_out_of_stock_variant(
        self,
        variant_id: UUID,
        notify_customers: bool = True
    ) -> Dict[str, Any]:
        """
        Handle out-of-stock scenarios with automated customer notifications.
        Requirements: 3.4, 14.3
        """
        # Get variant details
        variant_query = select(ProductVariant).options(
            joinedload(ProductVariant.product)
        ).where(ProductVariant.id == variant_id)
        variant_result = await self.db.execute(variant_query)
        variant = variant_result.scalar_one_or_none()
        
        if not variant:
            raise APIException(status_code=404, message="Product variant not found")
        
        # Get inventory status
        inventory_query = select(Inventory).where(Inventory.variant_id == variant_id)
        inventory_result = await self.db.execute(inventory_query)
        inventory = inventory_result.scalar_one_or_none()
        
        if not inventory or inventory.quantity > 0:
            return {"message": "Variant is not out of stock", "action_taken": False}
        
        # Get affected subscriptions
        affected_subscriptions_query = select(Subscription).options(
            joinedload(Subscription.user)
        ).where(
            and_(
                Subscription.variant_ids.contains([str(variant_id)]),
                Subscription.status.in_(["active", "paused"])
            )
        )
        affected_subscriptions_result = await self.db.execute(affected_subscriptions_query)
        affected_subscriptions = affected_subscriptions_result.scalars().all()
        
        # Get substitution suggestions
        substitutions = await self.variant_tracking_service.suggest_variant_substitutions(
            variant_id, limit=3
        )
        
        notifications_sent = 0
        if notify_customers and affected_subscriptions:
            for subscription in affected_subscriptions:
                try:
                    # Send notification to customer
                    notification_data = {
                        "user_id": subscription.user_id,
                        "type": "variant_out_of_stock",
                        "title": "Product Temporarily Unavailable",
                        "message": f"The product '{variant.name}' in your subscription is temporarily out of stock.",
                        "data": {
                            "variant_id": str(variant_id),
                            "variant_name": variant.name,
                            "product_name": variant.product.name if variant.product else None,
                            "subscription_id": str(subscription.id),
                            "substitutions": substitutions[:2]  # Include top 2 substitutions
                        }
                    }
                    
                    await self.notification_service.create_notification(**notification_data)
                    notifications_sent += 1
                    
                except Exception as e:
                    print(f"Failed to send notification to user {subscription.user_id}: {e}")
        
        # Record tracking entry for out of stock
        await self.variant_tracking_service.track_variant_subscription_addition(
            variant_id=variant_id,
            subscription_id=affected_subscriptions[0].id if affected_subscriptions else UUID('00000000-0000-0000-0000-000000000000'),
            price_at_time=variant.current_price,
            metadata={
                "action": "out_of_stock_notification",
                "affected_subscriptions": len(affected_subscriptions),
                "substitutions_available": len(substitutions)
            }
        )
        
        return {
            "variant_id": str(variant_id),
            "variant_name": variant.name,
            "affected_subscriptions": len(affected_subscriptions),
            "notifications_sent": notifications_sent,
            "substitutions_available": len(substitutions),
            "substitutions": substitutions,
            "action_taken": True
        }

    async def predict_demand_based_on_subscriptions(
        self,
        variant_id: UUID,
        forecast_days: int = 30
    ) -> Dict[str, Any]:
        """
        Predict demand based on real subscription patterns.
        Requirements: 14.2
        """
        # Get historical subscription data
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=90)  # Use 90 days of history for prediction
        
        # Get variant tracking entries for demand analysis
        tracking_query = select(VariantTrackingEntry).where(
            and_(
                VariantTrackingEntry.variant_id == variant_id,
                VariantTrackingEntry.tracking_timestamp >= start_date,
                VariantTrackingEntry.tracking_timestamp <= end_date
            )
        ).order_by(VariantTrackingEntry.tracking_timestamp)
        
        tracking_result = await self.db.execute(tracking_query)
        tracking_entries = tracking_result.scalars().all()
        
        # Analyze subscription patterns
        additions_by_week = {}
        removals_by_week = {}
        
        for entry in tracking_entries:
            week_key = entry.tracking_timestamp.strftime("%Y-W%U")
            
            if entry.action_type == "added":
                additions_by_week[week_key] = additions_by_week.get(week_key, 0) + 1
            elif entry.action_type == "removed":
                removals_by_week[week_key] = removals_by_week.get(week_key, 0) + 1
        
        # Calculate average weekly demand
        total_weeks = len(set(additions_by_week.keys()) | set(removals_by_week.keys()))
        if total_weeks == 0:
            return {
                "variant_id": str(variant_id),
                "forecast_days": forecast_days,
                "predicted_demand": 0,
                "confidence_level": 0.0,
                "recommendation": "No historical data available for prediction"
            }
        
        avg_weekly_additions = sum(additions_by_week.values()) / max(total_weeks, 1)
        avg_weekly_removals = sum(removals_by_week.values()) / max(total_weeks, 1)
        net_weekly_demand = avg_weekly_additions - avg_weekly_removals
        
        # Project demand for forecast period
        forecast_weeks = forecast_days / 7
        predicted_demand = max(0, int(net_weekly_demand * forecast_weeks))
        
        # Calculate confidence based on data consistency
        weekly_demands = []
        all_weeks = sorted(set(additions_by_week.keys()) | set(removals_by_week.keys()))
        for week in all_weeks:
            week_additions = additions_by_week.get(week, 0)
            week_removals = removals_by_week.get(week, 0)
            weekly_demands.append(week_additions - week_removals)
        
        if len(weekly_demands) > 1:
            import statistics
            demand_std = statistics.stdev(weekly_demands) if len(weekly_demands) > 1 else 0
            confidence_level = max(0.1, 1.0 - (demand_std / max(abs(net_weekly_demand), 1)))
        else:
            confidence_level = 0.5  # Medium confidence with limited data
        
        # Generate recommendation
        current_stock_query = select(Inventory.quantity).where(Inventory.variant_id == variant_id)
        current_stock_result = await self.db.execute(current_stock_query)
        current_stock = current_stock_result.scalar() or 0
        
        if predicted_demand > current_stock:
            recommendation = f"Reorder recommended: {predicted_demand - current_stock} units needed"
        elif current_stock > predicted_demand * 2:
            recommendation = "Current stock may be excessive for predicted demand"
        else:
            recommendation = "Current stock levels appear adequate"
        
        return {
            "variant_id": str(variant_id),
            "forecast_days": forecast_days,
            "historical_analysis": {
                "weeks_analyzed": total_weeks,
                "avg_weekly_additions": round(avg_weekly_additions, 2),
                "avg_weekly_removals": round(avg_weekly_removals, 2),
                "net_weekly_demand": round(net_weekly_demand, 2)
            },
            "prediction": {
                "predicted_demand": predicted_demand,
                "confidence_level": round(confidence_level, 2),
                "current_stock": current_stock,
                "stock_gap": max(0, predicted_demand - current_stock)
            },
            "recommendation": recommendation
        }

    async def generate_reorder_suggestions(
        self,
        location_id: Optional[UUID] = None,
        days_ahead: int = 30
    ) -> List[Dict[str, Any]]:
        """
        Generate reorder suggestions based on actual consumption rates.
        Requirements: 14.4
        """
        # Get all inventory items that might need reordering
        query = select(Inventory).options(
            joinedload(Inventory.variant).joinedload(ProductVariant.product),
            joinedload(Inventory.location)
        )
        
        if location_id:
            query = query.where(Inventory.location_id == location_id)
        
        result = await self.db.execute(query)
        inventory_items = result.scalars().all()
        
        reorder_suggestions = []
        
        for item in inventory_items:
            # Get demand prediction for this variant
            demand_prediction = await self.predict_demand_based_on_subscriptions(
                item.variant_id, forecast_days=days_ahead
            )
            
            # Calculate consumption rate from stock adjustments
            consumption_query = select(StockAdjustment).where(
                and_(
                    StockAdjustment.inventory_id == item.id,
                    StockAdjustment.quantity_change < 0,  # Only outgoing stock
                    StockAdjustment.created_at >= datetime.utcnow() - timedelta(days=30)
                )
            )
            consumption_result = await self.db.execute(consumption_query)
            consumption_adjustments = consumption_result.scalars().all()
            
            total_consumed = sum(abs(adj.quantity_change) for adj in consumption_adjustments)
            daily_consumption_rate = total_consumed / 30 if consumption_adjustments else 0
            
            # Calculate reorder point
            lead_time_days = 7  # Assume 7-day lead time (could be configurable)
            safety_stock = item.low_stock_threshold
            
            predicted_consumption = daily_consumption_rate * days_ahead
            reorder_point = (daily_consumption_rate * lead_time_days) + safety_stock
            
            # Determine if reorder is needed
            needs_reorder = item.quantity <= reorder_point
            
            if needs_reorder or item.quantity <= item.low_stock_threshold:
                # Calculate suggested order quantity
                # Use Economic Order Quantity (EOQ) concept simplified
                suggested_quantity = max(
                    int(predicted_consumption + safety_stock - item.quantity),
                    item.low_stock_threshold * 2  # Minimum order
                )
                
                urgency = "high" if item.quantity <= 0 else "medium" if item.quantity <= item.low_stock_threshold else "low"
                
                reorder_suggestions.append({
                    "variant_id": str(item.variant_id),
                    "variant_name": item.variant.name if item.variant else None,
                    "product_name": item.variant.product.name if item.variant and item.variant.product else None,
                    "location_id": str(item.location_id),
                    "location_name": item.location.name if item.location else None,
                    "current_stock": item.quantity,
                    "low_stock_threshold": item.low_stock_threshold,
                    "reorder_point": int(reorder_point),
                    "suggested_quantity": suggested_quantity,
                    "urgency": urgency,
                    "consumption_analysis": {
                        "daily_consumption_rate": round(daily_consumption_rate, 2),
                        "predicted_consumption_30_days": int(predicted_consumption),
                        "total_consumed_last_30_days": total_consumed
                    },
                    "demand_prediction": demand_prediction,
                    "days_until_stockout": int(item.quantity / daily_consumption_rate) if daily_consumption_rate > 0 else None
                })
        
        # Sort by urgency and days until stockout
        urgency_order = {"high": 0, "medium": 1, "low": 2}
        reorder_suggestions.sort(key=lambda x: (
            urgency_order.get(x["urgency"], 3),
            x["days_until_stockout"] or 0
        ))
        
        return reorder_suggestions

    async def create_inventory_alerts(
        self,
        variant_id: UUID,
        alert_type: str,
        threshold_value: Optional[int] = None,
        message: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Create inventory alerts for low stock, out of stock, or reorder needs.
        Requirements: 14.1, 14.3
        """
        # Get inventory item
        inventory_query = select(Inventory).options(
            joinedload(Inventory.variant).joinedload(ProductVariant.product),
            joinedload(Inventory.location)
        ).where(Inventory.variant_id == variant_id)
        inventory_result = await self.db.execute(inventory_query)
        inventory = inventory_result.scalar_one_or_none()
        
        if not inventory:
            raise APIException(status_code=404, message="Inventory item not found")
        
        # Determine alert details based on type
        alert_data = {
            "variant_id": str(variant_id),
            "variant_name": inventory.variant.name if inventory.variant else None,
            "product_name": inventory.variant.product.name if inventory.variant and inventory.variant.product else None,
            "location_name": inventory.location.name if inventory.location else None,
            "current_stock": inventory.quantity,
            "alert_type": alert_type,
            "timestamp": datetime.utcnow().isoformat()
        }
        
        if alert_type == "low_stock":
            alert_data.update({
                "threshold": threshold_value or inventory.low_stock_threshold,
                "message": message or f"Stock level is below threshold ({inventory.quantity} <= {inventory.low_stock_threshold})",
                "severity": "medium"
            })
        elif alert_type == "out_of_stock":
            alert_data.update({
                "threshold": 0,
                "message": message or "Product is completely out of stock",
                "severity": "high"
            })
        elif alert_type == "reorder_needed":
            reorder_suggestion = await self.generate_reorder_suggestions()
            matching_suggestion = next(
                (s for s in reorder_suggestion if s["variant_id"] == str(variant_id)), 
                None
            )
            
            alert_data.update({
                "message": message or "Reorder recommended based on consumption patterns",
                "severity": "medium",
                "reorder_suggestion": matching_suggestion
            })
        
        # Create notification for admin users
        try:
            # This would typically notify admin users or inventory managers
            admin_notification_data = {
                "type": "inventory_alert",
                "title": f"Inventory Alert: {alert_type.replace('_', ' ').title()}",
                "message": alert_data["message"],
                "data": alert_data
            }
            
            # Note: In a real implementation, you'd send this to specific admin users
            # For now, we'll just return the alert data
            
        except Exception as e:
            print(f"Failed to create inventory alert notification: {e}")
        
        return alert_data

    async def batch_update_inventory_from_warehouse_data(
        self,
        warehouse_data: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Batch update inventory from real warehouse data.
        Requirements: 14.6
        """
        updated_items = []
        errors = []
        
        for item_data in warehouse_data:
            try:
                variant_id = UUID(item_data["variant_id"])
                new_quantity = item_data["quantity"]
                location_id = UUID(item_data.get("location_id")) if item_data.get("location_id") else None
                
                # Find inventory item
                inventory_query = select(Inventory).where(Inventory.variant_id == variant_id)
                if location_id:
                    inventory_query = inventory_query.where(Inventory.location_id == location_id)
                
                inventory_result = await self.db.execute(inventory_query)
                inventory = inventory_result.scalar_one_or_none()
                
                if not inventory:
                    errors.append({
                        "variant_id": str(variant_id),
                        "error": "Inventory item not found"
                    })
                    continue
                
                # Calculate quantity change
                old_quantity = inventory.quantity
                quantity_change = new_quantity - old_quantity
                
                # Update inventory
                inventory.quantity = new_quantity
                inventory.updated_at = datetime.utcnow()
                
                # Create stock adjustment record
                adjustment = StockAdjustment(
                    inventory_id=inventory.id,
                    quantity_change=quantity_change,
                    reason="warehouse_sync",
                    notes=f"Batch update from warehouse data. Old: {old_quantity}, New: {new_quantity}"
                )
                
                self.db.add(adjustment)
                
                updated_items.append({
                    "variant_id": str(variant_id),
                    "old_quantity": old_quantity,
                    "new_quantity": new_quantity,
                    "quantity_change": quantity_change
                })
                
                # Check if alerts are needed
                if new_quantity <= 0:
                    await self.create_inventory_alerts(variant_id, "out_of_stock")
                elif new_quantity <= inventory.low_stock_threshold:
                    await self.create_inventory_alerts(variant_id, "low_stock")
                
            except Exception as e:
                errors.append({
                    "variant_id": item_data.get("variant_id", "unknown"),
                    "error": str(e)
                })
        
        await self.db.commit()
        
        return {
            "updated_items": len(updated_items),
            "errors": len(errors),
            "details": {
                "updated": updated_items,
                "errors": errors
            }
        }

    async def get_inventory_consumption_analytics(
        self,
        variant_id: Optional[UUID] = None,
        location_id: Optional[UUID] = None,
        days: int = 30
    ) -> Dict[str, Any]:
        """
        Get inventory consumption analytics based on real data.
        Requirements: 14.5
        """
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Build query for stock adjustments
        query = select(StockAdjustment).options(
            joinedload(StockAdjustment.inventory).joinedload(Inventory.variant).joinedload(ProductVariant.product)
        ).where(StockAdjustment.created_at >= start_date)
        
        if variant_id:
            query = query.join(Inventory).where(Inventory.variant_id == variant_id)
        
        if location_id:
            query = query.join(Inventory).where(Inventory.location_id == location_id)
        
        result = await self.db.execute(query)
        adjustments = result.scalars().all()
        
        # Analyze consumption patterns
        consumption_by_variant = {}
        total_consumption = 0
        total_additions = 0
        
        for adjustment in adjustments:
            variant_id_str = str(adjustment.inventory.variant_id)
            
            if variant_id_str not in consumption_by_variant:
                consumption_by_variant[variant_id_str] = {
                    "variant_name": adjustment.inventory.variant.name if adjustment.inventory.variant else None,
                    "product_name": adjustment.inventory.variant.product.name if adjustment.inventory.variant and adjustment.inventory.variant.product else None,
                    "total_consumed": 0,
                    "total_added": 0,
                    "net_change": 0,
                    "adjustment_count": 0
                }
            
            variant_data = consumption_by_variant[variant_id_str]
            variant_data["adjustment_count"] += 1
            
            if adjustment.quantity_change < 0:
                consumed = abs(adjustment.quantity_change)
                variant_data["total_consumed"] += consumed
                total_consumption += consumed
            else:
                variant_data["total_added"] += adjustment.quantity_change
                total_additions += adjustment.quantity_change
            
            variant_data["net_change"] += adjustment.quantity_change
        
        # Calculate rates and trends
        daily_consumption_rate = total_consumption / days if days > 0 else 0
        daily_addition_rate = total_additions / days if days > 0 else 0
        
        # Sort variants by consumption
        sorted_variants = sorted(
            consumption_by_variant.items(),
            key=lambda x: x[1]["total_consumed"],
            reverse=True
        )
        
        return {
            "analysis_period": {
                "days": days,
                "start_date": start_date.isoformat(),
                "end_date": datetime.utcnow().isoformat()
            },
            "summary": {
                "total_consumption": total_consumption,
                "total_additions": total_additions,
                "net_inventory_change": total_additions - total_consumption,
                "daily_consumption_rate": round(daily_consumption_rate, 2),
                "daily_addition_rate": round(daily_addition_rate, 2),
                "variants_analyzed": len(consumption_by_variant)
            },
            "top_consumed_variants": [
                {
                    "variant_id": variant_id,
                    **variant_data,
                    "daily_consumption_rate": round(variant_data["total_consumed"] / days, 2)
                }
                for variant_id, variant_data in sorted_variants[:10]
            ],
            "all_variants": consumption_by_variant
        }