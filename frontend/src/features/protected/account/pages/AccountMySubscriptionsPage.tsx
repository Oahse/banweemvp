import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '../../../SubscriptionContext';
import { useLocale } from '../../../LocaleContext';
import { 
  PlusIcon, 
  PackageIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  SearchIcon,
  EyeIcon,
  PauseIcon
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { SubscriptionCard } from '../subscription/SubscriptionCard';
import { ConfirmationModal } from '../ui/ConfirmationModal';
import { AutoRenewToggle } from '../subscription/AutoRenewToggle';
import ProductsAPI from '../../api/products';
import { Product } from '../../types';

export const MySubscriptions = () => {
  const navigate = useNavigate();
  const { 
    subscriptions, 
    loading, 
    error, 
    refreshSubscriptions,
    manualRefresh,
    createSubscription, 
    updateSubscription, 
    cancelSubscription,
    deleteSubscription,
    activateSubscription,
    pauseSubscription,
    resumeSubscription,
    addProductsToSubscription,
    removeProductsFromSubscription 
  } = useSubscription();
  const { currency = 'USD', formatCurrency: formatCurrencyLocale } = useLocale();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newSubscriptionData, setNewSubscriptionData] = useState({
    name: '',
    billing_cycle: 'monthly',
    delivery_type: 'standard',
    auto_renew: true
  });
  // ...rest of the file (truncated for brevity)
}
