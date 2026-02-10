import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'pulse' | 'dots' | 'petals';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  text?: string;
  className?: string;
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({ 
  size = 'md', 
  variant = 'spinner',
  color = 'primary',
  text,
  className = ''
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

  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className={`${baseClasses} border-2 border-gray-200 ${borderColors[color]} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
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
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className={`${baseClasses} ${bgColors[color]} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
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
      <div className="flex flex-col items-center gap-2">
        <div className={`flex gap-1 ${className}`}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`${sizeClasses[size].replace('w-', 'w-').replace('h-', 'h-')} ${bgColors[color]} rounded-full`}
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && (
          <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
        )}
      </div>
    );
  }

  if (variant === 'petals') {
    const petalSize = {
      sm: 'w-2 h-3',
      md: 'w-3 h-4',
      lg: 'w-4 h-6',
      xl: 'w-6 h-8'
    };

    const containerSize = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20'
    };

    return (
      <div className="flex flex-col items-center gap-2">
        <div className={`${containerSize[size]} relative ${className}`}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
            <motion.div
              key={index}
              className={`absolute top-1/2 left-1/2 ${petalSize[size]} ${bgColors[color]} rounded-full opacity-80`}
              style={{
                transformOrigin: 'center',
              }}
              animate={{
                rotate: [rotation, rotation + 360],
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1
              }}
              initial={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-${size === 'sm' ? '8px' : size === 'md' ? '12px' : size === 'lg' ? '16px' : '20px'})`
              }}
            />
          ))}
          <motion.div
            className={`absolute top-1/2 left-1/2 ${petalSize[size]} ${bgColors[color]} rounded-full opacity-90`}
            style={{
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        {text && (
          <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
        )}
      </div>
    );
  }

  return null;
};

export default AnimatedLoader;
