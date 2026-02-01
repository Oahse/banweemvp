/**
 * Product-related configuration
 * Centralized configuration for product constants and data
 */

export const DIETARY_TAGS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Organic',
  'Non-GMO',
  'Dairy-Free',
  'Sugar-Free',
  'Keto-Friendly',
  'Paleo',
  'Halal',
  'Kosher'
];

export const PRODUCT_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'draft', label: 'Draft' }
];

export const AVAILABILITY_STATUSES = [
  { value: 'available', label: 'Available' },
  { value: 'limited', label: 'Limited Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'discontinued', label: 'Discontinued' }
];

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' }
];

export const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' }
];

export const USER_ROLES = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Supplier', label: 'Supplier' }
];

export const USER_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
];

export const SUBSCRIPTION_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'expired', label: 'Expired' },
  { value: 'pending', label: 'Pending' }
];

export const REFUND_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'processed', label: 'Processed' }
];

export const DEFAULT_PAGINATION_LIMIT = 10;

export const PAGINATION_OPTIONS = [5, 10, 20, 50, 100];
