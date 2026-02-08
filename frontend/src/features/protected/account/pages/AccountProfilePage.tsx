import React, { useState, useEffect } from 'react';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, CalendarIcon, GlobeIcon, SaveIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../auth/contexts/AuthContext';
import { AuthAPI } from '../../api';
import { unwrapResponse, extractErrorMessage } from '../../utils/api-response';
import { SkeletonProfile } from '../ui/SkeletonProfile';
import { AdminDashboardSkeleton } from '@/components/ui/SkeletonLoader';

/**
 * Profile component allows users to view and edit their personal information.
 */
export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    country: '',
    language: 'en',
    timezone: '',
    is_active: true,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
        age: (user as any).age?.toString() || '',
        gender: (user as any).gender || '',
        country: (user as any).country || '',
        language: (user as any).language || 'en',
        timezone: (user as any).timezone || '',
        is_active: (user as any).is_active ?? true,
      });
    }
  }, [user]);

  if (loading || !user) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Profile Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              value={formData.firstname}
              disabled={!isEditing}
              className="w-full px-3 py-2 text-xs rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              value={formData.lastname}
              disabled={!isEditing}
              className="w-full px-3 py-2 text-xs rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 text-xs rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              disabled={!isEditing}
              className="w-full px-3 py-2 text-xs rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            className="px-4 py-1.5 text-xs font-medium rounded bg-primary text-white disabled:opacity-50"
            disabled={!isEditing}
            onClick={() => setIsEditing(false)}
          >Save</button>
          <button
            className="px-4 py-1.5 text-xs font-medium rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            onClick={() => setIsEditing(!isEditing)}
          >{isEditing ? 'Cancel' : 'Edit'}</button>
        </div>
      </div>
    </div>
  );
}
