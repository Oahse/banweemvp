"""
Contact Message Service
Business logic for contact message operations
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import desc, or_, func, select
from typing import Optional, List
from uuid import UUID
from datetime import datetime

from models.contact_message import ContactMessage, MessageStatus, MessagePriority
from schemas.contact_message import ContactMessageCreate, ContactMessageUpdate
from core.logging import logger


class ContactMessageService:
    """Service for managing contact messages"""
    
    @staticmethod
    async def create_message(db: AsyncSession, message_data: ContactMessageCreate) -> ContactMessage:
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
            await db.commit()
            await db.refresh(message)
            
            logger.info(f"Contact message created: {message.id} from {message.email}")
            return message
            
        except Exception as e:
            await db.rollback()
            logger.error(f"Error creating contact message: {str(e)}")
            raise
    
    @staticmethod
    async def get_message_by_id(db: AsyncSession, message_id: UUID) -> Optional[ContactMessage]:
        """Get a contact message by ID"""
        stmt = select(ContactMessage).where(ContactMessage.id == message_id)
        result = await db.execute(stmt)
        return result.scalar_one_or_none()
    
    @staticmethod
    async def get_all_messages(
        db: AsyncSession,
        page: int = 1,
        page_size: int = 20,
        status: Optional[MessageStatus] = None,
        priority: Optional[MessagePriority] = None,
        search: Optional[str] = None
    ) -> tuple[List[ContactMessage], int]:
        """Get all contact messages with pagination and filters"""
        # Build base query
        stmt = select(ContactMessage)
        count_stmt = select(func.count(ContactMessage.id))
        
        # Apply filters
        if status:
            stmt = stmt.where(ContactMessage.status == status)
            count_stmt = count_stmt.where(ContactMessage.status == status)
        
        if priority:
            stmt = stmt.where(ContactMessage.priority == priority)
            count_stmt = count_stmt.where(ContactMessage.priority == priority)
        
        if search:
            search_term = f"%{search}%"
            search_filter = or_(
                ContactMessage.name.ilike(search_term),
                ContactMessage.email.ilike(search_term),
                ContactMessage.subject.ilike(search_term),
                ContactMessage.message.ilike(search_term)
            )
            stmt = stmt.where(search_filter)
            count_stmt = count_stmt.where(search_filter)
        
        # Get total count
        count_result = await db.execute(count_stmt)
        total = count_result.scalar()
        
        # Apply pagination and ordering
        stmt = stmt.order_by(desc(ContactMessage.created_at)).offset(
            (page - 1) * page_size
        ).limit(page_size)
        
        result = await db.execute(stmt)
        messages = result.scalars().all()
        
        return messages, total
    
    @staticmethod
    async def update_message(
        db: AsyncSession,
        message_id: UUID,
        update_data: ContactMessageUpdate
    ) -> Optional[ContactMessage]:
        """Update a contact message (admin only)"""
        try:
            stmt = select(ContactMessage).where(ContactMessage.id == message_id)
            result = await db.execute(stmt)
            message = result.scalar_one_or_none()
            
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
            
            await db.commit()
            await db.refresh(message)
            
            logger.info(f"Contact message updated: {message.id}")
            return message
            
        except Exception as e:
            await db.rollback()
            logger.error(f"Error updating contact message: {str(e)}")
            raise
    
    @staticmethod
    async def delete_message(db: AsyncSession, message_id: UUID) -> bool:
        """Delete a contact message"""
        try:
            stmt = select(ContactMessage).where(ContactMessage.id == message_id)
            result = await db.execute(stmt)
            message = result.scalar_one_or_none()
            
            if not message:
                return False
            
            await db.delete(message)
            await db.commit()
            
            logger.info(f"Contact message deleted: {message_id}")
            return True
            
        except Exception as e:
            await db.rollback()
            logger.error(f"Error deleting contact message: {str(e)}")
            raise
    
    @staticmethod
    async def get_message_stats(db: AsyncSession) -> dict:
        """Get statistics about contact messages"""
        total_stmt = select(func.count(ContactMessage.id))
        total_result = await db.execute(total_stmt)
        total = total_result.scalar()
        
        new_stmt = select(func.count(ContactMessage.id)).where(
            ContactMessage.status == MessageStatus.NEW
        )
        new_result = await db.execute(new_stmt)
        new = new_result.scalar()
        
        in_progress_stmt = select(func.count(ContactMessage.id)).where(
            ContactMessage.status == MessageStatus.IN_PROGRESS
        )
        in_progress_result = await db.execute(in_progress_stmt)
        in_progress = in_progress_result.scalar()
        
        resolved_stmt = select(func.count(ContactMessage.id)).where(
            ContactMessage.status == MessageStatus.RESOLVED
        )
        resolved_result = await db.execute(resolved_stmt)
        resolved = resolved_result.scalar()
        
        return {
            "total": total or 0,
            "new": new or 0,
            "in_progress": in_progress or 0,
            "resolved": resolved or 0
        }
