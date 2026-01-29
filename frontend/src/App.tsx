import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, AuthLayout } from './components/layout/Layout';
import { AuthProvider } from './store/AuthContext';
import { CartProvider } from './store/CartContext';
import { WishlistProvider } from './store/WishlistContext';
import { SubscriptionProvider } from './store/SubscriptionContext';
import { CategoryProvider } from './store/CategoryContext';
import { LocaleProvider } from './store/LocaleContext';
import { ThemeProvider } from './store/ThemeContext';
import { FontLoader } from './components/ui/FontLoader';
import { Toaster } from 'react-hot-toast';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ErrorBoundary from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Account = lazy(() => import('./pages/Account'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Register = lazy(() => import('./pages/Register'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Subscriptions = lazy(() => import('./pages/Subscriptions'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const EmailVerification = lazy(() => import('./pages/EmailVerification'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const Support = lazy(() => import('./pages/Support'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboardPage = lazy(() => import('./components/admin/AdminDashboard'));
const SupplierDashboard = lazy(() => import('./components/admin/SupplierDashboard'));

// Loading component
const PageLoading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <FontLoader />
          <Toaster
            position="top-right"
            toastOptions={{
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
                        <Suspense fallback={<PageLoading />}>
                          <Routes>
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route path="/products" element={<Layout><Products /></Layout>} />
                        <Route path="/products/search" element={<Layout><Products /></Layout>} />
                        <Route path="/products/:id" element={<Layout><ProductDetails /></Layout>} />
                        <Route path="/cart" element={<ProtectedRoute><Layout><Cart /></Layout></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><Layout><Checkout /></Layout></ProtectedRoute>} />
                        <Route path="/account/*" element={<ProtectedRoute><Layout><Account /></Layout></ProtectedRoute>} />
                        <Route path="/track-order/:orderId" element={<ProtectedRoute><Layout><TrackOrder /></Layout></ProtectedRoute>} />
                        <Route path="/login" element={<Layout><Login /></Layout>} />
                        <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
                        <Route path="/register" element={<Layout><Register /></Layout>} />
                        <Route path="/about" element={<Layout><About /></Layout>} />
                        <Route path="/contact" element={<Layout><Contact /></Layout>} />
                        <Route path="/support" element={<Layout><Support /></Layout>} />
                        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                        <Route path="/account/wishlist" element={<ProtectedRoute><Layout><Wishlist /></Layout></ProtectedRoute>} />
                        <Route path="/subscriptions" element={<Layout><Subscriptions /></Layout>} />
                        <Route path="/subscription/:subscriptionId/manage" element={<ProtectedRoute><Layout><Subscriptions /></Layout></ProtectedRoute>} />
                        <Route path="/terms" element={<Layout><TermsAndConditions /></Layout>} />
                        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                        <Route path="/verify-email" element={<Layout><EmailVerification /></Layout>} />
                        <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
                        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                          <Route index element={<AdminDashboardPage />} />
                        </Route>
                        <Route path="/supplier/*" element={<ProtectedRoute><SupplierDashboard /></ProtectedRoute>} />
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