/**
 * Tests for Cart API
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartAPI from '../../api/cart';
import { apiClient } from '../../api/client';
import { mockApiResponses, mockCart } from '../setup';

vi.mock('../../api/client');

describe('CartAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCart', () => {
    it('should fetch user cart', async () => {
      const mockResponse = mockApiResponses.cart.get;
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.getCart();

      expect(apiClient.get).toHaveBeenCalledWith('/cart');
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty cart', async () => {
      const emptyCartResponse = {
        success: true,
        data: {
          id: 'cart-123',
          items: [],
          subtotal: 0,
          total: 0,
          currency: 'USD'
        }
      };
      vi.mocked(apiClient.get).mockResolvedValue({ data: emptyCartResponse });

      const result = await CartAPI.getCart();

      expect(result.data.items).toEqual([]);
      expect(result.data.total).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      const mockResponse = mockApiResponses.cart.add;
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const itemData = {
        variant_id: 'variant-123',
        quantity: 2
      };

      const result = await CartAPI.addToCart(itemData);

      expect(apiClient.post).toHaveBeenCalledWith('/cart/items', itemData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle adding item with custom options', async () => {
      const mockResponse = mockApiResponses.cart.add;
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const itemData = {
        variant_id: 'variant-123',
        quantity: 1,
        customizations: {
          color: 'red',
          size: 'large'
        },
        gift_message: 'Happy Birthday!'
      };

      const result = await CartAPI.addToCart(itemData);

      expect(apiClient.post).toHaveBeenCalledWith('/cart/items', itemData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle insufficient stock error', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Insufficient stock available' }
        }
      };
      vi.mocked(apiClient.post).mockRejectedValue(errorResponse);

      const itemData = {
        variant_id: 'variant-123',
        quantity: 999
      };

      await expect(CartAPI.addToCart(itemData)).rejects.toThrow();
    });
  });

  describe('updateCartItem', () => {
    it('should update cart item quantity', async () => {
      const updatedCart = {
        ...mockCart,
        items: [{
          ...mockCart.items[0],
          quantity: 3,
          total_price: 239.97
        }]
      };
      const mockResponse = { success: true, data: updatedCart };
      vi.mocked(apiClient.put).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.updateCartItem('cart-item-123', 3);

      expect(apiClient.put).toHaveBeenCalledWith('/cart/items/cart-item-123', {
        quantity: 3
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle quantity validation errors', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Quantity must be greater than 0' }
        }
      };
      vi.mocked(apiClient.put).mockRejectedValue(errorResponse);

      await expect(CartAPI.updateCartItem('cart-item-123', 0)).rejects.toThrow();
    });

    it('should handle item not found error', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: { message: 'Cart item not found' }
        }
      };
      vi.mocked(apiClient.put).mockRejectedValue(errorResponse);

      await expect(CartAPI.updateCartItem('nonexistent', 2)).rejects.toThrow();
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', async () => {
      const updatedCart = {
        ...mockCart,
        items: [],
        subtotal: 0,
        total: 0
      };
      const mockResponse = { success: true, data: updatedCart };
      vi.mocked(apiClient.delete).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.removeFromCart('cart-item-123');

      expect(apiClient.delete).toHaveBeenCalledWith('/cart/items/cart-item-123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle removing non-existent item', async () => {
      const errorResponse = {
        response: {
          status: 404,
          data: { message: 'Cart item not found' }
        }
      };
      vi.mocked(apiClient.delete).mockRejectedValue(errorResponse);

      await expect(CartAPI.removeFromCart('nonexistent')).rejects.toThrow();
    });
  });

  describe('clearCart', () => {
    it('should clear entire cart', async () => {
      const emptyCart = {
        id: 'cart-123',
        items: [],
        subtotal: 0,
        total: 0,
        currency: 'USD'
      };
      const mockResponse = { success: true, data: emptyCart };
      vi.mocked(apiClient.delete).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.clearCart();

      expect(apiClient.delete).toHaveBeenCalledWith('/cart');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('applyDiscount', () => {
    it('should apply valid discount code', async () => {
      const discountedCart = {
        ...mockCart,
        discount_code: 'SAVE10',
        discount_amount: 18.40,
        total: 165.57
      };
      const mockResponse = { success: true, data: discountedCart };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.applyDiscount('SAVE10');

      expect(apiClient.post).toHaveBeenCalledWith('/cart/apply-discount', {
        code: 'SAVE10'
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle invalid discount code', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Invalid or expired discount code' }
        }
      };
      vi.mocked(apiClient.post).mockRejectedValue(errorResponse);

      await expect(CartAPI.applyDiscount('INVALID')).rejects.toThrow();
    });

    it('should handle discount code with minimum order requirement', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Minimum order amount of $100 required for this discount' }
        }
      };
      vi.mocked(apiClient.post).mockRejectedValue(errorResponse);

      await expect(CartAPI.applyDiscount('BIGORDER')).rejects.toThrow();
    });
  });

  describe('removeDiscount', () => {
    it('should remove applied discount', async () => {
      const cartWithoutDiscount = {
        ...mockCart,
        discount_code: null,
        discount_amount: 0,
        total: 183.97
      };
      const mockResponse = { success: true, data: cartWithoutDiscount };
      vi.mocked(apiClient.delete).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.removeDiscount();

      expect(apiClient.delete).toHaveBeenCalledWith('/cart/discount');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('validateCart', () => {
    it('should validate cart items', async () => {
      const validationResult = {
        valid: true,
        issues: [],
        updated_cart: mockCart
      };
      const mockResponse = { success: true, data: validationResult };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.validateCart();

      expect(apiClient.post).toHaveBeenCalledWith('/cart/validate');
      expect(result).toEqual(mockResponse);
    });

    it('should handle cart validation issues', async () => {
      const validationResult = {
        valid: false,
        issues: [
          {
            item_id: 'cart-item-123',
            type: 'price_changed',
            message: 'Product price has changed',
            old_price: 79.99,
            new_price: 89.99
          },
          {
            item_id: 'cart-item-456',
            type: 'out_of_stock',
            message: 'Product is no longer available'
          }
        ],
        updated_cart: mockCart
      };
      const mockResponse = { success: true, data: validationResult };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.validateCart();

      expect(result.data.valid).toBe(false);
      expect(result.data.issues).toHaveLength(2);
    });
  });

  describe('getShippingEstimate', () => {
    it('should get shipping estimates', async () => {
      const shippingEstimates = {
        estimates: [
          {
            method_id: 'standard',
            name: 'Standard Shipping',
            cost: 9.99,
            estimated_days: '5-7',
            description: '5-7 business days'
          },
          {
            method_id: 'express',
            name: 'Express Shipping',
            cost: 19.99,
            estimated_days: '2-3',
            description: '2-3 business days'
          }
        ]
      };
      const mockResponse = { success: true, data: shippingEstimates };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.getShippingEstimate('12345');

      expect(apiClient.post).toHaveBeenCalledWith('/cart/shipping-estimate', {
        zip_code: '12345'
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle invalid zip code', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Invalid zip code format' }
        }
      };
      vi.mocked(apiClient.post).mockRejectedValue(errorResponse);

      await expect(CartAPI.getShippingEstimate('invalid')).rejects.toThrow();
    });
  });

  describe('saveForLater', () => {
    it('should save cart item for later', async () => {
      const mockResponse = { success: true, message: 'Item saved for later' };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.saveForLater('cart-item-123');

      expect(apiClient.post).toHaveBeenCalledWith('/cart/items/cart-item-123/save-for-later');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('moveToCart', () => {
    it('should move saved item back to cart', async () => {
      const mockResponse = { success: true, data: mockCart };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.moveToCart('saved-item-123');

      expect(apiClient.post).toHaveBeenCalledWith('/cart/saved-items/saved-item-123/move-to-cart');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSavedItems', () => {
    it('should get saved for later items', async () => {
      const savedItems = [
        {
          id: 'saved-item-123',
          variant_id: 'variant-123',
          quantity: 1,
          saved_at: '2024-01-01T00:00:00Z',
          variant: mockCart.items[0].variant
        }
      ];
      const mockResponse = { success: true, data: savedItems };
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.getSavedItems();

      expect(apiClient.get).toHaveBeenCalledWith('/cart/saved-items');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('mergeCarts', () => {
    it('should merge guest cart with user cart', async () => {
      const guestCartItems = [
        {
          variant_id: 'variant-456',
          quantity: 1
        }
      ];
      const mergedCart = {
        ...mockCart,
        items: [
          ...mockCart.items,
          {
            id: 'cart-item-456',
            variant_id: 'variant-456',
            quantity: 1,
            price_per_unit: 49.99,
            total_price: 49.99,
            variant: {
              id: 'variant-456',
              name: 'Guest Item',
              sku: 'GUEST-001',
              price: 49.99,
              product: {
                id: 'product-456',
                name: 'Guest Product',
                images: []
              }
            }
          }
        ]
      };
      const mockResponse = { success: true, data: mergedCart };
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.mergeCarts(guestCartItems);

      expect(apiClient.post).toHaveBeenCalledWith('/cart/merge', {
        guest_items: guestCartItems
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCartSummary', () => {
    it('should get cart summary with totals', async () => {
      const cartSummary = {
        item_count: 2,
        subtotal: 159.98,
        tax_amount: 14.00,
        shipping_cost: 9.99,
        discount_amount: 0,
        total: 183.97,
        currency: 'USD'
      };
      const mockResponse = { success: true, data: cartSummary };
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.getCartSummary();

      expect(apiClient.get).toHaveBeenCalledWith('/cart/summary');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      vi.mocked(apiClient.get).mockRejectedValue(networkError);

      await expect(CartAPI.getCart()).rejects.toThrow('Network Error');
    });

    it('should handle server errors', async () => {
      const serverError = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' }
        }
      };
      vi.mocked(apiClient.get).mockRejectedValue(serverError);

      await expect(CartAPI.getCart()).rejects.toThrow();
    });

    it('should handle timeout errors', async () => {
      const timeoutError = {
        code: 'ECONNABORTED',
        message: 'timeout of 5000ms exceeded'
      };
      vi.mocked(apiClient.get).mockRejectedValue(timeoutError);

      await expect(CartAPI.getCart()).rejects.toThrow();
    });
  });

  describe('guest cart operations', () => {
    it('should handle guest cart with session ID', async () => {
      const guestCart = {
        id: 'guest-cart-123',
        session_id: 'session-456',
        items: mockCart.items,
        subtotal: mockCart.subtotal,
        total: mockCart.total,
        currency: 'USD'
      };
      const mockResponse = { success: true, data: guestCart };
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.getCart('session-456');

      expect(apiClient.get).toHaveBeenCalledWith('/cart', {
        params: { session_id: 'session-456' }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should add item to guest cart', async () => {
      const mockResponse = mockApiResponses.cart.add;
      vi.mocked(apiClient.post).mockResolvedValue({ data: mockResponse });

      const itemData = {
        variant_id: 'variant-123',
        quantity: 1
      };

      const result = await CartAPI.addToCart(itemData, 'session-456');

      expect(apiClient.post).toHaveBeenCalledWith('/cart/items', {
        ...itemData,
        session_id: 'session-456'
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('cart persistence', () => {
    it('should handle cart persistence across sessions', async () => {
      const persistentCart = {
        ...mockCart,
        expires_at: '2024-12-31T23:59:59Z'
      };
      const mockResponse = { success: true, data: persistentCart };
      vi.mocked(apiClient.get).mockResolvedValue({ data: mockResponse });

      const result = await CartAPI.getCart();

      expect(result.data.expires_at).toBeDefined();
    });
  });
});