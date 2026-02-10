import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, ArrowLeft, AlertCircle, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminAPI from '@/api/admin';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import AdminLayoutSkeleton from '@/features/protected/admin/components/skeletons/AdminLayoutSkeleton';
import { UserDetailSkeleton } from '@/features/protected/admin/components/skeletons/UsersSkeleton';
import { Button } from '@/components/ui/Button';

interface UserDetailData {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  is_active: boolean;
  verified?: boolean;
  created_at?: string;
  last_login?: string;
}

export const UserDetail = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserDetailData | null>(null);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: 'customer',
    status: 'active',
    password: ''
  });

  const roleOptions = [
    { value: 'customer', label: 'Customer' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'support', label: 'Support' },
    { value: 'supplier', label: 'Supplier' },
    { value: 'guest', label: 'Guest' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await AdminAPI.getUser(userId as string);
        const data = response?.data?.data || response?.data;

        if (!data) {
          throw new Error('User not found');
        }

        setUser(data);
        setFormData({
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          email: data.email || '',
          role: data.role || 'customer',
          status: data.is_active ? 'active' : 'inactive',
          password: ''
        });
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message || 'Failed to load user';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstname.trim() || !formData.lastname.trim()) {
      toast.error('First and last name are required');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    try {
      setSaving(true);
      const payload: any = {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim(),
        role: formData.role,
        is_active: formData.status === 'active'
      };

      if (formData.password.trim()) {
        payload.password = formData.password.trim();
      }

      const response = await AdminAPI.updateUser(userId as string, payload);
      const updated = response?.data?.data || response?.data || payload;
      setUser(updated);
      setFormData(prev => ({ ...prev, password: '' }));
      toast.success('User updated successfully');
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Failed to update user';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <UserDetailSkeleton />
    );
  }

  return (
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex items-center justify-between">
        <div>
          <Button
            onClick={() => navigate('/admin/users')}
            variant="ghost"
            size="xs"
            className={`inline-flex items-center gap-2 text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-primary transition-colors`}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Users
          </Button>
          <h1 className="text-xl lg:text-2xl font-semibold mt-2">User Details</h1>
          <p className={`mt-1 text-sm lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {user?.email || 'User'}
          </p>
        </div>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start gap-3 ${
          currentTheme === 'dark' 
            ? 'bg-error/10 border-error/30 text-error' 
            : 'bg-error/10 border-error/30 text-error'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Error Loading User</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className={`p-6 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-base lg:text-lg font-semibold">Profile</h2>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                First Name
              </label>
              <input
                type="text"
                value={formData.firstname}
                onChange={(e) => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastname}
                onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Role
              </label>
              <Dropdown
                options={roleOptions}
                value={formData.role}
                onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                className="w-full"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </label>
              <Dropdown
                options={statusOptions}
                value={formData.status}
                onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                className="w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                New Password (optional)
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                  currentTheme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button
              type="button"
              onClick={() => navigate('/admin/users')}
              variant="outline"
              size="xs"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${currentTheme === 'dark' ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              variant="primary"
              size="xs"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium disabled:opacity-60"
              leftIcon={<Save size={16} />}
              isLoading={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetail;
