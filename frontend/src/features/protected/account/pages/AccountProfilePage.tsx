import React, { useState, useEffect } from 'react';
import { UserIcon, MailIcon, PhoneIcon, MapPinIcon, CalendarIcon, GlobeIcon, SaveIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../AuthContext';
import { AuthAPI } from '../../api';
import { unwrapResponse, extractErrorMessage } from '../../utils/api-response';
import { SkeletonProfile } from '../ui/SkeletonProfile';

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
    // ...rest of the file (truncated for brevity)
}
