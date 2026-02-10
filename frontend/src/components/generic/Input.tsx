import React from 'react';
import { Text } from '@/components/ui/Text/Text';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  id?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  id,
  className,
  type = 'text',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Text variant="body-sm" weight="medium">{label}</Text>
      )}
      <input
        type={type}
        id={id}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-surface text-copy transition-colors ${error ? 'border-error focus:ring-error/50' : 'border-border focus:ring-primary/50 hover:border-border-strong'} ${className || ''}`}
        {...props}
      />
      {error && <Text variant="body-sm" className="text-error">{error}</Text>}
      {helperText && !error && <Text variant="body-sm" tone="secondary">{helperText}</Text>}
    </div>
  );
};
