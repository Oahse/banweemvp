import React from 'react';

/**
 * Skeleton loader for categories list page
 */
export const CategoriesListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-10 w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Search and filters skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        {/* Desktop table skeleton */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards skeleton */}
        <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex gap-2 mt-2">
                <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex items-center gap-1">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex items-center gap-1 mx-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
