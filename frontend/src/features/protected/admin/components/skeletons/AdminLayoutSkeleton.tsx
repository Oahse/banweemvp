import React from 'react';

/**
 * Skeleton loader for the entire admin layout
 * Shows animated placeholders for sidebar, header, and content
 */
const AdminLayoutSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-gray-800 shadow-lg">
        {/* Sidebar header skeleton */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Navigation skeleton */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 px-3 py-2 rounded-md"
            >
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ))}
        </nav>

        {/* Sidebar footer skeleton */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar skeleton */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <div className="lg:hidden w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Page content skeleton */}
        <main className="flex-1">
          <div className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <DashboardContentSkeleton />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

/**
 * Skeleton for dashboard content
 */
export const DashboardContentSkeleton: React.FC = () => {
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

      {/* Recent Users skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="h-2 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for table/list pages
 */
export const TablePageSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header with search and filters */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="flex items-center space-x-3">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Table header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="p-4">
              <div className="grid grid-cols-5 gap-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for detail pages
 */
export const DetailPageSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="flex items-center space-x-3">
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Content cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutSkeleton;
