import React from 'react';

/**
 * Skeleton loader for users list page
 * Fully responsive - no overflow on any screen size
 */
export const UsersListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div className="w-full lg:w-auto">
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Search and filters skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
                {[...Array(5)].map((_, i) => (
                  <th key={i} className="px-4 py-3 text-left">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  {[...Array(5)].map((_, i) => (
                    <td key={i} className="px-4 py-3">
                      <div className={`h-4 ${i === 0 ? 'w-32' : i === 4 ? 'w-20' : 'w-24'} bg-gray-200 dark:bg-gray-700 rounded`}></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards skeleton */}
        <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex items-center justify-between gap-2">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex items-center gap-1">
            <div className="h-10 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex items-center gap-1 mx-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="h-10 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for user detail page
 * Fully responsive - no overflow on any screen size
 */
export const UserDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-7 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Form skeleton */}
      <div className="rounded-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={i === 2 || i === 5 ? "md:col-span-2" : ""}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
