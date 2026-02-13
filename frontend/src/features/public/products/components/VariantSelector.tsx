import React from 'react';
import { cn } from '@/utils/utils';
import { CheckIcon } from 'lucide-react';
import { Heading } from '@/components/ui/Text/Text';

interface ProductVariantAttribute {
  name: string;
  value: string;
}

interface ProductVariantImage {
  id: string;
  variant_id: string;
  url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  base_price: number;
  sale_price?: number | null;
  stock?: number;
  barcode?: string;
  qr_code?: string;
  attributes: ProductVariantAttribute[];
  images: ProductVariantImage[];
}

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
  showImages?: boolean;
  showPrice?: boolean;
  showStock?: boolean;
  className?: string;
  layout?: 'grid' | 'list' | 'dropdown';
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantChange,
  showImages = false,
  showPrice = true,
  showStock = true,
  className,
  layout = 'grid'
}) => {
  // Group variants by attribute types for better organization
  const getAttributeGroups = (): Record<string, Set<string>> => {
    const groups: Record<string, Set<string>> = {};
    
    variants.forEach(variant => {
      if (Array.isArray(variant.attributes)) {
        variant.attributes.forEach(attr => {
          if (!groups[attr.name]) {
            groups[attr.name] = new Set();
          }
          groups[attr.name].add(attr.value);
        });
      }
    });
    
    return groups;
  };

  const attributeGroups = getAttributeGroups();

  const getPrimaryImage = (variant: ProductVariant): ProductVariantImage | undefined => {
    const primaryImage = variant.images.find(img => img.is_primary);
    return primaryImage || variant.images[0];
  };

  const isVariantAvailable = (variant: ProductVariant): boolean => {
    return (variant.stock ?? 0) > 0;
  };

  const getVariantPrice = (variant: ProductVariant): number => {
    if (!variant) return 0;
    return variant.sale_price || variant.base_price;
  };

  const formatAttributes = (variant: ProductVariant): string => {
    if (!Array.isArray(variant.attributes)) return '';
    return variant.attributes
      .map(attr => `${attr.name}: ${attr.value}`)
      .join(', ');
  };

  if (layout === 'dropdown') {
    return (
      <div className={cn('space-y-2', className)}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select Variant
        </label>
        <select
          value={selectedVariant.id}
          onChange={(e) => {
            const variant = variants.find(v => v.id === e.target.value);
            if (variant) onVariantChange(variant);
          }}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {variants.map(variant => (
            <option 
              key={variant.id} 
              value={variant.id}
              disabled={!isVariantAvailable(variant)}
            >
              {variant.name} - ${getVariantPrice(variant).toFixed(2)}
              {!isVariantAvailable(variant) && ' (Out of Stock)'}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        <Heading level={5} className="text-sm font-medium text-gray-900 dark:text-gray-100">Select Variant</Heading>
        <div className="space-y-2">
          {variants.map(variant => {
            const isSelected = selectedVariant.id === variant.id;
            const isAvailable = isVariantAvailable(variant);
            const primaryImage = getPrimaryImage(variant);

            return (
              <button
                key={variant.id}
                onClick={() => isAvailable && onVariantChange(variant)}
                disabled={!isAvailable}
                className={cn(
                  'w-full p-2.5 sm:p-3 border rounded-lg text-left transition-all',
                  'bg-white dark:bg-gray-800',
                  isSelected
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
                  !isAvailable && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  {showImages && primaryImage && (
                    <img
                      src={primaryImage.url}
                      alt={primaryImage.alt_text || variant.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                        {variant.name}
                      </span>
                      {isSelected && (
                        <CheckIcon size={16} className="text-primary flex-shrink-0" />
                      )}
                    </div>
                    
                    {formatAttributes(variant) && (
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 truncate">
                        {formatAttributes(variant)}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      {showPrice && (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="font-semibold text-sm sm:text-base text-primary">
                            ${getVariantPrice(variant).toFixed(2)}
                          </span>
                          {variant.sale_price && variant.sale_price < variant.base_price && (
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                              ${variant.base_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {showStock && (
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full font-medium',
                          isAvailable
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        )}>
                          {isAvailable ? `${variant.stock} in stock` : 'Out of stock'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className={cn('space-y-4', className)}>
      {/* Attribute-based selection */}
      <div className="space-y-3">
        {Object.entries(attributeGroups).map(([attributeName, values]) => (
          <div key={attributeName} className="space-y-2">
            <Heading level={5} className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
              {attributeName === 'variant_index' ? 'Option' : attributeName.replace('_', ' ')}
            </Heading>
            <div className="flex flex-wrap gap-2">
              {Array.from(values).map(value => {
                // Find variant with this attribute value
                const variantWithValue = variants.find(variant =>
                  variant.attributes.some(attr => 
                    attr.name === attributeName && attr.value === value
                  )
                );
                
                if (!variantWithValue) return null;
                
                const isSelected = selectedVariant.attributes.some(attr =>
                  attr.name === attributeName && attr.value === value
                );
                const isAvailable = isVariantAvailable(variantWithValue);

                return (
                  <button
                    key={value}
                    onClick={() => isAvailable && onVariantChange(variantWithValue)}
                    disabled={!isAvailable}
                    className={cn(
                      'px-3 sm:px-4 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm font-medium transition-all',
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10',
                      !isAvailable && 'opacity-50 cursor-not-allowed line-through'
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected variant info at the bottom */}
      <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Selected:</span>
            <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
              {selectedVariant?.name || 'Default'}
            </p>
          </div>
          {showPrice && selectedVariant && (
            <div className="text-right flex-shrink-0">
              <div className="text-lg sm:text-xl font-bold text-primary">
                ${getVariantPrice(selectedVariant).toFixed(2)}
              </div>
              {selectedVariant.sale_price && selectedVariant.sale_price < selectedVariant.base_price && (
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${selectedVariant.base_price.toFixed(2)}
                </div>
              )}
            </div>
          )}
        </div>
        
        {showStock && selectedVariant && (
          <div className="mt-2 sm:mt-3">
            <span className={cn(
              'inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium',
              isVariantAvailable(selectedVariant)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
            )}>
              {isVariantAvailable(selectedVariant) 
                ? `${selectedVariant.stock} in stock` 
                : 'Out of stock'
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};