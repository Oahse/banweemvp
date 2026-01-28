#!/usr/bin/env python3
"""
Debug order calculation by tracing through the actual calculation logic
"""

def debug_calculation():
    """Debug the order calculation step by step"""
    
    print("🔍 Debugging Order Calculation Logic")
    print("=" * 50)
    
    # Simulate the calculation from _calculate_final_order_total
    print("\n1. Calculate subtotal from validated items:")
    validated_items = [
        {"backend_total": 29.99},  # Item 1
        {"backend_total": 49.07},  # Item 2
    ]
    subtotal = sum(item["backend_total"] for item in validated_items)
    print(f"   Subtotal: ${subtotal:.2f}")
    
    print("\n2. Calculate shipping cost:")
    shipping_cost = 4.99  # From shipping service
    print(f"   Shipping: ${shipping_cost:.2f}")
    
    print("\n3. Calculate tax:")
    tax_rate = 0.15  # 15% tax rate
    taxable_amount = subtotal + shipping_cost  # Tax applies to subtotal + shipping
    tax_amount = taxable_amount * tax_rate
    print(f"   Tax rate: {tax_rate * 100:.1f}%")
    print(f"   Taxable amount: ${taxable_amount:.2f}")
    print(f"   Tax amount: ${tax_amount:.2f}")
    
    print("\n4. Calculate discount:")
    discount_amount = 0.0  # No discount
    print(f"   Discount: ${discount_amount:.2f}")
    
    print("\n5. Calculate final total:")
    total_amount = subtotal + shipping_cost + tax_amount - discount_amount
    print(f"   Total: ${subtotal:.2f} + ${shipping_cost:.2f} + ${tax_amount:.2f} - ${discount_amount:.2f}")
    print(f"   Total: ${total_amount:.2f}")
    
    print("\n6. Return values from _calculate_final_order_total:")
    final_total = {
        "subtotal": subtotal,
        "shipping_cost": shipping_cost,
        "tax_amount": tax_amount,
        "tax_rate": tax_rate,
        "discount_amount": discount_amount,
        "total_amount": total_amount
    }
    
    for key, value in final_total.items():
        if key == "tax_rate":
            print(f"   {key}: {value * 100:.1f}%")
        else:
            print(f"   {key}: ${value:.2f}")
    
    print("\n7. Order creation values:")
    order_subtotal = final_total["subtotal"]
    order_tax_amount = final_total["tax_amount"]
    order_shipping_amount = final_total["shipping_cost"]
    order_discount_amount = final_total["discount_amount"]
    order_total_amount = final_total["total_amount"]
    
    print(f"   order.subtotal = ${order_subtotal:.2f}")
    print(f"   order.tax_amount = ${order_tax_amount:.2f}")
    print(f"   order.shipping_amount = ${order_shipping_amount:.2f}")
    print(f"   order.discount_amount = ${order_discount_amount:.2f}")
    print(f"   order.total_amount = ${order_total_amount:.2f}")
    
    print("\n8. Verification:")
    calculated_total = order_subtotal + order_shipping_amount + order_tax_amount - order_discount_amount
    print(f"   Calculated total: ${calculated_total:.2f}")
    print(f"   Order total:      ${order_total_amount:.2f}")
    
    if abs(calculated_total - order_total_amount) < 0.01:
        print("   ✅ Order creation values are correct!")
    else:
        print("   ❌ Order creation values are incorrect!")
        print(f"   💰 Difference: ${calculated_total - order_total_amount:.2f}")
    
    print("\n" + "=" * 50)
    print("🎯 CONCLUSION:")
    print("   If the calculation logic is correct but the issue persists,")
    print("   the problem might be:")
    print("   1. Order is being updated after creation")
    print("   2. Frontend is displaying cached/wrong data")
    print("   3. Database constraint or trigger is modifying the value")
    print("   4. There's a race condition in the order creation process")

if __name__ == "__main__":
    debug_calculation()