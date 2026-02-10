import React from 'react';

/**
 * Skeleton loader for the Admin Dashboard page
 * Shows animated placeholders for stats, charts, and activity sections
 */
const AdminDashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Stats cards skeleton - 4 compact cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts skeleton - 2 charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-[250px] bg-gray-100 dark:bg-gray-700/50 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Quick stats skeleton - 3 cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Recent Activity - 2 sections side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-2 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
