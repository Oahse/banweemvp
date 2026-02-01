import { useState, useCallback } from 'react';

export interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  estimatedDays: number;
}

interface UseShippingOptions {
  autoLoad?: boolean;
}

export const useShipping = (options?: UseShippingOptions) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    { id: 'standard', name: 'Standard Shipping', cost: 5.99, estimatedDays: 7 },
    { id: 'express', name: 'Express Shipping', cost: 14.99, estimatedDays: 2 },
    { id: 'overnight', name: 'Overnight Shipping', cost: 24.99, estimatedDays: 1 },
  ]);

  const loadShippingMethods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call - replace with actual API when ready
      console.log('Loading shipping methods...');
    } catch (err: any) {
      setError(err.message || 'Failed to load shipping methods');
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
