import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Modal } from '@/components/ui/Modal';
import { Pagination } from '@/components/ui/Pagination';
import { LoadingFallback } from '@/components/LoadingFallback';
import { PlusIcon, EditIcon, TrashIcon, EyeIcon } from 'lucide-react';
import PromocodesAPI, { Promocode, PromocodeCreate, PromocodeUpdate } from '@/api/promocodes';

interface PaginationInfo {
  current_page: number;
  limit: number;
  total: number;
  pages: number;
}

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const AdminPromocodesPage: React.FC = () => {
  const [promocodes, setPromocodes] = useState<Promocode[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPromocode, setEditingPromocode] = useState<Promocode | null>(null);
  const [formData, setFormData] = useState<PromocodeCreate>({
    code: '',
    discount_type: 'percentage',
    value: 0,
    is_active: true
  });

  const itemsPerPage = 10;

  useEffect(() => {
    fetchPromocodes();
  }, [currentPage]);

  const fetchPromocodes = async () => {
    try {
      setLoading(true);
      const result = await PromocodesAPI.getAllPromocodes(currentPage, itemsPerPage);
      
      setPromocodes(result.promocodes);
      setTotalPages(result.pagination.pages);
    } catch (error: any) {
      console.error('Error fetching promocodes:', error);
      toast.error(error.message || 'Failed to fetch promocodes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPromocode) {
        await PromocodesAPI.updatePromocode(editingPromocode.id, formData as PromocodeUpdate);
        toast.success('Promocode updated successfully');
      } else {
        await PromocodesAPI.createPromocode(formData);
        toast.success('Promocode created successfully');
      }
      
      setShowCreateModal(false);
      setEditingPromocode(null);
      setFormData({
        code: '',
        discount_type: 'percentage',
        value: 0,
        is_active: true
      });
      fetchPromocodes();
    } catch (error: any) {
      console.error('Error saving promocode:', error);
      toast.error(error.message || 'Failed to save promocode');
    }
  };

  const handleEdit = (promocode: Promocode) => {
    setEditingPromocode(promocode);
    setFormData({
      code: promocode.code,
      description: promocode.description,
      discount_type: promocode.discount_type,
      value: promocode.value,
      minimum_order_amount: promocode.minimum_order_amount,
      maximum_discount_amount: promocode.maximum_discount_amount,
      usage_limit: promocode.usage_limit,
      is_active: promocode.is_active,
      valid_from: promocode.valid_from,
      valid_until: promocode.valid_until
    });
    setShowCreateModal(true);
  };

  const handleDelete = async (promocodeId: string) => {
    if (!confirm('Are you sure you want to delete this promocode?')) {
      return;
    }

    try {
      await PromocodesAPI.deletePromocode(promocodeId);
      toast.success('Promocode deleted successfully');
      fetchPromocodes();
    } catch (error: any) {
      console.error('Error deleting promocode:', error);
      toast.error(error.message || 'Failed to delete promocode');
    }
  };

  const openCreateModal = () => {
    setEditingPromocode(null);
    setFormData({
      code: '',
      discount_type: 'percentage',
      value: 0,
      is_active: true
    });
    setShowCreateModal(true);
  };

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Heading level={2}>Promocodes</Heading>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <PlusIcon size={16} />
          Create Promocode
        </Button>
      </div>

      {/* Promocodes Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {promocodes.map((promocode) => (
                <tr key={promocode.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-mono text-sm font-medium">{promocode.code}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {promocode.discount_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {promocode.discount_type === 'percentage' 
                        ? `${promocode.value}%` 
                        : `$${promocode.value}`
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {promocode.used_count}{promocode.usage_limit ? `/${promocode.usage_limit}` : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      promocode.is_active 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {promocode.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {promocode.valid_until 
                      ? new Date(promocode.valid_until).toLocaleDateString()
                      : 'No expiry'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(promocode)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <EditIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(promocode.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={promocodes.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemName="promocodes"
          />
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={editingPromocode ? 'Edit Promocode' : 'Create Promocode'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Enter promocode"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="discount_type">Discount Type</Label>
              <Select
                id="discount_type"
                value={formData.discount_type}
                onChange={(e) => setFormData({ ...formData, discount_type: e.target.value as any })}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
                <option value="shipping">Free Shipping</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="value">
                {formData.discount_type === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
              </Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="0"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="maximum_discount_amount">Maximum Discount Amount ($)</Label>
            <Input
              id="maximum_discount_amount"
              type="number"
              step="0.01"
              min="0"
              value={formData.maximum_discount_amount || ''}
              onChange={(e) => setFormData({ ...formData, maximum_discount_amount: parseFloat(e.target.value) || undefined })}
              placeholder="Optional cap on discount"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minimum_order_amount">Minimum Order Amount ($)</Label>
              <Input
                id="minimum_order_amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.minimum_order_amount || ''}
                onChange={(e) => setFormData({ ...formData, minimum_order_amount: parseFloat(e.target.value) || undefined })}
                placeholder="Optional minimum"
              />
            </div>

            <div>
              <Label htmlFor="usage_limit">Usage Limit</Label>
              <Input
                id="usage_limit"
                type="number"
                min="1"
                value={formData.usage_limit || ''}
                onChange={(e) => setFormData({ ...formData, usage_limit: parseInt(e.target.value) || undefined })}
                placeholder="Optional limit"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="valid_from">Valid From</Label>
              <Input
                id="valid_from"
                type="datetime-local"
                value={formData.valid_from || ''}
                onChange={(e) => setFormData({ ...formData, valid_from: e.target.value || undefined })}
              />
            </div>

            <div>
              <Label htmlFor="valid_until">Valid Until</Label>
              <Input
                id="valid_until"
                type="datetime-local"
                value={formData.valid_until || ''}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value || undefined })}
              />
            </div>
          </div>

          <div className="flex items-center">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
            <Label htmlFor="is_active" className="ml-2">Active</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingPromocode ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPromocodesPage;
