import React, { useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import { PaymentsAPI } from '../../api/payments';
import { Button } from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

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

    setError(null);
    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Create payment method using Stripe Elements
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardholderName,
        },
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
        <input
          type="text"
          className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-lg bg-surface dark:bg-surface-dark text-copy dark:text-copy-dark text-xs focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          placeholder="John Doe"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Card Details using Stripe Elements */}
      <div>
        <label className="block text-xs font-medium text-copy dark:text-copy-dark mb-2">
          Card Details
        </label>
        <div className="p-3 border border-border-light dark:border-border-dark rounded-lg bg-surface dark:bg-surface-dark">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-destructive dark:text-destructive-dark flex-shrink-0 mt-0.5" />
          <p className="text-xs text-destructive dark:text-destructive-dark">{error}</p>
        </div>
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
