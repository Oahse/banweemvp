# Empty conftest to prevent database setup for Docker environment tests
import pytest

# Override the setup_test_database fixture to do nothing
@pytest.fixture(scope="session", autouse=False)
def setup_test_database():
    """Override to prevent database setup for these tests."""
    yield
