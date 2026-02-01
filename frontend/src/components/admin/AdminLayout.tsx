import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { useTheme } from '../../store/ThemeContext';
import { ErrorBoundary } from '../ErrorBoundary';
import {
  LayoutDashboardIcon,
  UsersIcon,
  PackageIcon,
  ShoppingCartIcon,
  BarChart3Icon,
  MenuIcon,
  LogOutIcon,
  Percent,
  TruckIcon,
  BoxesIcon,
  SettingsIcon,
  FileTextIcon,
  TrendingUpIcon,
  GlobeIcon,
  UserIcon,
  ChevronDownIcon,
  CreditCardIcon,
  RefreshCwIcon
} from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { theme } = useTheme();

  // Check if user has admin access (additional security check)
  useEffect(() => {
    // Wait for auth check to complete
    if (isLoading) return;

    // If authenticated but not admin or supplier, redirect to home
    if (user && (user as any).role !== 'Admin' && (user as any).role !== 'Supplier') {
      navigate('/', { replace: true });
    }
  }, [user, isAuthenticated, isLoading, navigate]);

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: <LayoutDashboardIcon size={18} /> },
    { title: 'Orders', path: '/admin/orders', icon: <ShoppingCartIcon size={18} /> },
    { title: 'Products', path: '/admin/products', icon: <PackageIcon size={18} /> },
    { title: 'Users', path: '/admin/users', icon: <UsersIcon size={18} /> },
    { title: 'Subscriptions', path: '/admin/subscriptions', icon: <FileTextIcon size={18} /> },
    { title: 'Payments', path: '/admin/payments', icon: <CreditCardIcon size={18} /> },
    { title: 'Refunds', path: '/admin/refunds', icon: <RefreshCwIcon size={18} /> },
    { title: 'Shipping', path: '/admin/shipping-methods', icon: <TruckIcon size={18} /> },
    { title: 'Tax Rates', path: '/admin/tax-rates', icon: <Percent size={18} /> },
    { title: 'Inventory', path: '/admin/inventory', icon: <BoxesIcon size={18} /> },
    { title: 'Website', path: '/', icon: <GlobeIcon size={18} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    (logout as any)();
    navigate('/');
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-copy-light">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex text-gray-900 dark:text-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-56 transition-transform duration-300 transform flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700`}>
        {/* Logo */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <Link 
            to="/admin" 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Navigate to admin home page"
          >
            <img src="/banwee_logo_green.png" alt="Banwee Logo" className="h-6 mr-2" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Admin</span>
          </Link>
        </div>
        <div className="py-3 flex-1 overflow-y-auto">
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm ${isActive(item.path)
                        ? 'bg-primary text-white font-medium'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    onClick={() => setSidebarOpen(false)}>
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
            <LogOutIcon size={14} className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-56">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 mr-3 md:hidden text-gray-900 dark:text-gray-300">
                <MenuIcon size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {(user as any)?.full_name?.charAt(0) || (user as any)?.firstname?.charAt(0) || 'A'}
                  </div>
                  <span className="text-sm font-medium hidden md:block">
                    {(user as any)?.full_name || `${(user as any)?.firstname} ${(user as any)?.lastname}` || 'Admin'}
                  </span>
                  <ChevronDownIcon size={16} />
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-50 bg-white dark:bg-gray-800">
                    <Link
                      to="/account/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <UserIcon size={16} />
                        <span>Profile</span>
                      </div>
                    </Link>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <LayoutDashboardIcon size={16} />
                        <span>My Account</span>
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOutIcon size={16} />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <ErrorBoundary>
            {children || <Outlet />}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;