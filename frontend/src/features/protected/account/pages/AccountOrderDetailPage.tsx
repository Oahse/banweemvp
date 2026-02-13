import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, PackageIcon, DownloadIcon, MapPinIcon, TruckIcon } from 'lucide-react';
import { OrdersAPI } from '@/api/orders';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';
import { useLocale } from '@/components/shared/contexts/LocaleContext';

export const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { formatCurrency } = useLocale();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingInvoice, setDownloadingInvoice] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const response = await OrdersAPI.getOrder(orderId);
        const orderData = response?.data || response;
        console.log('Order data:', orderData);
        setOrder(orderData);
      } catch (error) {
        toast.error('Failed to load order details');
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleDownloadInvoice = async () => {
    if (!orderId) return;
    
    try {
      setDownloadingInvoice(true);
      await OrdersAPI.getOrderInvoice(orderId);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
      console.error('Error downloading invoice:', error);
    } finally {
      setDownloadingInvoice(false);
    }
  };

  const formatAddress = (address: any) => {
    console.log('Formatting address:', address, 'type:', typeof address);
    
    if (!address) return 'N/A';
    if (typeof address === 'string') return address;
    
    // Handle object address
    if (typeof address === 'object') {
      const parts = [
        address.street,
        address.city,
        address.state,
        address.post_code,
        address.country
      ].filter(Boolean);
      
      if (parts.length === 0) return 'N/A';
      return parts.join(', ');
    }
    
    return 'N/A';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'confirmed': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'processing': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'shipped': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'delivered': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text variant="body-sm" tone="secondary">Loading order details...</Text>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Text variant="body" className="text-destructive dark:text-destructive-dark mb-4">Order not found.</Text>
        <Button
          variant="primary"
          onClick={() => navigate('/account/orders')}
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeftIcon size={16} />}
          onClick={() => navigate('/account/orders')}
        >
          Back to Orders
        </Button>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<DownloadIcon size={16} />}
          onClick={handleDownloadInvoice}
          disabled={downloadingInvoice}
        >
          {downloadingInvoice ? 'Downloading...' : 'Download Invoice'}
        </Button>
      </div>

      {/* Order Info Card */}
      <div className="bg-surface dark:bg-surface-dark rounded-lg shadow-sm border border-border dark:border-border-dark p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Heading level={4} weight="semibold" className="mb-2">Order #{order.id?.slice(0, 8)}</Heading>
            <Text variant="body-sm" tone="secondary">
              Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'N/A'}
            </Text>
          </div>
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
            {order.status?.toUpperCase() || 'UNKNOWN'}
          </span>
        </div>

        {/* Tracking Number */}
        {order.tracking_number && (
          <div className="flex items-center gap-2 p-3 bg-background dark:bg-background-dark rounded-md">
            <TruckIcon size={18} className="text-primary dark:text-primary-dark" />
            <div>
              <Text variant="caption" tone="secondary">Tracking Number</Text>
              <Text variant="body-sm" weight="medium">{order.tracking_number}</Text>
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-surface dark:bg-surface-dark rounded-lg shadow-sm border border-border dark:border-border-dark p-6">
        <Heading level={5} weight="semibold" className="mb-4">Order Items</Heading>
        <div className="space-y-4">
          {order.items && order.items.length > 0 ? (
            order.items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-border-light dark:border-border-light-dark last:border-0">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                  {item.variant?.images && item.variant.images.length > 0 ? (
                    <img 
                      src={item.variant.images.find((img: any) => img.is_primary)?.url || item.variant.images[0]?.url} 
                      alt={item.variant?.product_name || item.variant?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PackageIcon size={24} className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <Text variant="body-sm" weight="medium" className="mb-1">
                    {item.variant?.product_name || item.variant?.name || 'Product'}
                  </Text>
                  {item.variant?.sku && (
                    <Text variant="caption" tone="secondary">SKU: {item.variant.sku}</Text>
                  )}
                </div>
                
                {/* Quantity and Price */}
                <div className="text-right">
                  <Text variant="body-sm" tone="secondary" className="mb-1">Qty: {item.quantity}</Text>
                  <Text variant="body-sm" weight="medium">{formatCurrency(item.total_price || 0)}</Text>
                </div>
              </div>
            ))
          ) : (
            <Text variant="body-sm" tone="secondary">No items found.</Text>
          )}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-surface dark:bg-surface-dark rounded-lg shadow-sm border border-border dark:border-border-dark p-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPinIcon size={18} className="text-primary dark:text-primary-dark" />
          <Heading level={5} weight="semibold">Shipping Address</Heading>
        </div>
        {(() => {
          console.log('Order object:', order);
          console.log('Shipping address field:', order.shipping_address);
          console.log('Billing address field:', order.billing_address);
          return (
            <Text variant="body-sm">{formatAddress(order.shipping_address || order.billing_address)}</Text>
          );
        })()}
      </div>

      {/* Order Summary */}
      <div className="bg-surface dark:bg-surface-dark rounded-lg shadow-sm border border-border dark:border-border-dark p-6">
        <Heading level={5} weight="semibold" className="mb-4">Order Summary</Heading>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Text variant="body-sm" tone="secondary">Subtotal</Text>
            <Text variant="body-sm">{formatCurrency(order.subtotal || 0)}</Text>
          </div>
          <div className="flex justify-between">
            <Text variant="body-sm" tone="secondary">Shipping</Text>
            <Text variant="body-sm">{formatCurrency(order.shipping_amount || order.shipping_cost || 0)}</Text>
          </div>
          <div className="flex justify-between">
            <Text variant="body-sm" tone="secondary">Tax</Text>
            <Text variant="body-sm">{formatCurrency(order.tax_amount || 0)}</Text>
          </div>
          {order.discount_amount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <Text variant="body-sm">Discount</Text>
              <Text variant="body-sm">-{formatCurrency(order.discount_amount)}</Text>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-border-light dark:border-border-light-dark">
            <Text variant="body" weight="semibold">Total</Text>
            <Text variant="body" weight="semibold">{formatCurrency(order.total_amount || 0)}</Text>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link to="/products" className="flex-1">
          <Button variant="secondary" fullWidth>
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};
