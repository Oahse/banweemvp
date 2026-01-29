import { useState } from 'react';

export interface ShippingMethod {
  id: string;
  name: string;
  cost: number;
  estimatedDays: number;
}

export const useShipping = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    { id: 'standard', name: 'Standard Shipping', cost: 5.99, estimatedDays: 7 },
    { id: 'express', name: 'Express Shipping', cost: 14.99, estimatedDays: 2 },
    { id: 'overnight', name: 'Overnight Shipping', cost: 24.99, estimatedDays: 1 },
  ]);

  return {
    selectedMethod,
    setSelectedMethod,
    shippingMethods,
    setShippingMethods,
  };
};
