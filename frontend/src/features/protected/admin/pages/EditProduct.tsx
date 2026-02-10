import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import AdminAPI from '@/api/admin';
import { CategoriesAPI } from '@/api';
import toast from 'react-hot-toast';
import Dropdown from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Form/Input';
import { Textarea } from '@/components/ui/Form/Textarea';
import { AdminLayout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Heading, Text, Label } from '@/components/ui/Text/Text';

interface Variant {
  id?: string;
  name: string;
  sku: string;
  base_price: number;
  stock: number;
}

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string;
  origin: string;
  product_status: string;
  is_featured: boolean;
  is_bestseller: boolean;
  variants: Variant[];
}

export const EditProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    category_id: '',
    origin: '',
    product_status: 'active',
    is_featured: false,
    is_bestseller: false,
    variants: [
      { name: '', sku: '', base_price: 0, stock: 0 }
    ]
  });

  useEffect(() => {
    if (!productId) {
      setError('Product ID is required');
      setLoading(false);
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, productRes] = await Promise.all([
        CategoriesAPI.getCategories(),
        AdminAPI.getProductById(productId!)
      ]);

      const cats = categoriesRes?.data?.data || categoriesRes?.data || [];
      setCategories(Array.isArray(cats) ? cats : []);

      const product = productRes?.data?.data || productRes?.data || productRes;
      if (product) {
        setFormData({
          name: product.name || '',
          slug: product.slug || '',
          description: product.description || '',
          short_description: product.short_description || '',
          category_id: product.category_id || '',
          origin: product.origin || '',
          product_status: product.product_status || 'active',
          is_featured: !!product.is_featured,
          is_bestseller: !!product.is_bestseller,
          variants: (product.variants || []).length > 0
            ? product.variants.map((v: any) => ({
                id: v.id,
                name: v.name || '',
                sku: v.sku || '',
                base_price: v.base_price || 0,
                stock: v.stock ?? v.inventory?.quantity_available ?? 0
              }))
            : [{ name: '', sku: '', base_price: 0, stock: 0 }]
        });
      }
    } catch (err: any) {
      console.error('Error fetching product:', err);
      const message = err?.response?.data?.message || err?.message || 'Failed to load product';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const parsed = type === 'number' ? (Number(value) || 0) : value;
    setFormData(prev => ({ ...prev, [name]: parsed } as ProductForm));
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: any) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      (newVariants[index] as any)[field] = value;
      return { ...prev, variants: newVariants };
    });
  };

  const addVariant = () => {
    setFormData(prev => ({ ...prev, variants: [...prev.variants, { name: '', sku: '', base_price: 0, stock: 0 }] }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    try {
      setSaving(true);
      const payload = { ...formData };
      await AdminAPI.updateProduct(productId, payload);
      toast.success('Product updated successfully');
      await fetchData();
    } catch (err: any) {
      console.error('Error saving product:', err);
      const message = err?.response?.data?.message || err?.message || 'Failed to save product';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AnimatedLoader size="lg" variant="spinner" color="primary" text="Loading product..." />
      </div>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <Text weight="semibold" tone="danger">Error</Text>
              <Text variant="body-sm">{error}</Text>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl">
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
              <Heading level={5}>Edit Product</Heading>
              <Text variant="caption" tone="secondary">Update product and variant information</Text>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Product Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Category</Label>
            <Dropdown
              options={[{ value: '', label: 'Select category' }, ...categories.map(c => ({ value: c.id, label: c.name }))]}
              value={formData.category_id}
              onChange={(v: string) => setFormData(prev => ({ ...prev, category_id: v }))}
            />
          </div>

          <div>
            <Textarea
              label="Description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <Label>Variants</Label>
            <div className="space-y-3">
              {formData.variants.map((v, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-2 items-end">
                  <div>
                    <Input label="Variant name" value={v.name} onChange={(e) => handleVariantChange(idx, 'name', (e.target as HTMLInputElement).value)} />
                  </div>
                  <div>
                    <Input label="SKU" value={v.sku} onChange={(e) => handleVariantChange(idx, 'sku', (e.target as HTMLInputElement).value)} />
                  </div>
                  <div>
                    <Input label="Price" type="number" value={v.base_price} onChange={(e) => handleVariantChange(idx, 'base_price', Number((e.target as HTMLInputElement).value))} />
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <Input label="Stock" type="number" value={v.stock} onChange={(e) => handleVariantChange(idx, 'stock', Number((e.target as HTMLInputElement).value))} />
                    </div>
                    <div className="pt-6">
                      <Button type="button" variant="ghost" onClick={() => removeVariant(idx)}>Remove</Button>
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <Button type="button" variant="outline" onClick={addVariant} leftIcon={<Save size={14} />}>Add variant</Button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" variant="primary" disabled={saving} leftIcon={<Save size={16} />}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')}>Cancel</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
