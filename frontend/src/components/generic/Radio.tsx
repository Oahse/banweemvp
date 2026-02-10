import React from 'react';
import { cn } from '../../utils/utils';
import { Text } from '@/components/ui/Text/Text';



export const Radio = ({
  label,
  error,
  id,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        className={cn(
          'h-4 w-4 text-primary focus:ring-primary/50 border-border rounded-full bg-surface transition-colors',
          className
        )}
        {...props}
      />
      {label && (
        <Text variant="body-sm" tone="secondary">{label}</Text>
      )}
      {error && <Text variant="body-sm" className="text-error">{error}</Text>}
    </div>
  );
};
