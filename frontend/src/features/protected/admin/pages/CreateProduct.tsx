import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Package, X } from 'lucide-react';
import { useTheme } from '@/components/shared/contexts/ThemeContext';
import AdminAPI from '@/api/admin';
import { CategoriesAPI } from '@/api';
import toast from 'react-hot-toast';
import { DIETARY_TAGS } from '@/config/product';
import Dropdown from '@/components/ui/Dropdown';
import { getCountryOptions } from '@/data/countries';
import { AdminLayout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';

interface Category {
  id: string;
  name: string;
}

interface ProductVariant {
  name: string;
  sku: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  attributes: Record<string, any>;
  dietary_tags: string[];
  tags?: string;
  specifications?: Record<string, any>;
  is_active: boolean;
  image_urls: string[];
}

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    category_id: '',
    origin: '',
    is_featured: false,
    is_bestseller: false,
    variants: [
      {
        name: 'Default',
        sku: '',
        base_price: 0,
        sale_price: undefined as number | undefined,
        stock: 0,
        attributes: {},
        dietary_tags: [] as string[],
        tags: '',
        specifications: {},
        is_active: true,
        image_urls: [] as string[]
      }
    ] as ProductVariant[]
  });
  
  const [currentImageUrl, setCurrentImageUrl] = useState<string[]>(['']);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategories(response.data?.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const updateField = (field: string, value: any) => {
    if (field === 'name') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, name: value, slug }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const updateVariant = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => {
        if (i === index) {
          const updated = { ...v, [field]: value };
          // Auto-generate SKU when name changes
          if (field === 'name') {
            const skuBase = value.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            updated.sku = `${skuBase}-${Date.now().toString(36).substr(-4)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
          }
          return updated;
        }
        return v;
      })
    }));
  };

  const addVariant = () => {
    const variantNum = formData.variants.length + 1;
    const variantName = `Variant ${variantNum}`;
    const skuBase = variantName.toUpperCase().replace(/[^A-Z0-9]+/g, '-');
    const generatedSku = `${skuBase}-${Date.now().toString(36).substr(-4)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, {
        name: variantName,
        sku: generatedSku,
        base_price: 0,
        sale_price: undefined,
        stock: 0,
        attributes: {},
        dietary_tags: [],
        tags: '',
        specifications: {},
        is_active: true,
        image_urls: []
      }]
    }));
    setCurrentImageUrl(prev => [...prev, '']);
  };

  const removeVariant = (index: number) => {
    if (formData.variants.length > 1) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
      }));
      setCurrentImageUrl(prev => prev.filter((_, i) => i !== index));
    }
  };

  const addImageToVariant = (variantIndex: number) => {
    const url = currentImageUrl[variantIndex]?.trim();
    if (url) {
      updateVariant(variantIndex, 'image_urls', [...formData.variants[variantIndex].image_urls, url]);
      const newUrls = [...currentImageUrl];
      newUrls[variantIndex] = '';
      setCurrentImageUrl(newUrls);
    }
  };

  const removeImageFromVariant = (variantIndex: number, imageIndex: number) => {
    updateVariant(
      variantIndex,
      'image_urls',
      formData.variants[variantIndex].image_urls.filter((_, i) => i !== imageIndex)
    );
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.category_id) {
      toast.error('Category is required');
      return;
    }
    if (formData.variants.length === 0) {
      toast.error('At least one variant is required');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        short_description: formData.short_description || undefined,
        category_id: formData.category_id,
        origin: formData.origin || undefined,
        is_featured: formData.is_featured,
        is_bestseller: formData.is_bestseller,
        variants: formData.variants.map(v => ({
          name: v.name,
          sku: v.sku || `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          base_price: parseFloat(String(v.base_price)),
          sale_price: v.sale_price ? parseFloat(String(v.sale_price)) : undefined,
          stock: parseInt(String(v.stock)) || 0,
          attributes: v.attributes,
          dietary_tags: v.dietary_tags,
          tags: v.tags || undefined,
          specifications: v.specifications || undefined,
          is_active: v.is_active,
          image_urls: v.image_urls
        }))
      };

      await AdminAPI.createProduct(payload);
      toast.success('Product created successfully');
      // Dispatch custom event to notify products list
      window.dispatchEvent(new CustomEvent('product:created', { detail: { payload } }));
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Failed to create product:', error);
      toast.error(error?.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
    <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-4">
          <Button
            type="button"
            onClick={() => navigate('/admin/products')}
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 mb-3 text-sm ${currentTheme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            leftIcon={<ArrowLeft size={16} />}
          >
            Back to Products
          </Button>
          <h1 className={`text-2xl font-semibold ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Create New Product
          </h1>
          <p className={`mt-1 text-sm ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Add a new product to your inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className={`${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5`}>
            <h2 className={`text-lg font-medium mb-3 ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-2 py-1 rounded-lg border ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Slug <span className="text-xs text-gray-500">(auto-generated)</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  readOnly
                  className={`w-full px-2 py-1 rounded-lg border bg-opacity-50 cursor-not-allowed ${
                    currentTheme === 'dark'
                      ? 'bg-gray-800 border-gray-600 text-gray-400'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                  }`}
                  placeholder="auto-generated-from-name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <Dropdown
                  options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                  value={formData.category_id}
                  onChange={(value) => updateField('category_id', value)}
                  placeholder="Select a category"
                  searchable
                  className="w-full"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Origin
                </label>
                <Dropdown
                  options={getCountryOptions()}
                  value={formData.origin}
                  onChange={(value) => updateField('origin', value)}
                  placeholder="Select country of origin"
                  searchable
                  searchPlaceholder="Search countries..."
                  className="w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => updateField('short_description', e.target.value)}
                  className={`w-full px-2 py-1 rounded-lg border ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Brief description"
                />
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={3}
                  className={`w-full px-2 py-1 rounded-lg border ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Full product description"
                />
              </div>

              {/* Marketing Flags */}
              <div className="md:col-span-2">
                <label className={`block text-sm font-medium mb-3 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Marketing Options
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Featured Product
                    </label>
                    <Button
                      type="button"
                      onClick={() => updateField('is_featured', !formData.is_featured)}
                      variant="ghost"
                      size="sm"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        formData.is_featured ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.is_featured ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Bestseller
                    </label>
                    <Button
                      type="button"
                      onClick={() => updateField('is_bestseller', !formData.is_bestseller)}
                      variant="ghost"
                      size="sm"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        formData.is_bestseller ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.is_bestseller ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className={`${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-lg font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Product Variants
              </h2>
              <Button
                type="button"
                onClick={addVariant}
                variant="primary"
                size="sm"
                className="flex items-center gap-2 px-2 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                leftIcon={<Plus size={14} />}
              >
                Add Variant
              </Button>
            </div>

            <div className="space-y-4">
              {formData.variants.map((variant, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    currentTheme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      <h3 className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Variant {index + 1}
                      </h3>
                    </div>
                    {formData.variants.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeVariant(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        leftIcon={<Trash2 size={14} />}
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Variant Name *
                      </label>
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(e) => updateVariant(index, 'name', e.target.value)}
                        className={`w-full px-2 py-1 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="e.g., 1kg, Small, Red"
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        SKU <span className="text-xs text-gray-500">(auto-generated)</span>
                      </label>
                      <input
                        type="text"
                        value={variant.sku}
                        readOnly
                        className={`w-full px-2 py-1 rounded-lg border bg-opacity-50 cursor-not-allowed ${
                          currentTheme === 'dark'
                            ? 'bg-gray-800 border-gray-600 text-gray-400'
                            : 'bg-gray-100 border-gray-300 text-gray-600'
                        }`}
                        placeholder="Auto-generated from variant name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Initial Stock
                      </label>
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                        className={`w-full px-2 py-1 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Base Price * ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={variant.base_price}
                        onChange={(e) => updateVariant(index, 'base_price', parseFloat(e.target.value) || 0)}
                        className={`w-full px-2 py-1 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="0.00"
                        min="0"
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Sale Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={variant.sale_price || ''}
                        onChange={(e) => updateVariant(index, 'sale_price', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className={`w-full px-2 py-1 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="Optional"
                        min="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Active
                      </label>
                      <Button
                        type="button"
                        onClick={() => updateVariant(index, 'is_active', !variant.is_active)}
                        variant="ghost"
                        size="sm"
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                          variant.is_active ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            variant.is_active ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Dietary Tags for this variant */}
                  <div className="mt-4">
                    <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Dietary Tags (select multiple)
                    </label>
                    <select
                      multiple
                      value={variant.dietary_tags}
                      onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                        updateVariant(index, 'dietary_tags', selectedOptions);
                      }}
                      className={`w-full px-2 py-1 rounded-lg border min-h-[120px] ${
                        currentTheme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary focus:border-transparent`}
                    >
                      {DIETARY_TAGS.map(tag => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                    <p className={`mt-1 text-xs ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Hold Ctrl/Cmd to select multiple tags. Selected: {variant.dietary_tags.length}
                    </p>
                    {variant.dietary_tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {variant.dietary_tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white text-xs rounded-full"
                          >
                            {tag}
                            <Button
                              type="button"
                              onClick={() => updateVariant(index, 'dietary_tags', variant.dietary_tags.filter(t => t !== tag))}
                              variant="ghost"
                              size="sm"
                              className="hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
                              leftIcon={<X size={12} />}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tags field */}
                  <div className="mt-3">
                    <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={variant.tags || ''}
                      onChange={(e) => updateVariant(index, 'tags', e.target.value)}
                      className={`w-full px-2 py-1 rounded-lg border ${
                        currentTheme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-primary focus:border-transparent`}
                      placeholder="e.g., organic,local,fresh"
                    />
                  </div>

                  {/* Images */}
                  <div className="mt-3">
                    <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Product Images
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={currentImageUrl[index] || ''}
                        onChange={(e) => {
                          const newUrls = [...currentImageUrl];
                          newUrls[index] = e.target.value;
                          setCurrentImageUrl(newUrls);
                        }}
                        className={`flex-1 px-2 py-1 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="Enter image URL"
                      />
                      <Button
                        type="button"
                        onClick={() => addImageToVariant(index)}
                        variant="primary"
                        size="sm"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                        leftIcon={<Plus size={14} />}
                      >
                        Add Image
                      </Button>
                    </div>
                    {variant.image_urls.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {variant.image_urls.map((url, imgIndex) => (
                          <div
                            key={imgIndex}
                            className={`relative group rounded-lg overflow-hidden border-2 ${
                              currentTheme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                            }`}
                          >
                            <img src={url} alt="" className="w-20 h-20 object-cover" />
                            <Button
                              type="button"
                              onClick={() => removeImageFromVariant(index, imgIndex)}
                              variant="ghost"
                              size="sm"
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              leftIcon={<Trash2 size={12} />}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              onClick={() => navigate('/admin/products')}
              variant="outline"
              size="sm"
              className={`px-5 py-2.5 rounded-lg text-sm ${
                currentTheme === 'dark'
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="sm"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              leftIcon={<Save size={16} />}
              isLoading={loading}
            >
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </AdminLayout>
  );
};

export default CreateProduct;
