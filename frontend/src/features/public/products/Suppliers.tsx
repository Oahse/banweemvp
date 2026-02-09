import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SearchIcon, 
  FilterIcon, 
  MapPinIcon, 
  MailIcon, 
  PhoneIcon, 
  BuildingIcon,
  StarIcon,
  ChevronRightIcon,
  UserIcon
} from 'lucide-react';
import { useApi } from '../../shared/hooks/useAsync';
import { SuppliersAPI } from '../api';
import ErrorMessage from '../components/Error';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

export const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const {
    data: suppliersData,
    loading,
    error,
    execute: fetchSuppliers,
  } = useApi();

  useEffect(() => {
    fetchSuppliers(() => SuppliersAPI.getPublicSuppliers());
  }, [fetchSuppliers]);

  const suppliers = suppliersData?.data || [];

  // Filter suppliers based on search and category
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = !searchQuery || 
      supplier.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || supplier.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort suppliers
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`);
      case 'company':
        return (a.company || '').localeCompare(b.company || '');
      case 'rating':
        return (b.rating_average || 0) - (a.rating_average || 0);
      default:
        return 0;
    }
  });

  const getSupplierRating = (supplier) => {
    const rating = supplier.rating_average || 0;
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <div className="bg-surface border-b border-border animate-slide-in">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Heading level={1} className="text-3xl font-bold text-main mb-2">Our Suppliers</Heading>
            <Body className="text-copy-light max-w-2xl mx-auto">
              Connect with our trusted network of verified suppliers who provide the highest quality agricultural products
            </Body>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-copy-light w-5 h-5" />
              <input
                type="text"
                placeholder="Search suppliers by name, company, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="company">Sort by Company</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-surface rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorMessage
            message="Failed to load suppliers. Please try again later."
            onRetry={() => fetchSuppliers(() => SuppliersAPI.getPublicSuppliers())}
          />
        ) : sortedSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="w-8 h-8 text-gray-400" />
            </div>
            <Heading level={3} className="text-lg font-medium text-main mb-2">No suppliers found</Heading>
            <Body className="text-copy-light">
              {searchQuery ? 'Try adjusting your search terms' : 'Check back later for new suppliers'}
            </Body>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSuppliers.map((supplier, index) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-surface rounded-lg border border-border hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  {/* Supplier Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <UserIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <Heading level={3} className="font-semibold text-main">
                          {supplier.firstname} {supplier.lastname}
                        </Heading>
                        {supplier.company && (
                          <Body className="text-sm text-copy-light">{supplier.company}</Body>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getSupplierRating(supplier)}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3 mb-4">
                    {supplier.email && (
                      <a
                        href={`mailto:${supplier.email}`}
                        className="flex items-center text-sm text-copy-light hover:text-primary transition-colors"
                      >
                        <MailIcon className="w-4 h-4 mr-2" />
                        {supplier.email}
                      </a>
                    )}
                    
                    {supplier.phone && (
                      <a
                        href={`tel:${supplier.phone}`}
                        className="flex items-center text-sm text-copy-light hover:text-primary transition-colors"
                      >
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        {supplier.phone}
                      </a>
                    )}
                    
                    {supplier.location && (
                      <div className="flex items-center text-sm text-copy-light">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {supplier.location}
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="text-center">
                      <div className="font-semibold text-main">{supplier.product_count || 0}</div>
                      <div className="text-copy-light text-xs">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-main">{supplier.rating_average?.toFixed(1) || '0.0'}</div>
                      <div className="text-copy-light text-xs">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-main">{supplier.review_count || 0}</div>
                      <div className="text-copy-light text-xs">Reviews</div>
                    </div>
                  </div>

                  {/* Bio */}
                  {supplier.bio && (
                    <p className="text-sm text-copy-light mb-4 line-clamp-3">
                      {supplier.bio}
                    </p>
                  )}

                  {/* Specialties */}
                  {supplier.specialties && supplier.specialties.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {supplier.specialties.slice(0, 3).map((specialty, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                        {supplier.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{supplier.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    to={`/suppliers/${supplier.id}`}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    View Full Profile
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
