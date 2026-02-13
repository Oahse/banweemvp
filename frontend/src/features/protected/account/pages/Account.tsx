import { useEffect, Suspense, lazy } from 'react';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/protected/auth/contexts/AuthContext';
import AccountLayout from '@/components/layout/AccountLayout';
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
const AccountWishlistPage = lazy(() => import('./AccountWishlistPage'));
const AccountAddressesPage = lazy(() => import('./AccountAddressesPage'));
const AccountMySubscriptionsPage = lazy(() => import('./AccountMySubscriptionsPage'));
const AccountMySubscriptionDetailPage = lazy(() => import('./AccountMySubscriptionDetailPage'));
const AccountSubscriptionEditPage = lazy(() => import('./AccountMySubscriptionEditPage'));
const AccountPaymentMethodsPage = lazy(() => import('./AccountPaymentMethodsPage'));

// Loading Spinner fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <AnimatedLoader size="lg" variant="spinner" color="primary" />
  </div>
);

// Main Account Component
export const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return <LoadingFallback />;
  }

  return (
    <AccountLayout>
      <Suspense fallback={<AccountSkeleton />}>
        <Routes>
          <Route path="/" element={<AccountDashboardPage />} />
          <Route path="/dashboard" element={<AccountDashboardPage />} />
          <Route path="/profile" element={<AccountProfilePage />} />
          <Route path="/orders" element={<AccountOrdersPage />} />
          <Route path="/orders/:orderId" element={<AccountOrderDetailPage />} />
          <Route path="/tracking" element={<AccountTrackOrderPage />} />
          <Route path="/wishlist" element={<AccountWishlistPage />} />
          <Route path="/addresses" element={<AccountAddressesPage />} />
          <Route path="/payment-methods" element={<AccountPaymentMethodsPage />} />
          <Route path="/subscriptions" element={<AccountMySubscriptionsPage /> } />
          <Route path="/subscriptions/:subscriptionId" element={<AccountMySubscriptionDetailPage />} />
          <Route path="/subscriptions/:subscriptionId/edit" element={<AccountSubscriptionEditPage />} />
          <Route path="/subscriptions/:subscriptionId/orders" element={<AccountOrdersPage />} />
          
          {/* Redirect root to dashboard */}
          <Route path="*" element={<AccountDashboardPage />} />
        </Routes>
      </Suspense>
    </AccountLayout>
  );
};

export default Account;
