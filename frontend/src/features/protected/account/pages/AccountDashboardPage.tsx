import { useEffect } from 'react';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useSubscription } from '../../subscriptions/contexts/SubscriptionContext';
import { ShoppingBagIcon, HeartIcon, MapPinIcon, CreditCardIcon, PackageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonDashboard } from '@/components/ui/SkeletonDashboard';
import { usePaginatedApi } from '@/components/shared/hooks/useAsync';
import OrdersAPI from '@/api/orders';
import SubscriptionAPI from '@/api/subscription';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';

interface DashboardProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  subscription_id?: string;
  order_number?: string;
}

interface User {
  firstname?: string;
  lastname?: string;
  email?: string;
  [key: string]: any;
}

export const Dashboard = ({
  animation = 'shimmer' 
}: DashboardProps) => {
  const { user } = useAuth() as { user: User | null };
  const { subscriptions, loading: subscriptionsLoading } = useSubscription();
  const { data: paginatedOrders, loading, error, execute: fetchRecentOrders } = usePaginatedApi();
  const { data: subscriptionOrders, loading: subscriptionOrdersLoading, execute: fetchSubscriptionOrders } = usePaginatedApi();

  // Handle both array and object responses - moved before useEffect
  const recentOrders: Order[] = (() => {
    if (!paginatedOrders) return [];
    // Handle Response.success wrapper
    if ((paginatedOrders as any)?.success) {
      const data = (paginatedOrders as any).data;
      // Check if data has orders array (paginated response)
      if (data && data.orders) {
        return data.orders;
      }
      // Otherwise return data directly if it's an array
      if (Array.isArray(data)) {
        return data;
      }
      return [];
    }
    // If not wrapped, return paginatedOrders directly if it's an array
    if (Array.isArray(paginatedOrders)) {
      return paginatedOrders;
    }
    return [];
  })();

  // ...rest of the file (truncated for brevity)
}
