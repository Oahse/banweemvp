import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingIcon,
  StarIcon,
  PackageIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ExternalLinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useApi } from '../../../components/shared/hooks/useAsync';
import { SuppliersAPI } from '../../../api';
import ErrorMessage from '../components/Error';
import { ProductCard } from '../../../components/generic/ProductCard';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

export const SupplierDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  const {
    data: supplierData,
    loading,
    error,
    execute: fetchSupplier,
  } = useApi();

  const {
    data: productsData,
    loading: productsLoading,
    execute: fetchProducts,
  } = useApi();

  useEffect(() => {
    if (id) {
      fetchSupplier(() => SuppliersAPI.getSupplierById(id));
      fetchProducts(() => SuppliersAPI.getSupplierProducts(id));
    }
  }, [id, fetchSupplier, fetchProducts]);

  const supplier = supplierData && typeof supplierData === 'object' && 'data' in supplierData ? supplierData.data : supplierData;
  const products = productsData && typeof productsData === 'object' && 'data' in productsData ? productsData.data : Array.isArray(productsData) ? productsData : [];

  const getSupplierRating = (rating = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-surface rounded-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage
            message="Supplier not found or failed to load supplier information."
            onRetry={() => id && fetchSupplier(() => SuppliersAPI.getSupplierById(id))}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/suppliers"
            className="inline-flex items-center text-copy-light hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Suppliers
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex items-start mb-4 md:mb-0">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <UserIcon className="w-10 h-10 text-primary" />
              </div>
              <div>
                <Heading level={1} className="text-2xl font-bold text-main mb-2">
                  {supplier.firstname} {supplier.lastname}
                </Heading>
                {supplier.company && (
                  <Body className="text-lg text-copy-light mb-2">{supplier.company}</Body>
                )}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                      {getSupplierRating(supplier.rating_average)}
                      <Text as="span" className="ml-2 text-sm text-copy-light">({supplier.review_count || 0} reviews)</Text>
                    </div>
                  <div className="flex items-center text-sm text-success">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      <Text as="span">Verified Supplier</Text>
                    </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              {supplier.email && (
                <a
                  href={`mailto:${supplier.email}`}
                  className="flex items-center text-copy-light hover:text-primary transition-colors"
                >
                  <MailIcon className="w-4 h-4 mr-2" />
                  <Text as="span">{supplier.email}</Text>
                </a>
              )}
              {supplier.phone && (
                <a
                  href={`tel:${supplier.phone}`}
                  className="flex items-center text-copy-light hover:text-primary transition-colors"
                >
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  <Text as="span">{supplier.phone}</Text>
                </a>
              )}
              {supplier.location && (
                <div className="flex items-center text-copy-light">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {supplier.location}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Supplier Info */}
          <div className="lg:col-span-1">
            {/* Stats */}
            <div className="bg-surface rounded-lg p-6 mb-6">
              <Heading level={3} className="font-semibold text-main mb-4">Statistics</Heading>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{supplier.product_count || 0}</div>
                  <div className="text-sm text-copy-light">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{supplier.rating_average?.toFixed(1) || '0.0'}</div>
                  <div className="text-sm text-copy-light">Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{supplier.review_count || 0}</div>
                  <div className="text-sm text-copy-light">Reviews</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-surface rounded-lg">
              <div className="border-b border-border">
                <div className="flex">
                  <Button
                    onClick={() => setActiveTab('about')}
                    variant={activeTab === 'about' ? "link" : "ghost"}
                    size="sm"
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === 'about'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-copy-light hover:text-main'
                    }`}
                  >
                    About
                  </Button>
                  <Button
                    onClick={() => setActiveTab('contact')}
                    variant={activeTab === 'contact' ? "link" : "ghost"}
                    size="sm"
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === 'contact'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-copy-light hover:text-main'
                    }`}
                  >
                    Contact
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'about' && (
                  <div className="space-y-4">
                    {supplier.bio && (
                      <div>
                        <Heading level={4} className="font-medium text-main mb-2">About</Heading>
                        <Body className="text-sm text-copy-light">{supplier.bio}</Body>
                      </div>
                    )}

                    {supplier.specialties && supplier.specialties.length > 0 && (
                      <div>
                        <Heading level={4} className="font-medium text-main mb-2">Specialties</Heading>
                        <div className="flex flex-wrap gap-2">
                          {supplier.specialties.map((specialty: any, index: number) => (
                            <Text
                              key={index}
                              as="span"
                              className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {specialty}
                            </Text>
                          ))}
                        </div>
                      </div>
                    )}

                    {supplier.founded_year && (
                      <div>
                        <Heading level={4} className="font-medium text-main mb-2">Founded</Heading>
                        <Body className="text-sm text-copy-light">{supplier.founded_year}</Body>
                      </div>
                    )}

                    {supplier.website && (
                      <div>
                        <Heading level={4} className="font-medium text-main mb-2">Website</Heading>
                        <a
                          href={supplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
                        >
                          {supplier.website}
                          <ExternalLinkIcon className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    <div>
                      <Heading level={4} className="font-medium text-main mb-2">Business Hours</Heading>
                      <Body className="text-sm text-copy-light">
                        {supplier.business_hours || 'Monday - Friday: 9:00 AM - 6:00 PM'}
                      </Body>
                    </div>

                    <div>
                      <Heading level={4} className="font-medium text-main mb-2">Response Time</Heading>
                      <Body className="text-sm text-copy-light">
                        {supplier.response_time || 'Usually responds within 24 hours'}
                      </Body>
                    </div>

                    <div>
                      <Heading level={4} className="font-medium text-main mb-2">Languages</Heading>
                      <div className="flex flex-wrap gap-2">
                        {(supplier.languages || ['English']).map((lang: any, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Products */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <Heading level={3} className="text-lg font-semibold text-main">Products</Heading>
                <div className="flex items-center text-sm text-copy-light">
                  <PackageIcon className="w-4 h-4 mr-1" />
                  {products.length} products
                </div>
              </div>

              {productsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-48 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product: any) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.variants?.[0]?.base_price || 0,
                        discountPrice: product.variants?.[0]?.sale_price || null,
                        rating: product.rating || 0,
                        reviewCount: product.review_count || 0,
                        image: product.variants?.[0]?.images?.[0]?.url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                        category: product.category?.name || 'General',
                        variants: product.variants || []
                      }}
                      selectedVariant={product.variants?.[0] || null}
                      viewMode="grid"
                      className=""
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <Heading level={3} className="text-lg font-medium text-main mb-2">No products available</Heading>
                  <Body className="text-copy-light">
                    This supplier hasn't added any products yet.
                  </Body>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
