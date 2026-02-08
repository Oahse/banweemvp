import React from 'react';

interface AnimatedLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  text?: string;
  className?: string;
}

export const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-18 h-18',
    xl: 'w-24 h-24'
  };

  const colorClasses = {
    primary: 'fill-green-600 dark:fill-green-400',
    secondary: 'fill-gray-600 dark:fill-gray-400',
    success: 'fill-green-600 dark:fill-green-400',
    error: 'fill-red-600 dark:fill-red-400',
    warning: 'fill-yellow-600 dark:fill-yellow-400'
  };

  const bgColorClasses = {
    primary: 'bg-green-600 dark:bg-green-400',
    secondary: 'bg-gray-600 dark:bg-gray-400',
    success: 'bg-green-600 dark:bg-green-400',
    error: 'bg-red-600 dark:bg-red-400',
    warning: 'bg-yellow-600 dark:bg-yellow-400'
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <svg
              className="animate-spin"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Rotating petals */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <ellipse
                  key={index}
                  cx="50"
                  cy="20"
                  rx="8"
                  ry="18"
                  className={colorClasses[color]}
                  opacity={1 - (index * 0.12)}
                  transform={`rotate(${index * 45} 50 50)`}
                />
              ))}
              {/* Center circle */}
              <circle
                cx="50"
                cy="50"
                r="8"
                className={colorClasses[color]}
              />
            </svg>
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-3 h-3 ${bgColorClasses[color]} rounded-full animate-bounce`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} ${bgColorClasses[color]} rounded-full animate-pulse`} />
        );
      
      case 'wave':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`w-2 h-8 ${bgColorClasses[color]} rounded-full animate-pulse`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div className={`${sizeClasses[size]} relative`}>
            <svg
              className="animate-spin"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <ellipse
                  key={index}
                  cx="50"
                  cy="20"
                  rx="8"
                  ry="18"
                  className={colorClasses[color]}
                  opacity={1 - (index * 0.12)}
                  transform={`rotate(${index * 45} 50 50)`}
                />
              ))}
              <circle
                cx="50"
                cy="50"
                r="8"
                className={colorClasses[color]}
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {renderLoader()}
      {text && (
        <p className="text-sm text-gray-700 dark:text-gray-300 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

// Page transition loader with fade effect
export const PageTransitionLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 flex items-center justify-center transition-colors duration-200">
          <div className="text-center">
            <AnimatedLoader size="xl" variant="spinner" color="primary" />
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      )}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

// Skeleton card with shimmer effect
export const ShimmerCard: React.FC<{
  lines?: number;
  showAvatar?: boolean;
  showButton?: boolean;
  className?: string;
}> = ({ lines = 3, showAvatar = false, showButton = false, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200 ${className}`}>
      <div className="animate-pulse">
        {showAvatar && (
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
              style={{
                width: index === lines - 1 ? '70%' : '100%',
                animationDelay: `${index * 0.1}s`
              }}
            />
          ))}
        </div>
        
        {showButton && (
          <div className="mt-6 h-10 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        )}
      </div>
    </div>
  );
};

// Loading overlay for specific components
import LoadingSpinner from '../shared/LoadingSpinner';

export const LoadingOverlay: React.FC<{
  isLoading: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ isLoading, text, size = 'md' }) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 flex items-center justify-center z-10 transition-colors duration-200">
      <LoadingSpinner size={size} text={text} fullScreen={false} />
    </div>
  );
};

// Progress bar loader
export const ProgressBar: React.FC<{
  progress: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}> = ({ progress, color = 'primary', showText = true, animated = true, className = '' }) => {
  const colorClasses = {
    primary: 'bg-green-600 dark:bg-green-400',
    secondary: 'bg-gray-600 dark:bg-gray-400',
    success: 'bg-green-600 dark:bg-green-400',
    error: 'bg-red-600 dark:bg-red-400',
    warning: 'bg-yellow-600 dark:bg-yellow-400'
  };

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Loading</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden transition-colors duration-200">
        <div
          className={`h-full ${colorClasses[color]} ${animated ? 'transition-all duration-300 ease-out' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Staggered animation for multiple items
export const StaggeredAnimation: React.FC<{
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 100, className = '' }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * staggerDelay}ms`,
            animationDuration: '500ms',
            animationFillMode: 'both'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default AnimatedLoader;
