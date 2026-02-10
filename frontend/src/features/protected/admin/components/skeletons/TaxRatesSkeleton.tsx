import React from 'react';
import { Table } from '@/components/ui/Table';

/**
 * Skeleton loader for tax rates page
 * Fully responsive - no overflow on any screen size
 */
export const TaxRatesListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-pulse">
        <div className="w-full sm:w-auto">
          <div className="h-7 w-56 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-10 w-full sm:w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Search and filters skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex flex-col gap-4">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex flex-wrap gap-2">
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
              <Table.HeaderCell>Rate</Table.HeaderCell>
              <Table.HeaderCell>Region</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Loading rows={5} columns={7} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
