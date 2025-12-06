"""
Property-based tests for Docker data persistence.
These tests run standalone without database dependencies from conftest.

Feature: docker-full-functionality
Properties tested:
- Property 5: Database data persistence
- Property 8: Redis data persistence
"""

import pytest

# Mark all tests in this module as Docker tests
pytestmark = pytest.mark.docker
import subprocess
import time
import uuid
from hypothesis import given, strategies as st, settings, assume
from typing import Dict, Any
import redis
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
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


def restart_docker_service(service_name: str) -> bool:
    """Restart a Docker service."""
    try:
        # Stop the service
        subprocess.run(
            ["docker", "restart", service_name],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        # Wait for service to be healthy
        time.sleep(5)
        
        # Check if service is running
        return is_service_running(service_name)
    except (subprocess.TimeoutExpired, FileNotFoundError):
        return False


# Hypothesis strategies for generating test data
@st.composite
def user_data(draw):
    """Generate random user data for testing."""
    return {
        "id": str(uuid.uuid4()),
        "email": draw(st.emails()),
        "firstname": draw(st.text(min_size=1, max_size=50, alphabet=st.characters(min_codepoint=65, max_codepoint=122))),
        "lastname": draw(st.text(min_size=1, max_size=50, alphabet=st.characters(min_codepoint=65, max_codepoint=122))),
        "role": draw(st.sampled_from(["Customer", "Supplier", "Admin"])),
        "active": draw(st.booleans()),
        "verified": draw(st.booleans()),
    }


@st.composite
def redis_key_value(draw):
    """Generate random Redis key-value pairs."""
    key = draw(st.text(min_size=1, max_size=100, alphabet=st.characters(min_codepoint=33, max_codepoint=126)))
    value = draw(st.text(min_size=0, max_size=1000))
    ttl = draw(st.integers(min_value=60, max_value=3600))  # TTL between 1 minute and 1 hour
    return {"key": key, "value": value, "ttl": ttl}


# Feature: docker-full-functionality, Property 5: Database data persistence
@pytest.mark.skipif(not is_docker_running(), reason="Docker is not running")
@pytest.mark.skipif(not is_service_running("banwee_postgres"), reason="PostgreSQL container is not running")
@settings(max_examples=10, deadline=60000)  # Reduced examples due to container restart overhead
@given(data=user_data())
def test_database_data_persistence(data: Dict[str, Any]):
    """
    Property 5: Database data persistence
    
    For any data inserted into PostgreSQL, when the container is restarted,
    the data should still exist in the database.
    
    Validates: Requirements 2.4, 9.1, 9.3
    """
    # Skip if data contains invalid characters
    assume(all(ord(c) < 128 for c in data["email"]))
    assume(all(ord(c) < 128 for c in data["firstname"]))
    assume(all(ord(c) < 128 for c in data["lastname"]))
    
    async def run_test():
        # Database connection URL
        db_url = "postgresql+asyncpg://banwee:banwee_password@localhost:5432/banwee_db"
        
        # Create async engine
        engine = create_async_engine(db_url, echo=False)
        async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
        
        try:
            # Insert test data
            async with async_session() as session:
                # Create a simple test table if it doesn't exist
                await session.execute(text("""
                    CREATE TABLE IF NOT EXISTS test_persistence (
                        id UUID PRIMARY KEY,
                        email VARCHAR(255),
                        firstname VARCHAR(50),
                        lastname VARCHAR(50),
                        role VARCHAR(20),
                        active BOOLEAN,
                        verified BOOLEAN
                    )
                """))
                await session.commit()
                
                # Insert test data
                await session.execute(
                    text("""
                        INSERT INTO test_persistence (id, email, firstname, lastname, role, active, verified)
                        VALUES (:id, :email, :firstname, :lastname, :role, :active, :verified)
                    """),
                    {
                        "id": data["id"],
                        "email": data["email"],
                        "firstname": data["firstname"],
                        "lastname": data["lastname"],
                        "role": data["role"],
                        "active": data["active"],
                        "verified": data["verified"],
                    }
                )
                await session.commit()
            
            # Restart PostgreSQL container
            restart_success = restart_docker_service("banwee_postgres")
            assert restart_success, "Failed to restart PostgreSQL container"
            
            # Wait for PostgreSQL to be ready
            time.sleep(5)
            
            # Verify data still exists after restart
            async with async_session() as session:
                result = await session.execute(
                    text("SELECT * FROM test_persistence WHERE id = :id"),
                    {"id": data["id"]}
                )
                row = result.fetchone()
                
                assert row is not None, f"Data with id {data['id']} not found after container restart"
                assert row[1] == data["email"], "Email mismatch after restart"
                assert row[2] == data["firstname"], "Firstname mismatch after restart"
                assert row[3] == data["lastname"], "Lastname mismatch after restart"
                assert row[4] == data["role"], "Role mismatch after restart"
                assert row[5] == data["active"], "Active status mismatch after restart"
                assert row[6] == data["verified"], "Verified status mismatch after restart"
                
                # Clean up test data
                await session.execute(
                    text("DELETE FROM test_persistence WHERE id = :id"),
                    {"id": data["id"]}
                )
                await session.commit()
        
        finally:
            await engine.dispose()
    
    # Run the async test
    asyncio.run(run_test())


# Feature: docker-full-functionality, Property 8: Redis data persistence
@pytest.mark.skipif(not is_docker_running(), reason="Docker is not running")
@pytest.mark.skipif(not is_service_running("banwee_redis"), reason="Redis container is not running")
@settings(max_examples=10, deadline=60000)  # Reduced examples due to container restart overhead
@given(data=redis_key_value())
def test_redis_data_persistence(data: Dict[str, Any]):
    """
    Property 8: Redis data persistence
    
    For any data stored in Redis, when the container is restarted,
    the data should still exist in Redis.
    
    Validates: Requirements 3.3, 9.2, 9.4
    """
    # Skip if key or value contains problematic characters
    assume(len(data["key"]) > 0)
    assume(all(ord(c) < 128 for c in data["key"]))
    assume(all(ord(c) < 128 for c in data["value"]))
    
    # Connect to Redis
    redis_client = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)
    
    try:
        # Store test data with TTL
        test_key = f"test_persistence:{data['key']}"
        redis_client.setex(test_key, data["ttl"], data["value"])
        
        # Verify data was stored
        stored_value = redis_client.get(test_key)
        assert stored_value == data["value"], "Data not stored correctly in Redis"
        
        # Restart Redis container
        restart_success = restart_docker_service("banwee_redis")
        assert restart_success, "Failed to restart Redis container"
        
        # Wait for Redis to be ready
        time.sleep(5)
        
        # Reconnect to Redis
        redis_client = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)
        
        # Verify data still exists after restart
        retrieved_value = redis_client.get(test_key)
        assert retrieved_value == data["value"], \
            f"Data with key {test_key} not found or changed after container restart"
        
        # Verify TTL is still set (should be less than original but greater than 0)
        ttl = redis_client.ttl(test_key)
        assert ttl > 0, "TTL not preserved after restart"
        assert ttl <= data["ttl"], "TTL should not increase after restart"
        
        # Clean up test data
        redis_client.delete(test_key)
    
    finally:
        redis_client.close()


