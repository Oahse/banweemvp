import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, PackageIcon, SearchIcon } from 'lucide-react';

/**
 * Reusable Empty State component for displaying when no data is available
 * @param {Object} props
 * @param {'cart' | 'wishlist' | 'products' | 'orders' | 'search' | 'custom'} props.type - Type of empty state
 * @param {string} props.title - Title text
 * @param {string} props.description - Description text
 * @param {string} props.actionText - Button text
 * @param {string} props.actionLink - Button link
 * @param {React.ReactNode} props.icon - Custom icon component
 * @param {string} props.className - Additional CSS classes
 */
export const EmptyState = ({
  type = 'custom',
  title,
  description,
  actionText,
  actionLink,
  icon,
  className = '',
}) => {
  // Default configurations for different types
  const configs = {
    cart: {
      icon: <ShoppingCartIcon size={48} className="text-gray-400" />,
      title: 'Your cart is empty',
      description: "Looks like you haven't added any products to your cart yet.",
      actionText: 'Continue Shopping',
      actionLink: '/products',
    },
    wishlist: {
      icon: <HeartIcon size={48} className="text-gray-400" />,
      title: 'Your wishlist is empty',
      description: 'Add items you love to your wishlist to easily find them later.',
      actionText: 'Start Shopping',
      actionLink: '/products',
    },
    products: {
      icon: <PackageIcon size={48} className="text-gray-400" />,
      title: 'No products found',
      description: 'Try adjusting your search or filter criteria.',
      actionText: 'Clear Filters',
      actionLink: null, // Will be handled by parent
    },
    orders: {
      icon: <PackageIcon size={48} className="text-gray-400" />,
      title: 'No orders yet',
      description: "You haven't placed any orders yet.",
      actionText: 'Start Shopping',
      actionLink: '/products',
    },
    search: {
      icon: <SearchIcon size={48} className="text-gray-400" />,
      title: 'No results found',
      description: 'Try different keywords or check your spelling.',
      actionText: 'Clear Search',
      actionLink: null,
    },
  };

  const config = configs[type] || {};
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayActionText = actionText || config.actionText;
  const displayActionLink = actionLink !== undefined ? actionLink : config.actionLink;

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {displayIcon}
        </div>
        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          {displayTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {displayDescription}
        </p>
        {displayActionText && displayActionLink && (
          <Link
            to={displayActionLink}
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            {displayActionText}
          </Link>
        )}
        {displayActionText && !displayActionLink && (
          <button
            onClick={() => {
              // This will be handled by parent component
            }}
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            {displayActionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
