#!/usr/bin/env python3
"""
Test order calculation logic to identify the bug
"""

def test_calculation():
    """Test the calculation that's showing the wrong total"""
    
    # Example values from the issue
    subtotal = 79.06
    shipping = 4.99
    tax = 13.14
    discount = 0.0
    
    # Correct calculation
    expected_total = subtotal + shipping + tax - discount
    
    print("🧮 Order Calculation Test")
    print(f"   Subtotal: ${subtotal:.2f}")
    print(f"   Shipping: ${shipping:.2f}")
    print(f"   Tax:      ${tax:.2f}")
    print(f"   Discount: ${discount:.2f}")
    print(f"   ─────────────────────")
    print(f"   Expected Total: ${expected_total:.2f}")
    
    # The issue shows total as $79.06 (same as subtotal)
    incorrect_total = 79.06
    print(f"   Actual Total:   ${incorrect_total:.2f}")
    
    if abs(expected_total - incorrect_total) > 0.01:
        print(f"   ❌ CALCULATION ERROR!")
        print(f"   💰 Difference: ${expected_total - incorrect_total:.2f}")
        
        # Possible causes:
        print("\n🔍 Possible causes:")
        print("   1. Total is being set to subtotal instead of calculated total")
        print("   2. Shipping and tax are not being added to the total")
        print("   3. Frontend is displaying wrong values")
        print("   4. Database is storing wrong values")
        
        return False
    else:
        print("   ✅ Calculation is correct!")
        return True

if __name__ == "__main__":
    test_calculation()