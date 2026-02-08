import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CreditCard, Banknote, Smartphone } from 'lucide-react';
import PaymentsAPI from '@/api/payments';
import StripePaymentForm from '../../payments/components/StripePaymentForm';
import { toast } from 'react-hot-toast';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'digital';
  name: string;
  details: string;
  provider?: string;
  last_four?: string;
  expiry_month?: number | string;
  expiry_year?: number | string;
  stripe_payment_method_id?: string;
  stripe_token?: string;
  isDefault: boolean;
  createdAt: string;
}

const AccountPaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    provider: '',
    last_four: '',
    expiry_month: '',
    expiry_year: '',
    isDefault: false,
    stripe_payment_method_id: '',
    stripe_token: '',
  });
  const [showStripeForm, setShowStripeForm] = useState(false);

  const fetchMethods = async () => {
    setIsLoading(true);
    try {
      const response = await PaymentsAPI.getPaymentMethods();
      setPaymentMethods(response.data || []);
    } catch {
      setPaymentMethods([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const methodPayload = {
      type: 'card',
      provider: formData.provider,
      last_four: formData.last_four,
      expiry_month: Number(formData.expiry_month),
      expiry_year: Number(formData.expiry_year),
      is_default: formData.isDefault,
      stripe_payment_method_id: formData.stripe_payment_method_id || undefined,
      stripe_token: formData.stripe_token || undefined,
    };
    try {
      if (editingMethod) {
        await PaymentsAPI.updatePaymentMethod(editingMethod.id, methodPayload);
      } else {
        await PaymentsAPI.addPaymentMethod(methodPayload);
      }
      await fetchMethods();
    } catch {}
    resetForm();
  };

  const handleEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    setFormData({
      provider: method.provider || '',
      last_four: method.last_four || (method.details ? String(method.details).slice(-4) : ''),
      expiry_month: method.expiry_month ? String(method.expiry_month) : '',
      expiry_year: method.expiry_year ? String(method.expiry_year) : '',
      isDefault: method.isDefault,
      stripe_payment_method_id: method.stripe_payment_method_id || '',
      stripe_token: method.stripe_token || '',
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await PaymentsAPI.deletePaymentMethod(id);
      await fetchMethods();
    } catch {}
  };

  const setAsDefault = async (id: string) => {
    setIsLoading(true);
    try {
      await PaymentsAPI.setDefaultPaymentMethod(id);
      await fetchMethods();
    } catch {}
  };

  const resetForm = () => {
    setFormData({
      provider: '',
      last_four: '',
      expiry_month: '',
      expiry_year: '',
      isDefault: false,
      stripe_payment_method_id: '',
      stripe_token: '',
    });
    setEditingMethod(null);
    setShowAddForm(false);
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

  const handleStripeSuccess = async (paymentMethodId: string) => {
    // Save the Stripe payment method id to backend so backend can attach/store it
    setShowStripeForm(false);
    setIsLoading(true);
    try {
      await PaymentsAPI.addPaymentMethod({ type: 'card', stripe_payment_method_id: paymentMethodId, is_default: formData.isDefault });
      await fetchMethods();
      toast.success('Card saved');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save card');
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  const handleStripeError = (error: string) => {
    setShowStripeForm(false);
    toast.error(error);
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
        <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
        <button
          onClick={() => {
            setShowAddForm(true);
            setShowStripeForm(true);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          <Plus className="w-5 h-5" /> Add
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-base font-semibold mb-3">
            {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
          </h3>
          {/* Adding new payment methods must be done via Stripe form only. If editing an existing method, allow the edit form. */}
          {(!editingMethod || showStripeForm) && (
            <StripePaymentForm
              orderId={null}
              amount={null}
              currency={null}
              onPaymentSuccess={handleStripeSuccess}
              onPaymentError={handleStripeError}
            />
          )}

          {editingMethod && !showStripeForm && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Provider</label>
                <select
                  value={formData.provider}
                  onChange={e => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  required
                >
                  <option value="">Select provider</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="discover">Discover</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Four Digits</label>
                <input
                  type="text"
                  value={formData.last_four}
                  onChange={e => setFormData({ ...formData, last_four: e.target.value.slice(-4) })}
                  placeholder="e.g., 4242"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  maxLength={4}
                  required
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Month</label>
                  <input
                    type="number"
                    value={formData.expiry_month}
                    onChange={e => setFormData({ ...formData, expiry_month: e.target.value })}
                    min={1}
                    max={12}
                    placeholder="MM"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Year</label>
                  <input
                    type="number"
                    value={formData.expiry_year}
                    onChange={e => setFormData({ ...formData, expiry_year: e.target.value })}
                    min={2000}
                    placeholder="YYYY"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={e => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Set as default</label>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.length === 0 ? (
          <div className="text-center py-6 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">No payment methods</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Add a payment method to make checkout faster</p>
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setShowStripeForm(true);
                }}
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
              >
                Add Payment Method
              </button>
          </div>
        ) : (
          paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
                method.isDefault 
                  ? 'border-primary dark:border-primary' 
                  : 'border-gray-200 dark:border-gray-700'
              } p-4 md:p-4 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded-md ${
                  method.isDefault 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {getPaymentIcon(method.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0">
                    <h3 className="font-medium text-sm md:text-base text-gray-900 dark:text-white">{method.name}</h3>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary dark:bg-primary/20 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-0">{method.details}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Added on {new Date(method.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => setAsDefault(method.id)}
                    className="p-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    title="Set as default"
                  >
                    <CreditCard className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleEdit(method)}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { AccountPaymentMethodsPage };
export default AccountPaymentMethodsPage;
