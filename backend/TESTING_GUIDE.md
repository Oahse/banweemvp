# Testing Guide for Banwee API

## Overview

This guide explains how to run the end-to-end tests for the Banwee e-commerce platform.

## Available Test Suites

### 1. Wishlist Flow Test
**File**: `test_wishlist_flow.py`
**Script**: `manual_wishlist_test.sh`

Tests the complete wishlist functionality including:
- Adding products to wishlist
- Viewing wishlist items
- Adding wishlist items to cart
- Removing items from wishlist

### 2. Payment and Order Flow Test
**File**: `test_payment_order_flow.py`
**Script**: `test_payment_order.sh`

Tests the complete checkout and payment process including:
- Product selection
- Cart management
- Checkout process
- Payment processing (success and failure)
- Order creation
- Order confirmation
- Cart clearing

## Prerequisites

### 1. Backend Server Running
```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```

The server should be accessible at `http://localhost:8000`

### 2. Database Setup

Initialize and seed the database with test data:

```bash
# Create tables and seed with default data
python3 init_db.py --seed

# Or customize the amount of test data
python3 init_db.py --seed --products 50 --users 20
```

### 3. Environment Variables

Ensure your `.env` file contains:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
DATABASE_URL=sqlite+aiosqlite:///./db1.db
```

## Running Tests

### Quick Start

```bash
# Run wishlist tests
./manual_wishlist_test.sh

# Run payment and order tests
./test_payment_order.sh
```

### Manual Execution

```bash
# Run wishlist tests
python3 test_wishlist_flow.py

# Run payment and order tests
python3 test_payment_order_flow.py
```

### Test Output

Each test provides detailed output:
- ✅ PASS: Test passed successfully
- ❌ FAIL: Test failed with error message
- Summary with pass/fail counts and success rate

Example output:
```
============================================================
PAYMENT AND ORDER FLOW END-TO-END TEST
============================================================

============================================================
STEP 1: Login
============================================================
✅ PASS: Login - User ID: 98fa01cc-cc7f-47b6-bf9b-f2d509d596a7

============================================================
STEP 2: Get Product and Variant
============================================================
✅ PASS: Get Product and Variant - Product: Organic Rice, Variant: abc-123

...

============================================================
TEST SUMMARY
============================================================

Total Tests: 12
Passed: 12
Failed: 0
Success Rate: 100.0%

🎉 All tests passed!
```

## Troubleshooting

### Backend Not Running

**Error**: `Cannot connect to backend`

**Solution**:
```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload
```

### No Products Found

**Error**: `No products with in-stock variants found`

**Solution**: Re-seed the database
```bash
rm db1.db  # Remove old database
python3 init_db.py --seed --products 50
```

### Authentication Failed

**Error**: `Login failed - Status: 401`

**Solution**: Check test credentials in `users.txt` after seeding:
```bash
cat users.txt | head -2
```

Default credentials:
- Email: `admin@banwee.com`
- Password: `adminpass`

### Payment Processing Errors

**Error**: `Payment failed - Stripe error`

**Solution**: Verify Stripe test keys in `.env`:
```bash
# Use Stripe test mode keys
STRIPE_SECRET_KEY=sk_test_...
```

### Database Locked

**Error**: `database is locked`

**Solution**: Stop the backend server and try again:
```bash
# Stop backend (Ctrl+C)
# Re-run test
python3 test_payment_order_flow.py
```

## Test Credentials

After seeding the database, test credentials are saved in `users.txt`:

```
admin@banwee.com / adminpass
supplier@banwee.com / supplierpass
user3@example.com / P@ss0003
...
```

## Test Data Cleanup

Tests automatically clean up temporary data:
- Cart items
- Shipping addresses
- Payment methods

However, orders and products remain in the database for inspection.

To completely reset:
```bash
rm db1.db
python3 init_db.py --seed
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Initialize database
        run: |
          cd backend
          python3 init_db.py --seed --products 20 --users 5
      
      - name: Start backend
        run: |
          cd backend
          uvicorn main:app &
          sleep 5
      
      - name: Run tests
        run: |
          cd backend
          python3 test_wishlist_flow.py
          python3 test_payment_order_flow.py
```

## Writing New Tests

### Test Structure

```python
class MyFlowTester:
    def __init__(self):
        self.access_token = None
        self.test_results = []
    
    def log_test(self, test_name: str, passed: bool, message: str = ""):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        result = f"{status}: {test_name}"
        if message:
            result += f" - {message}"
        print(result)
        self.test_results.append({
            "test": test_name,
            "passed": passed,
            "message": message
        })
    
    def test_something(self):
        """Test a specific feature"""
        try:
            # Test logic here
            response = requests.get(f"{BASE_URL}/endpoint")
            
            if response.status_code == 200:
                self.log_test("Test Name", True, "Success message")
                return True
            else:
                self.log_test("Test Name", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Test Name", False, str(e))
            return False
    
    def run_all_tests(self):
        """Run all tests"""
        if not self.test_something():
            print("\n⚠️  Test has issues")
        
        # Print summary
        passed = sum(1 for r in self.test_results if r["passed"])
        total = len(self.test_results)
        print(f"\nTotal Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        
        return passed == total
```

### Best Practices

1. **Use descriptive test names**: Make it clear what each test validates
2. **Log detailed messages**: Include relevant IDs, values, and error messages
3. **Handle errors gracefully**: Catch exceptions and log them
4. **Clean up test data**: Remove temporary data after tests
5. **Test both success and failure**: Validate error handling
6. **Use realistic test data**: Mirror production scenarios

## Additional Resources

- [FastAPI Testing Documentation](https://fastapi.tiangolo.com/tutorial/testing/)
- [Pytest Documentation](https://docs.pytest.org/)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs for detailed error messages
3. Verify environment configuration
4. Ensure database is properly seeded

---

**Last Updated**: November 17, 2025
