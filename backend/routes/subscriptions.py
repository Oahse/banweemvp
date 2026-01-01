from fastapi import APIRouter, Depends, Query, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from typing import List
from core.database import get_db
from core.utils.response import Response
from core.exceptions import APIException
from schemas.subscriptions import SubscriptionCreate, SubscriptionUpdate
from services.subscriptions import SubscriptionService, SubscriptionSchedulerService
from models.user import User
from services.auth import AuthService
from tasks.subscription_tasks import (
    process_subscription_renewal,
    send_subscription_pause_notification,
    send_subscription_resume_notification
)

from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_auth_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)) -> User:
    auth_service = AuthService(db)
    return await auth_service.get_current_user(token)

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])


@router.post("/")
async def create_subscription(
    subscription_data: SubscriptionCreate,
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new subscription."""
    try:
        subscription_service = SubscriptionService(db)
        
        # Extract product_variant_ids and other data
        product_variant_ids = subscription_data.product_variant_ids
        
        # Pass data directly to the service method
        subscription = await subscription_service.create_subscription(
            user_id=current_user.id,
            plan_id=subscription_data.plan_id,
            product_variant_ids=product_variant_ids,
            # Add other fields from subscription_data as needed, e.g., delivery_type, delivery_address_id
            # For now, assuming these are simple and can be directly passed or defaulted
            delivery_type=subscription_data.delivery_type if hasattr(subscription_data, 'delivery_type') else "standard",
            delivery_address_id=subscription_data.delivery_address_id if hasattr(subscription_data, 'delivery_address_id') else None
        )
        return Response.success(data=subscription, message="Subscription created successfully")
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to create subscription: {str(e)}"
        )


@router.get("/")
async def get_subscriptions(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's subscriptions."""
    try:
        subscription_service = SubscriptionService(db)
        subscriptions = await subscription_service.get_user_subscriptions(current_user.id)
        
        # Simple pagination
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_subscriptions = subscriptions[start_idx:end_idx]
        
        return Response.success(data={
            "subscriptions": [sub.to_dict(include_products=True) for sub in paginated_subscriptions],
            "total": len(subscriptions),
            "page": page,
            "limit": limit,
            "has_more": end_idx < len(subscriptions)
        })
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to get subscriptions: {str(e)}"
        )


@router.post("/{subscription_id}/products")
async def add_products_to_subscription(
    subscription_id: UUID,
    variant_ids: List[UUID],
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Add products to an existing subscription."""
    try:
        subscription_service = SubscriptionService(db)
        subscription = await subscription_service.add_products_to_subscription(
            subscription_id, variant_ids, current_user.id
        )
        return Response.success(data=subscription.to_dict(include_products=True), message="Products added to subscription successfully")
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to add products to subscription: {str(e)}"
        )


@router.delete("/{subscription_id}/products")
async def remove_products_from_subscription(
    subscription_id: UUID,
    variant_ids: List[UUID],
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Remove products from an existing subscription."""
    try:
        subscription_service = SubscriptionService(db)
        subscription = await subscription_service.remove_products_from_subscription(
            subscription_id, variant_ids, current_user.id
        )
        return Response.success(data=subscription.to_dict(include_products=True), message="Products removed from subscription successfully")
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to remove products from subscription: {str(e)}"
        )





@router.get("/{subscription_id}")
async def get_subscription(
    subscription_id: UUID,
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Get a specific subscription."""
    try:
        subscription_service = SubscriptionService(db)
        subscription = await subscription_service.get_subscription_by_id(subscription_id, current_user.id)
        if not subscription:
            raise APIException(
                status_code=status.HTTP_404_NOT_FOUND,
                message="Subscription not found"
            )
        return Response.success(data=subscription)
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to fetch subscription: {str(e)}"
        )


@router.put("/{subscription_id}")
async def update_subscription(
    subscription_id: UUID,
    subscription_data: SubscriptionUpdate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Update a subscription."""
    try:
        subscription_service = SubscriptionService(db)
        
        # Extract product_variant_ids and other data
        product_variant_ids = subscription_data.product_variant_ids
        
        # Pass data directly to the service method
        subscription = await subscription_service.update_subscription(
            subscription_id=subscription_id,
            user_id=current_user.id,
            product_variant_ids=product_variant_ids,
            # Pass other updateable fields from subscription_data
            delivery_type=subscription_data.delivery_type if hasattr(subscription_data, 'delivery_type') else None,
            delivery_address_id=subscription_data.delivery_address_id if hasattr(subscription_data, 'delivery_address_id') else None
            # Add other fields here as needed
        )
        return Response.success(data=subscription, message="Subscription updated successfully")
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to update subscription: {str(e)}"
        )


