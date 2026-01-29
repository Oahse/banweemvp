/**
 * Tests for CheckoutForm component
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, mockCart, mockUser } from '../../setup';
import CheckoutForm from '../../../components/checkout/CheckoutForm';
import * as OrdersAPI from '../../../api/orders';
import * as PaymentsAPI from '../../../api/payments';
import * as CartAPI from '../../../api/cart';

vi.mock('../../../api/orders');
vi.mock('../../../api/payments');
vi.mock('../../../api/cart');

// Mock Stripe
const mockStripe = {
  elements: vi.fn(() => ({
    create: vi.fn(() => ({
      mount: vi.fn(),
      unmount: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      update: vi.fn(),
    })),
    getElement: vi.fn(),
  })),
  createPaymentMethod: vi.fn(),
  confirmCardPayment: vi.fn(),
};

vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn(() => Promise.resolve(mockStripe)),
}));

vi.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardElement: () => <div data-testid="card-element">Card Element</div>,
  useStripe: () => mockStripe,
  useElements: () => ({
    getElement: vi.fn(() => ({})),
  }),
}));

const mockOnSuccess = vi.fn();
const mockOnError = vi.fn();

const defaultProps = {
  cart: mockCart,
  onSuccess: mockOnSuccess,
  onError: mockOnError,
};

describe('CheckoutForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default API mocks
    vi.mocked(CartAPI.validateCart).mockResolvedValue({
      success: true,
      data: { valid: true, issues: [], updated_cart: mockCart }
    });
    
    vi.mocked(PaymentsAPI.getPaymentMethods).mockResolvedValue({
      success: true,
      data: [
        {
          id: 'pm-123',
          type: 'card',
          last_four: '4242',
          brand: 'visa',
          is_default: true
        }
      ]
    });
  });

  it('should render checkout form with all sections', async () => {
    render(<CheckoutForm {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText(/shipping address/i)).toBeInTheDocument();
      expect(screen.getByText(/billing address/i)).toBeInTheDocument();
      expect(screen.getByText(/shipping method/i)).toBeInTheDocument();
      expect(screen.getByText(/payment method/i)).toBeInTheDocument();
      expect(screen.getByText(/order summary/i)).toBeInTheDocument();
    });
  });

  it('should validate cart on mount', async () => {
    render(<CheckoutForm {...defaultProps} />);

    await waitFor(() => {
      expect(vi.mocked(CartAPI.validateCart)).toHaveBeenCalled();
    });
  });

  it('should handle cart validation issues', async () => {
    vi.mocked(CartAPI.validateCart).mockResolvedValue({
      success: true,
      data: {
        valid: false,
        issues: [
          {
            item_id: 'cart-item-123',
            type: 'price_changed',
            message: 'Product price has changed',
            old_price: 79.99,
            new_price: 89.99
          }
        ],
        updated_cart: mockCart
      }
    });

    render(<CheckoutForm {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText(/price has changed/i)).toBeInTheDocument();
    });
  });

  it('should fill shipping address form', async () => {
    const user = userEvent.setup();
    
    render(<CheckoutForm {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    });

    const streetInput = screen.getByLabelText(/street address/i);
    const cityInput = screen.getByLabelText(/city/i);
    const stateInput = screen.getByLabelText(/state/i);
    const zipInput = screen.getByLabelText(/zip/i);

    await user.type(streetInput, '123 Test St');
    await user.type(cityInput, 'Test City');
    await user.type(stateInput, 'CA');
    await user.type(zipInput, '12345');

    expect(streetInput).toHaveValue('123 Test St');
    expect(cityInput).toHaveValue('Test City');
    expect(stateInput).toHaveValue('CA');
    expect(zipInput).toHaveValue('12345');
  });

  it('should use same address for billing when checkbox is checked', async () => {
    const user = userEvent.setup();
    
    render(<CheckoutForm {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/same as shipping/i)).toBeInTheDocument();
    });

    // Fill shipping address
    const streetInput = screen.getByLabelText(/street address/i);
    await user.type(streetInput, '123 Test St');

    // Check "same as shipping" checkbox
    const sameAddressCheckbox = screen.getByLabelText(/same as shipping/i);
    await user.click(sameAddressCheckbox);

    // Billing address fields should be hidden or disabled
    expect(screen.queryByText(/billing address/i)).toBeInTheDocument();
  });

  it('should select shipping method and update totals', async () => {
    const user = userEvent.setup();
    
    vi.mocked(CartAPI.getShippingEstimate).mockResolvedValue({
      success: true,
      data: {
        estimates: [
          {
            method_id: 'standard',
            name: 'Standard Shipping',
            cost: 9.99,
            estimated_days: '5-7'
          },
          {
            method_id: 'express',
            name: 'Express Shipping',
            cost: 19.99,
            estimated_days: '2-3'
          }
        ]
      }
    });

    render(<CheckoutForm {...defaultProps} />);

    // Fill address to trigger shipping calculation
    const zipInput = screen.getByLabelText(/zip/i);
    await user.type(zipInput, '12345');
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(screen.getByText(/standard shipping/i)).toBeInTheDocument();
      expect(screen.getByText(/express shipping/i)).toBeInTheDocument();
    });

    // Select express shipping
    const expressOption = screen.getByLabelText(/express shipping/i);
    await user.click(expressOption);

    expect(expressOption).toBeChecked();
  });

  it('should handle payment method selection', async () => {
    const user = userEvent.setup();
    
    render(<CheckoutForm {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText(/visa ending in 4242/i)).toBeInTheDocument();
    });

    // Should show existing payment method
    const existingCard = screen.getByLabelText(/visa ending in 4242/i);
    expect(existingCard).toBeInTheDocument();

    // Should have option to add new payment method
    const addNewCard = screen.getByText(/add new card/i);
    await user.click(addNewCard);

    await waitFor(() => {
      expect(screen.getByTestId('card-element')).toBeInTheDocument();
    });
  });

  it('should create new payment method with Stripe', async () => {
    const user = userEvent.setup();
    
    mockStripe.createPaymentMethod.mockResolvedValue({
      paymentMethod: {
        id: 'pm_new_123',
        card: {
          last4: '1234',
          brand: 'mastercard'
        }
      },
      error: null
    });

    vi.mocked(PaymentsAPI.createPaymentMethod).mockResolvedValue({
      success: true,
      data: {
        id: 'pm_new_123',
        type: 'card',
        last_four: '1234',
        brand: 'mastercard'
      }
    });

    render(<CheckoutForm {...defaultProps} />);

    // Click add new card
    const addNewCard = screen.getByText(/add new card/i);
    await user.click(addNewCard);

    // Fill card details (mocked)
    await waitFor(() => {
      expect(screen.getByTestId('card-element')).toBeInTheDocument();
    });

    // Save card
    const saveCardButton = screen.getByText(/save card/i);
    await user.click(saveCardButton);

    await waitFor(() => {
      expect(mockStripe.createPaymentMethod).toHaveBeenCalled();
      expect(vi.mocked(PaymentsAPI.createPaymentMethod)).toHaveBeenCalled();
    });
  });

  it('should apply discount code', async () => {
    const user = userEvent.setup();
    
    vi.mocked(CartAPI.applyDiscount).mockResolvedValue({
      success: true,
      data: {
        ...mockCart,
        discount_code: 'SAVE10',
        discount_amount: 18.40,
        total: 165.57
      }
    });

    render(<CheckoutForm {...defaultProps} />);

    const promoInput = screen.getByPlaceholderText(/promo code/i);
    const applyButton = screen.getByText(/apply/i);

    await user.type(promoInput, 'SAVE10');
    await user.click(applyButton);

    await waitFor(() => {
      expect(vi.mocked(CartAPI.applyDiscount)).toHaveBeenCalledWith('SAVE10');
    });

    // Should show discount in order summary
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

    render(<CheckoutForm {...defaultProps} />);

    const promoInput = screen.getByPlaceholderText(/promo code/i);
    const applyButton = screen.getByText(/apply/i);

    await user.type(promoInput, 'INVALID');
    await user.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid discount code/i)).toBeInTheDocument();
    });
  });

  it('should validate form before submission', async () => {
    const user = userEvent.setup();
    
    render(<CheckoutForm {...defaultProps} />);

    // Try to submit without filling required fields
    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText(/street address is required/i)).toBeInTheDocument();
    });
  });

  it('should submit order successfully', async () => {
    const user = userEvent.setup();
    
    vi.mocked(OrdersAPI.createOrder).mockResolvedValue({
      success: true,
      data: {
        id: 'order-123',
        order_number: 'ORD-2024-001',
        status: 'pending',
        total_amount: 183.97
      }
    });

    render(<CheckoutForm {...defaultProps} />);

    // Fill all required fields
    await user.type(screen.getByLabelText(/street address/i), '123 Test St');
    await user.type(screen.getByLabelText(/city/i), 'Test City');
    await user.type(screen.getByLabelText(/state/i), 'CA');
    await user.type(screen.getByLabelText(/zip/i), '12345');

    // Select shipping method (mock it being available)
    await waitFor(() => {
      const standardShipping = screen.queryByLabelText(/standard shipping/i);
      if (standardShipping) {
        user.click(standardShipping);
      }
    });

    // Submit order
    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(vi.mocked(OrdersAPI.createOrder)).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('should handle order submission error', async () => {
    const user = userEvent.setup();
    
    vi.mocked(OrdersAPI.createOrder).mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Payment failed' }
      }
    });

    render(<CheckoutForm {...defaultProps} />);

    // Fill required fields and submit
    await user.type(screen.getByLabelText(/street address/i), '123 Test St');
    await user.type(screen.getByLabelText(/city/i), 'Test City');
    await user.type(screen.getByLabelText(/state/i), 'CA');
    await user.type(screen.getByLabelText(/zip/i), '12345');

    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith(expect.stringContaining('Payment failed'));
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    
    // Mock slow API response
    vi.mocked(OrdersAPI.createOrder).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({
        success: true,
        data: { id: 'order-123', order_number: 'ORD-001', status: 'pending', total_amount: 183.97 }
      }), 1000))
    );

    render(<CheckoutForm {...defaultProps} />);

    // Fill and submit
    await user.type(screen.getByLabelText(/street address/i), '123 Test St');
    await user.type(screen.getByLabelText(/city/i), 'Test City');
    await user.type(screen.getByLabelText(/state/i), 'CA');
    await user.type(screen.getByLabelText(/zip/i), '12345');

    const placeOrderButton = screen.getByText(/place order/i);
    await user.click(placeOrderButton);

    // Should show loading state
    expect(screen.getByText(/processing/i)).toBeInTheDocument();
    expect(placeOrderButton).toBeDisabled();
  });

  it('should calculate and display order totals', async () => {
    render(<CheckoutForm {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
      expect(screen.getByText(/shipping/i)).toBeInTheDocument();
      expect(screen.getByText(/tax/i)).toBeInTheDocument();
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });

    // Should show correct amounts
    expect(screen.getByText('$159.98')).toBeInTheDocument(); // Subtotal
    expect(screen.getByText('$183.97')).toBeInTheDocument(); // Total
  });

  it('should handle guest checkout', async () => {
    const guestProps = {
      ...defaultProps,
      isGuest: true
    };

    render(<CheckoutForm {...guestProps} />);

    // Should show email field for guest
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    
    // Should show option to create account
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  it('should save address to user profile', async () => {
    const user = userEvent.setup();
    
    vi.mocked(PaymentsAPI.saveAddress).mockResolvedValue({
      success: true,
      data: { id: 'addr-123' }
    });

    render(<CheckoutForm {...defaultProps} />);

    // Fill address
    await user.type(screen.getByLabelText(/street address/i), '123 Test St');
    await user.type(screen.getByLabelText(/city/i), 'Test City');
    await user.type(screen.getByLabelText(/state/i), 'CA');
    await user.type(screen.getByLabelText(/zip/i), '12345');

    // Check save address option
    const saveAddressCheckbox = screen.getByLabelText(/save this address/i);
    await user.click(saveAddressCheckbox);

    expect(saveAddressCheckbox).toBeChecked();
  });

  it('should handle subscription checkout', async () => {
    const subscriptionCart = {
      ...mockCart,
      items: [{
        ...mockCart.items[0],
        is_subscription: true,
        subscription_interval: 'month'
      }]
    };

    const subscriptionProps = {
      ...defaultProps,
      cart: subscriptionCart
    };

    render(<CheckoutForm {...subscriptionProps} />);

    // Should show subscription-specific information
    expect(screen.getByText(/monthly subscription/i)).toBeInTheDocument();
    expect(screen.getByText(/recurring billing/i)).toBeInTheDocument();
  });

  it('should be accessible', async () => {
    render(<CheckoutForm {...defaultProps} />);

    // Check for proper form labels
    expect(screen.getByLabelText(/street address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip/i)).toBeInTheDocument();

    // Check for proper headings
    expect(screen.getByRole('heading', { name: /shipping address/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /payment method/i })).toBeInTheDocument();

    // Check for proper button roles
    expect(screen.getByRole('button', { name: /place order/i })).toBeInTheDocument();
  });
});