from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response, JSONResponse
from starlette.types import ASGIApp
from fastapi import status

from backend.services.settings import SettingsService
from backend.core.database import AsyncSessionDB
from backend.core.constants import UserRole


class MaintenanceModeMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        # Allow health checks to pass through always
        if request.url.path == "/health" or request.url.path.startswith("/health/"):
            return await call_next(request)

        # Create a new async session for this request
        async with AsyncSessionDB() as session:
            settings_service = SettingsService(session)
            maintenance_enabled = await settings_service.is_maintenance_mode_enabled()

            if maintenance_enabled:
                user_is_admin = False
                # Attempt to get user from request state if authentication middleware has run
                # This assumes an authentication middleware runs BEFORE this one and sets request.state.user
                if hasattr(request.state, "user") and request.state.user:
                    user = request.state.user
                    # Assuming user object has a 'role' attribute (e.g., from an ORM model or Pydantic schema)
                    if hasattr(user, "role") and user.role.lower() == UserRole.ADMIN.value:
                        user_is_admin = True
                
                if not user_is_admin:
                    maintenance_message = await settings_service.get_maintenance_mode_message()
                    return JSONResponse(
                        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                        content={"detail": maintenance_message}
                    )
        
        response = await call_next(request)
        return response
