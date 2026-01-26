import React, { useState, useEffect } from 'react';
import { HeartIcon, ShoppingCartIcon, EyeIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { stockMonitor } from '../services/stockMonitoring';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }: { product: any }) => {
  // ✅ Using useState for local state management
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState<boolean>(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [stockStatus, setStockStatus] = useState<any>(null);

  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();

  const variant = product.variants?.[0] || product;
  const price = variant.current_price || variant.base_price;
  const salePrice = variant.sale_price;
  const isOnSale = salePrice && salePrice < price;
  const discount = isOnSale ? Math.round(((price - salePrice) / price) * 100) : 0;
  const isInStock = variant.stock > 0;
  const isWishlisted = isInWishlist(product.id, variant.id);

  // Initialize stock monitoring for this variant
  useEffect(() => {
    if (variant.id && variant.stock !== undefined) {
      // Set up stock thresholds
      stockMonitor.setStockThreshold(variant.id, {
        low_stock_threshold: 10,
        critical_threshold: 5,
        out_of_stock_threshold: 0,
        email_notifications_enabled: true
      });

      // Update current stock
      stockMonitor.updateStock(
        variant.id,
        variant.stock,
        product.name,
        variant.name
      );

      // Get stock status
      const status = stockMonitor.getStockStatus(variant.id);
      setStockStatus(status);
    }
  }, [variant.id, variant.stock, product.name, variant.name]);

  // Get primary image with proper fallback handling
  const getPrimaryImage = () => {
    if (imageError) {
      return '/placeholder-product.jpg';
    }

    // Check variant images first
    if (variant.images && variant.images.length > 0) {
      const primaryImage = variant.images.find((img: any) => img.is_primary);
      if (primaryImage?.url) {
        return primaryImage.url;
      }
      if (variant.images[0]?.url) {
        return variant.images[0].url;
      }
    }

    // Fallback to legacy image fields
    if (variant.primary_image?.url) {
      return variant.primary_image.url;
    }

    return '/placeholder-product.jpg';
  };

  // Handle adding to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if this is inside a Link
    
    if (!isInStock || stockStatus?.status === 'out_of_stock') {
      toast.error('This item is currently out of stock');
      return;
    }

    if (selectedQuantity > variant.stock) {
      toast.error(`Only ${variant.stock} items available`);
      return;
    }

    setIsAddingToCart(true);

    try {
      const cartItem = {
        variant_id: variant.id,
        quantity: selectedQuantity,
      };

      await addToCart(cartItem);

      // Update stock monitoring after successful cart addition
      const newStock = variant.stock - selectedQuantity;
      stockMonitor.updateStock(variant.id, newStock, product.name, variant.name);
      
      // Update local stock status
      const status = stockMonitor.getStockStatus(variant.id);
      setStockStatus(status);
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to add item to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Handle adding to wishlist
  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if this is inside a Link
    
    setIsAddingToWishlist(true);

    try {
      if (isWishlisted) {
        toast('Item is already in your wishlist');
      } else {
        await addToWishlist(product.id, variant.id, 1);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add item to wishlist');
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!imageError) {
      setImageError(true);
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > variant.stock) {
      toast.error(`Only ${variant.stock} items available`);
      return;
    }
    setSelectedQuantity(newQuantity);
  };

  // Get stock status styling
  const getStockStatusStyle = () => {
    if (!stockStatus) return '';
    
    const styles: Record<string, string> = {
      in_stock: 'text-green-600',
      low_stock: 'text-yellow-600',
      critical: 'text-orange-600',
      out_of_stock: 'text-red-600'
    };
    
    return styles[stockStatus.status] || 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 group overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Image Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={getPrimaryImage()}
            alt={`${product.name} - ${variant.name}`}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded 
                ? 'opacity-100 group-hover:scale-110' 
                : 'opacity-0'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </Link>
        
        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm animate-pulse">
            -{discount}%
          </div>
        )}

        {/* Stock Status Badge */}
        {stockStatus && stockStatus.status !== 'in_stock' && (
          <div className={`absolute top-2 ${isOnSale ? 'left-16' : 'left-2'} px-2 py-1 rounded-md text-xs font-semibold text-white shadow-sm ${
            stockStatus.status === 'out_of_stock' ? 'bg-red-500' :
            stockStatus.status === 'critical' ? 'bg-orange-500' : 'bg-yellow-500'
          }`}>
            {stockStatus.status === 'out_of_stock' ? 'Out of Stock' :
             stockStatus.status === 'critical' ? 'Low Stock' : 'Limited'}
          </div>
        )}

        {/* Out of Stock Overlay */}
        {(!isInStock || stockStatus?.status === 'out_of_stock') && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-semibold text-sm px-3 py-1 bg-black/50 rounded-md">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          {(isInStock && stockStatus?.status !== 'out_of_stock') && (
            <button
              onClick={handleAddToWishlist}
              disabled={isAddingToWishlist}
              className={`p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 ${
                isWishlisted 
                  ? 'bg-red-500 text-white shadow-red-200' 
                  : 'bg-white/95 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isWishlisted ? 'In wishlist' : 'Add to wishlist'}
            >
              {isAddingToWishlist ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <HeartIcon size={16} className={isWishlisted ? 'fill-current' : ''} />
              )}
            </button>
          )}

          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-primary rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
            title="View details"
          >
            <EyeIcon size={16} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors duration-200 leading-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* Variant name if different from product name */}
        {variant.name && variant.name !== product.name && (
          <p className="body-text text-xs text-gray-500 truncate">
            {variant.name}
          </p>
        )}
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="price text-lg sm:text-xl">
            ${(isOnSale ? salePrice : price).toFixed(2)}
          </span>
          {isOnSale && (
            <span className="price text-sm text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating_average > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(product.rating_average)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="body-text text-gray-600 text-xs">
              {product.rating_average.toFixed(1)} ({product.rating_count})
            </span>
          </div>
        )}

        {/* Stock Status */}
        {stockStatus && (
          <div className={`text-xs font-medium ${getStockStatusStyle()}`}>
            {stockStatus.message}
          </div>
        )}

        {/* Quantity Selector (only if in stock) */}
        {isInStock && stockStatus?.status !== 'out_of_stock' && (
          <div className="hidden sm:block">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <select
              value={selectedQuantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            >
              {Array.from({ length: Math.min(variant.stock, 10) }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock || isAddingToCart || stockStatus?.status === 'out_of_stock'}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
            isInStock && stockStatus?.status !== 'out_of_stock'
              ? 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md'
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="button-text">Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCartIcon size={16} />
              <span className="button-text">
                {!isInStock || stockStatus?.status === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
              </span>
            </>
          )}
        </button>

        {/* Additional stock info */}
        {isInStock && stockStatus?.status === 'critical' && (
          <p className="body-text text-xs text-orange-600 text-center font-medium animate-pulse">
            Only {variant.stock} left - Order soon!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;