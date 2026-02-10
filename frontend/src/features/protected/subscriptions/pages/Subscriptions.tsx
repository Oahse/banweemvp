import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/protected/auth/contexts/AuthContext';
import { useSubscription } from '@/components/shared/hooks/useSubscription';
import { 
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  MapPinIcon,
  CreditCardIcon,
  LogOutIcon,
  PackageIcon,
  ShieldIcon,
  PlusIcon,
  RefreshCwIcon,
  AlertCircleIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { MySubscriptions } from '@/features/subscriptions/components/MySubscriptions';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';
export const Subscriptions = () => {
  const { user, logout, isAdmin, isSupplier } = useAuth();
  const { subscriptions, loading, error, refreshSubscriptions } = useSubscription();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items for sidebar
  const navItems = [
    { path: '/account', label: 'Dashboard', icon: <UserIcon size={20} /> },
    { path: '/account/profile', label: 'Profile', icon: <UserIcon size={20} /> },
    { path: '/account/orders', label: 'Orders', icon: <ShoppingBagIcon size={20} /> },
    { path: '/account/wishlist', label: 'Wishlist', icon: <HeartIcon size={20} /> },
    { path: '/account/addresses', label: 'Addresses', icon: <MapPinIcon size={20} /> },
    { path: '/account/payment-methods', label: 'Payment Methods', icon: <CreditCardIcon size={20} /> },
    { path: '/account/subscriptions', label: 'My Subscriptions', icon: <PackageIcon size={20} /> },
  ];

  if (isSupplier) {
    navItems.splice(2, 0, {
      path: '/account/products',
      label: 'My Products',
      icon: <PackageIcon size={20} />
    });
  }

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin Dashboard', icon: <ShieldIcon size={20} /> });
  }

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Loading state - show skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-surface rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="ml-3">
                  <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 bg-gray-300 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          {/* Content Skeleton */}
          <div className="flex-grow">
            <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="bg-surface rounded-lg shadow-sm p-6">
              <div className="h-32 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state - show error message with retry button
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-surface rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                  {user?.firstname?.charAt(0) || user?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="ml-3">
                  <Heading level={5} weight="medium">
                    {user?.full_name || `${user?.firstname} ${user?.lastname}`}
                  </Heading>
                  <Text variant="body-sm" tone="secondary">{user?.email}</Text>
                </div>
              </div>
              <nav>
                <ul className="space-y-1">
                  {navItems.map(item => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-2 rounded-md ${
                          isActive(item.path)
                            ? 'bg-primary text-white'
                            : 'text-copy-light hover:bg-background'
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                          <Text as="span">{item.label}</Text>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      size="xs"
                      className="flex items-center px-4 py-2 rounded-md text-red-500 hover:bg-red-50 w-full text-left"
                      leftIcon={<LogOutIcon size={16} />}
                    >
                      <LogOutIcon size={20} className="mr-3" />
                        <Text as="span">Logout</Text>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* Error Content */}
          <div className="flex-grow">
            <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <AlertCircleIcon size={48} className="mx-auto text-error mb-4" />
              <Heading level={5} weight="medium">Unable to Load Subscriptions</Heading>
              <Text variant="body" tone="secondary">{error}</Text>
              <Button
                onClick={refreshSubscriptions}
                variant="primary"
                size="xs"
                className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors inline-flex items-center"
                leftIcon={<RefreshCwIcon size={16} />}
              >
                <RefreshCwIcon size={18} className="mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-surface rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
                {user?.firstname?.charAt(0) || user?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3">
                <Text variant="heading-md" weight="medium">
                  {user?.full_name || `${user?.firstname} ${user?.lastname}`}
                </Text>
                <Text variant="body-sm" tone="secondary">{user?.email}</Text>
              </div>
            </div>
            <nav>
              <ul className="space-y-1">
                {navItems.map(item => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        isActive(item.path)
                          ? 'bg-primary text-white'
                          : 'text-copy-light hover:bg-background'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <Text as="span">{item.label}</Text>
                    </Link>
                  </li>
                ))}
                <li>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    size="xs"
                    className="flex items-center px-4 py-2 rounded-md text-red-500 hover:bg-red-50 w-full text-left"
                    leftIcon={<LogOutIcon size={16} />}
                  >
                    <LogOutIcon size={20} className="mr-3" />
                    <Text as="span">Logout</Text>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <Heading level={5} weight="bold">My Subscriptions</Heading>
            <Button
              onClick={() => navigate('/account/subscriptions')}
              variant="primary"
              size="xs"
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              leftIcon={<PlusIcon size={16} />}
            >
              <PlusIcon size={20} className="mr-2" />
              Manage Subscriptions
            </Button>
          </div>
          
          {/* Use the existing MySubscriptions component */}
          <MySubscriptions />
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
