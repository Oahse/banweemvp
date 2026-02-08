import React from 'react';

export const SkeletonProfile = () => (
  <div className="animate-pulse space-y-6">
    <div className="bg-gray-200 dark:bg-gray-700 h-8 w-1/3 rounded mb-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[...Array(10)].map((_, idx) => (
        <div key={idx} className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </div>
      ))}
    </div>
    <div className="mt-4 flex gap-2">
      <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);
