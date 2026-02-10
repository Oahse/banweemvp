import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'pulse' | 'dots';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  text?: string;
  className?: string;
  centered?: boolean;
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({ 
  size = 'md', 
  variant = 'spinner',
  color = 'primary',
  text,
  className = '',
  centered = true
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const bgColors = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    error: 'bg-error',
    warning: 'bg-warning'
  };

  const borderColors = {
    primary: 'border-t-primary',
    secondary: 'border-t-secondary',
    success: 'border-t-success',
    error: 'border-t-error',
    warning: 'border-t-warning'
  };

  const baseClasses = `${sizeClasses[size]} ${className}`;
  const wrapperClasses = centered ? 'flex flex-col items-center justify-center' : 'inline-flex items-center gap-2';

  if (variant === 'spinner') {
    return (
      <div className={wrapperClasses}>
        <motion.div
          className={`${baseClasses} border-2 border-transparent rounded-full flex-shrink-0`}
          style={{
            borderTopColor: color === 'primary' ? 'var(--color-primary, #3b82f6)' : 
                           color === 'secondary' ? 'var(--color-secondary, #6b7280)' :
                           color === 'success' ? 'var(--color-success, #10b981)' :
                           color === 'error' ? 'var(--color-error, #ef4444)' :
                           'var(--color-warning, #f59e0b)',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent'
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
        {text && (
          <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={wrapperClasses}>
        <motion.div
          className={`${baseClasses} ${bgColors[color]} rounded-full flex-shrink-0`}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop"
          }}
        />
        {text && (
          <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={wrapperClasses}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 ${bgColors[color]} rounded-full`}
              initial={{ y: 0 }}
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut",
                repeatType: "loop"
              }}
            />
          ))}
        </div>
        {text && (
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{text}</span>
        )}
      </div>
    );
  }

  return null;
};

export default AnimatedLoader;
