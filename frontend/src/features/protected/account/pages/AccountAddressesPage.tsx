import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  PlusCircleIcon,
  MapPinIcon,
  TrashIcon,
  PencilIcon,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useApi } from '@/components/shared/hooks/useAsync';
import { AuthAPI } from '@/api';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { SkeletonAddresses } from '@/components/ui/SkeletonAddresses';
import { Dropdown } from '@/components/ui/Dropdown';
import {
  getCountryOptions,
  getProvinceOptions,
  getCityOptions,
  getProvincesByCountry,
  getCitiesByProvince,
  getCountryByCode,
} from '@/data/countries';
import { Text, Heading, Label } from '@/components/ui/Text/Text';
type Address = {
  id?: string;
  street?: string;
  city?: string;
  state?: string;
  post_code?: string;
  country?: string; // country code
  kind?: string;
};

const initialForm = {
  street: '',
  city: '',
  state: '',
  post_code: '',
  country: 'US',
  kind: 'Shipping',
};

export const Addresses: React.FC = () => {
  const {
    data: apiAddresses,
    loading,
    error,
    execute: fetchAddresses,
  } = useApi();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Address>(initialForm);
  const [provinceOptions, setProvinceOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const countryOptions = getCountryOptions();

  useEffect(() => {
    fetchAddresses(() => AuthAPI.getAddresses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!apiAddresses) return;
    const data = unwrapResponse(apiAddresses) || unwrapResponse(apiAddresses)?.data || apiAddresses;
    setAddresses(Array.isArray(data) ? data : data?.data || []);
  }, [apiAddresses]);

  useEffect(() => {
    // populate provinces & cities when country changes
    if (!form.country) {
      setProvinceOptions([]);
      setCityOptions([]);
      return;
    }
    const provinces = getProvinceOptions(form.country) || getProvincesByCountry(form.country) || [];
    setProvinceOptions(provinces);
    // if state present, load cities
    if (form.state) {
      const cities = getCityOptions(form.state) || getCitiesByProvince(form.state) || [];
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  }, [form.country, form.state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setForm(prev => ({ ...prev, country: value, state: '', city: '' }));
  };

  const handleProvinceChange = (value: string) => {
    setForm(prev => ({ ...prev, state: value, city: '' }));
    const cities = getCityOptions(value) || getCitiesByProvince(value) || [];
    setCityOptions(cities);
  };

  const handleCityChange = (value: string) => {
    setForm(prev => ({ ...prev, city: value }));
  };

  const openNew = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const openEdit = (addr: Address) => {
    setEditingId(addr.id);
    setForm({
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      post_code: addr.post_code || '',
      country: addr.country || 'US',
      kind: addr.kind || 'Shipping',
    });
    setShowForm(true);
  };

  const saveAddress = async () => {
    try {
      if (editingId) {
        const resp = await AuthAPI.updateAddress(editingId, form);
        const updated = unwrapResponse(resp) || resp;
        toast.success('Address updated');
      } else {
        const resp = await AuthAPI.createAddress(form);
        const created = unwrapResponse(resp) || resp;
        toast.success('Address added');
      }
      await fetchAddresses(() => AuthAPI.getAddresses());
      setShowForm(false);
      setEditingId(null);
    } catch (err: any) {
      console.error(err);
      toast.error(extractErrorMessage(err) || 'Failed to save address');
    }
  };

  const removeAddress = async (id: string) => {
    if (!confirm('Delete this address?')) return;
    try {
      await AuthAPI.deleteAddress(id);
      toast.success('Address deleted');
      await fetchAddresses(() => AuthAPI.getAddresses());
    } catch (err: any) {
      console.error(err);
      toast.error(extractErrorMessage(err) || 'Failed to delete address');
    }
  };

  if (loading) {
    return <SkeletonAddresses />;
  }

  if (error) {
    return (
      <div className="p-4">
        <Text variant="body-sm" tone="danger">Failed to load addresses.</Text>
        <button
          onClick={() => fetchAddresses(() => AuthAPI.getAddresses())}
          className="mt-2 px-3 py-2 bg-primary text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Heading level={5}>Saved Addresses</Heading>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-white rounded"
        >
          <PlusCircleIcon size={16} /> Add Address
        </button>
      </div>

      <div className="grid gap-3">
        {addresses.length === 0 && <Text variant="body-sm" tone="secondary">No addresses saved.</Text>}

        {addresses.map((addr: any) => (
          <div key={addr.id} className="p-3 border rounded flex items-start justify-between">
            <div className="flex items-start gap-3">
              <MapPinIcon size={18} className="text-primary mt-1" />
              <div>
                <Text weight="medium">{addr.street}</Text>
                <Text variant="body-sm" tone="secondary">
                  {addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.post_code ? `• ${addr.post_code}` : ''}
                </Text>
                <Text variant="caption" tone="secondary" className="mt-1">{getCountryByCode(addr.country)?.name || addr.country}</Text>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(addr)}
                className="p-1 hover:bg-surface-hover rounded"
                title="Edit"
              >
                <PencilIcon size={14} />
              </button>
              <button
                onClick={() => removeAddress(addr.id)}
                className="p-1 hover:bg-surface-hover rounded text-error-600"
                title="Delete"
              >
                <TrashIcon size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="mt-6 p-4 border rounded bg-surface">
          <Heading level={5} className="mb-3">{editingId ? 'Edit Address' : 'New Address'}</Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="block mb-1">Street</Label>
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">Post Code</Label>
              <input
                name="post_code"
                value={form.post_code}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <Label className="block mb-1">Country</Label>
              <Dropdown
                options={countryOptions}
                value={form.country}
                onChange={handleCountryChange}
                placeholder="Select country"
              />
            </div>

            <div>
              <Label className="block mb-1">Province / State</Label>
              <Dropdown
                options={provinceOptions}
                value={form.state || ''}
                onChange={handleProvinceChange}
                placeholder="Select province"
              />
            </div>

            <div>
              <Label className="block mb-1">City</Label>
              <Dropdown
                options={cityOptions}
                value={form.city || ''}
                onChange={handleCityChange}
                placeholder="Select city"
              />
            </div>

            <div>
              <Label className="block mb-1">Kind</Label>
              <Dropdown
                options={[
                  { value: 'Shipping', label: 'Shipping' },
                  { value: 'Billing', label: 'Billing' },
                ]}
                value={form.kind || 'Shipping'}
                onChange={(v: string) => setForm(prev => ({ ...prev, kind: v }))}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={saveAddress}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="px-4 py-2 bg-surface border rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;