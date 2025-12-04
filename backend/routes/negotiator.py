from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, Dict
import uuid
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from core.database import get_db
from core.exceptions import APIException
from services.cart import CartService
from models.user import User
from core.utils.response import Response
from core.dependencies import get_current_auth_user
from services.negotiator import Buyer, Seller, NegotiationEngine

router = APIRouter(
    prefix="/negotiate",
    tags=["Negotiator"],
)

# In-memory store for ongoing negotiations (NOT production-ready)
# In a real application, this would be persisted in a database or Redis.
negotiations_store: Dict[str, NegotiationEngine] = {}

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
    negotiation_id: str
    round: int
    finished: bool
    message: str
    final_price: Optional[float] = None
    buyer_current_offer: Optional[float] = None
    seller_current_offer: Optional[float] = None

class NegotiationStepRequest(BaseModel):
    """Request model for advancing a negotiation by one step."""
    negotiation_id: str = Field(..., description="ID of the ongoing negotiation.")
    buyer_new_target: Optional[float] = Field(None, gt=0, description="Optional new target price for the buyer.")
    seller_new_target: Optional[float] = Field(None, gt=0, description="Optional new target price for the seller.")

@router.post("/start", response_model=NegotiationStateResponse, status_code=status.HTTP_201_CREATED)
async def start_negotiation(request: NegotiationStartRequest):
    """
    Initializes a new negotiation session between a buyer and a seller.
    Returns the initial state of the negotiation.
    """
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
    negotiation_id = str(uuid.uuid4())
    negotiations_store[negotiation_id] = engine

    # Run the first step to get initial offers
    initial_state = engine.step()

    return NegotiationStateResponse(
        negotiation_id=negotiation_id,
        round=initial_state["round"],
        finished=initial_state["finished"],
        message=initial_state["message"],
        final_price=initial_state.get("final_price"),
        buyer_current_offer=initial_state.get("buyer_offer"),
        seller_current_offer=initial_state.get("seller_offer")
    )

@router.post("/step", response_model=NegotiationStateResponse)
async def step_negotiation(request: NegotiationStepRequest):
    """
    Advances an ongoing negotiation by one step (round).
    Optionally allows updating buyer's or seller's target prices before the step.
    Returns the updated state of the negotiation.
    """
    negotiation_id = request.negotiation_id
    engine = negotiations_store.get(negotiation_id)

    if not engine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Negotiation with ID {negotiation_id} not found."
        )

    if engine.finished:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Negotiation with ID {negotiation_id} has already finished."
        )

    # Apply optional new target prices
    if request.buyer_new_target is not None:
        engine.buyer.set_price(request.buyer_new_target)
    if request.seller_new_target is not None:
        engine.seller.set_price(request.seller_new_target)

    next_state = engine.step()

    return NegotiationStateResponse(
        negotiation_id=negotiation_id,
        round=next_state["round"],
        finished=next_state["finished"],
        message=next_state["message"],
        final_price=next_state.get("final_price"),
        buyer_current_offer=next_state.get("buyer_offer"),
        seller_current_offer=next_state.get("seller_offer")
    )

@router.get("/{negotiation_id}", response_model=NegotiationStateResponse)
async def get_negotiation_state(negotiation_id: str):
    """
    Retrieves the current state of a specific negotiation session.
    """
    engine = negotiations_store.get(negotiation_id)
    if not engine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Negotiation with ID {negotiation_id} not found."
        )
    
    # Return the last known state, re-run step if necessary to determine current offers (if not finished)
    # For simplicity, we'll just reconstruct the state response from the engine's current properties
    # This might not exactly match the *last* returned offers if the engine wasn't stepped.
    # A more robust solution would store previous step's result in the engine or store.
    current_state = {
        "round": engine.round,
        "finished": engine.finished,
        "message": "Negotiation ongoing." if not engine.finished else f"Deal reached at ₦{engine.final_price:.2f}",
        "final_price": engine.final_price,
        "buyer_offer": getattr(engine.buyer, 'target', None), # Assuming target holds last offer
        "seller_offer": getattr(engine.seller, 'target', None) # Assuming target holds last offer
    }

    return NegotiationStateResponse(
        negotiation_id=negotiation_id,
        round=current_state["round"],
        finished=current_state["finished"],
        message=current_state["message"],
        final_price=current_state.get("final_price"),
        buyer_current_offer=current_state.get("buyer_offer"),
        seller_current_offer=current_state.get("seller_offer")
    )

@router.delete("/{negotiation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_negotiation(negotiation_id: str):
    """
    Deletes an ongoing negotiation session from memory.
    (Note: In a production system, this would involve database cleanup).
    """
    if negotiation_id in negotiations_store:
        del negotiations_store[negotiation_id]
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Negotiation with ID {negotiation_id} not found."
        )
