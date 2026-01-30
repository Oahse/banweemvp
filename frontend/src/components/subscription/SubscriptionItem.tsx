import React, { useState } from 'react';
import { EyeIcon, TagIcon, PackageIcon } from 'lucide-react';
import { themeClasses, combineThemeClasses } from '../../utils/themeClasses';
import { formatCurrency } from '../../utils/orderCalculations';
import { Subscription } from '../../api/subscription';

interface SubscriptionItemProps {
  subscription: Subscription;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  subscription,
  isExpanded = false,
  onToggle
}) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showBillingSummary, setShowBillingSummary] = useState(false);

  return (
    <div className="border-t pt-4 space-y-4">
      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className={combineThemeClasses(themeClasses.text.primary, 'font-medium text-sm')}>
            Products & Services
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowProducts(!showProducts);
            }}
            className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <EyeIcon size={12} />
            {showProducts ? 'Hide' : 'Show'} Details
          </button>
        </div>
        
        {showProducts && subscription.products && subscription.products.length > 0 && (
          <div className="space-y-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            {subscription.products.map((product: any, index: number) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <PackageIcon size={16} className="text-gray-400" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className={combineThemeClasses(themeClasses.text.primary)}>
                      {product.name}
                    </span>
                    {product.sku && (
                      <span className={combineThemeClasses(themeClasses.text.muted, 'text-xs')}>
                        SKU: {product.sku}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={combineThemeClasses(themeClasses.text.secondary)}>
                    {formatCurrency(product.current_price || product.price, subscription.currency)}
                  </span>
                  {product.quantity && product.quantity > 1 && (
                    <div className={combineThemeClasses(themeClasses.text.muted, 'text-xs')}>
                      Qty: {product.quantity}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {subscription.products.length === 0 && (
              <div className="text-center py-4">
                <PackageIcon size={24} className="text-gray-400 mx-auto mb-2" />
                <p className={combineThemeClasses(themeClasses.text.muted, 'text-sm')}>
                  No products in this subscription
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Billing Summary Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className={combineThemeClasses(themeClasses.text.primary, 'font-medium text-sm')}>
            Billing Summary
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBillingSummary(!showBillingSummary);
            }}
            className="text-xs text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <TagIcon size={12} />
            {showBillingSummary ? 'Hide' : 'Show'} Details
          </button>
        </div>
        
        {showBillingSummary && (
          <div className="space-y-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span className={combineThemeClasses(themeClasses.text.secondary)}>Subtotal</span>
              <span className={combineThemeClasses(themeClasses.text.primary)}>
                {formatCurrency(subscription.price || 0, subscription.currency)}
              </span>
            </div>
            
            {subscription.tax_amount && (
              <div className="flex justify-between text-sm">
                <span className={combineThemeClasses(themeClasses.text.secondary)}>Tax</span>
                <span className={combineThemeClasses(themeClasses.text.primary)}>
                  {formatCurrency(subscription.tax_amount, subscription.currency)}
                </span>
              </div>
            )}
            
            {subscription.shipping_cost && (
              <div className="flex justify-between text-sm">
                <span className={combineThemeClasses(themeClasses.text.secondary)}>Shipping</span>
                <span className={combineThemeClasses(themeClasses.text.primary)}>
                  {formatCurrency(subscription.shipping_cost, subscription.currency)}
                </span>
              </div>
            )}
            
            {subscription.discounts && subscription.discounts.length > 0 && (
              <div className="flex justify-between text-sm">
                <span className={combineThemeClasses(themeClasses.text.secondary)}>Discounts</span>
                <span className="text-green-600 dark:text-green-400">
                  -{formatCurrency(
                    subscription.discounts.reduce((sum: number, discount: any) => sum + (discount.amount || 0), 0),
                    subscription.currency
                  )}
                </span>
              </div>
            )}
            
            <div className="flex justify-between text-sm font-bold border-t pt-2">
              <span className={combineThemeClasses(themeClasses.text.primary)}>Total</span>
              <span className={combineThemeClasses(themeClasses.text.primary)}>
                {formatCurrency(
                  (subscription.price || 0) + 
                  (subscription.tax_amount || 0) + 
                  (subscription.shipping_cost || 0) -
                  (subscription.discounts?.reduce((sum: number, discount: any) => sum + (discount.amount || 0), 0) || 0),
                  subscription.currency
                )}
              </span>
            </div>
            
            {/* Billing Cycle Info */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <div className="flex justify-between text-xs">
                <span className={combineThemeClasses(themeClasses.text.secondary)}>Billing Cycle</span>
                <span className={combineThemeClasses(themeClasses.text.primary)}>
                  {subscription.billing_cycle?.charAt(0).toUpperCase() + subscription.billing_cycle?.slice(1)}
                </span>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className={combineThemeClasses(themeClasses.text.secondary)}>Auto-renew</span>
                <span className={combineThemeClasses(themeClasses.text.primary)}>
                  {subscription.auto_renew ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              {subscription.next_billing_date && (
                <div className="flex justify-between text-xs mt-1">
                  <span className={combineThemeClasses(themeClasses.text.secondary)}>Next Billing</span>
                  <span className={combineThemeClasses(themeClasses.text.primary)}>
                    {new Date(subscription.next_billing_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionItem;
