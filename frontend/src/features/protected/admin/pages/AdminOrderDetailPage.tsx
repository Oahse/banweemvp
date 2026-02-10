import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader, AlertCircle, ArrowLeft, DownloadIcon, MapPin, Truck, Package, DollarSign, Clock, CheckCircle } from 'lucide-react';
import AdminAPI from '@/api/admin';
import apiClient from '@/api/client';
import { Dropdown } from '@/components/ui/Dropdown';
import toast from 'react-hot-toast';
import AdminLayout from '@/../components/layout/AdminLayout';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import AdminLayoutSkeleton from '@/components/skeletons/AdminLayoutSkeleton';
import { OrderDetailSkeleton } from '@/components/skeletons/OrdersSkeleton';
import { Button } from '@/components/ui/Button';
import { Heading, Body, Text } from '@/components/ui/Text/Text';

interface OrderDetail {
  id: string;
  order_number: string;
  user_email: string;
  user?: {
    firstname?: string;
    lastname?: string;
    email: string;
    phone?: string;
  };
  total_amount: number;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  tax_rate: number;
  currency: string;
  order_status: string;
  payment_status: string;
  fulfillment_status: string;
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  shipping_method?: string;
  shipping_address?: any;
  billing_address?: any;
  tracking_number?: string;
  carrier?: string;
  customer_notes?: string;
  internal_notes?: string;
  items?: OrderItem[];
  source?: string;
  subscription_id?: string;
  [key: string]: any;
}

interface OrderItem {
  id: string;
  product_id?: string;
  product_name?: string;
  variant_id?: string;
  variant_name?: string;
  sku?: string;
  quantity: number;
  unit_price?: number;
  price_per_unit?: number;
  total_price?: number;
  product?: { id: string; name?: string; slug?: string };
  variant?: { id: string; sku?: string; name?: string; images?: { id: string; url: string; alt_text?: string; is_primary?: boolean }[] };
  [key: string]: any;
}

