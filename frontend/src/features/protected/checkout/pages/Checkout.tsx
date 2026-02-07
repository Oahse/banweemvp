/**
 * Checkout Page - Simplified one-click checkout
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../cart/contexts/CartContext';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useTheme } from '../../../../components/shared/contexts/ThemeContext';
import { AuthAPI } from '../api/auth';
import { CartAPI } from '../../../../api/cart';
import { toast } from 'react-hot-toast';
import SmartCheckoutForm from '../components/SmartCheckoutForm';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading, clearCart, refreshCart } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { theme } = useTheme();

  // UI state
  const [loading, setLoading] = useState(false);
  const [stockValidation, setStockValidation] = useState({ valid: true, issues: [] });

  // Handle authentication check
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!authLoading && !isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Redirect if cart is empty (only after auth is confirmed)
  useEffect(() => {
    if (!authLoading && isAuthenticated && !cartLoading && (!cart || !cart.items || cart.items.length === 0)) {
      navigate('/cart');
    }
  }, [cart, cartLoading, navigate, authLoading, isAuthenticated]);

  // Real-time stock validation using bulk check
  useEffect(() => {
    const validateStock = async () => {
      if (!cart?.items || cart.items.length === 0) {
        setStockValidation({ valid: true, issues: [] });
        return;
      }

      try {
        // Use bulk stock check for better performance
        const stockCheckRes = await CartAPI.checkBulkStock(cart.items.map(item => ({
          variant_id: item.variant_id || item.variant?.id,
          quantity: item.quantity
        })));

        // FIXED: Handle wrapped response structure
        // Response might be: { success: true, data: { items: [...], all_available: boolean } }
        const stockCheckData = stockCheckRes.data || stockCheckRes;
        const stockCheck = stockCheckData?.data || stockCheckData;
        
        const stockIssues = stockCheck?.items?.filter((item: any) => !item.available) || [];

        setStockValidation({
          valid: stockCheck?.all_available || (stockIssues.length === 0),
          issues: stockIssues.map((issue: any) => ({
            variant_id: issue.variant_id,
            message: issue.message || 'Out of stock',
            current_stock: issue.current_stock || 0,
            requested_quantity: issue.quantity_requested || 0
          }))
        });

        // Show toast for stock issues
        if (stockIssues.length > 0) {
          const itemCount = stockIssues.length;
          toast.error(`${itemCount} item${itemCount > 1 ? 's' : ''} in your cart ${itemCount > 1 ? 'are' : 'is'} no longer available`);
        }
      } catch (error) {
        console.error('Stock validation failed:', error);
        setStockValidation({ valid: false, issues: [] });
      }
    };

    // Only validate stock if authenticated and cart is loaded
    if (!authLoading && isAuthenticated && cart?.items) {
      validateStock();
      const interval = setInterval(validateStock, 300000); // 5 minutes
      return () => clearInterval(interval);
    }
  }, [cart?.items, authLoading, isAuthenticated]);

  // Checkout handler
  // FIXED: SmartCheckoutForm success handler - properly clear cart and navigate
  const handleSmartCheckoutSuccess = (orderId: string) => {
    clearCart().then(() => {
      navigate(`/account/orders/${orderId}`, {
        replace: true,
        state: { fromCheckout: true }
      });
    }).catch((error) => {
      console.error('Failed to clear cart:', error);
      // Still navigate even if cart clearing fails
      navigate(`/account/orders/${orderId}`, {
        replace: true,
        state: { fromCheckout: true }
      });
    });
  };

  // Show loading state while checking authentication or loading cart
  if (authLoading || (isAuthenticated && cartLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-copy-light dark:text-copy-light-dark">
            {authLoading ? 'Checking authentication...' : 'Loading checkout...'}
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated && !authLoading) {
    return null;
  }

  // Don't render if cart is empty (redirect will happen)
  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-copy dark:text-copy-dark mb-2">Checkout</h1>
          <p className="text-sm text-copy-light dark:text-copy-light-dark">
            Complete your purchase quickly and securely
          </p>
        </div>

        {/* Stock Validation Warning */}
        {!stockValidation.valid && stockValidation.issues.length > 0 && (
          <div className="mb-6 bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/30 dark:border-destructive-dark/30 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-destructive dark:text-destructive-dark" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-destructive dark:text-destructive-dark">
                  Stock Issues Detected
                </h3>
                <div className="mt-2 text-sm text-destructive dark:text-destructive-dark">
                  <ul className="list-disc pl-5 space-y-1">
                    {stockValidation.issues.map((issue, index) => (
                      <li key={index} className="text-destructive/80 dark:text-destructive-dark/80">
                        {issue.message}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => navigate('/cart')}
                    className="bg-destructive dark:bg-destructive-dark text-copy-inverse dark:text-copy-inverse-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-destructive/90 dark:hover:bg-destructive-dark/90 transition-colors"
                  >
                    Review Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout */}
        {stockValidation.valid && (
          <SmartCheckoutForm
            onSuccess={handleSmartCheckoutSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;