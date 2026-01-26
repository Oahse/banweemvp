import React from 'react';
import { Skeleton } from './Skeleton';

export const SkeletonProductCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]"></div>
        
        {/* Sale Badge Skeleton */}
        <div className="absolute top-2 left-2">
          <Skeleton className="w-12 h-6 rounded-md" />
        </div>
        
        {/* Quick Actions Skeleton */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 sm:p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
        
        {/* Price Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-12 h-4" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-3 h-3" />
            ))}
          </div>
          <Skeleton className="w-12 h-3" />
        </div>

        {/* Quantity Selector Skeleton (hidden on mobile) */}
        <div className="hidden sm:block space-y-1">
          <Skeleton className="w-16 h-3" />
          <Skeleton className="w-full h-8 rounded-md" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="w-full h-10 rounded-lg" />

        {/* Stock Info Skeleton */}
        <div className="text-center">
          <Skeleton className="w-20 h-3 mx-auto" />
        </div>
      </div>
    </div>
  );
};