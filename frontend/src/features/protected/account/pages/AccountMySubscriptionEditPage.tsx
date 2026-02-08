import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubscription } from '../../subscriptions/contexts/SubscriptionContext';
import { toast } from 'react-hot-toast';
import { CalendarIcon, DollarSignIcon } from 'lucide-react';

const AccountMySubscriptionEditPage: React.FC = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const { getSubscriptionDetails, updateSubscription } = useSubscription();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscription, setSubscription] = useState<any>(null);
  const [form, setForm] = useState({
    plan: '',
    billing_interval: '',
    auto_renew: false,
  });

  useEffect(() => {
    const fetchSub = async () => {
      setLoading(true);
      setError('');
      try {
        const sub = await getSubscriptionDetails(subscriptionId);
        setSubscription(sub);
        setForm({
          plan: sub?.subscription?.name || '',
          billing_interval: sub?.subscription?.billing_cycle || '',
          auto_renew: !!sub?.subscription?.auto_renew,
        });
      } catch (err) {
        setError('Failed to load subscription');
      } finally {
        setLoading(false);
      }
    };
    fetchSub();
  }, [subscriptionId, getSubscriptionDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      await updateSubscription(subscriptionId!, {
        plan: form.plan,
        billing_interval: form.billing_interval,
        auto_renew: form.auto_renew,
      });
      toast.success('Subscription updated!');
      navigate('/account/subscriptions');
    } catch (err) {
      setError('Failed to update subscription');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64 text-gray-500">Loading...</div>;
  if (error) return <div className="flex flex-col items-center h-64 text-red-500">{error}</div>;
  if (!subscription) return <div className="flex flex-col items-center h-64 text-gray-500">Subscription not found.</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CalendarIcon size={20} /> Edit My Subscription
      </h2>
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1">Plan Name</label>
        <input
          name="plan"
          type="text"
          value={form.plan}
          onChange={handleChange}
          className="w-full px-3 py-2 text-xs rounded border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1">Billing Interval</label>
        <select
          name="billing_interval"
          value={form.billing_interval}
          onChange={handleChange}
          className="w-full px-3 py-2 text-xs rounded border border-gray-300"
        >
          <option value="">Select interval</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <input
          name="auto_renew"
          type="checkbox"
          checked={form.auto_renew}
          onChange={handleChange}
          className="accent-primary"
        />
        <label className="text-xs font-medium">Auto Renew</label>
      </div>
      <button
        className="px-4 py-2 bg-primary text-white rounded"
        onClick={handleSave}
        disabled={loading}
      >Save Changes</button>
    </div>
  );
};

export default AccountMySubscriptionEditPage;
