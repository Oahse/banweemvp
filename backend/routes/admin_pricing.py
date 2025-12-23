from uuid import UUID
from datetime import datetime
from fastapi import APIRouter, Depends, Query, status, BackgroundTasks
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, Dict, Any, List
from core.database import get_db
from core.utils.response import Response
from core.exceptions import APIException
from services.admin_pricing import AdminPricingService
from services.analytics import AnalyticsService
from services.enhanced_export import EnhancedExportService
from models.user import User
from services.auth import AuthService

from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_auth_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    return await AuthService.get_current_user(token, db)

router = APIRouter(prefix="/api/v1/admin/pricing", tags=["Admin Pricing"])

def require_admin(current_user: User = Depends(get_current_auth_user)):
    """Require admin role."""
    if current_user.role not in ["Admin", "SuperAdmin"]:
        raise APIException(
            status_code=status.HTTP_403_FORBIDDEN,
            message="Admin access required"
        )
    return current_user

# Request/Response Models
class UpdateSubscriptionPercentageRequest(BaseModel):
    percentage: float
    change_reason: Optional[str] = None

class UpdateDeliveryCostsRequest(BaseModel):
    delivery_costs: Dict[str, float]
    change_reason: Optional[str] = None

class PricingImpactPreviewRequest(BaseModel):
    proposed_changes: Dict[str, Any]

class BulkPricingUpdateRequest(BaseModel):
    subscription_percentage: Optional[float] = None
    delivery_costs: Optional[Dict[str, float]] = None
    tax_rates: Optional[Dict[str, float]] = None
    change_reason: Optional[str] = None
    confirm_bulk_update: bool = False

# Cost Management Interface Routes

