import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Text } from '@/components/ui/Text/Text';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  id,
  className,
  options,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Label weight="medium">{label}</Label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`w-full px-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring-1 bg-surface pr-8 ${error ? 'border-error focus:ring-error' : 'border-border focus:ring-primary'} ${className || ''}`}
          {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-copy-lighter pointer-events-none"
        />
      </div>
      {error && <Text variant="body-sm" className="text-error">{error}</Text>}
    </div>
  );
};
