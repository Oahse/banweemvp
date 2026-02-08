"""
Contact Message Service
Business logic for contact message operations
"""

from sqlalchemy.orm import Session
from sqlalchemy import desc, or_, func
from typing import Optional, List
from uuid import UUID
from datetime import datetime

from models.contact_message import ContactMessage, MessageStatus, MessagePriority
from schemas.contact_message import ContactMessageCreate, ContactMessageUpdate
from core.logging import logger


class ContactMessageService:
    """Service for managing contact messages"""
    
    @staticmethod
    def create_message(db: Session, message_data: ContactMessageCreate) -> ContactMessage:
        """Create a new contact message"""
        try:
            message = ContactMessage(
                name=message_data.name,
                email=message_data.email,
                subject=message_data.subject,
                message=message_data.message,
                status=MessageStatus.NEW,
                priority=MessagePriority.MEDIUM
            )
            
            db.add(message)
            db.commit()
            db.refresh(message)
            
            logger.info(f"Contact message created: {message.id} from {message.email}")
            return message
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error creating contact message: {str(e)}")
            raise
    
    @staticmethod
    def get_message_by_id(db: Session, message_id: UUID) -> Optional[ContactMessage]:
        """Get a contact message by ID"""
        return db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    
    @staticmethod
    def get_all_messages(
        db: Session,
        page: int = 1,
        page_size: int = 20,
        status: Optional[MessageStatus] = None,
        priority: Optional[MessagePriority] = None,
        search: Optional[str] = None
    ) -> tuple[List[ContactMessage], int]:
        """Get all contact messages with pagination and filters"""
        query = db.query(ContactMessage)
        
        # Apply filters
        if status:
            query = query.filter(ContactMessage.status == status)
        
        if priority:
            query = query.filter(ContactMessage.priority == priority)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    ContactMessage.name.ilike(search_term),
                    ContactMessage.email.ilike(search_term),
                    ContactMessage.subject.ilike(search_term),
                    ContactMessage.message.ilike(search_term)
                )
            )
        
        # Get total count
        total = query.count()
        
        # Apply pagination and ordering
        messages = query.order_by(desc(ContactMessage.created_at)).offset(
            (page - 1) * page_size
        ).limit(page_size).all()
        
        return messages, total
    
    @staticmethod
    def update_message(
        db: Session,
        message_id: UUID,
        update_data: ContactMessageUpdate
    ) -> Optional[ContactMessage]:
        """Update a contact message (admin only)"""
        try:
            message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
            
            if not message:
                return None
            
            # Update fields
            if update_data.status is not None:
                message.status = update_data.status
                if update_data.status == MessageStatus.RESOLVED:
                    message.resolved_at = datetime.utcnow()
            
            if update_data.priority is not None:
                message.priority = update_data.priority
            
            if update_data.admin_notes is not None:
                message.admin_notes = update_data.admin_notes
            
            if update_data.assigned_to is not None:
                message.assigned_to = update_data.assigned_to
            
            message.updated_at = datetime.utcnow()
            
            db.commit()
            db.refresh(message)
            
            logger.info(f"Contact message updated: {message.id}")
            return message
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error updating contact message: {str(e)}")
            raise
    
    @staticmethod
    def delete_message(db: Session, message_id: UUID) -> bool:
        """Delete a contact message"""
        try:
            message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
            
            if not message:
                return False
            
            db.delete(message)
            db.commit()
            
            logger.info(f"Contact message deleted: {message_id}")
            return True
            
        except Exception as e:
            db.rollback()
            logger.error(f"Error deleting contact message: {str(e)}")
            raise
    
    @staticmethod
    def get_message_stats(db: Session) -> dict:
        """Get statistics about contact messages"""
        total = db.query(func.count(ContactMessage.id)).scalar()
        new = db.query(func.count(ContactMessage.id)).filter(
            ContactMessage.status == MessageStatus.NEW
        ).scalar()
        in_progress = db.query(func.count(ContactMessage.id)).filter(
            ContactMessage.status == MessageStatus.IN_PROGRESS
        ).scalar()
        resolved = db.query(func.count(ContactMessage.id)).filter(
            ContactMessage.status == MessageStatus.RESOLVED
        ).scalar()
        
        return {
            "total": total,
            "new": new,
            "in_progress": in_progress,
            "resolved": resolved
        }
