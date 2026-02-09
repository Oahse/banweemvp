import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XIcon, ChevronRightIcon, UserIcon, HeartIcon, ShoppingCartIcon } from 'lucide-react';
import { useCategories } from '../shared/contexts/CategoryContext';
import { useAuth } from '../../features/protected/auth/contexts/AuthContext';
import { useCart } from '../../features/protected/cart/contexts/CartContext';
import { useWishlist } from '../../features/protected/wishlist/contexts/WishlistContext';
import { Button } from '@/components/ui/Button';

/**
 * @typedef {object} MobileCategoriesProps
 * @property {boolean} isOpen
 * @property {() => void} onClose
 */

export const MobileCategories = ({
  isOpen,
  onClose
}) => {
  const { categories, loading, error } = useCategories();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { defaultWishlist } = useWishlist();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const mainNavigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex">
      {/* Slide-in panel */}
      <div className="bg-surface w-4/5 max-w-sm h-full overflow-y-auto text-copy">
        <div className="p-4 border-b border-border-light">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-main">Categories</h3>
            <Button onClick={onClose} variant="ghost" size="sm" className="p-1 hover:bg-background rounded-md">
              <XIcon size={24} />
            </Button>
          </div>
        </div>

        {/* User Actions */}
        <div className="p-4 border-b border-border-light">
          {isAuthenticated ? (
            <>
              <div className="flex items-center justify-between py-2 px-3 bg-primary/10 rounded-md mb-2">
                <div className="flex items-center">
                  <UserIcon size={20} className="mr-2" />
                  <div>
                    <div className="font-medium">
                      Hello, {user?.firstname || user?.full_name?.split(' ')[0] || 'User'}
                    </div>
                    <div className="text-sm opacity-75">My Account</div>
                  </div>
                </div>
                <ChevronRightIcon size={20} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/account/orders" className="py-2 px-3 bg-background rounded-md text-center text-sm hover:bg-border" onClick={onClose}>
                  My Orders
                </Link>
                <Link to="/account/wishlist" className="py-2 px-3 bg-background rounded-md text-center text-sm hover:bg-border" onClick={onClose}>
                  Wishlist
                </Link>
              </div>
              <Button
                onClick={() => {
                  logout();
                  onClose();
                }}
                variant="danger"
                size="sm"
                className="w-full py-2 px-3 bg-red-500 text-white rounded-md text-center text-sm hover:bg-red-600 mt-2"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center justify-between py-2 px-3 bg-primary text-white rounded-md mb-2"
                onClick={onClose}
              >
                <span>Sign In / Register</span>
                <ChevronRightIcon size={20} />
              </Link>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <Link to="/account/orders" className="py-2 px-3 bg-background rounded-md text-center text-sm hover:bg-border" onClick={onClose}>
                  My Orders
                </Link>
                <Link to="/account/wishlist" className="py-2 px-3 bg-background rounded-md text-center text-sm hover:bg-border" onClick={onClose}>
                  Wishlist
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-border-light">
          <h4 className="text-sm font-medium text-copy-light mb-2">Shop By Category</h4>
          <ul>
            {loading ? (
              <li>Loading categories...</li>
            ) : error ? (
              <li>Error loading categories: {error}</li>
            ) : (
              categories?.map((category, index) => (
                <li key={index}>
                  <Link to={`/products?category=${category?.slug}`} className="flex items-center py-3 hover:text-primary" onClick={onClose}>
                    <span className="mr-3 text-xl">{category?.image}</span>
                    <span>{category?.name}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Main Navigation */}
        <div className="p-4">
          <h4 className="text-sm font-medium text-copy-light mb-2">Menu</h4>
          <ul>
            {mainNavigation.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="flex items-center py-3 hover:text-primary border-b border-border-light last:border-0" onClick={onClose}>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div className="p-4 bg-background mt-auto">
          <div className="flex items-center">
            <span className="text-primary mr-2">📞</span>
            <div>
              <span className="block text-sm font-medium text-main">1900100888</span>
              <span className="block text-xs text-copy-light">Support Center</span>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div className="flex-grow" onClick={onClose}></div>
    </div>
  );
};
