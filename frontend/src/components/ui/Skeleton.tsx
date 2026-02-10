import React from 'react';
import { Skeleton as BaseSkeleton } from './SkeletonLoader';

export const Skeleton: React.FC<any> = (props) => {
  return <BaseSkeleton {...props} />;
};

export const SkeletonText: React.FC<any> = ({ width, height, lines = 1, animation, className = '' }) => {
  return (
    <BaseSkeleton variant="text" width={width} height={height} lines={lines} animation={animation} className={className} />
  );
};

export const SkeletonRectangle: React.FC<any> = ({ width, height, rounded, animation, className = '' }) => {
  const roundedClass = rounded === 'full' ? 'rounded-full' : rounded === 'md' ? 'rounded-md' : rounded === 'lg' ? 'rounded-lg' : '';
  return (
    <BaseSkeleton variant="rectangular" width={width} height={height} animation={animation} className={`${roundedClass} ${className}`} />
  );
};

export default Skeleton;