@router.get("/config")
async def get_pricing_config(
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Get current pricing configuration."""
    try:
        admin_pricing_service = AdminPricingService(db)
        config = await admin_pricing_service.get_pricing_config()
        
        if not config:
            raise APIException(
                status_code=404,
                message="No pricing configuration found"
            )
        
        return Response(
            success=True, 
            data=config.to_dict(),
            message="Pricing configuration retrieved successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to get pricing configuration: {str(e)}"
        )

@router.get("/revenue-metrics")
async def get_real_time_revenue_metrics(
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Display real-time subscription revenue metrics."""
    try:
        analytics_service = AnalyticsService(db)
        
        # Get current date range (last 30 days)
        from datetime import datetime, timedelta
        end_date = datetime.now()
        start_date = end_date - timedelta(days=30)
        
        # Get subscription metrics
        from services.analytics import DateRange, AnalyticsFilters
        date_range = DateRange(start_date=start_date, end_date=end_date)
        filters = AnalyticsFilters()
        
        subscription_metrics = await analytics_service.get_subscription_metrics(
            date_range, filters
        )
        
        # Get revenue breakdown by variants and delivery types
        revenue_breakdown = await analytics_service.get_revenue_breakdown_by_variant_and_delivery(
            date_range
        )
        
        # Calculate admin fee revenue
        admin_pricing_service = AdminPricingService(db)
        config = await admin_pricing_service.get_pricing_config()
        
        admin_fee_percentage = config.subscription_percentage if config else 10.0
        estimated_admin_revenue = subscription_metrics.total_revenue * (admin_fee_percentage / 100)
        
        metrics = {
            "total_revenue": float(subscription_metrics.total_revenue),
            "active_subscriptions": subscription_metrics.active_subscriptions,
            "new_subscriptions": subscription_metrics.new_subscriptions,
            "canceled_subscriptions": subscription_metrics.canceled_subscriptions,
            "average_subscription_value": float(subscription_metrics.average_subscription_value),
            "churn_rate": subscription_metrics.churn_rate,
            "conversion_rate": subscription_metrics.conversion_rate,
            "admin_fee_percentage": admin_fee_percentage,
            "estimated_admin_revenue": float(estimated_admin_revenue),
            "revenue_breakdown": revenue_breakdown,
            "date_range": {
                "start_date": start_date.isoformat(),
                "end_date": end_date.isoformat()
            }
        }
        
        return Response(
            success=True,
            data=metrics,
            message="Real-time revenue metrics retrieved successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to get revenue metrics: {str(e)}"
        )

@router.post("/preview-impact")
async def preview_pricing_impact(
    request: PricingImpactPreviewRequest,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Implement impact analysis for percentage changes."""
    try:
        admin_pricing_service = AdminPricingService(db)
        
        impact_analysis = await admin_pricing_service.preview_pricing_impact(
            proposed_changes=request.proposed_changes,
            admin_user_id=current_user.id
        )
        
        return Response(
            success=True,
            data=impact_analysis,
            message="Pricing impact analysis completed successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to preview pricing impact: {str(e)}"
        )

@router.get("/cost-comparison")
async def get_cost_comparison_tools(
    subscription_id: Optional[str] = Query(None),
    sample_variant_ids: Optional[List[str]] = Query(None),
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Add cost comparison tools and affected subscription counts."""
    try:
        admin_pricing_service = AdminPricingService(db)
        
        # Convert string IDs to UUIDs if provided
        subscription_uuid = UUID(subscription_id) if subscription_id else None
        variant_uuids = [UUID(vid) for vid in sample_variant_ids] if sample_variant_ids else None
        
        comparison_data = await admin_pricing_service.get_cost_comparison_tools(
            subscription_id=subscription_uuid,
            sample_variants=variant_uuids
        )
        
        return Response(
            success=True,
            data=comparison_data,
            message="Cost comparison tools retrieved successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to get cost comparison tools: {str(e)}"
        )

@router.put("/subscription-percentage")
async def update_subscription_percentage(
    request: UpdateSubscriptionPercentageRequest,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Update subscription percentage with validation."""
    try:
        admin_pricing_service = AdminPricingService(db)
        
        updated_config = await admin_pricing_service.update_subscription_percentage(
            percentage=request.percentage,
            admin_user_id=current_user.id,
            change_reason=request.change_reason
        )
        
        return Response(
            success=True,
            data=updated_config.to_dict(),
            message=f"Subscription percentage updated to {request.percentage}% successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to update subscription percentage: {str(e)}"
        )

@router.put("/delivery-costs")
async def update_delivery_costs(
    request: UpdateDeliveryCostsRequest,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Update delivery costs with validation."""
    try:
        admin_pricing_service = AdminPricingService(db)
        
        updated_config = await admin_pricing_service.update_delivery_costs(
            delivery_costs=request.delivery_costs,
            admin_user_id=current_user.id,
            change_reason=request.change_reason
        )
        
        return Response(
            success=True,
            data=updated_config.to_dict(),
            message="Delivery costs updated successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to update delivery costs: {str(e)}"
        )

@router.post("/bulk-update")
async def bulk_pricing_update(
    request: BulkPricingUpdateRequest,
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Create bulk pricing update functionality with confirmation workflows."""
    try:
        admin_pricing_service = AdminPricingService(db)
        
        # If not confirmed, return preview of changes
        if not request.confirm_bulk_update:
            proposed_changes = {}
            if request.subscription_percentage is not None:
                proposed_changes["subscription_percentage"] = request.subscription_percentage
            if request.delivery_costs is not None:
                proposed_changes["delivery_costs"] = request.delivery_costs
            if request.tax_rates is not None:
                proposed_changes["tax_rates"] = request.tax_rates
            
            impact_analysis = await admin_pricing_service.preview_pricing_impact(
                proposed_changes=proposed_changes,
                admin_user_id=current_user.id
            )
            
            return Response(
                success=True,
                data={
                    "preview": True,
                    "impact_analysis": impact_analysis,
                    "confirmation_required": True,
                    "message": "Review the impact analysis and confirm to proceed with bulk update"
                },
                message="Bulk pricing update preview generated. Confirmation required to proceed."
            )
        
        # Perform bulk update with confirmation
        results = []
        
        # Update subscription percentage if provided
        if request.subscription_percentage is not None:
            config = await admin_pricing_service.update_subscription_percentage(
                percentage=request.subscription_percentage,
                admin_user_id=current_user.id,
                change_reason=request.change_reason or "Bulk pricing update"
            )
            results.append({
                "type": "subscription_percentage",
                "old_value": None,  # Would need to track previous value
                "new_value": request.subscription_percentage,
                "config_id": str(config.id)
            })
        
        # Update delivery costs if provided
        if request.delivery_costs is not None:
            config = await admin_pricing_service.update_delivery_costs(
                delivery_costs=request.delivery_costs,
                admin_user_id=current_user.id,
                change_reason=request.change_reason or "Bulk pricing update"
            )
            results.append({
                "type": "delivery_costs",
                "old_value": None,  # Would need to track previous value
                "new_value": request.delivery_costs,
                "config_id": str(config.id)
            })
        
        return Response(
            success=True,
            data={
                "bulk_update_completed": True,
                "updates_applied": results,
                "total_updates": len(results)
            },
            message=f"Bulk pricing update completed successfully. {len(results)} updates applied."
        )
        
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to perform bulk pricing update: {str(e)}"
        )

@router.get("/audit-log")
async def get_pricing_audit_log(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    admin_user_id: Optional[str] = Query(None),
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Get pricing configuration audit log."""
    try:
        admin_pricing_service = AdminPricingService(db)
        
        admin_uuid = UUID(admin_user_id) if admin_user_id else None
        
        audit_log = await admin_pricing_service.get_pricing_audit_log(
            page=page,
            limit=limit,
            admin_user_id=admin_uuid
        )
        
        return Response(
            success=True,
            data=audit_log,
            message="Pricing audit log retrieved successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to get pricing audit log: {str(e)}"
        )

@router.get("/affected-subscriptions")
async def get_affected_subscriptions_count(
    proposed_percentage: Optional[float] = Query(None),
    proposed_delivery_costs: Optional[str] = Query(None),  # JSON string
    current_user: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db)
):
    """Get count of subscriptions that would be affected by pricing changes."""
    try:
        admin_pricing_service = AdminPricingService(db)
        
        # Build proposed changes
        proposed_changes = {}
        if proposed_percentage is not None:
            proposed_changes["subscription_percentage"] = proposed_percentage
        
        if proposed_delivery_costs:
            import json
            try:
                delivery_costs_dict = json.loads(proposed_delivery_costs)
                proposed_changes["delivery_costs"] = delivery_costs_dict
            except json.JSONDecodeError:
                raise APIException(
                    status_code=400,
                    message="Invalid JSON format for proposed_delivery_costs"
                )
        
        if not proposed_changes:
            raise APIException(
                status_code=400,
                message="At least one proposed change must be provided"
            )
        
        # Get impact analysis
        impact_analysis = await admin_pricing_service.preview_pricing_impact(
            proposed_changes=proposed_changes,
            admin_user_id=current_user.id
        )
        
        # Extract affected subscription counts
        affected_data = {
            "total_affected_subscriptions": impact_analysis["affected_subscriptions_count"],
            "increased_cost_count": impact_analysis["summary"]["increased_cost_count"],
            "decreased_cost_count": impact_analysis["summary"]["decreased_cost_count"],
            "no_change_count": impact_analysis["summary"]["no_change_count"],
            "total_revenue_impact": impact_analysis["total_revenue_impact"],
            "average_cost_change": impact_analysis["summary"]["average_cost_change"],
            "max_cost_increase": impact_analysis["summary"]["max_cost_increase"],
            "max_cost_decrease": impact_analysis["summary"]["max_cost_decrease"],
            "proposed_changes": proposed_changes
        }
        
        return Response(
            success=True,
            data=affected_data,
            message="Affected subscriptions count retrieved successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to get affected subscriptions count: {str(e)}"
        )