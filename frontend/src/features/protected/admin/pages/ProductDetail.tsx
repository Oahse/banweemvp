import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, ArrowLeft, Package, DollarSign, Tag, User, Image as ImageIcon, Warehouse, RefreshCw, Edit, FileText, Salad } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';
import AdminLayoutSkeleton from '@/features/protected/admin/components/skeletons/AdminLayoutSkeleton';
import { ProductDetailSkeleton } from '@/features/protected/admin/components/skeletons/ProductsSkeleton';
import { Button } from '@/components/ui/Button';
import { Text, Heading, Body, Caption, Label } from '@/components/ui/Text/Text';

export const AdminProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await AdminAPI.getProductById(productId);
        
        // Handle different response structures
        const productData = response?.data?.data || response?.data || response;
        
        if (!productData) {
          throw new Error('No product data received');
        }
        
        setProduct(productData);
      } catch (err: any) {
        console.error('Product fetch error:', err);
        const message = err?.response?.data?.message || err?.message || 'Failed to load product details';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="space-y-6">
        <Button
            onClick={() => navigate('/admin/products')}
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft size={16} />}
            className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
          >
            Back to Products
          </Button>
          
          {error && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-destructive">Error</p>
                <p className="text-destructive/80 text-sm">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="danger"
                  size="sm"
                  className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-destructive text-white rounded text-sm hover:bg-destructive/90 transition-colors"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/admin/products')}
              variant="ghost"
              size="sm"
              leftIcon={<ArrowLeft size={16} />}
              className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
            >
              Back
            </Button>
            <div>
              <Heading level={5} className="text-lg font-semibold text-copy">{product.name}</Heading>
              <Caption className="text-copy-light text-[11px] mt-0.5">ID: {String(product.id).slice(0, 8)}...</Caption>
            </div>
          </div>
          
          <Button
            onClick={() => navigate(`/admin/products/${productId}/edit`)}
            variant="primary"
            size="sm"
            leftIcon={<Edit size={14} />}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors font-medium"
          >
            Edit Product
          </Button>
        </div>

        {/* Product Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-3">
            {/* Basic Info */}
            <div className="bg-surface rounded-lg border border-border-light p-3">
              <Heading level={5} className="text-base font-semibold text-copy mb-2 flex items-center gap-2">
                <Package className="w-3.5 h-3.5" />
                Product Information
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div>
                  <Label className="text-[11px] font-medium text-copy-light">Name</Label>
                  <Text as="p" className="text-copy font-medium text-sm">{product.name}</Text>
                </div>
                <div>
                  <Label className="text-[11px] font-medium text-copy-light">Slug</Label>
                  <Text as="p" className="text-copy font-mono text-[11px]">{product.slug}</Text>
                </div>
                <div>
                  <Label className="text-[11px] font-medium text-copy-light">SKU</Label>
                  <Text as="p" className="text-copy text-sm">{product.variants?.[0]?.sku || 'N/A'}</Text>
                </div>
                <div>
                  <Label className="text-[11px] font-medium text-copy-light">Rating</Label>
                  <Text as="p" className="text-copy text-sm">⭐ {(product.rating_average || 0).toFixed(1)} ({product.rating_count || 0} reviews)</Text>
                </div>
              </div>
              
              {product.description && (
                <div className="mt-2.5">
                  <Label className="text-[11px] font-medium text-copy-light">Description</Label>
                  <Text as="p" className="text-copy mt-1 text-sm">{product.description}</Text>
                </div>
              )}
              
              {product.short_description && (
                <div className="mt-2.5">
                  <Label className="text-[11px] font-medium text-copy-light">Short Description</Label>
                  <Text as="p" className="text-copy mt-1 text-sm">{product.short_description}</Text>
                </div>
              )}
            </div>

            {/* Category & Supplier */}
            <div className="bg-surface rounded-lg border border-border-light p-3">
              <Heading level={5} className="text-base font-semibold text-copy mb-2 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                Category & Supplier
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div>
                  <Label className="text-[11px] font-medium text-copy-light">Category</Label>
                  {product.category ? (
                    <div className="mt-1">
                      <Text as="p" className="text-copy font-medium text-sm">{product.category.name}</Text>
                        {product.category.description && (
                          <Caption className="text-copy-light text-[11px]">{product.category.description}</Caption>
                        )}
                    </div>
                  ) : (
                    <p className="text-copy-light text-sm">No category assigned</p>
                  )}
                </div>
                
                <div>
                  <Label className="text-[11px] font-medium text-copy-light">Supplier</Label>
                  {product.supplier ? (
                    <div className="mt-1">
                      <Text as="p" className="text-copy font-medium text-sm">{product.supplier.name}</Text>
                      <Caption className="text-copy-light text-[11px]">{product.supplier.email}</Caption>
                      {product.supplier.phone && (
                        <p className="text-copy-light text-sm">{product.supplier.phone}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-copy-light text-sm">No supplier assigned</p>
                  )}
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-surface rounded-lg border border-border-light p-3">
              <Heading level={5} className="text-base font-semibold text-copy mb-2 flex items-center gap-2">
                <Package className="w-3.5 h-3.5" />
                Variants ({product.variants?.length || 0})
              </Heading>
              
              {product.variants && product.variants.length > 0 ? (
                <div className="space-y-2.5">
                  {product.variants.map((variant: any, index: number) => (
                    <div key={variant.id} className="border border-border-light rounded p-2.5">
                      <div className="flex items-start justify-between mb-1.5">
                          <div>
                            <Heading level={5} className="font-semibold text-copy text-sm">{variant.name}</Heading>
                            <Caption className="text-copy-light text-[11px] font-mono">SKU: {variant.sku}</Caption>
                          </div>
                        <div className="text-right">
                          <Text as="p" className="text-sm font-semibold text-copy">
                            ${variant.current_price?.toFixed(2) || variant.base_price?.toFixed(2)}
                          </Text>
                          {variant.sale_price && variant.sale_price < variant.base_price && (
                            <Caption className="text-[11px] text-copy-light line-through">
                              ${variant.base_price?.toFixed(2)}
                            </Caption>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <Label className="text-copy-light">Stock</Label>
                          <Text as="p" className={`font-medium text-sm ${
                            variant.stock > 0 ? 'text-success' : 'text-destructive'
                          }`}> 
                            {variant.stock || 0} units
                          </Text>
                        </div>
                        <div>
                          <Label className="text-copy-light">Status</Label>
                          <Text as="p" className="font-medium text-sm">
                            {variant.is_active ? 'Active' : 'Inactive'}
                          </Text>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 text-[11px]">
                        <div>
                          <Label className="text-copy-light">Attributes</Label>
                          <Text as="p" className="font-medium text-sm">
                            {variant.attributes ? Object.entries(variant.attributes).map(([k, v]) => 
                              `${k}: ${v}`).join(', ') : 'None'}
                          </Text>
                        </div>
                      </div>
                      
                      {/* Images */}
                      {variant.images && variant.images.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border-light">
                          <div className="flex items-center gap-2 text-[11px] text-copy-light mb-1.5">
                            <ImageIcon className="w-3 h-3" />
                            Images ({variant.images.length})
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {variant.images.map((image: any) => (
                              <div key={image.id} className="relative group">
                                <img
                                  src={image.url}
                                  alt={image.alt_text || variant.name}
                                  className="w-10 h-10 object-cover rounded border border-border-light"
                                />
                                {image.is_primary && (
                                  <Text as="span" className="absolute top-0 right-0 bg-primary text-white text-[10px] px-1 rounded-bl">
                                    Primary
                                  </Text>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Caption className="text-copy-light">No variants found</Caption>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Pricing */}
            <div className="bg-surface rounded-lg border border-border-light p-4">
              <h2 className="text-base font-semibold text-copy mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Pricing
              </h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-copy-light text-sm">Price Range:</span>
                  <span className="font-medium text-sm">
                    ${product.price_range?.min?.toFixed(2) || '0.00'} - 
                    ${product.price_range?.max?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Purchases */}
            <div className="bg-surface rounded-lg border border-border-light p-4">
              <h2 className="text-base font-semibold text-copy mb-3">Purchases</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-copy-light text-sm">Purchases:</span>
                  <span className="font-medium text-sm">{product.purchase_count || 0}</span>
                </div>
              </div>
            </div>

            {/* In Stock */}
            <div className="bg-surface rounded-lg border border-border-light p-4">
              <h2 className="text-base font-semibold text-copy mb-3">In Stock</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-copy-light text-sm">In Stock:</span>
                  <span className={`font-medium text-sm ${product.in_stock ? 'text-success' : 'text-destructive'}`}>
                    {product.in_stock ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags && (typeof product.tags === 'string' ? product.tags.split(',') : product.tags).length > 0 && (
              <div className="bg-surface rounded-lg border border-border-light p-4">
                <h2 className="text-base font-semibold text-copy mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(typeof product.tags === 'string' ? product.tags.split(',') : product.tags).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-sm font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-surface rounded-lg border border-border-light p-4">
                <h2 className="text-base font-semibold text-copy mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Specifications
                </h2>
                <div className="space-y-1.5">
                  {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between items-start py-1.5 border-b border-border-light last:border-0">
                      <span className="text-copy-light text-sm font-medium capitalize">
                        {key.replace(/_/g, ' ')}:
                      </span>
                      <span className="text-copy text-sm text-right max-w-[60%]">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dietary Tags */}
            {product.dietary_tags && (
              <div className="bg-surface rounded-lg border border-border-light p-4">
                <h2 className="text-base font-semibold text-copy mb-3 flex items-center gap-2">
                  <Salad className="w-4 h-4" />
                  Dietary Information
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(typeof product.dietary_tags === 'object' 
                    ? Object.keys(product.dietary_tags).filter(key => product.dietary_tags[key])
                    : Array.isArray(product.dietary_tags) 
                      ? product.dietary_tags 
                      : []
                  ).map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light rounded text-sm font-medium inline-flex items-center gap-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary"></span>
                      {tag.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Origin */}
            {product.origin && (
              <div className="bg-surface rounded-lg border border-border-light p-4">
                <h2 className="text-base font-semibold text-copy mb-3">Origin</h2>
                <p className="text-copy text-sm">{product.origin}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;
