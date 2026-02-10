import React, { useState } from 'react';
import { format } from 'date-fns';
import TrackingTimeline from './TrackingTimeline';
import TrackingMap from './TrackingMap';
import OrderNotes from './OrderNotes';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';




const OrderDetails = ({
  order,
  editable = false,
  showTracking = true,
  onAddNote,
  onStatusUpdate
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    if (!onStatusUpdate) return;
    
    setIsUpdatingStatus(true);
    try {
      await onStatusUpdate(order.id, newStatus);
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const currentLocation = order.tracking_events.length > 0 && order.tracking_events[0].coordinates
    ? order.tracking_events[0].coordinates
    : undefined;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <Heading level={2} weight="semibold">Order #{order.id.slice(-8)}</Heading>
            <Text variant="body-sm" tone="secondary">
              Placed on {format(new Date(order.created_at), 'MMM dd, yyyy')}
            </Text>
          </div>
          <div className="flex items-center space-x-3">
            <Text variant="body-sm" className={`px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </Text>
            {order.tracking_number && (
              <Text variant="body-sm" tone="secondary">
                Tracking: {order.tracking_number}
              </Text>
            )}
          </div>
        </div>

        {/* Status update for suppliers/admins */}
        {editable && (
          <div className="mt-4 flex items-center space-x-3">
            <Text variant="body-sm" weight="medium">Update Status:</Text>
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              disabled={isUpdatingStatus}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select>
            {isUpdatingStatus && (
              <Text variant="body-sm" tone="secondary">Updating...</Text>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <Button
            onClick={() => setActiveTab('details')}
            variant={activeTab === 'details' ? 'primary' : 'ghost'}
            size="sm"
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'details'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Order Details
          </Button>
          {showTracking && (
            <Button
              onClick={() => setActiveTab('tracking')}
              variant={activeTab === 'tracking' ? 'primary' : 'ghost'}
              size="sm"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tracking'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tracking ({order.tracking_events.length})
            </Button>
          )}
          <Button
            onClick={() => setActiveTab('notes')}
            variant={activeTab === 'notes' ? 'primary' : 'ghost'}
            size="sm"
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'notes'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notes ({order.notes?.length || 0})
          </Button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <Heading level={3} weight="medium">Order Summary</Heading>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <Text variant="body-sm" tone="secondary">Subtotal</Text>
                  <Text variant="body-sm" weight="medium">{order.currency}{order.total_amount}</Text>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <Text variant="body" weight="medium">Total</Text>
                  <Text variant="body" weight="medium">{order.currency}{order.total_amount}</Text>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <Heading level={3} weight="medium">Items ({order.items.length})</Heading>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <Text variant="body-sm" weight="medium">Product ID: {item.product_id}</Text>
                      <Text variant="caption" tone="secondary">Quantity: {item.quantity}</Text>
                      <Text variant="caption" tone="secondary">Price per unit: {order.currency}{item.price_per_unit}</Text>
                    </div>
                    <div className="text-right">
                      <Text variant="body-sm" weight="medium">{order.currency}{item.total_price}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && showTracking && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrackingTimeline
                trackingEvents={order.tracking_events}
                currentStatus={order.status}
                estimatedDelivery={order.estimated_delivery ? new Date(order.estimated_delivery) : undefined}
              />
              <TrackingMap
                currentLocation={currentLocation}
                deliveryAddress={order.shipping_address}
                carrier={order.tracking_events[0]?.carrier}
              />
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <OrderNotes
            orderId={order.id}
            notes={order.notes}
            onAddNote={onAddNote}
            editable={editable}
          />
        )}
      </div>
    </div>
  );
};

export default OrderDetails;