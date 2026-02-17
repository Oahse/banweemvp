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
            
            # Test basic model creation
            test_user = User(
                id=uuid7(),
                email=f"test-{uuid7()}@example.com",
                firstname="Test",
                lastname="User",
                hashed_password="test_hash",
                role="customer",
                verified=False,
                verification_token="test_token",
                token_expiration=datetime.now() + timedelta(hours=24)
            )
            
            print("✅ User model created successfully")
            print(f"   Email: {test_user.email}")
            print(f"   Role: {test_user.role}")
            print(f"   Verification token: {test_user.verification_token}")
            
            # Test adding to session
            db.add(test_user)
            print("✅ User added to session")
            
            # Test commit
            await db.commit()
            print("✅ Transaction committed successfully")
            
            # Test refresh
            await db.refresh(test_user)
            print("✅ User refreshed from database")
            print(f"   User ID: {test_user.id}")
            
            # Clean up
            await db.delete(test_user)
            await db.commit()
            print("✅ Test user cleaned up")
            
            break  # Exit the async generator
            
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

async def test_user_service():
    """Test user service creation"""
    print("\n🔍 Testing UserService...")
    
    try:
        async for db in get_db():
            user_service = UserService(db)
            print("✅ UserService created")
            
            # Test UserCreate schema
            user_data = UserCreate(
                email=f"servicetest-{uuid7()}@example.com",
                firstname="Service",
                lastname="Test",
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
            
            new_user = await user_service.create_user(user_data, background_tasks)
            print("✅ User created through service")
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
    print("🚀 Starting registration debug tests...\n")
    
    # Test 1: Basic model creation
    test1_passed = await test_user_creation()
    
    # Test 2: Service creation
    test2_passed = await test_user_service()
    
    print(f"\n📊 Results:")
    print(f"   Test 1 (Model): {'✅ PASSED' if test1_passed else '❌ FAILED'}")
    print(f"   Test 2 (Service): {'✅ PASSED' if test2_passed else '❌ FAILED'}")
    
    if test1_passed and test2_passed:
        print("\n🎉 All tests passed! Registration should work.")
    else:
        print("\n❌ Some tests failed. Check the errors above.")

if __name__ == "__main__":
    asyncio.run(main())
