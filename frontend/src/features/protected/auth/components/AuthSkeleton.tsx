import React from 'react';

/**
 * Skeleton loader for auth forms (Login, Register, etc.)
 */
export const AuthFormSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-6"></div>
        
        {/* Form fields skeleton */}
        <div className="space-y-4">
          {/* Email field */}
          <div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          {/* Password field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          {/* Submit button */}
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        
        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-border-light w-full"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded absolute bg-surface px-3"></div>
        </div>
        
        {/* Social buttons skeleton */}
        <div className="space-y-3">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        
        {/* Footer link */}
        <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-6"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for password reset forms
 */
export const PasswordResetSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-6"></div>
        
        {/* Form field skeleton */}
        <div className="space-y-4">
          <div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          
          {/* Submit button */}
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        
        {/* Footer link */}
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded mx-auto mt-6"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for email verification page
 */
export const EmailVerificationSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-surface p-8 rounded-lg shadow-sm border border-border-light text-center animate-pulse">
        {/* Icon skeleton */}
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
        
        {/* Title skeleton */}
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-12 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default AuthFormSkeleton;
