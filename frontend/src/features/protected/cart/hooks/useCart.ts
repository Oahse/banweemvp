import { useContext } from 'react';
import { CartContext } from '@/features/protected/cart/contexts/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
