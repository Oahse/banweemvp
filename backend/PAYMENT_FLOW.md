# Payment Processing Flow

## Overview
The payment processing system integrates with Stripe to handle secure payment transactions for orders.

## Payment Flow

### 1. Checkout Process
When a customer proceeds to checkout:

1. **Frontend**: User fills out checkout form with:
   - Shipping address
   - Shipping method
   - Payment method
   - Optional notes

2. **Backend**: `/api/v1/orders/checkout` endpoint receives the request

3. **Order Creation**: System creates an order with status "pending"

4. **Payment Processing**: `PaymentService.process_payment()` is called:
   - Creates a Stripe PaymentIntent
   - Records transaction in database
   - Returns payment result

5. **Success Path**:
   - Order status updated to "confirmed"
   - Tracking event created
   - Cart is cleared
   - Order confirmation email sent
   - Customer notification created

6. **Failure Path**:
   - Order status updated to "payment_failed"
   - Cart is retained
   - Error message returned to customer

## API Endpoints

### Process Payment
```
POST /api/v1/payments/process
```

**Request Body:**
```json
{
  "amount": 99.99,
  "payment_method_id": "uuid",
  "order_id": "uuid",
  "currency": "USD"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "status": "success",
    "payment_intent_id": "pi_xxx",
    "client_secret": "pi_xxx_secret_xxx",
    "transaction_id": "uuid"
  },
  "message": "Payment processed successfully"
}
```

**Response (Failure):**
```json
{
  "success": false,
  "message": "Payment failed: Card was declined"
}
```

### Create Payment Intent
```
POST /api/v1/payments/create-payment-intent
```

**Request Body:**
```json
{
  "order_id": "uuid",
  "amount": 99.99,
  "currency": "usd"
}
```

### Stripe Webhook
```
POST /api/v1/payments/stripe-webhook
```

Handles Stripe webhook events:
- `payment_intent.succeeded`: Updates transaction status, sends receipt email
- `payment_intent.payment_failed`: Updates transaction status, sends failure email

## Error Handling

### Payment Errors
- **Card Declined**: Returns user-friendly message
- **Insufficient Funds**: Returns specific error
- **Network Error**: Returns generic error message
- **Invalid Payment Method**: Returns 404 error

### Order Errors
- **Empty Cart**: Returns 400 error
- **Invalid Address**: Returns 404 error
- **Invalid Shipping Method**: Returns 404 error
- **Stock Unavailable**: Returns 400 error

## Security

1. **Authentication**: All payment endpoints require user authentication
2. **Authorization**: Users can only process payments for their own orders
3. **Webhook Verification**: Stripe webhooks are verified using signature
4. **PCI Compliance**: Payment details are handled by Stripe, not stored locally

## Testing

### Test Cards (Stripe Test Mode)
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Insufficient Funds: `4000 0000 0000 9995`

### Test Flow
1. Add items to cart
2. Proceed to checkout
3. Fill in shipping details
4. Select payment method
5. Submit order
6. Verify payment processing
7. Check order status
8. Verify cart is cleared
9. Check email confirmation

## Database Schema

### Transaction Table
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    order_id UUID REFERENCES orders(id),
    stripe_payment_intent_id VARCHAR(225),
    amount FLOAT NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    description TEXT,
    meta_data TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## Configuration

Required environment variables:
```
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
FRONTEND_URL=http://localhost:5173
```

## Future Enhancements

1. Support for multiple payment providers (Adyen, PayPal)
2. Saved payment methods with tokenization
3. Recurring payments for subscriptions
4. Refund processing
5. Payment analytics and reporting
