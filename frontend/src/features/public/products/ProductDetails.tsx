import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRightIcon,
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  MinusIcon,
  PlusIcon,
  QrCodeIcon,
  ScanLineIcon,
  CalendarIcon,
} from 'lucide-react';

import { ProductImageGallery } from './components/ProductImageGallery';
import { VariantSelector } from './components/VariantSelector';
import { QRCodeModal } from './components/QRCodeModal';
import { BarcodeModal } from './components/BarcodeModal';
import { ProductCard } from '../../../components/generic/ProductCard';
import { SubscriptionSelector } from '../../protected/subscriptions/components/SubscriptionSelector';
import ReviewForm from './components/ReviewForm';
import { Dropdown } from '../../../components/ui/Dropdown';
import { useCart } from '../../protected/cart/contexts/CartContext';
import { useWishlist } from '../../protected/wishlist/contexts/WishlistContext';
import { useLocale } from '../../../components/shared/contexts/LocaleContext';
import { useApi } from '../../../components/shared/hooks/useAsync';
import { useSubscriptionAction } from '../../protected/subscriptions/hooks/useSubscription';
import { ProductsAPI, ReviewsAPI } from '../../../api';
import { Product, ProductVariant, ProductImage } from '../../../types';
import { containerVariants, itemVariants } from '../../../utils/pageAnimations';

import ErrorMessage from '../../../components/shared/Error';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../protected/auth/hooks/useAuth';

// Local interfaces for component state
interface SelectedVariant {
  id: string;
  name: string;
  base_price: number;
  sale_price: number | null;
  current_price: number;
  discount_percentage: number;
  stock: number;
  sku: string;
  attributes: Record<string, any>;
  barcode: string;
  qr_code: string;
  tags?: string[];
  dietary_tags?: string[];
  specifications?: Record<string, any>;
  availability_status?: string;
  is_active?: boolean;
  images?: any[]; // Add images property
  inventory?: {
    id: string;
    quantity_available: number;
    low_stock_threshold: number;
    inventory_status: string;
  };
}

