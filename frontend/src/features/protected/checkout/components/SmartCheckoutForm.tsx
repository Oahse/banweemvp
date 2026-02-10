/**
 * Smart Checkout Form - Comprehensive checkout with backend-only pricing
 * Features real-time validation, price verification, and secure order processing
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { useCart } from '../../cart/contexts/CartContext';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import { useShipping } from '../../shipping/hooks/useShipping';
import { OrdersAPI } from '@/api/orders';
import { AuthAPI } from '@/api/auth';
import { Button } from '@/components/ui/Button';
import { PaymentsAPI } from '@/api/payments';
import { toast } from 'react-hot-toast';
import { RadioGroup, Textarea } from '@/components/ui/Form';
import { Card } from '@/components/ui/Card';
import { CheckCircle, AlertTriangle, CreditCard, Truck, MapPin } from 'lucide-react';
import AddAddressForm from '@/components/generic/AddAddressForm';
import { Text, Heading } from '@/components/ui/Text/Text';

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

interface FormData {
  shipping_address_id: string;
  shipping_method_id: string;
  payment_method_id: string;
  discount_code?: string;
  notes?: string;
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
  const { clearCart } = useCart();
  const { formatCurrency, currency, countryCode } = useLocale();
  const { 
    shippingMethods, 
    loading: shippingLoading, 
    error: shippingError,
    loadShippingMethods,
    getCheapestMethod 
  } = useShipping({ autoLoad: true });
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    shipping_address_id: '',
    shipping_method_id: '',
    payment_method_id: '',
    discount_code: '',
    notes: ''
  });
  
  // Data state
  const [addresses, setAddresses] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  
  // UI state
  const [loading, setLoading] = useState(false);
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
    debounce(async (data: any) => {
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
              .filter((w: any) => w.type === 'price_mismatch')
              .map((w: any) => w.message);
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
        const defaultAddress = addressesRes.data?.find((addr: any) => addr.is_default);
        if (defaultAddress && !formData.shipping_address_id) {
          setFormData(prev => ({ ...prev, shipping_address_id: defaultAddress.id }));
        }
      }

      if (paymentMethodsRes.success) {
        setPaymentMethods(paymentMethodsRes.data || []);
        // Auto-select default payment method
        const defaultPayment = paymentMethodsRes.data?.find((pm: any) => pm.is_default);
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
        // Clear cart silently (no toast) since we're showing order success message
        await clearCart(false);
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
        const errorMessages = errors.map((err: any) => err.message).join(', ');
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
        <Card variant="elevated">
          <Card.Body>
            <Text variant="body-sm" tone="secondary">{message}</Text>
          </Card.Body>
        </Card>
      );
    }

    return (
      <>
        <Card>
          <Card.Header>
            <Card.Title size="sm">Order Summary</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Text variant="caption">Subtotal:</Text>
                <Text variant="caption">{formatCurrency(pricingData.subtotal)}</Text>
              </div>
              
              <div className="flex justify-between">
                <Text variant="caption">Shipping ({pricingData.shipping.method_name}):</Text>
                <Text variant="caption">{formatCurrency(pricingData.shipping.cost)}</Text>
              </div>
              
              <div className="flex justify-between">
                <Text variant="caption">Tax ({(pricingData.tax.rate * 100).toFixed(2)}%):</Text>
                <Text variant="caption">{formatCurrency(pricingData.tax.amount)}</Text>
              </div>
              
              {pricingData.discount && (
                <div className="flex justify-between">
                  <Text variant="caption" className="text-success">Discount ({pricingData.discount.code}):</Text>
                  <Text variant="caption" className="text-success">-{formatCurrency(pricingData.discount.amount)}</Text>
                </div>
              )}
            </div>
            
            <Card.Divider />
            
            <div className="flex justify-between">
              <Text variant="caption" weight="medium">Total:</Text>
              <Text variant="caption" weight="medium">{formatCurrency(pricingData.total)}</Text>
            </div>
          </Card.Body>
        </Card>
        
        {priceValidationErrors.length > 0 && (
          <Card variant="outlined" className="mt-3 border-destructive/30">
            <Card.Body density="compact">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />
                <Text variant="caption" weight="medium" className="text-destructive">Price Verification</Text>
              </div>
              {priceValidationErrors.map((error, index) => (
                <Text key={index} variant="caption" className="text-destructive">{error}</Text>
              ))}
            </Card.Body>
          </Card>
        )}
      </>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <AnimatedLoader size="md" variant="spinner" />
        <span className="ml-2">Loading checkout...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Heading level={1} weight="medium">Checkout</Heading>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Shipping Address Section */}
            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary dark:text-primary-dark" />
                  <Card.Title size="sm">Shipping Address</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                {addresses.length > 0 ? (
                  <div className="space-y-3">
                    <RadioGroup
                      name="shipping_address"
                      value={formData.shipping_address_id}
                      onChange={(value) => updateFormData('shipping_address_id', value)}
                      options={addresses.map((address) => ({
                        value: address.id,
                        label: address.street,
                        description: `${address.city}, ${address.state} ${address.post_code}, ${address.country}`
                      }))}
                    />
                    <Link to="/account/addresses">
                      <Button
                        type="button"
                        variant="outline"
                        fullWidth={true}
                      >
                        Manage Addresses
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Text variant="body-sm" tone="secondary">No addresses found</Text>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddAddressForm(true)}
                    >
                      Add New Address
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Shipping Method Section */}
            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary dark:text-primary-dark" />
                  <Card.Title size="sm">Shipping Method</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                {shippingError && (
                  <Card variant="outlined" className="mb-4 border-destructive/30">
                    <Card.Body density="compact">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />
                        <Text variant="body-sm" weight="medium" className="text-destructive">Error Loading Shipping Methods</Text>
                      </div>
                      <Text variant="body-sm" className="text-destructive">{shippingError}</Text>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={loadShippingMethods}
                        className="mt-2"
                      >
                        Retry
                      </Button>
                    </Card.Body>
                  </Card>
                )}
                
                {shippingLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-16 bg-surface-elevated dark:bg-surface-elevated-dark rounded"></div>
                    <div className="h-16 bg-surface-elevated dark:bg-surface-elevated-dark rounded"></div>
                  </div>
                ) : shippingMethods.length > 0 ? (
                  <RadioGroup
                    name="shipping_method"
                    value={formData.shipping_method_id}
                    onChange={(value) => {
                      const method = shippingMethods.find(m => m.id === value);
                      console.log('✅ Shipping method selected:', value, method?.name, method?.price);
                      updateFormData('shipping_method_id', value);
                    }}
                    options={shippingMethods.map((method) => ({
                      value: method.id,
                      label: method.name,
                      description: (
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <Text variant="caption" tone="secondary">{method.description}</Text>
                          <div className="text-right">
                            <Text variant="body-sm" weight="medium">{formatCurrency(method.price)}</Text>
                            <Text variant="caption" tone="secondary">{method.estimated_days}d</Text>
                          </div>
                        </div>
                      )
                    }))}
                  />
                ) : (
                  <Text variant="body-sm" tone="secondary">No shipping methods available</Text>
                )}
              </Card.Body>
            </Card>

            {/* Payment Method Section */}
            <Card>
              <Card.Header>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary dark:text-primary-dark" />
                  <Card.Title size="sm">Payment Method</Card.Title>
                </div>
              </Card.Header>
              <Card.Body>
                {paymentMethods.length > 0 ? (
                  <RadioGroup
                    name="payment_method"
                    value={formData.payment_method_id}
                    onChange={(value) => {
                      const method = paymentMethods.find(m => m.id === value);
                      console.log('✅ Payment method selected:', value, method?.type);
                      updateFormData('payment_method_id', value);
                    }}
                    options={paymentMethods.map((method) => ({
                      value: method.id,
                      label: method.type === 'credit_card' ? 'Credit Card' : method.type,
                      description: `**** **** **** ${method.last_four}`
                    }))}
                  />
                ) : (
                  <div className="text-center py-4">
                    <Text variant="body-sm" tone="secondary" className="mb-3">No payment methods available</Text>
                    <Link to="/account/payment-methods">
                      <Button type="button" variant="outline" fullWidth={true}>
                        Add Payment Method
                      </Button>
                    </Link>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Order Notes */}
            <Card>
              <Card.Header>
                <Card.Title size="sm">Order Notes (Optional)</Card.Title>
              </Card.Header>
              <Card.Body>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) => updateFormData('notes', e.target.value)}
                  placeholder="Special instructions for your order..."
                  rows={3}
                />
              </Card.Body>
            </Card>

            {/* Validation Errors */}
            {realTimeValidation.errors && realTimeValidation.errors.length > 0 && (
              <div className="bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark" />
                  <span className="font-medium text-destructive dark:text-destructive-dark">Please fix the following issues:</span>
                </div>
                <ul className="list-disc list-inside text-sm text-destructive dark:text-destructive-dark space-y-1">
                  {realTimeValidation.errors.map((error: any, index: number) => (
                    <li key={index}>{typeof error === 'string' ? error : error.message}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!realTimeValidation.can_proceed || processingPayment}
              variant="primary"
              fullWidth={true}
              isLoading={processingPayment}
              className="py-2 text-xs font-medium"
            >
              {processingPayment ? 'Processing Payment...' : 'Complete Order'}
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
                    realTimeValidation.can_proceed ? 'text-success dark:text-success-dark' : `text-destructive dark:text-destructive-dark`}`}>
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
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50" onClick={() => setShowAddAddressForm(false)}>
          <div className="bg-surface dark:bg-surface-dark rounded-lg p-6 max-w-md w-full mx-4 border border-border-light dark:border-border-dark" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};

export default SmartCheckoutForm;
