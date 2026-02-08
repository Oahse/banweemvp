import React from 'react';

/**
 * Skeleton loader for checkout page
 */
export const CheckoutSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex mb-4">
        <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded mx-2"></div>
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Title skeleton */}
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main content skeleton */}
        <div className="lg:w-2/3 space-y-4">
          {/* Shipping section */}
          <div className="bg-surface rounded-lg shadow-sm p-4">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment section */}
          <div className="bg-surface rounded-lg shadow-sm p-4">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary skeleton */}
        <div className="lg:w-1/3">
          <div className="bg-surface rounded-lg shadow-sm p-4 sticky top-4">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            
            {/* Items */}
            <div className="space-y-3 mb-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-2 mb-4 pt-3 border-t border-border-light">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
