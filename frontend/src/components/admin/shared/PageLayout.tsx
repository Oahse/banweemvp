import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  children: React.ReactNode;
  className?: string;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  actions,
  breadcrumbs,
  children,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${className}`}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-2 py-2 sm:py-2 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
};

export default AdminPageLayout;
