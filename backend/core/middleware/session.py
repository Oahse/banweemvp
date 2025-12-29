"""
Session Middleware with Redis Integration
Handles user sessions using Redis for performance and scalability
"""
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from typing import Optional, Dict, Any
from uuid import UUID, uuid4
from datetime import datetime, timedelta
from core.redis import RedisService, RedisKeyManager
import logging

logger = logging.getLogger(__name__)

class SessionService(RedisService):
    """Redis-based session service integrated into middleware"""
    
    def __init__(self):
        super().__init__()
        self.session_expiry = 24 * 3600  # 24 hours in seconds
        self.remember_me_expiry = 30 * 24 * 3600  # 30 days for remember me
    
    async def create_session(
        self, 
        user_id: UUID, 
        user_data: Dict[str, Any],
        remember_me: bool = False,
        session_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create new user session in Redis"""
        try:
            if not session_id:
                session_id = str(uuid4())
            
            session_key = RedisKeyManager.session_key(session_id)
            
            session_data = {
                "session_id": session_id,
                "user_id": str(user_id),
                "user_data": user_data,
                "created_at": datetime.utcnow().isoformat(),
                "last_accessed": datetime.utcnow().isoformat(),
                "remember_me": remember_me,
                "ip_address": None,
                "user_agent": None
            }
            
            expiry = self.remember_me_expiry if remember_me else self.session_expiry
            
            success = await self.set_with_expiry(session_key, session_data, expiry)
            
            if success:
                return {
                    "success": True,
                    "session_id": session_id,
                    "expires_in": expiry
                }
            else:
                return {"success": False, "error": "Failed to create session"}
                
        except Exception as e:
            logger.error(f"Error creating session: {e}")
            return {"success": False, "error": "Session creation failed"}
    
    async def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Get session data from Redis"""
        try:
            session_key = RedisKeyManager.session_key(session_id)
            session_data = await self.get_data(session_key)
            
            if session_data:
                # Update last accessed time
                session_data["last_accessed"] = datetime.utcnow().isoformat()
                
                # Refresh expiry
                expiry = self.remember_me_expiry if session_data.get("remember_me") else self.session_expiry
                await self.set_with_expiry(session_key, session_data, expiry)
                
                return session_data
            
            return None
            
        except Exception as e:
            logger.error(f"Error getting session {session_id}: {e}")
            return None
    
    async def update_session(self, session_id: str, updates: Dict[str, Any]) -> bool:
        """Update session data"""
        try:
            session_key = RedisKeyManager.session_key(session_id)
            session_data = await self.get_data(session_key)
            
            if not session_data:
                return False
            
            # Update session data
            session_data.update(updates)
            session_data["last_accessed"] = datetime.utcnow().isoformat()
            
            # Save with appropriate expiry
            expiry = self.remember_me_expiry if session_data.get("remember_me") else self.session_expiry
            return await self.set_with_expiry(session_key, session_data, expiry)
            
        except Exception as e:
            logger.error(f"Error updating session {session_id}: {e}")
            return False
    
    async def delete_session(self, session_id: str) -> bool:
        """Delete session from Redis"""
        try:
            session_key = RedisKeyManager.session_key(session_id)
            return await self.delete_key(session_key)
            
        except Exception as e:
            logger.error(f"Error deleting session {session_id}: {e}")
            return False

class SessionMiddleware(BaseHTTPMiddleware):
    """
    Middleware for Redis-based session management
    """
    
    def __init__(self, app: ASGIApp):
        super().__init__(app)
        self.session_service = SessionService()
        self.session_cookie_name = "session_id"
    
    async def dispatch(self, request: Request, call_next):
        """Process request with Redis session handling"""
        
        # Skip session handling for health checks and static files
        if request.url.path in ["/health", "/docs", "/redoc", "/openapi.json"]:
            return await call_next(request)
        
        # Get session ID from cookie or header
        session_id = request.cookies.get(self.session_cookie_name)
        if not session_id:
            session_id = request.headers.get("X-Session-ID")
        
        # Validate session if present
        if session_id:
            try:
                session_data = await self.session_service.get_session(session_id)
                if session_data:
                    # Store session data in request state
                    request.state.session_id = session_id
                    request.state.user_id = session_data.get("user_id")
                    request.state.session_data = session_data
                    
                    # Update session metadata
                    await self.session_service.update_session(session_id, {
                        "ip_address": request.client.host if request.client else None,
                        "user_agent": request.headers.get("user-agent")
                    })
            except Exception as e:
                logger.error(f"Session validation error: {e}")
        
        # Process request
        response = await call_next(request)
        
        return response

                        