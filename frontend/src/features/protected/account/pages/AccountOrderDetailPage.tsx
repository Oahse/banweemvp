import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, PackageIcon, DownloadIcon, MapPinIcon } from 'lucide-react';
import { OrdersAPI } from '@/api/orders';
import { toast } from 'react-hot-toast';

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
        <span className="text-gray-500 text-sm">Loading order details...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <span className="text-red-500 text-sm mb-2">Order not found.</span>
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => navigate(-1)}
        >Back to Orders</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <button
        className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-primary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon size={16} /> Back to Orders
      </button>
      <h2 className="text-base md:text-lg font-semibold mb-2">Order #{order.id}</h2>
      <p className="text-sm text-gray-500 mb-4">Placed on {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
      <div className="mb-4">
        <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
          {order.status || 'Unknown Status'}
        </span>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Items</h3>
        <ul className="space-y-2">
          {order.items && order.items.length > 0 ? (
            order.items.map((item: any) => (
              <li key={item.id} className="flex items-center gap-3 border-b pb-2">
                <PackageIcon size={18} className="text-gray-400" />
                <span className="text-sm font-medium">{item.name || item.product_name}</span>
                <span className="text-sm text-gray-500">x{item.quantity}</span>
                <span className="ml-auto text-sm text-gray-700">${item.total_price?.toFixed(2) || '0.00'}</span>
              </li>
            ))
          ) : (
            <li className="text-xs text-gray-400">No items found.</li>
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Shipping</h3>
        <div className="flex items-center gap-2">
          <MapPinIcon size={16} className="text-gray-400" />
          <span className="text-sm">{order.shipping_address || 'N/A'}</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Total</h3>
        <span className="text-base font-semibold">${order.total_amount?.toFixed(2) || '0.00'}</span>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="px-3 py-2 bg-primary text-white rounded flex items-center gap-2 text-sm">
          <DownloadIcon size={16} /> Download Invoice
        </button>
        <Link to="/products" className="px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm">Shop More</Link>
      </div>
    </div>
  );
};