export const AdminOrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'items' | 'shipping' | 'notes'>('overview');
  const [invoicePreviewHtml, setInvoicePreviewHtml] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!orderId) {
          setError('Order ID not provided');
          return;
        }

        const response = await AdminAPI.getOrder(orderId);
        // Response structure: { success: true, data: {...order data...} }
        const data = response?.data || response;
        console.log('Order data received:', data);
        console.log('Order items:', data?.items);
        setOrder(data);
        setNewStatus((data?.order_status || data?.status || '').toString().toUpperCase());
      } catch (err: any) {
        const message = err?.response?.data?.message || 'Failed to load order details';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusUpdate = async () => {
    if (!orderId || !newStatus || newStatus === order?.order_status) {
      return;
    }

    try {
      setUpdating(true);
      // Backend expects lowercase status values; convert before sending
      await AdminAPI.updateOrderStatus(orderId, newStatus.toLowerCase());
      toast.success('Order status updated successfully');
      if (order) {
        setOrder({ ...order, order_status: newStatus.toLowerCase() });
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Failed to update order status';
      toast.error(message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDownloadInvoice = async () => {
    if (!orderId) return;
    try {
      setPreviewLoading(true);

      // Try fetching as blob to detect content-type (PDF vs JSON/HTML)
      const client = apiClient.getClient();
      const resp = await client.get(`/admin/orders/${orderId}/invoice`, { responseType: 'blob' });

      const contentType = resp.headers['content-type'] || '';

      // If it's a PDF (or other binary), trigger download
      if (contentType.includes('application/pdf') || contentType.includes('application/octet-stream')) {
        const blob = new Blob([resp.data], { type: contentType });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `invoice-${orderId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        toast.success('Invoice downloaded');
        return;
      }

      // Otherwise attempt to parse text (could be JSON or HTML)
      const text = await resp.data.text();

      // Try JSON first
      try {
        const json = JSON.parse(text);
        // If backend returned an invoice object with html or invoice_content, prefer that
        if (json?.invoice_html || json?.html || json?.invoice_content) {
          setInvoicePreviewHtml(json.invoice_html || json.html || json.invoice_content);
          toast.success('Invoice preview loaded');
          return;
        }

        // If backend returned an invoice_path (server generated file), trigger download via AdminAPI
        if (json?.invoice_path) {
          await AdminAPI.getOrderInvoice(orderId);
          toast.success('Invoice downloaded');
          return;
        }

        // Otherwise stringify and show
        setInvoicePreviewHtml(`<pre>${JSON.stringify(json, null, 2)}</pre>`);
        toast.success('Invoice preview loaded');
        return;
      } catch (e) {
        // Not JSON — assume it's HTML
        setInvoicePreviewHtml(text);
        toast.success('Invoice preview loaded');
        return;
      }
    } catch (err: any) {
      // Fallback: call AdminAPI.download which uses apiClient.download
      try {
        await AdminAPI.getOrderInvoice(orderId);
        toast.success('Invoice downloaded');
      } catch (e) {
        toast.error('Failed to download invoice');
      }
    } finally {
      setPreviewLoading(false);
    }
  };

  const formatCurrency = (amount: number | undefined | null) => {
    const n = Number(amount);
    if (n !== n || n < 0) return new Intl.NumberFormat('en-US', { style: 'currency', currency: order?.currency || 'USD' }).format(0);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: order?.currency || 'USD',
    }).format(n);
  };

  const getStatusColor = (status: string) => {
    const key = String(status || '').toUpperCase();
    const statusMap: Record<string, string> = {
      'PENDING': 'bg-orange text-black dark:bg-orange-dark dark:text-white',
      'PROCESSING': 'bg-info text-black dark:bg-info-dark dark:text-white',
      'SHIPPED': 'bg-purple text-black dark:bg-purple-dark dark:text-white',
      'DELIVERED': 'bg-success text-black dark:bg-success-dark dark:text-white',
      'CANCELLED': 'bg-error text-black dark:bg-error-dark dark:text-white',
      'RETURNED': 'bg-warning text-black dark:bg-warning-dark dark:text-white',
    };
    return statusMap[key] || 'bg-gray-100 text-black dark:bg-gray-700 dark:text-white';
  };

  const getPaymentStatusColor = (status: string) => {
    const key = String(status || '').toUpperCase();
    const statusMap: Record<string, string> = {
      'PAID': 'bg-success text-black dark:bg-success-dark dark:text-white',
      'PENDING': 'bg-orange text-black dark:bg-orange-dark dark:text-white',
      'FAILED': 'bg-error text-black dark:bg-error-dark dark:text-white',
      'REFUNDED': 'bg-purple text-black dark:bg-purple-dark dark:text-white',
    };
    return statusMap[key] || 'bg-gray-100 text-black dark:bg-gray-700 dark:text-white';
  };

  const getFulfillmentStatusColor = (status: string) => {
    const key = String(status || '').toUpperCase();
    const statusMap: Record<string, string> = {
      'FULFILLED': 'bg-success text-black dark:bg-success-dark dark:text-white',
      'UNFULFILLED': 'bg-orange text-black dark:bg-orange-dark dark:text-white',
      'PARTIALLY_FULFILLED': 'bg-warning text-black dark:bg-warning-dark dark:text-white',
      'PENDING': 'bg-orange text-black dark:bg-orange-dark dark:text-white',
      'PROCESSING': 'bg-info text-black dark:bg-info-dark dark:text-white',
    };
    return statusMap[key] || 'bg-gray-100 text-black dark:bg-gray-700 dark:text-white';
  };

  const formatStatus = (status?: string) => {
    if (!status) return '-';
    const s = String(status || '').toLowerCase();
    // replace underscores and hyphens with spaces, capitalize first letter
    const cleaned = s.replace(/[_-]/g, ' ');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  if (loading) {
    return <AdminLayoutSkeleton />;
  }

  if (error || !order) {
    return (
      <AdminLayout>
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/admin/orders')}
              variant="ghost"
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="w-5 h-5" />
              <Text>Back to Orders</Text>
            </Button>
          </div>

          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <Body className="font-semibold text-destructive">Error</Body>
              <Body className="text-destructive/80 text-sm">{error || 'Order not found'}</Body>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/admin/orders')}
              variant="ghost"
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Orders
            </Button>
            <div>
              <Heading level={1} className="text-xl font-bold text-copy">Order #{order.order_number}</Heading>
              <Body className="text-xs text-copy-light">{order.id}</Body>
            </div>
          </div>
          <Button
            onClick={handleDownloadInvoice}
            variant="primary"
            size="sm"
            leftIcon={<DownloadIcon size={16} />}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-copy-inverse rounded-lg hover:bg-primary/90 transition"
          >
            Download Invoice
          </Button>
        </div>

        {/* Invoice Preview / Download */}
        <div>
          {previewLoading && (
            <div className="mb-4">
              <Body className="text-sm text-copy-light">Loading invoice preview...</Body>
            </div>
          )}

          {invoicePreviewHtml && (
            <div className="mb-6 bg-surface rounded-lg border border-border-light p-4">
              <div className="flex items-center justify-between mb-3">
                <Body className="font-semibold">Invoice Preview</Body>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => window.print()}
                    variant="ghost"
                    size="sm"
                    className="px-3 py-1 bg-muted rounded text-sm"
                  >
                    Print
                  </Button>
                  <Button
                    onClick={() => AdminAPI.getOrderInvoice(orderId || '')}
                    variant="primary"
                    size="sm"
                    className="px-3 py-1 bg-primary text-copy-inverse rounded text-sm"
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
              <div className="overflow-auto max-h-[60vh] border border-border-light">
                <Text as="div" className="p-4" html={invoicePreviewHtml || ''}>
                  {/* Content rendered via html prop */}
                </Text>
              </div>
            </div>
          )}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Order Status */}
          <div className="bg-surface rounded-lg border border-border-light p-4">
            <div className="flex items-center justify-between mb-2">
              <Body className="text-sm text-copy-light">Order Status</Body>
              <Package className="w-4 h-4 text-primary" />
            </div>
            <Text className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${getStatusColor(order.order_status)}`}>
              {formatStatus(order.order_status)}
            </Text>
          </div>

          {/* Payment Status */}
          <div className="bg-surface rounded-lg border border-border-light p-4">
            <div className="flex items-center justify-between mb-2">
              <Body className="text-sm text-copy-light">Payment Status</Body>
              <DollarSign className="w-4 h-4 text-success" />
            </div>
            <Text className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${getPaymentStatusColor(order.payment_status)}`}>
              {formatStatus(order.payment_status)}
            </Text>
          </div>

          {/* Fulfillment Status */}
          <div className="bg-surface rounded-lg border border-border-light p-4">
            <div className="flex items-center justify-between mb-2">
              <Body className="text-sm text-copy-light">Fulfillment</Body>
              <CheckCircle className="w-4 h-4 text-success" />
            </div>
            <Text className={`px-3 py-1 rounded-full text-xs font-small w-fit ${getFulfillmentStatusColor(order.fulfillment_status)}`}>
              {formatStatus(order.fulfillment_status)}
            </Text>
          </div>

          {/* Order Total */}
          <div className="bg-surface rounded-lg border border-border-light p-4">
            <div className="flex items-center justify-between mb-2">
              <Body className="text-sm text-copy-light">Total Amount</Body>
              <DollarSign className="w-4 h-4 text-success" />
            </div>
            <Body className="text-base font-semibold text-copy">{formatCurrency(order.total_amount)}</Body>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border-light">
          {(['overview', 'items', 'shipping', 'notes'] as const).map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant={activeTab === tab ? 'primary' : 'ghost'}
              size="sm"
              className={`px-4 py-2 font-semibold capitalize transition ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-copy-light hover:text-copy-dark'
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* General Information */}
              <div className="bg-surface rounded-lg border border-border-light p-6">
                <Heading level={3} className="text-base font-semibold text-copy mb-4">General Information</Heading>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text className="text-sm text-copy-light">Order Date</Text>
                    <Text className="text-copy font-semibold">
                      {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-sm text-copy-light">Last Updated</Text>
                    <Text className="text-copy font-semibold">
                      {new Date(order.updated_at).toLocaleDateString()} {new Date(order.updated_at).toLocaleTimeString()}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-sm text-copy-light">Order Source</Text>
                    <Text className="text-copy font-semibold capitalize">{order.source || 'WEB'}</Text>
                  </div>
                  <div>
                    <Text className="text-sm text-copy-light">Currency</Text>
                    <Text className="text-copy font-semibold">{order.currency}</Text>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-surface rounded-lg border border-border-light p-6">
                <Heading level={3} className="text-base font-semibold text-copy mb-4">Customer Information</Heading>
                <div className="space-y-3">
                  {order.user?.firstname && (
                    <div>
                      <Text className="text-sm text-copy-light">Name</Text>
                      <Text className="text-copy font-semibold">
                        {order.user.firstname} {order.user.lastname || ''}
                      </Text>
                    </div>
                  )}
                  <div>
                    <Text className="text-sm text-copy-light">Email</Text>
                    <Text className="text-copy font-semibold">{order.user_email || order.user?.email}</Text>
                  </div>
                  {order.user?.phone && (
                    <div>
                      <Text className="text-sm text-copy-light">Phone</Text>
                      <Text className="text-copy font-semibold">{order.user.phone}</Text>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-surface rounded-lg border border-border-light p-6">
                <Heading level={3} className="text-base font-semibold text-copy mb-4">Order Timeline</Heading>
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Text className="font-semibold text-copy">Order Placed</Text>
                      <Text className="text-sm text-copy-light">
                        {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                      </Text>
                    </div>
                  </div>

                  {order.confirmed_at && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-success/20 rounded-full flex items-center justify-center mt-1">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <Text className="font-semibold text-copy">Order Confirmed</Text>
                        <Text className="text-sm text-copy-light">
                          {new Date(order.confirmed_at).toLocaleDateString()} {new Date(order.confirmed_at).toLocaleTimeString()}
                        </Text>
                      </div>
                    </div>
                  )}

                  {order.shipped_at && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                        <Truck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <Text className="font-semibold text-copy">Shipped</Text>
                        <Text className="text-sm text-copy-light">
                          {new Date(order.shipped_at).toLocaleDateString()} {new Date(order.shipped_at).toLocaleTimeString()}
                        </Text>
                      </div>
                    </div>
                  )}

                  {order.delivered_at && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-success/20 rounded-full flex items-center justify-center mt-1">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <Text className="font-semibold text-copy">Delivered</Text>
                        <Text className="text-sm text-copy-light">
                          {new Date(order.delivered_at).toLocaleDateString()} {new Date(order.delivered_at).toLocaleTimeString()}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Status Management & Pricing */}
            <div className="space-y-6">
              {/* Status Management */}
              <div className="bg-surface rounded-lg border border-border-light p-6">
                <Heading level={3} className="text-base font-semibold text-copy mb-4">Update Status</Heading>
                <div className="space-y-4">
                  <Dropdown
                    options={statusOptions.map(status => ({ value: status, label: status }))}
                    value={newStatus}
                    onChange={(value) => setNewStatus(value)}
                    placeholder="Select Status"
                    className="w-full"
                  />

                  <Button
                    onClick={handleStatusUpdate}
                    disabled={updating || newStatus === order.order_status}
                    variant="primary"
                    size="sm"
                    className="w-full px-4 py-2 bg-primary text-copy-inverse rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {updating ? 'Updating...' : `Update to ${newStatus}`}
                  </Button>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-surface rounded-lg border border-border-light p-6">
                <Heading level={3} className="text-base font-semibold text-copy mb-4">Pricing Details</Heading>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <Text className="text-copy-light">Subtotal</Text>
                    <Text className="text-copy font-semibold">
                      {formatCurrency(order.subtotal || order.sub_total || 0)}
                    </Text>
                  </div>

                  <div className="flex justify-between text-sm">
                    <Text className="text-copy-light">Shipping Cost</Text>
                    <Text className="text-copy font-semibold">{formatCurrency(order.shipping_cost)}</Text>
                  </div>

                  <div className="flex justify-between text-sm">
                    <Text className="text-copy-light">
                      Tax ({((order.tax_rate ?? 0) * 100).toFixed(1)}%)
                    </Text>
                    <Text className="text-copy font-semibold">{formatCurrency(order.tax_amount)}</Text>
                  </div>

                  <div className="border-t border-border-light pt-3 flex justify-between">
                    <Text className="text-sm text-copy font-semibold">Total</Text>
                    <Text className="text-base font-semibold text-primary">{formatCurrency(order.total_amount)}</Text>
                  </div>
                </div>
              </div>

              {/* Tracking Information */}
              {order.tracking_number && (
                <div className="bg-surface rounded-lg border border-border-light p-6">
                <Heading level={3} className="text-base font-semibold text-copy mb-4">Tracking Information</Heading>
                  <div className="space-y-3">
                    <div>
                      <Text className="text-sm text-copy-light">Tracking Number</Text>
                      <Text className="text-copy font-mono font-semibold">{order.tracking_number}</Text>
                    </div>
                    {order.carrier && (
                      <div>
                        <Text className="text-sm text-copy-light">Carrier</Text>
                        <Text className="text-copy font-semibold">{order.carrier}</Text>
                      </div>
                    )}
                    {order.shipping_method && (
                      <div>
                        <Text className="text-sm text-copy-light">Shipping Method</Text>
                        <Text className="text-copy font-semibold">{order.shipping_method}</Text>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <div className="bg-surface rounded-lg border border-border-light overflow-hidden">
            <div className="p-6 border-b border-border-light">
              <Heading level={3} className="text-base font-semibold text-copy">Order Items ({order.items?.length || 0})</Heading>
            </div>

            {order.items && order.items.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-dark border-b border-border-light sticky top-0">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-copy-light">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-copy-light">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-copy-light">Variant</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-copy-light">Quantity</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-copy-light">Unit Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-copy-light">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => {
                      const unitPrice = Number(item.unit_price ?? item.price_per_unit ?? 0);
                      const qty = Number(item.quantity ?? 0);
                      const total = Number(item.total_price) || unitPrice * qty;
                      const primaryImage = item.variant?.images?.find((img: { is_primary?: boolean }) => img.is_primary) || item.variant?.images?.[0];
                      const imageUrl = primaryImage?.url;
                      return (
                        <tr key={item.id || index} className="border-b border-border-light hover:bg-surface-light transition-colors">
                          <td className="px-6 py-4">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={primaryImage?.alt_text || item.product_name || 'Product'}
                                className="w-16 h-16 object-cover rounded border border-border-light"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded border border-border-light bg-surface-dark flex items-center justify-center text-copy-light text-xs">—</div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <Text className="text-sm font-semibold text-copy">
                              {item.product_name ?? item.product?.name ?? 'N/A'}
                            </Text>
                            <Text className="text-xs text-copy-light mt-1">
                              ID: {item.product_id ?? 'N/A'}
                            </Text>
                          </td>
                          <td className="px-6 py-4">
                            <Text className="text-sm text-copy-light">
                              {item.variant_name ?? item.sku ?? item.variant?.sku ?? 'N/A'}
                            </Text>
                          </td>
                          <td className="px-6 py-4">
                            <Text className="text-sm font-medium text-copy">{qty}</Text>
                          </td>
                          <td className="px-6 py-4">
                            <Text className="text-sm text-copy">{formatCurrency(unitPrice)}</Text>
                          </td>
                          <td className="px-6 py-4">
                            <Text className="text-sm font-bold text-copy">{formatCurrency(total)}</Text>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Body className="text-copy-light text-base">No items in this order</Body>
              </div>
            )}

            {/* Items Summary */}
            {order.items && order.items.length > 0 && (
              <div className="px-6 py-4 bg-surface-light border-t border-border-light">
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div>
                    <Text className="text-xs text-copy-light mb-1">Total Items</Text>
                    <Text className="text-base font-semibold text-copy">{order.items.reduce((sum, item) => sum + (item.quantity || 0), 0)}</Text>
                  </div>
                  <div>
                    <Text className="text-xs text-copy-light mb-1">Total Cost</Text>
                    <Text className="text-base font-semibold text-copy">
                      {formatCurrency(order.items.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0))}
                    </Text>
                  </div>
                  <div>
                    <Text className="text-xs text-copy-light mb-1">Average Price</Text>
                    <Text className="text-base font-semibold text-copy">
                      {formatCurrency(
                        (order.items.reduce((sum, item) => sum + (Number(item.total_price) || 0), 0)) /
                        (order.items.length || 1)
                      )}
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Billing Address */}
            <div className="bg-surface rounded-lg border border-border-light p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <Heading level={3} className="text-base font-semibold text-copy">Billing Address</Heading>
              </div>
              {order.billing_address ? (
                <div className="space-y-2 text-sm text-copy">
                  <Text className="font-semibold">{order.billing_address.full_name}</Text>
                  <Text>{order.billing_address.street_address}</Text>
                  {order.billing_address.apartment && <Text>{order.billing_address.apartment}</Text>}
                  <Text>
                    {order.billing_address.city}, {order.billing_address.province} {order.billing_address.postal_code}
                  </Text>
                  <Text>{order.billing_address.country}</Text>
                  {order.billing_address.phone && <Text className="mt-3 font-semibold">{order.billing_address.phone}</Text>}
                </div>
              ) : (
                <Text className="text-copy-light">No billing address</Text>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-surface rounded-lg border border-border-light p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-primary" />
                <Heading level={3} className="text-base font-semibold text-copy">Shipping Address</Heading>
              </div>
              {order.shipping_address ? (
                <div className="space-y-2 text-sm text-copy">
                  <Text className="font-semibold">{order.shipping_address.full_name}</Text>
                  <Text>{order.shipping_address.street_address}</Text>
                  {order.shipping_address.apartment && <Text>{order.shipping_address.apartment}</Text>}
                  <Text>
                    {order.shipping_address.city}, {order.shipping_address.province} {order.shipping_address.postal_code}
                  </Text>
                  <Text>{order.shipping_address.country}</Text>
                  {order.shipping_address.phone && <Text className="mt-3 font-semibold">{order.shipping_address.phone}</Text>}
                </div>
              ) : (
                <Text className="text-copy-light">No shipping address</Text>
              )}
            </div>

            {/* Shipping Details */}
            <div className="lg:col-span-2 bg-surface rounded-lg border border-border-light p-6">
              <Heading level={3} className="text-base font-semibold text-copy mb-4">Shipping Details</Heading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Text className="text-sm text-copy-light">Method</Text>
                  <Text className="text-copy font-semibold">{order.shipping_method || 'N/A'}</Text>
                </div>
                <div>
                  <Text className="text-sm text-copy-light">Cost</Text>
                  <Text className="text-copy font-semibold">{formatCurrency(order.shipping_cost)}</Text>
                </div>
                <div>
                  <Text className="text-sm text-copy-light">Tracking Number</Text>
                  <Text className="text-copy font-mono">{order.tracking_number || 'N/A'}</Text>
                </div>
                <div>
                  <Text className="text-sm text-copy-light">Carrier</Text>
                  <Text className="text-copy font-semibold">{order.carrier || 'N/A'}</Text>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Notes */}
            <div className="bg-surface rounded-lg border border-border-light p-6">
              <Heading level={3} className="text-base font-semibold text-copy mb-4">Customer Notes</Heading>
              <Body className="text-copy whitespace-pre-wrap">
                {order.customer_notes || '(No customer notes)'}
              </Body>
            </div>

            {/* Internal Notes */}
            <div className="bg-surface rounded-lg border border-border-light p-6">
              <Heading level={3} className="text-base font-semibold text-copy mb-4">Internal Notes</Heading>
              <Body className="text-copy whitespace-pre-wrap">
                {order.internal_notes || '(No internal notes)'}
              </Body>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
};

export default AdminOrderDetail;
