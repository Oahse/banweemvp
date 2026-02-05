import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, PackageIcon, DownloadIcon, MapPinIcon } from 'lucide-react';
import { OrdersAPI } from '../../api/orders';
import { toast } from 'react-hot-toast';
import { unwrapResponse, extractErrorMessage } from '../../utils/api-response';

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

  // ...rest of the file (truncated for brevity)
}
