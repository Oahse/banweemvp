import React from 'react';
import { cn } from '../../utils/utils';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Heading, Text, Label } from '@/components/ui/Text/Text';

/**
 * @typedef {object} ProductVariantAttribute
 * @property {string} id
 * @property {string} name
 * @property {string} value
 */

/**
 * @typedef {object} ProductVariantImage
 * @property {string} id
 * @property {string} variant_id
 * @property {string} url
 * @property {string} [alt_text]
 * @property {number} sort_order
 * @property {boolean} is_primary
 */

/**
 * @typedef {object} ProductVariant
 * @property {string} id
 * @property {string} product_id
 * @property {string} sku
 * @property {string} name
 * @property {number} base_price
 * @property {number} [sale_price]
 * @property {number} stock
 * @property {string} [barcode]
 * @property {string} [qr_code]
 * @property {ProductVariantAttribute[]} attributes
 * @property {ProductVariantImage[]} images
 */

/**
 * @typedef {object} VariantSelectorProps
 * @property {ProductVariant[]} variants
 * @property {ProductVariant} selectedVariant
 * @property {(variant: ProductVariant) => void} onVariantChange
 * @property {boolean} [showImages=false]
 * @property {boolean} [showPrice=true]
 * @property {boolean} [showStock=true]
 * @property {string} [className]
 * @property {'grid' | 'list' | 'dropdown'} [layout='grid']
 */

export const VariantSelector = ({
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
  const getAttributeGroups = () => {
    const groups = {};
    
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

  const getPrimaryImage = (variant) => {
    const primaryImage = variant.images.find(img => img.is_primary);
    return primaryImage || variant.images[0];
  };

  const isVariantAvailable = (variant) => {
    return variant.stock > 0;
  };

  const getVariantPrice = (variant) => {
    if (!variant) return 0;
    return variant.sale_price || variant.base_price;
  };

  const formatAttributes = (variant) => {
    if (!Array.isArray(variant.attributes)) return '';
    return variant.attributes
      .map(attr => `${attr.name}: ${attr.value}`)
      .join(', ');
  };

  if (layout === 'dropdown') {
    return (
      <div className={cn('space-y-2', className)}>
        <label className="block text-sm font-medium text-gray-700">
          Select Variant
        </label>
        <select
          value={selectedVariant.id}
          onChange={(e) => {
            const variant = variants.find(v => v.id === e.target.value);
            if (variant) onVariantChange(variant);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
        <Heading level={3} className="text-sm font-medium text-gray-700">Select Variant</Heading>
        <div className="space-y-2">
          {variants.map(variant => {
            const isSelected = selectedVariant.id === variant.id;
            const isAvailable = isVariantAvailable(variant);
            const primaryImage = getPrimaryImage(variant);

            return (
              <Button
                key={variant.id}
                onClick={() => isAvailable && onVariantChange(variant)}
                disabled={!isAvailable}
                variant={isSelected ? "primary" : "ghost"}
                size="sm"
                className={cn(
                  'w-full p-3 border rounded-lg text-left transition-all',
                  isSelected
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border hover:border-border-strong',
                  !isAvailable && 'opacity-50 cursor-not-allowed'
                )}
              >
                <div className="flex items-center space-x-3">
                  {showImages && primaryImage && (
                    <img
                      src={primaryImage.url}
                      alt={primaryImage.alt_text || variant.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {variant.name}
                      </span>
                      {isSelected && (
                        <CheckIcon size={16} className="text-primary" />
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {formatAttributes(variant)}
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      {showPrice && (
                        <div className="flex items-center space-x-2">
                          <Text className="font-semibold text-primary">
                            ${getVariantPrice(variant).toFixed(2)}
                          </Text>
                          {variant.sale_price && (
                            <Text className="text-sm text-gray-500 line-through">
                              ${variant.base_price.toFixed(2)}
                            </Text>
                          )}
                        </div>
                      )}
                      
                      {showStock && (
                        <Text className={cn(
                          'text-xs px-2 py-1 rounded-full',
                          isAvailable
                            ? 'bg-success-100 text-success-800'
                            : 'bg-error-100 text-error-800'
                        )}>
                          {isAvailable ? `${variant.stock} in stock` : 'Out of stock'}
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
              </Button>
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
            <Heading level={3} className="text-sm font-medium text-copy capitalize">
              {attributeName === 'variant_index' ? 'Option' : attributeName}
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
                  <Button
                    key={value}
                    onClick={() => isAvailable && onVariantChange(variantWithValue)}
                    disabled={!isAvailable}
                    variant={isSelected ? "primary" : "outline"}
                    size="sm"
                    className={cn(
                      'px-4 py-2 border rounded-md text-sm font-medium transition-all',
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-border text-copy hover:border-border-strong',
                      !isAvailable && 'opacity-50 cursor-not-allowed line-through'
                    )}
                  >
                    {value}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected variant info at the bottom */}
      <div className="p-3 bg-surface rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <Text className="text-sm font-medium text-copy">Selected:</Text>
            <Text className="ml-2 text-sm text-copy">{selectedVariant?.name || 'Default'}</Text>
          </div>
          {showPrice && selectedVariant && (
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                ${getVariantPrice(selectedVariant).toFixed(2)}
              </div>
              {selectedVariant.sale_price && (
                <div className="text-sm text-copy-light line-through">
                  ${selectedVariant.base_price.toFixed(2)}
                </div>
              )}
            </div>
          )}
        </div>
        
        {showStock && selectedVariant && (
          <div className="mt-2 text-sm">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs',
              isVariantAvailable(selectedVariant)
                ? 'bg-success-100 text-success-800'
                : 'bg-error-100 text-error-800'
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