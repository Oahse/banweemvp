import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader, AlertCircle, Package, DollarSign, Tag, FileText, Image as ImageIcon, Plus, Trash2, Box, X } from 'lucide-react';
import AdminAPI from '@/api/admin';
import { CategoriesAPI } from '@/api';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import { getCountryOptions } from '@/data/countries';
import { DIETARY_TAGS } from '@/config/product';
import { AdminLayout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text, Label } from '@/components/ui/Text/Text';

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
          ...(v.id ? { id: v.id } : {}),
          name: v.name,
          sku: v.sku,
          base_price: v.base_price,
          sale_price: v.sale_price !== undefined && v.sale_price !== null ? v.sale_price : undefined,
          stock: v.stock,
          attributes: v.attributes,
          specifications: v.specifications,
          dietary_tags: v.dietary_tags,
          tags: v.tags,
          is_active: v.is_active,
          availability_status: v.availability_status,
          barcode: v.barcode,
          qr_code: v.qr_code,
          images: (v.images || []).filter(img => img.url).map(img => ({
            ...(img.id ? { id: img.id } : {}),
            url: img.url,
            alt_text: img.alt_text || '',
            is_primary: img.is_primary || false,
            sort_order: img.sort_order || 0
          }))
        }))
      };
      
      console.log('📤 Sending update data to API:', JSON.stringify(updateData, null, 2));
      console.log('🖼️ Variant 0 images being sent:', updateData.variants[0]?.images);
      console.log('🖼️ Variant 1 images being sent:', updateData.variants[1]?.images);
      
      const response = await AdminAPI.updateProduct(productId, updateData);
      
      console.log('✅ API Response:', response);
      console.log('📊 Response Data:', response?.data);
      console.log('✅ Product updated successfully');
      
      toast.success('Product updated successfully');
      
      // Reload the product data to show updated images
      await fetchData();
      
    } catch (err: any) {
      console.error('❌ Error updating product:', err);
      console.error('🔍 Error response:', err?.response?.data);
      console.error('🔍 Error message:', err?.message);
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
  return (
    <div className="p-6 space-y-4">
      <Button
        onClick={() => navigate('/admin/products')}
        variant="ghost"
        size="sm"
        className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
        leftIcon={<ArrowLeft size={16} />}
      >
        <Text variant="body-sm">Back to Products</Text>
      </Button>
      
      <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <Text weight="semibold" tone="danger">Error</Text>
          // ... (rest of the code remains the same)
}

// ... (rest of the code remains the same)

<AdminLayout>
  <div className="p-6 space-y-6 max-w-7xl">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate(`/admin/products/${productId}`)}
          variant="ghost"
          size="sm"
          className="inline-flex items-center gap-2 text-copy-light hover:text-copy transition-colors"
          leftIcon={<ArrowLeft size={16} />}
        >
          <Text variant="body-sm">Back to Product</Text>
        </Button>
        <div>
          <Heading level={1}>Edit Product</Heading>
          <Text variant="caption" tone="secondary">Update product and variant information</Text>
        </div>
      </div>
    // ... (rest of the code remains the same)

    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label weight="medium">Featured Product</Label>
        <Button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, is_featured: !prev.is_featured }))}
          variant="ghost"
          size="sm"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            formData.is_featured ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.is_featured ? 'translate-x-6' : 'translate-x-1'
            }`}
          ></Text>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Label weight="medium">Bestseller</Label>
        <Button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, is_bestseller: !prev.is_bestseller }))}
          variant="ghost"
          size="sm"
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            formData.is_bestseller ? 'bg-primary' : 'bg-gray-200'
          }`}
        >
          <Text
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              formData.is_bestseller ? 'translate-x-6' : 'translate-x-1'
            }`}
          ></Text>
        </Button>
      </div>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
    </AdminLayout>
  );
};

export default EditProduct;
