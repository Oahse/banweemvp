"""
Contact Messages API
Endpoints for contact message management
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID
import math

from backend.core.db import get_db
from backend.core.dependencies import get_current_user, require_admin
from backend.schemas.contact_message import (
    ContactMessageCreate,
    ContactMessageUpdate,
    ContactMessageResponse,
    ContactMessageListResponse,
    MessageStatus,
    MessagePriority
)
from backend.schemas.response import SuccessResponse
from backend.services.contact_message import ContactMessageService
from backend.core.logging import logger

router = APIRouter(prefix="/contact-messages", tags=["Contact Messages"])


@router.post("", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def create_contact_message(
    message_data: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new contact message (public endpoint)
    """
    try:
        message = ContactMessageService.create_message(db, message_data)
        return message
    except Exception as e:
        logger.error(f"Error creating contact message: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create contact message"
        )


@router.get("", response_model=ContactMessageListResponse)
def get_all_contact_messages(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    status_filter: Optional[MessageStatus] = Query(None, alias="status"),
    priority: Optional[MessagePriority] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Get all contact messages with pagination and filters (admin only)
    """
    try:
        messages, total = ContactMessageService.get_all_messages(
            db=db,
            page=page,
            page_size=page_size,
            status=status_filter,
            priority=priority,
            search=search
        )
        
        total_pages = math.ceil(total / page_size) if total > 0 else 0
        
        return ContactMessageListResponse(
            messages=messages,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=total_pages
        )
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch contact messages"
        )


@router.get("/stats")
def get_contact_message_stats(
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Get contact message statistics (admin only)
    """
    try:
        stats = ContactMessageService.get_message_stats(db)
        return SuccessResponse(data=stats)
    except Exception as e:
        logger.error(f"Error fetching contact message stats: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch statistics"
        )


@router.get("/{message_id}", response_model=ContactMessageResponse)
def get_contact_message(
    message_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Get a specific contact message by ID (admin only)
    """
    message = ContactMessageService.get_message_by_id(db, message_id)
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )
    
    return message


@router.patch("/{message_id}", response_model=ContactMessageResponse)
def update_contact_message(
    message_id: UUID,
    update_data: ContactMessageUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Update a contact message (admin only)
    """
    try:
        message = ContactMessageService.update_message(db, message_id, update_data)
        
        if not message:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact message not found"
            )
        
        return message
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact message: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update contact message"
        )


@router.delete("/{message_id}")
def delete_contact_message(
    message_id: UUID,
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    """
    Delete a contact message (admin only)
    """
    try:
        success = ContactMessageService.delete_message(db, message_id)
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact message not found"
            )
        
        return SuccessResponse(message="Contact message deleted successfully")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting contact message: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete contact message"
        )
