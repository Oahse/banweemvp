"""
Contact Message Model
Stores customer contact form submissions
"""

from sqlalchemy import Column, String, Text, DateTime, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum
from backend.core.db import Base


class MessageStatus(str, enum.Enum):
    """Status of contact message"""
    NEW = "new"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class MessagePriority(str, enum.Enum):
    """Priority level of contact message"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class ContactMessage(Base):
    """Contact message model for customer inquiries"""
    
    __tablename__ = "contact_messages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(SQLEnum(MessageStatus), default=MessageStatus.NEW, nullable=False)
    priority = Column(SQLEnum(MessagePriority), default=MessagePriority.MEDIUM, nullable=False)
    admin_notes = Column(Text, nullable=True)
    assigned_to = Column(UUID(as_uuid=True), nullable=True)  # Admin user ID
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    resolved_at = Column(DateTime, nullable=True)
    
    def __repr__(self):
        return f"<ContactMessage {self.id} - {self.subject}>"
