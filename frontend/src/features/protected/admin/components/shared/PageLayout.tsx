import React from 'react';

export interface AdminPageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${className}`}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 py-2 text-gray-900 dark:text-gray-100">
        {children}
      </main>
    </div>
  );
};

export default AdminPageLayout;
