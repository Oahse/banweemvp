import React from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text/Text';

interface TabHeaderProps {
  tabs: {
    id: string;
    label: string;
    count?: number;
    disabled?: boolean;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export const TabHeader: React.FC<TabHeaderProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={cn(
      'border-b border-gray-200 overflow-x-auto',
      className
    )}>
      <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const hasCount = tab.count !== undefined;
          
          return (
            <Button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              variant="ghost"
              size="xs"
              className={`py-2 px-2 sm:px-3 border font-medium text-sm capitalize transition-colors duration-200 flex items-center gap-1 sm:gap-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                isActive
                  ? 'border-[#61b482] text-[#61b482]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } ${
                tab.disabled && 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Text as="span" className="hidden sm:inline">{tab.label}</Text>
              <Text as="span" className="sm:hidden">{tab.label.charAt(0).toUpperCase() + tab.label.slice(1, 3)}{' '}</Text>
              
              {hasCount && (
                <Text 
                  as="span"
                  className={cn(
                    'py-0.5 px-1.5 sm:px-2 rounded-full text-sm flex-shrink-0',
                    isActive 
                      ? 'bg-[#61b482]/20 text-[#61b482]' 
                      : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {tab.count}
                </Text>
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabHeader;
