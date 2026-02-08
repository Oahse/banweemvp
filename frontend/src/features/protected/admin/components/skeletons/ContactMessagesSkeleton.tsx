/**
 * Contact Messages Skeleton
 * Loading skeleton for admin contact messages page
 */

import React from 'react';

const ContactMessagesSkeleton: React.FC = () => {
  return (
    <div className="p-6 font-sans animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="grid grid-cols-7 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
            <div key={row} className="px-4 py-3">
              <div className="grid grid-cols-7 gap-4 items-center">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesSkeleton;
