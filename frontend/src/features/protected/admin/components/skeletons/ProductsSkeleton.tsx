import React from 'react';

/**
 * Skeleton loader for products list page
 */
export const ProductsListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Search and filters skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
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
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 mt-2">
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

/**
 * Skeleton loader for product detail page
 */
export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div>
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-3">
          {/* Basic info card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
            <div className="mt-2.5">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Category card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="h-3 w-40 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Variants card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div className="space-y-2.5">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-700 rounded p-2.5">
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
