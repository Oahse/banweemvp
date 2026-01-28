#!/usr/bin/env python3
"""
Add comprehensive logging to track order total_amount changes
"""

def add_order_creation_logging():
    """Add logging statements to track order total changes"""
    
    logging_code = '''
        # DEBUG: Log order creation values
        logger.info(f"🔍 ORDER CREATION DEBUG for user {user_id}:")
        logger.info(f"   final_total calculation result: {final_total}")
        logger.info(f"   subtotal: ${subtotal:.2f}")
        logger.info(f"   tax_amount: ${tax_amount:.2f}")
        logger.info(f"   shipping_amount: ${shipping_amount:.2f}")
        logger.info(f"   discount_amount: ${discount_amount:.2f}")
        logger.info(f"   total_amount: ${total_amount:.2f}")
        
        # Verify calculation before creating order
        calculated_check = subtotal + shipping_amount + tax_amount - discount_amount
        logger.info(f"   calculated_check: ${calculated_check:.2f}")
        if abs(calculated_check - total_amount) > 0.01:
            logger.error(f"   ❌ CALCULATION MISMATCH BEFORE ORDER CREATION!")
            logger.error(f"      Expected: ${calculated_check:.2f}, Got: ${total_amount:.2f}")
    '''
    
    print("🔧 Logging code to add to order creation:")
    print("=" * 60)
    print("Add this code after line 380 in backend/services/orders.py:")
    print("(After: total_amount = final_total['total_amount'])")
    print()
    print(logging_code)
    
    post_creation_logging = '''
        # DEBUG: Log order after creation but before flush
        logger.info(f"🔍 ORDER AFTER CREATION (before flush):")
        logger.info(f"   order.subtotal: ${order.subtotal:.2f}")
        logger.info(f"   order.tax_amount: ${order.tax_amount:.2f}")
        logger.info(f"   order.shipping_amount: ${order.shipping_amount:.2f}")
        logger.info(f"   order.discount_amount: ${order.discount_amount:.2f}")
        logger.info(f"   order.total_amount: ${order.total_amount:.2f}")
    '''
    
    print("=" * 60)
    print("Add this code after the Order() creation and self.db.add(order):")
    print("(Before: await self.db.flush())")
    print()
    print(post_creation_logging)
    
    post_flush_logging = '''
        # DEBUG: Log order after flush (has ID now)
        logger.info(f"🔍 ORDER AFTER FLUSH (order_id: {order.id}):")
        logger.info(f"   order.subtotal: ${order.subtotal:.2f}")
        logger.info(f"   order.tax_amount: ${order.tax_amount:.2f}")
        logger.info(f"   order.shipping_amount: ${order.shipping_amount:.2f}")
        logger.info(f"   order.discount_amount: ${order.discount_amount:.2f}")
        logger.info(f"   order.total_amount: ${order.total_amount:.2f}")
    '''
    
    print("=" * 60)
    print("Add this code after await self.db.flush():")
    print()
    print(post_flush_logging)
    
    post_payment_logging = '''
        # DEBUG: Log order after payment processing
        logger.info(f"🔍 ORDER AFTER PAYMENT PROCESSING:")
        logger.info(f"   order.subtotal: ${order.subtotal:.2f}")
        logger.info(f"   order.tax_amount: ${order.tax_amount:.2f}")
        logger.info(f"   order.shipping_amount: ${order.shipping_amount:.2f}")
        logger.info(f"   order.discount_amount: ${order.discount_amount:.2f}")
        logger.info(f"   order.total_amount: ${order.total_amount:.2f}")
        logger.info(f"   order.status: {order.status}")
    '''
    
    print("=" * 60)
    print("Add this code after payment processing (after order.status = 'confirmed'):")
    print()
    print(post_payment_logging)
    
    final_logging = '''
        # DEBUG: Log final order state before returning
        await self.db.refresh(order)
        logger.info(f"🔍 FINAL ORDER STATE (after refresh):")
        logger.info(f"   order.subtotal: ${order.subtotal:.2f}")
        logger.info(f"   order.tax_amount: ${order.tax_amount:.2f}")
        logger.info(f"   order.shipping_amount: ${order.shipping_amount:.2f}")
        logger.info(f"   order.discount_amount: ${order.discount_amount:.2f}")
        logger.info(f"   order.total_amount: ${order.total_amount:.2f}")
        logger.info(f"   order.status: {order.status}")
    '''
    
    print("=" * 60)
    print("Add this code at the very end, before return await self._format_order_response(order):")
    print()
    print(final_logging)
    
    print("=" * 60)
    print("🎯 INSTRUCTIONS:")
    print("1. Add these logging statements to backend/services/orders.py")
    print("2. Create a test order through the frontend")
    print("3. Check the logs to see exactly when total_amount changes")
    print("4. Look for any discrepancies between calculated and stored values")

if __name__ == "__main__":
    add_order_creation_logging()