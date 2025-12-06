"""
Property-based tests for Docker health checks.
These tests run standalone without database dependencies from conftest.

Feature: docker-full-functionality
Properties tested:
- Property 6: PostgreSQL health check
- Property 9: Redis health check
- Property 31: Health check retry behavior
"""

import pytest

# Mark all tests in this module as Docker tests
pytestmark = pytest.mark.docker
import subprocess
import time
from hypothesis import given, strategies as st, settings
from typing import Dict, Any
import redis
import psycopg2
from pathlib import Path
import sys
import yaml

# Add backend directory to path
backend_dir = Path(__file__).parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))


# Helper function to check if Docker services are running
def is_docker_running() -> bool:
    """Check if Docker daemon is running."""
    try:
        result = subprocess.run(
            ["docker", "ps"],
            capture_output=True,
            text=True,
            timeout=5
        )
        return result.returncode == 0
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return False


def is_service_running(service_name: str) -> bool:
    """Check if a specific Docker service is running."""
    try:
        result = subprocess.run(
            ["docker", "ps", "--filter", f"name={service_name}", "--format", "{{.Names}}"],
            capture_output=True,
            text=True,
            timeout=5
        )
        return service_name in result.stdout
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return False


def get_container_health_status(service_name: str) -> str:
    """Get the health status of a Docker container."""
    try:
        result = subprocess.run(
            ["docker", "inspect", "--format", "{{.State.Health.Status}}", service_name],
            capture_output=True,
            text=True,
            timeout=5
        )
        return result.stdout.strip()
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return "unknown"


def wait_for_healthy(service_name: str, timeout: int = 60) -> bool:
    """Wait for a service to become healthy."""
    start_time = time.time()
    while time.time() - start_time < timeout:
        status = get_container_health_status(service_name)
        if status == "healthy":
            return True
        time.sleep(2)
    return False


# Feature: docker-full-functionality, Property 6: PostgreSQL health check
@pytest.mark.skipif(not is_docker_running(), reason="Docker is not running")
@pytest.mark.skipif(not is_service_running("banwee_postgres"), reason="PostgreSQL container is not running")
def test_postgresql_health_check():
    """
    Property 6: PostgreSQL health check
    
    For any health check execution, when pg_isready is called,
    it should return success when the database is ready.
    
    Validates: Requirements 2.5
    """
    # Check if PostgreSQL container is healthy
    health_status = get_container_health_status("banwee_postgres")
    
    # If not healthy, wait for it to become healthy
    if health_status != "healthy":
        is_healthy = wait_for_healthy("banwee_postgres", timeout=60)
        assert is_healthy, "PostgreSQL container did not become healthy within timeout"
    
    # Verify we can connect to PostgreSQL
    try:
        conn = psycopg2.connect(
            host="localhost",
            port=5432,
            user="banwee",
            password="banwee_password",
            database="banwee_db",
            connect_timeout=10
        )
        conn.close()
    except Exception as e:
        pytest.fail(f"Failed to connect to PostgreSQL: {e}")
    
    # Verify pg_isready command works
    try:
        result = subprocess.run(
            ["docker", "exec", "banwee_postgres", "pg_isready", "-U", "banwee"],
            capture_output=True,
            text=True,
            timeout=10
        )
        assert result.returncode == 0, f"pg_isready failed: {result.stderr}"
        assert "accepting connections" in result.stdout, "PostgreSQL not accepting connections"
    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        pytest.fail(f"Failed to execute pg_isready: {e}")


# Feature: docker-full-functionality, Property 9: Redis health check
@pytest.mark.skipif(not is_docker_running(), reason="Docker is not running")
@pytest.mark.skipif(not is_service_running("banwee_redis"), reason="Redis container is not running")
def test_redis_health_check():
    """
    Property 9: Redis health check
    
    For any health check execution, when redis-cli ping is called,
    it should return PONG when Redis is ready.
    
    Validates: Requirements 3.4
    """
    # Check if Redis container is healthy
    health_status = get_container_health_status("banwee_redis")
    
    # If not healthy, wait for it to become healthy
    if health_status != "healthy":
        is_healthy = wait_for_healthy("banwee_redis", timeout=60)
        assert is_healthy, "Redis container did not become healthy within timeout"
    
    # Verify we can connect to Redis
    try:
        redis_client = redis.Redis(host="localhost", port=6379, db=0, socket_connect_timeout=10)
        response = redis_client.ping()
        assert response is True, "Redis ping failed"
        redis_client.close()
    except Exception as e:
        pytest.fail(f"Failed to connect to Redis: {e}")
    
    # Verify redis-cli ping command works
    try:
        result = subprocess.run(
            ["docker", "exec", "banwee_redis", "redis-cli", "ping"],
            capture_output=True,
            text=True,
            timeout=10
        )
        assert result.returncode == 0, f"redis-cli ping failed: {result.stderr}"
        assert "PONG" in result.stdout, "Redis did not respond with PONG"
    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        pytest.fail(f"Failed to execute redis-cli ping: {e}")


