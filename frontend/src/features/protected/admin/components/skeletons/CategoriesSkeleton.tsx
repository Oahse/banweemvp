import React from 'react';
import { Table } from '@/components/ui/Table';

/**
 * Skeleton loader for categories list page
 */
export const CategoriesListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1 animate-pulse">
        <div>
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-10 w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Search and filters skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Loading rows={5} columns={4} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
