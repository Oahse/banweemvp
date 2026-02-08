"""
Script to create multiple test contact messages with different statuses
"""
import asyncio
import sys
sys.path.insert(0, 'backend')

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from backend.models.contact_message import ContactMessage
from backend.core.config import settings
import uuid

async def create_test_messages():
    # Create async engine using the database URL from settings
    database_url = settings.POSTGRES_DB_URL
    if '+asyncpg' not in database_url:
        database_url = database_url.replace('postgresql://', 'postgresql+asyncpg://')
    
    engine = create_async_engine(database_url, echo=False)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    messages = [
        {
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Product Inquiry",
            "message": "I'm interested in learning more about your products. Can you provide more details?",
            "status": "new",
            "priority": "high"
        },
        {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "subject": "Order Issue",
            "message": "I haven't received my order yet. Order number: #12345",
            "status": "in_progress",
            "priority": "urgent"
        },
        {
            "name": "Bob Johnson",
            "email": "bob@example.com",
            "subject": "Feature Request",
            "message": "It would be great if you could add dark mode to the website.",
            "status": "resolved",
            "priority": "low"
        },
        {
            "name": "Alice Williams",
            "email": "alice@example.com",
            "subject": "General Question",
            "message": "What are your business hours?",
            "status": "new",
            "priority": "medium"
        }
    ]
    
    async with async_session() as session:
        for msg_data in messages:
            message = ContactMessage(
                id=uuid.uuid4(),
                **msg_data
            )
            session.add(message)
        
        await session.commit()
        print(f"✅ Created {len(messages)} test messages successfully!")
        for msg in messages:
            print(f"   - {msg['name']}: {msg['subject']} [{msg['status']}]")

if __name__ == "__main__":
    asyncio.run(create_test_messages())
