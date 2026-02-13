import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRightIcon, TrashIcon, MinusIcon, PlusIcon, ShoppingCartIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { useCart } from '@/features/protected/cart/contexts/CartContext';
import { useAuth } from '@/features/protected/auth/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { useLocale } from '@/components/shared/contexts/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CartSkeleton } from '@/components/ui/CartSkeleton';
import { validation } from '@/utils/validation';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { CartAPI } from '@/api/cart';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';
import { Input } from '@/components/ui/Form';

export const Cart = () => {
  const { 
    cart, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    loading,
  } = useCart();
  const { isAuthenticated, isLoading: authLoading, setIntendedDestination } = useAuth();
  const { formatCurrency } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const [couponCode, setCouponCode] = useState('');
  const [clearingCart, setClearingCart] = useState(false);
  const [showRemoveItemModal, setShowRemoveItemModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<{ id: string; name: string; message: string } | null>(null);
  
  // Use cart items directly from context - this ensures the component re-renders when cart object changes
  const cartItems = React.useMemo(() => cart?.items || [], [cart?.items]);
  
  // Authentication check - require user to be logged in to view cart
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setIntendedDestination({ path: '/cart', action: 'view_cart' });
      navigate('/login', { state: { from: '/cart' } });
    }
  }, [isAuthenticated, authLoading, navigate, setIntendedDestination]);
  
  const validateForCheckout = () => {
    if (!cart?.items.length) {
      return false;
    }
    
    // Check for out of stock cartItems
    const outOfStockItems = cartItems.filter(item => 
      item.variant?.stock !== undefined && item.variant.stock < item.quantity
    );
    
    if (outOfStockItems.length > 0) {
      toast.error('Some items in your cart are out of stock');
      return false;
    }
    
    return true;
  };

  
  // Calculate cart summary locally
  const getCartSummary = () => {
    const subtotal = cart?.subtotal || cartItems.reduce((sum, item) => {
      const itemTotal = !isNaN(item.total_price) && item.total_price > 0 
        ? item.total_price 
        : (item.quantity || 1) * (
            !isNaN(item.price_per_unit) && item.price_per_unit > 0 
              ? item.price_per_unit 
              : item.variant?.current_price || item.variant?.sale_price || item.variant?.base_price || 0
          );
      return sum + itemTotal;
    }, 0);
  
    return { subtotal };
  };
  
  const { subtotal } = getCartSummary();
  
  // Enhanced remove item handler
  const handleRemoveItem = useCallback(async (id: string) => {
    if (!id) {
      toast.error('Invalid item ID');
      return;
    }
    
    // Find item for confirmation
    const item = cartItems.find(item => item.id === id);
    const itemName = item?.variant?.product_name || item?.variant?.name || 'this item';
    
    // Confirm removal for expensive items or multiple quantities
    if (item && (item.total_price > 100 || item.quantity > 1)) {
      const confirmMessage =
        item.quantity > 1 ? (
          <>Remove all {item.quantity} units of <strong className='text-2xl'>{itemName}</strong> from your cart?</>
        ) : (
          <>Remove <strong className='text-2xl'>{itemName}</strong> from your cart?</>
        );

      setItemToRemove({
        id,
        name: itemName,
        message: confirmMessage
      });
      setShowRemoveItemModal(true);
      return;
    }

    // For inexpensive single items, remove directly
    try {
      await removeItem(String(id));
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      const errorMessage = error?.message || 'Failed to remove item. Please try again.';
      toast.error(errorMessage);
    } 
  }, [cartItems, isAuthenticated, setIntendedDestination, location.pathname, removeItem]);

  const confirmRemoveItem = async () => {
    if (!itemToRemove) return;

    try {
      await removeItem(String(itemToRemove.id));
    } catch (error: any) {
      console.error('Failed to remove item:', error);
      const errorMessage = error?.message || 'Failed to remove item. Please try again.';
      toast.error(errorMessage);
    } finally {
      setShowRemoveItemModal(false);
      setItemToRemove(null);
    }
  };

  // Enhanced quantity change handler with optimistic updates
  const handleQuantityChange = useCallback(async (id: string, quantity: number) => {
    // Check authentication for cart operations
    // console.log(id,'item_id-----')
    if (!isAuthenticated) {
      setIntendedDestination({ 
        path: location.pathname,
        action: 'cart'
      });
      navigate('/login');
      return;
    }

    // If quantity is 0 or less, remove the item instead
    if (quantity <= 0) {
      await handleRemoveItem(id);
      return;
    }

    try {
      await updateQuantity(String(id), quantity);
    } catch (error: any) {
      console.error('Failed to update quantity:', error);
      const errorMessage = error?.message || 'Failed to update cart. Please try again.';
      toast.error(errorMessage);
      
    } 
  }, [isAuthenticated, setIntendedDestination, location.pathname, updateQuantity, handleRemoveItem]);

  // Enhanced clear cart handler
  const handleClearCart = useCallback(async () => {
    if (!isAuthenticated) {
      setIntendedDestination({ 
        path: location.pathname,
        action: 'cart'
      });
      navigate('/login');
      return;
    }

    // Show confirmation modal
    setShowClearCartModal(true);
  }, [isAuthenticated, setIntendedDestination, location.pathname, navigate]);

  const confirmClearCart = async () => {
    setClearingCart(true);
    
    try {
      await clearCart();
    } catch (error: any) {
      console.error('Failed to clear cart:', error);
      const errorMessage = error?.message || 'Failed to clear cart. Please try again.';
      toast.error(errorMessage);
    } finally {
      setClearingCart(false);
      setShowClearCartModal(false);
    }
  };

  // Enhanced coupon application
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIntendedDestination({ 
        path: location.pathname,
        action: 'cart'
      });
      navigate('/login');
      return;
    }
    
    const couponValidation = validation.couponCode(couponCode);
    if (!couponValidation.valid) {
      toast.error(couponValidation.message);
      return;
    }

    try {
      // Call actual backend API for coupon validation
      const response = await CartAPI.applyPromocode(couponCode.trim().toUpperCase());
      const data = unwrapResponse(response) as { discount_amount?: number };
      
      toast.success(`Coupon applied! You saved ${formatCurrency(data.discount_amount || 0)}`);
      setCouponCode('');
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  // Enhanced checkout handler with validation
  const handleCheckout = useCallback(async () => {
    if (!isAuthenticated) {
      setIntendedDestination({ 
        path: '/checkout',
        action: 'checkout'
      });
      navigate('/login');
      return;
    }

    // Use the built-in validation
    if (!validateForCheckout()) {
      return;
    }

    // Navigate to checkout
    navigate('/checkout');
  }, [isAuthenticated, setIntendedDestination, validateForCheckout, navigate]);

  // Show loading state while cart or auth is loading
  if (loading || authLoading) {
    return <CartSkeleton />;
  }

  // Enhanced cart item component with loading states
  const CartItemRow = React.forwardRef<HTMLDivElement, { item: typeof cartItems[0] }>(function CartItemRow({ item }, ref) {
    
    return (
      <motion.div 
        ref={ref}
        key={item.id} 
        className="p-3"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="col-span-6 flex items-center">
            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 relative">
              {(() => {
                // Get image URL from cart item data
                let imageUrl = null;
                
                // First try to get from variant images array (if available)
                if (item.variant?.images && item.variant.images.length > 0) {
                  const primaryImage = item.variant.images.find(img => img.is_primary);
                  imageUrl = primaryImage?.url || item.variant.images[0]?.url;
                }
                
                // Fallback to direct image_url from cart item (if available)
                if (!imageUrl && (item as any).image_url) {
                  imageUrl = (item as any).image_url;
                }
                
                // Fallback to variant primary_image if available
                if (!imageUrl && item.variant?.primary_image?.url) {
                  imageUrl = item.variant.primary_image.url;
                }
                
                return imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={item.variant?.product_name || (item.variant as any)?.product?.name || item.variant?.name || 'Product'} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23f3f4f6"/%3E%3Cpath d="M40 25c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="%239ca3af"/%3E%3Cpath d="M55 20H25c-2.8 0-5 2.2-5 5v30c0 2.8 2.2 5 5 5h30c2.8 0 5-2.2 5-5V25c0-2.8-2.2-5-5-5zm0 35H25V25h30v30z" fill="%239ca3af"/%3E%3C/svg%3E';
                      target.onerror = null;
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <Text className="w-10 h-10 text-gray-400">
                      <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </Text>
                  </div>
                );
              })()}
              
              {/* Processing overlay - removed since not using processing state */}
            </div>
            <div className="ml-3">
              <Link
                to={`/products/${item.product_id}`}
                className="font-medium text-copy hover:text-primary block text-sm"
              >
                <Text variant="body-sm">{item.variant?.product_name || 'Product'}</Text>
              </Link>
              {item.variant?.attributes && Object.keys(item.variant.attributes).length > 0 && (
                <Text className="mt-1">
                  {Object.entries(item.variant.attributes).slice(0, 2).map(([key, value]) => (
                    <Text key={key} variant="caption" className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded mr-1 mb-1">
                      {key}: {value}
                    </Text>
                  ))}
                </Text>
              )}
              
              {/* Stock status indicator */}
              {item.variant?.stock !== undefined && (
                <Text className="mt-1">
                  {item.variant.stock > 10 ? (
                    <Text variant="caption" className="text-green-600 flex items-center">
                      <CheckCircle size={12} className="mr-1" />
                      In Stock ({item.variant.stock} available)
                    </Text>
                  ) : item.variant.stock > 0 ? (
                    <Text variant="caption" className="text-warning flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      Only {item.variant.stock} left
                    </Text>
                  ) : (
                    <Text variant="caption" className="text-error flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      Out of Stock
                    </Text>
                  )}
                </Text>
              )}
              
              <Button
                onClick={() => handleRemoveItem(item.id)}
                variant="danger"
                size="xs"
                leftIcon={<TrashIcon size={12} />}
                className="mt-1"
                aria-label={`Remove ${item.variant?.product_name || 'item'} from cart`}
              >
                Remove
              </Button>
            </div>
          </div>
          <div className="col-span-2 text-center text-sm">
            <Text as="span" className="md:hidden font-medium text-copy text-sm">Price: </Text>
            <div className="flex flex-col items-center">
              <Text as="span" className="font-medium text-primary text-sm">
                {formatCurrency(
                  !isNaN(item.price_per_unit) && item.price_per_unit > 0 
                    ? item.price_per_unit 
                    : item.variant?.current_price || item.variant?.sale_price || item.variant?.base_price || 0
                )}
              </Text>
              {/* Show discount if applicable - only if discount > 0 and sale price < base price */}
              {item.variant?.discount_percentage && 
               item.variant.discount_percentage > 0 && 
               item.variant.sale_price && 
               (item.variant.base_price && item.variant.base_price > 0) &&
               item.variant.sale_price < item.variant.base_price && (
                <Text variant="caption" className="text-gray-500 line-through">
                  {formatCurrency(item.variant.base_price)}
                </Text>
              )}
            </div>
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="flex items-center border border-border rounded-md gap-1">
              <Button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                variant="ghost"
                size="icon"
                className="px-2 py-1"
                disabled={item.quantity <= 1}
                aria-label={`Decrease ${item.variant?.product_name || 'item'} quantity`}
              >
                <MinusIcon size={14} />
              </Button>
              <Input
                type="number"
                min="1"
                max={item.variant?.stock || 999}
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value) || 1;
                  handleQuantityChange(item.id, newQuantity);
                }}
                className="w-16 text-center text-sm"
                disabled={item.variant?.stock !== undefined && item.quantity >= item.variant.stock}
                aria-label={`Quantity for ${item.variant?.product_name || 'item'}`}
              />
              <Button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                variant="ghost"
                size="icon"
                className="px-2 py-1"
                disabled={item.variant?.stock !== undefined && item.quantity >= item.variant.stock}
                aria-label={`Increase ${item.variant?.product_name || 'item'} quantity`}
              >
                <PlusIcon size={14} />
              </Button>
            </div>
          </div>
          <div className="col-span-2 text-center text-sm">
            <Text as="span" className="md:hidden font-medium text-copy text-sm">Subtotal: </Text>
            <Text as="span" className="font-medium text-copy text-sm">
              {formatCurrency(
                !isNaN(item.total_price) && item.total_price > 0 
                  ? item.total_price 
                  : (item.quantity || 1) * (
                      !isNaN(item.price_per_unit) && item.price_per_unit > 0 
                        ? item.price_per_unit 
                        : item.variant?.current_price || item.variant?.sale_price || item.variant?.base_price || 0
                    )
              )}
            </Text>
          </div>
        </div>
      </motion.div>
    );
  });
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-6 text-copy" 
      key={`cart-${cart?.id || 'empty'}-${cartItems.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Breadcrumb */}
      <motion.nav 
        className="flex mb-4 text-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/" className="text-copy-lighter hover:text-primary">
          <Text variant="body-sm" tone="secondary">Home</Text>
        </Link>
        
        <ChevronRightIcon size={14} className="mx-2" />
        <Text variant="body-sm">Shopping Cart</Text>
      </motion.nav>

      <motion.div 
        className="text-lg font-bold text-copy mb-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Heading level={5} weight="bold">Shopping Cart</Heading>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <ShoppingCartIcon size={40} className="text-gray-400 dark:text-gray-500" />
            
          </div>
          <Heading level={5} weight="semibold" className="mb-3 flex items-center justify-center">Your cart is empty</Heading>
          <Text variant="body" tone="secondary" className="mb-6 max-w-md mx-auto">
            Looks like you haven&apos;t added any products to your cart yet.
          </Text>
          <div className='mt-3'>
              <Link
                to="/products"
                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-4 py-1 rounded-md transition-colors font-small"
              >
                Continue Shopping
              </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col lg:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-3 bg-background text-copy font-medium text-sm">
                <Text variant="caption" className="col-span-6">Product</Text>
                <Text variant="caption" className="col-span-2 text-center">Price</Text>
                <Text variant="caption" className="col-span-2 text-center">Quantity</Text>
                <Text variant="caption" className="col-span-2 text-center">Subtotal</Text>
              </div>
              <div className="divide-y divide-border-light">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Action buttons under the cart items */}
              <div className="p-4 bg-background border-t border-border-light flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <Button
                  onClick={handleClearCart}
                  variant="danger"
                  size="xs"
                  disabled={clearingCart || cartItems.length === 0}
                  leftIcon={<TrashIcon size={14} />}
                >
                  Clear Cart ({cartItems.length})
                </Button>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center text-primary hover:text-primary-dark font-medium text-sm transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-surface rounded-lg shadow-sm p-4">
              <Heading level={5} weight="semibold">Order Summary</Heading>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <Text variant="body-sm" tone="secondary">Total</Text>
                  <Text variant="body-sm" weight="medium">{formatCurrency(subtotal)}</Text>
                </div>
                <Text variant="caption" tone="secondary">
                  Tax and shipping will be calculated at checkout
                </Text>
              </div>
              <form onSubmit={handleApplyCoupon} className="mb-4">
                <label htmlFor="coupon-code" className="block text-sm font-medium mb-2 text-copy">Promo Code (Optional)</label>
                <div className="flex gap-1">
                  <Input
                    id="coupon-code"
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="xs"
                    aria-label="Apply coupon code"
                  >
                    Apply
                  </Button>
                </div>
              </form>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  fullWidth={true}
                  size="xs"
                >
                  {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Remove Item Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRemoveItemModal}
        onClose={() => {
          setShowRemoveItemModal(false);
          setItemToRemove(null);
        }}
        onConfirm={confirmRemoveItem}
        title="Remove Item"
        message={itemToRemove?.message || 'Are you sure you want to remove this item from your cart?'}
        confirmText="Remove Item"
        cancelText="Keep Item"
        variant="warning"
      />

      {/* Clear Cart Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        onConfirm={confirmClearCart}
        title="Clear Cart"
        message={`Are you sure you want to remove all ${cartItems.length} items from your cart? This action cannot be undone.`}
        confirmText="Clear Cart"
        cancelText="Keep Items"
        variant="danger"
        loading={clearingCart}
      />
    </motion.div>
  );
};

export default Cart;