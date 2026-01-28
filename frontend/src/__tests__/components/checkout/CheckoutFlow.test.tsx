/**
 * Tests for Checkout Flow
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutFlow } from '../../../components/checkout/CheckoutFlow';
import { CartProvider } from '../../../store/CartContext';
import { AuthProvider } from '../../../store/AuthContext';
import { mockCart, mockUser, TestWrapper } from '../../setup';
import { apiClient } from '../../../api/client';

vi.mock('../../../api/client');

const CheckoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <TestWrapper>
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  </TestWrapper>
);

describe('CheckoutFlow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock authenticated user
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockUser });
  });

  it('should render checkout form with cart items', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockCart });

    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Checkout')).toBeInTheDocument();
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$199.98')).toBeInTheDocument();
    });
  });

  it('should validate shipping address form', async () => {
    const user = userEvent.setup();
    
    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    // Try to proceed without filling required fields
    const continueButton = screen.getByText('Continue to Payment');
    await user.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
      expect(screen.getByText('Address is required')).toBeInTheDocument();
      expect(screen.getByText('City is required')).toBeInTheDocument();
      expect(screen.getByText('Postal code is required')).toBeInTheDocument();
    });
  });

  it('should fill and validate shipping address', async () => {
    const user = userEvent.setup();
    
    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    // Fill shipping address
    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Address'), '123 Main St');
    await user.type(screen.getByLabelText('City'), 'New York');
    await user.type(screen.getByLabelText('Postal Code'), '10001');
    await user.selectOptions(screen.getByLabelText('Country'), 'US');

    const continueButton = screen.getByText('Continue to Payment');
    await user.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText('Payment Information')).toBeInTheDocument();
    });
  });

  it('should handle payment method selection', async () => {
    const user = userEvent.setup();
    
    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    // Navigate to payment step
    await fillShippingAddress(user);

    // Select payment method
    const creditCardOption = screen.getByLabelText('Credit Card');
    await user.click(creditCardOption);

    expect(screen.getByTestId('card-element')).toBeInTheDocument();
  });

  it('should process payment successfully', async () => {
    const user = userEvent.setup();
    
    // Mock successful payment
    vi.mocked(apiClient.post).mockResolvedValue({
      data: {
        id: 'order_123',
        status: 'completed',
        total: 199.98
      }
    });

    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    // Complete checkout flow
    await fillShippingAddress(user);
    await fillPaymentInfo(user);

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
      expect(screen.getByText('Order #order_123')).toBeInTheDocument();
    });

    expect(apiClient.post).toHaveBeenCalledWith('/orders', expect.objectContaining({
      shipping_address: expect.any(Object),
      payment_method: expect.any(Object),
      items: expect.any(Array)
    }));
  });

  it('should handle payment failure', async () => {
    const user = userEvent.setup();
    
    // Mock payment failure
    vi.mocked(apiClient.post).mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Payment failed' }
      }
    });

    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    await fillShippingAddress(user);
    await fillPaymentInfo(user);

    const placeOrderButton = screen.getByText('Place Order');
    await user.click(placeOrderButton);

    await waitFor(() => {
      expect(screen.getByText('Payment failed')).toBeInTheDocument();
    });
  });

  it('should apply discount code', async () => {
    const user = userEvent.setup();
    
    // Mock discount validation
    vi.mocked(apiClient.post).mockResolvedValue({
      data: {
        valid: true,
        discount_amount: 20.00,
        new_total: 179.98
      }
    });

    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    // Apply discount code
    const discountInput = screen.getByPlaceholderText('Enter discount code');
    await user.type(discountInput, 'SAVE20');
    
    const applyButton = screen.getByText('Apply');
    await user.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText('Discount Applied: -$20.00')).toBeInTheDocument();
      expect(screen.getByText('$179.98')).toBeInTheDocument();
    });
  });

  it('should handle invalid discount code', async () => {
    const user = userEvent.setup();
    
    // Mock invalid discount
    vi.mocked(apiClient.post).mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Invalid discount code' }
      }
    });

    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    const discountInput = screen.getByPlaceholderText('Enter discount code');
    await user.type(discountInput, 'INVALID');
    
    const applyButton = screen.getByText('Apply');
    await user.click(applyButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid discount code')).toBeInTheDocument();
    });
  });

  it('should calculate tax and shipping', async () => {
    // Mock tax and shipping calculation
    vi.mocked(apiClient.post).mockResolvedValue({
      data: {
        subtotal: 199.98,
        tax: 16.00,
        shipping: 9.99,
        total: 225.97
      }
    });

    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Subtotal: $199.98')).toBeInTheDocument();
      expect(screen.getByText('Tax: $16.00')).toBeInTheDocument();
      expect(screen.getByText('Shipping: $9.99')).toBeInTheDocument();
      expect(screen.getByText('Total: $225.97')).toBeInTheDocument();
    });
  });

  it('should save shipping address for future use', async () => {
    const user = userEvent.setup();
    
    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    await fillShippingAddress(user);

    const saveAddressCheckbox = screen.getByLabelText('Save this address for future orders');
    await user.click(saveAddressCheckbox);

    const continueButton = screen.getByText('Continue to Payment');
    await user.click(continueButton);

    expect(apiClient.post).toHaveBeenCalledWith('/user/addresses', expect.objectContaining({
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Main St',
      city: 'New York',
      postal_code: '10001',
      country: 'US'
    }));
  });

  it('should handle guest checkout', async () => {
    const user = userEvent.setup();
    
    // Mock unauthenticated user
    vi.mocked(apiClient.get).mockRejectedValue({ response: { status: 401 } });

    render(
      <CheckoutWrapper>
        <CheckoutFlow />
      </CheckoutWrapper>
    );

    // Should show guest checkout option
    await waitFor(() => {
      expect(screen.getByText('Continue as Guest')).toBeInTheDocument();
    });

    const guestButton = screen.getByText('Continue as Guest');
    await user.click(guestButton);

    // Should show email field for guest
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  // Helper functions
  async function fillShippingAddress(user: any) {
    await user.type(screen.getByLabelText('First Name'), 'John');
    await user.type(screen.getByLabelText('Last Name'), 'Doe');
    await user.type(screen.getByLabelText('Address'), '123 Main St');
    await user.type(screen.getByLabelText('City'), 'New York');
    await user.type(screen.getByLabelText('Postal Code'), '10001');
    await user.selectOptions(screen.getByLabelText('Country'), 'US');
    
    const continueButton = screen.getByText('Continue to Payment');
    await user.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('Payment Information')).toBeInTheDocument();
    });
  }

  async function fillPaymentInfo(user: any) {
    const creditCardOption = screen.getByLabelText('Credit Card');
    await user.click(creditCardOption);
    
    // Mock Stripe element interactions
    const cardElement = screen.getByTestId('card-element');
    fireEvent.change(cardElement, { 
      target: { value: '4242424242424242' } 
    });
  }
});