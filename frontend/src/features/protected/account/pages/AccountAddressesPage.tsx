import React, { useState, useEffect } from 'react';
import { PlusCircleIcon, MapPinIcon, HomeIcon, BriefcaseIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApi } from '../../../shared/hooks/useAsync';
import { AuthAPI } from '@/api';
import { unwrapResponse, extractErrorMessage } from '../../utils/api-response';
import { SkeletonAddresses } from '../ui/SkeletonAddresses';
import { Dropdown } from '../ui/Dropdown';
import { countries, getCountryOptions, getProvinceOptions, getCountryByCode, getProvincesByCountry, getCityOptions, getCitiesByProvince } from '../../data/countries';

/**
 * Addresses component allows users to manage their saved addresses.
 * Users can view, add, edit, and delete addresses.
 */
export const Addresses = () => {
  // Custom hook to fetch user addresses from the API
  const { data: addresses, loading, error, execute: fetchAddresses } = useApi();
  // Local state for managing addresses
  const [localAddresses, setLocalAddresses] = useState<any[]>([]);
  // State to control the visibility of the address form
  const [showAddressForm, setShowAddressForm] = useState(false);
  // State to store the ID of the address being edited (null if adding a new address)
  const [editingAddressId, setEditingAddressId] = useState(null);
  // State to store form data for adding or editing an address
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    post_code: '',
    country: 'US', // Use country code instead of country name
    kind: 'Shipping',
  });
  // ...rest of the file (truncated for brevity)
}
