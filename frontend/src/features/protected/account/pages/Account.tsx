import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthContext';
import AccountLayout from '../components/AccountLayout';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
// Account Skeleton for loading states
const AccountSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

// Lazy load account pages (feature-based)
const AccountDashboardPage = lazy(() => import('./AccountDashboardPage'));
const AccountProfilePage = lazy(() => import('./AccountProfilePage'));
const AccountOrdersPage = lazy(() => import('./AccountOrdersPage'));
const AccountOrderDetailPage = lazy(() => import('./AccountOrderDetailPage'));
const AccountTrackOrderPage = lazy(() => import('./AccountTrackOrderPage'));
const ShipmentTracking = lazy(() => import('@/features/shipping/pages/ShipmentTracking')); // TODO: Implement shipping module
const AccountWishlistPage = lazy(() => import('./AccountWishlistPage'));
const AccountWishlistEditPage = lazy(() => import('./AccountWishlistEditPage'));
const AccountAddressesPage = lazy(() => import('./AccountAddressesPage'));
const AccountMySubscriptionsPage = lazy(() => import('./AccountMySubscriptionsPage').then(module => ({ default: module.MySubscriptions })));
const AccountSubscriptionEditPage = lazy(() => import('./AccountSubscriptionEditPage'));
const SubscriptionDetails = lazy(() => import('./SubscriptionDetails'));
// const AccountPaymentMethodsPage = lazy(() => import('./AccountPaymentMethodsPage').then(module => ({ default: module.AccountPaymentMethodsPage }))); // TODO: Implement payment methods

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Main Account Component
export const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isSupplier } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <AccountLayout>
      <Routes>
        <Route path="/" element={<AccountDashboardPage />} />
        <Route path="/dashboard" element={<AccountDashboardPage />} />
        <Route path="/profile" element={<AccountProfilePage />} />
        <Route path="/orders" element={<AccountOrdersPage />} />
        <Route path="/orders/:orderId" element={<AccountOrderDetailPage />} />
        <Route path="/tracking" element={<AccountTrackOrderPage />} />
        {/* <Route path="/tracking/:shipmentId" element={<ShipmentTracking />} /> */} // TODO: Implement shipping module
        <Route path="/wishlist" element={<AccountWishlistPage />} />
        <Route path="/wishlist/:wishlistId/edit" element={<AccountWishlistEditPage />} />
        <Route path="/addresses" element={<AccountAddressesPage />} />
        {/* <Route path="/payment-methods" element={<AccountPaymentMethodsPage />} /> */} // TODO: Implement payment methods
        <Route path="/subscriptions" element={<AccountMySubscriptionsPage /> } />
        <Route path="/subscriptions/:subscriptionId" element={<SubscriptionDetails />} />
        <Route path="/subscriptions/:subscriptionId/edit" element={<AccountSubscriptionEditPage />} />
        <Route path="/subscriptions/:subscriptionId/orders" element={<AccountOrdersPage />} />
        
        {/* Redirect root to dashboard */}
        <Route path="*" element={<AccountDashboardPage />} />
      </Routes>
    </AccountLayout>
  );
};

export default Account;
