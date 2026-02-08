/**
 * Admin Contact Messages Page
 * View and manage customer contact form submissions
 */

import React, { useState, useEffect } from 'react';
import { ContactMessagesAPI, ContactMessage } from '../../../../api/contact-messages';
import { Mail, Clock, CheckCircle, AlertCircle, Search, Eye, Trash2, Filter, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ContactMessagesSkeleton from '../components/skeletons/ContactMessagesSkeleton';
import { useTheme } from '../../../../components/shared/contexts/ThemeContext';
import Dropdown from '../../../../components/ui/Dropdown';
import AdminLayout from '../components/AdminLayout';

const ContactMessages: React.FC = () => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, new: 0, in_progress: 0, resolved: 0 });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const PAGE_SIZE = 20;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchMessages();
    fetchStats();
  }, [page, statusFilter, priorityFilter, debouncedSearchTerm]);

  const fetchMessages = async () => {
    try {
      if (page === 1 && !searchTerm && !statusFilter && !priorityFilter) {
        setInitialLoading(true);
      } else {
        setLoading(true);
      }
      const response = await ContactMessagesAPI.getAll({
        page,
        page_size: PAGE_SIZE,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        search: debouncedSearchTerm || undefined,
      });
      setMessages(response.messages);
      setTotalPages(response.total_pages);
      setTotal(response.total);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
      setInitialLoading(false);
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

  const statusBadge = (status: string) => (
    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
      {status.replace('_', ' ')}
    </span>
  );

  const priorityBadge = (priority: string) => (
    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(priority)}`}>
      {priority}
    </span>
  );

  if (initialLoading) {
    return <ContactMessagesSkeleton />;
  }

  return (
    <AdminLayout>
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-main mb-2">Contact Messages</h1>
        <p className="text-sm text-copy-light">
          Manage customer inquiries and support requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-lg shadow-sm border p-4 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-copy-light">Total Messages</p>
              <p className="text-2xl font-bold text-main">{stats.total}</p>
            </div>
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className={`rounded-lg shadow-sm border p-4 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-copy-light">New</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.new}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className={`rounded-lg shadow-sm border p-4 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-copy-light">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.in_progress}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        <div className={`rounded-lg shadow-sm border p-4 ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-copy-light">Resolved</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.resolved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-main">Search & Filters</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
              currentTheme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Filter size={16} />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {showFilters && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              {searchTerm !== debouncedSearchTerm && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-2">
              <Dropdown
                options={[
                  { value: '', label: 'All Statuses' },
                  { value: 'new', label: 'New' },
                  { value: 'in_progress', label: 'In Progress' },
                  { value: 'resolved', label: 'Resolved' },
                  { value: 'closed', label: 'Closed' }
                ]}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="All Statuses"
                className="min-w-[140px]"
              />
              <Dropdown
                options={[
                  { value: '', label: 'All Priorities' },
                  { value: 'urgent', label: 'Urgent' },
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' }
                ]}
                value={priorityFilter}
                onChange={setPriorityFilter}
                placeholder="All Priorities"
                className="min-w-[140px]"
              />
              {(statusFilter || priorityFilter || debouncedSearchTerm) && (
                <button
                  onClick={() => {
                    setStatusFilter('');
                    setPriorityFilter('');
                    setSearchTerm('');
                  }}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    currentTheme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <X size={14} />
                  Clear
                </button>
              )}
            </div>

            {/* Active Filters */}
            {(debouncedSearchTerm || statusFilter || priorityFilter) && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {debouncedSearchTerm && (
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    Search: {debouncedSearchTerm}
                  </span>
                )}
                {statusFilter && (
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    Status: {statusFilter.replace('_', ' ')}
                  </span>
                )}
                {priorityFilter && (
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    Priority: {priorityFilter}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages Table/Cards */}
      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {loading && !initialLoading ? (
          <div className="p-8">
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3"></div>
              <span className="text-sm text-copy-light">Updating messages...</span>
            </div>
          </div>
        ) : messages.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200`}>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-main">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-main">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-main">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-main">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-main">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-main">Date</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-main">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id} className={`border-b border-gray-200 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-4 py-3 text-sm text-main">{message.name}</td>
                      <td className="px-4 py-3 text-sm text-copy-light">{message.email}</td>
                      <td className="px-4 py-3 text-sm text-main">{message.subject}</td>
                      <td className="px-4 py-3">
                        <div className="inline-block">
                          <Dropdown
                            options={[
                              { value: 'new', label: 'New' },
                              { value: 'in_progress', label: 'In Progress' },
                              { value: 'resolved', label: 'Resolved' },
                              { value: 'closed', label: 'Closed' }
                            ]}
                            value={message.status}
                            onChange={(value) => handleStatusChange(message.id, value)}
                            placeholder="Status"
                            className="min-w-[120px]"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="inline-block">
                          <Dropdown
                            options={[
                              { value: 'low', label: 'Low' },
                              { value: 'medium', label: 'Medium' },
                              { value: 'high', label: 'High' },
                              { value: 'urgent', label: 'Urgent' }
                            ]}
                            value={message.priority}
                            onChange={(value) => handlePriorityChange(message.id, value)}
                            placeholder="Priority"
                            className="min-w-[100px]"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-copy-light">
                        {new Date(message.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewMessage(message)}
                            className="inline-flex items-center gap-1 px-2 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(message.id)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            title="Delete message"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 flex flex-col gap-3 transition-colors ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-main truncate">{message.name}</p>
                      <p className="text-sm text-copy-light truncate">{message.email}</p>
                    </div>
                    {statusBadge(message.status)}
                  </div>
                  <p className="text-sm text-main font-medium">{message.subject}</p>
                  <div className="flex items-center justify-between">
                    {priorityBadge(message.priority)}
                    <span className="text-xs text-copy-light">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => viewMessage(message)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                    >
                      <Eye size={14} />
                      View Details
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-copy-light">No contact messages found</p>
          </div>
        )}

        {/* Pagination */}
        <div className={`px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className="text-sm text-copy-light">
            {total > 0
              ? `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)} of ${total} items`
              : 'No items to display'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                currentTheme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-copy-light">
              Page {page} of {totalPages || 1}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages || 1, p + 1))}
              disabled={page >= (totalPages || 1)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                currentTheme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Message Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${currentTheme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className={`p-4 border-b ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-lg font-bold text-main">Message Details</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-semibold text-main">Name</label>
                <p className="text-sm text-copy mt-1">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-main">Email</label>
                <p className="text-sm text-copy mt-1">{selectedMessage.email}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-main">Subject</label>
                <p className="text-sm text-copy mt-1">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-main">Message</label>
                <p className="text-sm text-copy mt-1 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-main">Status</label>
                  <div className="mt-1">{statusBadge(selectedMessage.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-main">Priority</label>
                  <div className="mt-1">{priorityBadge(selectedMessage.priority)}</div>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-main">Created At</label>
                <p className="text-sm text-copy mt-1">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className={`p-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex justify-end`}>
              <button
                onClick={() => setShowModal(false)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default ContactMessages;
