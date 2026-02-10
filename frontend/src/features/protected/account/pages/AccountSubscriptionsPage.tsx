import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/features/protected/subscriptions/contexts/SubscriptionContext';
import { 
  PlusIcon, 
  PackageIcon,
  EditIcon,
  TrashIcon,
  PauseIcon,
  PlayIcon,
  EyeIcon,
  CalendarIcon,
  DollarSignIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Heading, Caption, Text, Body } from '@/components/ui/Text/Text';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
interface Subscription {
  id: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  subscription_plan?: {
    name: string;
    billing_interval: string;
    base_price: number;
  };
  current_period_start: string;
  current_period_end: string;
  next_billing_date?: string;
  base_cost: number;
  delivery_cost: number;
  tax_amount: number;
  total_cost: number;
  currency: string;
  product_variants?: Array<{
    id: string;
    name: string;
    sku: string;
    price: number;
    product?: {
      name: string;
      images?: Array<{ url: string }>;
    };
  }>;
  auto_renew: boolean;
  created_at: string;
}

interface SubscriptionsProps {
  mode?: 'list' | 'manage';
}

export const Subscriptions: React.FC<SubscriptionsProps> = ({ mode = 'list' }) => {
  const navigate = useNavigate();
  const { subscriptions, pauseSubscription, resumeSubscription, cancelSubscription, removeSubscription } = useSubscription();

  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'pause' | 'resume' | 'cancel' | 'remove' | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(false);
  }, [subscriptions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Caption className="text-gray-500 text-sm">Loading subscriptions...</Caption>
      </div>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <PackageIcon size={28} className="text-gray-300 mb-2" />
        <Caption className="text-sm text-gray-500 mb-2">You have no subscriptions.</Caption>
        <Button
          variant="primary"
          size="xs"
          onClick={() => navigate('/products')}
        >
          Browse Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <Heading level={5} className="text-lg font-semibold mb-4 flex items-center gap-2"><CalendarIcon size={20} /> My Subscriptions</Heading>
      <div className="space-y-3">
        {subscriptions.map((sub: Subscription) => (
          <div key={sub.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <Text as="span" className="text-sm font-medium">{sub.subscription_plan?.name || 'Plan'}</Text>
                <Caption className="ml-2 text-sm text-gray-500">{sub.subscription_plan?.billing_interval || 'Interval'}</Caption>
              </div>
              <Caption className={`px-2 py-1 text-sm rounded-full ${
                sub.status === 'active' ? 'bg-green-100 text-green-700' :
                sub.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                sub.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-500'
              }`}>{sub.status}</Caption>
            </div>
            <Caption className="mb-2 text-sm text-gray-500">Period: {new Date(sub.current_period_start).toLocaleDateString()} - {new Date(sub.current_period_end).toLocaleDateString()}</Caption>
            <Caption className="mb-2 text-sm text-gray-500">Next Billing: {sub.next_billing_date ? new Date(sub.next_billing_date).toLocaleDateString() : 'N/A'}</Caption>
            <Body className="mb-2 text-sm text-gray-700">Total: <DollarSignIcon size={14} className="inline" /> {sub.total_cost?.toFixed(2)} {sub.currency}</Body>
            <div className="mb-2">
              <Text as="span" className="text-sm font-medium">Products:</Text>
              <ul className="ml-2">
                {sub.product_variants?.map(variant => (
                  <li key={variant.id} className="flex items-center gap-2 text-sm">
                    <PackageIcon size={14} /> {variant.name} <span className="text-gray-400">({variant.sku})</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 mt-2">
              {sub.status === 'active' && (
                <Button
                  variant="warning"
                  size="xs"
                  leftIcon={<PauseIcon size={14} />}
                  onClick={() => { setSelectedId(sub.id); setConfirmAction('pause'); setShowConfirmModal(true); }}
                >
                  <Text variant="body-sm">Pause</Text>
                </Button>
              )}
              {sub.status === 'paused' && (
                <Button
                  variant="success"
                  size="xs"
                  leftIcon={<PlayIcon size={14} />}
                  onClick={() => { setSelectedId(sub.id); setConfirmAction('resume'); setShowConfirmModal(true); }}
                >
                  <Text variant="body-sm">Resume</Text>
                </Button>
              )}
              {sub.status !== 'cancelled' && (
                <Button
                  variant="danger"
                  size="xs"
                  leftIcon={<TrashIcon size={14} />}
                  onClick={() => { setSelectedId(sub.id); setConfirmAction('cancel'); setShowConfirmModal(true); }}
                >
                  <Text variant="body-sm">Cancel</Text>
                </Button>
              )}
              <Button
                variant="secondary"
                size="xs"
                leftIcon={<TrashIcon size={14} />}
                onClick={() => { setSelectedId(sub.id); setConfirmAction('remove'); setShowConfirmModal(true); }}
              >
                <Text variant="body-sm">Remove</Text>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            if (!selectedId || !confirmAction) return;
            if (confirmAction === 'pause') pauseSubscription(selectedId);
            if (confirmAction === 'resume') resumeSubscription(selectedId);
            if (confirmAction === 'cancel') cancelSubscription(selectedId);
            if (confirmAction === 'remove') removeSubscription(selectedId);
            setShowConfirmModal(false);
          }}
          title={confirmAction === 'pause' ? 'Pause Subscription' : confirmAction === 'resume' ? 'Resume Subscription' : confirmAction === 'cancel' ? 'Cancel Subscription' : 'Remove Subscription'}
          message={`Are you sure you want to ${confirmAction} this subscription?`}
        />
      )}
    </div>
  );
}
