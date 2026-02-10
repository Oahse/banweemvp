import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, SearchIcon, ArrowUpDownIcon, EyeIcon, PackageIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { UsersListSkeleton } from '@/features/protected/admin/components/skeletons/UsersSkeleton';
import { Heading, Body, Text } from '@/components/ui/Text/Text';
import { ConfirmModal, useModal } from '@/components/ui/Modal';
import { AdminDataTable, AdminColumn, FilterConfig } from '@/components/shared/AdminDataTable';

const LIMIT = 10;

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  status: string;
  created_at: string;
  last_login?: string;
}

export const Users = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({ 
    page: 1, 
    limit: LIMIT, 
    total: 0, 
    pages: 0 
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const hasLoadedRef = useRef(false);
  const deleteModal = useModal();
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await AdminAPI.getUsers({
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
        status: params.filters?.status || undefined,
        role: params.filters?.role || undefined,
        sort_by: params.sort_by,
        sort_order: params.sort_order
      });
      
      const data = response?.data?.data || response?.data;
      const allUsers = Array.isArray(data) ? data : data?.users || data?.items || [];
      let filteredUsers = allUsers;
      
      if (params.search) {
        filteredUsers = filteredUsers.filter((user: any) =>
          user.email?.toLowerCase().includes(params.search.toLowerCase()) ||
          user.firstname?.toLowerCase().includes(params.search.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(params.search.toLowerCase()) ||
          user.role?.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      if (params.filters?.status) {
        filteredUsers = filteredUsers.filter((user: any) => user.status === params.filters.status);
      }
      
      if (params.filters?.role) {
        filteredUsers = filteredUsers.filter((user: any) => user.role === params.filters.role);
      }
      
      if (params.sort_by === 'created_at') {
        filteredUsers.sort((a: any, b: any) => {
          const aDate = new Date(a.created_at || 0);
          const bDate = new Date(b.created_at || 0);
          return params.sort_order === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      } else if (params.sort_by === 'email') {
        filteredUsers.sort((a: any, b: any) => {
          const aEmail = (a.email || '').toLowerCase();
          const bEmail = (b.email || '').toLowerCase();
          return params.sort_order === 'asc' 
            ? aEmail.localeCompare(bEmail)
            : bEmail.localeCompare(aEmail);
        });
      } else if (params.sort_by === 'name') {
        filteredUsers.sort((a: any, b: any) => {
          const aName = `${a.firstname || ''} ${a.lastname || ''}`.toLowerCase();
          const bName = `${b.firstname || ''} ${b.lastname || ''}`.toLowerCase();
          return params.sort_order === 'asc' 
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        });
      }
      
      const total = filteredUsers.length;
      const pages = Math.max(1, Math.ceil(total / params.limit));
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
      
      setUsers(paginatedUsers);
      setPagination({
        page: params.page,
        limit: params.limit,
        total: total,
        pages: pages
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to load users';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const statusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-success/20', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-error/20', text: 'text-error', label: 'Inactive' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <Text className={`px-2 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </Text>
    );
  };

  const roleBadge = (role: string) => {
    const roleConfig = {
      admin: { bg: 'bg-purple-500/20', text: 'text-purple-500', label: 'Admin' },
      manager: { bg: 'bg-blue-500/20', text: 'text-blue-500', label: 'Manager' },
      support: { bg: 'bg-amber-500/20', text: 'text-amber-500', label: 'Support' },
      supplier: { bg: 'bg-green-500/20', text: 'text-green-500', label: 'Supplier' },
      customer: { bg: 'bg-gray-500/20', text: 'text-gray-500', label: 'Customer' },
      guest: { bg: 'bg-gray-400/20', text: 'text-gray-400', label: 'Guest' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.customer;
    
    return (
      <Text className={`px-2 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </Text>
    );
  };

  // Define columns for AdminDataTable
  const columns: AdminColumn<any>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (_: any, row: any) => (
        <Text className="text-sm text-gray-900 dark:text-white">
          {`${row.firstname || ''} ${row.lastname || ''}`.trim() || 'N/A'}
        </Text>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-500 dark:text-gray-400 truncate">{value || 'N/A'}</Text>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (value: string) => roleBadge(value),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => statusBadge(value),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (value: string) => (
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(value || '').toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleView(row);
            }}
            variant="primary"
            size="sm"
            leftIcon={<EyeIcon size={14} />}
          >
            View
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
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ],
      placeholder: 'All Status',
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: '', label: 'All Roles' },
        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'support', label: 'Support' },
        { value: 'supplier', label: 'Supplier' },
        { value: 'customer', label: 'Customer' },
        { value: 'guest', label: 'Guest' }
      ],
      placeholder: 'All Roles',
    },
  ];

  const handleView = (user: User) => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleDelete = async () => {
    if (!deletingUser) return;

    setIsDeleting(true);
    try {
      await AdminAPI.deleteUser(deletingUser.id);
      setUsers(prev => prev.filter(user => user.id !== deletingUser.id));
      setPagination(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1)
      }));
      toast.success('User deleted successfully');
      deleteModal.close();
      setDeletingUser(null);
    } catch (error: any) {
      toast.error('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (user: User) => {
    setDeletingUser(user);
    deleteModal.open();
  };

  useEffect(() => {
    fetchData({
      page: 1,
      limit: LIMIT,
      search: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    });
  }, []);

  if (initialLoading) {
    return (
      <UsersListSkeleton />
    );
  }

  return (
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-1">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold">Users</h1>
            <Text className={`mt-1 text-sm lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage user accounts and permissions</Text>
          </div>
        </div>

        <AdminDataTable
          data={users}
          loading={loading}
          error={error}
          pagination={pagination}
          columns={columns}
          fetchData={fetchData}
          searchPlaceholder="Search users..."
          filters={filters}
          emptyMessage="No users found"
          responsive="cards"
          limit={LIMIT}
          onRowClick={handleView}
        />

        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.close}
          title="Delete User"
          message={`Are you sure you want to delete ${deletingUser?.firstname || 'this user'}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          isLoading={isDeleting}
          variant="danger"
        />
      </div>
  );
};

export default Users;
