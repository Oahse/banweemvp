import React, { useState } from 'react';
import { 
  TagIcon, 
  XIcon, 
  CheckIcon, 
  AlertCircleIcon,
  LoaderIcon,
  PlusIcon
} from 'lucide-react';
import { cn } from '@/../utils/cn';
import { formatCurrency } from '@/../utils/orderCalculations';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Text, Label } from '@/components/ui/Text/Text';
import { Input } from '@/components/ui/Form';

interface AppliedDiscount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed_amount' | 'free_shipping';
  value: number;
  discount_amount: number;
  applied_at: string;
}

interface DiscountManagerProps {
  subscriptionId: string;
  currentDiscounts: AppliedDiscount[];
  onDiscountApply: (code: string) => Promise<void>;
  onDiscountRemove: (discountId: string) => Promise<void>;
  currency?: string;
  isLoading?: boolean;
}

export const DiscountManager: React.FC<DiscountManagerProps> = ({
  subscriptionId,
  currentDiscounts,
  onDiscountApply,
  onDiscountRemove,
  currency = 'USD',
  isLoading = false
}) => {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [removingDiscountId, setRemovingDiscountId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      setValidationError('Please enter a discount code');
      return;
    }

    // Basic validation
    if (discountCode.trim().length < 3) {
      setValidationError('Discount code must be at least 3 characters');
      return;
    }

    // Check if discount is already applied
    const isAlreadyApplied = currentDiscounts.some(
      discount => discount.code.toLowerCase() === discountCode.trim().toLowerCase()
    );

    if (isAlreadyApplied) {
      setValidationError('This discount code is already applied');
      return;
    }

    setIsApplying(true);
    setValidationError(null);

    try {
      await onDiscountApply(discountCode.trim());
      setDiscountCode('');
      setShowDiscountInput(false);
      toast.success('Discount applied successfully');
    } catch (error: any) {
      console.error('Failed to apply discount:', error);
      
      // Handle specific error messages
      const errorMessage = error?.message || error?.response?.data?.message || 'Failed to apply discount';
      
      if (errorMessage.toLowerCase().includes('invalid') || errorMessage.toLowerCase().includes('not found')) {
        setValidationError('Invalid discount code');
      } else if (errorMessage.toLowerCase().includes('expired')) {
        setValidationError('This discount code has expired');
      } else if (errorMessage.toLowerCase().includes('limit')) {
        setValidationError('This discount code has reached its usage limit');
      } else {
        setValidationError(errorMessage);
      }
      
      toast.error('Failed to apply discount');
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveDiscount = async (discountId: string) => {
    setRemovingDiscountId(discountId);
    
    try {
      await onDiscountRemove(discountId);
      toast.success('Discount removed successfully');
    } catch (error) {
      console.error('Failed to remove discount:', error);
      toast.error('Failed to remove discount');
    } finally {
      setRemovingDiscountId(null);
    }
  };

  const formatDiscountValue = (discount: AppliedDiscount) => {
    switch (discount.type) {
      case 'percentage':
        return `${discount.value}% off`;
      case 'fixed_amount':
        return `${formatCurrency(discount.value, currency)} off`;
      case 'free_shipping':
        return 'Free shipping';
      default:
        return `${formatCurrency(discount.discount_amount, currency)} off`;
    }
  };

  const getDiscountIcon = (type: string) => {
    switch (type) {
      case 'free_shipping':
        return '🚚';
      case 'percentage':
        return '📊';
      case 'fixed_amount':
        return '💰';
      default:
        return '🏷️';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyDiscount();
    } else if (e.key === 'Escape') {
      setShowDiscountInput(false);
      setDiscountCode('');
      setValidationError(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className={cn("text-gray-600", 'font-medium text-sm')}>
          Discounts {currentDiscounts.length > 0 && `(${currentDiscounts.length})`}
        </h4>
        {!showDiscountInput && !isLoading && (
          <Button
            onClick={() => setShowDiscountInput(true)}
            variant="ghost"
            size="sm"
            className={cn(
              'text-[#61b482] hover:text-[#4c9066] text-sm flex items-center gap-1 px-2 py-1 rounded hover:bg-[#61b482]/10 transition-colors'
            )}
            leftIcon={<PlusIcon size={14} />}
          >
            Add Discount
          </Button>
        )}
      </div>

      {/* Applied Discounts */}
      {currentDiscounts.length > 0 ? (
        <div className="space-y-2">
          {currentDiscounts.map((discount) => (
            <div
              key={discount.id}
              className={cn(
                themeClasses.card.base,
                'p-3 flex items-center justify-between'
              )}
            >
              <div className="flex items-center gap-3">
                <Text variant="body-lg" className="text-lg" role="img" aria-label="discount">
                  {getDiscountIcon(discount.type)}
                </Text>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Text variant="body-sm" className={cn(
                      "text-gray-600",
                      'font-medium text-sm'
                    )}>
                      {discount.code.toUpperCase()}
                    </Text>
                    <CheckIcon className={cn(
                      "text-gray-600",
                      'w-4 h-4'
                    )} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Text variant="body-sm" className={cn(
                      "text-gray-600",
                      'text-xs'
                    )}>
                      {formatDiscountValue(discount)}
                    </Text>
                    <Text variant="body-sm" className={cn(
                      "text-gray-600",
                      'text-xs'
                    )}>
                      •
                    </Text>
                    <Text variant="body-sm" className={cn(
                      "text-gray-600",
                      'text-xs font-medium'
                    )}>
                      Saving {formatCurrency(discount.discount_amount, currency)}
                    </Text>
                  </div>
                  <Label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                    Required for US cards, optional for international cards
                  </Label>
                </div>
              </div>
              
              <Button
                onClick={() => handleRemoveDiscount(discount.id)}
                disabled={removingDiscountId === discount.id}
                variant="ghost"
                size="sm"
                className={cn(
                  'text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                )}
                leftIcon={<XIcon size={14} />}
              >
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <Text variant="body-sm" className={cn(
          "text-gray-600",
          'text-sm py-2'
        )}>
          No discounts applied
        </Text>
      )}

      {/* Discount Input */}
      {showDiscountInput && (
        <div className={cn(
          themeClasses.card.base,
          'p-4 space-y-3'
        )}>
          <div className="flex items-center gap-2">
            <TagIcon className={cn(
              "text-gray-600",
              'w-4 h-4'
            )} />
            <Text variant="body-sm" className={cn(
              "text-gray-600",
              'font-medium text-sm'
            )}>
              <Label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                Discount Code
              </Label>
            </Text>
          </div>

          <div className="space-y-2">
            <Label className="block text-sm font-medium mb-2">
              Discount Code
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                  setValidationError(null);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter discount code"
                className={cn(
                  themeClasses.input.base,
                  validationError ? themeClasses.input.error : themeClasses.input.default,
                  'flex-1 text-sm uppercase'
                )}
                disabled={isApplying}
                autoFocus
              />
              <Button
                onClick={handleApplyDiscount}
                disabled={isApplying || !discountCode.trim()}
                variant="primary"
                size="sm"
                className={cn(
                  cn('primary', 'sm'),
                  'w-full'
                )}
                leftIcon={<CheckIcon size={14} />}
                isLoading={isApplying}
              >
                {isApplying ? 'Applying...' : 'Apply'}
              </Button>
              <Button
                onClick={() => {
                  setShowDiscountInput(false);
                  setDiscountCode('');
                }}
                variant="ghost"
                size="sm"
                className={cn(
                  'text-gray-500 hover:text-gray-700 transition-colors'
                )}
                leftIcon={<XIcon size={14} />}
              >
              </Button>
            </div>

            {/* Validation Error */}
            {validationError && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircleIcon className="w-4 h-4" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Help Text */}
            <div className={cn(
              "text-gray-600",
              'text-xs'
            )}>
              Enter a valid discount code to apply savings to your subscription.
              Press Enter to apply or Escape to cancel.
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <LoaderIcon className={cn(
            "text-gray-600",
            'w-5 h-5 animate-spin'
          )} />
          <span className={cn(
            "text-gray-600",
            'ml-2 text-sm'
          )}>
            Loading discounts...
          </span>
        </div>
      )}

      {/* Total Savings Summary */}
      {currentDiscounts.length > 0 && (
        <div className={cn(
          themeClasses.background.elevated,
          'rounded-lg p-3 border-l-4 border-green-500'
        )}>
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-gray-600",
              'font-medium text-sm'
            )}>
              Total Savings
            </span>
            <span className={cn(
              "text-gray-600",
              'font-bold text-sm'
            )}>
              {formatCurrency(
                currentDiscounts.reduce((total, discount) => total + discount.discount_amount, 0),
                currency
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};