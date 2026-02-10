import React, { useState, useEffect } from 'react';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, CalendarIcon, GlobeIcon, SaveIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/features/protected/auth/contexts/AuthContext';
import { AuthAPI } from '@/api';
import { unwrapResponse, extractErrorMessage } from '@/utils/api-response';
import { SkeletonProfile } from '@/ui/SkeletonProfile';
import { AdminDashboardSkeleton } from '@/components/ui/SkeletonLoader';
import { DateTimeDropdown } from '@/components/ui/DateTimeDropdown';
import { Button } from '@/components/ui/Button';
import { Text, Label } from '@/components/ui/Text/Text';

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Dropdown state and language options
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ar', label: 'Arabic' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstname) newErrors.firstname = 'First name is required.';
    if (!formData.lastname) newErrors.lastname = 'Last name is required.';
    if (!formData.phone) newErrors.phone = 'Phone is required.';
    if (!formData.country) newErrors.country = 'Country is required.';
    if (!formData.age) newErrors.age = 'Date of birth is required.';
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fill all required fields.');
      return;
    }
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 800));
      updateUser({ ...user, ...formData });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><UserIcon size={16}/> First Name</Label>
            <input
              name="firstname"
              type="text"
              value={formData.firstname}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
            {errors.firstname && <Text variant="caption" className="text-sm text-red-500">{errors.firstname}</Text>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><UserIcon size={16}/> Last Name</Label>
            <input
              name="lastname"
              type="text"
              value={formData.lastname}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
            {errors.lastname && <Text variant="caption" className="text-sm text-red-500">{errors.lastname}</Text>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><MailIcon size={16}/> Email</Label>
            <input
              name="email"
              type="email"
              value={formData.email}
              disabled
              className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><PhoneIcon size={16}/> Phone</Label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              disabled={!isEditing}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
            {errors.phone && <Text variant="caption" className="text-sm text-red-500">{errors.phone}</Text>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><CalendarIcon size={16}/> Date of Birth</Label>
            <DateTimeDropdown
              value={formData.age}
              onChange={date => setFormData(prev => ({ ...prev, age: date }))}
              placeholder="Select date"
              className="w-full"
              disabled={!isEditing}
            />
            {errors.age && <Text variant="caption" className="text-sm text-red-500">{errors.age}</Text>}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><UserIcon size={16}/> Gender</Label>
            <div className="relative">
              <Button
                type="button"
                disabled={!isEditing}
                variant="outline"
                size="xs"
                className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-left focus:ring-primary focus:border-primary"
                onClick={() => {
                  if (!isEditing) return;
                  setShowGenderDropdown((prev) => !prev);
                }}
              >
                {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Select'}
              </Button>
              {isEditing && showGenderDropdown && (
                <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded shadow">
                  {['male', 'female', 'other'].map(option => (
                    <li
                      key={option}
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, gender: option }));
                        setShowGenderDropdown(false);
                      }}
                    >{option.charAt(0).toUpperCase() + option.slice(1)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><GlobeIcon size={16}/> Language</Label>
            <div className="relative">
              <Button
                type="button"
                disabled={!isEditing}
                variant="outline"
                size="xs"
                className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-left focus:ring-primary focus:border-primary"
                onClick={() => {
                  if (!isEditing) return;
                  setShowLanguageDropdown((prev) => !prev);
                }}
              >
                {languageOptions.find(opt => opt.value === formData.language)?.label || 'Select'}
              </Button>
              {isEditing && showLanguageDropdown && (
                <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded shadow">
                  {languageOptions.map(option => (
                    <li
                      key={option.value}
                      className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, language: option.value }));
                        setShowLanguageDropdown(false);
                      }}
                    >{option.label}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><SaveIcon size={16}/> Account Status</Label>
            <input
              name="is_active"
              type="text"
              value={formData.is_active ? 'Active' : 'Inactive'}
              disabled
              className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            variant="primary"
            size="xs"
            disabled={!isEditing || loading}
            onClick={handleSave}
            leftIcon={<SaveIcon size={16} />}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            size="xs"
            onClick={() => setIsEditing(!isEditing)}
            disabled={loading}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>
    </div>
  );
}
