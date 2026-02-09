import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, PlusCircle, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApi } from '../../../shared/hooks/useAsync';
import { PaymentsAPI } from '@/api/payments';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { TokenManager } from '../../api/client';
import { StripeCardForm } from '../checkout/StripeCardForm';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';



/**
 * PaymentMethods component allows users to view, add, edit, delete, and set default payment methods.
 */
export const PaymentMethods = () => {
  // Custom hook to fetch payment methods from the API
  const { data: paymentMethods, loading, error, execute: fetchPaymentMethods } = useApi();
  // Local state for managing payment methods
  const [localPaymentMethods, setLocalPaymentMethods] = useState<any[]>([]);
  // State to control the visibility of the add card form
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [addingCard, setAddingCard] = useState(false);

  // Check if user came from checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('from') === 'checkout') {
      toast.success('Add a payment method to complete your checkout!', { duration: 5000 });
    }
  }, []);

  // Effect hook to fetch payment methods on component mount
  useEffect(() => {
    console.log('PaymentMethods: Fetching payment methods...');
    console.log('PaymentMethods: Token available:', !!TokenManager.getToken());
    fetchPaymentMethods(PaymentsAPI.getPaymentMethods);
  }, [fetchPaymentMethods]);

  // Sync local state with fetched data
  useEffect(() => {
    if (paymentMethods) {
      // Handle the Response.success wrapper structure
      const data = (paymentMethods as any)?.success ? (paymentMethods as any).data : paymentMethods;
      setLocalPaymentMethods(Array.isArray(data) ? data : []);
    }
  }, [paymentMethods]);

  /**
   * Handles setting a payment method as default.
   * @param {string} id - The ID of the payment method to set as default.
   */
  const handleSetDefault = async (id: string) => {
    try {
      const response = await PaymentsAPI.setDefaultPaymentMethod(id);
      if (response.success) {
        // Update the local state to reflect the new default payment method
        setLocalPaymentMethods(localPaymentMethods?.map((pm: any) => ({ ...pm, is_default: pm.id === id })));
        toast.success('Default payment method updated');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to set default payment method';
      toast.error(errorMessage);
    }
  };

  /**
   * Handles deleting a payment method.
   * @param {string} id - The ID of the payment method to delete.
   */
  const handleDeleteCard = async (id: string) => {
    try {
      const response = await PaymentsAPI.deletePaymentMethod(id);
      if (response.success || response.message) {
        // Remove the deleted payment method from the local state
        setLocalPaymentMethods(localPaymentMethods?.filter((pm: any) => pm.id !== id));
        toast.success('Payment method removed');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to remove payment method';
      toast.error(errorMessage);
    }
  };

  /**
   * Handles adding a new card using Stripe Elements
   */
  const handleAddCardSuccess = (paymentMethod: any) => {
    setLocalPaymentMethods(localPaymentMethods ? [...localPaymentMethods, paymentMethod] : [paymentMethod]);
    resetForm();
  };

  /**
   * Resets the add card form
   */
  const resetForm = () => {
    setShowAddCardForm(false);
  };

  /**
   * Returns an SVG icon for a given card type provider.
   * @param {string} type - The type of card provider (e.g., 'visa', 'mastercard').
   * @returns {JSX.Element} The SVG icon component.
   */
  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="#F9F9F9" />
            <path d="M18.7 21.1H15.9L17.7 11H20.5L18.7 21.1Z" fill="#00579F" />
            <path d="M28.5 11.3C27.9 11.1 27 10.9 25.9 10.9C23.3 10.9 21.4 12.3 21.4 14.2C21.4 15.7 22.7 16.5 23.8 17C24.8 17.5 25.2 17.8 25.2 18.3C25.2 19 24.4 19.3 23.6 19.3C22.5 19.3 21.9 19.1 21 18.7L20.6 18.5L20.2 20.9C20.9 21.2 22.1 21.4 23.3 21.4C26.1 21.4 27.9 20 27.9 18C27.9 16.8 27.2 15.9 25.6 15.2C24.6 14.7 24 14.4 24 13.9C24 13.4 24.5 13 25.5 13C26.3 13 26.9 13.2 27.4 13.4L27.7 13.5L28.1 11.3H28.5Z" fill="#00579F" />
            <path d="M32.7 17.5C32.9 16.9 33.7 14.6 33.7 14.6C33.7 14.6 33.9 14.1 34 13.8L34.1 14.5C34.1 14.5 34.6 16.9 34.7 17.5H32.7ZM36 11H33.9C33.3 11 32.8 11.2 32.5 11.8L28.9 21.1H31.7C31.7 21.1 32.1 20 32.2 19.7C32.5 19.7 35.1 19.7 35.5 19.7C35.6 20.1 35.8 21.1 35.8 21.1H38.3L36 11Z" fill="#00579F" />
            <path d="M14.1 11L11.5 18L11.2 16.8C10.7 15.3 9.1 13.7 7.3 12.9L9.7 21.1H12.5L16.9 11H14.1Z" fill="#00579F" />
            <path d="M9.4 11.9C9.2 11.8 8.8 11.7 8.3 11.7C6.5 11.7 5.1 12.7 5.1 14.1C5.1 15.2 6.1 15.8 6.9 16.2C7.7 16.6 7.9 16.9 7.9 17.2C7.9 17.7 7.3 17.9 6.8 17.9C6.1 17.9 5.5 17.8 5 17.5L4.7 17.4L4.5 19.3C4.8 19.4 5.5 19.6 6.3 19.6C8.2 19.6 9.6 18.6 9.6 17.1C9.6 16.2 9 15.5 7.8 14.9C7.1 14.5 6.6 14.2 6.6 13.8C6.6 13.5 6.9 13.1 7.7 13.1C8.3 13.1 8.8 13.2 9.2 13.4L9.4 13.5L9.7 12L9.4 11.9Z" fill="#FAA61A" />
          </svg>;
      case 'mastercard':
        return <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="#F9F9F9" />
            <path d="M30 10H18V22H30V10Z" fill="#FF5F00" />
            <path d="M19 16C19 13.6 20.3 11.5 22.2 10.3C21 9.5 19.6 9 18 9C14.1 9 11 12.1 11 16C11 19.9 14.1 23 18 23C19.6 23 21 22.5 22.2 21.7C20.3 20.5 19 18.4 19 16Z" fill="#EB001B" />
            <path d="M37 16C37 19.9 33.9 23 30 23C28.4 23 27 22.5 25.8 21.7C27.7 20.5 29 18.4 29 16C29 13.6 27.7 11.5 25.8 10.3C27 9.5 28.4 9 30 9C33.9 9 37 12.1 37 16Z" fill="#F79E1B" />
          </svg>;
      case 'amex':
        return <svg className="w-8 h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="32" rx="4" fill="#F9F9F9" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9 11H39V21H9V11Z" fill="#006FCF" />
            <path d="M19.5 18.5L20.5 16.3L21.5 18.5H19.5ZM29 17H27V15.5H29V14H27V12.5H29V11H25.5V18.5H29V17ZM24 11L22 14.5L20 11H18V18.3L14 11H12.5L9 18.5H11L11.8 16.8H15.3L16 18.5H20V14L22 18.5L24 14V18.5H25.5V11H24ZM34.5 18.5H36.5L33.5 14.8L36.3 11H34.3L32.5 13.3L30.7 11H28.5L31.2 14.7L28.2 18.5H30.2L32.3 15.9L34.5 18.5Z" fill="white" />
          </svg>;
      default:
        return <CreditCard size={24} />;
    }
  };

  // Display loading message while payment methods are being fetched
  if (loading) {
    return <div className="p-6 text-center text-copy-light">Loading payment methods...</div>
  }

  // Display error message if fetching payment methods failed
  if (error) {
    return <div className="p-6 text-center text-error">Error: {error.message}</div>
  }

  return (
    <div className="p-6">
      {/* Show back to checkout button if user came from checkout */}
      {(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('from') === 'checkout' && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary font-medium">Complete Your Checkout</p>
                <p className="text-sm text-copy-light">Add a payment method to finish placing your order.</p>
              </div>
              <Link
                to="/checkout"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
              >
                Back to Checkout
              </Link>
            </div>
          </div>
        );
      })()}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 mb-3">
        <div className="flex justify-between items-center mb-3">
          <Heading level={2} className="text-base font-medium text-main dark:text-white">
            Saved Payment Methods
          </Heading>
          {/* Button to toggle the add card form */}
          <Button
            onClick={() => setShowAddCardForm(!showAddCardForm)} 
            variant="ghost"
            size="sm"
          >
            <Text className="flex items-center text-primary hover:text-primary-dark text-xs">
              <PlusCircle size={14} className="mr-1" />
              Add New Card
            </Text>
          </Button>
        </div>
        {/* Display existing payment methods or a message if none are saved */}
        {localPaymentMethods && localPaymentMethods.length > 0 ? (
          <div className="space-y-3">
            {localPaymentMethods.map((method: any) => (
              <div key={method.id} className={`border rounded-lg p-3 ${method.is_default ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">{getCardIcon(method.brand || method.provider)}</span>
                    <div>
                      <p className="text-xs font-medium text-main dark:text-white">
                        {method.brand?.charAt(0).toUpperCase() + method.brand?.slice(1) || method.provider?.charAt(0).toUpperCase() + method.provider?.slice(1)}{' '}
                        •••• {method.last_four}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Expires {method.expiry_month}/{method.expiry_year}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {/* Set as default button or default badge */}
                    {method.is_default ? (
                      <span className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded mr-2">
                        <CheckCircle size={12} className="mr-1" /> Default
                      </span>
                    ) : (
                      <Button onClick={() => handleSetDefault(method.id)} className="text-xs text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary mr-2" variant="ghost" size="sm">
                        Set as default
                      </Button>
                    )}
                    {/* Delete button */}
                    <Button 
                      onClick={() => handleDeleteCard(method.id)} 
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1" 
                      disabled={method.is_default}
                      title={method.is_default ? "Cannot delete default payment method" : "Delete payment method"}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <CreditCard size={36} className="mx-auto text-gray-400 mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
              No payment methods saved yet
            </p>
            <Button onClick={() => setShowAddCardForm(true)} className="text-primary hover:underline text-xs" variant="link" size="sm">
              Add your first payment method
            </Button>
          </div>
        )}
        {/* Add Card Form */}
        {showAddCardForm && (
          <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
            <Heading level={3} className="text-base font-medium text-main dark:text-white mb-3">
              Add New Payment Method
            </Heading>
            <StripeCardForm
              onSuccess={handleAddCardSuccess}
              onCancel={() => resetForm()}
            />
          </div>
        )}
      </div>
      {/* Payment Security Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <Heading level={2} className="text-lg font-medium text-main dark:text-white mb-4">
          Payment Security
        </Heading>
        <Body className="text-gray-600 dark:text-gray-300 mb-3">
          Your payment information is securely stored using industry-standard
          encryption. We never store your full card details on our servers.
        </Body>
        <Body className="text-gray-600 dark:text-gray-300">
          All transactions are processed through our secure payment gateway
          partners and comply with PCI DSS standards.
        </Body>
      </div>
    </div>
  );
};
