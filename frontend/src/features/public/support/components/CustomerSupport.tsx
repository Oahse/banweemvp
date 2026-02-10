import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';

interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}

interface CustomerSupportProps {
  className?: string;
}

const CustomerSupport: React.FC<CustomerSupportProps> = ({ className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual API call to submit support ticket
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Support ticket submitted successfully!');
      setFormData({ subject: '', message: '', priority: 'medium' });
    } catch (error) {
      console.error('Failed to submit support ticket:', error);
      toast.error('Failed to submit support ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 ${className}`}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Heading level={5} className="text-2xl font-bold text-gray-900 mb-6">Customer Support</Heading>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Text className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </Text>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of your issue"
            />
          </div>

          <div>
            <Text className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </Text>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <Text className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </Text>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please provide detailed information about your issue..."
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="xs"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              isLoading={isSubmitting}
            >
              Submit Ticket
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Heading level={5} className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Get Help</Heading>
          <Body className="space-y-3 text-sm text-gray-600">
            <Body>
              <Text className="font-semibold">Email:</Text> support@banwee.com
            </Body>
            <Body>
              <Text className="font-semibold">Phone:</Text> 1-800-BANWEE-1 (1-800-226-9331)
            </Body>
            <Body>
              <Text className="font-semibold">Hours:</Text> Monday - Friday, 9 AM - 6 PM EST
            </Body>
          </Body>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;