import { toast } from 'react-hot-toast';

export function validateCartItem(cart: any, itemId: string): boolean {
  if (!cart || !Array.isArray(cart.items)) return false;
  return cart.items.some((i: any) => i && (i.id === itemId || i.item_id === itemId));
}

export async function handleCartSyncError(error: any, fetchCart?: () => Promise<any>) {
  console.error('Cart sync error:', error);
  const message =
    error?.message || error?.response?.data?.message || 'Failed to sync cart. Refreshing...';

  toast.error(message);

  if (typeof fetchCart === 'function') {
    try {
      await fetchCart();
      toast.success('Cart refreshed');
    } catch (e) {
      console.error('Failed to refresh cart after sync error:', e);
    }
  }
}

export default { validateCartItem, handleCartSyncError };
