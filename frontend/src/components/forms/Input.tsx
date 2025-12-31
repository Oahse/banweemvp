import React from 'react';

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
        <label htmlFor={id} className="block text-sm font-medium text-main">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 bg-transparent ${error ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'} ${className || ''}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {helperText && !error && <p className="text-sm text-copy-lighter mt-1">{helperText}</p>}
    </div>
  );
};
