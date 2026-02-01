import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
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

import { ProductImageGallery } from '../components/product/ProductImageGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { QRCodeModal } from '../components/product/QRCodeModal';
import { BarcodeModal } from '../components/product/BarcodeModal';
import { ProductCard } from '../components/product/ProductCard';
import { SubscriptionSelector } from '../components/subscription/SubscriptionSelector';
import ReviewForm from '../components/product/ReviewForm';
import { Dropdown } from '../components/ui/Dropdown';
import { useCart } from '../store/CartContext';
import { useWishlist } from '../store/WishlistContext';
import { useLocale } from '../store/LocaleContext';
import { useApi } from '../hooks/useAsync';
import { useSubscriptionAction } from '../hooks/useSubscription';
import { ProductsAPI, ReviewsAPI } from '../api';
import { unwrapResponse, extractErrorMessage } from '../utils/api-response';

import ErrorMessage from '../components/Error';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

// TypeScript interfaces
interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  base_price: number;
  sale_price: number | null;
  stock: number;
  barcode: string;
  qr_code: string;
  attributes: Record<string, any>;
  images: ProductImage[];
  is_active?: boolean;
  created_at?: string;
}

interface ProductImage {
  id: string;
  url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
  format: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  discountPrice?: number | null;
  rating: number;
  reviewCount: number;
  sku: string;
  variants: ProductVariant[];
  features?: string[];
  specifications?: Record<string, any>;
  brand?: string | null;
  category?: string | null;
  stock?: number;
  images?: string[];
  reviews?: any[];
}

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
}

