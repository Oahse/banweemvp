/**
 * Modal Header Component
 * Header section for modal with title
 */

import { ModalHeaderProps } from './types';
import { useModalContext } from './ModalContext';
import { cn } from '@/utils/cn';
import { Heading } from '@/components/ui/Text/Text';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  id,
}) => {
  const { currentTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const { labelledBy } = useModalContext();

  return (
    <div
      className={cn(
        'px-6 py-4 border-b',
        isDark ? 'border-gray-700' : 'border-gray-200',
        className
      )}
    >
      <Heading
        level={5}
        id={id || labelledBy}
        className="text-lg font-semibold pr-8"
      >
        {children}
      </Heading>
    </div>
  );
};
