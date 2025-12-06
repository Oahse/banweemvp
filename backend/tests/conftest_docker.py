# Conftest for Docker tests that don't need database setup
import pytest

# Override the setup_test_database fixture to do nothing for Docker tests
@pytest.fixture(scope="session", autouse=False)
def setup_test_database():
    """Override to prevent database setup for Docker tests."""
    yield
