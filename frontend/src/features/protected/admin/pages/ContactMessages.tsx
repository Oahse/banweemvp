/**
 * Admin Contact Messages Page
 * View and manage customer contact form submissions
 */

import React, { useState, useEffect } from 'react';
import { ContactMessagesAPI, ContactMessage} from '@/api/contact-messages';
import { Mail, Clock, CheckCircle, AlertCircle, Search, Eye, Trash2, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import ContactMessagesSkeleton from '@/features/protected/admin/components/skeletons/ContactMessagesSkeleton';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text/Text';

const PAGE_SIZE = 20;


const ContactMessages: React.FC = () => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ 
    page: 1, 
    limit: PAGE_SIZE, 
    total: 0, 
    pages: 0 
  });
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const viewModal = useModal();
  const [showFilters, setShowFilters] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    in_progress: 0,
    resolved: 0
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchData({
      page: 1,
      limit: PAGE_SIZE,
      search: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }, []);

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
      setPagination({
        page: response.page,
        limit: response.page_size,
        total: response.total,
        pages: response.total_pages
      });
      
      // Calculate stats from the response
      calculateStats(response.messages, response.total);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const calculateStats = (currentMessages: ContactMessage[], totalCount: number) => {
    const newCount = currentMessages.filter(m => m.status === 'new').length;
    const inProgressCount = currentMessages.filter(m => m.status === 'in_progress').length;
    const resolvedCount = currentMessages.filter(m => m.status === 'resolved').length;
    
    setStats({
      total: totalCount,
      new: newCount,
      in_progress: inProgressCount,
      resolved: resolvedCount
    });
  };

  

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    try {
      await ContactMessagesAPI.update(messageId, { status: newStatus as any });
      toast.success('Status updated successfully');
      fetchMessages();
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
    setMessageToDelete(messageId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    
    setIsDeleting(true);
    try {
      await ContactMessagesAPI.delete(messageToDelete);
      toast.success('Message deleted successfully');
      setShowDeleteConfirm(false);
      setMessageToDelete(null);
      fetchMessages(); // This will recalculate stats
    } catch (error) {
      toast.error('Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    viewModal.open();
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

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ContactMessagesAPI.getAll({
        page: params.page,
        page_size: params.limit,
        status: params.filters?.status || undefined,
        priority: params.filters?.priority || undefined,
        search: params.search,
      });
      
      const allMessages = response?.messages || [];
      let filteredMessages = allMessages;
      
      if (params.search) {
        filteredMessages = filteredMessages.filter((message: any) =>
          message.name?.toLowerCase().includes(params.search.toLowerCase()) ||
          message.email?.toLowerCase().includes(params.search.toLowerCase()) ||
          message.subject?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.status) {
        filteredMessages = filteredMessages.filter((message: any) => message.status === params.filters.status);
      }
      
      if (params.filters?.priority) {
        filteredMessages = filteredMessages.filter((message: any) => message.priority === params.filters.priority);
      }
      
      const total = filteredMessages.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedMessages = filteredMessages.slice(startIndex, endIndex);
      
      setMessages(paginatedMessages);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
      
      calculateStats(allMessages, total);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<ContactMessage>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string, row: ContactMessage) => (
        <Text className="text-sm text-gray-900 dark:text-white">{row.name || 'N/A'}</Text>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value: string, row: ContactMessage) => (
        <Text className="text-sm text-gray-900 dark:text-white">{row.email || 'N/A'}</Text>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (value: string) => (
        <Text className="text-sm text-gray-900 dark:text-white">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => statusBadge(value),
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (value: string) => priorityBadge(value),
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-900 dark:text-white">
          {new Date(value).toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: ContactMessage) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => viewMessage(row)}
            variant="ghost"
            size="xs"
            leftIcon={<Eye size={14} />}
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            View
          </Button>
          <Button
            onClick={() => handleDelete(row.id)}
            variant="ghost"
            size="xs"
            leftIcon={<Trash2 size={14} />}
            className="inline-flex items-center gap-1 px-2 py-1.5 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filters: FilterConfig[] = [
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: '', label: 'All Status' },
        { value: 'new', label: 'New' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'closed', label: 'Closed' }
      ],
      placeholder: 'All Status',
    },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: '', label: 'All Priorities' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ],
      placeholder: 'All Priorities',
    },
  ];

  const statusBadge = (status: string) => (
    <span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(status)}`}>
      {status.replace('_', ' ')}
    </span>
  );

  const priorityBadge = (priority: string) => (
    <span className={`px-2 py-1 text-sm rounded-full ${getPriorityColor(priority)}`}>
      {priority}
    </span>
  );

  if (initialLoading) {
    return <ContactMessagesSkeleton />;
  }

  return (
    <div className="space-y-6">
        {/* Header */}
        <div>
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
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                currentTheme === 'dark' 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter size={14} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
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
                    <AnimatedLoader size="sm" variant="spinner" color="primary" centered={false} />
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
                  <Button
                    onClick={() => {
                      setStatusFilter('');
                      setPriorityFilter('');
                      setSearchTerm('');
                    }}
                    variant="ghost"
                    size="xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Active Filters */}
              {(debouncedSearchTerm || statusFilter || priorityFilter) && (
                <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                  {debouncedSearchTerm && (
                    <span className="px-2 py-1 text-sm bg-primary/10 text-primary rounded">
                      Search: {debouncedSearchTerm}
                    </span>
                  )}
                  {statusFilter && (
                    <span className="px-2 py-1 text-sm bg-primary/10 text-primary rounded">
                      Status: {statusFilter.replace('_', ' ')}
                    </span>
                  )}
                  {priorityFilter && (
                    <span className="px-2 py-1 text-sm bg-primary/10 text-primary rounded">
                      Priority: {priorityFilter}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <AdminDataTable
          data={messages}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search messages..."
          filters={filters}
          emptyMessage="No contact messages found"
          responsive="cards"
          limit={PAGE_SIZE}
          onRowClick={viewMessage}
        />

      {/* View Message Modal */}
      <Modal isOpen={viewModal.isOpen} onClose={viewModal.close} size="lg">
        <ModalHeader>Message Details</ModalHeader>
        <ModalBody>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <Text weight="semibold" className="text-sm">Name</Text>
                <Text className="text-sm mt-1">{selectedMessage.name}</Text>
              </div>
              <div>
                <Text weight="semibold" className="text-sm">Email</Text>
                <Text className="text-sm mt-1">{selectedMessage.email}</Text>
              </div>
              <div>
                <Text weight="semibold" className="text-sm">Subject</Text>
                <Text className="text-sm mt-1">{selectedMessage.subject}</Text>
              </div>
              <div>
                <Text weight="semibold" className="text-sm">Message</Text>
                <Text className="text-sm mt-1 whitespace-pre-wrap">{selectedMessage.message}</Text>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text weight="semibold" className="text-sm">Status</Text>
                  <div className="mt-1">{statusBadge(selectedMessage.status)}</div>
                </div>
                <div>
                  <Text weight="semibold" className="text-sm">Priority</Text>
                  <div className="mt-1">{priorityBadge(selectedMessage.priority)}</div>
                </div>
              </div>
              <div>
                <Text weight="semibold" className="text-sm">Created At</Text>
                <Text className="text-sm mt-1">
                  {new Date(selectedMessage.created_at).toLocaleString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={viewModal.close} variant="secondary" size="xs">
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setMessageToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Contact Message"
        message="Are you sure you want to delete this contact message? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={isDeleting}
      />
    
    </div>
  );
};

export default ContactMessages;
