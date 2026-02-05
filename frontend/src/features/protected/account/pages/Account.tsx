import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import AccountLayout from '../components/AccountLayout';
import { ProtectedRoute } from '../../../components/shared/ProtectedRoute';
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
const Orders = lazy(() => import('./Orders'));
const AccountOrderDetailPage = lazy(() => import('./AccountOrderDetailPage'));
const TrackOrder = lazy(() => import('./TrackOrder'));
const ShipmentTracking = lazy(() => import('../../shipping/pages/ShipmentTracking'));
const Wishlist = lazy(() => import('./Wishlist'));
const WishlistEdit = lazy(() => import('./WishlistEdit'));
const Addresses = lazy(() => import('./Addresses'));
const MySubscriptions = lazy(() => import('./MySubscriptions').then(module => ({ default: module.MySubscriptions })));
const SubscriptionEdit = lazy(() => import('./SubscriptionEdit'));
const SubscriptionOrders = lazy(() => import('./SubscriptionOrders').then(module => ({ default: module.SubscriptionOrders })));
const SubscriptionDetails = lazy(() => import('./SubscriptionDetails'));
const PaymentMethods = lazy(() => import('./PaymentMethods').then(module => ({ default: module.PaymentMethods })));

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
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<AccountOrderDetailPage />} />
        <Route path="/tracking" element={<TrackOrder />} />
        <Route path="/tracking/:shipmentId" element={<ShipmentTracking />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/wishlist/:wishlistId/edit" element={<WishlistEdit />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/subscriptions" element={<MySubscriptions /> } />
        <Route path="/subscriptions/:subscriptionId" element={<SubscriptionDetails />} />
        <Route path="/subscriptions/:subscriptionId/edit" element={<SubscriptionEdit />} />
        <Route path="/subscriptions/:subscriptionId/orders" element={<SubscriptionOrders />} />
        
        {/* Redirect root to dashboard */}
        <Route path="*" element={<AccountDashboardPage />} />
      </Routes>
    </AccountLayout>
  );
};

export default Account;
