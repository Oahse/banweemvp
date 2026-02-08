import { useState, useCallback } from 'react';
import { apiClient } from '@/api/client';

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimated_days: number;
  carrier?: string;
  description?: string;
}

interface UseShippingOptions {
  autoLoad?: boolean;
}

export const useShipping = (options?: UseShippingOptions) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);

  const loadShippingMethods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🚚 Loading shipping methods using getShippingMethods()');
      const response = await apiClient.getShippingMethods();
      console.log('✅ Shipping methods loaded successfully:', response.data);
      setShippingMethods(response.data?.data || response.data || []);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load shipping methods';
      console.error('❌ Error loading shipping methods:', {
        message: errorMsg,
        status: err.response?.status,
        url: err.config?.url,
        error: err
      });
      setError(errorMsg);
      // Set empty array on error to prevent issues
      setShippingMethods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCheapestMethod = useCallback(() => {
    if (shippingMethods.length === 0) return null;
    return shippingMethods.reduce((cheapest, method) => 
      method.price < cheapest.price ? method : cheapest
    );
  }, [shippingMethods]);

  // Auto-load if option is set
  if (options?.autoLoad && !loading && !error && shippingMethods.length === 0) {
    loadShippingMethods();
  }

  return {
    selectedMethod,
    setSelectedMethod,
    shippingMethods,
    setShippingMethods,
    loading,
    error,
    loadShippingMethods,
    getCheapestMethod,
  };
};
