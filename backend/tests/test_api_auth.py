"""
Tests for authentication API endpoints
"""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import patch, MagicMock

from models.user import User, UserRole
from services.auth import AuthService


class TestAuthAPI:
    """Test authentication API endpoints."""
    
    @pytest.mark.asyncio
    async def test_register_success(self, async_client: AsyncClient, db_session: AsyncSession, mock_email):
        """Test successful user registration."""
        user_data = {
            "email": "newuser@example.com",
            "firstname": "New",
            "lastname": "User",
            "password": "TestPassword123!",
            "phone": "+1234567890",
            "country": "US"
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["email"] == user_data["email"]
        assert data["data"]["firstname"] == user_data["firstname"]
        assert "password" not in data["data"]
        mock_email.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_register_duplicate_email(self, async_client: AsyncClient, test_user: User):
        """Test registration with duplicate email."""
        user_data = {
            "email": test_user.email,
            "firstname": "Duplicate",
            "lastname": "User",
            "password": "TestPassword123!",
            "phone": "+1234567891",
            "country": "US"
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "already exists" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_register_invalid_email(self, async_client: AsyncClient):
        """Test registration with invalid email."""
        user_data = {
            "email": "invalid-email",
            "firstname": "Test",
            "lastname": "User",
            "password": "TestPassword123!",
            "phone": "+1234567890",
            "country": "US"
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_register_weak_password(self, async_client: AsyncClient):
        """Test registration with weak password."""
        user_data = {
            "email": "test@example.com",
            "firstname": "Test",
            "lastname": "User",
            "password": "weak",
            "phone": "+1234567890",
            "country": "US"
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_login_success(self, async_client: AsyncClient, test_user: User):
        """Test successful login."""
        login_data = {
            "email": test_user.email,
            "password": "secret"
        }
        
        response = await async_client.post("/auth/login", json=login_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "access_token" in data["data"]
        assert "refresh_token" in data["data"]
        assert data["data"]["token_type"] == "bearer"
        assert data["data"]["user"]["email"] == test_user.email
    
    @pytest.mark.asyncio
    async def test_login_invalid_credentials(self, async_client: AsyncClient, test_user: User):
        """Test login with invalid credentials."""
        login_data = {
            "email": test_user.email,
            "password": "wrongpassword"
        }
        
        response = await async_client.post("/auth/login", json=login_data)
        
        assert response.status_code == 401
        data = response.json()
        assert data["success"] is False
        assert "invalid credentials" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_login_nonexistent_user(self, async_client: AsyncClient):
        """Test login with nonexistent user."""
        login_data = {
            "email": "nonexistent@example.com",
            "password": "password"
        }
        
        response = await async_client.post("/auth/login", json=login_data)
        
        assert response.status_code == 401
        data = response.json()
        assert data["success"] is False
    
    @pytest.mark.asyncio
    async def test_login_inactive_user(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test login with inactive user."""
        # Create inactive user
        inactive_user = User(
            email="inactive@example.com",
            firstname="Inactive",
            lastname="User",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role=UserRole.CUSTOMER,
            verified=True,
            is_active=False
        )
        db_session.add(inactive_user)
        await db_session.commit()
        
        login_data = {
            "email": inactive_user.email,
            "password": "secret"
        }
        
        response = await async_client.post("/auth/login", json=login_data)
        
        assert response.status_code == 401
        data = response.json()
        assert data["success"] is False
        assert "inactive" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_refresh_token_success(self, async_client: AsyncClient, test_user: User, db_session: AsyncSession):
        """Test successful token refresh."""
        auth_service = AuthService(db_session)
        refresh_token = auth_service.create_refresh_token(data={"sub": str(test_user.id)})
        
        refresh_data = {
            "refresh_token": refresh_token
        }
        
        response = await async_client.post("/auth/refresh", json=refresh_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "access_token" in data["data"]
        assert "refresh_token" in data["data"]
    
    @pytest.mark.asyncio
    async def test_refresh_token_invalid(self, async_client: AsyncClient):
        """Test refresh with invalid token."""
        refresh_data = {
            "refresh_token": "invalid_token"
        }
        
        response = await async_client.post("/auth/refresh", json=refresh_data)
        
        assert response.status_code == 401
        data = response.json()
        assert data["success"] is False
    
    @pytest.mark.asyncio
    async def test_get_profile_success(self, async_client: AsyncClient, auth_headers: dict, test_user: User):
        """Test getting user profile."""
        response = await async_client.get("/auth/profile", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["email"] == test_user.email
        assert data["data"]["firstname"] == test_user.firstname
        assert "hashed_password" not in data["data"]
    
    @pytest.mark.asyncio
    async def test_get_profile_unauthorized(self, async_client: AsyncClient):
        """Test getting profile without authentication."""
        response = await async_client.get("/auth/profile")
        
        assert response.status_code == 401
    
    @pytest.mark.asyncio
    async def test_update_profile_success(self, async_client: AsyncClient, auth_headers: dict, test_user: User):
        """Test updating user profile."""
        update_data = {
            "firstname": "Updated",
            "lastname": "Name",
            "phone": "+1987654321"
        }
        
        response = await async_client.put("/auth/profile", json=update_data, headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["firstname"] == "Updated"
        assert data["data"]["lastname"] == "Name"
        assert data["data"]["phone"] == "+1987654321"
    
    @pytest.mark.asyncio
    async def test_change_password_success(self, async_client: AsyncClient, auth_headers: dict):
        """Test changing password."""
        password_data = {
            "current_password": "secret",
            "new_password": "NewPassword123!"
        }
        
        response = await async_client.post("/auth/change-password", json=password_data, headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Password changed successfully"
    
    @pytest.mark.asyncio
    async def test_change_password_wrong_current(self, async_client: AsyncClient, auth_headers: dict):
        """Test changing password with wrong current password."""
        password_data = {
            "current_password": "wrongpassword",
            "new_password": "NewPassword123!"
        }
        
        response = await async_client.post("/auth/change-password", json=password_data, headers=auth_headers)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "current password" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_forgot_password_success(self, async_client: AsyncClient, test_user: User, mock_email):
        """Test forgot password request."""
        forgot_data = {
            "email": test_user.email
        }
        
        response = await async_client.post("/auth/forgot-password", json=forgot_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "reset link" in data["message"].lower()
        mock_email.assert_called_once()
    
    @pytest.mark.asyncio
    async def test_forgot_password_nonexistent_email(self, async_client: AsyncClient, mock_email):
        """Test forgot password with nonexistent email."""
        forgot_data = {
            "email": "nonexistent@example.com"
        }
        
        response = await async_client.post("/auth/forgot-password", json=forgot_data)
        
        # Should still return success for security reasons
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        mock_email.assert_not_called()
    
    @pytest.mark.asyncio
    async def test_reset_password_success(self, async_client: AsyncClient, test_user: User, db_session: AsyncSession):
        """Test password reset with valid token."""
        auth_service = AuthService(db_session)
        reset_token = auth_service.create_password_reset_token(test_user.email)
        
        reset_data = {
            "token": reset_token,
            "new_password": "NewPassword123!"
        }
        
        response = await async_client.post("/auth/reset-password", json=reset_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Password reset successfully"
    
    @pytest.mark.asyncio
    async def test_reset_password_invalid_token(self, async_client: AsyncClient):
        """Test password reset with invalid token."""
        reset_data = {
            "token": "invalid_token",
            "new_password": "NewPassword123!"
        }
        
        response = await async_client.post("/auth/reset-password", json=reset_data)
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "invalid" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_verify_email_success(self, async_client: AsyncClient, db_session: AsyncSession):
        """Test email verification."""
        # Create unverified user
        unverified_user = User(
            email="unverified@example.com",
            firstname="Unverified",
            lastname="User",
            hashed_password="$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
            role=UserRole.CUSTOMER,
            verified=False,
            is_active=True
        )
        db_session.add(unverified_user)
        await db_session.commit()
        
        auth_service = AuthService(db_session)
        verification_token = auth_service.create_email_verification_token(unverified_user.email)
        
        response = await async_client.get(f"/auth/verify-email?token={verification_token}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Email verified successfully"
    
    @pytest.mark.asyncio
    async def test_verify_email_invalid_token(self, async_client: AsyncClient):
        """Test email verification with invalid token."""
        response = await async_client.get("/auth/verify-email?token=invalid_token")
        
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert "invalid" in data["message"].lower()
    
    @pytest.mark.asyncio
    async def test_logout_success(self, async_client: AsyncClient, auth_headers: dict):
        """Test successful logout."""
        response = await async_client.post("/auth/logout", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Logged out successfully"
    
    @pytest.mark.asyncio
    async def test_revoke_token_success(self, async_client: AsyncClient, test_user: User, db_session: AsyncSession):
        """Test token revocation."""
        auth_service = AuthService(db_session)
        refresh_token = auth_service.create_refresh_token(data={"sub": str(test_user.id)})
        
        revoke_data = {
            "token": refresh_token
        }
        
        response = await async_client.post("/auth/revoke", json=revoke_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Token revoked successfully"


class TestAuthValidation:
    """Test authentication validation and edge cases."""
    
    @pytest.mark.asyncio
    async def test_register_missing_fields(self, async_client: AsyncClient):
        """Test registration with missing required fields."""
        user_data = {
            "email": "test@example.com"
            # Missing other required fields
        }
        
        response = await async_client.post("/auth/register", json=user_data)
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_login_missing_fields(self, async_client: AsyncClient):
        """Test login with missing fields."""
        login_data = {
            "email": "test@example.com"
            # Missing password
        }
        
        response = await async_client.post("/auth/login", json=login_data)
        
        assert response.status_code == 422
    
    @pytest.mark.asyncio
    async def test_invalid_token_format(self, async_client: AsyncClient):
        """Test API calls with invalid token format."""
        headers = {"Authorization": "Bearer invalid_token_format"}
        
        response = await async_client.get("/auth/profile", headers=headers)
        
        assert response.status_code == 401
    
    @pytest.mark.asyncio
    async def test_expired_token(self, async_client: AsyncClient, test_user: User, db_session: AsyncSession):
        """Test API calls with expired token."""
        auth_service = AuthService(db_session)
        # Create token that expires immediately
        expired_token = auth_service.create_access_token(
            data={"sub": str(test_user.id)},
            expires_delta=timedelta(seconds=-1)
        )
        
        headers = {"Authorization": f"Bearer {expired_token}"}
        
        response = await async_client.get("/auth/profile", headers=headers)
        
        assert response.status_code == 401
        data = response.json()
        assert "expired" in data["message"].lower()


class TestAuthRoles:
    """Test role-based authentication."""
    
    @pytest.mark.asyncio
    async def test_admin_access(self, async_client: AsyncClient, admin_auth_headers: dict):
        """Test admin user access."""
        response = await async_client.get("/auth/profile", headers=admin_auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["data"]["role"] == UserRole.ADMIN
    
    @pytest.mark.asyncio
    async def test_supplier_access(self, async_client: AsyncClient, supplier_auth_headers: dict):
        """Test supplier user access."""
        response = await async_client.get("/auth/profile", headers=supplier_auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["data"]["role"] == UserRole.SUPPLIER
    
    @pytest.mark.asyncio
    async def test_customer_access(self, async_client: AsyncClient, auth_headers: dict):
        """Test customer user access."""
        response = await async_client.get("/auth/profile", headers=auth_headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["data"]["role"] == UserRole.CUSTOMER