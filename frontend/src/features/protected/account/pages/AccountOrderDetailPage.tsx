import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, PackageIcon, DownloadIcon, MapPinIcon } from 'lucide-react';
import { OrdersAPI } from '@/api/orders';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';

export const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const response = await OrdersAPI.getOrder(orderId);
        const orderData = response?.data || response;
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
        <Text variant="caption" className="text-red-500 mb-2">Order not found.</Text>
        <Button
          variant="primary"
          onClick={() => navigate(-1)}
        >
          <Text variant="body-sm">Back to Orders</Text>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <Button
        variant="ghost"
        size="sm"
        leftIcon={<ArrowLeftIcon size={16} />}
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <Text variant="body-sm">Back to Orders</Text>
      </Button>
      <Heading level={2} weight="medium">Order #{order.id}</Heading>
      <Text variant="body-sm" tone="secondary">Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</Text>
      <div className="mb-4">
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          {order.status || 'Unknown Status'}
        </span>
      </div>
      <div className="mb-4">
        <Heading level={3} weight="medium">Items</Heading>
        <ul className="space-y-2">
          {order.items && order.items.length > 0 ? (
            order.items.map((item: any) => (
              <li key={item.id} className="flex items-center gap-3 border-b pb-2">
                <PackageIcon size={18} className="text-gray-400" />
                <Text variant="body-sm" weight="medium">{item.name || item.product_name}</Text>
                <Text variant="body-sm" tone="secondary">x{item.quantity}</Text>
                <Text variant="body-sm" className="ml-auto">${item.total_price?.toFixed(2) || '0.00'}</Text>
              </li>
            ))
          ) : (
            <li className="text-xs text-gray-400">No items found.</li>
          )}
        </ul>
      </div>
      <div className="mb-4">
        <Heading level={3} weight="medium">Shipping</Heading>
        <div className="flex items-center gap-2">
          <MapPinIcon size={16} className="text-gray-400" />
          <Text variant="body-sm">{order.shipping_address || 'N/A'}</Text>
        </div>
      </div>
      <div className="mb-4">
        <Heading level={3} weight="medium">Total</Heading>
        <Text variant="body-sm" className="font-semibold">${order.total_amount?.toFixed(2) || '0.00'}</Text>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          variant="primary"
          size="sm"
          leftIcon={<DownloadIcon size={16} />}
        >
          <Text variant="body-sm">Download Invoice</Text>
        </Button>
        <Link to="/products">
          <Button variant="secondary" size="sm">
            <Text variant="body-sm">Shop More</Text>
          </Button>
        </Link>
      </div>
    </div>
  );
};
