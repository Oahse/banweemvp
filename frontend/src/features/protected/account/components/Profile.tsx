import React, { useState, useEffect } from 'react';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, CalendarIcon, GlobeIcon, SaveIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../AuthContext';
import { AuthAPI } from '@/api';
import { unwrapResponse, extractErrorMessage } from '@/utils/utils/api-response';
import { SkeletonProfile } from '../ui/SkeletonProfile';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label, Caption } from '@/components/ui/Text/Text';
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
  // Initialize form data with user information
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
  /**
   * Handles changes to form input fields.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  /**
   * Handles form submission to update user profile.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert data to match backend schema
      const submissionData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone || undefined,
        age: formData.age || undefined,  // Keep as string since DB expects VARCHAR
        gender: formData.gender || undefined,
        country: formData.country || undefined,
        language: formData.language || undefined,
        timezone: formData.timezone || undefined,
        is_active: formData.is_active,
      };

      const result = await AuthAPI.updateProfile(submissionData);
      
      // Handle wrapped response
      const data = unwrapResponse(result);
      
      if (data) {
        // Update user in context - this should trigger the useEffect to refresh form data
        updateUser(data);
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error: any) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || 'Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancels editing and resets form data.
   */
  const handleCancel = () => {
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
    setIsEditing(false);
  };

  if (!user) {
    return <SkeletonProfile />;
  }

  return (
    <div className="space-y-3">
      
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
              {user.firstname?.charAt(0) || user.full_name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3">
              <Heading level={2} className="text-base font-medium text-main dark:text-white">
                {user.full_name || `${user.firstname} ${user.lastname}`}
              </Heading>
              <Body className="text-xs text-gray-600 dark:text-gray-300">{user.email}</Body>
              <div className="flex items-center mt-1">
                <Text variant="caption" className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${
                  user.verified 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                }`}>
                  {user.verified ? '✓ Verified' : '⚠ Unverified'}
                </Text>
                <Text variant="caption" className="ml-2 capitalize">
                  {user.role}
                </Text>
              </div>
            </div>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="primary"
              size="sm"
              className="px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors text-sm"
            >
              <Text variant="body-sm">Edit Profile</Text>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3">
        <Heading level={3} className="text-base font-medium text-main dark:text-white mb-3">
          Personal Information
        </Heading>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* First Name */}
              <div>
                <Label>First Name *</Label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <Label>Last Name *</Label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label>Email *</Label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <Label>Phone</Label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Age */}
              <div>
                <Label>Age</Label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                  min="13"
                  max="120"
                />
              </div>

              {/* Gender */}
              <div>
                <Label>Gender</Label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <Label>Country</Label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                  placeholder="United States"
                />
              </div>

              {/* Language */}
              <div>
                <Label>Language</Label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                </select>
              </div>

              {/* Timezone */}
              <div>
                <Label>Timezone</Label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:text-white text-xs"
                >
                  <option value="">Select Timezone</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                  <option value="Asia/Shanghai">Shanghai</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                size="sm"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-md flex items-center text-sm"
                disabled={loading}
                isLoading={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon size={14} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Display Mode - Only Show Relevant Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="flex items-start">
                <UserIcon size={16} className="text-gray-400 mr-3 mt-1" />
                <div>
                  <Caption className="text-xs text-gray-500 dark:text-gray-400">Full Name</Caption>
                  <Body className="text-sm text-gray-900 dark:text-white font-medium">{user.firstname} {user.lastname}</Body>
                </div>
              </div>

              <div className="flex items-start">
                <MailIcon size={16} className="text-gray-400 mr-3 mt-1" />
                <div>
                  <Caption className="text-xs text-gray-500 dark:text-gray-400">Email</Caption>
                  <Body className="text-sm text-gray-900 dark:text-white font-medium">{user.email}</Body>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-start">
                  <PhoneIcon size={16} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <Caption className="text-xs text-gray-500 dark:text-gray-400">Phone</Caption>
                    <Body className="text-sm text-gray-900 dark:text-white font-medium">{user.phone}</Body>
                  </div>
                </div>
              )}

              {/* Personal Details */}
              {(user as any).age && (
                <div className="flex items-start">
                  <CalendarIcon size={16} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <Caption className="text-xs text-gray-500 dark:text-gray-400">Age</Caption>
                    <Body className="text-sm text-gray-900 dark:text-white font-medium">{(user as any).age} years</Body>
                  </div>
                </div>
              )}

              {(user as any).gender && (
                <div className="flex items-start">
                  <UserIcon size={16} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <Caption className="text-xs text-gray-500 dark:text-gray-400">Gender</Caption>
                    <Body className="text-sm text-gray-900 dark:text-white font-medium capitalize">{(user as any).gender}</Body>
                  </div>
                </div>
              )}

              {/* Location & Preferences */}
              {(user as any).country && (
                <div className="flex items-start">
                  <MapPinIcon size={16} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <Caption className="text-xs text-gray-500 dark:text-gray-400">Country</Caption>
                    <Body className="text-sm text-gray-900 dark:text-white font-medium">{(user as any).country}</Body>
                  </div>
                </div>
              )}

              {(user as any).language && (
                <div className="flex items-start">
                  <GlobeIcon size={16} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <Caption className="text-xs text-gray-500 dark:text-gray-400">Language</Caption>
                    <Body className="text-sm text-gray-900 dark:text-white font-medium capitalize">{(user as any).language}</Body>
                  </div>
                </div>
              )}

              {(user as any).timezone && (
                <div className="flex items-start">
                  <GlobeIcon size={16} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <Caption className="text-xs text-gray-500 dark:text-gray-400">Timezone</Caption>
                    <Body className="text-sm text-gray-900 dark:text-white font-medium">{(user as any).timezone}</Body>
                  </div>
                </div>
              )}

              {/* Account Status - Important Info */}
              <div className="flex items-start">
                <UserIcon size={16} className="text-gray-400 mr-3 mt-1" />
                <div>
                  <Caption className="text-xs text-gray-500 dark:text-gray-400">Account Status</Caption>
                  <Body className="text-sm text-gray-900 dark:text-white font-medium capitalize">{(user as any).account_status || (user.is_active ? 'Active' : 'Inactive')}</Body>
                </div>
              </div>

              <div className="flex items-start">
                <MailIcon size={16} className="text-gray-400 mr-3 mt-1" />
                <div>
                  <Caption className="text-xs text-gray-500 dark:text-gray-400">Email Verification</Caption>
                  <Body className="text-sm text-gray-900 dark:text-white font-medium capitalize">{(user as any).verification_status || (user.verified ? 'Verified' : 'Not Verified')}</Body>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <Heading level={3} className="text-base font-medium text-gray-900 dark:text-white mb-3">Account Details</Heading>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
            <Caption className="text-sm text-gray-500 dark:text-gray-400">Member Since</Caption>
            <Body className="text-sm text-gray-900 dark:text-white font-medium">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</Body>
          </div>
          <div className="flex justify-between items-center py-2">
            <Caption className="text-sm text-gray-500 dark:text-gray-400">Last Updated</Caption>
            <Body className="text-sm text-gray-900 dark:text-white font-medium">{user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}</Body>
          </div>
          {(user as any).last_login && (
            <div className="flex justify-between items-center py-2">
              <Caption className="text-sm text-gray-500 dark:text-gray-400">Last Login</Caption>
              <Body className="text-sm text-gray-900 dark:text-white font-medium">{new Date((user as any).last_login).toLocaleDateString()}</Body>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
