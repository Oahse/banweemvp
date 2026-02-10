import React from 'react';
import { Skeleton } from './Skeleton';

export const SkeletonHeader: React.FC<{ animation?: string }> = ({ animation = 'shimmer' }) => {
  return (
    <div className="animate-pulse bg-surface">
      <div className="container mx-auto px-4 py-4 max-w-[1400px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton variant="rectangular" width="48px" height="48px" animation={animation} />
            <div className="space-y-2">
              <Skeleton variant="text" width="120px" animation={animation} />
              <Skeleton variant="text" width="80px" animation={animation} />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Skeleton variant="text" width="80px" animation={animation} />
            <Skeleton variant="text" width="60px" animation={animation} />
            <Skeleton variant="rectangular" width="36px" height="36px" animation={animation} />
          </div>
        </div>
      </div>
      <div className="bg-background border-t border-border-light">
        <div className="container mx-auto px-4 py-3 max-w-[1400px]">
          <div className="flex items-center">
            <Skeleton variant="rectangular" width="160px" height="24px" animation={animation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonNavigation = SkeletonHeader;

export default SkeletonNavigation;
