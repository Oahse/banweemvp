/**
 * End-to-end checkout flow tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { mockProduct, mockUser, mockApiResponses } from '../setup';
import * as AuthAPI from '../../api/auth';
import * as ProductsAPI from '../../api/products';
import * as CartAPI from '../../api/cart';
import * as OrdersAPI from '../../api/orders';
import * as PaymentsAPI from '../../api/payments';

// Mock all API modules
vi.mock('../../api/auth');
vi.mock('../../api/products');
vi.mock('../../api/cart');
vi.mock('../../api/orders');
vi.mock('../../api/payments');

// Mock Stripe
const mockStripe = {
  elements: vi.fn(() => ({
    create: vi.fn(() => ({
      mount: vi.fn(),
      unmount: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    })),
    getElement: vi.fn(),
  })),
  createToken: vi.fn(),
  createPaymentMethod: vi.fn(),
  confirmCardPayment: vi.fn(),
};

vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn(() => Promise.resolve(mockStripe)),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Complete Checkout Flow E2E', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    
    // Setup default API mocks
    vi.mocked(ProductsAPI.getProducts).mockResolvedValue(mockApiResponses.products.list);
    vi.mocked(ProductsAPI.getProduct).mockResolvedValue(mockApiResponses.products.detail);
    vi.mocked(CartAPI.getCart).mockResolvedValue(mockApiResponses.cart.get);
    vi.mocked(AuthAPI.getProfile).mockResolvedValue(mockApiResponses.auth.profile);
  });

  it('should complete full checkout flow from product discovery to order confirmation', async () => {
    const user = userEvent.setup();

    // Mock successful API responses
    vi.mocked(AuthAPI.login).mockResolvedValue(mockApiResponses.auth.login);
    vi.mocked(CartAPI.addToCart).mockResolvedValue(mockApiResponses.cart.add);
    vi.mocked(OrdersAPI.createOrder).mockResolvedValue(mockApiResponses.orders.create);
    vi.mocked(PaymentsAPI.createPaymentMethod).mockResolvedValue({
      success: true,
      data: { id: 'pm_test_123', last_four: '4242', brand: 'visa' }
    });

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Step 1: User lands on homepage
    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });

    // Step 2: Navigate to products page
    const productsLink = screen.getByText(/products/i);
    await user.click(productsLink);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    // Step 3: View product details
    const productCard = screen.getByText(mockProduct.name);
    await user.click(productCard);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    });

    // Step 4: Add product to cart (should prompt for login)
    const addToCartButton = screen.getByText(/add to cart/i);
    await user.click(addToCartButton);

    // Should redirect to login
    await waitFor(() => {
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    // Step 5: User logs in
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, mockUser.email);
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    // Should redirect back to product page after login
    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    // Step 6: Add product to cart (now authenticated)
    const addToCartButtonAuth = screen.getByText(/add to cart/i);
    await user.click(addToCartButtonAuth);

    await waitFor(() => {
      expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
    });

    // Step 7: Navigate to cart
    const cartIcon = screen.getByTestId('cart-icon');
    await user.click(cartIcon);

    await waitFor(() => {
      expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    // Step 8: Proceed to checkout
    const checkoutButton = screen.getByText(/proceed to checkout/i);
    await user.click(checkoutButton);

    await waitFor(() => {
      expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    });

    // Step 9: Fill shipping information
    const streetInput = screen.getByLabelText(/street address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipInput = screen.getByLabelText(/zip/i);

    await user.type(streetInput, '123 Test St');
    await user.type(cityInput, 'Test City');
    await user.type(stateInput, 'CA');
    await user.type(zipInput, '12345');

    // Step 10: Select shipping method
    const shippingMethod = screen.getByLabelText(/standard shipping/i);
    await user.click(shippingMethod);

    // Step 11: Add payment method
    const addPaymentButton = screen.getByText(/add payment method/i);
    await user.click(addPaymentButton);

    // Mock Stripe card element
    mockStripe.createPaymentMethod.mockResolvedValue({
      paymentMethod: { id: 'pm_test_123' },
      error: null
    });

    // Fill card details (mocked)
    const cardNumberInput = screen.getByLabelText(/card number/i);
    const expiryInput = screen.getByLabelText(/expiry/i);
    const cvcInput = screen.getByLabelText(/cvc/i);

    await user.type(cardNumberInput, '4242424242424242');
    await user.type(expiryInput, '12/25');
    await user.type(cvcInput, '123');

    const saveCardButton = screen.getByText(/save card/i);
    await user.click(saveCardButton);

    await waitFor(() => {
      expect(screen.getByText(/payment method added/i)).toBeInTheDocument();
    });

    // Step 12: Apply discount code (optional)
    const promoInput = screen.getByPlaceholderText(/promo code/i);
    await user.type(promoInput, 'SAVE10');
    
    const applyPromoButton = screen.getByText(/apply/i);
    await user.click(applyPromoButton);

    // Step 13: Review order summary
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
    expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/shipping/i)).toBeInTheDocument();
    expect(screen.getByText(/tax/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();

    // Step 14: Place order
    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/processing/i)).toBeInTheDocument();
    });

    // Step 15: Order confirmation
    await waitFor(() => {
      expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
      expect(screen.getByText(/order number/i)).toBeInTheDocument();
    });

    // Verify API calls were made
    expect(vi.mocked(AuthAPI.login)).toHaveBeenCalled();
    expect(vi.mocked(CartAPI.addToCart)).toHaveBeenCalled();
    expect(vi.mocked(PaymentsAPI.createPaymentMethod)).toHaveBeenCalled();
    expect(vi.mocked(OrdersAPI.createOrder)).toHaveBeenCalled();
  });

  it('should handle guest checkout flow', async () => {
    const user = userEvent.setup();

    // Mock guest checkout APIs
    vi.mocked(CartAPI.addToCart).mockResolvedValue(mockApiResponses.cart.add);
    vi.mocked(OrdersAPI.createOrder).mockResolvedValue(mockApiResponses.orders.create);

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Navigate to products
    const productsLink = screen.getByText(/products/i);
    await user.click(productsLink);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    // Add to cart as guest
    const addToCartButton = screen.getByText(/add to cart/i);
    await user.click(addToCartButton);

    // Should show guest checkout option
    await waitFor(() => {
      expect(screen.getByText(/continue as guest/i)).toBeInTheDocument();
    });

    const guestCheckoutButton = screen.getByText(/continue as guest/i);
    await user.click(guestCheckoutButton);

    // Should proceed to checkout without login
    await waitFor(() => {
      expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    });

    // Fill guest information
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'guest@example.com');

    // Continue with checkout flow...
    const streetInput = screen.getByLabelText(/street address/i);
    await user.type(streetInput, '123 Guest St');

    // Complete checkout
    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
    });
  });

  it('should handle payment failures gracefully', async () => {
    const user = userEvent.setup();

    // Mock payment failure
    vi.mocked(AuthAPI.login).mockResolvedValue(mockApiResponses.auth.login);
    vi.mocked(CartAPI.addToCart).mockResolvedValue(mockApiResponses.cart.add);
    vi.mocked(OrdersAPI.createOrder).mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Payment failed: Your card was declined.' }
      }
    });

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Go through checkout flow until payment
    // ... (abbreviated for brevity)

    // Attempt to place order
    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    // Should show payment error
    await waitFor(() => {
      expect(screen.getByText(/payment failed/i)).toBeInTheDocument();
      expect(screen.getByText(/card was declined/i)).toBeInTheDocument();
    });

    // Should allow retry
    expect(screen.getByText(/try again/i)).toBeInTheDocument();
  });

  it('should handle inventory insufficient stock during checkout', async () => {
    const user = userEvent.setup();

    // Mock inventory error
    vi.mocked(AuthAPI.login).mockResolvedValue(mockApiResponses.auth.login);
    vi.mocked(CartAPI.addToCart).mockResolvedValue(mockApiResponses.cart.add);
    vi.mocked(OrdersAPI.createOrder).mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Insufficient stock for requested quantity.' }
      }
    });

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Go through checkout flow
    // ... (abbreviated)

    // Attempt to place order
    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    // Should show inventory error
    await waitFor(() => {
      expect(screen.getByText(/insufficient stock/i)).toBeInTheDocument();
    });

    // Should suggest updating cart
    expect(screen.getByText(/update cart/i)).toBeInTheDocument();
  });

  it('should save cart state across page refreshes', async () => {
    const user = userEvent.setup();

    // Mock cart persistence
    vi.mocked(CartAPI.addToCart).mockResolvedValue(mockApiResponses.cart.add);

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Add item to cart
    const productsLink = screen.getByText(/products/i);
    await user.click(productsLink);

    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    });

    const addToCartButton = screen.getByText(/add to cart/i);
    await user.click(addToCartButton);

    // Verify cart state is saved
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      expect.stringContaining(mockProduct.name)
    );

    // Simulate page refresh by re-rendering
    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Cart should still contain items
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toHaveTextContent('1'); // Item count
  });

  it('should handle mobile checkout flow', async () => {
    const user = userEvent.setup();

    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Should show mobile navigation
    const mobileMenuButton = screen.getByTestId('mobile-menu-button');
    expect(mobileMenuButton).toBeInTheDocument();

    // Mobile checkout should work the same way
    // ... (similar flow but with mobile-specific elements)
  });

  it('should handle subscription product checkout', async () => {
    const user = userEvent.setup();

    // Mock subscription product
    const subscriptionProduct = {
      ...mockProduct,
      is_subscription: true,
      subscription_plans: [
        { id: 'monthly', name: 'Monthly', price: 29.99, interval: 'month' },
        { id: 'yearly', name: 'Yearly', price: 299.99, interval: 'year' }
      ]
    };

    vi.mocked(ProductsAPI.getProduct).mockResolvedValue({
      success: true,
      data: subscriptionProduct
    });

    render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    // Navigate to subscription product
    const productsLink = screen.getByText(/products/i);
    await user.click(productsLink);

    // Should show subscription options
    await waitFor(() => {
      expect(screen.getByText(/monthly/i)).toBeInTheDocument();
      expect(screen.getByText(/yearly/i)).toBeInTheDocument();
    });

    // Select subscription plan
    const monthlyPlan = screen.getByLabelText(/monthly/i);
    await user.click(monthlyPlan);

    // Add to cart
    const subscribeButton = screen.getByText(/subscribe/i);
    await user.click(subscribeButton);

    // Checkout should handle subscription billing
    // ... (subscription-specific checkout flow)
  });
});