def test_postgres_volume_exists():
    """
    Test that PostgreSQL volume is configured in docker-compose.yml.
    
    Validates: Requirements 9.1
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    # Check that postgres_data volume is defined
    assert "volumes" in compose_content, "No volumes section in docker-compose.yml"
    assert "postgres_data" in compose_content["volumes"], "postgres_data volume not defined"
    
    # Check that postgres service uses the volume
    postgres_service = compose_content["services"]["postgres"]
    assert "volumes" in postgres_service, "PostgreSQL service has no volumes configured"
    
    volume_mappings = postgres_service["volumes"]
    assert any("postgres_data" in v for v in volume_mappings), \
        "PostgreSQL service does not use postgres_data volume"


def test_redis_volume_exists():
    """
    Test that Redis volume is configured in docker-compose.yml.
    
    Validates: Requirements 9.2
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    # Check that redis_data volume is defined
    assert "volumes" in compose_content, "No volumes section in docker-compose.yml"
    assert "redis_data" in compose_content["volumes"], "redis_data volume not defined"
    
    # Check that redis service uses the volume
    redis_service = compose_content["services"]["redis"]
    assert "volumes" in redis_service, "Redis service has no volumes configured"
    
    volume_mappings = redis_service["volumes"]
    assert any("redis_data" in v for v in volume_mappings), \
        "Redis service does not use redis_data volume"


def test_redis_aof_persistence_enabled():
    """
    Test that Redis is configured with AOF (Append-Only File) persistence.
    
    Validates: Requirements 3.1, 9.2
    """
    docker_compose_path = backend_dir.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    redis_service = compose_content["services"]["redis"]
    
    # Check that Redis command includes --appendonly yes
    assert "command" in redis_service, "Redis service has no command configured"
    command = redis_service["command"]
    
    if isinstance(command, str):
        assert "--appendonly yes" in command, "Redis AOF persistence not enabled"
    elif isinstance(command, list):
        assert "--appendonly" in command and "yes" in command, "Redis AOF persistence not enabled"
