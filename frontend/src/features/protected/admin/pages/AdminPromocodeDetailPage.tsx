import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { LoadingFallback } from '@/components/LoadingFallback';
import { ArrowLeftIcon, EditIcon, TrashIcon } from 'lucide-react';
import PromocodesAPI, { Promocode } from '@/api/promocodes';

const AdminPromocodeDetailPage: React.FC = () => {
  const { promocodeId } = useParams<{ promocodeId: string }>();
  const navigate = useNavigate();
  const [promocode, setPromocode] = useState<Promocode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPromocode = async () => {
      if (!promocodeId) return;
      
      try {
        setLoading(true);
        setError(null);
        const result = await PromocodesAPI.getPromocodeById(promocodeId);
        setPromocode(result);
      } catch (err: any) {
        console.error('Promocode fetch error:', err);
        const message = err.message || 'Failed to load promocode details';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromocode();
  }, [promocodeId]);

  const handleDelete = async () => {
    if (!promocodeId || !confirm('Are you sure you want to delete this promocode?')) {
      return;
    }

    try {
      await PromocodesAPI.deletePromocode(promocodeId);
      toast.success('Promocode deleted successfully');
      navigate('/admin/promocodes');
    } catch (error: any) {
      console.error('Error deleting promocode:', error);
      toast.error(error.message || 'Failed to delete promocode');
    }
  };

  if (loading) {
    return <LoadingFallback />;
  }

  if (error || !promocode) {
    return (
      <div className="space-y-6">
        <Button
          onClick={() => navigate('/admin/promocodes')}
          variant="ghost"
          size="xs"
          className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
        >
          <ArrowLeftIcon size={16} />
          Back to Promocodes
        </Button>
        
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
            <p className="text-destructive">{error}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate('/admin/promocodes')}
            variant="ghost"
            size="xs"
            className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
          >
            <ArrowLeftIcon size={16} />
            Back
          </Button>
          <div>
            <Heading level={5} className="text-lg font-semibold text-copy">{promocode.code}</Heading>
            <Text className="text-copy-light text-sm">ID: {promocode.id.slice(0, 8)}...</Text>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`/admin/promocodes/${promocodeId}/edit`)}
            variant="primary"
            size="xs"
            className="inline-flex items-center gap-2"
          >
            <EditIcon size={14} />
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
            size="xs"
            className="inline-flex items-center gap-2"
          >
            <TrashIcon size={14} />
            Delete
          </Button>
        </div>
      </div>

      {/* Promocode Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-surface rounded-lg border border-border-light p-6">
            <Heading level={5} className="text-base font-semibold text-copy mb-4">
              Promocode Information
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text className="text-copy-light text-sm">Code</Text>
                <Text className="text-copy font-mono font-medium">{promocode.code}</Text>
              </div>
              <div>
                <Text className="text-copy-light text-sm">Discount Type</Text>
                <Text className="text-copy capitalize">{promocode.discount_type}</Text>
              </div>
              <div>
                <Text className="text-copy-light text-sm">Value</Text>
                <Text className="text-copy font-medium">
                  {promocode.discount_type === 'percentage' 
                    ? `${promocode.value}%` 
                    : `$${promocode.value}`
                  }
                </Text>
              </div>
              <div>
                <Text className="text-copy-light text-sm">Status</Text>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  promocode.is_active 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {promocode.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            {promocode.description && (
              <div className="mt-4">
                <Text className="text-copy-light text-sm">Description</Text>
                <Text className="text-copy mt-1">{promocode.description}</Text>
              </div>
            )}
          </div>

          {/* Usage Information */}
          <div className="bg-surface rounded-lg border border-border-light p-6">
            <Heading level={5} className="text-base font-semibold text-copy mb-4">
              Usage Information
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Text className="text-copy-light text-sm">Used Count</Text>
                <Text className="text-copy font-medium">
                  {promocode.used_count}{promocode.usage_limit ? ` / ${promocode.usage_limit}` : ''}
                </Text>
              </div>
              <div>
                <Text className="text-copy-light text-sm">Usage Limit</Text>
                <Text className="text-copy">{promocode.usage_limit || 'Unlimited'}</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Requirements */}
          {(promocode.minimum_order_amount || promocode.maximum_discount_amount) && (
            <div className="bg-surface rounded-lg border border-border-light p-6">
              <Heading level={5} className="text-base font-semibold text-copy mb-4">
                Order Requirements
              </Heading>
              
              <div className="space-y-3">
                {promocode.minimum_order_amount && (
                  <div>
                    <Text className="text-copy-light text-sm">Minimum Order Amount</Text>
                    <Text className="text-copy font-medium">${promocode.minimum_order_amount}</Text>
                  </div>
                )}
                {promocode.maximum_discount_amount && (
                  <div>
                    <Text className="text-copy-light text-sm">Maximum Discount Amount</Text>
                    <Text className="text-copy font-medium">${promocode.maximum_discount_amount}</Text>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Validity Period */}
          {(promocode.valid_from || promocode.valid_until) && (
            <div className="bg-surface rounded-lg border border-border-light p-6">
              <Heading level={5} className="text-base font-semibold text-copy mb-4">
                Validity Period
              </Heading>
              
              <div className="space-y-3">
                {promocode.valid_from && (
                  <div>
                    <Text className="text-copy-light text-sm">Valid From</Text>
                    <Text className="text-copy">
                      {new Date(promocode.valid_from).toLocaleDateString()}
                    </Text>
                  </div>
                )}
                {promocode.valid_until && (
                  <div>
                    <Text className="text-copy-light text-sm">Valid Until</Text>
                    <Text className="text-copy">
                      {new Date(promocode.valid_until).toLocaleDateString()}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-surface rounded-lg border border-border-light p-6">
            <Heading level={5} className="text-base font-semibold text-copy mb-4">
              Timestamps
            </Heading>
            
            <div className="space-y-3">
              {promocode.created_at && (
                <div>
                  <Text className="text-copy-light text-sm">Created At</Text>
                  <Text className="text-copy">
                    {new Date(promocode.created_at).toLocaleDateString()}
                  </Text>
                </div>
              )}
              {promocode.updated_at && (
                <div>
                  <Text className="text-copy-light text-sm">Updated At</Text>
                  <Text className="text-copy">
                    {new Date(promocode.updated_at).toLocaleDateString()}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPromocodeDetailPage;
