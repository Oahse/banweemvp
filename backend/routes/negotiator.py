from fastapi import APIRouter, Depends, status, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, Dict
from uuid import UUID

from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from core.exceptions import APIException
from core.utils.response import Response
from core.dependencies import get_current_auth_user
from models.user import User  # Assuming User model is needed for current_user dependency

from services.negotiator import Buyer, Seller, NegotiationEngine

router = APIRouter(
    prefix="/negotiate",
    tags=["Negotiator"],
)

# In-memory store for ongoing negotiations (NOT production-ready)
# WARNING: This store is volatile and will be reset when the application restarts.
# For production environments, negotiation sessions should be persisted in a database
# (e.g., PostgreSQL, Redis) and retrieved using a unique session ID.
negotiations_store: Dict[UUID, NegotiationEngine] = {}

class NegotiationAgentConfig(BaseModel):
    """Configuration for a single negotiation agent."""
    name: str = Field(..., description="Name of the agent (e.g., Buyer, Seller)")
    target_price: float = Field(..., gt=0, description="The agent's initial target price.")
    limit_price: float = Field(..., gt=0, description="The agent's absolute limit price.")
    style: str = Field("balanced", description="Negotiation style (e.g., 'aggressive', 'patient', 'friendly', 'balanced').")

class NegotiationStartRequest(BaseModel):
    """Request model for starting a new negotiation."""
    buyer_config: NegotiationAgentConfig
    seller_config: NegotiationAgentConfig

class NegotiationStateResponse(BaseModel):
    """Response model for the current state of a negotiation."""
    negotiation_id: UUID
    round: int
    finished: bool
    message: str
    final_price: Optional[float] = None
    buyer_current_offer: Optional[float] = None
    seller_current_offer: Optional[float] = None

class NegotiationStepRequest(BaseModel):
    """Request model for advancing a negotiation by one step."""
    negotiation_id: UUID = Field(..., description="ID of the ongoing negotiation.")
    buyer_new_target: Optional[float] = Field(None, gt=0, description="Optional new target price for the buyer.")
    seller_new_target: Optional[float] = Field(None, gt=0, description="Optional new target price for the seller.")

@router.post("/start", response_model=Response[NegotiationStateResponse], status_code=status.HTTP_201_CREATED)
async def start_negotiation(
    request: NegotiationStartRequest,
    current_user: User = Depends(get_current_auth_user), # Requires authentication
    db: AsyncSession = Depends(get_db) # Database session dependency (for future persistence)
):
    """
    Initializes a new negotiation session between a buyer and a seller.
    Returns the initial state of the negotiation.
    The negotiation session is stored in-memory. In production, this would be stored in a database
    and linked to the `current_user`.
    """
    # For future: Logic to store buyer/seller config in DB, linked to current_user
    # For now, just create agent instances.
    buyer = Buyer(
        name=request.buyer_config.name,
        target_price=request.buyer_config.target_price,
        limit_price=request.buyer_config.limit_price,
        style=request.buyer_config.style
    )
    seller = Seller(
        name=request.seller_config.name,
        target_price=request.seller_config.target_price,
        limit_price=request.seller_config.limit_price,
        style=request.seller_config.style
    )

    engine = NegotiationEngine(buyer, seller)
    negotiation_id = uuid.uuid4() # Generate UUID for the session
    negotiations_store[negotiation_id] = engine

    # Run the first step to get initial offers and check for immediate closure
    initial_state = engine.step()

    response_data = NegotiationStateResponse(
        negotiation_id=negotiation_id,
        round=initial_state["round"],
        finished=initial_state["finished"],
        message=initial_state["message"],
        final_price=initial_state.get("final_price"),
        buyer_current_offer=initial_state.get("buyer_offer"),
        seller_current_offer=initial_state.get("seller_offer")
    )
    return Response.success(response_data, message="Negotiation started successfully.")


