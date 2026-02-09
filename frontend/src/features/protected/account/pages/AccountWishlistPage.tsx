import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/features/protected/wishlist/contexts/WishlistContext';
import { useCart } from '@/features/protected/cart/contexts/CartContext';
import { useAuth } from '@/features/protected/auth/contexts/AuthContext';
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
import { Product, ProductVariant } from '@/types';

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

export const Wishlist: React.FC<WishlistProps> = ({ mode = 'list', wishlistId }) => {
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
  // Calculate paginated items
  const wishlistItems = defaultWishlist?.items || [];
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);
  const paginatedItems = wishlistItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setLoading(false);
  }, [defaultWishlist]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 text-sm">Loading wishlist...</span>
      </div>
    );
  }

  if (!wishlistItems.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <HeartIcon size={28} className="text-gray-300 mb-2" />
        <span className="text-sm text-gray-500 mb-2">Your wishlist is empty.</span>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/products')}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <HeartIcon size={20} /> My Wishlist
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedItems.map((item: WishlistItem) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex flex-col">
            <ProductCard product={item.product} variant={item.variant} />
            <div className="mt-2 flex gap-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<ShoppingCartIcon size={14} />}
                onClick={() => addToCart(item.product, item.variant)}
              >
                Add to Cart
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon={<TrashIcon size={14} />}
                onClick={() => {
                  setItemToRemove(item.id);
                  setShowRemoveModal(true);
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            leftIcon={<ChevronLeftIcon size={14} />}
          >
            Prev
          </Button>
          <span className="text-xs">Page {currentPage} of {totalPages}</span>
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            rightIcon={<ChevronRightIcon size={14} />}
          >
            Next
          </Button>
        </div>
      )}
      {/* Remove Modal */}
      {showRemoveModal && (
        <ConfirmationModal
          open={showRemoveModal}
          onClose={() => setShowRemoveModal(false)}
          onConfirm={() => {
            if (itemToRemove) removeItem(itemToRemove);
            setShowRemoveModal(false);
          }}
          title="Remove Item"
          description="Are you sure you want to remove this item from your wishlist?"
        />
      )}
      {/* Clear Modal */}
      {showClearModal && (
        <ConfirmationModal
          open={showClearModal}
          onClose={() => setShowClearModal(false)}
          onConfirm={() => {
            clearWishlist();
            setShowClearModal(false);
          }}
          title="Clear Wishlist"
          description="Are you sure you want to clear your entire wishlist?"
        />
      )}
      {/* Clear Wishlist Button */}
      <Button
        variant="danger"
        size="sm"
        leftIcon={<TrashIcon size={16} />}
        onClick={() => setShowClearModal(true)}
        className="mt-6"
      >
        Clear Wishlist
      </Button>
    </div>
  );
};
