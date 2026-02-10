import React from 'react';
import { Table } from '@/components/ui/Table';

/**
 * Skeleton loader for users list page
 * Fully responsive - no overflow on any screen size
 */
export const UsersListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1 animate-pulse">
        <div className="w-full lg:w-auto">
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Search and filters skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-full sm:w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Loading rows={5} columns={5} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for user detail page
 * Fully responsive - no overflow on any screen size
 */
export const UserDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="w-full">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-7 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Form skeleton */}
      <div className="rounded-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={i === 2 || i === 5 ? "md:col-span-2" : ""}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
