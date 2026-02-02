import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader, AlertCircle, Package, DollarSign, Tag, FileText, Image as ImageIcon, Plus, Trash2, Box } from 'lucide-react';
import AdminAPI from '@/api/admin';
import { CategoriesAPI } from '@/api';
import toast from 'react-hot-toast';
import Dropdown from '../../components/ui/Dropdown';
import { getCountryOptions } from '../../data/countries';
import { DIETARY_TAGS } from '../../config/product';

interface Category {
  id: string;
  name: string;
}

interface Variant {
  id?: string;
  name: string;
  sku: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  attributes?: Record<string, any>;
  specifications?: Record<string, any>;
  dietary_tags?: string[];
  tags?: string;
  is_active?: boolean;
  availability_status?: string;
  barcode?: string;
  qr_code?: string;
  images?: Array<{
    id?: string;
    url: string;
    alt_text?: string;
    is_primary?: boolean;
    sort_order?: number;
  }>;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string;
  origin: string;
  product_status?: string;
  is_featured?: boolean;
  is_bestseller?: boolean;
  variants: Variant[];
}

const EditProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    category_id: '',
    origin: '',
    product_status: 'active',
    is_featured: false,
    is_bestseller: false,
    variants: [] as Variant[]
  });

  useEffect(() => {
    if (!productId) {
      setError('Product ID is required');
      setLoading(false);
      return;
    }
    fetchData();
  }, [productId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [categoriesRes, productRes] = await Promise.all([
        CategoriesAPI.getCategories(),
        AdminAPI.getProductById(productId!)
      ]);
      
      const categoriesData = categoriesRes?.data?.data || categoriesRes?.data || categoriesRes || {};
      const categoriesArray = categoriesData.categories || [];
      setCategories(Array.isArray(categoriesArray) ? categoriesArray : []);
      
      const productData = productRes?.data?.data || productRes?.data || productRes;
      setProduct(productData);
      
      setFormData({
        name: productData.name || '',
        slug: productData.slug || '',
        description: productData.description || '',
        short_description: productData.short_description || '',
        category_id: productData.category_id || '',
        origin: productData.origin || '',
        product_status: productData.product_status || 'active',
        is_featured: productData.is_featured || false,
        is_bestseller: productData.is_bestseller || false,
        variants: (productData.variants || []).map((v: any) => ({
          id: v.id,
          name: v.name || '',
          sku: v.sku || '',
          base_price: v.base_price || 0,
          sale_price: v.sale_price,
          stock: v.stock || v.inventory?.quantity_available || 0,
          attributes: v.attributes || {},
          specifications: v.specifications || {},
          dietary_tags: Array.isArray(v.dietary_tags) ? v.dietary_tags : [],
          tags: Array.isArray(v.tags) ? v.tags.join(',') : (v.tags || ''),
          is_active: v.is_active !== undefined ? v.is_active : true,
          availability_status: v.availability_status || 'available',
          barcode: v.barcode || '',
          qr_code: v.qr_code || '',
          images: Array.isArray(v.images) ? v.images.map((img: any) => ({
            id: img.id,
            url: img.url || '',
            alt_text: img.alt_text || '',
            is_primary: img.is_primary || false,
            sort_order: img.sort_order || 0
          })) : (Array.isArray(v.image_urls) ? v.image_urls.map((url: string, idx: number) => ({
            url,
            is_primary: idx === 0,
            sort_order: idx
          })) : [])
        }))
      });
      
    } catch (err: any) {
      console.error('Error fetching data:', err);
      const message = err?.response?.data?.message || err?.message || 'Failed to load product';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productId) return;
    
    try {
      setSaving(true);
      
      const updateData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        short_description: formData.short_description,
        category_id: formData.category_id,
        origin: formData.origin,
        product_status: formData.product_status,
        is_featured: formData.is_featured,
        is_bestseller: formData.is_bestseller,
        variants: formData.variants.map(v => ({
          ...(v.id && { id: v.id }),
          name: v.name,
          sku: v.sku,
          base_price: v.base_price,
          sale_price: v.sale_price || undefined,
          attributes: v.attributes,
          specifications: v.specifications,
          dietary_tags: v.dietary_tags,
          tags: v.tags,
          is_active: v.is_active,
          availability_status: v.availability_status,
          barcode: v.barcode,
          qr_code: v.qr_code,
          images: (v.images || []).filter(img => img.url).map(img => ({
            ...(img.id && { id: img.id }),
            url: img.url,
            alt_text: img.alt_text || '',
            is_primary: img.is_primary || false,
            sort_order: img.sort_order || 0
          }))
        }))
      };
      
      await AdminAPI.updateProduct(productId, updateData);
      toast.success('Product updated successfully');
      navigate(`/admin/products/${productId}`);
      
    } catch (err: any) {
      console.error('Error updating product:', err);
      const message = err?.response?.data?.message || err?.message || 'Failed to update product';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: any) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
  };

  const handleImageChange = (variantIndex: number, imageIndex: number, field: string, value: any) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      const newImages = [...(newVariants[variantIndex].images || [])];
      newImages[imageIndex] = { ...newImages[imageIndex], [field]: value };
      newVariants[variantIndex] = { ...newVariants[variantIndex], images: newImages };
      return { ...prev, variants: newVariants };
    });
  };

  const addImage = (variantIndex: number) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      const currentImages = newVariants[variantIndex].images || [];
      newVariants[variantIndex].images = [
        ...currentImages,
        { url: '', is_primary: currentImages.length === 0, sort_order: currentImages.length }
      ];
      return { ...prev, variants: newVariants };
    });
  };

  const removeImage = (variantIndex: number, imageIndex: number) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      newVariants[variantIndex].images = (newVariants[variantIndex].images || []).filter((_, i) => i !== imageIndex);
      return { ...prev, variants: newVariants };
    });
  };

  const setPrimaryImage = (variantIndex: number, imageIndex: number) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      const images = newVariants[variantIndex].images || [];
      newVariants[variantIndex].images = images.map((img, idx) => ({
        ...img,
        is_primary: idx === imageIndex
      }));
      return { ...prev, variants: newVariants };
    });
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          name: formData.name,
          sku: '',
          base_price: 0,
          stock: 0,
          attributes: {},
          specifications: {},
          dietary_tags: [],
          tags: '',
          is_active: true,
          availability_status: 'available',
          barcode: '',
          qr_code: '',
          images: []
        }
      ]
    }));
  };

  const removeVariant = (index: number) => {
    if (formData.variants.length === 1) {
      toast.error('Product must have at least one variant');
      return;
    }
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 space-y-4">
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>
        
        <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-destructive">Error</p>
            <p className="text-destructive/80 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/admin/products/${productId}`)}
            className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <h1 className="text-lg font-semibold text-copy">Edit Product</h1>
            <p className="text-xs text-copy-light">Update product and variant information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-surface rounded-lg border border-border-light p-6">
          <h2 className="text-sm font-semibold text-copy mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-copy mb-1.5">
                Product Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-copy text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter product name"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-copy mb-1.5">
                Slug <span className="text-xs text-copy-light">(auto-generated)</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                readOnly
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-copy-light text-sm cursor-not-allowed"
                placeholder="auto-generated-from-name"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-copy mb-1.5">
                Category <span className="text-destructive">*</span>
              </label>
              <Dropdown
                options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                value={formData.category_id}
                onChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                placeholder="Select category"
                searchable
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-copy mb-1.5">
                Origin
              </label>
              <Dropdown
                options={getCountryOptions()}
                value={formData.origin}
                onChange={(value) => setFormData(prev => ({ ...prev, origin: value }))}
                placeholder="Select country of origin"
                searchable
                searchPlaceholder="Search countries..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-copy mb-1.5">
                Product Status
              </label>
              <Dropdown
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'discontinued', label: 'Discontinued' }
                ]}
                value={formData.product_status}
                onChange={(value) => setFormData(prev => ({ ...prev, product_status: value }))}
                placeholder="Select status"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-copy">Featured Product</label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, is_featured: !prev.is_featured }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    formData.is_featured ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.is_featured ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-copy">Bestseller</label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, is_bestseller: !prev.is_bestseller }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    formData.is_bestseller ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.is_bestseller ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-surface rounded-lg border border-border-light p-6">
          <h2 className="text-sm font-semibold text-copy mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Description
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-copy mb-1.5">
                Short Description
              </label>
              <input
                type="text"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-copy text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Brief product description"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-copy mb-1.5">
                Full Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-copy text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Detailed product description"
              />
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-surface rounded-lg border border-border-light p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-copy flex items-center gap-2">
              <Box className="w-4 h-4" />
              Product Variants ({formData.variants.length})
            </h2>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg text-xs hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Variant
            </button>
          </div>

          <div className="space-y-6">
            {formData.variants.map((variant, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-copy">Variant {index + 1}</h3>
                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-copy mb-1.5">
                      Variant Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Variant name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-copy mb-1.5">
                      SKU <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="SKU-001"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-copy mb-1.5">
                      Base Price <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="number"
                      value={variant.base_price}
                      onChange={(e) => handleVariantChange(index, 'base_price', parseFloat(e.target.value) || 0)}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-copy mb-1.5">
                      Sale Price
                    </label>
                    <input
                      type="number"
                      value={variant.sale_price || ''}
                      onChange={(e) => handleVariantChange(index, 'sale_price', e.target.value ? parseFloat(e.target.value) : undefined)}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-copy mb-1.5">
                      Stock <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', parseInt(e.target.value) || 0)}
                      required
                      min="0"
                      className="w-full px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-copy mb-1.5">
                      Barcode
                    </label>
                    <input
                      type="text"
                      value={variant.barcode || ''}
                      onChange={(e) => handleVariantChange(index, 'barcode', e.target.value)}
                      className="w-full px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Barcode"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-copy mb-1.5">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={variant.tags || ''}
                      onChange={(e) => handleVariantChange(index, 'tags', e.target.value)}
                      className="w-full px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., organic,local,fresh"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-copy mb-2">
                      Dietary Tags (select multiple)
                    </label>
                    <select
                      multiple
                      value={variant.dietary_tags || []}
                      onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                        handleVariantChange(index, 'dietary_tags', selectedOptions);
                      }}
                      className="w-full px-2 py-1.5 rounded-lg border min-h-[120px] bg-background border-border text-copy text-xs focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {DIETARY_TAGS.map(tag => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[11px] text-copy-light">
                      Hold Ctrl/Cmd to select multiple tags. Selected: {(variant.dietary_tags || []).length}
                    </p>
                    {(variant.dietary_tags || []).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(variant.dietary_tags || []).map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white text-[11px] rounded-full"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleVariantChange(index, 'dietary_tags', (variant.dietary_tags || []).filter(t => t !== tag))}
                              className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 text-xs text-copy cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={variant.is_active !== false}
                          onChange={(e) => handleVariantChange(index, 'is_active', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-border rounded-full peer-checked:bg-primary transition-colors"></div>
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                      </div>
                      Active
                    </label>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-copy">
                      Images
                    </label>
                    <button
                      type="button"
                      onClick={() => addImage(index)}
                      className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Image
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {(variant.images || []).map((img, imgIndex) => (
                      <div key={imgIndex} className="space-y-2 p-3 border border-border rounded-lg">
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={img.url}
                            onChange={(e) => handleImageChange(index, imgIndex, 'url', e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="https://example.com/image.jpg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, imgIndex)}
                            className="px-3 py-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex gap-4">
                          <input
                            type="text"
                            value={img.alt_text || ''}
                            onChange={(e) => handleImageChange(index, imgIndex, 'alt_text', e.target.value)}
                            className="flex-1 px-3 py-1.5 border border-border rounded-lg bg-background text-copy text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Alt text"
                          />
                          <button
                            type="button"
                            onClick={() => setPrimaryImage(index, imgIndex)}
                            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                              img.is_primary
                                ? 'bg-primary text-white'
                                : 'border border-border text-copy hover:bg-surface'
                            }`}
                          >
                            {img.is_primary ? 'Primary' : 'Set Primary'}
                          </button>
                        </div>
                        {img.url && (
                          <img
                            src={img.url}
                            alt={img.alt_text || 'Preview'}
                            className="h-16 w-16 object-cover rounded-lg border border-border"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/80?text=Invalid';
                            }}
                          />
                        )}
                      </div>
                    ))}
                    
                    {(!variant.images || variant.images.length === 0) && (
                      <p className="text-xs text-copy-light italic">No images added yet</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 sticky bottom-0 bg-background py-4 border-t border-border">
          <button
            type="button"
            onClick={() => navigate(`/admin/products/${productId}`)}
            className="px-4 py-1.5 border border-border rounded-lg text-copy text-sm hover:bg-surface transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader className="w-3.5 h-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
