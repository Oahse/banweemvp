import React from 'react';

/**
 * Skeleton loader for edit product page
 */
export const EditProductSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Form skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        {/* Basic Info Section */}
        <div>
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Category Section */}
        <div>
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Variants Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j}>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
