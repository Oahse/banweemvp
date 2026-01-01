/**
 * Smart Checkout Form - Intelligent form with auto-completion, real-time validation,
 * and progressive disclosure to reduce friction
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLocale } from '../../contexts/LocaleContext';
import { OrdersAPI } from '../../apis/orders';
import { AuthAPI } from '../../apis/auth';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

// Simple debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

interface SmartCheckoutFormProps {
  onSuccess: (orderId: string) => void;
}

export const SmartCheckoutForm: React.FC<SmartCheckoutFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { formatCurrency } = useLocale();

  const stripe = useStripe();
  const elements = useElements();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    shipping_address_id: '',
    shipping_method_id: '',
    payment_method_id: '',
    notes: ''
  });
  
  // Data state
  const [addresses, setAddresses] = useState<any[]>([]);
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [realTimeValidation, setRealTimeValidation] = useState<any>({});
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [isProcessingStripePayment, setIsProcessingStripePayment] = useState(false);

  const fetchPaymentIntentClientSecret = useCallback(async () => {
    if (!cart?.id || !user?.id) {
      toast.error('Cart or user information missing for payment intent creation.');
      return;
    }

    try {
      setIsProcessingStripePayment(true);
      const response = await OrdersAPI.createPaymentIntent({
        cart_id: cart.id,
        user_id: user.id,
        amount: orderSummary?.total || cart.total_amount,
        currency: cart.currency || 'usd', // Assuming cart has a currency
      });
      if (response?.data?.client_secret) {
        setClientSecret(response.data.client_secret);
      } else {
        toast.error('Failed to get payment intent client secret.');
      }
    } catch (error) {
      console.error('Error fetching payment intent client secret:', error);
      toast.error('Failed to initialize payment. Please try again.');
    } finally {
      setIsProcessingStripePayment(false);
    }
  }, [cart, user, orderSummary]);

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('checkout_form_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkout_form_data', JSON.stringify(formData));
  }, [formData]);

  // Load initial data
  useEffect(() => {
    loadCheckoutData();
  }, []);

  // Real-time validation
  const debouncedValidation = useCallback(
    debounce(async (data) => {
      try {
        const response = await OrdersAPI.validateCheckout(data);
        setRealTimeValidation(response.data || {});
      } catch (error) {
        console.error('Real-time validation failed:', error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (formData.shipping_address_id && formData.shipping_method_id) {
      debouncedValidation(formData);
    }
  }, [formData, debouncedValidation]);

  const loadCheckoutData = async () => {
    setLoading(true);
    try {
      // Fetch addresses and payment methods in parallel
      const [addressesRes, paymentsRes] = await Promise.all([
        AuthAPI.getAddresses(),
        AuthAPI.getPaymentMethods()
      ]);

      const defaultAddress = addressesRes.data?.find((addr: any) => addr.is_default) || addressesRes.data?.[0];

      let shippingMethodsRes = { data: [] };
      if (defaultAddress) {
        // Fetch shipping methods using the default address
        shippingMethodsRes = await CartAPI.getShippingOptions(defaultAddress);
      }
      
      setAddresses(addressesRes.data || []);
      setShippingMethods(shippingMethodsRes.data || []);
      setPaymentMethods(paymentsRes.data || []);

      // Auto-select defaults
      const standardShipping = shippingMethodsRes.data?.find((sm: any) => sm.name?.toLowerCase().includes('standard')) || shippingMethodsRes.data?.[0];
      const defaultPayment = paymentsRes.data?.find((pm: any) => pm.is_default) || paymentsRes.data?.[0];

      setFormData((prev: any) => ({
        ...prev,
        shipping_address_id: prev.shipping_address_id || defaultAddress?.id || '',
        shipping_method_id: prev.shipping_method_id || standardShipping?.id || '',
        payment_method_id: prev.payment_method_id || defaultPayment?.id || ''
      }));

    } catch (error) {
      console.error('Failed to load checkout data:', error);
      toast.error('Failed to load checkout options');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderSummary = useCallback(() => {
    if (!cart || !formData.shipping_method_id) return;

    const selectedShipping = shippingMethods.find(sm => sm.id === formData.shipping_method_id);
    if (!selectedShipping) return;

    const subtotal = cart.subtotal || 0;
    const shipping = selectedShipping.price || 0;
    const tax = calculateTax(subtotal, shipping);
    const total = subtotal + shipping + tax;

    setOrderSummary({
      subtotal,
      shipping,
      tax,
      total,
      items: cart.items?.length || 0
    });
  }, [cart, formData.shipping_method_id, shippingMethods]);

  useEffect(() => {
    updateOrderSummary();
  }, [updateOrderSummary]);

  const calculateTax = (subtotal, shipping) => {
    // Simple tax calculation - in real app, this would be based on address
    const taxRate = 0.08; // 8%
    return (subtotal + shipping) * taxRate;
  };

  const validateStep = (step) => {
    const errors = {};
    
    switch (step) {
      case 1: // Shipping Address
        if (!formData.shipping_address_id) {
          errors.shipping_address_id = 'Please select a shipping address';
        }
        break;
      case 2: // Shipping Method
        if (!formData.shipping_method_id) {
          errors.shipping_method_id = 'Please select a shipping method';
        }
        break;
      case 3: // Payment Method
        if (!formData.payment_method_id) {
          errors.payment_method_id = 'Please select a payment method';
        }
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setProcessingPayment(true);
    setIsProcessingStripePayment(true); // Indicate Stripe processing is active
    
    try {
      // Final validation before checkout
      const finalValidation = await OrdersAPI.validateCheckout(formData);
      
      if (!finalValidation.data?.can_proceed) {
        toast.error('Checkout validation failed. Please review your cart.');
        setCurrentStep(1); // Go back to review cart
        setIsProcessingStripePayment(false);
        return;
      }
      
      let finalPaymentMethodId = formData.payment_method_id;

      // Handle new card payment via Stripe
      if (showNewCardForm && stripe && elements && clientSecret) {
        const { error: submitError } = await elements.submit();
        if (submitError) {
          toast.error(submitError.message || 'Failed to submit payment details.');
          setIsProcessingStripePayment(false);
          return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/checkout`, // URL to redirect after successful payment
          },
          redirect: 'if_required'
        });
        
        if (confirmError) {
          toast.error(confirmError.message || 'Payment confirmation failed.');
          setIsProcessingStripePayment(false);
          return;
        }

        if (paymentIntent?.status === 'succeeded' && paymentIntent.payment_method) {
          finalPaymentMethodId = paymentIntent.payment_method as string;
          // Optionally, save the new payment method to user's profile
          // await AuthAPI.addPaymentMethod({ payment_method_id: finalPaymentMethodId });
        } else {
          toast.error('Payment not successful. Please try again.');
          setIsProcessingStripePayment(false);
          return;
        }
      } else if (!finalPaymentMethodId) {
        toast.error('Please select a payment method or add a new card.');
        setIsProcessingStripePayment(false);
        return;
      }
      
      // Generate idempotency key to prevent duplicate orders
      const idempotencyKey = `checkout_${user?.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Add idempotency key and calculated total for validation
      const checkoutData = {
        ...formData,
        payment_method_id: finalPaymentMethodId, // Use the new payment method ID if applicable
        idempotency_key: idempotencyKey,
        frontend_calculated_total: orderSummary?.total || 0
      };
      
      // Attempt checkout with retry logic for transient failures
      let lastError = null;
      const maxRetries = 3;
      
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          toast.loading(`Processing order... (Attempt ${attempt}/${maxRetries})`, { 
            id: 'checkout-loading',
            duration: 60000 // 60 second timeout
          });
          
          const response = await OrdersAPI.checkout(checkoutData);
          
          toast.dismiss('checkout-loading');
          
          if (response?.success && response?.data) {
            // Clear form data from localStorage on success
            localStorage.removeItem('checkout_form_data');
            
            // Clear cart
            await clearCart();
            
            toast.success('Order placed successfully! 🎉');
            onSuccess(response.data.id);
            return;
          } else {
            throw new Error(response?.message || 'Checkout failed');
          }
          
        } catch (error) {
          lastError = error;
          toast.dismiss('checkout-loading');
          
          // Check if it's a retryable error
          const errorMessage = error.response?.data?.detail || error.message || 'Unknown error';
          const isRetryable = 
            errorMessage.includes('timeout') ||
            errorMessage.includes('temporarily unavailable') ||
            errorMessage.includes('high demand') ||
            errorMessage.includes('Lock conflict') ||
            error.response?.status === 408 || // Request timeout
            error.response?.status === 429 || // Rate limit
            error.response?.status === 503;   // Service unavailable
          
          if (!isRetryable || attempt === maxRetries) {
            // Non-retryable error or final attempt
            break;
          }
          
          // Wait before retry with exponential backoff
          const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          toast.loading(`Retrying in ${waitTime / 1000} seconds...`, { 
            id: 'retry-wait',
            duration: waitTime 
          });
          
          await new Promise(resolve => setTimeout(resolve, waitTime));
          toast.dismiss('retry-wait');
        }
      }
      
      // All retries failed - handle the error
      const errorMessage = lastError?.response?.data?.detail || lastError?.message || 'Checkout failed';
      
      // Handle specific error types with appropriate user guidance
      if (errorMessage.includes('Cart validation failed')) {
        toast.error('Your cart has been updated. Please review and try again.');
        setCurrentStep(1); // Go back to cart review
      } else if (errorMessage.includes('Price mismatch') || errorMessage.includes('price')) {
        toast.error('Prices have been updated. Please review your order.');
        // Reload order summary
        updateOrderSummary();
      } else if (errorMessage.includes('Insufficient stock')) {
        toast.error('Some items are no longer available. Please update your cart.');
        setCurrentStep(1);
      } else if (errorMessage.includes('Payment')) {
        toast.error(`Payment failed: ${errorMessage}`);
        setCurrentStep(3); // Stay on payment step
      } else if (errorMessage.includes('high demand') || errorMessage.includes('temporarily unavailable')) {
        toast.error('Service is experiencing high demand. Please try again in a moment.');
      } else {
        toast.error(`Checkout failed: ${errorMessage}`);
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setProcessingPayment(false);
      setIsProcessingStripePayment(false); // Reset Stripe processing state
    }
  };

  const steps = [
    { number: 1, title: 'Shipping Address', icon: '📍' },
    { number: 2, title: 'Shipping Method', icon: '🚚' },
    { number: 3, title: 'Payment Method', icon: '💳' },
    { number: 4, title: 'Review Order', icon: '✅' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-copy-light">Loading checkout options...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number
                  ? 'bg-primary border-primary text-copy-inverse'
                  : 'border text-copy-lighter'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="text-lg">{step.icon}</span>
                )}
              </div>
              <div className="ml-3">
                <div className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-primary' : 'text-copy-lighter'
                }`}>
                  Step {step.number}
                </div>
                <div className={`text-xs ${
                  currentStep >= step.number ? 'text-copy' : 'text-copy-lighter'
                }`}>
                  {step.title}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-border-light'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.shipping_address_id === address.id
                          ? 'border-primary bg-primary/10'
                          : 'border hover:border-strong'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping_address"
                        value={address.id}
                        checked={formData.shipping_address_id === address.id}
                        onChange={(e) => setFormData(prev => ({ ...prev, shipping_address_id: e.target.value }))}
                        className="sr-only"
                      />
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-copy">
                            {address.street}
                          </div>
                          <div className="text-sm text-copy-light">
                            {address.city}, {address.state} {address.post_code}
                          </div>
                          <div className="text-sm text-copy-light">
                            {address.country}
                          </div>
                        </div>
                        {address.is_default && (
                          <span className="bg-success/20 text-success text-xs font-medium px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                  
                  {addresses.length === 0 && (
                    <div className="text-center py-8 text-copy-muted">
                      <p>No addresses found. Please add an address to continue.</p>
                      <Button
                        onClick={() => {/* Navigate to add address */}}
                        className="mt-4"
                        variant="outline"
                      >
                        Add Address
                      </Button>
                    </div>
                  )}
                </div>
                
                {validationErrors.shipping_address_id && (
                  <div className="mt-2 text-sm text-error flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {validationErrors.shipping_address_id}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Shipping Method */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.shipping_method_id === method.id
                          ? 'border-primary bg-primary/10'
                          : 'border hover:border-strong'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping_method"
                        value={method.id}
                        checked={formData.shipping_method_id === method.id}
                        onChange={(e) => setFormData(prev => ({ ...prev, shipping_method_id: e.target.value }))}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-copy">
                            {method.name}
                          </div>
                          <div className="text-sm text-copy-light">
                            {method.estimated_days} business days
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-copy">
                          {formatCurrency(method.price)}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                {validationErrors.shipping_method_id && (
                  <div className="mt-2 text-sm text-error flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {validationErrors.shipping_method_id}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment Method */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.payment_method_id === method.id && !showNewCardForm
                          ? 'border-primary bg-primary/10'
                          : 'border hover:border-strong'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.id}
                        checked={formData.payment_method_id === method.id && !showNewCardForm}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, payment_method_id: e.target.value }));
                          setShowNewCardForm(false);
                        }}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-6 bg-surface-active rounded flex items-center justify-center text-xs font-bold">
                            {method.brand?.toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-copy">
                              •••• •••• •••• {method.last_four}
                            </div>
                            <div className="text-sm text-copy-light">
                              Expires {method.expiry_month}/{method.expiry_year}
                            </div>
                          </div>
                        </div>
                        {method.is_default && (
                          <span className="bg-success/20 text-success text-xs font-medium px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                  
                  {/* Option to add a new card */}
                  <label
                    className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                      showNewCardForm
                        ? 'border-primary bg-primary/10'
                        : 'border hover:border-strong'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value="new_card"
                      checked={showNewCardForm}
                      onChange={() => {
                        setShowNewCardForm(true);
                        setFormData(prev => ({ ...prev, payment_method_id: null })); // Clear selected payment method
                        if (!clientSecret) {
                          fetchPaymentIntentClientSecret();
                        }
                      }}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-surface-active rounded flex items-center justify-center text-xs font-bold">
                        NEW
                      </div>
                      <div className="font-medium text-copy">Use a new card</div>
                    </div>
                  </label>

                  {/* Stripe Payment Element for new card input */}
                  {showNewCardForm && clientSecret && (
                    <div className="mt-4 p-4 border rounded-lg">
                      <PaymentElement options={{ layout: "tabs" }} />
                    </div>
                  )}

                  {(paymentMethods.length === 0 && !showNewCardForm) && (
                    <div className="text-center py-8 text-copy-muted">
                      <p>No payment methods found. Please add a payment method to continue.</p>
                      <Button
                        onClick={() => {
                          setShowNewCardForm(true);
                          setFormData(prev => ({ ...prev, payment_method_id: null }));
                          if (!clientSecret) {
                            fetchPaymentIntentClientSecret();
                          }
                        }}
                        className="mt-4"
                        variant="outline"
                      >
                        Add New Card
                      </Button>
                    </div>
                  )}
                </div>
                
                {validationErrors.payment_method_id && (
                  <div className="mt-2 text-sm text-error flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {validationErrors.payment_method_id}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review Order */}
            {currentStep === 4 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Review Your Order</h3>
                
                {/* Order items */}
                <div className="space-y-4 mb-6">
                  {cart?.items?.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-surface-hover rounded-lg">
                      <img
                        src={item.product?.image_url || '/placeholder-product.jpg'}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-copy">{item.product?.name}</div>
                        <div className="text-sm text-copy-light">Quantity: {item.quantity}</div>
                      </div>
                      <div className="text-lg font-semibold text-copy">
                        {formatCurrency(item.quantity * item.price_per_unit)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-copy mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special instructions for your order..."
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!formData.shipping_address_id && currentStep === 1 ||
                           !formData.shipping_method_id && currentStep === 2 ||
                           !formData.payment_method_id && currentStep === 3}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  isLoading={processingPayment}
                  className="bg-success hover:bg-success-dark"
                  size="lg"
                >
                  {processingPayment ? 'Processing...' : `Place Order - ${formatCurrency(orderSummary?.total || 0)}`}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            {orderSummary && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({orderSummary.items} items)</span>
                  <span>{formatCurrency(orderSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatCurrency(orderSummary.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatCurrency(orderSummary.tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(orderSummary.total)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Real-time validation status */}
            {realTimeValidation && Object.keys(realTimeValidation).length > 0 && (
              <div className="mt-6 p-3 bg-success/10 border border-success/30 rounded-lg">
                <div className="flex items-center text-sm text-success">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Order validated and ready to place
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCheckoutForm;