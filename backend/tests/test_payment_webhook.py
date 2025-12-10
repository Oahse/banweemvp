import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from models.user import User
from models.transaction import Transaction
from main import app

client = TestClient(app)

def create_test_user(db: Session, email: str = "test@example.com", password: str = "password"):
    user = User(email=email, password=password, is_active=True)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_test_transaction(db: Session, user_id: int, payment_intent_id: str):
    transaction = Transaction(
        user_id=user_id,
        stripe_payment_intent_id=payment_intent_id,
        amount=100.0,
        currency="usd",
        status="pending",
        transaction_type="payment",
    )
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction

def test_stripe_webhook_charge_succeeded(db: Session):
    # 1. Create a user and a transaction in a "pending" state
    user = create_test_user(db)
    payment_intent_id = "pi_123456789"
    transaction = create_test_transaction(db, user.id, payment_intent_id)

    # 2. Construct a mock Stripe `charge.succeeded` event payload
    mock_event = {
        "type": "charge.succeeded",
        "data": {
            "object": {
                "payment_intent": payment_intent_id,
            }
        }
    }

    # 3. Make a POST request to the `/stripe-webhook` endpoint
    response = client.post("/stripe-webhook", json=mock_event)
    assert response.status_code == 200

    # 4. Assert that the transaction status in the database is updated to "succeeded"
    db.refresh(transaction)
    assert transaction.status == "succeeded"