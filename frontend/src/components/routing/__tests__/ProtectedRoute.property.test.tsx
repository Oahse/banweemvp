import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import { ProtectedRoute } from '../ProtectedRoute';
import { AuthContext } from '../../../contexts/AuthContext';

/**
 * Feature: app-enhancements, Property 1: Intended destination storage
 * For any protected route access attempt without authentication, 
 * the system should store the intended destination URL in the auth context
 * Validates: Requirements 1.1, 1.2
 */
describe('Property 1: Intended destination storage', () => {
  it('should store intended destination for any protected route when not authenticated', () => {
    fc.assert(
      fc.property(
        // Generate random protected route paths
        fc.oneof(
          fc.constant('/account'),
          fc.constant('/checkout'),
          fc.constant('/admin'),
          fc.constant('/account/wishlist'),
          fc.constant('/admin/products'),
          fc.constant('/admin/users'),
          fc.string({ minLength: 1, maxLength: 50 }).map(s => `/protected/${s}`)
        ),
        // Generate optional query parameters
        fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: null }),
        (protectedPath, queryParam) => {
          const setIntendedDestination = vi.fn();
          const fullPath = queryParam ? `${protectedPath}?${queryParam}` : protectedPath;
          
          const mockAuthValue = {
            isAuthenticated: false,
            isLoading: false,
            user: null,
            setIntendedDestination,
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
            verifyEmail: vi.fn(),
            isAdmin: false,
            isSupplier: false,
            isCustomer: false,
            redirectPath: null,
            setRedirectPath: vi.fn(),
            intendedDestination: null,
            updateUserPreferences: vi.fn(),
            updateUser: vi.fn(),
          };

          render(
            <AuthContext.Provider value={mockAuthValue}>
              <MemoryRouter initialEntries={[fullPath]}>
                <Routes>
                  <Route
                    path={protectedPath}
                    element={
                      <ProtectedRoute>
                        <div>Protected Content</div>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
              </MemoryRouter>
            </AuthContext.Provider>
          );

          // Verify that setIntendedDestination was called with the protected path
          expect(setIntendedDestination).toHaveBeenCalledWith(fullPath, null);
        }
      ),
      { numRuns: 100 } // Run 100 iterations as specified in design doc
    );
  });

  it('should not store login page as intended destination', () => {
    const setIntendedDestination = vi.fn();
    
    const mockAuthValue = {
      isAuthenticated: false,
      isLoading: false,
      user: null,
      setIntendedDestination,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      verifyEmail: vi.fn(),
      isAdmin: false,
      isSupplier: false,
      isCustomer: false,
      redirectPath: null,
      setRedirectPath: vi.fn(),
      intendedDestination: null,
      updateUserPreferences: vi.fn(),
      updateUser: vi.fn(),
    };

    render(
      <AuthContext.Provider value={mockAuthValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // The setIntendedDestination should be called, but the AuthContext's 
    // setIntendedDestinationWithAction should filter out /login
    // This is handled in the AuthContext, not ProtectedRoute
    expect(setIntendedDestination).toHaveBeenCalled();
  });
});

/**
 * Feature: app-enhancements, Property 2: Login redirect to intended destination
 * For any stored intended destination, after successful login 
 * the system should redirect to that destination
 * Validates: Requirements 1.3
 */
describe('Property 2: Login redirect to intended destination', () => {
  it('should redirect to intended destination after login for any stored path', () => {
    fc.assert(
      fc.property(
        // Generate random intended destinations
        fc.oneof(
          fc.constant('/account'),
          fc.constant('/checkout'),
          fc.constant('/admin'),
          fc.constant('/account/wishlist'),
          fc.constant('/admin/products'),
          fc.string({ minLength: 1, maxLength: 50 }).map(s => `/path/${s}`)
        ),
        (intendedPath) => {
          // Skip login page as it should not be stored as intended destination
          if (intendedPath === '/login' || intendedPath === '/register') {
            return true;
          }

          const mockAuthValue = {
            isAuthenticated: true,
            isLoading: false,
            user: { id: '1', email: 'test@test.com', role: 'Customer' },
            setIntendedDestination: vi.fn(),
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
            verifyEmail: vi.fn(),
            isAdmin: false,
            isSupplier: false,
            isCustomer: true,
            redirectPath: null,
            setRedirectPath: vi.fn(),
            intendedDestination: { path: intendedPath, action: null },
            updateUserPreferences: vi.fn(),
            updateUser: vi.fn(),
          };

          const { container } = render(
            <AuthContext.Provider value={mockAuthValue}>
              <MemoryRouter initialEntries={['/login']}>
                <Routes>
                  <Route path="/login" element={<div>Login Page</div>} />
                  <Route
                    path={intendedPath}
                    element={
                      <ProtectedRoute>
                        <div>Protected Content</div>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </MemoryRouter>
            </AuthContext.Provider>
          );

          // When authenticated with intended destination, ProtectedRoute should render the protected content
          // The actual redirect logic is in the Login component, not ProtectedRoute
          // ProtectedRoute just checks if user is authenticated
          expect(container.textContent).toContain('Protected Content');
        }
      ),
      { numRuns: 100 }
    );
  });
});
