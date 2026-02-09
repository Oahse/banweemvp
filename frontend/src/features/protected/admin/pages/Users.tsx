import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, ChevronLeft, ChevronRight, SearchIcon, ArrowUpDownIcon, EyeIcon, PackageIcon } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import Dropdown from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import AdminLayout from '../components/AdminLayout';
import AdminLayoutSkeleton from '../components/skeletons/AdminLayoutSkeleton';
import { UsersListSkeleton } from '../components/skeletons/UsersSkeleton';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

const LIMIT = 10;
const FETCH_LIMIT = 100;

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 when filters change
  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!hasLoadedRef.current) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);
        console.log('Fetching users with params:', {
          page,
          limit: LIMIT,
          search: debouncedSearchQuery || undefined,
          status: statusFilter || undefined,
          role: roleFilter || undefined,
          sort_by: sortBy,
          sort_order: sortOrder
        });
        
        const collectedUsers: any[] = [];
        let currentPage = 1;
        let totalPages = 1;

        while (currentPage <= totalPages) {
          const response = await AdminAPI.getUsers({
            page: currentPage,
            limit: FETCH_LIMIT,
            search: debouncedSearchQuery || undefined,
            status: statusFilter || undefined,
            role: roleFilter || undefined,
            sort_by: sortBy,
            sort_order: sortOrder
          });

          const data = response?.data?.data || response?.data;
          const payloadUsers = Array.isArray(data) ? data : data?.users || data?.items || [];
          const paginationInfo = data?.pagination;

          collectedUsers.push(...payloadUsers);
          totalPages = paginationInfo?.pages || 1;
          currentPage += 1;

          if (!paginationInfo) {
            break;
          }
        }

        const allUsers = collectedUsers.map((user: any) => ({
          ...user,
          status: user.status ?? (user.is_active ? 'active' : 'inactive'),
          role: user.role ?? 'customer'
        }));
        
        // Apply client-side filtering and sorting if needed
        let filteredUsers = allUsers;
        
        // Apply search filter
        if (debouncedSearchQuery) {
          filteredUsers = filteredUsers.filter((user: any) =>
            user.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            user.firstname?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            user.lastname?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            user.role?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          );
        }
        
        // Apply status filter
        if (statusFilter) {
          filteredUsers = filteredUsers.filter((user: any) => user.status === statusFilter);
        }
        
        // Apply role filter
        if (roleFilter) {
          filteredUsers = filteredUsers.filter((user: any) => user.role === roleFilter);
        }
        
        // Apply sorting
        if (sortBy === 'created_at') {
          filteredUsers.sort((a: any, b: any) => {
            const aDate = new Date(a.created_at || 0);
            const bDate = new Date(b.created_at || 0);
            return sortOrder === 'asc' 
              ? aDate.getTime() - bDate.getTime()
              : bDate.getTime() - aDate.getTime();
          });
        } else if (sortBy === 'email') {
          filteredUsers.sort((a: any, b: any) => {
            const aEmail = (a.email || '').toLowerCase();
            const bEmail = (b.email || '').toLowerCase();
            return sortOrder === 'asc' 
              ? aEmail.localeCompare(bEmail)
              : bEmail.localeCompare(aEmail);
          });
        } else if (sortBy === 'name') {
          filteredUsers.sort((a: any, b: any) => {
            const aName = `${a.firstname || ''} ${a.lastname || ''}`.toLowerCase();
            const bName = `${b.firstname || ''} ${b.lastname || ''}`.toLowerCase();
            return sortOrder === 'asc' 
              ? aName.localeCompare(bName)
              : bName.localeCompare(aName);
          });
        }
        
        const total = filteredUsers.length;
        const pages = Math.max(1, Math.ceil(total / LIMIT));
        const startIndex = (page - 1) * LIMIT;
        const endIndex = startIndex + LIMIT;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
        setUsers(paginatedUsers);
        setPagination({
          page: page,
          limit: LIMIT,
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
        hasLoadedRef.current = true;
      }
    };

    fetchUsers();
  }, [page, debouncedSearchQuery, statusFilter, roleFilter, sortBy, sortOrder]);

  const statusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-success/20', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-error/20', text: 'text-error', label: 'Inactive' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
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
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handleView = (user: User) => {
    navigate(`/admin/users/${user.id}`);
  };


  const handleDelete = async () => {
    if (!deletingUser) return;

    const previous = users;
    setUsers(prev => prev.filter(item => item.id !== deletingUser.id));

    try {
      await AdminAPI.deleteUser(deletingUser.id);
      setPagination(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1)
      }));
      toast.success('User deleted');
    } catch (error: any) {
      setUsers(previous);
      toast.error('Failed to delete user');
    } finally {
      setShowDeleteModal(false);
      setDeletingUser(null);
    }
  };

  if (initialLoading) {
    return (
      <AdminLayout>
        <UsersListSkeleton />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
    <div className={`space-y-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
        <div>
          <p className={`mt-1 text-xs lg:text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Manage user accounts and permissions</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`p-4 rounded-lg border ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm ${
                  currentTheme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              {searchQuery !== debouncedSearchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Dropdown
              options={[
                { value: '', label: 'All Status' },
                { value: 'active', label: 'Active Only' },
                { value: 'inactive', label: 'Inactive Only' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Status"
              className="min-w-[120px]"
            />
            
            <Dropdown
              options={[
                { value: '', label: 'All Roles' },
                { value: 'admin', label: 'Admin' },
                { value: 'manager', label: 'Manager' },
                { value: 'support', label: 'Support' },
                { value: 'supplier', label: 'Supplier' },
                { value: 'customer', label: 'Customer' },
                { value: 'guest', label: 'Guest' }
              ]}
              value={roleFilter}
              onChange={setRoleFilter}
              placeholder="All Roles"
              className="min-w-[120px]"
            />
            
            <Dropdown
              options={[
                { value: 'created_at', label: 'Created' },
                { value: 'email', label: 'Email' },
                { value: 'name', label: 'Name' },
                { value: 'role', label: 'Role' }
              ]}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="min-w-[120px]"
            />
            
            <Button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              variant="outline"
              size="sm"
              leftIcon={<ArrowUpDownIcon size={14} />}
              className="inline-flex items-center gap-1 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm font-medium"
            >
              Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </Button>
          </div>

          {/* Active Filters */}
          {(debouncedSearchQuery || statusFilter || roleFilter) && (
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {debouncedSearchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Search: "{debouncedSearchQuery}"
                  <Button
                    onClick={() => setSearchQuery('')}
                    variant="ghost"
                    size="sm"
                  >
                    Clear
                  </Button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <Button
                    onClick={() => setStatusFilter('')}
                    variant="ghost"
                    size="sm"
                  >
                    Clear
                  </Button>
                </span>
              )}
              {roleFilter && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Role: {roleFilter.charAt(0).toUpperCase() + roleFilter.slice(1)}
                  <Button
                    onClick={() => setRoleFilter('')}
                    variant="ghost"
                    size="sm"
                  >
                    Clear
                  </Button>
                </span>
              )}
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
                  setRoleFilter('');
                }}
                variant="ghost"
                size="sm"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border flex items-start gap-3 ${
          currentTheme === 'dark' 
            ? 'bg-error/10 border-error/30 text-error' 
            : 'bg-error/10 border-error/30 text-error'
        }`}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Error Loading Users</p>
            <p className="text-sm mt-1">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="ghost"
              size="sm"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      <div className={`rounded-lg border overflow-hidden ${currentTheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {loading && !initialLoading ? (
          <div className="p-8">
            <div className="flex items-center justify-center">
              <Loader className="w-8 h-8 text-primary animate-spin mr-3" />
              <span className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Updating users...</span>
            </div>
          </div>
        ) : users.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full">
                <thead className={`${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200`}>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr
                      key={user.id}
                      onClick={() => handleView(user)}
                      className={`border-b border-gray-200 transition-colors cursor-pointer ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-3 text-xs text-gray-900 dark:text-white max-w-[150px] truncate">{`${user.firstname || ''} ${user.lastname || ''}`.trim() || 'N/A'}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300 max-w-[180px] truncate">{user.email || 'N/A'}</td>
                      <td className="px-4 py-3 text-xs">{roleBadge(user.role)}</td>
                      <td className="px-4 py-3 text-xs">{statusBadge(user.status)}</td>
                      <td className="px-4 py-3 text-xs">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(user);
                          }}
                          variant="primary"
                          size="sm"
                          leftIcon={<EyeIcon size={14} />}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          View
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingUser(user);
                            setShowDeleteModal(true);
                          }}
                          variant="danger"
                          size="sm"
                          className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user: any) => (
                <div
                  key={user.id}
                  onClick={() => handleView(user)}
                  className={`p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 transition-colors cursor-pointer ${currentTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-sm text-gray-900 dark:text-white truncate flex-1">{`${user.firstname || ''} ${user.lastname || ''}`.trim() || 'N/A'}</span>
                    {statusBadge(user.status)}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 truncate">{user.email || 'N/A'}</div>
                  <div className="flex items-center justify-between">
                    {roleBadge(user.role)}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(user);
                    }}
                    variant="primary"
                    size="sm"
                    leftIcon={<EyeIcon size={14} />}
                    className="mt-2 w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                  >
                    View Details
                  </Button>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingUser(user);
                        setShowDeleteModal(true);
                      }}
                      variant="danger"
                      size="sm"
                      className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </>
        ) : (
          <div className="p-8 text-center">
            <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No users found</p>
          </div>
        )}
      </div>

      <div className={`px-6 py-4 border-t ${currentTheme === 'dark' ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-center justify-between gap-4`}>
        <p className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {pagination.total > 0
            ? `Showing ${(pagination.page - 1) * pagination.limit + 1}–${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total} items`
            : `Total: ${pagination.total} items`
          }
          {pagination.total > 0 && pagination.pages > 1 && ` (Page ${pagination.page} of ${pagination.pages || 1})`}
        </p>
        <div className="flex items-center gap-1">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-2">
            {Array.from({ length: Math.min(5, Math.max(1, pagination.pages || 1)) }, (_, i) => {
              let pageNum: number;
              if (pagination.pages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= pagination.pages - 2) {
                pageNum = pagination.pages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  variant={page === pageNum ? 'primary' : 'ghost'}
                  size="sm"
                  className={`w-6 h-6 rounded-md text-sm font-medium transition-colors ${
                    page === pageNum ? 'bg-primary text-white' : 'border border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            onClick={() => setPage((p) => (pagination.pages > 0 ? Math.min(pagination.pages, p + 1) : p + 1))}
            disabled={page >= pagination.pages || pagination.pages <= 1}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>

      {showDeleteModal && deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowDeleteModal(false)}>
          <div className={`w-full max-w-md rounded-xl p-6 shadow-xl ${currentTheme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} onClick={(e) => e.stopPropagation()}>
            <Heading level={3} className="text-lg font-semibold mb-2">Delete user</Heading>
            <Body className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Are you sure you want to delete {deletingUser.email}? This action cannot be undone.
            </Body>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingUser(null);
                }}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                variant="danger"
                size="sm"
              >
                {isDeleting ? 'Deleting...' : 'Delete User'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default Users;
