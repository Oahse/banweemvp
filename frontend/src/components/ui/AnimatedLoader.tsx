import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'pulse' | 'dots' | 'petals';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  text?: string;
  className?: string;
  centered?: boolean;
}

const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({ 
  size = 'md', 
  variant = 'petals',
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
  const wrapperClasses = centered ? 'flex flex-col items-center justify-center min-h-[200px]' : 'flex flex-col items-center gap-2';

  if (variant === 'spinner') {
    return (
      <div className={wrapperClasses}>
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
          <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text}</span>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={wrapperClasses}>
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
          <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text}</span>
        )}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={wrapperClasses}>
        <div className="flex gap-1">
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
          <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text}</span>
        )}
      </div>
    );
  }

  if (variant === 'petals') {
    const petalSize = {
      sm: 'w-1 h-3',
      md: 'w-1.5 h-4',
      lg: 'w-2 h-6',
      xl: 'w-3 h-8'
    };

    const containerSize = {
      sm: 'w-10 h-10',
      md: 'w-14 h-14',
      lg: 'w-18 h-18',
      xl: 'w-24 h-24'
    };

    const petalDistance = {
      sm: 12,
      md: 16,
      lg: 20,
      xl: 28
    };

    return (
      <div className={wrapperClasses}>
        <div className={`${containerSize[size]} relative`}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
            <motion.div
              key={index}
              className={`absolute top-1/2 left-1/2 ${petalSize[size]} ${bgColors[color]} rounded-full`}
              style={{
                transformOrigin: 'center',
              }}
              animate={{
                rotate: [rotation, rotation + 360],
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1
              }}
              initial={{
                transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-${petalDistance[size]}px)`
              }}
            />
          ))}
          <motion.div
            className={`absolute top-1/2 left-1/2 w-2 h-2 ${bgColors[color]} rounded-full`}
            style={{
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        {text && (
          <span className="text-sm text-gray-600 dark:text-gray-400 mt-2">{text}</span>
        )}
      </div>
    );
  }

  return null;
};

export default AnimatedLoader;
