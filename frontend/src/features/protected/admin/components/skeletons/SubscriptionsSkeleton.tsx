import React from 'react';
import { Table } from '@/components/ui/Table';

/**
 * Skeleton loader for subscriptions page
 * Fully responsive - no overflow on any screen size
 */
export const SubscriptionsListSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between animate-pulse">
        <div>
          <div className="h-7 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Filters skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded md:hidden"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Plan</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Next Billing</Table.HeaderCell>
              <Table.HeaderCell>Created</Table.HeaderCell>
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
