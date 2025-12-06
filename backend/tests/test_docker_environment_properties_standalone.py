"""
Property-based tests for Docker environment variable propagation.
These tests run standalone without database dependencies.

Feature: docker-full-functionality
Properties tested:
- Property 1: Backend environment variable propagation
- Property 2: Frontend environment variable propagation
"""

import pytest
import os
import sys
from hypothesis import given, strategies as st, settings
from typing import Dict, List
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))


# Feature: docker-full-functionality, Property 1: Backend environment variable propagation
@settings(max_examples=100)
@given(
    env_vars=st.lists(
        st.sampled_from([
            "POSTGRES_DB_URL",
            "REDIS_URL",
            "SECRET_KEY",
            "MAILGUN_API_KEY",
            "MAILGUN_DOMAIN",
            "MAILGUN_FROM_EMAIL",
            "STRIPE_SECRET_KEY",
            "STRIPE_WEBHOOK_SECRET",
            "FRONTEND_URL",
            "BACKEND_CORS_ORIGINS",
            "ALGORITHM",
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "REFRESH_TOKEN_EXPIRE_DAYS",
            "ENVIRONMENT",
            "DOMAIN",
        ]),
        min_size=1,
        max_size=15,
        unique=True
    )
)
def test_backend_environment_variable_propagation(env_vars: List[str]):
    """
    Property 1: Backend environment variable propagation
    
    For any backend service (main app, celery worker, celery beat), when the service starts,
    it should successfully load all required environment variables from the backend .env file.
    
    Validates: Requirements 1.1, 1.3
    """
    from core.config import settings
    
    # Test that each environment variable is accessible through the settings object
    for env_var in env_vars:
        # Map environment variable names to settings attributes
        attr_mapping = {
            "POSTGRES_DB_URL": "SQLALCHEMY_DATABASE_URI",
            "REDIS_URL": "REDIS_URL",
            "SECRET_KEY": "SECRET_KEY",
            "MAILGUN_API_KEY": "MAILGUN_API_KEY",
            "MAILGUN_DOMAIN": "MAILGUN_DOMAIN",
            "MAILGUN_FROM_EMAIL": "MAILGUN_FROM_EMAIL",
            "STRIPE_SECRET_KEY": "STRIPE_SECRET_KEY",
            "STRIPE_WEBHOOK_SECRET": "STRIPE_WEBHOOK_SECRET",
            "FRONTEND_URL": "FRONTEND_URL",
            "BACKEND_CORS_ORIGINS": "BACKEND_CORS_ORIGINS",
            "ALGORITHM": "ALGORITHM",
            "ACCESS_TOKEN_EXPIRE_MINUTES": "ACCESS_TOKEN_EXPIRE_MINUTES",
            "REFRESH_TOKEN_EXPIRE_DAYS": "REFRESH_TOKEN_EXPIRE_DAYS",
            "ENVIRONMENT": "ENVIRONMENT",
            "DOMAIN": "DOMAIN",
        }
        
        attr_name = attr_mapping.get(env_var)
        if attr_name:
            # Verify the attribute exists and is not None
            assert hasattr(settings, attr_name), f"Settings object missing attribute: {attr_name}"
            value = getattr(settings, attr_name)
            assert value is not None, f"Environment variable {env_var} (settings.{attr_name}) is None"
            assert value != "", f"Environment variable {env_var} (settings.{attr_name}) is empty"


# Feature: docker-full-functionality, Property 2: Frontend environment variable propagation
def test_frontend_environment_variable_propagation():
    """
    Property 2: Frontend environment variable propagation
    
    For any frontend environment variable, when the application loads,
    it should be accessible via the Vite environment system.
    
    Validates: Requirements 1.2, 1.3
    
    Note: This test verifies that the frontend .env file structure is correct.
    Actual runtime verification would require running the frontend container.
    """
    # Read the frontend .env file
    frontend_env_path = backend_dir.parent / "frontend" / ".env"
    
    # Check if the file exists
    assert frontend_env_path.exists(), "frontend/.env file does not exist"
    
    # Read the .env file
    with open(frontend_env_path, 'r') as f:
        env_content = f.read()
    
    # Required frontend environment variables
    required_vars = [
        "VITE_API_BASE_URL",
        "VITE_STRIPE_PUBLIC_KEY",
        "VITE_GOOGLE_CLIENT_ID",
        "VITE_FACEBOOK_APP_ID",
        "VITE_TIKTOK_CLIENT_ID",
        "VITE_APP_NAME",
        "VITE_APP_URL",
    ]
    
    # Verify each required variable is present in the .env file
    for var in required_vars:
        assert var in env_content, f"Required frontend environment variable {var} not found in frontend/.env"
        
        # Extract the value (simple parsing)
        for line in env_content.split('\n'):
            if line.strip().startswith(var):
                parts = line.split('=', 1)
                if len(parts) == 2:
                    value = parts[1].strip()
                    # Allow placeholder values but not empty values
                    assert value != "", f"Frontend environment variable {var} is empty"
                break


