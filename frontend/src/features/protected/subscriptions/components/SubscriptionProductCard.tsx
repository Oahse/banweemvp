import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, PackageIcon } from 'lucide-react';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import { formatPriceWithFallback } from '@/utils/price-utils';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';
import { Card } from '@/components/ui/Card';
import { useLocale } from '@/components/shared/contexts/LocaleContext';

interface SubscriptionProductCardProps {
  product: {
    id: string;
    product_id?: string;
    product_name?: string;
    name: string;
    price: number;
    currency?: string;
    quantity?: number;
    primary_image?: { url: string };
    images?: Array<{ url: string; is_primary?: boolean }>;
    variant_name?: string;
    variant_id?: string;
    stock?: number;
    sku?: string;
  };
  onRemove?: (productId: string) => void;
  onQuantityChange?: (productId: string, quantity: number) => void;
  showActions?: boolean;
  isRemoving?: boolean;
  viewMode?: 'grid' | 'list';
}

export const SubscriptionProductCard: React.FC<SubscriptionProductCardProps> = ({
  product,
  onRemove,
  onQuantityChange,
  showActions = true,
  isRemoving = false,
  viewMode = 'grid'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const { formatCurrency } = useLocale();

  const getPrimaryImage = () => {
    if (imageError) return null;
    
    // Check for primary image in images array
    if (product.images && product.images.length > 0) {
      const primaryImage = product.images.find(img => img.is_primary);
      if (primaryImage?.url) return primaryImage.url;
      if (product.images[0]?.url) return product.images[0].url;
    }
    
    // Fallback to primary_image field
    if (product.primary_image?.url) return product.primary_image.url;
    
    return null;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onQuantityChange?.(product.id, newQuantity);
  };

  const productName = product.product_name || product.name;
  const productId = product.product_id || product.id;
  const imageUrl = getPrimaryImage();

  if (viewMode === 'list') {
    return (
      <Card hoverable orientation="horizontal">
        <Card.Media placement="left" aspectRatio="square" className="w-16 h-16 sm:w-20 sm:h-20">
          {imageUrl ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatedLoader size="sm" variant="spinner" />
                </div>
              )}
              <img
                src={imageUrl}
                alt={productName}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-border-light dark:border-border-dark">
              <PackageIcon className="w-6 h-6 text-copy-light dark:text-copy-light-dark" />
            </div>
          )}
        </Card.Media>

        <Card.Body>
          <Link
            to={`/products/${productId}`}
            className="text-copy dark:text-copy-dark font-medium hover:text-primary dark:hover:text-primary-dark transition-colors duration-200 block truncate"
          >
            <Heading level={3} className="truncate">{productName}</Heading>
          </Link>
          {product.variant_name && (
            <Text variant="body-sm" tone="secondary" className="mt-1">
              Variant: {product.variant_name}
            </Text>
          )}
          {product.sku && (
            <Text variant="caption" tone="secondary" className="mt-1">
              SKU: {product.sku}
            </Text>
          )}
          <div className="flex items-center mt-2 space-x-4">
            <Text variant="body-md" weight="semibold">
              {formatPriceWithFallback(product, product.currency, formatCurrency, 'Price not set')}
            </Text>
            {product.stock !== undefined && (
              <Text 
                variant="caption" 
                className={product.stock < 10 ? 'text-warning dark:text-warning-dark' : ''}
              >
                Stock: {product.stock}
              </Text>
            )}
          </div>
        </Card.Body>

        {showActions && (
          <Card.Actions>
            {onQuantityChange && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  variant="outline"
                  size="sm"
                >
                  <MinusIcon className="w-3 h-3" />
                </Button>
                <Text variant="body-sm" className="min-w-[2rem] text-center">
                  {quantity}
                </Text>
                <Button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  variant="outline"
                  size="sm"
                >
                  <PlusIcon className="w-3 h-3" />
                </Button>
              </div>
            )}
            
            {onRemove && (
              <Button
                onClick={() => onRemove(product.id)}
                disabled={isRemoving}
                variant="danger"
                size="sm"
              >
                {isRemoving ? 'Removing...' : 'Remove'}
              </Button>
            )}
          </Card.Actions>
        )}
      </Card>
    );
  }

  // Grid view
  return (
    <Card hoverable as="article">
      <Card.Media aspectRatio="square">
        {imageUrl ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedLoader size="md" variant="spinner" />
              </div>
            )}
            <img
              src={imageUrl}
              alt={productName}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-border-light dark:border-border-dark">
            <div className="text-center">
              <PackageIcon className="w-12 h-12 mx-auto mb-2 text-copy-light dark:text-copy-light-dark" />
              <Text variant="body-sm" tone="secondary">No Image</Text>
            </div>
          </div>
        )}

        {/* Remove Button Overlay */}
        {showActions && onRemove && (
          <Button
            onClick={() => onRemove(product.id)}
            disabled={isRemoving}
            variant="danger"
            size="sm"
            className="absolute top-2 right-2 p-1.5 rounded-full"
          >
            <MinusIcon className="w-3 h-3" />
          </Button>
        )}

        {/* Stock Badge */}
        {product.stock !== undefined && product.stock < 10 && (
          <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-warning/20 dark:bg-warning-dark/20 text-warning dark:text-warning-dark">
            {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
          </div>
        )}
      </Card.Media>

      <Card.Body>
        <Link
          to={`/products/${productId}`}
          className="text-copy dark:text-copy-dark font-medium hover:text-primary dark:hover:text-primary-dark transition-colors duration-200 block mb-2 line-clamp-2"
        >
          <Heading level={3} className="line-clamp-2 mb-2">{productName}</Heading>
        </Link>

        {product.variant_name && (
          <Text variant="body-sm" tone="secondary" className="mb-2">
            {product.variant_name}
          </Text>
        )}

        {product.sku && (
          <Text variant="caption" tone="secondary" className="mb-3">
            SKU: {product.sku}
          </Text>
        )}

        <div className="flex items-center justify-between">
          <Text variant="body-lg" weight="bold">
            {formatPriceWithFallback(product, product.currency, formatCurrency, 'Price not set')}
          </Text>
          
          {showActions && onQuantityChange && (
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                variant="outline"
                size="sm"
              >
                <MinusIcon className="w-3 h-3" />
              </Button>
              <Text variant="body-sm" className="min-w-[1.5rem] text-center">
                {quantity}
              </Text>
              <Button
                onClick={() => handleQuantityChange(quantity + 1)}
                variant="outline"
                size="sm"
              >
                <PlusIcon className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        {product.quantity && product.quantity > 1 && (
          <Text variant="caption" tone="secondary" className="mt-2">
            Quantity: {product.quantity}
          </Text>
        )}
      </Card.Body>
    </Card>
  );
};
