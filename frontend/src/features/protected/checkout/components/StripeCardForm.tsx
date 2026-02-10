import React, { useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { PaymentsAPI } from '@/api/payments';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import { Text, Label } from '@/components/ui/Text/Text';
import { Input } from '@/components/ui/Form';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

interface StripeCardFormProps {
  onSuccess: (paymentMethod: any) => void;
  onCancel: () => void;
}

/**
 * Card element form component using Stripe Elements
 */
const CardFormElement: React.FC<StripeCardFormProps> = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      toast.error('Stripe is not loaded');
      return;
    }

    if (!cardholderName.trim()) {
      setError('Cardholder name is required');
      return;
    }

    // ZIP code is optional - only validate if provided
    if (zipCode.trim() && zipCode.length < 3) {
      setError('ZIP code must be at least 3 characters if provided');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method using Stripe Elements
      const billingDetails: any = {
        name: cardholderName,
      };
      
      // Only include address if ZIP code is provided
      if (zipCode.trim()) {
        billingDetails.address = {
          postal_code: zipCode,
          country: 'US',
        };
      }
      
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (stripeError) {
        setError(stripeError.message || 'Failed to create payment method');
        setLoading(false);
        return;
      }

      if (!paymentMethod) {
        setError('Failed to create payment method');
        setLoading(false);
        return;
      }

      // Send payment method to backend
      const payload = {
        stripe_payment_method_id: paymentMethod.id,
        type: 'card',
        provider: paymentMethod.card?.brand || 'unknown',
        last_four: paymentMethod.card?.last4 || '',
        expiry_month: paymentMethod.card?.exp_month || 0,
        expiry_year: paymentMethod.card?.exp_year || 0,
        is_default: false,
      };

      const result = await PaymentsAPI.addPaymentMethod(payload);
      
      if (result && (result.success || result.data)) {
        const newPaymentMethod = result.success ? result.data : result;
        toast.success('Payment method added successfully');
        onSuccess(newPaymentMethod);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Failed to add payment method';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isDarkMode = document.documentElement.classList.contains('dark');

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '14px',
        color: isDarkMode ? '#f3f4f6' : '#374151',
        '::placeholder': {
          color: isDarkMode ? '#9ca3af' : '#9ca3af',
        },
      },
      invalid: {
        color: '#ef4444',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Cardholder Name */}
      <div>
        <label className="block text-xs font-medium text-copy dark:text-copy-dark mb-2">
          Cardholder Name
        </label>
        <Input
          type="text"
          placeholder="John Doe"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          disabled={loading}
          className="w-full"
        />
      </div>

      {/* ZIP Code */}
      <div>
        <Label className="block text-xs font-medium text-copy dark:text-copy-dark mb-2">
          ZIP Code (Optional)
        </Label>
        <Input
          type="text"
          placeholder="12345 (US only)"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
          disabled={loading}
          maxLength={5}
          className="w-full"
        />
        <Text variant="caption" className="text-gray-500 dark:text-gray-400 mt-1">
          Required for US cards, optional for international cards
        </Text>
      </div>

      {/* Card Details using Stripe Elements */}
      <div>
        <Label className="block text-xs font-medium text-copy dark:text-copy-dark mb-2">
          Card Details
        </Label>
        <div className="p-3 border border-border-light dark:border-border-dark rounded-lg bg-surface dark:bg-surface-dark">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Text className="flex items-start gap-2 p-3 bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30 rounded-lg text-xs text-destructive dark:text-destructive-dark">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          {error}
        </Text>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 text-xs font-medium"
        >
          {loading ? 'Adding Card...' : 'Add Card'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 text-xs font-medium"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

/**
 * Stripe Card Form Component with Elements Provider
 */
export const StripeCardForm: React.FC<StripeCardFormProps> = ({ onSuccess, onCancel }) => {
  return (
    <Elements stripe={stripePromise}>
      <CardFormElement onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  );
};

export default StripeCardForm;
