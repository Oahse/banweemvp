import React from 'react';
import { Text, Label } from '@/components/ui/Text/Text';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  id,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label weight="medium" htmlFor={id}>{label}</Label>
      )}
      <textarea
        id={id}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-surface text-copy transition-colors resize-vertical ${error ? 'border-error focus:ring-error/50' : 'border-border focus:ring-primary/50 hover:border-border-strong'} ${className || ''}`}
        {...props}
      />
      {error && <Text variant="body-sm" className="text-error">{error}</Text>}
    </div>
  );
};