# Feature: docker-full-functionality, Property 31: Health check retry behavior
@pytest.mark.skipif(not is_docker_running(), reason="Docker is not running")
def test_health_check_retry_behavior():
    """
    Property 31: Health check retry behavior
    
    For any health check that fails, the system should retry up to the configured
    number of times before marking the service unhealthy.
    
    Validates: Requirements 8.5
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    services_with_health_checks = ["postgres", "redis", "backend", "frontend"]
    
    for service_name in services_with_health_checks:
        if service_name not in compose_content["services"]:
            continue
        
        service = compose_content["services"][service_name]
        
        # Verify health check is configured
        assert "healthcheck" in service, f"Service {service_name} has no health check configured"
        
        health_check = service["healthcheck"]
        
        # Verify test command is configured
        assert "test" in health_check, f"Service {service_name} health check has no test command"
        
        # Verify interval is configured
        assert "interval" in health_check, f"Service {service_name} health check has no interval"
        
        # Verify timeout is configured
        assert "timeout" in health_check, f"Service {service_name} health check has no timeout"
        
        # Verify retries is configured
        assert "retries" in health_check, f"Service {service_name} health check has no retries"
        
        # Verify retries is a reasonable number (between 1 and 10)
        retries = health_check["retries"]
        assert 1 <= retries <= 10, f"Service {service_name} has unreasonable retry count: {retries}"
        
        # Parse interval and timeout
        interval_str = health_check["interval"]
        timeout_str = health_check["timeout"]
        
        # Extract numeric values (assuming format like "10s" or "30s")
        interval_seconds = int(interval_str.rstrip('s'))
        timeout_seconds = int(timeout_str.rstrip('s'))
        
        # Verify timeout is less than interval
        assert timeout_seconds < interval_seconds, \
            f"Service {service_name} timeout ({timeout_seconds}s) should be less than interval ({interval_seconds}s)"


def test_postgres_health_check_configuration():
    """
    Test that PostgreSQL health check is properly configured.
    
    Validates: Requirements 2.5, 8.1
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    postgres_service = compose_content["services"]["postgres"]
    health_check = postgres_service["healthcheck"]
    
    # Verify pg_isready is used
    test_command = health_check["test"]
    if isinstance(test_command, list):
        test_command = " ".join(test_command)
    
    assert "pg_isready" in test_command, "PostgreSQL health check should use pg_isready"
    
    # Verify interval is 10 seconds
    assert health_check["interval"] == "10s", "PostgreSQL health check interval should be 10s"
    
    # Verify timeout is 5 seconds
    assert health_check["timeout"] == "5s", "PostgreSQL health check timeout should be 5s"
    
    # Verify retries is 5
    assert health_check["retries"] == 5, "PostgreSQL health check retries should be 5"


def test_redis_health_check_configuration():
    """
    Test that Redis health check is properly configured.
    
    Validates: Requirements 3.4, 8.2
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    redis_service = compose_content["services"]["redis"]
    health_check = redis_service["healthcheck"]
    
    # Verify redis-cli ping is used
    test_command = health_check["test"]
    if isinstance(test_command, list):
        test_command = " ".join(test_command)
    
    assert "redis-cli" in test_command, "Redis health check should use redis-cli"
    assert "ping" in test_command, "Redis health check should use ping command"
    
    # Verify interval is 10 seconds
    assert health_check["interval"] == "10s", "Redis health check interval should be 10s"
    
    # Verify timeout is 5 seconds
    assert health_check["timeout"] == "5s", "Redis health check timeout should be 5s"
    
    # Verify retries is 5
    assert health_check["retries"] == 5, "Redis health check retries should be 5"


def test_backend_health_check_configuration():
    """
    Test that backend health check is properly configured.
    
    Validates: Requirements 4.4, 8.3
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    backend_service = compose_content["services"]["backend"]
    health_check = backend_service["healthcheck"]
    
    # Verify HTTP health check is used
    test_command = health_check["test"]
    if isinstance(test_command, list):
        test_command = " ".join(test_command)
    
    assert "/health/live" in test_command, "Backend health check should use /health/live endpoint"
    
    # Verify interval is 30 seconds
    assert health_check["interval"] == "30s", "Backend health check interval should be 30s"
    
    # Verify timeout is 10 seconds
    assert health_check["timeout"] == "10s", "Backend health check timeout should be 10s"
    
    # Verify retries is configured
    assert "retries" in health_check, "Backend health check should have retries configured"
    
    # Verify start_period is configured (gives time for migrations)
    assert "start_period" in health_check, "Backend health check should have start_period configured"


def test_frontend_health_check_configuration():
    """
    Test that frontend health check is properly configured.
    
    Validates: Requirements 6.4, 8.4
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    frontend_service = compose_content["services"]["frontend"]
    health_check = frontend_service["healthcheck"]
    
    # Verify HTTP health check is used
    test_command = health_check["test"]
    if isinstance(test_command, list):
        test_command = " ".join(test_command)
    
    assert "5173" in test_command, "Frontend health check should check port 5173"
    
    # Verify interval is 30 seconds
    assert health_check["interval"] == "30s", "Frontend health check interval should be 30s"
    
    # Verify timeout is 10 seconds
    assert health_check["timeout"] == "10s", "Frontend health check timeout should be 10s"
    
    # Verify retries is configured
    assert "retries" in health_check, "Frontend health check should have retries configured"
    
    # Verify start_period is configured (gives time for npm install)
    assert "start_period" in health_check, "Frontend health check should have start_period configured"