def test_backend_env_file_structure():
    """
    Test that backend/.env file has the correct structure for Docker.
    
    Validates: Requirements 1.1, 1.4
    """
    backend_env_path = backend_dir / ".env"
    
    # Check if the file exists
    assert backend_env_path.exists(), "backend/.env file does not exist"
    
    # Read the .env file
    with open(backend_env_path, 'r') as f:
        env_content = f.read()
    
    # Required backend environment variables for Docker
    required_vars = [
        "POSTGRES_DB_URL",
        "REDIS_URL",
        "SECRET_KEY",
        "MAILGUN_API_KEY",
        "MAILGUN_DOMAIN",
        "MAILGUN_FROM_EMAIL",
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
        "FRONTEND_URL",
        "BACKEND_CORS_ORIGINS",
    ]
    
    # Verify each required variable is present
    for var in required_vars:
        assert var in env_content, f"Required backend environment variable {var} not found in backend/.env"
    
    # Verify service names are used for Docker (not localhost)
    assert "postgres:5432" in env_content or "POSTGRES_SERVER=postgres" in env_content, \
        "backend/.env should use 'postgres' service name for Docker"
    assert "redis:6379" in env_content or "redis://redis" in env_content, \
        "backend/.env should use 'redis' service name for Docker"


def test_docker_compose_uses_env_files():
    """
    Test that docker-compose.yml uses env_file directive instead of individual environment variables.
    
    Validates: Requirements 1.3, 10.1, 10.2, 10.3
    """
    import yaml
    
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    # Check if the file exists
    assert docker_compose_path.exists(), "docker-compose.yml file does not exist"
    
    # Read the docker-compose.yml file
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    # Services that should use backend/.env
    backend_services = ["backend", "celery_worker", "negotiation_celery_worker", "celery_beat"]
    
    for service in backend_services:
        assert service in compose_content["services"], f"Service {service} not found in docker-compose.yml"
        service_config = compose_content["services"][service]
        
        # Check that env_file is used
        assert "env_file" in service_config, f"Service {service} should use env_file directive"
        assert "./backend/.env" in service_config["env_file"], \
            f"Service {service} should load environment from ./backend/.env"
    
    # Frontend should use frontend/.env
    assert "frontend" in compose_content["services"], "Frontend service not found in docker-compose.yml"
    frontend_config = compose_content["services"]["frontend"]
    assert "env_file" in frontend_config, "Frontend service should use env_file directive"
    assert "./frontend/.env" in frontend_config["env_file"], \
        "Frontend service should load environment from ./frontend/.env"


def test_service_dependencies_configured():
    """
    Test that services have proper dependency configuration with health checks.
    
    Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5
    """
    import yaml
    
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    services = compose_content["services"]
    
    # Backend should depend on postgres and redis with health checks
    backend = services["backend"]
    assert "depends_on" in backend, "Backend should have depends_on configuration"
    assert "postgres" in backend["depends_on"], "Backend should depend on postgres"
    assert "redis" in backend["depends_on"], "Backend should depend on redis"
    
    # Check health check conditions
    if isinstance(backend["depends_on"], dict):
        assert backend["depends_on"]["postgres"].get("condition") == "service_healthy", \
            "Backend should wait for postgres health check"
        assert backend["depends_on"]["redis"].get("condition") == "service_healthy", \
            "Backend should wait for redis health check"
    
    # Celery workers should depend on their required services
    celery_worker = services["celery_worker"]
    assert "depends_on" in celery_worker, "Celery worker should have depends_on configuration"
    
    # Negotiation worker should depend on redis
    negotiation_worker = services["negotiation_celery_worker"]
    assert "depends_on" in negotiation_worker, "Negotiation worker should have depends_on configuration"
    assert "redis" in negotiation_worker["depends_on"], "Negotiation worker should depend on redis"
    
    # Frontend should depend on backend
    frontend = services["frontend"]
    assert "depends_on" in frontend, "Frontend should have depends_on configuration"
    assert "backend" in frontend["depends_on"], "Frontend should depend on backend"


def test_service_names_for_inter_container_communication():
    """
    Test that backend/.env uses service names for inter-container communication.
    
    Validates: Requirements 10.2, 10.3
    """
    backend_env_path = backend_dir / ".env"
    
    with open(backend_env_path, 'r') as f:
        env_content = f.read()
    
    # Parse environment variables
    env_vars = {}
    for line in env_content.split('\n'):
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            key, value = line.split('=', 1)
            env_vars[key.strip()] = value.strip()
    
    # Check POSTGRES_DB_URL uses 'postgres' service name
    if "POSTGRES_DB_URL" in env_vars:
        postgres_url = env_vars["POSTGRES_DB_URL"]
        assert "@postgres:" in postgres_url or "@postgres/" in postgres_url, \
            f"POSTGRES_DB_URL should use 'postgres' service name, got: {postgres_url}"
    
    # Check REDIS_URL uses 'redis' service name
    if "REDIS_URL" in env_vars:
        redis_url = env_vars["REDIS_URL"]
        assert "redis://redis" in redis_url, \
            f"REDIS_URL should use 'redis' service name, got: {redis_url}"
    
    # Check POSTGRES_SERVER uses 'postgres' service name
    if "POSTGRES_SERVER" in env_vars:
        postgres_server = env_vars["POSTGRES_SERVER"]
        assert postgres_server == "postgres", \
            f"POSTGRES_SERVER should be 'postgres', got: {postgres_server}"