@router.post("/step", response_model=Response[NegotiationStateResponse])
async def step_negotiation(
    request: NegotiationStepRequest,
    current_user: User = Depends(get_current_auth_user), # Requires authentication
    db: AsyncSession = Depends(get_db) # Database session dependency (for future persistence)
):
    """
    Advances an ongoing negotiation by one step (round).
    Optionally allows updating buyer's or seller's target prices before the step.
    Returns the updated state of the negotiation.
    In production, this would retrieve the NegotiationEngine state from the database,
    update it, and then persist the new state.
    """
    negotiation_id = request.negotiation_id
    engine = negotiations_store.get(negotiation_id)

    if not engine:
        raise APIException(
            status_code=status.HTTP_404_NOT_FOUND,
            message=f"Negotiation with ID {negotiation_id} not found."
        )

    if engine.finished:
        raise APIException(
            status_code=status.HTTP_400_BAD_REQUEST,
            message=f"Negotiation with ID {negotiation_id} has already finished."
        )

    # Apply optional new target prices for the agents
    if request.buyer_new_target is not None:
        engine.buyer.set_price(request.buyer_new_target)
    if request.seller_new_target is not None:
        engine.seller.set_price(request.seller_new_target)

    next_state = engine.step()

    # For future: Persist the updated engine state back to the database
    response_data = NegotiationStateResponse(
        negotiation_id=negotiation_id,
        round=next_state["round"],
        finished=next_state["finished"],
        message=next_state["message"],
        final_price=next_state.get("final_price"),
        buyer_current_offer=next_state.get("buyer_offer"),
        seller_current_offer=next_state.get("seller_offer")
    )
    return Response.success(response_data, message=next_state["message"])


@router.get("/{negotiation_id}", response_model=Response[NegotiationStateResponse])
async def get_negotiation_state(
    negotiation_id: UUID, # Use UUID type directly for path parameter
    current_user: User = Depends(get_current_auth_user), # Requires authentication
    db: AsyncSession = Depends(get_db) # Database session dependency
):
    """
    Retrieves the current state of a specific negotiation session.
    In production, this would retrieve the NegotiationEngine state from the database.
    """
    engine = negotiations_store.get(negotiation_id)
    if not engine:
        raise APIException(
            status_code=status.HTTP_404_NOT_FOUND,
            message=f"Negotiation with ID {negotiation_id} not found."
        )
    
    # Reconstruct the state response from the engine's current properties
    # Note: This approach might not reflect the *exact* last offers if the engine wasn't stepped
    # right before this GET request, but rather the internal target prices of the agents.
    current_state = {
        "round": engine.round,
        "finished": engine.finished,
        "message": "Negotiation ongoing." if not engine.finished else f"Deal reached at ₦{engine.final_price:.2f}",
        "final_price": engine.final_price,
        "buyer_offer": getattr(engine.buyer, 'target', None),
        "seller_offer": getattr(engine.seller, 'target', None)
    }

    response_data = NegotiationStateResponse(
        negotiation_id=negotiation_id,
        round=current_state["round"],
        finished=current_state["finished"],
        message=current_state["message"],
        final_price=current_state.get("final_price"),
        buyer_current_offer=current_state.get("buyer_offer"),
        seller_current_offer=current_state.get("seller_offer")
    )
    return Response.success(response_data, message="Negotiation state retrieved successfully.")


@router.delete("/{negotiation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_negotiation(
    negotiation_id: UUID, # Use UUID type directly for path parameter
    current_user: User = Depends(get_current_auth_user), # Requires authentication
    db: AsyncSession = Depends(get_db) # Database session dependency (for future cleanup)
):
    """
    Deletes an ongoing negotiation session from memory.
    (Note: In a production system, this would involve deleting the session from the database).
    """
    if negotiation_id in negotiations_store:
        del negotiations_store[negotiation_id]
        # For future: Delete negotiation session from the database
        return Response.success(message="Negotiation session deleted successfully.")
    else:
        raise APIException(
            status_code=status.HTTP_404_NOT_FOUND,
            message=f"Negotiation with ID {negotiation_id} not found."
        )