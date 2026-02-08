import React from 'react';

/**
 * Skeleton loader for orders list page
 */
export const OrdersListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Filters skeleton */}
      <div className="flex gap-2 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>

      {/* Orders list skeleton */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-surface rounded-lg shadow-sm p-4 border border-border-light">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            
            <div className="flex gap-3 mb-3">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-border-light">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center pt-4">
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for order detail page
 */
export const OrderDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>

      {/* Header skeleton */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order items */}
          <div className="bg-surface rounded-lg shadow-sm p-4 border border-border-light">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 p-3 bg-background rounded">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping info */}
          <div className="bg-surface rounded-lg shadow-sm p-4 border border-border-light">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Order summary */}
          <div className="bg-surface rounded-lg shadow-sm p-4 border border-border-light">
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-surface rounded-lg shadow-sm p-4 border border-border-light">
            <div className="space-y-2">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for track order page
 */
export const TrackOrderSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 animate-pulse">
      {/* Title skeleton */}
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>

      <div className="max-w-2xl mx-auto">
        {/* Search form skeleton */}
        <div className="bg-surface rounded-lg shadow-sm p-4 mb-4 border border-border-light">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Timeline skeleton */}
        <div className="bg-surface rounded-lg shadow-sm p-4 border border-border-light">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  {i < 3 && <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-700"></div>}
                </div>
                <div className="flex-1 space-y-2 pb-4">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersListSkeleton;
