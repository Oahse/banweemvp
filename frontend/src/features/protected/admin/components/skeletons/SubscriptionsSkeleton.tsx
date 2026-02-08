import React from 'react';

/**
 * Skeleton loader for subscriptions page
 * Fully responsive - no overflow on any screen size
 */
export const SubscriptionsListSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Filters skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded md:hidden"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Desktop table skeleton */}
        <div className="hidden md:block overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-4 py-3 text-left">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="space-y-1 flex-1">
                        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </td>
                  {[...Array(6)].map((_, i) => (
                    <td key={i} className="px-4 py-3">
                      <div className={`h-4 ${i === 5 ? 'w-16' : 'w-20'} bg-gray-200 dark:bg-gray-700 rounded`}></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards skeleton */}
        <div className="md:hidden divide-y border-t border-gray-200 dark:border-gray-700">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded ml-auto"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
