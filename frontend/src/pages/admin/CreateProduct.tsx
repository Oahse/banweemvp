import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Package } from 'lucide-react';
import { useTheme } from '../../store/ThemeContext';
import AdminAPI from '../../api/admin';
import { CategoriesAPI } from '../../api';
import toast from 'react-hot-toast';

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
    dietary_tags: [] as string[],
    variants: [
      {
        name: 'Default',
        sku: '',
        base_price: 0,
        sale_price: undefined as number | undefined,
        stock: 0,
        attributes: {},
        image_urls: [] as string[]
      }
    ] as ProductVariant[]
  });

  const [currentImageUrl, setCurrentImageUrl] = useState<string[]>(['']);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);

  const dietaryOptions = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Organic', 'Non-GMO', 'Kosher', 'Halal'];

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
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'name' && !formData.slug) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const updateVariant = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((v, i) => i === index ? { ...v, [field]: value } : v)
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, {
        name: `Variant ${prev.variants.length + 1}`,
        sku: '',
        base_price: 0,
        sale_price: undefined,
        stock: 0,
        attributes: {},
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

  const toggleDietaryTag = (tag: string) => {
    setSelectedDietaryTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
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

      const dietaryTagsObject = selectedDietaryTags.reduce((acc, tag) => {
        acc[tag.toLowerCase().replace(/[^a-z0-9]/g, '_')] = true;
        return acc;
      }, {} as Record<string, boolean>);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || undefined,
        short_description: formData.short_description || undefined,
        category_id: formData.category_id,
        dietary_tags: dietaryTagsObject,
        origin: formData.origin || undefined,
        variants: formData.variants.map(v => ({
          name: v.name,
          sku: v.sku || `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          base_price: parseFloat(String(v.base_price)),
          sale_price: v.sale_price ? parseFloat(String(v.sale_price)) : undefined,
          stock: parseInt(String(v.stock)) || 0,
          attributes: v.attributes,
          image_urls: v.image_urls
        }))
      };

      await AdminAPI.createProduct(payload);
      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (error: any) {
      console.error('Failed to create product:', error);
      toast.error(error?.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className={`flex items-center gap-2 mb-3 text-sm ${currentTheme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
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
                  className={`w-full px-3 py-2 rounded-lg border ${
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
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => updateField('slug', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="auto-generated-slug"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => updateField('category_id', e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Origin
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => updateField('origin', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="e.g., USA, Local"
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
                  className={`w-full px-3 py-2 rounded-lg border ${
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
                  className={`w-full px-3 py-2 rounded-lg border ${
                    currentTheme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Full product description"
                />
              </div>
            </div>

            {/* Dietary Tags */}
            <div className="mt-4">
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Dietary Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleDietaryTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedDietaryTags.includes(tag)
                        ? 'bg-primary text-white'
                        : currentTheme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className={`${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className={`text-lg font-medium ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Product Variants
              </h2>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Variant
              </button>
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
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
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
                        className={`w-full px-3 py-2 rounded-lg border ${
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
                        SKU
                      </label>
                      <input
                        type="text"
                        value={variant.sku}
                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="Auto-generated"
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
                        className={`w-full px-3 py-2 rounded-lg border ${
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
                        className={`w-full px-3 py-2 rounded-lg border ${
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
                        className={`w-full px-3 py-2 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="Optional"
                        min="0"
                      />
                    </div>
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
                        className={`flex-1 px-3 py-2 rounded-lg border ${
                          currentTheme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-primary`}
                        placeholder="Enter image URL"
                      />
                      <button
                        type="button"
                        onClick={() => addImageToVariant(index)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
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
                            <button
                              type="button"
                              onClick={() => removeImageFromVariant(index, imgIndex)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
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
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className={`px-5 py-2.5 rounded-lg text-sm ${
                currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
