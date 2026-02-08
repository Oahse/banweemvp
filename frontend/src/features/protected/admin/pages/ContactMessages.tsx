/**
 * Admin Contact Messages Page
 * View and manage customer contact form submissions
 */

import React, { useState, useEffect } from 'react';
import { ContactMessagesAPI, ContactMessage } from '../../../../api/contact-messages';
import { Mail, Clock, CheckCircle, AlertCircle, Search, Filter, Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ContactMessagesSkeleton from '../components/skeletons/ContactMessagesSkeleton';

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, in_progress: 0, resolved: 0 });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [page, statusFilter, priorityFilter, searchTerm]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await ContactMessagesAPI.getAll({
        page,
        page_size: 20,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        search: searchTerm || undefined,
      });
      setMessages(response.messages);
      setTotalPages(response.total_pages);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await ContactMessagesAPI.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    try {
      await ContactMessagesAPI.update(messageId, { status: newStatus as any });
      toast.success('Status updated successfully');
      fetchMessages();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handlePriorityChange = async (messageId: string, newPriority: string) => {
    try {
      await ContactMessagesAPI.update(messageId, { priority: newPriority as any });
      toast.success('Priority updated successfully');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update priority');
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      await ContactMessagesAPI.delete(messageId);
      toast.success('Message deleted successfully');
      fetchMessages();
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && messages.length === 0) {
    return <ContactMessagesSkeleton />;
  }

  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Contact Messages</h1>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Manage customer inquiries and support requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Messages</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">New</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{stats.new}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{stats.in_progress}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Resolved</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={() => {
              setStatusFilter('');
              setPriorityFilter('');
              setSearchTerm('');
            }}
            className="px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {messages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-4 py-3 text-xs text-gray-900 dark:text-white">{message.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{message.email}</td>
                  <td className="px-4 py-3 text-xs text-gray-900 dark:text-white">{message.subject}</td>
                  <td className="px-4 py-3">
                    <select
                      value={message.status}
                      onChange={(e) => handleStatusChange(message.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={message.priority}
                      onChange={(e) => handlePriorityChange(message.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(message.priority)}`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                    {new Date(message.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewMessage(message)}
                        className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
                        className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* View Message Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Message Details</h2>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Name</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedMessage.email}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Subject</label>
                <p className="text-sm text-gray-900 dark:text-white">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Message</label>
                <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Status</label>
                  <p className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Priority</label>
                  <p className={`inline-block px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedMessage.priority)}`}>
                    {selectedMessage.priority}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Created At</label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
