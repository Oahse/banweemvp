import React, { createContext, useContext, useCallback } from 'react';
import { TokenManager } from '../apis/client';
import { CartAPI } from '../apis/cart';
import { Cart, AddToCartRequest } from '../types';
import { toast } from 'react-hot-toast';
import { useData } from '../hooks/useData';
import { usePolling } from '../hooks/usePolling';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (item: AddToCartRequest) => Promise<boolean>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  items: Cart['items'];
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const {
    data: cart,
    loading,
    error,
    updateData: setCart,
    setLoadingState,
    setErrorState
  } = useData<Cart>(null);

  // Polling for cart updates
  const fetchCart = useCallback(async () => {
    const token = TokenManager.getToken();
    if (!token) return null;

    const country = localStorage.getItem('detected_country') || 'US';
    const province = localStorage.getItem('detected_province');
    const validProvince = province && province !== 'null' && province !== 'undefined' ? province : undefined;
    
    const response = await CartAPI.getCart(token, country, validProvince);
    return response?.data;
  }, []);

  usePolling(fetchCart, {
    interval: 10000, // Poll every 10 seconds
    enabled: !!TokenManager.getToken(),
    onError: (err) => setErrorState(err)
  });

  // Optimistic add item
  const addItem = useCallback(async (item: AddToCartRequest): Promise<boolean> => {
    const token = TokenManager.getToken();
    if (!token) {
      throw new Error('User must be authenticated to add items to cart');
    }

    // Optimistic update
    if (cart) {
      const existingIndex = cart.items.findIndex(i => i.variant_id === item.variant_id);
      let newItems;
      
      if (existingIndex >= 0) {
        newItems = [...cart.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + (item.quantity || 1)
        };
      } else {
        const newItem = {
          id: `temp-${Date.now()}`,
          cart_id: cart.id || '',
          variant_id: item.variant_id,
          quantity: item.quantity || 1,
          price_per_unit: item.price_per_unit || 0,
          total_price: (item.price_per_unit || 0) * (item.quantity || 1),
          variant: item.variant,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        newItems = [...cart.items, newItem];
      }

      const optimisticCart = {
        ...cart,
        items: newItems,
        total_items: newItems.reduce((sum, i) => sum + i.quantity, 0)
      };
      setCart(optimisticCart);
    }

    try {
      const response = await CartAPI.addToCart(item, token);
      setCart(response?.data);
      toast.success(`Added ${item.quantity || 1} item${(item.quantity || 1) > 1 ? 's' : ''} to cart`);
      return true;
    } catch (error: any) {
      // Revert optimistic update by fetching fresh data
      const freshCart = await fetchCart();
      if (freshCart) setCart(freshCart);
      throw error;
    }
  }, [cart, setCart, fetchCart]);

  // Optimistic remove item
  const removeItem = useCallback(async (itemId: string): Promise<void> => {
    const token = TokenManager.getToken();
    if (!token) throw new Error('User must be authenticated');

    const item = cart?.items?.find(i => i.id === itemId);
    const itemName = item?.variant?.product_name || item?.variant?.name || 'Item';

    // Optimistic update
    if (cart) {
      const newItems = cart.items.filter(i => i.id !== itemId);
      const optimisticCart = {
        ...cart,
        items: newItems,
        total_items: newItems.reduce((sum, i) => sum + i.quantity, 0)
      };
      setCart(optimisticCart);
    }

    try {
      const response = await CartAPI.removeFromCart(itemId, token);
      setCart(response?.data);
      toast.success(`${itemName} removed from cart`);
    } catch (error) {
      // Revert optimistic update
      const freshCart = await fetchCart();
      if (freshCart) setCart(freshCart);
      throw error;
    }
  }, [cart, setCart, fetchCart]);

  // Optimistic update quantity
  const updateQuantity = useCallback(async (itemId: string, quantity: number): Promise<void> => {
    const token = TokenManager.getToken();
    if (!token) throw new Error('User must be authenticated');

    if (quantity <= 0) throw new Error('Quantity must be greater than 0');

    // Optimistic update
    if (cart) {
      const newItems = cart.items.map(item => 
        item.id === itemId 
          ? { ...item, quantity, total_price: quantity * item.price_per_unit }
          : item
      );
      const optimisticCart = {
        ...cart,
        items: newItems,
        total_items: newItems.reduce((sum, i) => sum + i.quantity, 0)
      };
      setCart(optimisticCart);
    }

    try {
      const response = await CartAPI.updateCartItem(itemId, quantity, token);
      setCart(response?.data);
      toast.success('Cart updated');
    } catch (error: any) {
      // Revert optimistic update
      const freshCart = await fetchCart();
      if (freshCart) setCart(freshCart);
      throw error;
    }
  }, [cart, setCart, fetchCart]);

  // Optimistic clear cart
  const clearCart = useCallback(async () => {
    const token = TokenManager.getToken();
    if (!token) throw new Error('User must be authenticated');

    if (!cart?.items?.length) throw new Error('Cart is already empty');

    // Optimistic update
    const optimisticCart = { ...cart, items: [], total_items: 0 };
    setCart(optimisticCart);

    try {
      const response = await CartAPI.clearCart(token);
      setCart(response?.data || optimisticCart);
      toast.success('Cart cleared');
    } catch (error) {
      // Revert optimistic update
      const freshCart = await fetchCart();
      if (freshCart) setCart(freshCart);
      throw error;
    }
  }, [cart, setCart, fetchCart]);

  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const items = cart?.items || [];

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        items,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart error: must be used within a CartProvider');
  }
  return context;
};