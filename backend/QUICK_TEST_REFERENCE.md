# Quick Test Reference

## Run Payment & Order Flow Tests

### One-Line Command
```bash
cd backend && ./test_payment_order.sh
```

### Manual Run
```bash
cd backend
python3 test_payment_order_flow.py
```

## Prerequisites Checklist

- [ ] Backend running on `http://localhost:8000`
- [ ] Database seeded: `python3 init_db.py --seed`
- [ ] Stripe keys in `.env`

## Test Credentials

```
Email: admin@banwee.com
Password: adminpass
```

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend not running | `uvicorn main:app --reload` |
| No products found | `rm db1.db && python3 init_db.py --seed` |
| Login failed | Check `users.txt` for credentials |
| Payment errors | Verify `STRIPE_SECRET_KEY` in `.env` |

## Expected Result

```
Total Tests: 12
Passed: 12
Failed: 0
Success Rate: 100.0%

🎉 All tests passed!
```

## Documentation

- **Full Guide**: `TESTING_GUIDE.md`
- **Test Results**: `PAYMENT_ORDER_FLOW_TEST_RESULTS.md`
- **Implementation**: `TEST_IMPLEMENTATION_SUMMARY.md`

## Test Coverage

✅ Authentication
✅ Product Discovery
✅ Cart Management
✅ Checkout Process
✅ Payment Success
✅ Payment Failure
✅ Order Creation
✅ Order Verification
✅ Cart Clearing
✅ Email Confirmation
✅ Order Tracking
✅ Data Cleanup

---

**Quick Start**: `./test_payment_order.sh`
