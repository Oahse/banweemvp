import React from 'react';
import { Table } from '@/components/ui/Table';

/**
 * Skeleton loader for inventory list page
 * Fully responsive - no overflow on any screen size
 */
export const InventoryListSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1 animate-pulse">
        <div className="w-full lg:w-auto">
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
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
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>SKU</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Loading rows={5} columns={6} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for inventory locations page
 * Fully responsive - no overflow on any screen size
 */
export const InventoryLocationsSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div className="w-full lg:w-auto">
          <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-10 w-full sm:w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Search skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex-1">
                <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton loader for inventory adjustments page
 * Fully responsive - no overflow on any screen size
 */
export const InventoryAdjustmentsSkeleton: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1 animate-pulse">
        <div className="w-full lg:w-auto">
          <div className="h-7 w-56 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-72 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="h-10 w-full sm:w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Filters skeleton */}
      <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex flex-wrap gap-2">
          <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Location</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Reason</Table.HeaderCell>
              <Table.HeaderCell>By</Table.HeaderCell>
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
