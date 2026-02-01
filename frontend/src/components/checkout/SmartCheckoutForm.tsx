/**
 * Smart Checkout Form - Comprehensive checkout with backend-only pricing
 * Features real-time validation, price verification, and secure order processing
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useCart } from '../../store/CartContext';
import { useLocale } from '../../store/LocaleContext';
import { useTheme } from '../../store/ThemeContext';
import { useShipping } from '../../hooks/useShipping';
import { OrdersAPI } from '../../api/orders';
import { AuthAPI } from '../../api/auth';
import { CartAPI } from '../../api/cart';
import { TokenManager } from '../../api/client';
import { PaymentsAPI } from '../../api/payments';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle, AlertTriangle, CreditCard, Truck, MapPin } from 'lucide-react';
import AddAddressForm from '../forms/AddAddressForm';

// Debounce utility
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

interface CheckoutPricing {
  subtotal: number;
  shipping: {
    method_id: string;
    method_name: string;
    cost: number;
  };
  tax: {
    rate: number;
    amount: number;
    location: string;
  };
  discount?: {
    code: string;
    type: string;
    value: number;
    amount: number;
  };
  total: number;
  currency: string;
  calculated_at: string;
}

export const SmartCheckoutForm: React.FC<SmartCheckoutFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { cart, clearCart, refreshCart } = useCart();
  const { formatCurrency, currency, countryCode } = useLocale();
  const { theme } = useTheme();
  const { 
    shippingMethods, 
    loading: shippingLoading, 
    error: shippingError,
    loadShippingMethods,
    getCheapestMethod 
  } = useShipping({ autoLoad: true });
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    shipping_address_id: null,
    shipping_method_id: null,
    payment_method_id: null,
    discount_code: '',
    notes: ''
  });
  
  // Data state
  const [addresses, setAddresses] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [realTimeValidation, setRealTimeValidation] = useState<any>({});
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [pricingData, setPricingData] = useState<CheckoutPricing | null>(null);
  const [priceValidationErrors, setPriceValidationErrors] = useState<string[]>([]);

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

  // Auto-select cheapest shipping method when available
  useEffect(() => {
    if (shippingMethods.length > 0 && !formData.shipping_method_id) {
      const cheapestMethod = getCheapestMethod();
      if (cheapestMethod) {
        setFormData(prev => ({ ...prev, shipping_method_id: cheapestMethod.id }));
      }
    }
  }, [shippingMethods, formData.shipping_method_id, getCheapestMethod]);

  // Load initial data
  useEffect(() => {
    loadCheckoutData();
  }, []);

  // Real-time validation with comprehensive pricing
  const debouncedValidation = useCallback(
    debounce(async (data) => {
      try {
        // Skip validation if required fields are missing
        if (!data.shipping_address_id || 
            !data.shipping_method_id || 
            !data.payment_method_id) {
          setRealTimeValidation({});
          setPricingData(null);
          return;
        }
        
        console.log('=== CHECKOUT VALIDATION REQUEST ===');
        console.log('Validating checkout with data:', {
          shipping_address_id: data.shipping_address_id,
          shipping_method_id: data.shipping_method_id,
          payment_method_id: data.payment_method_id,
          discount_code: data.discount_code,
          notes: data.notes
        });
        
        const response = await OrdersAPI.validateCheckout({
          shipping_address_id: data.shipping_address_id,
          shipping_method_id: data.shipping_method_id,
          payment_method_id: data.payment_method_id,
          discount_code: data.discount_code || undefined,
          notes: data.notes,
          currency: currency,
          country_code: countryCode
        });
        
        console.log('=== CHECKOUT VALIDATION RESPONSE ===');
        console.log('Validation response:', response);
        
        if (response.success && response.data) {
          setRealTimeValidation(response.data);
          
          // Extract pricing information
          if (response.data.pricing) {
            setPricingData(response.data.pricing);
            setPriceValidationErrors([]);
          }
          
          // Handle validation warnings
          if (response.data.warnings && response.data.warnings.length > 0) {
            const priceWarnings = response.data.warnings
              .filter(w => w.type === 'price_mismatch')
              .map(w => w.message);
            setPriceValidationErrors(priceWarnings);
          }
        } else {
          console.error('Validation failed:', response);
          const errorMessages = response.data?.errors || [response.message || 'Validation failed'];
          setRealTimeValidation({ 
            can_proceed: false, 
            errors: errorMessages
          });
          setPricingData(null);
        }
      } catch (error: any) {
        console.error('Real-time validation failed:', error);
        setRealTimeValidation({ 
          can_proceed: false, 
          errors: ['Validation service temporarily unavailable'] 
        });
        setPricingData(null);
      }
    }, 1000),
    [currency, countryCode]
  );

  // Trigger validation when form data changes
  useEffect(() => {
    debouncedValidation(formData);
  }, [formData, debouncedValidation]);

  const loadCheckoutData = async () => {
    setLoading(true);
    try {
      // Load addresses and payment methods in parallel
      const [addressesRes, paymentMethodsRes] = await Promise.all([
        AuthAPI.getAddresses(),
        PaymentsAPI.getPaymentMethods()
      ]);

      if (addressesRes.success) {
        setAddresses(addressesRes.data || []);
        // Auto-select default address
        const defaultAddress = addressesRes.data?.find(addr => addr.is_default);
        if (defaultAddress && !formData.shipping_address_id) {
          setFormData(prev => ({ ...prev, shipping_address_id: defaultAddress.id }));
        }
      }

      if (paymentMethodsRes.success) {
        setPaymentMethods(paymentMethodsRes.data || []);
        // Auto-select default payment method
        const defaultPayment = paymentMethodsRes.data?.find(pm => pm.is_default);
        if (defaultPayment && !formData.payment_method_id) {
          setFormData(prev => ({ ...prev, payment_method_id: defaultPayment.id }));
        }
      }
    } catch (error) {
      console.error('Failed to load checkout data:', error);
      toast.error('Failed to load checkout information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!realTimeValidation.can_proceed) {
      toast.error('Please resolve validation errors before proceeding');
      return;
    }

    setProcessingPayment(true);
    
    try {
      console.log('=== PLACING ORDER ===');
      console.log('Order data:', formData);
      console.log('Pricing data:', pricingData);
      
      const orderResponse = await OrdersAPI.placeOrder({
        shipping_address_id: formData.shipping_address_id,
        shipping_method_id: formData.shipping_method_id,
        payment_method_id: formData.payment_method_id,
        discount_code: formData.discount_code || undefined,
        notes: formData.notes,
        currency: currency,
        country_code: countryCode,
        // Include pricing data for verification
        frontend_calculated_total: pricingData?.total
      });

      if (orderResponse.success) {
        // Clear cart and form data
        await clearCart();
        localStorage.removeItem('checkout_form_data');
        
        toast.success('Order placed successfully!');
        onSuccess(orderResponse.data.id);
      } else {
        throw new Error(orderResponse.message || 'Failed to place order');
      }
    } catch (error: any) {
      console.error('Order placement failed:', error);
      
      // Handle specific error types
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = errors.map(err => err.message).join(', ');
        toast.error(`Order failed: ${errorMessages}`);
      } else {
        toast.error(error.message || 'Failed to place order. Please try again.');
      }
    } finally {
      setProcessingPayment(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Render pricing summary
  const renderPricingSummary = () => {
    if (!pricingData) {
      const missingFields = [];
      if (!formData.shipping_address_id) missingFields.push('shipping address');
      if (!formData.shipping_method_id) missingFields.push('shipping method');
      if (!formData.payment_method_id) missingFields.push('payment method');
      
      const message = missingFields.length > 0 
        ? `Select ${missingFields.join(', ')} to see pricing`
        : 'Loading pricing information...';
      
      return (
        <div className="bg-surface-elevated dark:bg-surface-elevated-dark border border-border-light dark:border-border-dark p-4 rounded-lg">
          <p className="text-sm text-copy-light dark:text-copy-light-dark">{message}</p>
        </div>
      );
    }

    return (
      <div className="bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
        <h3 className="text-base font-medium text-copy dark:text-copy-dark">Order Summary</h3>
        
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-copy dark:text-copy-dark">
            <span>Subtotal:</span>
            <span>{formatCurrency(pricingData.subtotal)}</span>
          </div>
          
          <div className="flex justify-between text-copy dark:text-copy-dark">
            <span>Shipping ({pricingData.shipping.method_name}):</span>
            <span>{formatCurrency(pricingData.shipping.cost)}</span>
          </div>
          
          <div className="flex justify-between text-copy dark:text-copy-dark">
            <span>Tax ({(pricingData.tax.rate * 100).toFixed(2)}%):</span>
            <span>{formatCurrency(pricingData.tax.amount)}</span>
          </div>
          
          {pricingData.discount && (
            <div className="flex justify-between text-success dark:text-success-dark">
              <span>Discount ({pricingData.discount.code}):</span>
              <span>-{formatCurrency(pricingData.discount.amount)}</span>
            </div>
          )}
          
          <hr className="my-2 border-border-light dark:border-border-dark" />
          
          <div className="flex justify-between text-xs font-medium text-copy dark:text-copy-dark">
            <span>Total:</span>
            <span>{formatCurrency(pricingData.total)}</span>
          </div>
        </div>
        
        {priceValidationErrors.length > 0 && (
          <div className="mt-3 p-3 bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30 rounded">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />
              <span className="text-xs font-medium text-destructive dark:text-destructive-dark">Price Verification</span>
            </div>
            {priceValidationErrors.map((error, index) => (
              <p key={index} className="text-xs text-destructive dark:text-destructive-dark">{error}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading checkout...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <h1 className="text-lg font-medium text-copy dark:text-copy-dark mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Shipping Address Section */}
            <div className="bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-primary dark:text-primary-dark" />
                <h2 className="text-base font-medium text-copy dark:text-copy-dark">Shipping Address</h2>
              </div>
              
              {addresses.length > 0 ? (
                <div className="space-y-3">
                  {addresses.map((address) => (
                    <label key={address.id} className="flex items-start gap-2 sm:gap-3 p-3 border border-border-light dark:border-border-dark rounded-lg cursor-pointer hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark transition-colors">
                      <input
                        type="radio"
                        name="shipping_address"
                        value={address.id}
                        checked={formData.shipping_address_id === address.id}
                        onChange={(e) => updateFormData('shipping_address_id', e.target.value)}
                        className="mt-1 accent-primary dark:accent-primary-dark"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-copy dark:text-copy-dark truncate">{address.street}</div>
                        <div className="text-xs sm:text-sm text-copy-light dark:text-copy-light-dark">
                          {address.city}, {address.state} {address.post_code}
                        </div>
                        <div className="text-xs sm:text-sm text-copy-light dark:text-copy-light-dark">{address.country}</div>
                      </div>
                    </label>
                  ))}
                  <Link to="/account/addresses">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                    >
                      Add New Address
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-copy-light dark:text-copy-light-dark mb-4">No addresses found</p>
                  <Button
                    type="button"
                    onClick={() => setShowAddAddressForm(true)}
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </div>

            {/* Shipping Method Section */}
            <div className="bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Truck className="h-4 w-4 text-primary dark:text-primary-dark" />
                <h2 className="text-base font-medium text-copy dark:text-copy-dark">Shipping Method</h2>
              </div>
              
              {shippingError && (
                <div className="mb-4 p-4 bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />
                    <span className="font-medium text-destructive dark:text-destructive-dark">Error Loading Shipping Methods</span>
                  </div>
                  <p className="text-sm text-destructive dark:text-destructive-dark">{shippingError}</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={loadShippingMethods}
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </div>
              )}
              
              {shippingLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-16 bg-surface-elevated dark:bg-surface-elevated-dark rounded"></div>
                  <div className="h-16 bg-surface-elevated dark:bg-surface-elevated-dark rounded"></div>
                </div>
              ) : shippingMethods.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {shippingMethods.map((method) => (
                    <label key={method.id} className="flex items-center justify-between gap-2 sm:gap-3 p-3 border border-border-light dark:border-border-dark rounded-lg cursor-pointer hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark transition-colors">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <input
                          type="radio"
                          name="shipping_method"
                          value={method.id}
                          checked={formData.shipping_method_id === method.id}
                          onChange={(e) => {
                            console.log('✅ Shipping method selected:', method.id, method.name, `$${method.price}`);
                            updateFormData('shipping_method_id', e.target.value);
                          }}
                          className="accent-primary dark:accent-primary-dark flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-copy dark:text-copy-dark truncate">{method.name}</div>
                          <div className="text-xs text-copy-light dark:text-copy-light-dark line-clamp-1">{method.description}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-medium text-copy dark:text-copy-dark whitespace-nowrap">{formatCurrency(method.price)}</div>
                        <div className="text-xs text-copy-light dark:text-copy-light-dark whitespace-nowrap">{method.estimated_days}d</div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-copy-light dark:text-copy-light-dark">No shipping methods available</p>
              )}
            </div>

            {/* Payment Method Section */}
            <div className="bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-4 w-4 text-primary dark:text-primary-dark" />
                <h2 className="text-base font-medium text-copy dark:text-copy-dark">Payment Method</h2>
              </div>
              
              {paymentMethods.length > 0 ? (
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center gap-3 p-3 border border-border-light dark:border-border-dark rounded-lg cursor-pointer hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark transition-colors">
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.id}
                        checked={formData.payment_method_id === method.id}
                        onChange={(e) => {
                          console.log('✅ Payment method selected:', method.id, method.type);
                          updateFormData('payment_method_id', e.target.value);
                        }}
                        className="accent-primary dark:accent-primary-dark flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-copy dark:text-copy-dark truncate">
                          {method.type === 'credit_card' ? 'Credit Card' : method.type}
                        </div>
                        <div className="text-xs text-copy-light dark:text-copy-light-dark truncate">
                          **** **** **** {method.last_four}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-copy-light dark:text-copy-light-dark mb-3">No payment methods available</p>
                  <Link to="/account/payment-methods">
                    <Button type="button" variant="outline" className="w-full">
                      Add Payment Method
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-surface dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-4 sm:p-6">
              <h2 className="text-base font-medium text-copy dark:text-copy-dark mb-4">Order Notes (Optional)</h2>
              <textarea
                className="w-full p-3 border border-border-light dark:border-border-dark rounded-lg bg-surface dark:bg-surface-dark text-copy dark:text-copy-dark resize-none focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
                rows={3}
                placeholder="Special instructions for your order..."
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
              />
            </div>

            {/* Validation Errors */}
            {realTimeValidation.errors && realTimeValidation.errors.length > 0 && (
              <div className="bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />
                  <span className="font-medium text-destructive dark:text-destructive-dark">Please fix the following issues:</span>
                </div>
                <ul className="list-disc list-inside text-sm text-destructive dark:text-destructive-dark space-y-1">
                  {realTimeValidation.errors.map((error, index) => (
                    <li key={index}>{typeof error === 'string' ? error : error.message}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!realTimeValidation.can_proceed || processingPayment}
              className="w-full py-2 text-xs font-medium"
            >
              {processingPayment ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                  Processing Order...
                </>
              ) : (
                `Place Order ${pricingData ? formatCurrency(pricingData.total) : ''}`
              )}
            </Button>
            </form>
          </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 sm:top-6">
            {renderPricingSummary()}
            
            {/* Validation Status */}
            {realTimeValidation.can_proceed !== undefined && (
              <div className={`mt-4 p-3 rounded-lg ${
                realTimeValidation.can_proceed 
                  ? 'bg-success/10 dark:bg-success-dark/10 border border-success/30 dark:border-success-dark/30' 
                  : 'bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30'
              }`}>
                <div className="flex items-center gap-2">
                  {realTimeValidation.can_proceed ? (
                    <CheckCircle className="h-4 w-4 text-success dark:text-success-dark" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />
                  )}
                  <span className={`text-sm font-medium ${
                    realTimeValidation.can_proceed ? 'text-success dark:text-success-dark' : 'text-destructive dark:text-destructive-dark'
                  }`}>
                    {realTimeValidation.can_proceed ? 'Ready to place order' : 'Cannot proceed'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressForm && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-surface dark:bg-surface-dark rounded-lg p-6 max-w-md w-full mx-4 border border-border-light dark:border-border-dark">
            <AddAddressForm
              onSuccess={() => {
                setShowAddAddressForm(false);
                loadCheckoutData();
              }}
              onCancel={() => setShowAddAddressForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartCheckoutForm;
