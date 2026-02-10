import { useState, useEffect } from 'react';
import { Plus, Trash2, CreditCard, Banknote, Smartphone, CheckCircle } from 'lucide-react';
import { Text, Heading, Body, Caption, Code } from '@/components/ui/Text/Text';
import PaymentsAPI from '@/api/payments';
import StripeCardForm from '@/checkout/components/StripeCardForm';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';

interface PaymentMethod {
  id: string;
  user_id: string;
  type: string;
  provider: string;
  last_four: string;
  expiry_month?: number;
  expiry_year?: number;
  brand?: string;
  stripe_payment_method_id?: string;
  is_default: boolean;
  is_active: boolean;
  payment_method_metadata?: any;
  created_at: string;
  updated_at?: string;
}

const AccountPaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showStripeForm, setShowStripeForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{id: string, provider: string, lastFour: string} | null>(null);

  const fetchMethods = async () => {
    console.log('Fetching payment methods...');
    setIsLoading(true);
    try {
      const response = await PaymentsAPI.getPaymentMethods();
      console.log('Payment methods response:', response);
      setPaymentMethods(response.data || []);
      console.log('Set payment methods:', response.data || []);
    } catch (error: any) {
      console.error('Failed to fetch payment methods:', error);
      if (error?.statusCode === 401) {
        toast.error('Please log in again to manage payment methods');
      } else {
        toast.error('Failed to load payment methods');
      }
      setPaymentMethods([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);


  const handleDelete = (method: PaymentMethod) => {
    setDeleteConfirm({
      id: method.id,
      provider: method.provider,
      lastFour: method.last_four || ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    
    setIsLoading(true);
    try {
      await PaymentsAPI.deletePaymentMethod(deleteConfirm.id);
      await fetchMethods();
      setDeleteConfirm(null);
      toast.success('Payment method deleted');
    } catch (error) {
      console.error('Failed to delete payment method:', error);
      toast.error('Failed to delete payment method');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const setAsDefault = async (id: string) => {
    console.log('Setting payment method as default:', id);
    setIsLoading(true);
    try {
      const response = await PaymentsAPI.setDefaultPaymentMethod(id);
      console.log('Set default response:', response);
      await fetchMethods();
      console.log('Fetched methods after setting default');
      toast.success('Default payment method updated');
    } catch (error) {
      console.error('Failed to set default payment method:', error);
      toast.error('Failed to set default payment method');
    } finally {
      setIsLoading(false);
    }
  };


  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'bank':
        return <Banknote className="w-5 h-5" />;
      case 'digital':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const handleCardSuccess = async (paymentMethod: any) => {
    setShowStripeForm(false);
    await fetchMethods();
    toast.success('Payment method added successfully');
  };

  const handleCardCancel = () => {
    setShowStripeForm(false);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading level={1} className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Payment Methods</Heading>
        <Button
          onClick={() => setShowStripeForm(true)}
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-5 h-5" />}
        >
          Add Payment Method
        </Button>
      </div>

      {showStripeForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <Heading level={3} className="text-base font-semibold">Add Payment Method</Heading>
            <Button
              onClick={() => setShowStripeForm(false)}
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </Button>
          </div>
          <StripeCardForm
            onSuccess={handleCardSuccess}
            onCancel={handleCardCancel}
          />
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-6 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <Heading level={3} className="text-sm font-medium text-gray-900 dark:text-white mb-1">No payment methods</Heading>
              <Caption className="text-xs text-gray-500 dark:text-gray-400 mb-2">Add a payment method to make checkout faster</Caption>
              <Button
                onClick={() => setShowStripeForm(true)}
                variant="primary"
                size="sm"
              >
                Add Payment Method
              </Button>
          </div>
        ) : (
          paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
                method.is_default 
                  ? 'border-primary dark:border-primary' 
                  : 'border-gray-200 dark:border-gray-700'
              } p-4 md:p-4 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded-md ${
                  method.is_default 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {getPaymentIcon(method.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0">
                    <Heading level={3} className="font-medium text-sm md:text-base text-gray-900 dark:text-white">
                      {method.type === 'card' ? (
                        method.provider ? method.provider.charAt(0).toUpperCase() + method.provider.slice(1) : 'Card'
                      ) : (
                        method.provider || 'Payment Method'
                      )}
                    </Heading>
                    {method.is_default && (
                      <Caption className="px-2 py-0.5 text-xs bg-primary/10 text-primary dark:bg-primary/20 rounded-full">Default</Caption>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-0">
                    {method.type === 'card' && method.last_four && (
                      <div>
                        <Heading level={4}>Card Details</Heading>
                        <Text variant="body-sm" tone="secondary">•••• {method.last_four}</Text>
                        <Text variant="caption" tone="secondary">Valid thru {method.expiry_month ?? 'MM'}/{method.expiry_year ? String(method.expiry_year).slice(-2) : 'YY'}</Text>
                      </div>
                    )}

                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded mt-2">
                      <Text variant="body-sm">
                        <Text as="span">{method.provider || 'Payment Method'}</Text>
                        {deleteConfirm?.lastFour && <Text as="span"> {` •••• ${deleteConfirm.lastFour}`}</Text>}
                      </Text>
                      <Text variant="caption" tone="secondary" className="mt-1">Added on {method.created_at ? new Date(method.created_at).toLocaleDateString() : 'Unknown date'}</Text>
                    </div>
                  </div>
                </div>
              <div className="flex items-center gap-2">
                {!method.is_default && (
                  <Button
                    onClick={() => setAsDefault(method.id)}
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                    title="Set as default"
                  >
                    <CreditCard className="w-5 h-5" />
                  </Button>
                )}
                <Button
                  onClick={() => handleDelete(method)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <Heading level={3}>Delete Payment Method</Heading>
                <Text variant="body-sm" tone="secondary">This action cannot be undone</Text>
              </div>
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <Text variant="body-sm" tone="secondary">
                {deleteConfirm.provider ? deleteConfirm.provider.charAt(0).toUpperCase() + deleteConfirm.provider.slice(1) : 'Card'} 
                {deleteConfirm.lastFour && ` •••• ${deleteConfirm.lastFour}`}
              </Text>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={cancelDelete}
                disabled={isLoading}
                variant="secondary"
                size="sm"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={isLoading}
                variant="danger"
                size="sm"
                className="flex-1"
                isLoading={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPaymentMethodsPage;
