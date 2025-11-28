from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4
import pytest
from httpx import AsyncClient

from main import app
from models.user import User
from models.product import Product, Category
from models.review import Review

pytestmark = pytest.mark.asyncio

async def test_get_reviews_for_product_returns_correct_data_and_structure(async_client: AsyncClient, db_session: AsyncSession):
    """
    GIVEN a product with multiple reviews
    WHEN the /api/v1/reviews/product/{product_id} endpoint is called
    THEN it should return a 200 OK response with the correct data and structure
    """
    # Create a user, category and a product
    user = User(id=uuid4(), email="test1@example.com", firstname="John", lastname="Doe", hashed_password="password")
    user_id = user.id
    category = Category(id=uuid4(), name="Test Category")
    category_id = category.id
    db_session.add(user)
    db_session.add(category)
    await db_session.commit()

    product = Product(id=uuid4(), name="Test Product", category_id=category_id, supplier_id=user_id)
    db_session.add(product)
    await db_session.commit()
    await db_session.refresh(product)
    product_id = product.id

    # Create reviews for the product
    review1 = Review(id=uuid4(), product_id=product_id, user_id=user_id, rating=5, comment="Great product!")
    review2 = Review(id=uuid4(), product_id=product_id, user_id=user_id, rating=4, comment="Good, but not perfect.")
    db_session.add_all([review1, review2])
    await db_session.commit()

    # Call the endpoint
    response = await async_client.get(f"/api/v1/reviews/product/{product_id}")

    # Assert the response
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["total"] == 2
    assert len(data["data"]["data"]) == 2

    # Check the structure of the review data
    for review in data["data"]["data"]:
        assert "id" in review
        assert "rating" in review
        assert "comment" in review
        assert "created_at" in review
        assert "user" in review
        assert "id" in review["user"]
        assert "firstname" in review["user"]
        assert "lastname" in review["user"]


async def test_get_reviews_for_product_with_no_reviews_returns_empty_list(async_client: AsyncClient, db_session: AsyncSession):
    """
    GIVEN a product with no reviews
    WHEN the /api/v1/reviews/product/{product_id} endpoint is called
    THEN it should return a 200 OK response with an empty list of reviews
    """
    # Create a user, category and a product
    user = User(id=uuid4(), email="test2@example.com", firstname="Jane", lastname="Doe", hashed_password="password")
    user_id = user.id
    category = Category(id=uuid4(), name="Test Category 2")
    category_id = category.id
    db_session.add(user)
    db_session.add(category)
    await db_session.commit()

    product = Product(id=uuid4(), name="Test Product 2", category_id=category_id, supplier_id=user_id)
    db_session.add(product)
    await db_session.commit()
    await db_session.refresh(product)
    product_id = product.id

    # Call the endpoint
    response = await async_client.get(f"/api/v1/reviews/product/{product_id}")

    # Assert the response
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["total"] == 0
    assert len(data["data"]["data"]) == 0
