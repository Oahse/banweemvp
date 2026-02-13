import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription } from '@/features/protected/subscriptions/contexts/SubscriptionContext';
import { Button } from '@/components/ui/Button';
import { Text, Heading, Caption } from '@/components/ui/Text/Text';
import { Checkbox } from '@/components/ui/Form/Checkbox';
import { Dropdown } from '@/components/ui/Dropdown';
import { 
  ArrowLeft,
  Calendar,
  Package,
  Save
} from 'lucide-react';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import { toast } from 'react-hot-toast';

const AccountMySubscriptionEditPage = () => {
  const { subscriptionId } = useParams<{ subscriptionId: string }>();
  const navigate = useNavigate();
  const { 
    subscriptions, 
    loading,
    updateSubscription
  } = useSubscription();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    billing_cycle: 'monthly' as 'weekly' | 'monthly' | 'yearly',
    auto_renew: true
  });

  const subscription = subscriptions?.find(sub => sub.id === subscriptionId);

  useEffect(() => {
    if (!loading && !subscription) {
      toast.error('Subscription not found');
      navigate('/account/subscriptions');
    }
    
    if (subscription) {
      setFormData({
        name: subscription.name || '',
        billing_cycle: subscription.billing_cycle || 'monthly',
        auto_renew: subscription.auto_renew ?? true
      });
    }
  }, [loading, subscription, navigate]);

  if (loading || !subscription) {
    return (
      <div className="flex items-center justify-center h-64">
        <AnimatedLoader size="lg" variant="spinner" color="primary" text="Loading subscription..." />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      console.log('Updating subscription with data:', formData);
      const result = await updateSubscription(subscription.id, formData);
      
      if (result) {
        toast.success('Subscription updated successfully');
        navigate(`/account/subscriptions/${subscription.id}`);
      } else {
        toast.error('Failed to update subscription - no result returned');
      }
    } catch (error: any) {
      console.error('Update subscription error:', error);
      toast.error(error?.message || 'Failed to update subscription');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate(`/account/subscriptions/${subscription.id}`)} 
            variant="ghost" 
            size="xs"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            <Text variant="body-sm">Back</Text>
          </Button>
          <div>
            <Heading level={5} weight="bold">Edit Subscription</Heading>
            <Caption tone="secondary">Update your subscription details</Caption>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <Heading level={5} weight="semibold" className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Subscription Details
          </Heading>

          <div className="space-y-4">
            {/* Subscription Name */}
            <div>
              <label className="block mb-2">
                <Text variant="body-sm" weight="medium">Subscription Name</Text>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="My Subscription"
                required
              />
            </div>

            {/* Billing Cycle */}
            <div>
              <label className="block mb-2">
                <Text variant="body-sm" weight="medium">Billing Cycle</Text>
              </label>
              <Dropdown
                options={[
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'yearly', label: 'Yearly' }
                ]}
                value={formData.billing_cycle}
                onChange={(value) => handleChange('billing_cycle', value)}
                placeholder="Select billing cycle"
              />
            </div>

            {/* Auto Renew */}
            <div>
              <Checkbox
                checked={formData.auto_renew}
                onChange={(e) => handleChange('auto_renew', e.target.checked)}
                label="Enable Auto-Renew"
                description="Automatically renew this subscription"
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Current Products (Read-only for now) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Heading level={5} weight="semibold" className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5" />
            Products ({subscription.products?.length || 0})
          </Heading>
          
          {subscription.products && subscription.products.length > 0 ? (
            <div className="space-y-3">
              {subscription.products.map((product: any) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    )}
                    <div>
                      <Text variant="body-sm" weight="medium">{product.name}</Text>
                      <Caption tone="secondary">Quantity: {product.quantity || 1}</Caption>
                    </div>
                  </div>
                  <Text variant="body-sm" weight="medium">${product.price?.toFixed(2)}</Text>
                </div>
              ))}
            </div>
          ) : (
            <Caption tone="secondary">No products in this subscription</Caption>
          )}
          
          <div className="mt-4">
            <Caption tone="secondary">To modify products, please contact support or cancel and create a new subscription.</Caption>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={saving}
            leftIcon={saving ? <AnimatedLoader size="sm" variant="spinner" color="primary" /> : <Save className="w-4 h-4" />}
          >
            <Text variant="body-sm">{saving ? 'Saving...' : 'Save Changes'}</Text>
          </Button>
          
          <Button
            type="button"
            onClick={() => navigate(`/account/subscriptions/${subscription.id}`)}
            variant="ghost"
            size="sm"
            disabled={saving}
          >
            <Text variant="body-sm">Cancel</Text>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountMySubscriptionEditPage;
