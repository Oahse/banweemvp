// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, PackageIcon } from 'lucide-react';
import { Input } from '../forms/Input';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleTrackOrder = (e) => {
    e.preventDefault();
    
    if (orderNumber.trim()) {
      // Navigate to orders page with the order number
      navigate(`/account/orders?search=${orderNumber}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-surface rounded-lg shadow-sm border border-border-light p-6 md:p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <PackageIcon size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-main mb-2">Track Your Order</h1>
          <p className="text-copy-light">
            Enter your order number and email to track your order status
          </p>
        </div>

        <form onSubmit={handleTrackOrder} className="space-y-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-copy mb-2">
              Order Number
            </label>
            <Input
              id="orderNumber"
              type="text"
              placeholder="e.g., ORD-123456"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
            />
            <p className="text-xs text-copy-light mt-1">
              You can find this in your order confirmation email
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-copy mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <SearchIcon size={20} />
            Track Order
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-light">
          <p className="text-sm text-copy-light text-center">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/account/orders')}
              className="text-primary hover:underline font-medium"
            >
              View all your orders
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 bg-surface rounded-lg shadow-sm border border-border-light p-6">
        <h2 className="text-lg font-semibold text-main mb-4">Need Help?</h2>
        <div className="space-y-3 text-sm text-copy-light">
          <p>• Order tracking is available 24-48 hours after your order is placed</p>
          <p>• If you can&apos;t find your order number, check your email confirmation</p>
          <p>• For urgent inquiries, contact our support team</p>
        </div>
        <button
          onClick={() => navigate('/contact')}
          className="mt-4 text-primary hover:underline text-sm font-medium"
        >
          Contact Support →
        </button>
      </div>
    </div>
  );
};

export default TrackOrder;
