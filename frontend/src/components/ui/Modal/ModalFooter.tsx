/**
 * Modal Footer Component
 * Footer section for modal with actions
 */

import { ModalFooterProps } from './types';
import { cn } from '@/utils/utils';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
  align = 'right',
}) => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      className={cn(
        'px-6 py-4 border-t flex gap-2',
        isDark ? 'border-gray-700' : 'border-gray-200',
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};
