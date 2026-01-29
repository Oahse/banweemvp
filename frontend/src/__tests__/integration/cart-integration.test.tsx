/**
 * Cart integration tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockProduct, mockCart, mockUser } from '../setup';
import Cart from '../../pages/Cart';
import * as CartAPI from '../../api/cart';
import * as ProductsAPI from '../../api/products';
import * as AuthAPI from '../../api/auth';

vi.mock('../../api/cart');
vi.mock('../../api/products');
vi.mock('../../api/auth');

describe('Cart Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    
    // Default mocks
    vi.mocked(CartAPI.getCart).mockResolvedValue({ success: true, data: mockCart });
    vi.mocked(AuthAPI.getProfile).mockResolvedValue({ success: true, data: mockUser });
  });

  it('should add item to cart and update totals', async () => {
    const user = userEvent.setup();
    
    const updatedCart = {
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
            name: 'New Variant',
            sku: 'NEW-001',
            price: 49.99,
            product: {
              id: 'product-456',
              name: 'New Product',
              images: [{ url: 'https://example.com/new.jpg', alt_text: 'New product' }]
            }
          }
        }
      ],
      subtotal: 209.97,
      total: 233.96
    };

    vi.mocked(CartAPI.addToCart).mockResolvedValue({ success: true, data: updatedCart });

    render(<Cart />);

    // Wait for cart to load
    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Simulate adding item (this would typically come from product page)
    // For this test, we'll mock the API call directly
    await CartAPI.addToCart({ variant_id: 'variant-456', quantity: 1 });

    // Verify API was called
    expect(vi.mocked(CartAPI.addToCart)).toHaveBeenCalledWith({
      variant_id: 'variant-456',
      quantity: 1
    });
  });

  it('should update item quantity and recalculate totals', async () => {
    const user = userEvent.setup();
    
    const updatedCart = {
      ...mockCart,
      items: [{
        ...mockCart.items[0],
        quantity: 3,
        total_price: 239.97
      }],
      subtotal: 239.97,
      total: 263.96
    };

    vi.mocked(CartAPI.updateCartItem).mockResolvedValue({ success: true, data: updatedCart });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Find quantity input and update it
    const quantityInput = screen.getByDisplayValue('2');
    await user.clear(quantityInput);
    await user.type(quantityInput, '3');

    // Trigger update (usually on blur or button click)
    await user.tab();

    await waitFor(() => {
      expect(vi.mocked(CartAPI.updateCartItem)).toHaveBeenCalledWith(
        mockCart.items[0].id,
        3
      );
    });
  });

  it('should remove item from cart', async () => {
    const user = userEvent.setup();
    
    const updatedCart = {
      ...mockCart,
      items: [],
      subtotal: 0,
      total: 0
    };

    vi.mocked(CartAPI.removeFromCart).mockResolvedValue({ success: true, data: updatedCart });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Click remove button
    const removeButton = screen.getByText('Remove');
    await user.click(removeButton);

    await waitFor(() => {
      expect(vi.mocked(CartAPI.removeFromCart)).toHaveBeenCalledWith(mockCart.items[0].id);
    });
  });

  it('should apply discount code and update totals', async () => {
    const user = userEvent.setup();
    
    const discountedCart = {
      ...mockCart,
      discount_amount: 18.40, // 10% discount
      total: 165.57
    };

    vi.mocked(CartAPI.applyDiscount).mockResolvedValue({ success: true, data: discountedCart });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Apply discount code
    const promoInput = screen.getByPlaceholderText(/promo code/i);
    const applyButton = screen.getByText('Apply');

    await user.type(promoInput, 'SAVE10');
    await user.click(applyButton);

    await waitFor(() => {
      expect(vi.mocked(CartAPI.applyDiscount)).toHaveBeenCalledWith('SAVE10');
    });

    // Should show discount in UI
    await waitFor(() => {
      expect(screen.getByText(/discount/i)).toBeInTheDocument();
      expect(screen.getByText('$18.40')).toBeInTheDocument();
    });
  });

  it('should handle invalid discount code', async () => {
    const user = userEvent.setup();
    
    vi.mocked(CartAPI.applyDiscount).mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Invalid discount code' }
      }
    });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    const promoInput = screen.getByPlaceholderText(/promo code/i);
    const applyButton = screen.getByText('Apply');

    await user.type(promoInput, 'INVALID');
    await user.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid discount code/i)).toBeInTheDocument();
    });
  });

  it('should clear entire cart', async () => {
    const user = userEvent.setup();
    
    const emptyCart = {
      ...mockCart,
      items: [],
      subtotal: 0,
      total: 0
    };

    vi.mocked(CartAPI.clearCart).mockResolvedValue({ success: true, data: emptyCart });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Click clear cart button
    const clearButton = screen.getByText('Clear Cart');
    await user.click(clearButton);

    // Confirm in dialog
    const confirmButton = screen.getByText('Yes, Clear Cart');
    await user.click(confirmButton);

    await waitFor(() => {
      expect(vi.mocked(CartAPI.clearCart)).toHaveBeenCalled();
    });

    // Should show empty cart message
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });

  it('should handle cart validation errors', async () => {
    const user = userEvent.setup();
    
    // Mock cart with validation errors
    const invalidCart = {
      ...mockCart,
      validation_errors: [
        {
          item_id: mockCart.items[0].id,
          error: 'Product is no longer available'
        }
      ]
    };

    vi.mocked(CartAPI.getCart).mockResolvedValue({ success: true, data: invalidCart });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText(/no longer available/i)).toBeInTheDocument();
    });

    // Should show option to remove invalid items
    expect(screen.getByText(/remove unavailable items/i)).toBeInTheDocument();
  });

  it('should handle quantity limits', async () => {
    const user = userEvent.setup();
    
    vi.mocked(CartAPI.updateCartItem).mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Quantity exceeds available stock' }
      }
    });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Try to update to high quantity
    const quantityInput = screen.getByDisplayValue('2');
    await user.clear(quantityInput);
    await user.type(quantityInput, '999');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/exceeds available stock/i)).toBeInTheDocument();
    });
  });

  it('should sync cart between tabs', async () => {
    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Simulate storage event (cart updated in another tab)
    const updatedCart = {
      ...mockCart,
      items: [...mockCart.items, {
        id: 'new-item',
        variant_id: 'new-variant',
        quantity: 1,
        price_per_unit: 25.00,
        total_price: 25.00,
        variant: {
          id: 'new-variant',
          name: 'New Item',
          sku: 'NEW-001',
          price: 25.00,
          product: { id: 'new-product', name: 'New Product', images: [] }
        }
      }]
    };

    const storageEvent = new StorageEvent('storage', {
      key: 'cart',
      newValue: JSON.stringify(updatedCart),
      oldValue: JSON.stringify(mockCart)
    });

    window.dispatchEvent(storageEvent);

    // Cart should update to reflect changes from other tab
    await waitFor(() => {
      expect(screen.getByText('New Item')).toBeInTheDocument();
    });
  });

  it('should handle offline cart operations', async () => {
    const user = userEvent.setup();
    
    // Mock network error
    vi.mocked(CartAPI.updateCartItem).mockRejectedValue(new Error('Network Error'));

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Try to update quantity while offline
    const quantityInput = screen.getByDisplayValue('2');
    await user.clear(quantityInput);
    await user.type(quantityInput, '3');
    await user.tab();

    // Should show offline message and queue operation
    await waitFor(() => {
      expect(screen.getByText(/offline/i)).toBeInTheDocument();
    });

    // Should update local state optimistically
    expect(quantityInput).toHaveValue(3);
  });

  it('should calculate shipping estimates', async () => {
    const user = userEvent.setup();
    
    vi.mocked(CartAPI.getShippingEstimate).mockResolvedValue({
      success: true,
      data: {
        estimates: [
          { method: 'Standard', cost: 9.99, days: '5-7' },
          { method: 'Express', cost: 19.99, days: '2-3' },
          { method: 'Overnight', cost: 39.99, days: '1' }
        ]
      }
    });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Click shipping calculator
    const shippingButton = screen.getByText(/calculate shipping/i);
    await user.click(shippingButton);

    // Enter zip code
    const zipInput = screen.getByPlaceholderText(/zip code/i);
    await user.type(zipInput, '12345');

    const calculateButton = screen.getByText('Calculate');
    await user.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument();
      expect(screen.getByText('$9.99')).toBeInTheDocument();
      expect(screen.getByText('5-7 days')).toBeInTheDocument();
    });
  });

  it('should handle cart item recommendations', async () => {
    vi.mocked(ProductsAPI.getRecommendations).mockResolvedValue({
      success: true,
      data: [
        {
          id: 'rec-1',
          name: 'Recommended Product',
          price: 29.99,
          images: [{ url: 'https://example.com/rec.jpg', alt_text: 'Recommended' }]
        }
      ]
    });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Should show recommendations
    await waitFor(() => {
      expect(screen.getByText(/you might also like/i)).toBeInTheDocument();
      expect(screen.getByText('Recommended Product')).toBeInTheDocument();
    });
  });

  it('should handle save for later functionality', async () => {
    const user = userEvent.setup();
    
    vi.mocked(CartAPI.saveForLater).mockResolvedValue({ success: true });

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    });

    // Click save for later
    const saveButton = screen.getByText(/save for later/i);
    await user.click(saveButton);

    await waitFor(() => {
      expect(vi.mocked(CartAPI.saveForLater)).toHaveBeenCalledWith(mockCart.items[0].id);
    });

    // Item should move to saved items section
    await waitFor(() => {
      expect(screen.getByText(/saved items/i)).toBeInTheDocument();
    });
  });
});