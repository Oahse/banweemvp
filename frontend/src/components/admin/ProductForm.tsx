import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon,
  Tag,
  Package,
  DollarSign,
  Info,
  AlertCircle,
  X
} from 'lucide-react';
import AdminAPI from '../../api/admin';
import { CategoriesAPI } from '../../api';
import toast from 'react-hot-toast';
import { cn } from '../../utils/utils';
import { DIETARY_TAGS } from '../../config/product';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface ProductFormProps {
  productId?: string;
  mode: 'create' | 'edit';
}

interface ProductVariant {
  id?: string;
  name: string;
  sku: string;
  base_price: number;
  sale_price?: number;
  stock: number;
  attributes: Record<string, any>;
  image_urls: string[];
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string;
  tags: string[];
  specifications: Record<string, any>;
  dietary_tags: string[];
  origin: string;
  variants: ProductVariant[];
}

export const ProductForm: React.FC<ProductFormProps> = ({ productId, mode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    category_id: '',
    tags: [],
    specifications: {},
    dietary_tags: [],
    origin: '',
    variants: [
      {
        name: 'Default',
        sku: '',
        base_price: 0,
        sale_price: undefined,
        stock: 0,
        attributes: {},
        image_urls: []
      }
    ]
  });

  // Tag and specification inputs
  const [newTag, setNewTag] = useState('');
  const [newDietaryTag, setNewDietaryTag] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newAttributeKey, setNewAttributeKey] = useState<string[]>([]);
  const [newAttributeValue, setNewAttributeValue] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
    if (mode === 'edit' && productId) {
      fetchProduct();
    }
  }, [productId, mode]);

  const fetchCategories = async () => {
    try {
      const response = await CategoriesAPI.getCategories();
      setCategories(response.data?.categories || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await AdminAPI.getProductById(productId!);
      const product = response?.data?.data || response?.data;
      
      if (product) {
        setFormData({
          name: product.name || '',
          slug: product.slug || '',
          description: product.description || '',
          short_description: product.short_description || '',
          category_id: product.category_id || '',
          tags: product.tags || [],
          specifications: product.specifications || {},
          dietary_tags: typeof product.dietary_tags === 'object' 
            ? Object.keys(product.dietary_tags).filter(key => product.dietary_tags[key])
            : product.dietary_tags || [],
          origin: product.origin || '',
          variants: product.variants?.map((v: any) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            base_price: v.base_price,
            sale_price: v.sale_price,
            stock: v.stock || v.inventory?.quantity_available || 0,
            attributes: v.attributes || {},
            image_urls: v.images?.map((img: any) => img.url) || []
          })) || []
        });
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: generateSlug(value)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addDietaryTag = (tag: string) => {
    if (!formData.dietary_tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        dietary_tags: [...prev.dietary_tags, tag]
      }));
    }
  };

  const removeDietaryTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      dietary_tags: prev.dietary_tags.filter(t => t !== tag)
    }));
  };

  const addSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [newSpecKey.trim()]: newSpecValue.trim()
        }
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => {
      const { [key]: removed, ...rest } = prev.specifications;
      return { ...prev, specifications: rest };
    });
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          name: `Variant ${prev.variants.length + 1}`,
          sku: '',
          base_price: 0,
          sale_price: undefined,
          stock: 0,
          attributes: {},
          image_urls: []
        }
      ]
    }));
    setNewAttributeKey([...newAttributeKey, '']);
    setNewAttributeValue([...newAttributeValue, '']);
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const updateVariant = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => 
        i === index ? { ...v, [field]: value } : v
      )
    }));
  };

  const addVariantAttribute = (variantIndex: number) => {
    const key = newAttributeKey[variantIndex];
    const value = newAttributeValue[variantIndex];
    
    if (key && value) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.map((v, i) => 
          i === variantIndex 
            ? { ...v, attributes: { ...v.attributes, [key]: value } }
            : v
        )
      }));
      
      setNewAttributeKey(prev => prev.map((k, i) => i === variantIndex ? '' : k));
      setNewAttributeValue(prev => prev.map((val, i) => i === variantIndex ? '' : val));
    }
  };

  const removeVariantAttribute = (variantIndex: number, attrKey: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => {
        if (i === variantIndex) {
          const { [attrKey]: removed, ...rest } = v.attributes;
          return { ...v, attributes: rest };
        }
        return v;
      })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
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
      
      // Convert dietary_tags array to object format for backend
      const dietaryTagsObject = formData.dietary_tags.reduce((acc, tag) => {
        acc[tag.toLowerCase().replace(/[^a-z0-9]/g, '_')] = true;
        return acc;
      }, {} as Record<string, boolean>);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        short_description: formData.short_description || undefined,
        category_id: formData.category_id,
        tags: formData.tags.join(','),
        specifications: Object.keys(formData.specifications).length > 0 ? formData.specifications : undefined,
        dietary_tags: dietaryTagsObject,
        origin: formData.origin || undefined,
        variants: formData.variants.map(v => ({
          id: v.id,
          name: v.name,
          sku: v.sku || `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          base_price: parseFloat(String(v.base_price)),
          sale_price: v.sale_price ? parseFloat(String(v.sale_price)) : undefined,
          stock: parseInt(String(v.stock)),
          attributes: v.attributes,
          image_urls: v.image_urls
        }))
      };

      if (mode === 'create') {
        await AdminAPI.createProduct(payload);
        toast.success('Product created successfully');
      } else {
        await AdminAPI.updateProduct(productId!, payload);
        toast.success('Product updated successfully');
      }
      
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Failed to save product:', error);
      toast.error(error?.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Create Product' : 'Edit Product'}
          </h1>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Organic Whole Wheat Flour"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="organic-whole-wheat-flour"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated from product name</p>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, short_description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief product summary (100-200 characters)"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.short_description.length}/200 characters
                </p>
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed product description..."
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Specifications</h2>
            </div>
            
            <div className="space-y-3">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span className="font-medium text-sm text-gray-700 flex-1">{key}:</span>
                  <span className="text-sm text-gray-600 flex-1">{String(value)}</span>
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  placeholder="Key (e.g., Weight)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Value (e.g., 1kg)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addSpecification}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Variants */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Product Variants</h2>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.variants.map((variant, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Variant {index + 1}</h3>
                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Variant Name
                      </label>
                      <input
                        type="text"
                        value={variant.name}
                        onChange={(e) => updateVariant(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 1kg Package"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        SKU
                      </label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Auto-generated if empty"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Base Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={variant.base_price}
                        onChange={(e) => updateVariant(index, 'base_price', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sale Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={variant.sale_price || ''}
                        onChange={(e) => updateVariant(index, 'sale_price', e.target.value ? parseFloat(e.target.value) : undefined)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Optional"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Variant Attributes */}
                  <div className="pt-3 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attributes
                    </label>
                    <div className="space-y-2">
                      {Object.entries(variant.attributes).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-700 flex-1">{key}: {String(value)}</span>
                          <button
                            type="button"
                            onClick={() => removeVariantAttribute(index, key)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAttributeKey[index] || ''}
                          onChange={(e) => {
                            const newKeys = [...newAttributeKey];
                            newKeys[index] = e.target.value;
                            setNewAttributeKey(newKeys);
                          }}
                          placeholder="Key (e.g., Size)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          value={newAttributeValue[index] || ''}
                          onChange={(e) => {
                            const newValues = [...newAttributeValue];
                            newValues[index] = e.target.value;
                            setNewAttributeValue(newValues);
                          }}
                          placeholder="Value (e.g., Large)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => addVariantAttribute(index)}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category & Origin */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Category & Origin</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origin
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Canada, USA"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dietary Tags */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dietary Tags</h2>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {formData.dietary_tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeDietaryTag(tag)}
                      className="hover:bg-green-200 rounded"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-gray-500">Quick add:</p>
                <div className="flex flex-wrap gap-1">
                  {DIETARY_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addDietaryTag(tag)}
                      disabled={formData.dietary_tags.includes(tag)}
                      className={cn(
                        "px-2 py-1 text-xs rounded-md transition-colors",
                        formData.dietary_tags.includes(tag)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDietaryTag}
                  onChange={(e) => setNewDietaryTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), newDietaryTag && addDietaryTag(newDietaryTag))}
                  placeholder="Custom dietary tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newDietaryTag.trim()) {
                      addDietaryTag(newDietaryTag.trim());
                      setNewDietaryTag('');
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
