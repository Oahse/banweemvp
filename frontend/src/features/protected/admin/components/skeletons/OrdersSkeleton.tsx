import React from 'react';
import { Table } from '@/components/ui/Table';

/**
 * Skeleton loader for Orders List Page
 */
export const OrdersListSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
        <div className="flex flex-col gap-4">
          {/* Search bar */}
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Loading rows={10} columns={5} />
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

/**
 * Skeleton loader for Order Detail Page
 */
export const OrderDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="space-y-2">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-64 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
        <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-t" />
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersListSkeleton;
