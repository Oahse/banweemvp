import client from './client';
import { unwrapResponse } from '@/utils/api-response';

export interface AdminStats {
  overview: {
    total_users: number;
    active_users: number;
    total_orders: number;
    orders_today: number;
    total_products: number;
    active_products: number;
    total_subscriptions: number;
    active_subscriptions: number;
  };
  revenue: {
    total_revenue: number;
    revenue_today: number;
    revenue_this_month: number;
    currency: string;
  };
  recent_orders: Array<{
    id: string;
    user_email: string;
    total_amount: number;
    status: string;
    created_at: string;
  }>;
  generated_at: string;
}

export interface PlatformOverview {
  [key: string]: any;
}

/**
 * Get admin dashboard statistics
 */
export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await client.get<{ data: AdminStats }>('/admin/stats');
  return unwrapResponse(response);
};

/**
 * Get platform overview
 */
export const getPlatformOverview = async (): Promise<PlatformOverview> => {
  const response = await client.get<{ data: PlatformOverview }>('/admin/overview');
  return unwrapResponse(response);
};

/**
 * Get all orders (admin)
 */
export const getAdminOrders = async (
  page: number = 1,
  limit: number = 10,
  status?: string
) => {
  const params: Record<string, any> = { page, limit };
  if (status) params.status = status;
  
  const response = await client.get('/admin/orders', { params });
  return unwrapResponse(response);
};

/**
 * Get all users (admin)
 */
export const getAdminUsers = async (
  page: number = 1,
  limit: number = 10
) => {
  const response = await client.get('/admin/users', {
    params: { page, limit }
  });
  return unwrapResponse(response);
};

/**
 * Get conversion rates
 */
export const getConversionRates = async (days: number = 30) => {
  const response = await client.get('/analytics/conversion-rates', {
    params: { days }
  });
  return unwrapResponse(response);
};

/**
 * Get revenue analytics
 */
export const getRevenueAnalytics = async (days: number = 30) => {
  const response = await client.get('/analytics/revenue', {
    params: { days }
  });
  return unwrapResponse(response);
};

/**
 * Get top products
 */
export const getTopProducts = async (limit: number = 10) => {
  const response = await client.get('/analytics/top-products', {
    params: { limit }
  });
  return unwrapResponse(response);
};

/**
 * Get customer metrics
 */
export const getCustomerMetrics = async (days: number = 30) => {
  const response = await client.get('/analytics/customer-metrics', {
    params: { days }
  });
  return unwrapResponse(response);
};
