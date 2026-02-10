/**
 * Price Component
 * 
 * Automatically converts and formats prices based on user's locale
 */

import React from 'react';
import { useLocale } from '../../../shared/hooks/useLocale';
import { Text } from '@/components/ui/Text/Text';

interface PriceProps {
  amount: number;
  sourceCurrency?: string;
  className?: string;
  showCurrency?: boolean;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  sourceCurrency = 'USD',
  className = '',
  showCurrency = true,
}) => {
  const { formatCurrency } = useLocale();

  const formattedPrice = formatCurrency(amount, sourceCurrency);

  if (!showCurrency) {
    // Extract just the number part
    const numberOnly = formattedPrice.replace(/[^\d.,]/g, '');
    return <Text variant="body-sm" className={className}>{numberOnly}</Text>;
  }

  return <Text variant="body-sm" className={className}>{formattedPrice}</Text>;
};
