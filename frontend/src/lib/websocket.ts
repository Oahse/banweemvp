export const WebSocketStatus = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
};

class WebSocketService {
  ws: WebSocket | null = null;
  url: string | null = null;
  statusCallback: ((status: string) => void) | null = null;
  eventListeners = new Map<string, Set<Function>>(); // Generic event listeners

  onStatusChange(callback: (status: string) => void) {
    this.statusCallback = callback;
    return () => {
      this.statusCallback = null;
    };
  }

  on(eventType: string, handler: Function) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)?.add(handler);

    return () => {
      this.eventListeners.get(eventType)?.delete(handler);
      if (this.eventListeners.get(eventType)?.size === 0) {
        this.eventListeners.delete(eventType);
      }
    };
  }

  connect(url: string, token: string | null = null, userId: string | null = null) {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      console.warn('WebSocket already connected or connecting.');
      return;
    }

    this.url = url; // Store URL for reconnect attempts if needed

    let fullUrl = url;
    if (token) {
        // Append token to URL for authentication if userId is present for user-specific endpoint
        if (userId) {
            fullUrl = `${url}/${userId}?token=${token}`;
        } else {
            fullUrl = `${url}?token=${token}`;
        }
    }
    this.ws = new WebSocket(fullUrl);

    this.ws.onopen = () => {
      this.statusCallback?.(WebSocketStatus.CONNECTED);
      // Automatically subscribe to common events upon connection if applicable
      if (userId && token) {
        this.sendMessage(JSON.stringify({ type: 'subscribe', events: ['notifications', 'user_status', 'order_updates', 'cart_updates'] }));
      }
    };

    this.ws.onclose = () => {
      this.statusCallback?.(WebSocketStatus.DISCONNECTED);
    };

    this.ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      this.statusCallback?.(WebSocketStatus.ERROR);
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type) {
          this.eventListeners.get(data.type)?.forEach(handler => handler(data));
          // Also trigger a generic 'message' event for all messages
          this.eventListeners.get('message')?.forEach(handler => handler(data));
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error, event.data);
      }
    };
  }

  disconnect() {
    this.ws?.close();
    this.eventListeners.clear(); // Clear all listeners on disconnect
    this.ws = null;
    this.statusCallback?.(WebSocketStatus.DISCONNECTED); // Explicitly set status to disconnected
  }

  sendMessage(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.warn('WebSocket not open. Message not sent:', message);
    }
  }

  // --- Specific subscription methods (can be refactored to generic subscribe/unsubscribe if desired) ---
  subscribeToOrder(orderId: string, handler: Function) {
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'order_updates', orderId }));
    return this.on('order_update', (data: any) => {
      if (data.orderId === orderId) {
        handler(data);
      }
    });
  }

  subscribeToProduct(productId: string, handler: Function) {
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'product_inventory_updates', productId }));
    return this.on('product_inventory_update', (data: any) => {
      if (data.productId === productId) {
        handler(data);
      }
    });
  }

  subscribeToLowStockAlerts(handler: Function) {
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'low_stock_alerts' }));
    return this.on('low_stock_alert', handler);
  }

  updateOrderStatus(orderId: string, status: string, notes: string) {
    this.sendMessage(JSON.stringify({
      action: 'update_order_status',
      orderId,
      status,
      notes,
    }));
  }
  
  subscribeToUserOrders(userId: string, handler: Function) {
    this.sendMessage(JSON.stringify({ action: 'subscribe', topic: 'user_orders', userId }));
    return this.on('order_update', (data: any) => {
      if (data.userId === userId) {
        handler(data);
      }
    });
  }
}

export const orderTrackingService = new WebSocketService();
export const inventoryService = new WebSocketService();
export const notificationService = new WebSocketService(); // New instance for notifications