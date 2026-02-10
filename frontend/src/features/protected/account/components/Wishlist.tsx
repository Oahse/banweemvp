import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../../WishlistContext';
import { useCart } from '../../../CartContext';
import { useAuth } from '../../../AuthContext';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  TrashIcon, 
  PlusIcon,
  PackageIcon,
  EditIcon,
  EyeIcon,
  ShareIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { ProductCard } from '@/components/generic/ProductCard';
import { Product, ProductVariant } from '../../types';
import { WishlistSkeleton } from './skeletons/WishlistSkeleton';
import { Text, Heading } from '@/components/ui/Text/Text';
interface WishlistItem {
  id: string;
  product_id: string;
  product?: Product;
  variant?: ProductVariant;
  variant_id?: string;
  quantity?: number;
  created_at: string;
}
interface WishlistProps {
  mode?: 'list' | 'manage';
  wishlistId?: string;
}
export const WishlistConsolidated: React.FC<WishlistProps> = ({ mode = 'list', wishlistId }) => {
  const navigate = useNavigate();
  const { defaultWishlist, removeItem, clearWishlist, addItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Use items directly from defaultWishlist for real-time updates
  const items = defaultWishlist?.items || [];

  // Pagination calculations
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Set loading to false once we have defaultWishlist (even if empty)
    if (defaultWishlist !== undefined) {
      setLoading(false);
    }
  }, [defaultWishlist]);

  const handleAddToCart = async (item: WishlistItem) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      navigate('/login');
      return;
    }

    try {
      let variantId = item.variant_id;
      
      if (!variantId && item.product?.variants?.length) {
        variantId = item.product.variants[0].id;
      }

      if (!variantId) {
        toast.error('Product variant not found');
        return;
      }

      await addToCart({
        variant_id: String(variantId),
        quantity: item.quantity || 1,
      });
      
      toast.success(`${item.product?.name || 'Item'} added to cart`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleRemoveFromWishlist = async (itemId: string) => {
    if (!defaultWishlist) return;

    try {
      await removeItem(defaultWishlist.id, itemId);
      toast.success('Item removed from wishlist');
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      toast.error('Failed to remove item');
    }
  };

  const handleClearWishlist = async () => {
    if (!defaultWishlist) return;

    try {
      await clearWishlist();
      setShowClearModal(false);
      toast.success('Wishlist cleared');
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
      toast.error('Failed to clear wishlist');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  const getProductPrice = (product: Product) => {
    // Use backend fields: min_price, max_price with legacy fallback
    const minPrice = product.min_price ?? product.price;
    const maxPrice = product.max_price ?? product.price;
    
    if (minPrice !== undefined && maxPrice !== undefined) {
      if (minPrice === maxPrice) {
        return formatCurrency(minPrice);
      }
      return `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;
    }
    return 'Price not available';
  };

  const getVariantPrice = (variant: ProductVariant) => {
    // Use backend fields with fallback
    const price = variant.current_price || variant.base_price || 0;
    return formatCurrency(price);
  };

  const getStockStatus = (variant: ProductVariant) => {
    // Use backend field: inventory_quantity_available with legacy fallback
    const quantity = variant.inventory_quantity_available || variant.stock || 0;
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (quantity < 5) return { text: `Only ${quantity} left`, color: 'text-yellow-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  // Handle errors gracefully - show empty UI instead of error message
  if (!defaultWishlist && !loading) {
    return (
      <div className="text-center py-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <HeartIcon size={32} className="mx-auto text-gray-400 mb-3" />
        <Text variant="caption" tone="secondary">Unable to load wishlist</Text>
        <Button
          onClick={() => window.location.reload()} 
          variant="link"
          size="sm"
          className="text-xs text-primary hover:underline"
        >
          <Text variant="caption" className="text-primary hover:underline">Try again</Text>
        </Button>
      </div>
    );
  }

  if (loading) {
    return <WishlistSkeleton animation="shimmer" />;
  }

  // List mode - show all wishlist items
  if (mode === 'list') {
    return (
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3">
          <div>
            <Text variant="caption" tone="secondary">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </Text>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/products')}
              variant="primary"
              size="sm"
              className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs"
              leftIcon={<PackageIcon size={16} />}
            >
              <PlusIcon size={16} />
              Browse Products
            </Button>
            {items.length > 0 && (
              <Button
                onClick={() => setShowClearModal(true)}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2 px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-xs"
                leftIcon={<TrashIcon size={16} />}
              >
                <TrashIcon size={16} />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Wishlist Items Grid */}
        {items.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <HeartIcon size={16} className="text-gray-500 dark:text-gray-400" />
            </div>
            <Heading level={2} weight="medium">Your wishlist is empty</Heading>
            <Text variant="caption" tone="secondary">
              Save items you like to your wishlist and they'll appear here.
            </Text>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => navigate('/products')}
                variant="primary"
                size="sm"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs"
                leftIcon={<PackageIcon size={16} />}
              >
                <PlusIcon size={14} />
                Browse Products
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {currentItems.map((item) => {
                const product = item.product;
                const selectedVariant = item.variant || product?.variants?.find(v => v.id === item.variant_id) || product?.variants?.[0];

                // If no product data, show a simple placeholder
                if (!product) {
                  return (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border border-gray-200 dark:border-gray-700">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                        <PackageIcon size={20} className="text-gray-400" />
                      </div>
                      <Heading level={3} weight="medium">Loading product...</Heading>
                      <Text variant="caption" tone="secondary">
                        Product ID: {item.product_id}
                      </Text>
                      <div className="mt-2">
                        <Button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          variant="destructive"
                        ></Button>
                      </div>
                  <ProductCard
                    key={item.id}
                    product={product}
                    selectedVariant={selectedVariant}
                    className=""
                    wishlistMode={true}
                  />
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 pt-4">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon size={14} className="mr-1" />
                <Text variant="caption">Previous</Text>
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 text-xs rounded transition-colors ${
                        currentPage === pageNum
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Text variant="caption">Next</Text>
                <ChevronRightIcon size={14} className="ml-1" />
              </button>
            </div>
          </>
        )}

        {/* Clear Wishlist Modal */}
        {showClearModal && (
          <ConfirmationModal
            isOpen={true}
            onClose={() => setShowClearModal(false)}
            onConfirm={handleClearWishlist}
            title="Clear Wishlist"
            message="Are you sure you want to remove all items from your wishlist?"
            confirmText="Clear All"
            cancelText="Cancel"
          />
        )}
      </div>
    );
  }

  // Manage mode - show detailed wishlist management
  return (
    <div className="p-4 sm:p-6">
      <div className="text-center">
        <Text variant="caption">Wishlist management view would be implemented here</Text>
        <Button
          onClick={() => navigate('/account/wishlist')}
          variant="link"
          size="sm"
          className="mt-4 text-primary hover:underline"
        >
          <Text variant="caption" className="text-primary hover:underline">Back to Wishlist</Text>
        </Button>
      </div>
    </div>
  );
};

export default WishlistConsolidated;

// Simple wrapper for Account page sidebar layout
export const Wishlist = () => {
  return <WishlistConsolidated mode="list" />;
};
