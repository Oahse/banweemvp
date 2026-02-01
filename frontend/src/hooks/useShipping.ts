import { useState, useCallback } from 'react';
import { apiClient } from '../api/client';

export interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  estimatedDays: number;
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
      const response = await apiClient.get('/shipping-methods');
      setShippingMethods(response.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load shipping methods');
      // Set empty array on error to prevent issues
      setShippingMethods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCheapestMethod = useCallback(() => {
    if (shippingMethods.length === 0) return null;
    return shippingMethods.reduce((cheapest, method) => 
      method.cost < cheapest.cost ? method : cheapest
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
