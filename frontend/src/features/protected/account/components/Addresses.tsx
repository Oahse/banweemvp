import React, { useState, useEffect } from 'react';
import { PlusCircleIcon, MapPinIcon, HomeIcon, BriefcaseIcon, TrashIcon, PencilIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApi } from '../../../../components/shared/hooks/useAsync';
import { AuthAPI } from '../../../../api';
import { unwrapResponse, extractErrorMessage } from '../../../../utils/api-response';
import { SkeletonAddresses } from '../../../../components/ui/SkeletonAddresses';
import { Dropdown } from '../../../../components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { countries, getCountryOptions, getProvinceOptions, getCountryByCode, getProvincesByCountry, getCityOptions, getCitiesByProvince } from '../../../../data/countries';
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
  // Effect hook to fetch addresses on component mount
  useEffect(() => {
    fetchAddresses(AuthAPI.getAddresses);
  }, [fetchAddresses]);
  // Sync local state with fetched data
  useEffect(() => {
    if (addresses) {
      // Handle the Response.success wrapper structure
      const data = (addresses as any)?.success ? (addresses as any).data : addresses;
      setLocalAddresses(Array.isArray(data) ? data : []);
    }
  }, [addresses]);

  /**
   * Handles changes to form input fields.
   * Updates the formData state based on input name and value.
   * @param {object} e - The event object from the input change.
   */
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles the form submission for adding or updating an address.
   * Calls the AuthAPI to perform the respective action and updates the local state.
   * @param {object} e - The form submission event.
   */
  const handleAddressSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      if (editingAddressId) {
        // If editing an existing address
        const result = await AuthAPI.updateAddress(editingAddressId, formData);
        // Handle wrapped response
        const data = unwrapResponse(result);
        if (data) {
          // Update the local state with the modified address
          setLocalAddresses(localAddresses?.map((a: any) => a.id === editingAddressId ? data : a));
          toast.success('Address updated successfully');
        }
      } else {
        // If adding a new address
        const result = await AuthAPI.createAddress(formData);
        // Handle wrapped response
        const data = unwrapResponse(result);
        if (data) {
          // Add the new address to the local state
          setLocalAddresses(localAddresses ? [...localAddresses, data] : [data]);
          toast.success('Address added successfully');
        }
      }
      resetForm(); // Reset the form after successful operation
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || 'Failed to save address');
    }
  };

  /**
   * Handles initiating the edit process for an address.
   * Populates the form with the selected address's data.
   * @param {object} address - The address object to edit.
   */
  const handleEditAddress = (address: any) => {
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      post_code: address.post_code,
      country: address.country || 'US', // Handle existing addresses
      kind: address.kind,
    });
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  /**
   * Handles deleting an address.
   * Calls the AuthAPI to delete the address and updates the local state.
   * @param {string} id - The ID of the address to delete.
   */
  const handleDeleteAddress = async (id: string) => {
    try {
      await AuthAPI.deleteAddress(id);
      // Remove the deleted address from the local state
      setLocalAddresses(localAddresses?.filter((a: any) => a.id !== id));
      toast.success('Address removed');
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || 'Failed to remove address');
    }
  };

  /**
   * Resets the address form to its initial state.
   */
  const resetForm = () => {
    setFormData({
      street: '',
      city: '',
      state: '',
      post_code: '',
      country: 'US', // Use country code
      kind: 'Shipping',
    });
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  /**
   * Returns an icon based on the address type.
   * @param {string} type - The type of address (e.g., 'Shipping', 'Billing').
   * @returns {JSX.Element} The icon component.
   */
  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case 'Shipping':
        return <HomeIcon size={16} />;
      case 'Billing':
        return <BriefcaseIcon size={16} />;
      default:
        return <MapPinIcon size={16} />;
    }
  };

  // Display loading skeleton while addresses are being fetched
  if (loading) {
    return <SkeletonAddresses count={3} />;
  }

  // Display empty UI instead of error message if fetching addresses failed
  if (error) {
    return (
      <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <MapPinIcon size={48} className="mx-auto text-gray-400 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 mb-3">
          Unable to load addresses
        </p>
        <Button 
          onClick={() => fetchAddresses(AuthAPI.getAddresses)} 
          variant="link"
          size="sm"
          className="text-primary hover:underline"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-main dark:text-white">
            Saved Addresses
          </h2>
          {/* Button to toggle the add/edit address form */}
          <Button onClick={() => setShowAddressForm(!showAddressForm)} className="flex items-center text-primary hover:text-primary-dark">
            <PlusCircleIcon size={18} className="mr-1" />
            <span>Add New Address</span>
          </Button>
        </div>
        {/* Display existing addresses or a message if none are saved */}
        {localAddresses && localAddresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localAddresses.map((address: any) => (
                <div key={address.id} className="border rounded-lg p-3 border-gray-200 dark:border-gray-700">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <span className="mr-1">
                      {getAddressTypeIcon(address.kind)}
                    </span>
                      <span className="text-sm font-medium text-main dark:text-white capitalize">
                      {address.kind}
                    </span>
                  </div>
                </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {address.street}
                </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {address.city}, {address.state} {address.post_code}
                </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {getCountryByCode(address.country)?.name || address.country}
                </p>
                <div className="flex mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  {/* Edit and Delete buttons for each address */}
                    <Button onClick={() => handleEditAddress(address)} variant="ghost" size="sm" className="flex items-center text-sm text-gray-600 hover:text-primary dark:text-gray-300 mr-3">
                      <PencilIcon size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteAddress(address.id)} variant="ghost" size="sm" className="flex items-center text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 mr-3">
                      <TrashIcon size={14} className="mr-1" />
                      Delete
                    </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <MapPinIcon size={36} className="mx-auto text-gray-400 mb-2" />
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
              No addresses saved yet
            </p>
            <Button onClick={() => setShowAddressForm(true)} variant="link" size="sm" className="text-primary hover:underline text-xs">
              Add your first address
            </Button>
          </div>
        )}
        {/* Add/Edit Address Form */}
        {showAddressForm && (
          <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
            <h3 className="text-base font-medium text-main dark:text-white mb-3">
              {editingAddressId ? 'Edit Address' : 'Add New Address'}
            </h3>
            <form onSubmit={handleAddressSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Street Address Input */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Street Address
                  </label>
                  <input type="text" name="street" value={formData.street} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" required />
                </div>
                {/* City Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  {getCitiesByProvince(formData.country, formData.state).length > 0 ? (
                    <Dropdown
                      options={getCityOptions(formData.country, formData.state)}
                      value={formData.city}
                      placeholder="Select a city..."
                      onChange={(value) => setFormData({ ...formData, city: value })}
                      className="w-full"
                      searchable={true}
                      searchPlaceholder="Search cities..."
                    />
                  ) : (
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" placeholder="Enter city" required />
                  )}
                </div>
                {/* State/Province Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State / Province
                  </label>
                  {getProvincesByCountry(formData.country).length > 0 ? (
                    <Dropdown
                      options={getProvinceOptions(formData.country)}
                      value={formData.state}
                      placeholder="Select a state/province..."
                      onChange={(value) => setFormData({ ...formData, state: value, city: '' })} // Clear city when province changes
                      className="w-full"
                      searchable={true}
                      searchPlaceholder="Search states/provinces..."
                    />
                  ) : (
                    <input 
                      type="text" 
                      name="state" 
                      value={formData.state} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" 
                      placeholder="Enter state/province"
                    />
                  )}
                </div>
                {/* Postal/Zip Code Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Postal / Zip Code
                  </label>
                  <input type="text" name="post_code" value={formData.post_code} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white" required />
                </div>
                {/* Country Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <Dropdown
                    options={getCountryOptions()}
                    value={formData.country}
                    placeholder="Select a country..."
                    onChange={(value) => setFormData({ ...formData, country: value, state: '' })} // Clear state when country changes
                    className="w-full"
                    searchable={true}
                    searchPlaceholder="Search countries..."
                  />
                </div>
                 {/* Address Type Dropdown */}
                 <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address Type
                  </label>
                  <Dropdown
                    options={[
                      { value: 'Shipping', label: 'Shipping Address' },
                      { value: 'Billing', label: 'Billing Address' }
                    ]}
                    value={formData.kind}
                    placeholder="Select address type..."
                    onChange={(value) => setFormData({ ...formData, kind: value })}
                    className="w-full"
                    searchable={true}
                    searchPlaceholder="Search address types..."
                  />
                </div>
              </div>
              {/* Form Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <Button type="button" onClick={resetForm} variant="outline" size="sm" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md">
                  {editingAddressId ? 'Update Address' : 'Add Address'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default Addresses;