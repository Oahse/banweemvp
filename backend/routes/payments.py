# Consolidated payment routes
# This file includes all payment-related routes

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID

from core.database import get_db
from core.dependencies import get_current_user
from core.utils.response import Response
from models.user import User
from services.payments import PaymentService
from schemas.payments import (
    PaymentMethodResponse,
    PaymentMethodCreate,
    PaymentIntentResponse,
    PaymentIntentCreate,
    TransactionResponse
)

router = APIRouter(prefix="/payments", tags=["payments"])


@router.get("/methods")
async def get_payment_methods(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's payment methods"""
    service = PaymentService(db)
    payment_methods = await service.get_user_payment_methods(current_user.id)
    return Response.success(data=[PaymentMethodResponse.from_orm(pm) for pm in payment_methods])


@router.post("/methods")
async def create_payment_method(
    payment_method_data: PaymentMethodCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a new payment method"""
    service = PaymentService(db)
    payment_method = await service.create_payment_method(
        user_id=current_user.id,
        stripe_payment_method_id=payment_method_data.stripe_payment_method_id,
        is_default=payment_method_data.is_default
    )
    return Response.success(data=PaymentMethodResponse.from_orm(payment_method))


@router.delete("/methods/{payment_method_id}")
async def delete_payment_method(
    payment_method_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a payment method"""
    service = PaymentService(db)
    success = await service.delete_payment_method(payment_method_id, current_user.id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment method not found"
        )
    
    return {"message": "Payment method deleted successfully"}


@router.post("/intents")
async def create_payment_intent(
    payment_intent_data: PaymentIntentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a payment intent"""
    service = PaymentService(db)
    payment_intent = await service.create_payment_intent(
        user_id=current_user.id,
        amount=payment_intent_data.amount,
        currency=payment_intent_data.currency,
        order_id=payment_intent_data.order_id,
        subscription_id=payment_intent_data.subscription_id,
        metadata=payment_intent_data.metadata
    )
    return Response.success(data=PaymentIntentResponse.from_orm(payment_intent))


@router.post("/intents/{payment_intent_id}/confirm")
async def confirm_payment_intent(
    payment_intent_id: UUID,
    payment_method_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Confirm a payment intent"""
    service = PaymentService(db)
    payment_intent = await service.confirm_payment_intent(
        payment_intent_id=payment_intent_id,
        payment_method_id=payment_method_id
    )
    return Response.success(data=PaymentIntentResponse.from_orm(payment_intent))


@router.post("/process")
async def process_payment(
    amount: float,
    payment_method_id: UUID,
    order_id: Optional[UUID] = None,
    subscription_id: Optional[UUID] = None,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Process a payment (simplified)"""
    service = PaymentService(db)
    result = await service.process_payment(
        user_id=current_user.id,
        amount=amount,
        payment_method_id=payment_method_id,
        order_id=order_id,
        subscription_id=subscription_id
    )
    return result


@router.get("/transactions")
async def get_user_transactions(
    page: int = 1,
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user transaction history"""
    service = PaymentService(db)
    transactions = await service.get_user_transactions(
        user_id=current_user.id,
        page=page,
        limit=limit
    )
    return Response.success(data=transactions)


@router.post("/refunds/{payment_intent_id}")
async def create_refund(
    payment_intent_id: UUID,
    amount: Optional[float] = None,
    reason: str = "requested_by_customer",
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Create a refund for a payment (admin only)"""
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admins can create refunds"
        )
    
    service = PaymentService(db)
    transaction = await service.create_refund(
        payment_intent_id=payment_intent_id,
        amount=amount,
        reason=reason
    )
    return Response.success(data=TransactionResponse.from_orm(transaction))