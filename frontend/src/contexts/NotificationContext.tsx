import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  notificationService,
  browserNotificationService 
} from '../lib/notifications';
import { NotificationAPI } from '../apis/notification';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';


export const NotificationContext = createContext(undefined);



export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState(
    notificationService.getPreferences()
  );
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch notifications from backend
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await NotificationAPI.getUserNotifications({ limit: 50 });
      setNotifications(response.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      // Don't show error toast for auth failures to avoid spam
      if (error.response?.status !== 401) {
        toast.error('Failed to load notifications');
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Fetch notifications when user is logged in
    if (user) {
      fetchNotifications();
      
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    } else {
      // Fall back to local notifications when not logged in
      const unsubscribe = notificationService.subscribe((newNotifications) => {
        setNotifications(newNotifications);
      });
      setNotifications(notificationService.getAll());
      return unsubscribe;
    }
  }, [user, fetchNotifications]); // Added fetchNotifications to dependencies

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((notification) => {
    const id = notificationService.add(notification);
    
    // Show browser notification if enabled and permission granted
    if (preferences.globalEnabled && !notificationService.isQuietHours()) {
      browserNotificationService.show(notification.title, {
        body: notification.message,
        tag: notification.category,
      });
    }
    
    return id;
  }, [preferences.globalEnabled]); // Added preferences.globalEnabled to dependencies

  const removeNotification = useCallback((id) => {
    notificationService.remove(id);
  }, []);

  const markAsRead = useCallback(async (id) => {
    if (!user) {
      // Local notification
      notificationService.markAsRead(id);
      return;
    }

    try {
      await NotificationAPI.markNotificationAsRead(id);
      // Update state after successful API call
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  }, [user]);

  const markAllAsRead = useCallback(async () => {
    if (!user) {
      // Local notifications
      notificationService.markAllAsRead();
      return;
    }

    try {
      await NotificationAPI.markAllNotificationsAsRead();
      // Update state after successful API call
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('Failed to mark all as read');
    }
  }, [user]);

  const clearAll = useCallback(() => {
    notificationService.clear();
  }, []);

  const updatePreferences = useCallback((newPreferences) => {
    notificationService.updatePreferences(newPreferences);
    setPreferences(notificationService.getPreferences());
  }, []);

  const requestBrowserPermission = useCallback(async () => {
    return await browserNotificationService.requestPermission();
  }, []);

  // Convenience methods
  const success = useCallback((title, message) => {
    return addNotification({ type: 'success', title, message });
  }, [addNotification]);

  const error = useCallback((title, message) => {
    return addNotification({ type: 'error', title, message, persistent: true });
  }, [addNotification]);

  const warning = useCallback((title, message) => {
    return addNotification({ type: 'warning', title, message });
  }, [addNotification]);

  const info = useCallback((title, message) => {
    return addNotification({ type: 'info', title, message });
  }, [addNotification]);

  const value = {
    notifications,
    unreadCount,
    preferences,
    loading,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    updatePreferences,
    requestBrowserPermission,
    fetchNotifications,
    success,
    error,
    warning,
    info,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications error: must be used within a NotificationProvider');
  }
  return context;
};