// Transform API product data with null checks
const transformProduct = (product: any, averageRating: number, reviewCount: number): Product | null => {
  if (!product) return null;
  
  return {
    id: product.id,
    name: product.name,
    price: product.variants?.[0]?.base_price || 0,
    discountPrice: product.variants?.[0]?.sale_price || null,
    rating: averageRating || 0, 
    reviewCount: reviewCount || 0, 
    description: product.description,
    longDescription: product.description, 
    category: product.category?.name,
    brand: product.supplier ? `${product.supplier.firstname || ''} ${product.supplier.lastname || ''}`.trim() : null,
    sku: product.variants?.[0]?.sku,
    stock: product.variants?.[0]?.stock || 0,
    images: product.variants?.[0]?.images?.map((img: any) => img?.url).filter(Boolean) || [],
    variants: product.variants?.map((variant: any): ProductVariant => ({
      id: variant.id,
      product_id: variant.product_id || product.id,
      sku: variant.sku || '',
      name: variant.name || '',
      base_price: variant.base_price || 0,
      sale_price: variant.sale_price || null,
      stock: variant.stock || 0,
      barcode: variant.barcode || '',
      qr_code: variant.qr_code || '',
      attributes: variant.attributes || {},
      images: variant.images || []
    })) || [],
    features: [
      'High Quality Product',
      'Fast Shipping',
      'Customer Satisfaction Guaranteed',
      'Secure Payment',
    ],
    specifications: {
      'Product Name': product.name,
      'Category': product.category?.name,
      'Supplier': product.supplier ? `${product.supplier.firstname || ''} ${product.supplier.lastname || ''}`.trim() : null,
      'SKU': product.variants?.[0]?.sku,
    },
    reviews: [], 
  };
};

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
      fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id, 4));
    }
  }, [id, fetchProduct, fetchRelatedProducts]);

  // Extract actual data from API response
  const actualProductData = productData?.data || productData;
  const actualRelatedData = relatedProductsData?.data || relatedProductsData;
  const actualReviewsData = reviewsData?.data ? {
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

  const handleQuantityChange = (newQuantity) => {
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
          error={productError || { error: true, message: 'Product not found' }}
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

  const product = transformProduct(actualProductData, averageRating, totalReviews);
  
  // If product transformation failed, show error
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          error={{ error: true, message: 'Failed to load product data' }}
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
        if (cartQuantity >= selectedVariant.stock) {
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
    <div className="pb-16 md:pb-0">
      {/* Breadcrumb */}
      <div className="bg-surface py-4">
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
              images={actualProductData.variants?.flatMap((variant: ProductVariant) => variant.images || []) || []}
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
                Selected Variant Images: {actualProductData.variants?.find((v: ProductVariant) => v.id === selectedVariant?.id)?.images?.length || 0}
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
                        className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-copy-light ml-2">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-xs text-copy-light">SKU: {product.sku}</span>
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
                    {formatCurrency(selectedVariant?.sale_price || selectedVariant?.base_price || product.price)}
                  </span>
                )}
              </div>

              <p className="text-sm text-copy-light mb-6">{product.description}</p>
              
              {/* Variant Selection - Moved under description */}
              {actualProductData?.variants && product.variants && product.variants.length > 1 && selectedVariant && (
                <div className="mb-6">
                  <VariantSelector
                    variants={actualProductData.variants.map(variant => ({
                      id: variant.id,
                      product_id: variant.product_id || actualProductData.id,
                      sku: variant.sku || '',
                      name: variant.name || '',
                      base_price: variant.base_price || 0,
                      sale_price: variant.sale_price || null,
                      stock: variant.stock || 0,
                      barcode: variant.barcode || '',
                      qr_code: variant.qr_code || '',
                      attributes: variant.attributes ? Object.entries(variant.attributes).map(([name, value]) => ({
                        id: `${variant.id}-${name}`,
                        name,
                        value: String(value)
                      })) : [],
                      images: variant.images || []
                    }))}
                    selectedVariant={{
                      id: selectedVariant.id,
                      product_id: actualProductData.id,
                      sku: selectedVariant.sku || '',
                      name: selectedVariant.name || '',
                      base_price: selectedVariant.base_price || 0,
                      sale_price: selectedVariant.sale_price || null,
                      stock: selectedVariant.stock || 0,
                      barcode: selectedVariant.barcode || '',
                      qr_code: selectedVariant.qr_code || '',
                      attributes: selectedVariant.attributes ? Object.entries(selectedVariant.attributes).map(([name, value]) => ({
                        id: `${selectedVariant.id}-${name}`,
                        name,
                        value: String(value)
                      })) : [],
                      images: actualProductData.variants?.find(v => v.id === selectedVariant.id)?.images || []
                    }}
                    onVariantChange={(variant) => {
                      const originalVariant = actualProductData.variants?.find(v => v.id === variant.id);
                      if (originalVariant) {
                        setSelectedVariant({
                          id: originalVariant.id,
                          name: originalVariant.name,
                          base_price: originalVariant.base_price,
                          sale_price: originalVariant.sale_price,
                          current_price: originalVariant.current_price,
                          discount_percentage: originalVariant.discount_percentage,
                          stock: originalVariant.stock,
                          sku: originalVariant.sku,
                          attributes: originalVariant.attributes,
                          barcode: originalVariant.barcode,
                          qr_code: originalVariant.qr_code,
                        });
                      }
                    }}
                    showImages={false}
                    showPrice={true}
                    showStock={true}
                    layout="grid"
                    className=""
                  />
                </div>
              )}
            </div>

            {/* Stock Status */}
            {selectedVariant && (
              <div className="mb-4">
                {selectedVariant.stock > 0 ? (
                  <span className="text-xs text-success-600 font-medium">
                    ✓ In Stock ({selectedVariant.stock} available)
                  </span>
                ) : (
                  <span className="text-xs text-error-600 font-medium">
                    ✗ Out of Stock
                  </span>
                )}
              </div>
            )}

            {/* Quantity Selection */}
            {selectedVariant && selectedVariant.stock > 0 && (
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
                    disabled={selectedVariant && quantity >= selectedVariant.stock}
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
                        disabled={isCartUpdating || (selectedVariant ? cartQuantity >= selectedVariant.stock : true)}
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
                      disabled={!selectedVariant || selectedVariant.stock <= 0 || isCartUpdating}
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
                          {selectedVariant && selectedVariant.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
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
              {isAuthenticated && hasActiveSubscriptions && selectedVariant && selectedVariant.stock > 0 && (
                <button
                  onClick={() => {
                    if (!selectedVariant) {
                      toast.error('Please select a variant first');
                      return;
                    }
                    if (selectedVariant.stock <= 0) {
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
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-sm text-copy-light mb-4">{product.longDescription}</p>
                <h4 className="text-sm font-medium text-main mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {product.features?.map((feature: string, index: number) => (
                    <li key={index} className="text-sm text-copy-light">{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-sm font-medium text-main">{key}:</span>
                      <span className="text-sm text-copy-light">{value}</span>
                    </div>
                  ))}
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
                    error={reviewsError}
                    onRetry={() => fetchReviews(() => ReviewsAPI.getProductReviews(id, reviewsPage, 10, minRating, maxRating, sortBy))}
                  />
                ) : reviewsList.length > 0 ? (
                  <div className="space-y-6">
                    {reviewsList.map((review) => (
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
            <h2 className="text-xl sm:text-2xl font-bold text-main mb-6">Related Products</h2>

            {relatedError && (
              <ErrorMessage
                error={relatedError}
                onRetry={() => fetchRelatedProducts(() => ProductsAPI.getRecommendedProducts(id && id !== 'search' ? id : '', 4))}
                className="mb-6"
              />
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedLoading ? (
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded mb-1"></div>
                    <div className="bg-gray-200 h-3 rounded w-16"></div>
                  </div>
                ))
              ) : actualRelatedData && Array.isArray(actualRelatedData) && actualRelatedData.length > 0 ? (
                actualRelatedData.map((relatedProduct) => {
                  if (!relatedProduct) return null;
                  
                  const transformedProduct = {
                    id: relatedProduct.id,
                    name: relatedProduct.name,
                    price: relatedProduct.variants?.[0]?.base_price || 0,
                    discountPrice: relatedProduct.variants?.[0]?.sale_price || null,
                    rating: relatedProduct.rating_average || relatedProduct.rating || 0,
                    reviewCount: relatedProduct.review_count || relatedProduct.rating_count || 0,
                    image: relatedProduct.variants?.[0]?.images?.[0]?.url || relatedProduct.image,
                    category: relatedProduct.category?.name || 'Uncategorized',
                    isNew: relatedProduct.is_new || false,
                    isFeatured: relatedProduct.is_featured || false,
                    variants: relatedProduct.variants || [],
                    sku: relatedProduct.variants?.[0]?.sku || relatedProduct.sku,
                    description: relatedProduct.description || relatedProduct.short_description,
                    stock: relatedProduct.variants?.[0]?.stock || relatedProduct.variants?.[0]?.inventory_quantity_available || 0,
                  };

                  return (
                    <ProductCard
                      key={relatedProduct.id}
                      product={transformedProduct}
                      selectedVariant={transformedProduct.variants?.[0]}
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
      </div>
    </div>
  );
};

export default ProductDetails;
