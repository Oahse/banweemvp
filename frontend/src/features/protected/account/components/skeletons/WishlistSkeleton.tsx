import React from 'react';

interface WishlistSkeletonProps {
  animation?: 'shimmer' | 'pulse' | 'wave';
}

export const WishlistSkeleton: React.FC<WishlistSkeletonProps> = ({ animation = 'shimmer' }) => {
  const animationClass = animation === 'pulse' ? 'animate-pulse' : animation === 'shimmer' ? 'animate-shimmer' : '';

  return (
    <div className="space-y-3">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="space-y-1">
          <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 ${animationClass}`}></div>
          <div className={`h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 ${animationClass}`}></div>
        </div>
        <div className="flex gap-2">
          <div className={`h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 ${animationClass}`}></div>
          <div className={`h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 ${animationClass}`}></div>
        </div>
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border border-gray-200 dark:border-gray-700">
            {/* Image Skeleton */}
            <div className={`aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 ${animationClass}`}></div>
            
            {/* Title Skeleton */}
            <div className={`h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1 ${animationClass}`}></div>
            <div className={`h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 ${animationClass}`}></div>
            
            {/* Price Skeleton */}
            <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2 ${animationClass}`}></div>
            
            {/* Stock Status Skeleton */}
            <div className={`h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-3 ${animationClass}`}></div>
            
            {/* Buttons Skeleton */}
            <div className="space-y-1.5">
              <div className={`h-7 bg-gray-200 dark:bg-gray-700 rounded w-full ${animationClass}`}></div>
              <div className={`h-7 bg-gray-200 dark:bg-gray-700 rounded w-full ${animationClass}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center space-x-2 pt-4">
        <div className={`h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 ${animationClass}`}></div>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded ${animationClass}`}></div>
          ))}
        </div>
        <div className={`h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 ${animationClass}`}></div>
      </div>
    </div>
  );
};

export default WishlistSkeleton;
