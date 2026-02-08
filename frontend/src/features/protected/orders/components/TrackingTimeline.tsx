
import { format } from 'date-fns';





type TrackingEvent = {
  id: string;
  status: string;
  timestamp: string | number | Date;
  location?: string;
  carrier?: string;
  description?: string;
};

interface TrackingTimelineProps {
  trackingEvents: TrackingEvent[];
  currentStatus: string;
  estimatedDelivery?: Date | null;
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  trackingEvents,
  currentStatus,
  estimatedDelivery,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '📋';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '🚚';
      case 'out for delivery':
        return '🚛';
      case 'delivered':
        return '✅';
      case 'cancelled':
        return '❌';
      case 'returned':
        return '↩️';
      default:
        return '📦';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-primary bg-primary-light dark:bg-primary-dark dark:text-primary-light';
      case 'out for delivery':
        return 'text-orange-600 bg-orange-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'returned':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Order Tracking</h3>
        {estimatedDelivery && (
          <div className="text-sm text-gray-600">
            Estimated delivery: {format(estimatedDelivery, 'MMM dd, yyyy')}
          </div>
        )}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Timeline events */}
        <div className="space-y-8">
          {trackingEvents.map((event: TrackingEvent) => (
            <div key={event.id} className="relative flex items-start">
              {/* Timeline dot */}
              <div className={`
                flex items-center justify-center w-14 h-14 rounded-full text-xl
                ${getStatusColor(event.status)}
                ${event.status.toLowerCase() === currentStatus.toLowerCase() ? 'ring-2 ring-blue-500' : ''}
              `}>
                {getStatusIcon(event.status)}
              </div>

              {/* Event content */}
              <div className="ml-6 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-gray-900 capitalize">
                    {event.status.replace('_', ' ')}
                  </h4>
                  <time className="text-sm text-gray-500">
                    {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                  </time>
                </div>

                {event.location && (
                  <p className="text-sm text-gray-600 mt-2">
                    📍 {event.location}
                  </p>
                )}

                {event.carrier && (
                  <p className="text-sm text-gray-600 mt-2">
                    🚚 {event.carrier}
                  </p>
                )}

                {event.description && (
                  <p className="text-sm text-gray-700 mt-3">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {trackingEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📦</div>
          <p>No tracking information available yet</p>
        </div>
      )}
    </div>
  );
};

export default TrackingTimeline;