@router.delete("/{subscription_id}")
async def delete_subscription(
    subscription_id: UUID,
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a subscription."""
    try:
        subscription_service = SubscriptionService(db)
        await subscription_service.cancel_subscription(subscription_id, current_user.id)
        return Response.success(message="Subscription cancelled successfully")
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to cancel subscription: {str(e)}"
        )


@router.post("/{subscription_id}/process-shipment")
async def process_subscription_shipment(
    subscription_id: UUID,
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Manually trigger shipment processing for a subscription."""
    try:
        subscription_service = SubscriptionService(db)
        subscription = await subscription_service.get_subscription_by_id(subscription_id, current_user.id)
        
        if not subscription:
            raise APIException(
                status_code=status.HTTP_404_NOT_FOUND,
                message="Subscription not found"
            )
        
        if subscription.status != "active":
            raise APIException(
                status_code=status.HTTP_400_BAD_REQUEST,
                message="Can only process shipments for active subscriptions"
            )
        
        # Create order from subscription
        scheduler = SubscriptionSchedulerService(db)
        order = await scheduler.create_subscription_order(subscription)
        
        if order:
            return Response.success(
                data={
                    "subscription_id": str(subscription_id),
                    "order_id": str(order.id),
                    "order_number": order.order_number
                },
                message="Subscription shipment processed successfully"
            )
        else:
            raise APIException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                message="Failed to create order from subscription"
            )
            
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to process subscription shipment: {str(e)}"
        )


@router.post("/{subscription_id}/pause")
async def pause_subscription(
    subscription_id: UUID,
    pause_reason: str = None,
    background_tasks: BackgroundTasks = BackgroundTasks(),
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Pause a subscription."""
    try:
        subscription_service = SubscriptionService(db)
        subscription = await subscription_service.pause_subscription(
            subscription_id, current_user.id, pause_reason
        )
        
        # Send notification
        send_subscription_pause_notification(
            background_tasks,
            current_user.email,
            current_user.name or current_user.email,
            str(subscription_id),
            pause_reason
        )
        
        return Response.success(
            data=subscription.to_dict(include_products=True),
            message="Subscription paused successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to pause subscription: {str(e)}"
        )


@router.post("/{subscription_id}/resume")
async def resume_subscription(
    subscription_id: UUID,
    background_tasks: BackgroundTasks = BackgroundTasks(),
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Resume a paused subscription."""
    try:
        subscription_service = SubscriptionService(db)
        subscription = await subscription_service.resume_subscription(
            subscription_id, current_user.id
        )
        
        # Send notification
        send_subscription_resume_notification(
            background_tasks,
            current_user.email,
            current_user.name or current_user.email,
            str(subscription_id),
            subscription.next_billing_date
        )
        
        return Response.success(
            data=subscription.to_dict(include_products=True),
            message="Subscription resumed successfully"
        )
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to resume subscription: {str(e)}"
        )


@router.get("/{subscription_id}/orders")
async def get_subscription_orders(
    subscription_id: UUID,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    current_user: User = Depends(get_current_auth_user),
    db: AsyncSession = Depends(get_db)
):
    """Get orders created from a subscription."""
    try:
        subscription_service = SubscriptionService(db)
        orders = await subscription_service.get_subscription_orders(
            subscription_id, current_user.id, page, limit
        )
        return Response.success(data=orders)
    except APIException:
        raise
    except Exception as e:
        raise APIException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message=f"Failed to fetch subscription orders: {str(e)}"
        )