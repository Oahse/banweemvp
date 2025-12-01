"""
Property-based tests for user role filtering.

**Feature: app-enhancements, Property 24: Role filter application**
**Validates: Requirements 8.1**

**Feature: app-enhancements, Property 25: All roles display**
**Validates: Requirements 8.2**
"""

import pytest
from hypothesis import given, strategies as st, settings, HealthCheck
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from services.admin import AdminService
from models.user import User


@pytest.mark.asyncio
@given(
    role=st.sampled_from(['admin', 'supplier', 'customer'])
)
@settings(
    max_examples=100,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_role_filter_application(role, db_session: AsyncSession):
    """
    Property 24: Role filter application
    
    For any role filter selected, the user list should display only users 
    with that role.
    
    **Validates: Requirements 8.1**
    """
    # Create admin service
    admin_service = AdminService(db_session)
    
    # Get users with role filter
    result = await admin_service.get_all_users(
        page=1,
        limit=100,
        role=role,
        search=None,
        status=None,
        verified=None
    )
    
    # Verify the result structure
    assert isinstance(result, dict)
    assert 'data' in result
    assert 'pagination' in result
    assert isinstance(result['data'], list)
    
    # Verify all returned users have the filtered role
    for user_data in result['data']:
        assert user_data['role'] == role, \
            f"Expected role {role}, but got {user_data['role']}"
    
    # Verify against direct database query
    query = select(User).where(User.role == role)
    db_result = await db_session.execute(query)
    expected_users = db_result.scalars().all()
    
    # The total count should match the database query
    assert result['pagination']['total'] == len(expected_users), \
        f"Expected {len(expected_users)} users with role {role}, got {result['pagination']['total']}"


@pytest.mark.asyncio
@given(
    dummy=st.just(None)
)
@settings(
    max_examples=1,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_all_roles_display(dummy, db_session: AsyncSession):
    """
    Property 25: All roles display
    
    For any "All Roles" selection, the user list should display all users 
    regardless of role.
    
    **Validates: Requirements 8.2**
    """
    from models.user import User
    from core.utils.encryption import PasswordManager
    from uuid import uuid4

    pm = PasswordManager()
    hashed_password = pm.hash_password("testpassword123")

    # Ensure at least one user of each role exists for the test
    roles_to_create = ["Admin", "Supplier", "Customer"]
    existing_roles = set()
    result = await db_session.execute(select(User.role).distinct())
    for role_tuple in result.scalars().all():
        existing_roles.add(role_tuple)

    for role_name in roles_to_create:
        if role_name not in existing_roles:
            user = User(
                id=uuid4(),
                email=f"{role_name.lower()}_{uuid4().hex}@example.com",
                firstname=role_name,
                lastname="Test",
                role=role_name,
                active=True,
                verified=True,
                hashed_password=hashed_password
            )
            db_session.add(user)
    await db_session.commit()
    
    # Create admin service
    admin_service = AdminService(db_session)
    
    # Get users without role filter (all roles)
    result = await admin_service.get_all_users(
        page=1,
        limit=100,
        role=None,
        search=None,
        status=None,
        verified=None
    )
    
    # Verify the result structure
    assert isinstance(result, dict)
    assert 'data' in result
    assert 'pagination' in result
    assert isinstance(result['data'], list)
    
    # Get all users from database
    query = select(User)
    db_result = await db_session.execute(query)
    all_users = db_result.scalars().all()
    
    # The total count should match all users in database
    assert result['pagination']['total'] == len(all_users), \
        f"Expected {len(all_users)} total users, got {result['pagination']['total']}"
    
    # Verify that users with different roles are present
    roles_in_result = set(user_data['role'] for user_data in result['data'])
    roles_in_db = set(user.role for user in all_users)
    
    # All roles from database should be represented in the result
    assert roles_in_result == roles_in_db, \
        f"Expected roles {roles_in_db}, but got {roles_in_result}"


@pytest.mark.asyncio
@given(
    role=st.one_of(st.none(), st.sampled_from(['admin', 'supplier', 'customer']))
)
@settings(
    max_examples=100,
    deadline=None,
    suppress_health_check=[HealthCheck.function_scoped_fixture]
)
async def test_property_role_filter_consistency(role, db_session: AsyncSession):
    """
    Additional property: Role filter consistency
    
    For any role filter (including None), the returned users should be 
    consistent with database state.
    """
    # Create admin service
    admin_service = AdminService(db_session)
    
    # Get users with role filter
    result = await admin_service.get_all_users(
        page=1,
        limit=100,
        role=role,
        search=None,
        status=None,
        verified=None
    )
    
    # Build database query
    query = select(User)
    if role:
        query = query.where(User.role == role)
    
    db_result = await db_session.execute(query)
    expected_users = db_result.scalars().all()
    
    # Verify count matches
    assert result['pagination']['total'] == len(expected_users), \
        f"Expected {len(expected_users)} users, got {result['pagination']['total']}"
    
    # Verify all returned users match the filter
    for user_data in result['data']:
        if role:
            assert user_data['role'] == role, \
                f"Expected role {role}, but got {user_data['role']}"
