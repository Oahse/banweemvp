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
  ShareIcon
} from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Pagination } from '@/components/ui/Pagination';
import { Text, Heading, Body, Caption } from '@/components/ui/Text/Text';
import { Card } from '@/components/ui/Card';
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
  const totalItems = wishlistItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = wishlistItems.slice(startIndex, endIndex);

  useEffect(() => {
    setLoading(false);
  }, [defaultWishlist]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Body className="text-gray-500 text-sm">Loading wishlist...</Body>
      </div>
    );
  }

  if (!wishlistItems.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <HeartIcon size={28} className="text-gray-300 mb-2" />
        <Body className="text-sm text-gray-500 mb-2">Your wishlist is empty.</Body>
        <Button
          variant="primary"
          size="xs"
          onClick={() => navigate('/products')}
        >
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center gap-2">
          <HeartIcon size={20} />
          <Card.Title size="md">My Wishlist</Card.Title>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginatedItems.map((item: WishlistItem) => (
            <ProductCard key={item.id} product={item.product} selectedVariant={item.variant} className="" />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              showingStart={startIndex + 1}
              showingEnd={Math.min(endIndex, totalItems)}
              itemName="items"
            />
          </div>
        )}

        {/* Clear Wishlist Button */}
        <Button
          variant="danger"
          size="xs"
          leftIcon={<TrashIcon size={16} />}
          onClick={() => setShowClearModal(true)}
          className="mt-6"
        >
          Clear Wishlist
        </Button>
      </Card.Body>
      {/* Remove Modal */}
      {showRemoveModal && (
        <ConfirmationModal
          isOpen={showRemoveModal}
          onClose={() => setShowRemoveModal(false)}
          onConfirm={() => {
            if (itemToRemove) removeItem(itemToRemove, defaultWishlist?.id || '');
            setShowRemoveModal(false);
          }}
          title="Remove Item"
          message="Are you sure you want to remove this item from your wishlist?"
        />
      )}
      {/* Clear Modal */}
      {showClearModal && (
        <ConfirmationModal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          onConfirm={() => {
            clearWishlist();
            setShowClearModal(false);
          }}
          title="Clear Wishlist"
          message="Are you sure you want to clear your entire wishlist?"
        />
      )}
    </Card>
  );
};
