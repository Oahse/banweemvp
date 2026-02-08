import React, { useState, useEffect } from 'react';
import { PlusCircleIcon, MapPinIcon, HomeIcon, BriefcaseIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApi } from '@/components/shared/hooks/useAsync';
import { AuthAPI } from '@/api';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { SkeletonAddresses } from '@/components/ui/SkeletonAddresses';
import { Dropdown } from '@/components/ui/Dropdown';
import { countries, getCountryOptions, getProvinceOptions, getCountryByCode, getProvincesByCountry, getCityOptions, getCitiesByProvince } from '@/data/countries';

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
  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses(() => AuthAPI.getAddresses());
  }, []);

  // Update local addresses when data changes
  useEffect(() => {
    if (addresses) {
      // Handle different response structures
      const addressesArray = Array.isArray(addresses) ? addresses : 
                            (addresses as any)?.data || [];
      setLocalAddresses(addressesArray);
    } else {
      setLocalAddresses([]);
    }
  }, [addresses]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle country change to update state and city options
  const handleCountryChange = (countryCode: string) => {
    setFormData(prev => ({
      ...prev,
      country: countryCode,
      state: '',
      city: ''
    }));
  };

  // Handle state change to update city options
  const handleStateChange = (state: string) => {
    setFormData(prev => ({
      ...prev,
      state,
      city: ''
    }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      street: '',
      city: '',
      state: '',
      post_code: '',
      country: 'US',
      kind: 'Shipping',
    });
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  // Handle adding a new address
  const handleAddAddress = async () => {
    try {
      const response = await AuthAPI.createAddress(formData);
      const newAddress = unwrapResponse(response);
      
      if (newAddress) {
        setLocalAddresses(prev => [...prev, newAddress]);
        toast.success('Address added successfully');
        resetForm();
        await fetchAddresses(() => AuthAPI.getAddresses());
      }
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  // Handle updating an existing address
  const handleUpdateAddress = async () => {
    try {
      const response = await AuthAPI.updateAddress(editingAddressId!, formData);
      const updatedAddress = unwrapResponse(response);
      
      if (updatedAddress) {
        setLocalAddresses(prev => 
          prev.map(addr => addr.id === editingAddressId ? updatedAddress : addr)
        );
        toast.success('Address updated successfully');
        resetForm();
        await fetchAddresses(() => AuthAPI.getAddresses());
      }
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  // Handle deleting an address
  const handleDeleteAddress = async (addressId: string) => {
    try {
      await AuthAPI.deleteAddress(addressId);
      setLocalAddresses(prev => prev.filter(addr => addr.id !== addressId));
      toast.success('Address deleted successfully');
      await fetchAddresses(() => AuthAPI.getAddresses());
    } catch (error) {
      toast.error(extractErrorMessage(error));
    }
  };

  // Handle editing an address
  const handleEditAddress = (address: any) => {
    setFormData({
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      post_code: address.post_code || '',
      country: address.country || 'US',
      kind: address.kind || 'Shipping',
    });
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddressId) {
      handleUpdateAddress();
    } else {
      handleAddAddress();
    }
  };

  // Get address kind icon
  const getAddressIcon = (kind: string) => {
    switch (kind) {
      case 'Home':
        return <HomeIcon className="w-4 h-4" />;
      case 'Work':
        return <BriefcaseIcon className="w-4 h-4" />;
      default:
        return <MapPinIcon className="w-4 h-4" />;
    }
  };

  // Get country name from code
  const getCountryName = (countryCode: string) => {
    const country = getCountryByCode(countryCode);
    return country ? country.name : countryCode;
  };

  // Display loading skeleton while addresses are being fetched
  if (loading) {
    return <SkeletonAddresses count={3} />;
  }

  // Display empty UI instead of error message if fetching addresses failed
  if (error) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowAddressForm(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Add Address
          </button>
        </div>
        
        <div className="text-center py-6">
          <MapPinIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Unable to load addresses</p>
          <button
            onClick={() => fetchAddresses(() => AuthAPI.getAddresses())}
            className="mt-4 text-primary hover:text-primary/80"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold"> </h2>
        <button
          onClick={() => setShowAddressForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Address
        </button>
      </div>

      {/* Address Form */}
      {showAddressForm && (
        <div className="bg-white border rounded-lg p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  State/Province
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="post_code"
                  value={formData.post_code}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  Country
                </label>
                <Dropdown
                  value={formData.country}
                  onChange={handleCountryChange}
                  options={getCountryOptions()}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">
                  Address Type
                </label>
                <select
                  name="kind"
                  value={formData.kind}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="Shipping">Shipping</option>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-2 py-1 text-xs bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                {editingAddressId ? 'Update Address' : 'Add Address'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-2 py-1 text-xs border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      {localAddresses.length === 0 ? (
        <div className="text-center py-6">
          <MapPinIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No addresses saved yet</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Add your first address to make checkout faster
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {localAddresses && Array.isArray(localAddresses) && localAddresses.map((address) => (
            <div
              key={address.id}
              className="p-2 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    {getAddressIcon(address.kind)}
                    <span className="text-xs font-medium text-gray-900">{address.kind}</span>
                  </div>
                  
                  <div className="text-gray-600 space-y-0.5 text-xs">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.post_code}
                    </p>
                    <p>{getCountryName(address.country)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="p-1 text-gray-500 hover:text-primary transition-colors"
                    title="Edit address"
                  >
                    <PencilIcon className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    title="Delete address"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
