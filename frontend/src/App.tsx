import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { AuthProvider } from '@/features/protected/auth/contexts/AuthContext';
import { CartProvider } from '@/features/protected/cart/contexts/CartContext';
import { WishlistProvider } from '@/features/protected/wishlist/contexts/WishlistContext';
import { SubscriptionProvider } from '@/features/protected/subscriptions/contexts/SubscriptionContext';
import { CategoryProvider } from '@/components/shared/contexts/CategoryContext';
import { LocaleProvider } from '@/components/shared/contexts/LocaleContext';
import { ThemeProvider } from '@/components/shared/contexts/ThemeContext';
import { FontLoader } from '@/components/ui/FontLoader';
import { Toaster } from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { 
  PageSkeleton, 
  ProductListSkeleton, 
  ProductDetailSkeleton, 
  CartSkeleton, 
  CheckoutSkeleton, 
  AccountSkeleton, 
  AdminDashboardSkeleton, 
  AdminTableSkeleton 
} from '@/components/ui/SkeletonLoader';
import ContactMessagesSkeleton from '@/features/protected/admin/components/skeletons/ContactMessagesSkeleton';
import AnimatedLoader from '@/components/ui/AnimatedLoader';
import SupportFloat from '@/components/layout/SupportFloat';
import './animations.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Lazy load pages for better performance
const Home = lazy(() => import('@/features/public/Home'));
const Products = lazy(() => import('@/features/public/products/Products'));
const ProductDetails = lazy(() => import('@/features/public/products/ProductDetails'));
const Cart = lazy(() => import('@/features/protected/cart/pages/Cart'));
const Checkout = lazy(() => import('@/features/protected/checkout/pages/Checkout'));
const Account = lazy(() => import('@/features/protected/account/pages/Account'));
const Login = lazy(() => import('@/features/protected/auth/pages/Login'));
const ForgotPassword = lazy(() => import('@/features/protected/auth/pages/ForgotPassword'));
const Register = lazy(() => import('@/features/protected/auth/pages/Register'));
const About = lazy(() => import('@/features/public/marketing/About'));
const Contact = lazy(() => import('@/features/public/support/pages/Contact'));
const TermsAndConditions = lazy(() => import('@/features/public/marketing/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('@/features/public/marketing/PrivacyPolicy'));
const EmailVerification = lazy(() => import('@/features/protected/auth/pages/EmailVerification'));
const VerifyEmailPending = lazy(() => import('@/features/protected/auth/pages/VerifyEmailPending'));
const ResetPassword = lazy(() => import('@/features/protected/auth/pages/ResetPassword'));
const TrackOrder = lazy(() => import('@/features/protected/account/pages/AccountTrackOrderPage'));
const FAQ = lazy(() => import('@/features/public/marketing/FAQ'));
const AdminLayout = lazy(() => import('@/components/layout/AdminLayout'));
const NotFound = lazy(() => import('@/features/public/errors/NotFound'));
const Maintenance = lazy(() => import('@/features/public/errors/Maintenance'));
const AdminDashboardPage = lazy(() => import('@/features/protected/admin/pages/AdminDashboardPage'));
const AdminOrders = lazy(() => import('@/features/protected/admin/pages/AdminOrdersPage'));
const AdminOrderDetail = lazy(() => import('@/features/protected/admin/pages/AdminOrderDetailPage'));
const AdminProducts = lazy(() => import('@/features/protected/admin/pages/AdminProductsPage'));
const AdminProductDetail = lazy(() => import('@/features/protected/admin/pages/ProductDetail'));
const CreateProduct = lazy(() => import('@/features/protected/admin/pages/CreateProduct'));
const EditProduct = lazy(() => import('@/features/protected/admin/pages/EditProduct'));
const AdminCategories = lazy(() => import('@/features/protected/admin/pages/AdminCategoriesPage'));
const AdminUsers = lazy(() => import('@/features/protected/admin/pages/Users'));
const AdminUserDetail = lazy(() => import('@/features/protected/admin/pages/UserDetail'));
const AdminTaxRates = lazy(() => import('@/features/protected/admin/pages/TaxRates'));
const AdminSubscriptions = lazy(() => import('@/features/protected/admin/pages/AdminSubscriptionsPage'));
const AdminInventory = lazy(() => import('@/features/protected/admin/pages/Inventory'));
const AdminShipping = lazy(() => import('@/features/protected/admin/pages/Shipping'));
const SupplierDashboard = lazy(() => import('@/features/protected/admin/pages/AdminDashboardPage'));
const AdminPayments = lazy(() => import('@/features/protected/admin/pages/Payments'));
const AdminRefunds = lazy(() => import('@/features/protected/admin/pages/Refunds'));
const Suppliers = lazy(() => import('@/features/public/products/Suppliers'));
const SupplierDetail = lazy(() => import('@/features/public/products/SupplierDetail'));
const AdminContactMessages = lazy(() => import('@/features/protected/admin/pages/ContactMessages'));


export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <FontLoader />
          <Toaster
            position="top-right"
            gutter={12}
            containerStyle={{}}
            toastOptions={{
              className: '',
              style: {},
              success: {
                duration: 3000,
                style: {
                  background: 'var(--color-success)',
                  color: 'var(--color-copy-inverse)',
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: 'var(--color-error)',
                  color: 'var(--color-copy-inverse)',
                }
              },
              loading: {
                duration: Infinity,
                style: {
                  background: 'var(--color-surface-elevated)',
                  color: 'var(--color-copy)',
                },
              },
              blank: {
                duration: 2000,
                style: {
                  background: 'var(--color-surface)',
                  color: 'var(--color-copy)',
                },
              },
            }}
          />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <CategoryProvider>
              <LocaleProvider>
                <CartProvider>
                  <SubscriptionProvider>
                    <WishlistProvider>
                      <Elements stripe={stripePromise}>
                        <SupportFloat />
                        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 z-50"><AnimatedLoader size="lg" variant="spinner" color="primary" text="Loading page..." /></div>}> 
                          <Routes>
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/products" element={<Layout><Suspense fallback={<ProductListSkeleton />}><Products /></Suspense></Layout>} />
                        <Route path="/products/search" element={<Layout><Suspense fallback={<ProductListSkeleton />}><Products /></Suspense></Layout>} />
                        <Route path="/products/:id" element={<Layout><Suspense fallback={<ProductDetailSkeleton />}><ProductDetails /></Suspense></Layout>} />
                        <Route path="/cart" element={<ProtectedRoute><Layout><Suspense fallback={<CartSkeleton />}><Cart /></Suspense></Layout></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><Layout><Suspense fallback={<CheckoutSkeleton />}><Checkout /></Suspense></Layout></ProtectedRoute>} />
                        <Route path="/account/*" element={<ProtectedRoute><Layout><Suspense fallback={<AccountSkeleton />}><Account /></Suspense></Layout></ProtectedRoute>} />
                        <Route path="/login" element={<Layout><Login /></Layout>} />
                        <Route path="/register" element={<Layout><Register /></Layout>} />
                        <Route path="/verify-email-pending" element={<Layout><VerifyEmailPending /></Layout>} />
                        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
                        <Route path="/track-order" element={<Layout><TrackOrder /></Layout>} />
                        <Route path="/suppliers" element={<Layout><Suspense fallback={<ProductListSkeleton />}><Suppliers /></Suspense></Layout>} />
                        <Route path="/suppliers/:id" element={<Layout><Suspense fallback={<PageSkeleton />}><SupplierDetail /></Suspense></Layout>} />
                        <Route path="/about" element={<Layout><About /></Layout>} />
                        <Route path="/contact" element={<Layout><Contact /></Layout>} />
                        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                        <Route path="/terms" element={<Layout><TermsAndConditions /></Layout>} />
                        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                        <Route path="/verify-email" element={<Layout><EmailVerification /></Layout>} />
                        <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
                        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
                          <Route index element={<Suspense fallback={<AdminDashboardSkeleton />}><AdminDashboardPage /></Suspense>} />
                          <Route path="orders" element={<Suspense fallback={<AdminTableSkeleton />}><AdminOrders /></Suspense>} />
                          <Route path="orders/:orderId" element={<Suspense fallback={<PageSkeleton />}><AdminOrderDetail /></Suspense>} />
                          <Route path="products" element={<Suspense fallback={<AdminTableSkeleton />}><AdminProducts /></Suspense>} />
                          <Route path="products/new" element={<Suspense fallback={<PageSkeleton />}><CreateProduct /></Suspense>} />
                          <Route path="products/:productId" element={<Suspense fallback={<ProductDetailSkeleton />}><AdminProductDetail /></Suspense>} />
                          <Route path="products/:productId/edit" element={<Suspense fallback={<PageSkeleton />}><EditProduct /></Suspense>} />
                          <Route path="categories" element={
                            <Suspense fallback={<AdminTableSkeleton />}>
                              <ErrorBoundary>
                                <AdminCategories />
                              </ErrorBoundary>
                            </Suspense>
                          } />
                          <Route path="users" element={<Suspense fallback={<AdminTableSkeleton />}><AdminUsers /></Suspense>} />
                          <Route path="users/:userId" element={<Suspense fallback={<PageSkeleton />}><AdminUserDetail /></Suspense>} />
                          <Route path="tax-rates" element={<Suspense fallback={<AdminTableSkeleton />}><AdminTaxRates /></Suspense>} />
                          <Route path="subscriptions" element={<Suspense fallback={<AdminTableSkeleton />}><AdminSubscriptions /></Suspense>} />
                          <Route path="inventory" element={<Suspense fallback={<AdminTableSkeleton />}><AdminInventory /></Suspense>} />
                          <Route path="shipping" element={<Suspense fallback={<AdminTableSkeleton />}><AdminShipping /></Suspense>} />
                          <Route path="payments" element={<Suspense fallback={<AdminTableSkeleton />}><AdminPayments /></Suspense>} />
                          <Route path="refunds" element={<Suspense fallback={<AdminTableSkeleton />}><AdminRefunds /></Suspense>} />
                          <Route path="contact-messages" element={<Suspense fallback={<ContactMessagesSkeleton />}><AdminContactMessages /></Suspense>} />
                        </Route>
                        <Route path="/supplier/*" element={<ProtectedRoute><Suspense fallback={<AdminDashboardSkeleton />}><SupplierDashboard /></Suspense></ProtectedRoute>} />
                        
                        {/* Maintenance Mode - Uncomment when needed */}
                        {/* <Route path="*" element={<Maintenance estimatedTime="2 hours" showCountdown={true} endTime={new Date('2026-02-08T12:00:00')} />} /> */}
                        
                        {/* 404 Not Found - Catch all unmatched routes */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </Elements>
                </WishlistProvider>
              </SubscriptionProvider>
            </CartProvider>
            </LocaleProvider>
            </CategoryProvider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}