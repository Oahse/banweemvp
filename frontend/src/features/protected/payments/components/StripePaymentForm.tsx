import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';
import apiClient from '@/api';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface StripePaymentFormProps {
  orderId?: string | null;
  amount?: number | null;
  currency?: string | null;
  onPaymentSuccess: (paymentMethodId: string) => void;
  onPaymentError: (msg: string) => void;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  orderId = null,
  amount = null,
  currency = null,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to add a card.');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Check for secure context: allow https or localhost
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    const secure = protocol === 'https:' || host === 'localhost' || host === '127.0.0.1';
    setIsSecure(secure);
  }, []);

  useEffect(() => {
    // Initialize payment intent / setup intent on mount if amount or orderId provided
    const init = async () => {
      if (!isAuthenticated) return;
      if (!isSecure) {
        toast.error('Payment requires a secure (HTTPS) connection.');
        onPaymentError('Insecure connection');
        setInitializing(false);
        return;
      }

      try {
        setInitializing(true);
        // For adding payment methods, we don't need amount/order_id
        // Just create a setup intent or use minimal amount
        const payload = { 
          amount: amount || 1.00, // Minimum amount for validation
          currency: currency || "USD",
          order_id: orderId || null
        };
        // call backend to create a PaymentIntent (backend should set automatic_payment_methods if needed)
        const resp: any = await apiClient.post('/payments/intents', payload);
        const cs = resp?.client_secret || resp?.data?.client_secret || null;
        if (cs) {
          setClientSecret(cs);
        } else {
          throw new Error('No client secret returned');
        }
      } catch (err: any) {
        console.error('Failed to initialize payment', err);
        if (err?.statusCode === 401) {
          toast.error('Please log in again to add payment methods');
          onPaymentError('Authentication required');
        } else if (err?.statusCode === 422) {
          toast.error('Invalid payment information');
          onPaymentError('Invalid payment information');
        } else {
          toast.error('Failed to initialize payment. Please try again.');
          onPaymentError('Failed to initialize payment.');
        }
      } finally {
        setInitializing(false);
      }
    };

    init();
  }, [isAuthenticated, orderId, amount, currency, isSecure, onPaymentError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    if (!clientSecret) {
      onPaymentError('Payment not initialized');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onPaymentError('Card element not found');
      return;
    }

    setLoading(true);
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: (user as any)?.name || (user as any)?.full_name || undefined,
            email: (user as any)?.email || undefined,
          },
        },
      });

      if (result.error) {
        console.error('Stripe confirmCardPayment error', result.error);
        toast.error(result.error.message || 'Payment failed');
        onPaymentError(result.error.message || 'Payment failed');
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        onPaymentSuccess(result.paymentIntent.id);
      } else {
        const status = result.paymentIntent?.status || 'unknown';
        toast.error(`Payment not successful. Status: ${status}`);
        onPaymentError(`Payment not successful. Status: ${status}`);
      }
    } catch (err) {
      console.error('Stripe confirmCardPayment exception', err);
      toast.error('Payment failed');
      onPaymentError('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // Detect theme for styling
  const prefersDark = typeof window !== 'undefined' && (document.documentElement.classList.contains('dark') || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const cardStyle = {
    base: {
      fontSize: '14px',
      color: prefersDark ? '#e5e7eb' : '#111827',
      '::placeholder': { color: prefersDark ? '#9ca3af' : '#6b7280' },
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    },
    invalid: { color: '#ef4444' },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {initializing ? (
          <div className="text-sm text-gray-500">Loading payment options...</div>
        ) : !isSecure ? (
          <div className="text-sm text-red-600">Payment requires a secure (HTTPS) connection.</div>
        ) : (
          <CardElement options={{ style: cardStyle }} />
        )}
      </div>
      <button
        type="submit"
        disabled={!stripe || !elements || loading || initializing || !isSecure || !clientSecret}
        className="w-full bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? 'Processing...' : (orderId || amount ? 'Pay Now' : 'Add Card')}
      </button>
    </form>
  );
};

export default StripePaymentForm;
