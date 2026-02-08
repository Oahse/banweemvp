"""
Script to create a test contact message
"""
import asyncio
import sys
sys.path.insert(0, 'backend')

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from backend.models.contact_message import ContactMessage
from backend.core.config import settings
import uuid

async def create_test_message():
    # Create async engine using the database URL from settings
    database_url = settings.POSTGRES_DB_URL
    if '+asyncpg' not in database_url:
        database_url = database_url.replace('postgresql://', 'postgresql+asyncpg://')
    
    engine = create_async_engine(database_url, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        # Create a test message
        message = ContactMessage(
            id=uuid.uuid4(),
            name="Test User",
            email="test@example.com",
            subject="Test Contact Message",
            message="This is a test message to verify the contact messages feature is working correctly.",
            status="new",
            priority="medium"
        )
        
        session.add(message)
        await session.commit()
        
        print(f"✅ Test message created successfully with ID: {message.id}")
        print(f"   Name: {message.name}")
        print(f"   Email: {message.email}")
        print(f"   Subject: {message.subject}")
        print(f"   Status: {message.status}")
        print(f"   Priority: {message.priority}")

if __name__ == "__main__":
    asyncio.run(create_test_message())
