import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  BarChart,
  Package,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  Settings,
  Shield,
  ShoppingCart,
  Tag,
  Truck,
  Warehouse,
  Users,
  DollarSign,
  Receipt,
  Layers,
  FileText,
  PieChart,
  Coins,
  LayoutDashboard,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { cn } from '@/utils/utils';
import { containerFast as containerFastVariants, itemFast as itemFastVariants } from '../../utils/pageAnimations';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const adminNavigationItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Products', href: '/admin/products', icon: Tag },
  { name: 'Categories', href: '/admin/categories', icon: Layers },
  { name: 'Payments', href: '/admin/payments', icon: DollarSign },
  { name: 'Inventory', href: '/admin/inventory', icon: Warehouse },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Tax Rates', href: '/admin/tax-rates', icon: Coins },
  { name: 'Refunds', href: '/admin/refunds', icon: Receipt },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  { name: 'Shipping', href: '/admin/shipping', icon: Truck },
  { name: 'Contact Messages', href: '/admin/contact-messages', icon: Mail },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <Heading level={2} className="text-sm font-medium text-gray-900 dark:text-white">Admin Panel</Heading>
              <Body className="text-xs text-gray-500 dark:text-gray-400">admin@banwee.com</Body>
            </div>
          </div>
          <Button
            onClick={() => setSidebarOpen(false)}
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            leftIcon={<X className="h-5 w-5" />}
          >
          </Button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {adminNavigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.href);
              }}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <item.icon className="h-5 w-5" />
              <Text>{item.name}</Text>
              {location.pathname === item.href && (
                <ChevronRight className="h-4 w-4 ml-auto" />
              )}
            </a>
          ))}
        </nav>
        {/* Sidebar footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <Button
            onClick={() => navigate('/logout')}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            leftIcon={<LogOut className="h-4 w-4" />}
          >
            Logout
          </Button>
        </div>
      </div>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setSidebarOpen(true)}
                variant="ghost"
                size="sm"
                className="lg:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                leftIcon={<Menu className="h-5 w-5" />}
              >
              </Button>
              <div className="flex-1">
                <Heading level={1} className="text-xl font-semibold text-gray-900 dark:text-white">
                  {adminNavigationItems.find(item => location.pathname === item.href)?.name || 'Admin'}
                </Heading>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                size="sm"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                leftIcon={<Home className="w-4 h-4" />}
              >
                <Text className="hidden sm:inline">Home</Text>
              </Button>
              <Button
                onClick={() => navigate('/products')}
                variant="primary"
                size="sm"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                leftIcon={<Package className="w-4 h-4" />}
              >
                <Text className="hidden sm:inline">Products</Text>
              </Button>
            </div>
          </div>
        </div>
        {/* Page content */}
        <main className="flex-1">
          <motion.div 
            className="py-4"
            initial="hidden"
            animate="visible"
            variants={containerFastVariants}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children || <Outlet />}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
