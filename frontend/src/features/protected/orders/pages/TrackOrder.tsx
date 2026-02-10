import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PackageIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
  PrinterIcon
} from 'lucide-react';
import { OrdersAPI } from '@/api/orders';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Text/Text';
import { containerVariants, itemVariants } from '@/data/variants';

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string | null;
  timestamp: string;
}

interface TrackingData {
  order_id: string;
  status: string;
  tracking_number: string | null;
  carrier_name: string | null;
  estimated_delivery: string | null;
  tracking_events: TrackingEvent[];
}
// Animation variants are imported from @/data/variants

const statusSteps = [
  { key: 'pending', label: 'Order Placed', icon: ClockIcon },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircleIcon },
  { key: 'shipped', label: 'Shipped', icon: TruckIcon },
  { key: 'delivered', label: 'Delivered', icon: PackageIcon },
];

export const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        setLoading(true);
        // Use public tracking endpoint (no authentication required)
        const response = await OrdersAPI.trackOrderPublic(orderId!);
        const trackingData = response;
        setTracking(trackingData);
      } catch (error) {
        toast.error(error as string || 'Order not found or tracking information unavailable');
        console.error('Error fetching tracking:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchTracking();
    }
  }, [orderId]);

  const getCurrentStepIndex = (status: string) => {
    // Normalize status to match our steps
    const normalizedStatus = status.toLowerCase();
    
    // Map various statuses to our timeline steps
    if (normalizedStatus === 'delivered') return 3;
    if (normalizedStatus === 'shipped' || normalizedStatus === 'out_for_delivery' || normalizedStatus === 'in_transit') return 2;
    if (normalizedStatus === 'confirmed' || normalizedStatus === 'processing') return 1;
    if (normalizedStatus === 'pending') return 0;
    
    // Default to pending for unknown statuses
    return 0;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 dark:text-green-400';
      case 'shipped':
      case 'out_for_delivery':
        return 'text-blue-600 dark:text-blue-400';
      case 'confirmed':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'pending':
        return 'text-gray-600 dark:text-gray-400';
      case 'cancelled':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <PackageIcon size={48} className="mx-auto text-gray-400 mb-3" />
          <Heading level={2} weight="semibold">Order Not Found</Heading>
          <Text variant="caption" tone="secondary">
            We couldn't find tracking information for this order.
          </Text>
          <Text variant="caption" tone="secondary">
            Please check your order number and try again.
          </Text>
          <Link 
            to="/account/track-order" 
            className="inline-block px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-xs"
          >
            <Text variant="caption">Search Another Order</Text>
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex(tracking.status);

  const handleDownloadInvoice = async () => {
    try {
      await OrdersAPI.getOrderInvoice(orderId);
      toast.success('Invoice downloaded successfully');
    } catch (error) {
      toast.error('Failed to download invoice');
      console.error('Error downloading invoice:', error);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-4"
        >
          <ArrowLeftIcon size={14} className="mr-1" />
          Back
        </Button>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <Heading level={1} weight="bold">Track Your Order</Heading>
              <Text variant="caption" tone="secondary">
                Order ID: {tracking.order_id}
              </Text>
            </div>
            <Button
              onClick={handleDownloadInvoice}
              size="sm"
              className="flex items-center gap-1.5 px-2 py-1.5 text-xs"
            >
              <PrinterIcon size={14} />
              <Text variant="caption">Download Invoice</Text>
            </Button>
          </div>

          {tracking.tracking_number && (
            <div className="flex items-center gap-1.5 mb-3">
              <Text variant="caption" tone="secondary">Tracking Number:</Text>
              <Text variant="caption" weight="medium">
                {tracking.tracking_number}
              </Text>
              {tracking.carrier_name && (
                <Text variant="caption" tone="secondary">
                  ({tracking.carrier_name})
                </Text>
              )}
            </div>
          )}

          {tracking.estimated_delivery && (
            <div className="flex items-center gap-1.5 mb-4">
              <ClockIcon size={12} className="text-gray-400" />
              <Text variant="caption" tone="secondary">
                Estimated Delivery: {new Date(tracking.estimated_delivery).toLocaleDateString()}
              </Text>
            </div>
          )}

          {/* Status Timeline */}
          <div className="relative mb-6">
            <div className="flex justify-between items-center">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.key} className="flex flex-col items-center flex-1 relative">
                    {/* Connector Line */}
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`absolute top-5 left-1/2 w-full h-0.5 ${
                          isCompleted ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        style={{ zIndex: 0 }}
                      />
                    )}

                    {/* Icon Circle */}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
                        isCompleted
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-primary ring-opacity-30' : ''}`}
                    >
                      <Icon size={18} />
                    </div>

                    {/* Label */}
                    <span
                      className={`text-xs text-center ${
                        isCompleted
                          ? 'text-gray-900 dark:text-white font-medium'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
            <Heading level={2} weight="semibold">Current Status</Heading>
            <Text variant="caption" weight="bold" className={getStatusColor(tracking.status)}>
              {tracking.status.charAt(0).toUpperCase() + tracking.status.slice(1).replace(/_/g, ' ')}
            </Text>
            {tracking.status === 'cancelled' && (
              <Text variant="caption" tone="secondary">
                This order has been cancelled
              </Text>
            )}
          </div>
        </div>

        {/* Tracking Events Timeline */}
        {tracking.tracking_events && tracking.tracking_events.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <Heading level={2} weight="semibold">Tracking History</Heading>
            <div className="space-y-3">
              {tracking.tracking_events
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((event, index) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      {index < tracking.tracking_events.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600 mt-1.5"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-0.5">
                        <Text variant="caption" weight="medium">
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1).replace('_', ' ')}
                        </Text>
                        <Text variant="caption" tone="secondary">
                          {new Date(event.timestamp).toLocaleString()}
                        </Text>
                      </div>
                      <Text variant="caption" tone="secondary">
                        {event.description}
                      </Text>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPinIcon size={12} />
                          <Text variant="caption" tone="secondary">{event.location}</Text>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TrackOrder;
