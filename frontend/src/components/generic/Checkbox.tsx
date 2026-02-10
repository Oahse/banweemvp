import React from 'react';
import { Text } from '@/components/ui/Text/Text';

export const Checkbox = ({
  label,
  error,
  id,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className={`h-4 w-4 text-primary focus:ring-primary/50 border-border rounded bg-surface transition-colors ${className || ''}`}
        {...props}
      />
      {label && (
        <Text variant="body-sm" tone="secondary">{label}</Text>
      )}
      {error && <Text variant="body-sm" tone="error">{error}</Text>}
    </div>
  );
};
