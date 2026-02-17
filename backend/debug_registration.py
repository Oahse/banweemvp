#!/usr/bin/env python3
"""
Debug script to test user registration step by step
"""
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from core.db import get_db, initialize_db
from core.config import settings
from models.user import User
from schemas.auth import UserCreate
from services.user import UserService
from core.utils.uuid_utils import uuid7
from datetime import datetime, timedelta
import secrets

async def test_user_creation():
    """Test user creation step by step"""
    print("🔍 Testing user creation...")
    
    try:
        # Initialize database first
        initialize_db(settings.SQLALCHEMY_DATABASE_URI, settings.ENVIRONMENT == "local")
        print("✅ Database initialized")
        
        # Get database session
        async for db in get_db():
            print("✅ Database session obtained")
            
            # Test UserCreate schema
            user_data = UserCreate(
                email=f"test-{uuid7()}@example.com",
                firstname="Test",
                lastname="User",
                password="testpassword123",
                role="customer"
            )
            
            print("✅ UserCreate schema created")
            print(f"   Email: {user_data.email}")
            print(f"   Role: {user_data.role}")
            
            # Mock background tasks
            class MockBackgroundTasks:
                def add_task(self, func, *args, **kwargs):
                    print(f"📝 Background task added: {func.__name__}")
            
            background_tasks = MockBackgroundTasks()
            
            # Test user creation through service
            user_service = UserService(db)
            new_user = await user_service.create_user(user_data, background_tasks)
            print("✅ User created successfully")
            print(f"   User ID: {new_user.id}")
            print(f"   Email: {new_user.email}")
            
            # Clean up
            await db.delete(new_user)
            await db.commit()
            print("✅ Test user cleaned up")
            
            break  # Exit the async generator
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

async def main():
    print("🚀 Starting registration debug test...\n")
    
    # Test user creation
    test_passed = await test_user_creation()
    
    print(f"\n📊 Results:")
    print(f"   Test (User Creation): {'✅ PASSED' if test_passed else '❌ FAILED'}")
    
    if test_passed:
        print("\n🎉 Test passed! Registration should work.")
    else:
        print("\n❌ Test failed. Check the errors above.")

if __name__ == "__main__":
    asyncio.run(main())
