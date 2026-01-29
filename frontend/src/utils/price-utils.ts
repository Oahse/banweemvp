// Price utilities for formatting and calculations
import { formatCurrency } from '../i18n';

export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return formatCurrency(price, currency);
};

export const calculateDiscount = (originalPrice: number, discountPrice: number): number => {
  return originalPrice - discountPrice;
};

export const calculateDiscountPercentage = (originalPrice: number, discountPrice: number): number => {
  if (originalPrice === 0) return 0;
  return ((originalPrice - discountPrice) / originalPrice) * 100;
};

export const applyDiscount = (price: number, discountPercent: number): number => {
  return price * (1 - discountPercent / 100);
};
