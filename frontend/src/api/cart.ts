/**
 * Shopping Cart API endpoints
 * 
 * ACCESS LEVELS:
 * - All cart operations require authentication
 * - Cart is linked to user account
 * 
 * CART FLOW:
 * 1. User must be logged in to use cart
 * 2. All cart operations require valid authentication token
 * 3. Cart is automatically created for authenticated users
 */

import { apiClient } from './client';




export class CartAPI {
  /**
   * Get user's cart
   * ACCESS: Authenticated - Requires user login
   */
  static async getCart(country?: string, province?: string) {
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    if (province && province !== 'null' && province !== 'undefined') {
      params.append('province', province);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/cart?${queryString}` : '/cart';
    
    // Token is automatically added by interceptor
    return await apiClient.get(url);
  }

  /**
   * Add item to cart
   * ACCESS: Authenticated - Requires user login
   */
  static async addToCart(item: any, country?: string, province?: string) {
    const _country = country || localStorage.getItem('detected_country') || 'US';
    const _province = province || localStorage.getItem('detected_province');
    
    const params = new URLSearchParams();
    if (_country) params.append('country', _country);
    if (_province && _province !== 'null' && _province !== 'undefined') {
      params.append('province', _province);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/cart/add?${queryString}` : '/cart/add';
    
    // Token is automatically added by interceptor
    return await apiClient.post(url, item);
  }

  /**
   * Update cart item quantity
   * ACCESS: Authenticated - Requires user login
   */
  static async updateCartItem(itemId: string, quantity: number, country?: string, province?: string) {
    const _country = country || localStorage.getItem('detected_country') || 'US';
    const _province = province || localStorage.getItem('detected_province');
    
    const params = new URLSearchParams();
    if (_country) params.append('country', _country);
    if (_province && _province !== 'null' && _province !== 'undefined') {
      params.append('province', _province);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/cart/items/${itemId}?${queryString}` : `/cart/items/${itemId}`;
    
    // Token is automatically added by interceptor
    return await apiClient.put(url, { quantity });
  }

  /**
   * Remove item from cart
   * ACCESS: Authenticated - Requires user login
   */
  static async removeFromCart(itemId: string) {
    // Token is automatically added by interceptor
    return await apiClient.delete(`/cart/items/${itemId}`);
  }

  /**
   * Clear entire cart
   * ACCESS: Authenticated - Requires user login
   */
  static async clearCart() {
    // Token is automatically added by interceptor
    return await apiClient.post('/cart/clear', {});
  }

  /**
   * Apply promo code to cart
   * ACCESS: Authenticated - Requires user login
   */
  static async applyPromocode(code: string) {
    // Token is automatically added by interceptor
    return await apiClient.post('/cart/promocode', { code });
  }

  /**
   * Remove promo code from cart
   * ACCESS: Authenticated - Requires user login
   */
  static async removePromocode() {
    // Token is automatically added by interceptor
    return await apiClient.delete('/cart/promocode');
  }

  /**
   * Check stock availability for a variant
   * ACCESS: Public - No authentication required
   */
  static async checkStock(variantId: string, quantity: number) {
    // Guard against undefined/null variantId
    if (!variantId || variantId === 'undefined' || variantId === 'null') {
      throw new Error('Invalid variant ID provided');
    }
    
    return await apiClient.get(`/inventory/check-stock/${variantId}?quantity=${quantity}`);
  }

  /**
   * Check stock for multiple items at once (for Checkout)
   * ACCESS: Public - No authentication required
   */
  static async checkBulkStock(items: any[]) {
    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid items array provided');
    }
    
    // Validate each item
    const validatedItems = items.map(item => {
      if (!item.variant_id || !item.quantity) {
        throw new Error('Each item must have variant_id and quantity');
      }
      return {
        variant_id: item.variant_id,
        quantity: item.quantity
      };
    });
    
    return await apiClient.post('/inventory/check-stock/bulk', validatedItems);
  }

  /**
   * Get cart item count
   * ACCESS: Authenticated - Requires user login
   */
  static async getCartItemCount() {
    // Token is automatically added by interceptor
    return await apiClient.get('/cart/count');
  }

  static async validateCart(country?: string, province?: string) {
    const _country = country || localStorage.getItem('detected_country') || 'US';
    const _province = province || localStorage.getItem('detected_province');
    
    const params = new URLSearchParams();
    if (_country) params.append('country', _country);
    if (_province && _province !== 'null' && _province !== 'undefined') {
      params.append('province', _province);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/cart/validate?${queryString}` : '/cart/validate';
    
    // Token is automatically added by interceptor
    return await apiClient.post(url, {});
  }

  static async getShippingOptions(address: any) {
    // Token is automatically added by interceptor
    return await apiClient.post('/cart/shipping-options', address);
  }

  static async calculateTotals(data: any) {
    // Token is automatically added by interceptor
    return await apiClient.post('/cart/calculate', data);
  }

  static async saveForLater(itemId: string) {
    // Token is automatically added by interceptor
    return await apiClient.post(`/cart/items/${itemId}/save-for-later`, {});
  }

  static async moveToCart(itemId: string) {
    // Token is automatically added by interceptor
    return await apiClient.post(`/cart/items/${itemId}/move-to-cart`, {});
  }

  static async getSavedItems() {
    // Token is automatically added by interceptor
    return await apiClient.get('/cart/saved-items');
  }

  /**
   * Merge guest cart with user cart after login
   * ACCESS: Authenticated - Requires user login
   * This is called automatically after login to merge any guest cart items
   */
  static async mergeCart() {
    // Token is automatically added by interceptor
    // Backend will read guest_cart_id from cookie and merge automatically
    return await apiClient.post('/cart/merge', {});
  }

  static async getCheckoutSummary() {
    // Token is automatically added by interceptor
    return await apiClient.get('/cart/checkout-summary');
  }
}

export default CartAPI;