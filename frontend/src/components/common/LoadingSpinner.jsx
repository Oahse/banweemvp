/**
 * Reusable Loading Spinner component
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg' | 'xl'} props.size - Size of the spinner
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Whether to display as full screen overlay
 */
export const LoadingSpinner = ({
  size = 'md',
  className = '',
  text,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-green-600 border-t-transparent ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
