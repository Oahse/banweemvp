from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc, func
from typing import Optional, Dict, Any, List
from datetime import datetime
from uuid import UUID
import uuid
from decimal import Decimal

from models.pricing_config import PricingConfig, SubscriptionCostHistory
from models.subscription import Subscription
from models.product import ProductVariant
from core.exceptions import APIException
from core.utils.logging import structured_logger


class AdminPricingService:
    """Service for managing admin-configurable pricing settings"""
    
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_pricing_config(self) -> Optional[PricingConfig]:
        """Get the current active pricing configuration"""
        try:
            query = select(PricingConfig).where(
                PricingConfig.is_active == "active"
            ).order_by(desc(PricingConfig.created_at))
            
            result = await self.db.execute(query)
            config = result.scalar_one_or_none()
            
            if not config:
                # Create default configuration if none exists
                config = await self._create_default_pricing_config()
            
            return config
            
        except Exception as e:
            structured_logger.error(
                message="Failed to get pricing configuration",
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to retrieve pricing configuration"
            )

    async def update_subscription_percentage(
        self, 
        percentage: float, 
        admin_user_id: UUID,
        change_reason: Optional[str] = None
    ) -> PricingConfig:
        """Update the subscription percentage with validation and audit logging"""
        try:
            # Validate percentage range (0.1% to 50%)
            if not (0.1 <= percentage <= 50.0):
                raise APIException(
                    status_code=400,
                    message=f"Subscription percentage must be between 0.1% and 50%. Provided: {percentage}%"
                )
            
            # Get current configuration
            current_config = await self.get_pricing_config()
            
            # Create new configuration with updated percentage
            new_config = PricingConfig(
                id=uuid.uuid4(),
                subscription_percentage=percentage,
                delivery_costs=current_config.delivery_costs if current_config else {},
                tax_rates=current_config.tax_rates if current_config else {},
                currency_settings=current_config.currency_settings if current_config else {"default": "USD"},
                updated_by=admin_user_id,
                version=self._increment_version(current_config.version if current_config else "1.0"),
                is_active="active",
                change_reason=change_reason or f"Subscription percentage updated to {percentage}%"
            )
            
            # Deactivate current configuration
            if current_config:
                current_config.is_active = "inactive"
            
            # Save new configuration
            self.db.add(new_config)
            await self.db.commit()
            await self.db.refresh(new_config)
            
            # Log the change
            await self._log_pricing_change(
                old_config=current_config,
                new_config=new_config,
                change_type="subscription_percentage_update",
                admin_user_id=admin_user_id
            )
            
            structured_logger.info(
                message="Subscription percentage updated successfully",
                metadata={
                    "old_percentage": current_config.subscription_percentage if current_config else None,
                    "new_percentage": percentage,
                    "admin_user_id": str(admin_user_id),
                    "config_id": str(new_config.id)
                }
            )
            
            return new_config
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to update subscription percentage",
                metadata={
                    "percentage": percentage,
                    "admin_user_id": str(admin_user_id)
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to update subscription percentage"
            )

    async def update_delivery_costs(
        self,
        delivery_costs: Dict[str, float],
        admin_user_id: UUID,
        change_reason: Optional[str] = None
    ) -> PricingConfig:
        """Update delivery costs with validation and audit logging"""
        try:
            # Validate delivery costs
            self._validate_delivery_costs(delivery_costs)
            
            # Get current configuration
            current_config = await self.get_pricing_config()
            
            # Create new configuration with updated delivery costs
            new_config = PricingConfig(
                id=uuid.uuid4(),
                subscription_percentage=current_config.subscription_percentage if current_config else 10.0,
                delivery_costs=delivery_costs,
                tax_rates=current_config.tax_rates if current_config else {},
                currency_settings=current_config.currency_settings if current_config else {"default": "USD"},
                updated_by=admin_user_id,
                version=self._increment_version(current_config.version if current_config else "1.0"),
                is_active="active",
                change_reason=change_reason or "Delivery costs updated"
            )
            
            # Deactivate current configuration
            if current_config:
                current_config.is_active = "inactive"
            
            # Save new configuration
            self.db.add(new_config)
            await self.db.commit()
            await self.db.refresh(new_config)
            
            # Log the change
            await self._log_pricing_change(
                old_config=current_config,
                new_config=new_config,
                change_type="delivery_costs_update",
                admin_user_id=admin_user_id
            )
            
            structured_logger.info(
                message="Delivery costs updated successfully",
                metadata={
                    "old_delivery_costs": current_config.delivery_costs if current_config else None,
                    "new_delivery_costs": delivery_costs,
                    "admin_user_id": str(admin_user_id),
                    "config_id": str(new_config.id)
                }
            )
            
            return new_config
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to update delivery costs",
                metadata={
                    "delivery_costs": delivery_costs,
                    "admin_user_id": str(admin_user_id)
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to update delivery costs"
            )

    async def get_pricing_audit_log(
        self,
        page: int = 1,
        limit: int = 20,
        admin_user_id: Optional[UUID] = None
    ) -> Dict[str, Any]:
        """Get pricing configuration audit log with pagination"""
        try:
            offset = (page - 1) * limit
            
            # Build query
            query = select(PricingConfig).order_by(desc(PricingConfig.created_at))
            count_query = select(func.count(PricingConfig.id))
            
            # Filter by admin user if specified
            if admin_user_id:
                query = query.where(PricingConfig.updated_by == admin_user_id)
                count_query = count_query.where(PricingConfig.updated_by == admin_user_id)
            
            # Execute queries
            total_result = await self.db.execute(count_query)
            total = total_result.scalar()
            
            paginated_query = query.offset(offset).limit(limit)
            result = await self.db.execute(paginated_query)
            configs = result.scalars().all()
            
            # Format audit entries
            audit_entries = []
            for config in configs:
                audit_entries.append({
                    "id": str(config.id),
                    "subscription_percentage": config.subscription_percentage,
                    "delivery_costs": config.delivery_costs,
                    "tax_rates": config.tax_rates,
                    "currency_settings": config.currency_settings,
                    "updated_by": str(config.updated_by),
                    "version": config.version,
                    "is_active": config.is_active,
                    "change_reason": config.change_reason,
                    "created_at": config.created_at.isoformat() if config.created_at else None,
                    "updated_at": config.updated_at.isoformat() if config.updated_at else None
                })
            
            return {
                "audit_entries": audit_entries,
                "pagination": {
                    "page": page,
                    "limit": limit,
                    "total": total,
                    "pages": (total + limit - 1) // limit if total > 0 else 0
                }
            }
            
        except Exception as e:
            structured_logger.error(
                message="Failed to get pricing audit log",
                metadata={
                    "page": page,
                    "limit": limit,
                    "admin_user_id": str(admin_user_id) if admin_user_id else None
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to retrieve pricing audit log"
            )

    async def _create_default_pricing_config(self) -> PricingConfig:
        """Create default pricing configuration"""
        default_config = PricingConfig(
            id=uuid.uuid4(),
            subscription_percentage=10.0,  # Default 10%
            delivery_costs={
                "standard": 10.0,
                "express": 25.0,
                "overnight": 50.0
            },
            tax_rates={
                "US": 0.08,
                "CA": 0.13,
                "UK": 0.20
            },
            currency_settings={
                "default": "USD",
                "supported": ["USD", "EUR", "GBP", "CAD"]
            },
            updated_by=uuid.uuid4(),  # System user ID
            version="1.0",
            is_active="active",
            change_reason="Initial default configuration"
        )
        
        self.db.add(default_config)
        await self.db.commit()
        await self.db.refresh(default_config)
        
        return default_config

    def _validate_delivery_costs(self, delivery_costs: Dict[str, float]) -> None:
        """Validate delivery costs structure and values"""
        if not isinstance(delivery_costs, dict):
            raise APIException(
                status_code=400,
                message="Delivery costs must be a dictionary"
            )
        
        # Check for required delivery types
        required_types = ["standard", "express", "overnight"]
        for delivery_type in required_types:
            if delivery_type not in delivery_costs:
                raise APIException(
                    status_code=400,
                    message=f"Missing required delivery type: {delivery_type}"
                )
        
        # Validate cost values
        for delivery_type, cost in delivery_costs.items():
            if not isinstance(cost, (int, float)) or cost < 0:
                raise APIException(
                    status_code=400,
                    message=f"Invalid cost for {delivery_type}: must be a non-negative number"
                )

    def _increment_version(self, current_version: str) -> str:
        """Increment version number"""
        try:
            parts = current_version.split('.')
            major, minor = int(parts[0]), int(parts[1])
            return f"{major}.{minor + 1}"
        except (ValueError, IndexError):
            return "1.1"

    async def preview_pricing_impact(
        self,
        proposed_changes: Dict[str, Any],
        admin_user_id: UUID
    ) -> Dict[str, Any]:
        """Preview the impact of proposed pricing changes on existing subscriptions"""
        try:
            current_config = await self.get_pricing_config()
            if not current_config:
                raise APIException(
                    status_code=404,
                    message="No current pricing configuration found"
                )
            
            # Create a temporary config with proposed changes
            proposed_config = self._create_proposed_config(current_config, proposed_changes)
            
            # Get all active subscriptions
            active_subscriptions = await self._get_active_subscriptions()
            
            # Calculate impact for each subscription
            impact_analysis = {
                "affected_subscriptions_count": len(active_subscriptions),
                "total_revenue_impact": Decimal('0'),
                "subscription_impacts": [],
                "summary": {
                    "increased_cost_count": 0,
                    "decreased_cost_count": 0,
                    "no_change_count": 0,
                    "average_cost_change": Decimal('0'),
                    "max_cost_increase": Decimal('0'),
                    "max_cost_decrease": Decimal('0')
                },
                "proposed_changes": proposed_changes,
                "current_config": current_config.to_dict(),
                "proposed_config": {
                    "subscription_percentage": proposed_config["subscription_percentage"],
                    "delivery_costs": proposed_config["delivery_costs"],
                    "tax_rates": proposed_config["tax_rates"]
                }
            }
            
            total_cost_change = Decimal('0')
            
            for subscription in active_subscriptions:
                # Calculate current cost
                current_cost = await self._calculate_subscription_cost(
                    subscription, current_config
                )
                
                # Calculate proposed cost
                proposed_cost = await self._calculate_subscription_cost_with_config(
                    subscription, proposed_config
                )
                
                cost_difference = proposed_cost - current_cost
                percentage_change = (
                    (cost_difference / current_cost * 100) 
                    if current_cost > 0 else Decimal('0')
                )
                
                # Update summary statistics
                if cost_difference > 0:
                    impact_analysis["summary"]["increased_cost_count"] += 1
                    if cost_difference > impact_analysis["summary"]["max_cost_increase"]:
                        impact_analysis["summary"]["max_cost_increase"] = cost_difference
                elif cost_difference < 0:
                    impact_analysis["summary"]["decreased_cost_count"] += 1
                    if abs(cost_difference) > impact_analysis["summary"]["max_cost_decrease"]:
                        impact_analysis["summary"]["max_cost_decrease"] = abs(cost_difference)
                else:
                    impact_analysis["summary"]["no_change_count"] += 1
                
                total_cost_change += cost_difference
                
                # Add individual subscription impact
                impact_analysis["subscription_impacts"].append({
                    "subscription_id": str(subscription.id),
                    "user_id": str(subscription.user_id),
                    "current_cost": float(current_cost),
                    "proposed_cost": float(proposed_cost),
                    "cost_difference": float(cost_difference),
                    "percentage_change": float(percentage_change),
                    "billing_cycle": subscription.billing_cycle,
                    "status": subscription.status
                })
            
            # Calculate averages and totals
            if len(active_subscriptions) > 0:
                impact_analysis["summary"]["average_cost_change"] = float(
                    total_cost_change / len(active_subscriptions)
                )
            
            impact_analysis["total_revenue_impact"] = float(total_cost_change)
            impact_analysis["summary"]["max_cost_increase"] = float(
                impact_analysis["summary"]["max_cost_increase"]
            )
            impact_analysis["summary"]["max_cost_decrease"] = float(
                impact_analysis["summary"]["max_cost_decrease"]
            )
            
            structured_logger.info(
                message="Pricing impact analysis completed",
                metadata={
                    "admin_user_id": str(admin_user_id),
                    "affected_subscriptions": len(active_subscriptions),
                    "total_revenue_impact": float(total_cost_change),
                    "proposed_changes": proposed_changes
                }
            )
            
            return impact_analysis
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to preview pricing impact",
                metadata={
                    "proposed_changes": proposed_changes,
                    "admin_user_id": str(admin_user_id)
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to analyze pricing impact"
            )

    async def get_cost_comparison_tools(
        self,
        subscription_id: Optional[UUID] = None,
        sample_variants: Optional[List[UUID]] = None
    ) -> Dict[str, Any]:
        """Get cost comparison tools for current vs proposed pricing"""
        try:
            current_config = await self.get_pricing_config()
            if not current_config:
                raise APIException(
                    status_code=404,
                    message="No current pricing configuration found"
                )
            
            comparison_data = {
                "current_config": current_config.to_dict(),
                "sample_calculations": []
            }
            
            # If specific subscription provided, calculate for that subscription
            if subscription_id:
                subscription = await self._get_subscription_by_id(subscription_id)
                if subscription:
                    current_cost = await self._calculate_subscription_cost(
                        subscription, current_config
                    )
                    comparison_data["sample_calculations"].append({
                        "type": "existing_subscription",
                        "subscription_id": str(subscription_id),
                        "current_cost": float(current_cost),
                        "breakdown": await self._get_cost_breakdown(subscription, current_config)
                    })
            
            # If sample variants provided, calculate sample costs
            if sample_variants:
                for i, variant_ids in enumerate([sample_variants]):
                    variants = await self._get_variants_by_ids(variant_ids)
                    if variants:
                        sample_cost = await self._calculate_sample_cost(variants, current_config)
                        comparison_data["sample_calculations"].append({
                            "type": "sample_calculation",
                            "sample_id": f"sample_{i+1}",
                            "variant_ids": [str(v_id) for v_id in variant_ids],
                            "current_cost": float(sample_cost),
                            "breakdown": await self._get_sample_cost_breakdown(variants, current_config)
                        })
            
            # Add default sample calculations if none provided
            if not subscription_id and not sample_variants:
                # Create sample calculations with different delivery types
                sample_variants_list = await self._get_sample_variants()
                for delivery_type in ["standard", "express", "overnight"]:
                    if sample_variants_list:
                        sample_cost = await self._calculate_sample_cost_with_delivery(
                            sample_variants_list[:3], current_config, delivery_type
                        )
                        comparison_data["sample_calculations"].append({
                            "type": "sample_with_delivery",
                            "delivery_type": delivery_type,
                            "variant_count": len(sample_variants_list[:3]),
                            "current_cost": float(sample_cost),
                            "breakdown": await self._get_sample_cost_breakdown_with_delivery(
                                sample_variants_list[:3], current_config, delivery_type
                            )
                        })
            
            return comparison_data
            
        except APIException:
            raise
        except Exception as e:
            structured_logger.error(
                message="Failed to get cost comparison tools",
                metadata={
                    "subscription_id": str(subscription_id) if subscription_id else None,
                    "sample_variants": [str(v) for v in sample_variants] if sample_variants else None
                },
                exception=e
            )
            raise APIException(
                status_code=500,
                message="Failed to get cost comparison tools"
            )

    def _create_proposed_config(
        self, 
        current_config: PricingConfig, 
        proposed_changes: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Create a proposed configuration from current config and changes"""
        proposed = {
            "subscription_percentage": current_config.subscription_percentage,
            "delivery_costs": current_config.delivery_costs.copy(),
            "tax_rates": current_config.tax_rates.copy(),
            "currency_settings": current_config.currency_settings.copy()
        }
        
        # Apply proposed changes
        if "subscription_percentage" in proposed_changes:
            # Validate the proposed percentage
            percentage = proposed_changes["subscription_percentage"]
            if not (0.1 <= percentage <= 50.0):
                raise APIException(
                    status_code=400,
                    message=f"Proposed subscription percentage must be between 0.1% and 50%. Provided: {percentage}%"
                )
            proposed["subscription_percentage"] = percentage
        
        if "delivery_costs" in proposed_changes:
            self._validate_delivery_costs(proposed_changes["delivery_costs"])
            proposed["delivery_costs"] = proposed_changes["delivery_costs"]
        
        if "tax_rates" in proposed_changes:
            proposed["tax_rates"].update(proposed_changes["tax_rates"])
        
        return proposed

    async def _get_active_subscriptions(self) -> List[Subscription]:
        """Get all active subscriptions for impact analysis"""
        query = select(Subscription).where(
            Subscription.status.in_(["active", "trialing"])
        )
        result = await self.db.execute(query)
        return result.scalars().all()

    async def _get_subscription_by_id(self, subscription_id: UUID) -> Optional[Subscription]:
        """Get subscription by ID"""
        query = select(Subscription).where(Subscription.id == subscription_id)
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def _get_variants_by_ids(self, variant_ids: List[UUID]) -> List[ProductVariant]:
        """Get product variants by IDs"""
        query = select(ProductVariant).where(ProductVariant.id.in_(variant_ids))
        result = await self.db.execute(query)
        return result.scalars().all()

    async def _get_sample_variants(self) -> List[ProductVariant]:
        """Get sample variants for cost calculations"""
        query = select(ProductVariant).where(
            ProductVariant.is_active == True
        ).limit(5)
        result = await self.db.execute(query)
        return result.scalars().all()

    async def _calculate_subscription_cost(
        self, 
        subscription: Subscription, 
        config: PricingConfig
    ) -> Decimal:
        """Calculate subscription cost using current configuration"""
        # This is a simplified calculation - in reality would need to get variants
        # For now, use the subscription's current price as base
        base_cost = Decimal(str(subscription.price)) if subscription.price else Decimal('0')
        
        # Apply admin percentage
        admin_fee = base_cost * (Decimal(str(config.subscription_percentage)) / 100)
        
        # Add delivery cost (assume standard delivery for existing subscriptions)
        delivery_cost = Decimal(str(config.delivery_costs.get("standard", 0)))
        
        # Apply tax (assume US tax rate for simplicity)
        tax_rate = Decimal(str(config.tax_rates.get("US", 0)))
        subtotal = base_cost + admin_fee + delivery_cost
        tax_amount = subtotal * tax_rate
        
        return subtotal + tax_amount

    async def _calculate_subscription_cost_with_config(
        self, 
        subscription: Subscription, 
        config: Dict[str, Any]
    ) -> Decimal:
        """Calculate subscription cost using proposed configuration"""
        base_cost = Decimal(str(subscription.price)) if subscription.price else Decimal('0')
        
        # Apply admin percentage
        admin_fee = base_cost * (Decimal(str(config["subscription_percentage"])) / 100)
        
        # Add delivery cost
        delivery_cost = Decimal(str(config["delivery_costs"].get("standard", 0)))
        
        # Apply tax
        tax_rate = Decimal(str(config["tax_rates"].get("US", 0)))
        subtotal = base_cost + admin_fee + delivery_cost
        tax_amount = subtotal * tax_rate
        
        return subtotal + tax_amount

    async def _calculate_sample_cost(
        self, 
        variants: List[ProductVariant], 
        config: PricingConfig
    ) -> Decimal:
        """Calculate sample cost for given variants"""
        base_cost = sum(
            Decimal(str(variant.base_price)) for variant in variants
        )
        
        admin_fee = base_cost * (Decimal(str(config.subscription_percentage)) / 100)
        delivery_cost = Decimal(str(config.delivery_costs.get("standard", 0)))
        tax_rate = Decimal(str(config.tax_rates.get("US", 0)))
        subtotal = base_cost + admin_fee + delivery_cost
        tax_amount = subtotal * tax_rate
        
        return subtotal + tax_amount

    async def _calculate_sample_cost_with_delivery(
        self, 
        variants: List[ProductVariant], 
        config: PricingConfig,
        delivery_type: str
    ) -> Decimal:
        """Calculate sample cost with specific delivery type"""
        base_cost = sum(
            Decimal(str(variant.base_price)) for variant in variants
        )
        
        admin_fee = base_cost * (Decimal(str(config.subscription_percentage)) / 100)
        delivery_cost = Decimal(str(config.delivery_costs.get(delivery_type, 0)))
        tax_rate = Decimal(str(config.tax_rates.get("US", 0)))
        subtotal = base_cost + admin_fee + delivery_cost
        tax_amount = subtotal * tax_rate
        
        return subtotal + tax_amount

    async def _get_cost_breakdown(
        self, 
        subscription: Subscription, 
        config: PricingConfig
    ) -> Dict[str, float]:
        """Get detailed cost breakdown for subscription"""
        base_cost = Decimal(str(subscription.price)) if subscription.price else Decimal('0')
        admin_fee = base_cost * (Decimal(str(config.subscription_percentage)) / 100)
        delivery_cost = Decimal(str(config.delivery_costs.get("standard", 0)))
        tax_rate = Decimal(str(config.tax_rates.get("US", 0)))
        subtotal = base_cost + admin_fee + delivery_cost
        tax_amount = subtotal * tax_rate
        
        return {
            "base_cost": float(base_cost),
            "admin_fee": float(admin_fee),
            "admin_percentage": config.subscription_percentage,
            "delivery_cost": float(delivery_cost),
            "delivery_type": "standard",
            "subtotal": float(subtotal),
            "tax_rate": float(tax_rate * 100),  # Convert to percentage
            "tax_amount": float(tax_amount),
            "total": float(subtotal + tax_amount)
        }

    async def _get_sample_cost_breakdown(
        self, 
        variants: List[ProductVariant], 
        config: PricingConfig
    ) -> Dict[str, float]:
        """Get detailed cost breakdown for sample variants"""
        base_cost = sum(Decimal(str(variant.base_price)) for variant in variants)
        admin_fee = base_cost * (Decimal(str(config.subscription_percentage)) / 100)
        delivery_cost = Decimal(str(config.delivery_costs.get("standard", 0)))
        tax_rate = Decimal(str(config.tax_rates.get("US", 0)))
        subtotal = base_cost + admin_fee + delivery_cost
        tax_amount = subtotal * tax_rate
        
        return {
            "base_cost": float(base_cost),
            "variant_count": len(variants),
            "admin_fee": float(admin_fee),
            "admin_percentage": config.subscription_percentage,
            "delivery_cost": float(delivery_cost),
            "delivery_type": "standard",
            "subtotal": float(subtotal),
            "tax_rate": float(tax_rate * 100),
            "tax_amount": float(tax_amount),
            "total": float(subtotal + tax_amount)
        }

    async def _get_sample_cost_breakdown_with_delivery(
        self, 
        variants: List[ProductVariant], 
        config: PricingConfig,
        delivery_type: str
    ) -> Dict[str, float]:
        """Get detailed cost breakdown for sample variants with specific delivery"""
        base_cost = sum(Decimal(str(variant.base_price)) for variant in variants)
        admin_fee = base_cost * (Decimal(str(config.subscription_percentage)) / 100)
        delivery_cost = Decimal(str(config.delivery_costs.get(delivery_type, 0)))
        tax_rate = Decimal(str(config.tax_rates.get("US", 0)))
        subtotal = base_cost + admin_fee + delivery_cost
        tax_amount = subtotal * tax_rate
        
        return {
            "base_cost": float(base_cost),
            "variant_count": len(variants),
            "admin_fee": float(admin_fee),
            "admin_percentage": config.subscription_percentage,
            "delivery_cost": float(delivery_cost),
            "delivery_type": delivery_type,
            "subtotal": float(subtotal),
            "tax_rate": float(tax_rate * 100),
            "tax_amount": float(tax_amount),
            "total": float(subtotal + tax_amount)
        }

    async def _log_pricing_change(
        self,
        old_config: Optional[PricingConfig],
        new_config: PricingConfig,
        change_type: str,
        admin_user_id: UUID
    ) -> None:
        """Log pricing configuration changes for audit purposes"""
        try:
            # This would typically create an audit log entry
            # For now, we'll use structured logging
            structured_logger.info(
                message="Pricing configuration change logged",
                metadata={
                    "change_type": change_type,
                    "old_config_id": str(old_config.id) if old_config else None,
                    "new_config_id": str(new_config.id),
                    "admin_user_id": str(admin_user_id),
                    "old_subscription_percentage": old_config.subscription_percentage if old_config else None,
                    "new_subscription_percentage": new_config.subscription_percentage,
                    "old_delivery_costs": old_config.delivery_costs if old_config else None,
                    "new_delivery_costs": new_config.delivery_costs,
                    "timestamp": datetime.utcnow().isoformat()
                }
            )
        except Exception as e:
            # Don't fail the main operation if logging fails
            structured_logger.error(
                message="Failed to log pricing change",
                exception=e
            )