import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, PackageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Label, Caption } from '@/components/ui/Text/Text';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderNumber.trim()) {
      // Navigate to track order page with the order ID
      navigate(`/track-order/${orderNumber}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <PackageIcon size={32} className="text-primary" />
          </div>
          <Heading level={1} className="text-base font-bold text-gray-900 dark:text-white mb-2">Track Your Order</Heading>
          <Body className="text-xs text-gray-600 dark:text-gray-400">Enter your order number to view tracking details and order status</Body>
        </div>

        <form onSubmit={handleTrackOrder} className="space-y-6">
          <div>
            <Label htmlFor="orderNumber" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Order Number</Label>
            <input
              id="orderNumber"
              type="text"
              placeholder="Enter your order ID (e.g., 550e8400-e29b-41d4-a716-446655440000)"
              value={orderNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderNumber(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs"
            />
            <Caption className="text-xs text-gray-500 dark:text-gray-400 mt-1">You can find your order number in your order confirmation email</Caption>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            fullWidth={true}
            leftIcon={<SearchIcon size={16} />}
          >
            Track Order
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TrackOrder;
