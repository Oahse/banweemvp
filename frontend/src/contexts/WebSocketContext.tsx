import React, { createContext, useEffect, useState } from 'react';
import {
  orderTrackingService,
  inventoryService,
  notificationService, // NEW: Import notificationService
  WebSocketStatus
} from '../lib/websocket';
import { useNotifications } from '../hooks/useNotifications';
import { useAuth } from './AuthContext'; // NEW: Import useAuth
import { Notification } from '../types'; // NEW: Import Notification type

export const WebSocketContext = createContext(undefined);

export const WebSocketProvider = ({
  children,
  autoConnect = true,
}) => {
  const [orderStatus, setOrderStatus] = useState(WebSocketStatus.DISCONNECTED);
  const [inventoryStatus, setInventoryStatus] = useState(WebSocketStatus.DISCONNECTED);
  const [notificationStatus, setNotificationStatus] = useState(WebSocketStatus.DISCONNECTED); // NEW: Notification WebSocket status
  const { info, warning, error, removeNotification: removeToast } = useNotifications(); // NEW: removeNotification from useNotifications
  const { user, isAuthenticated, token } = useAuth(); // NEW: Get user and token from AuthContext

  useEffect(() => {
    if (!autoConnect) return;

    // Set up status listeners
    const unsubscribeOrderStatus = orderTrackingService.onStatusChange((status) => {
      setOrderStatus(status);
      switch (status) {
        case WebSocketStatus.CONNECTED:
          info('Order tracking connected', 'Real-time order updates are now available');
          break;
        case WebSocketStatus.DISCONNECTED:
          warning('Order tracking disconnected', 'Real-time updates are temporarily unavailable');
          break;
        case WebSocketStatus.ERROR:
          error('Order tracking error', 'Failed to connect to order tracking service');
          break;
      }
    });

    const unsubscribeInventoryStatus = inventoryService.onStatusChange((status) => {
      setInventoryStatus(status);
      switch (status) {
        case WebSocketStatus.CONNECTED:
          info('Inventory tracking connected', 'Real-time inventory updates are now available');
          break;
        case WebSocketStatus.DISCONNECTED:
          warning('Inventory tracking disconnected', 'Real-time inventory updates are temporarily unavailable');
          break;
        case WebSocketStatus.ERROR:
          error('Inventory tracking error', 'Failed to connect to inventory service');
          break;
      }
    });

    // NEW: Notification service status listener
    let unsubscribeNotificationStatus: () => void;
    if (isAuthenticated && user?.id && token) {
      unsubscribeNotificationStatus = notificationService.onStatusChange((status) => {
        setNotificationStatus(status);
        switch (status) {
          case WebSocketStatus.CONNECTED:
            info('Notification service connected', 'Real-time notifications are now active');
            break;
          case WebSocketStatus.DISCONNECTED:
            warning('Notification service disconnected', 'Real-time notifications are temporarily unavailable');
            break;
          case WebSocketStatus.ERROR:
            error('Notification service error', 'Failed to connect to real-time notification service');
            break;
        }
      });
    }


    // Connect services with error handling
    try {
      orderTrackingService.connect(import.meta.env.VITE_ORDER_WS_URL);
    } catch (err) {
      console.warn('Failed to connect order tracking service:', err);
    }

    try {
      inventoryService.connect(import.meta.env.VITE_INVENTORY_WS_URL);
    } catch (err) {
      console.warn('Failed to connect inventory service:', err);
    }

    // NEW: Connect notification service if authenticated
    if (isAuthenticated && user?.id && token) {
      try {
        notificationService.connect(import.meta.env.VITE_NOTIFICATION_WS_URL, token, user.id);
      } catch (err) {
        console.warn('Failed to connect notification service:', err);
      }
    }


    // Cleanup on unmount
    return () => {
      unsubscribeOrderStatus();
      unsubscribeInventoryStatus();
      if (unsubscribeNotificationStatus) unsubscribeNotificationStatus(); // NEW: Cleanup notification service status listener

      orderTrackingService.disconnect();
      inventoryService.disconnect();
      notificationService.disconnect(); // NEW: Disconnect notification service
    };
  }, [autoConnect, info, warning, error, user?.id, isAuthenticated, token]); // NEW: Added user, isAuthenticated, token to dependencies

  // Set up global event handlers for notifications
  useEffect(() => {
    // Order update notifications
    const unsubscribeOrderUpdates = orderTrackingService.on('order_update', (data: any) => {
      const { orderId, status } = data;

      switch (status) {
        case 'shipped':
          info(
            'Order Shipped',
            `Your order #${orderId} has been shipped and is on its way!`
          );
          break;
        case 'delivered':
          info(
            'Order Delivered',
            `Your order #${orderId} has been delivered successfully!`
          );
          break;
        case 'cancelled':
          warning(
            'Order Cancelled',
            `Order #${orderId} has been cancelled.`
          );
          break;
        default:
          info(
            'Order Update',
            `Your order #${orderId} status has been updated to ${status}`
          );
          break;
      }
    });

    // Low stock alerts
    const unsubscribeLowStock = inventoryService.on('low_stock_alert', (data: any) => {
      const { productName, currentStock, threshold } = data;
      warning(
        'Low Stock Alert',
        `${productName} is running low (${currentStock} remaining, threshold: ${threshold})`
      );
    });

    // Inventory updates
    const unsubscribeInventoryUpdates = inventoryService.on('product_inventory_update', (data: any) => {
      const { productId, previousStock, currentStock } = data;

      if (currentStock === 0) {
        error(
          'Out of Stock',
          `Product #${productId} is now out of stock`
        );
      } else if (currentStock < previousStock) {
        info(
          'Stock Updated',
          `Product #${productId} stock updated: ${currentStock} remaining`
        );
      }
    });

    // NEW: Notification service event listeners
    let unsubscribeNewNotification: () => void;
    let unsubscribeNotificationUpdate: () => void;
    let unsubscribeNotificationDeleted: () => void;
    let unsubscribeAllNotificationsRead: () => void;

    if (isAuthenticated && user?.id) {
        unsubscribeNewNotification = notificationService.on('new_notification', (data: { notification: Notification }) => {
            const { notification } = data;
            info(notification.message, `New ${notification.type} notification`, notification.id);
        });

        unsubscribeNotificationUpdate = notificationService.on('notification_update', (data: { notification: Notification }) => {
            const { notification } = data;
            info(notification.message, `Notification updated: ${notification.type}`, notification.id);
        });

        unsubscribeNotificationDeleted = notificationService.on('notification_deleted', (data: { notification_id: string, user_id: string }) => {
            const { notification_id } = data;
            removeToast(notification_id); // Remove toast if it exists
            warning('Notification removed', 'A notification has been removed.', notification_id);
        });

        unsubscribeAllNotificationsRead = notificationService.on('all_notifications_read', (data: { user_id: string, notification_ids: string[] }) => {
            info('All notifications marked as read', 'Your notifications have been cleared.');
            data.notification_ids.forEach(id => removeToast(id)); // Remove all related toasts
        });
    }


    return () => {
      unsubscribeOrderUpdates();
      unsubscribeLowStock();
      unsubscribeInventoryUpdates();
      if (unsubscribeNewNotification) unsubscribeNewNotification(); // NEW: Cleanup notification event listeners
      if (unsubscribeNotificationUpdate) unsubscribeNotificationUpdate();
      if (unsubscribeNotificationDeleted) unsubscribeNotificationDeleted();
      if (unsubscribeAllNotificationsRead) unsubscribeAllNotificationsRead();
    };
  }, [info, warning, error, removeToast, user?.id, isAuthenticated]); // NEW: Added removeToast, user, isAuthenticated to dependencies

  const value = {
    orderStatus,
    inventoryStatus,
    notificationStatus, // NEW
    isOrderServiceConnected: orderStatus === WebSocketStatus.CONNECTED,
    isInventoryServiceConnected: inventoryStatus === WebSocketStatus.CONNECTED,
    isNotificationServiceConnected: notificationStatus === WebSocketStatus.CONNECTED, // NEW
    subscribeToOrder: orderTrackingService.subscribeToOrder.bind(orderTrackingService),
    subscribeToUserOrders: orderTrackingService.subscribeToUserOrders.bind(orderTrackingService),
    subscribeToProduct: inventoryService.subscribeToProduct.bind(inventoryService),
    subscribeToLowStockAlerts: inventoryService.subscribeToLowStockAlerts.bind(inventoryService),
    updateOrderStatus: orderTrackingService.updateOrderStatus.bind(orderTrackingService),
    // NEW: Notification service methods (if any needed directly from context)
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
