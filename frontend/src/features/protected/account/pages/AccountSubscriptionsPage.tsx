import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../../SubscriptionContext';
import { 
  PlusIcon, 
  PackageIcon,
  EditIcon,
  TrashIcon,
  PauseIcon,
  PlayIcon,
  EyeIcon,
  CalendarIcon,
  DollarSignIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ProductVariantModal } from '../ui/ProductVariantModal';
import { ConfirmationModal } from '../ui/ConfirmationModal';
interface Subscription {
  id: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  subscription_plan?: {
    name: string;
    billing_interval: string;
    base_price: number;
  };
  current_period_start: string;
  current_period_end: string;
  next_billing_date?: string;
  base_cost: number;
  delivery_cost: number;
  tax_amount: number;
  total_cost: number;
  currency: string;
  product_variants?: Array<{
    id: string;
    name: string;
    sku: string;
    price: number;
    product?: {
      name: string;
      images?: Array<{ url: string }>;
    };
  }>;
  auto_renew: boolean;
  created_at: string;
}

interface SubscriptionsProps {
  mode?: 'list' | 'manage';
  // ...rest of the file (truncated for brevity)
}
