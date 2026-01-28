import React from 'react';
import { SubscriptionList } from '../components/subscription/SubscriptionList';

const Subscriptions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <SubscriptionList />
      </div>
    </div>
  );
};

export default Subscriptions;