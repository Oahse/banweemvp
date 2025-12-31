import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, isLoading, user, setIntendedDestination } = useAuth();
  const location = useLocation();

  // Store intended destination when not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setIntendedDestination(location.pathname + location.search, null);
    }
  }, [isLoading, isAuthenticated, location.pathname, location.search, setIntendedDestination]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but doesn't have required role, redirect to unauthorized page
  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};
