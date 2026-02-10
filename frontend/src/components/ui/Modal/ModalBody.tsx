/**
 * Modal Body Component
 * Main content area for modal
 */

import { ModalBodyProps } from './types';
import { useModalContext } from './ModalContext';
import { cn } from '@/utils/cn';
import { Body } from '@/components/ui/Text/Text';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
  id,
}) => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const { describedBy } = useModalContext();

  return (
    <div
      id={id || describedBy}
      className={cn(
        'px-6 py-4',
        isDark ? 'text-gray-200' : 'text-gray-700',
        className
      )}
    >
      {typeof children === 'string' ? <Body>{children}</Body> : children}
    </div>
  );
};