// Product Details Component - using backend data directly
export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('description');
  const [showQR, setShowQR] = useState<boolean>(false);
  const [showBarcode, setShowBarcode] = useState<boolean>(false);
  const [showSubscriptionSelector, setShowSubscriptionSelector] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [maxRating, setMaxRating] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [reviewsPage, setReviewsPage] = useState<number>(1);
  const [isCartUpdating, setIsCartUpdating] = useState<boolean>(false);
  const [isWishlistUpdating, setIsWishlistUpdating] = useState<boolean>(false);

  const { addItem: addToCart, removeItem: removeFromCart, updateQuantity, cart, refreshCart } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist, defaultWishlist } = useWishlist();
  const { executeWithAuth } = useAuth();
  const { isAuthenticated, hasActiveSubscriptions } = useSubscriptionAction();
  const { formatCurrency } = useLocale();

  // API calls
  const {
    data: productData,
    loading: productLoading,
    error: productError,
    execute: fetchProduct,
  } = useApi();

  const {
    data: relatedProductsData,
    loading: relatedLoading,
    error: relatedError,
    execute: fetchRelatedProducts,
  } = useApi();

  const {
    data: reviewsData,
    loading: reviewsLoading,
    error: reviewsError,
    execute: fetchReviews,
  } = useApi();

  // Fetch product data
  useEffect(() => {
    if (id && id !== 'search') {
      fetchProduct(() => ProductsAPI.getProduct(id));
      // Fetch related products based on current product
      fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id, 4));
    }
  }, [id, fetchProduct, fetchRelatedProducts]);

  // Extract actual data from API response with proper type guards
  const actualProductData: any = (productData && typeof productData === 'object' && 'data' in productData)
    ? (productData as any).data
    : productData;
  const actualRelatedData: any = relatedProductsData?.data || relatedProductsData;
  const actualReviewsData: any = reviewsData?.data ? {
    data: reviewsData.data.data || reviewsData.data,
    total: reviewsData.data.total || reviewsData.total || 0,
    limit: reviewsData.data.limit || reviewsData.limit || 10
  } : { data: [], total: 0, limit: 10 };

  // Fetch reviews when product ID, filters, or page change
  useEffect(() => {
    if (id && id !== 'search') {
      const params = new URLSearchParams();
      params.append('page', reviewsPage.toString());
      params.append('limit', '10');
      if (minRating !== undefined) params.append('min_rating', minRating.toString());
      if (maxRating !== undefined) params.append('max_rating', maxRating.toString());
      if (sortBy) params.append('sort_by', sortBy);
      
      fetchReviews(() => ReviewsAPI.getProductReviews(id, reviewsPage, 10, minRating, maxRating, sortBy));
    }
  }, [id, reviewsPage, minRating, maxRating, sortBy, fetchReviews]);

  // Set initial variant when product loads
  useEffect(() => {
    if (actualProductData && actualProductData.variants && actualProductData.variants.length > 0) {
      const variant = actualProductData.variants[0];
      setSelectedVariant({
        id: variant.id,
        name: variant.name,
        base_price: variant.base_price,
        sale_price: variant.sale_price,
        current_price: variant.current_price,
        discount_percentage: variant.discount_percentage,
        stock: variant.stock,
        sku: variant.sku,
        attributes: variant.attributes,
        barcode: variant.barcode,
        qr_code: variant.qr_code,
        tags: variant.tags,
        dietary_tags: variant.dietary_tags,
        specifications: variant.specifications,
        availability_status: variant.availability_status,
        is_active: variant.is_active,
        images: variant.images, // Add images
        inventory: variant.inventory,
      });
      // Reset image selection when product changes
      setSelectedImage(0);
    }
  }, [actualProductData]);

  // Update images when variant changes
  useEffect(() => {
    if (selectedVariant) {
      setSelectedImage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant?.id]);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  if (!id || id === 'search') {
    return <div>Product not found</div>;
  }

  if (productLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded"></div>
              <div className="bg-gray-200 h-6 rounded w-3/4"></div>
              <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              <div className="bg-gray-200 h-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (productError || !actualProductData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={productError?.message || 'Product not found'}
          onRetry={() => fetchProduct(() => ProductsAPI.getProduct(id))}
        />
      </div>
    );
  }

  // Calculate average rating and total reviews with null checks
  const reviewsList = actualReviewsData.data || [];
  const averageRating = Array.isArray(reviewsList) && reviewsList.length > 0
    ? reviewsList.reduce((acc, review) => acc + (review?.rating || 0), 0) / reviewsList.length
    : 0;
  const totalReviews = actualReviewsData.total || 0;

  // Use backend data directly without transformation
  const product = actualProductData;
  
  // If product data is not available, show error
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={'Failed to load product data'}
          onRetry={() => fetchProduct(() => ProductsAPI.getProduct(id))}
        />
      </div>
    );
  }
  
  const isInWishlistState = isInWishlist(product.id, selectedVariant?.id);

  // Get cart item quantity with null checks and validation
  const cartItem = cart?.items?.find(item => 
    item?.variant?.id === selectedVariant?.id && 
    item?.id && 
    item?.quantity > 0
  );
  const cartQuantity = cartItem?.quantity || 0;

  // Helper function to handle cart operations with better error handling and real-time updates
  const handleCartOperation = async (operation: 'increment' | 'decrement') => {
    if (!selectedVariant) {
      toast.error('Please select a variant');
      return;
    }

    if (isCartUpdating) {
      toast.error('Please wait, updating cart...');
      return;
    }

    setIsCartUpdating(true);

    try {
      console.log(`Cart ${operation}:`, { 
        cartItemId: cartItem?.id, 
        currentQuantity: cartQuantity, 
        variantId: selectedVariant.id,
        stock: selectedVariant.stock
      });

      if (operation === 'decrement') {
        const newQuantity = Math.max(0, cartQuantity - 1);
        if (newQuantity === 0) {
          if (cartItem) {
            await removeFromCart(cartItem.id);
            toast.success('Item removed from cart');
          } else {
            toast.error('Item not found in cart');
          }
        } else {
          if (cartItem) {
            await updateQuantity(cartItem.id, newQuantity);
            toast.success('Cart updated');
          } else {
            toast.error('Cart item not found');
          }
        }
      } else {
        // Check stock availability
        const availableStock = selectedVariant.inventory?.quantity_available ?? selectedVariant.stock;
        if (cartQuantity >= availableStock) {
          toast.error('Cannot add more items than available in stock');
          return;
        }

        if (cartItem) {
          await updateQuantity(cartItem.id, cartQuantity + 1);
          toast.success('Cart updated');
        } else {
          // Add new item to cart
          await addToCart({ variant_id: String(selectedVariant.id), quantity: 1 });
          toast.success('Item added to cart');
        }
      }
      
      // Refresh cart to ensure real-time sync
      await refreshCart();
      
    } catch (error: any) {
      console.error(`Failed to ${operation} cart:`, error);
      
      // Handle different error types
      if (error?.status === 404 || error?.statusCode === 404 || error?.message?.includes('not found')) {
        toast.error('Cart item not found. Refreshing cart...');
        await refreshCart();
        
        // For increment operations, try to add the item fresh
        if (operation === 'increment') {
          try {
            await addToCart({ variant_id: String(selectedVariant.id), quantity: 1 });
            toast.success('Item re-added to cart');
            await refreshCart();
          } catch (addError) {
            console.error('Failed to re-add item:', addError);
            toast.error('Failed to add item to cart');
          }
        }
      } else if (error?.status === 400 || error?.statusCode === 400) {
        toast.error('Invalid request. Please try again.');
      } else if (error?.message?.includes('stock')) {
        toast.error('Not enough stock available');
      } else {
        toast.error(error?.message || `Failed to ${operation} cart item`);
      }
    } finally {
      setIsCartUpdating(false);
    }
  };

  // Check if product is in wishlist


  return (
    <motion.div 
      className="pb-16 md:pb-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb */}
      <motion.div className="bg-surface py-4" variants={itemVariants}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-copy-light">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRightIcon size={16} />
            <Link to="/products" className="hover:text-primary">Products</Link>
            <ChevronRightIcon size={16} />
            <span className="text-main">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery
              images={selectedVariant?.images || []}
              selectedImageIndex={selectedImage}
              onImageSelect={setSelectedImage}
              showThumbnails={true}
              zoomEnabled={true}
              className=""
            />
            
            {/* Debug: Show image count */}
            {process.env.NODE_ENV === 'development' && (
              <div className="text-xs text-gray-500 mt-2">
                Total Images: {actualProductData.variants?.flatMap((variant: ProductVariant) => variant.images || [])?.length || 0} | 
                Selected Variant: {selectedVariant?.name || 'None'} | 
                Selected Variant Images: {selectedVariant?.images?.length || 0}
              </div>
            )}
            
            {/* QR Code and Barcode Section - Mobile Optimized */}
            {selectedVariant && (
              <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-2 justify-center mt-4">
                {selectedVariant.qr_code && (
                  <button
                    onClick={() => setShowQR(true)}
                    className="flex items-center justify-center space-x-2 text-sm text-primary hover:underline px-3 py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <QrCodeIcon size={16} />
                    <span className="sm:inline">View QR Code</span>
                  </button>
                )}
                
                {selectedVariant.barcode && (
                  <button
                    onClick={() => setShowBarcode(true)}
                    className="flex items-center justify-center space-x-2 text-sm text-primary hover:underline px-3 py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <ScanLineIcon size={16} />
                    <span className="sm:inline">View Barcode</span>
                  </button>
                )}
                
                {/* Show SKU on mobile */}
                <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 px-3 py-2 sm:hidden">
                  SKU: {selectedVariant.sku || product.sku}
                </div>
              </div>
            )}

            {/* QR Code Modal */}
            <QRCodeModal
              data={`${window.location.origin}/products/${id}`}
              title={`${product.name} - QR Code`}
              description={`Scan to view ${product.name} product page`}
              isOpen={showQR}
              onClose={() => setShowQR(false)}
            />

            {/* Barcode Modal */}
            {selectedVariant && (
              <BarcodeModal
                variant={{
                  id: selectedVariant.id,
                  product_id: actualProductData.id,
                  sku: selectedVariant.sku,
                  name: selectedVariant.name,
                  base_price: selectedVariant.base_price,
                  sale_price: selectedVariant.sale_price,
                  stock: selectedVariant.stock,
                  product_name: product.name,
                  barcode: JSON.stringify({
                    url: `${window.location.origin}/products/${id}`,
                    productId: actualProductData.id,
                    sku: selectedVariant.sku,
                    variantId: selectedVariant.id,
                    variantName: selectedVariant.name,
                    supplier: actualProductData.supplier ? `${actualProductData.supplier.firstname || ''} ${actualProductData.supplier.lastname || ''}`.trim() : 'Unknown',
                    price: selectedVariant.sale_price || selectedVariant.base_price,
                    stock: selectedVariant.stock,
                    attributes: selectedVariant.attributes
                  }),
                  qr_code: selectedVariant.qr_code
                }}
                title={`${product.name} - Barcode`}
                isOpen={showBarcode}
                onClose={() => setShowBarcode(false)}
                canGenerate={false} // Set to true if user has admin permissions
              />
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-main mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating_average || product.rating || averageRating) ? 'fill-current' : ''}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-copy-light ml-2">
                    ({product.review_count || product.reviewCount || totalReviews} reviews)
                  </span>
                </div>
                <span className="text-xs text-copy-light">SKU: {selectedVariant?.sku || 'N/A'}</span>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                {selectedVariant?.sale_price && selectedVariant.sale_price < selectedVariant.base_price ? (
                  <>
                    <span className="text-xl font-bold text-primary">
                      {formatCurrency(selectedVariant.sale_price)}
                    </span>
                    <span className="text-sm text-copy-light line-through">
                      {formatCurrency(selectedVariant.base_price)}
                    </span>
                    <span className="bg-error-100 text-error-600 px-2 py-1 rounded text-xs font-medium">
                      {Math.round(((selectedVariant.base_price - selectedVariant.sale_price) / selectedVariant.base_price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(
                      selectedVariant?.sale_price ||
                      selectedVariant?.base_price ||
                      product.price_range?.min ||
                      product.min_price ||
                      product.price ||
                      0
                    )}
                  </span>
                )}
              </div>

              <p className="text-sm text-copy-light mb-6">{product.description}</p>
              
              {/* Variant Selection - Moved under description */}
              {actualProductData?.variants && actualProductData.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-main mb-2">Available Variants</h3>
                  <div className="space-y-1">
                    {actualProductData.variants.map((variant: any, index: number) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      const isAvailable = variant.stock > 0;
                      const currentPrice = variant.sale_price || variant.base_price;
                      
                      return (
                        <button
                          key={variant.id}
                          onClick={() => {
                            if (isAvailable) {
                              setSelectedVariant({
                                id: variant.id,
                                name: variant.name,
                                base_price: variant.base_price,
                                sale_price: variant.sale_price,
                                current_price: variant.current_price,
                                discount_percentage: variant.discount_percentage,
                                stock: variant.stock,
                                sku: variant.sku,
                                attributes: variant.attributes,
                                barcode: variant.barcode,
                                qr_code: variant.qr_code,
                                tags: variant.tags,
                                dietary_tags: variant.dietary_tags,
                                specifications: variant.specifications,
                                availability_status: variant.availability_status,
                                is_active: variant.is_active,
                                images: variant.images,
                                inventory: variant.inventory,
                              });
                              setSelectedImage(0);
                            }
                          }}
                          disabled={!isAvailable}
                          className={`w-full p-2 border rounded text-left transition-all text-sm ${
                            isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-border-strong'
                          } ${
                            !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <div className={`w-3 h-3 rounded-full border flex-shrink-0 ${
                                isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                              }`}>
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white mx-auto mt-0.75"></div>
                                )}
                              </div>
                              <span className="font-medium text-main truncate">
                                {variant.name || `Variant ${index + 1}`}
                              </span>
                              {variant.sku && (
                                <span className="text-xs text-copy-light flex-shrink-0">SKU: {variant.sku}</span>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <div className="text-right">
                                <div className="text-sm font-bold text-primary">
                                  ${currentPrice.toFixed(2)}
                                </div>
                                {variant.sale_price && variant.sale_price < variant.base_price && (
                                  <div className="text-xs text-copy-light line-through">
                                    ${variant.base_price.toFixed(2)}
                                  </div>
                                )}
                              </div>
                              <div className={`text-xs px-1.5 py-0.5 rounded-full ${
                                isAvailable
                                  ? 'bg-success-100 text-success-800'
                                  : 'bg-error-100 text-error-800'
                              }`}>
                                {isAvailable ? `${variant.stock}` : 'Out'}
                              </div>
                            </div>
                          </div>
                          
                          {variant.attributes && Object.keys(variant.attributes).length > 0 && (
                            <div className="mt-1 text-xs text-copy-light truncate">
                              {Object.entries(variant.attributes).map(([key, value], idx) => (
                                <span key={key} className={idx > 0 ? 'ml-2' : ''}>
                                  <span className="capitalize">{key.replace('_', ' ')}:</span> {String(value)}
                                </span>
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Stock Status */}
            {selectedVariant && (
              <div className="mb-4">
                {(selectedVariant.inventory?.quantity_available ?? selectedVariant.stock) > 0 ? (
                  <span className="text-xs text-success-600 font-medium">
                    ✓ In Stock ({selectedVariant.inventory?.quantity_available ?? selectedVariant.stock} available)
                  </span>
                ) : (
                  <span className="text-xs text-error-600 font-medium">
                    ✗ Out of Stock
                  </span>
                )}
              </div>
            )}

            {/* Quantity Selection */}
            {selectedVariant && (selectedVariant.inventory?.quantity_available ?? selectedVariant.stock) > 0 && (
              <div>
                <h3 className="text-xs font-medium text-main mb-3">Quantity:</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                  >
                    <MinusIcon size={12} />
                  </button>
                  <span className="w-12 text-center font-medium text-sm">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={selectedVariant && quantity >= (selectedVariant.inventory?.quantity_available ?? selectedVariant.stock)}
                    className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                  >
                    <PlusIcon size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 mb-6">
              {/* Cart Button with Quantity */}
              <div className="flex space-x-3">
                <div className="flex-1">
                  {cartQuantity > 0 ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCartOperation('decrement')}
                        disabled={isCartUpdating}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 rounded-md transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isCartUpdating ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                        ) : (
                          <MinusIcon size={12} />
                        )}
                      </button>
                      <span className="bg-primary text-white px-3 py-2 rounded-md font-medium min-w-[100px] text-center text-xs">
                        In Cart ({cartQuantity})
                      </span>
                      <button
                        onClick={() => handleCartOperation('increment')}
                        disabled={isCartUpdating || (selectedVariant ? cartQuantity >= (selectedVariant.inventory?.quantity_available ?? selectedVariant.stock) : true)}
                        className="bg-primary hover:bg-primary-dark text-white p-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                      >
                        {isCartUpdating ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        ) : (
                          <PlusIcon size={12} />
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        if (!selectedVariant) return;
                        if (isCartUpdating) return;
                        
                        setIsCartUpdating(true);
                        await executeWithAuth(async () => {
                          try {
                            await addToCart({ variant_id: String(selectedVariant.id), quantity: quantity });
                            toast.success(`${quantity} item(s) added to cart`);
                            await refreshCart();
                            return true;
                          } catch (error: any) {
                            console.error('Failed to add to cart:', error);
                            toast.error(error?.message || 'Failed to add item to cart');
                            return false;
                          }
                        }, 'cart');
                        setIsCartUpdating(false);
                      }}
                      disabled={!selectedVariant || (selectedVariant.inventory?.quantity_available ?? selectedVariant.stock) <= 0 || isCartUpdating}
                      className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md font-medium transition-colors flex items-center justify-center text-xs"
                    >
                      {isCartUpdating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCartIcon size={16} className="mr-2" />
                          {selectedVariant && (selectedVariant.inventory?.quantity_available ?? selectedVariant.stock) <= 0 ? 'Out of Stock' : 'Add to Cart'}
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={async () => {
                    if (isWishlistUpdating) {
                      toast.error('Please wait, updating wishlist...');
                      return;
                    }

                    setIsWishlistUpdating(true);
                    
                    await executeWithAuth(async () => {
                      if (!defaultWishlist) {
                        toast.error("No default wishlist found.");
                        return false;
                      }
                      
                      try {
                        if (isInWishlistState) {
                          const wishlistItem = defaultWishlist.items?.find(
                            item => item?.product_id === product.id && (selectedVariant ? item?.variant_id === selectedVariant.id : true)
                          );
                          if (wishlistItem) {
                            await removeFromWishlist(defaultWishlist.id, wishlistItem.id);
                            toast.success('Item removed from wishlist');
                          }
                        } else {
                          await addToWishlist(product.id, selectedVariant?.id, quantity);
                          toast.success('Item added to wishlist');
                        }
                        return true;
                      } catch (error: any) {
                        console.error('Wishlist operation failed:', error);
                        toast.error(error?.message || 'Failed to update wishlist');
                        return false;
                      }
                    }, 'wishlist');
                    
                    setIsWishlistUpdating(false);
                  }}
                  disabled={isWishlistUpdating}
                  className={`px-3 py-2 rounded-md font-medium transition-colors flex items-center justify-center min-w-[50px] text-xs disabled:opacity-50 disabled:cursor-not-allowed ${isInWishlistState
                    ? 'bg-error-100 text-error-600 hover:bg-error-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  title={isInWishlistState ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  {isWishlistUpdating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  ) : (
                    <HeartIcon size={16} className={isInWishlistState ? 'fill-current' : ''} />
                  )}
                </button>
              </div>

              {/* Subscription Button */}
              {isAuthenticated && hasActiveSubscriptions && selectedVariant && (selectedVariant.inventory?.quantity_available ?? selectedVariant.stock) > 0 && (
                <button
                  onClick={() => {
                    if (!selectedVariant) {
                      toast.error('Please select a variant first');
                      return;
                    }
                    const availableInventory = selectedVariant.inventory?.quantity_available ?? selectedVariant.stock;
                    if (availableInventory <= 0) {
                      toast.error('This variant is out of stock');
                      return;
                    }
                    setShowSubscriptionSelector(true);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md font-medium transition-colors flex items-center justify-center text-xs"
                >
                  <CalendarIcon size={14} className="mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Add to Subscription</span>
                </button>
              )}
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <TruckIcon size={16} className="text-primary" />
                <span className="text-xs">Standard Shipping Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon size={16} className="text-primary" />
                <span className="text-xs">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCwIcon size={16} className="text-primary" />
                <span className="text-xs">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShareIcon size={16} className="text-primary" />
                <span className="text-xs">Share Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-2 px-1 border-b-2 font-medium text-xs ${activeTab === 'description'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-copy-light hover:text-copy'
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-2 px-1 border-b-2 font-medium text-xs ${activeTab === 'specifications'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-copy-light hover:text-copy'
                  }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-1 border-b-2 font-medium text-xs ${activeTab === 'reviews'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-copy-light hover:text-copy'
                  }`}
              >
                Reviews ({product.review_count || product.reviewCount || totalReviews})
              </button>
            </nav>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-sm text-copy-light mb-4">{product.description || 'No description available.'}</p>
                
                {/* Product Tags */}
                {(Array.isArray(selectedVariant?.tags) && selectedVariant?.tags.length > 0) || (Array.isArray(product.tags) && product.tags.length > 0) ? (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-main mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(selectedVariant?.tags) && selectedVariant?.tags.length > 0 ? selectedVariant?.tags : product.tags).map((tag: any, index: number) => (
                        <span
                          key={`${typeof tag === 'string' ? tag : tag?.name || 'tag'}-${index}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          style={{ backgroundColor: typeof tag === 'object' && tag?.color ? `${tag.color}20` : undefined }}
                        >
                          {typeof tag === 'string' ? tag : tag?.name || 'Tag'}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                
                {/* Product Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-main mb-2">Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="text-sm text-copy-light">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Variant Attributes */}
                {selectedVariant?.attributes && Object.keys(selectedVariant.attributes).length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-main mb-2">Variant Attributes:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Object.entries(selectedVariant.attributes).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-1">
                          <span className="text-sm font-medium text-main capitalize">{key.replace('_', ' ')}:</span>
                          <span className="text-sm text-copy-light">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Supplier Information - Simplified */}
                {product.supplier && (
                  <div className="mt-4 p-3 bg-surface rounded-lg border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {/* Supplier Logo or Fallback Icon */}
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                          {product.supplier.logo ? (
                            <img 
                              src={product.supplier.logo} 
                              alt={`${product.supplier.company || 'Supplier'} logo`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-main">
                            {product.supplier.company || `${product.supplier.firstname} ${product.supplier.lastname}`}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Blue Verification Icon */}
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 00-2.812 2.812 3.066 3.066 0 00-1.254.723 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 00-3.976 0 3.066 3.066 0 00-1.745.723 3.066 3.066 0 00-2.812-2.812 3.066 3.066 0 00-.723-1.254 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 002.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Product Info */}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main">Product ID:</span>
                    <span className="text-sm text-copy-light">{product.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main">SKU:</span>
                    <span className="text-sm text-copy-light">{selectedVariant?.sku || product.sku || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main">Category:</span>
                    <span className="text-sm text-copy-light">
                      {typeof product.category === 'object' && product.category.name 
                        ? product.category.name 
                        : (typeof product.category === 'string' 
                          ? product.category 
                          : 'Uncategorized')}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main">Stock:</span>
                    <span className="text-sm text-copy-light">{selectedVariant?.inventory?.quantity_available ?? selectedVariant?.stock ?? 0} units</span>
                  </div>
                  
                  {/* Product Status */}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main">Status:</span>
                    <span className="text-sm text-copy-light">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.is_active ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main">Featured:</span>
                    <span className="text-sm text-copy-light">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (product.is_featured || product.featured) ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {(product.is_featured || product.featured) ? 'Featured' : 'Regular'}
                      </span>
                    </span>
                  </div>
                  
                  {/* Dietary Information */}
                  <div className="md:col-span-2 py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main block mb-2">Dietary Information:</span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(selectedVariant?.dietary_tags) && selectedVariant.dietary_tags.length > 0 &&
                        selectedVariant.dietary_tags.map((tag: string, index: number) => (
                          <span key={`${tag}-${index}`} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      {/* Common dietary tags based on product category */}
                      {(typeof product.category === 'object' && product.category.name?.toLowerCase().includes('organic') || 
                        typeof product.category === 'string' && product.category.toLowerCase().includes('organic')) && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Organic</span>
                      )}
                      
                      {(typeof product.category === 'object' && product.category.name?.toLowerCase().includes('gluten') || 
                        typeof product.category === 'string' && product.category.toLowerCase().includes('gluten')) && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Gluten-Free</span>
                      )}
                      
                      {(typeof product.category === 'object' && product.category.name?.toLowerCase().includes('vegan') || 
                        typeof product.category === 'string' && product.category.toLowerCase().includes('vegan')) && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Vegan</span>
                      )}
                      
                      {(typeof product.category === 'object' && product.category.name?.toLowerCase().includes('vegetarian') || 
                        typeof product.category === 'string' && product.category.toLowerCase().includes('vegetarian')) && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Vegetarian</span>
                      )}
                      
                      {/* Default dietary tags for agricultural products */}
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Natural</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Non-GMO</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Sustainably Sourced</span>
                      
                      {/* Variant-specific dietary info */}
                      {selectedVariant?.attributes?.dietary && (
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                          {selectedVariant.attributes.dietary}
                        </span>
                      )}
                      
                      {selectedVariant?.attributes?.allergens && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          Contains: {selectedVariant.attributes.allergens}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Allergy Information */}
                  <div className="md:col-span-2 py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-main block mb-2">Allergy Information:</span>
                    <div className="flex flex-wrap gap-2">
                      {/* Common allergens - show as safe unless specified */}
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Dairy-Free</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Nut-Free</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Soy-Free</span>
                      
                      {/* If product contains allergens, show them prominently */}
                      {selectedVariant?.attributes?.contains_nuts && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Contains Nuts</span>
                      )}
                      
                      {selectedVariant?.attributes?.contains_dairy && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Contains Dairy</span>
                      )}
                      
                      {selectedVariant?.attributes?.contains_soy && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Contains Soy</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Variant Attributes */}
                  {selectedVariant?.attributes && Object.entries(selectedVariant.attributes)
                    .filter(([key]) => !['dietary', 'allergens', 'contains_nuts', 'contains_dairy', 'contains_soy', 'weight', 'dimensions'].includes(key))
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-main capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-sm text-copy-light">{String(value)}</span>
                      </div>
                  ))}

                  {/* Variant Specifications */}
                  {selectedVariant?.specifications && Object.entries(selectedVariant.specifications).map(([key, value]) => (
                    <div key={`spec-${key}`} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-main capitalize">{key.replace('_', ' ')}:</span>
                      <span className="text-sm text-copy-light">{String(value)}</span>
                    </div>
                  ))}
                  
                  {/* Additional Info */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-main">Tags:</span>
                      <span className="text-sm text-copy-light">{product.tags.map((tag: any) => tag.name).join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                {/* Review Form */}
                <ReviewForm 
                  productId={id} 
                  onReviewSubmitted={() => {
                    // Refresh reviews when a new review is submitted
                    fetchReviews(() => ReviewsAPI.getProductReviews(id, reviewsPage, 10, minRating, maxRating, sortBy));
                  }}
                />

                <div className="flex items-center space-x-4 mb-6 mt-8">
                  {/* Min Rating Filter */}
                  <div>
                    <label htmlFor="minRating" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Min Rating</label>
                    <Dropdown
                      options={[
                        { value: '', label: 'Any' },
                        { value: '1', label: '1 Star' },
                        { value: '2', label: '2 Stars' },
                        { value: '3', label: '3 Stars' },
                        { value: '4', label: '4 Stars' },
                        { value: '5', label: '5 Stars' }
                      ]}
                      value={minRating?.toString() || ''}
                      onChange={(value) => setMinRating(value ? Number(value) : undefined)}
                      placeholder="Any"
                      className="mt-1"
                    />
                  </div>

                  {/* Max Rating Filter */}
                  <div>
                    <label htmlFor="maxRating" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Max Rating</label>
                    <Dropdown
                      options={[
                        { value: '', label: 'Any' },
                        { value: '1', label: '1 Star' },
                        { value: '2', label: '2 Stars' },
                        { value: '3', label: '3 Stars' },
                        { value: '4', label: '4 Stars' },
                        { value: '5', label: '5 Stars' }
                      ]}
                      value={maxRating?.toString() || ''}
                      onChange={(value) => setMaxRating(value ? Number(value) : undefined)}
                      placeholder="Any"
                      className="mt-1"
                    />
                  </div>

                  {/* Sort By */}
                  <div>
                    <label htmlFor="sortBy" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                    <Dropdown
                      options={[
                        { value: '', label: 'Newest' },
                        { value: 'rating_desc', label: 'Rating (High to Low)' },
                        { value: 'rating_asc', label: 'Rating (Low to High)' },
                        { value: 'created_at_asc', label: 'Oldest' }
                      ]}
                      value={sortBy || ''}
                      onChange={(value) => setSortBy(value || undefined)}
                      placeholder="Newest"
                      className="mt-1"
                    />
                  </div>
                </div>

                {reviewsLoading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="animate-pulse border-b border-gray-100 pb-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : reviewsError ? (
                  <ErrorMessage
                    message={reviewsError?.message || 'Failed to load reviews'}
                    onRetry={() => fetchReviews(() => ReviewsAPI.getProductReviews(id, reviewsPage, 10, minRating, maxRating, sortBy))}
                  />
                ) : reviewsList.length > 0 ? (
                  <div className="space-y-6">
                    {reviewsList.map((review: any) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-main">
                              {review.user?.firstname || 'Anonymous'} {review.user?.lastname || ''}
                            </span>
                            <div className="flex text-yellow-400">
                              {Array.from({ length: 5 }, (_, i) => (
                                <StarIcon
                                  key={i}
                                  size={12}
                                  className={i < (review.rating || 0) ? 'fill-current' : ''}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-copy-light">
                            {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
                          </span>
                        </div>
                        <p className="text-sm text-copy-light">{review.comment || ''}</p>
                      </div>
                    ))}

                    {/* Reviews Pagination */}
                    {actualReviewsData.total > actualReviewsData.limit && (
                      <div className="flex items-center justify-center space-x-2 mt-8">
                        <button
                          onClick={() => setReviewsPage(prev => Math.max(1, prev - 1))}
                          disabled={reviewsPage === 1}
                          className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: Math.ceil(actualReviewsData.total / actualReviewsData.limit) }, (_, i) => {
                          const page = i + 1;
                          const totalPages = Math.ceil(actualReviewsData.total / actualReviewsData.limit);
                          
                          // Show first page, last page, current page, and pages around current
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= reviewsPage - 1 && page <= reviewsPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => setReviewsPage(page)}
                                className={`px-3 py-2 rounded-md ${
                                  page === reviewsPage
                                    ? 'bg-primary text-white'
                                    : 'bg-surface border border-border text-copy hover:bg-surface-hover'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          } else if (page === reviewsPage - 2 || page === reviewsPage + 2) {
                            return <span key={page} className="px-2">...</span>;
                          }
                          return null;
                        })}
                        
                        <button
                          onClick={() => setReviewsPage(prev => Math.min(Math.ceil(actualReviewsData.total / actualReviewsData.limit), prev + 1))}
                          disabled={reviewsPage === Math.ceil(actualReviewsData.total / actualReviewsData.limit)}
                          className="px-3 py-2 rounded-md bg-surface border border-border text-copy hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-copy-light">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="py-8 bg-surface">
          <div className="container mx-auto px-4">
            <h2 className="text-lg sm:text-xl font-semibold text-main mb-4">Related Products</h2>

            {relatedError && (
              <ErrorMessage
                message={relatedError?.message || 'Failed to load related products'}
                onRetry={() => fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id && id !== 'search' ? id : '', 4))}
              />
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {relatedLoading ? (
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded mb-1"></div>
                    <div className="bg-gray-200 h-3 rounded w-16"></div>
                  </div>
                ))
              ) : actualRelatedData && Array.isArray(actualRelatedData) && actualRelatedData.length > 0 ? (
                actualRelatedData.slice(0, 4).map((relatedProduct) => {
                  if (!relatedProduct) return null;
                  
                  // Get the first variant for display
                  const displayVariant = relatedProduct.variants?.[0] || null;

                  return (
                    <ProductCard
                      key={relatedProduct.id}
                      product={{
                        ...relatedProduct,
                        // Ensure backward compatibility with expected structure
                        price: displayVariant?.base_price || relatedProduct.price || 0,
                        discountPrice: displayVariant?.sale_price || relatedProduct.discountPrice || null,
                        image: displayVariant?.images?.[0]?.url || relatedProduct.image || '',
                        variants: relatedProduct.variants || []
                      }}
                      selectedVariant={displayVariant}
                      className=""
                    />
                  );
                }).filter(Boolean)
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No related products found.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Subscription Selector Modal */}
        {showSubscriptionSelector && selectedVariant && (
          <SubscriptionSelector
            isOpen={showSubscriptionSelector}
            onClose={() => setShowSubscriptionSelector(false)}
            product={product}
            variantId={selectedVariant.id}
            quantity={quantity}
            onSuccess={() => {
              setShowSubscriptionSelector(false);
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;
