import React from 'react';
import { BarChart3Icon, UsersIcon, ShoppingCartIcon, DollarSignIcon } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-copy">Admin Dashboard</h1>
        <p className="text-copy-light mt-2">Welcome to the admin panel</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-lg p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-copy-light text-sm">Total Users</p>
              <p className="text-2xl font-bold text-copy mt-2">0</p>
            </div>
            <UsersIcon className="w-10 h-10 text-primary opacity-20" />
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-copy-light text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-copy mt-2">0</p>
            </div>
            <ShoppingCartIcon className="w-10 h-10 text-success opacity-20" />
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-copy-light text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-copy mt-2">$0</p>
            </div>
            <DollarSignIcon className="w-10 h-10 text-success opacity-20" />
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 border border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-copy-light text-sm">Performance</p>
              <p className="text-2xl font-bold text-copy mt-2">-</p>
            </div>
            <BarChart3Icon className="w-10 h-10 text-warning opacity-20" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-surface rounded-lg p-6 border border-border-light">
        <h2 className="text-xl font-bold text-copy mb-4">Getting Started</h2>
        <p className="text-copy-light mb-4">
          Use the sidebar menu to navigate to different admin sections:
        </p>
        <ul className="space-y-2 text-copy-light list-disc list-inside">
          <li>User Management - Manage users and roles</li>
          <li>Sales Overview - View sales metrics and analytics</li>
          <li>Products - Manage products and inventory</li>
          <li>Orders - View and manage customer orders</li>
          <li>Settings - Configure system settings</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
