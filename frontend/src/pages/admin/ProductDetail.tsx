import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, ArrowLeft, Package, DollarSign, Tag, User, Image as ImageIcon, Warehouse, RefreshCw, Edit, FileText, Salad } from 'lucide-react';
import AdminAPI from '@/api/admin';
import toast from 'react-hot-toast';

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
        
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-destructive">Error</p>
              <p className="text-destructive/80 text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-destructive text-white rounded text-sm hover:bg-destructive/90 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/products')}
            className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <h1 className="text-lg font-semibold text-copy">{product.name}</h1>
            <p className="text-copy-light text-[11px] mt-0.5">ID: {String(product.id).slice(0, 8)}...</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/admin/products/${productId}/edit`)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary text-white rounded text-xs hover:bg-primary/90 transition-colors"
          >
            <Edit className="w-3 h-3" />
            Edit
          </button>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            product.product_status === 'active' ? 'bg-success/20 text-success' : 
            product.product_status === 'inactive' ? 'bg-warning/20 text-warning' :
            'bg-gray/20 text-gray'
          }`}>
            {product.product_status?.charAt(0).toUpperCase() + product.product_status?.slice(1) || 'Unknown'}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            product.availability_status === 'available' ? 'bg-success/20 text-success' : 
            product.availability_status === 'out_of_stock' ? 'bg-destructive/20 text-destructive' :
            'bg-warning/20 text-warning'
          }`}>
            {product.availability_status?.replace('_', ' ').charAt(0).toUpperCase() + product.availability_status?.replace('_', ' ').slice(1) || 'Unknown'}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-3">
          {/* Basic Info */}
          <div className="bg-surface rounded-lg border border-border-light p-3">
            <h2 className="text-base font-semibold text-copy mb-2 flex items-center gap-2">
              <Package className="w-3.5 h-3.5" />
              Product Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-copy-light">Name</label>
                <p className="text-copy font-medium text-xs">{product.name}</p>
              </div>
              <div>
                <label className="text-[11px] font-medium text-copy-light">Slug</label>
                <p className="text-copy font-mono text-[11px]">{product.slug}</p>
              </div>
              <div>
                <label className="text-[11px] font-medium text-copy-light">SKU</label>
                <p className="text-copy text-xs">{product.variants?.[0]?.sku || 'N/A'}</p>
              </div>
              <div>
                <label className="text-[11px] font-medium text-copy-light">Rating</label>
                <p className="text-copy text-xs">⭐ {(product.rating_average || 0).toFixed(1)} ({product.rating_count || 0} reviews)</p>
              </div>
            </div>
            
            {product.description && (
              <div className="mt-2.5">
                <label className="text-[11px] font-medium text-copy-light">Description</label>
                <p className="text-copy mt-1 text-xs">{product.description}</p>
              </div>
            )}
            
            {product.short_description && (
              <div className="mt-2.5">
                <label className="text-[11px] font-medium text-copy-light">Short Description</label>
                <p className="text-copy mt-1 text-xs">{product.short_description}</p>
              </div>
            )}
          </div>

          {/* Category & Supplier */}
          <div className="bg-surface rounded-lg border border-border-light p-3">
            <h2 className="text-base font-semibold text-copy mb-2 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              Category & Supplier
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-copy-light">Category</label>
                {product.category ? (
                  <div className="mt-1">
                    <p className="text-copy font-medium text-xs">{product.category.name}</p>
                    {product.category.description && (
                      <p className="text-copy-light text-[11px]">{product.category.description}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-copy-light text-xs">No category assigned</p>
                )}
              </div>
              
              <div>
                <label className="text-[11px] font-medium text-copy-light">Supplier</label>
                {product.supplier ? (
                  <div className="mt-1">
                    <p className="text-copy font-medium text-xs">{product.supplier.name}</p>
                    <p className="text-copy-light text-[11px]">{product.supplier.email}</p>
                    {product.supplier.phone && (
                      <p className="text-copy-light text-xs">{product.supplier.phone}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-copy-light text-xs">No supplier assigned</p>
                )}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-surface rounded-lg border border-border-light p-3">
            <h2 className="text-base font-semibold text-copy mb-2 flex items-center gap-2">
              <Package className="w-3.5 h-3.5" />
              Variants ({product.variants?.length || 0})
            </h2>
            
            {product.variants && product.variants.length > 0 ? (
              <div className="space-y-2.5">
                {product.variants.map((variant: any, index: number) => (
                  <div key={variant.id} className="border border-border-light rounded p-2.5">
                    <div className="flex items-start justify-between mb-1.5">
                      <div>
                        <h3 className="font-semibold text-copy text-xs">{variant.name}</h3>
                        <p className="text-copy-light text-[11px] font-mono">SKU: {variant.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-copy">
                          ${variant.current_price?.toFixed(2) || variant.base_price?.toFixed(2)}
                        </p>
                        {variant.sale_price && variant.sale_price < variant.base_price && (
                          <p className="text-[11px] text-copy-light line-through">
                            ${variant.base_price?.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <label className="text-copy-light">Stock</label>
                        <p className={`font-medium text-xs ${
                          variant.stock > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {variant.stock || 0} units
                        </p>
                      </div>
                      <div>
                        <label className="text-copy-light">Status</label>
                        <p className="font-medium text-xs">
                          {variant.is_active ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 text-[11px]">
                      <div>
                        <label className="text-copy-light">Attributes</label>
                        <p className="font-medium text-xs">
                          {variant.attributes ? Object.entries(variant.attributes).map(([k, v]) => 
                            `${k}: ${v}`).join(', ') : 'None'}
                        </p>
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
                                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] px-1 rounded-bl">
                                  Primary
                                </span>
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
              <p className="text-copy-light">No variants found</p>
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
                <span className="text-copy-light text-xs">Min Price:</span>
                <span className="font-medium text-xs">${product.min_price?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-copy-light text-xs">Max Price:</span>
                <span className="font-medium text-xs">${product.max_price?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-copy-light text-xs">Price Range:</span>
                <span className="font-medium text-xs">
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
                <span className="text-copy-light text-xs">Purchases:</span>
                <span className="font-medium text-xs">{product.purchase_count || 0}</span>
              </div>
            </div>
          </div>

          {/* In Stock */}
          <div className="bg-surface rounded-lg border border-border-light p-4">
            <h2 className="text-base font-semibold text-copy mb-3">In Stock</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-copy-light text-xs">In Stock:</span>
                <span className={`font-medium text-xs ${product.in_stock ? 'text-success' : 'text-destructive'}`}>
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
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium"
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
                    <span className="text-copy-light text-xs font-medium capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="text-copy text-xs text-right max-w-[60%]">
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
                    className="px-2 py-0.5 bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light rounded text-xs font-medium inline-flex items-center gap-1"
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
              <p className="text-copy text-xs">{product.origin}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetail;
