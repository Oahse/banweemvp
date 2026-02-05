import { OrderItemDetails } from './OrderItemDetails';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, DownloadIcon, ShoppingBagIcon, TruckIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonOrderTable } from '../ui/SkeletonTable';
import { usePaginatedApi } from '../../../shared/hooks/useAsync';
import OrdersAPI from '../../api/orders';
import { toast } from 'react-hot-toast';
import { useLocale } from '../../../LocaleContext';
import { unwrapResponse, extractErrorMessage } from '../../utils/api-response';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  subtotal?: number;
  discount_amount?: number;
  discount_type?: 'percentage' | 'fixed';
  tax_amount?: number;
  tax_rate?: number;
  shipping_cost?: number;
  shipping_amount?: number;
  items: any[];
}

interface OrdersProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const Orders = ({
  animation = 'shimmer' 
}: OrdersProps) => {
  const { formatCurrency } = useLocale();
  const { data: paginatedData, loading, error, execute } = usePaginatedApi();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const ordersPerPage = 10;

  // Helper function to calculate and format pricing breakdown
  const calculatePricingBreakdown = (order: Order) => {
    // Calculate subtotal from items if not provided
    const calculatedSubtotal = order.items?.reduce((sum: number, item: any) => {
      return sum + (item.total_price || 0);
    }, 0) || 0;
    
    const subtotal = order.subtotal && order.subtotal > 0 ? order.subtotal : calculatedSubtotal;
    const discount = order.discount_amount || 0;
    // ...rest of the file (truncated for brevity)
}
