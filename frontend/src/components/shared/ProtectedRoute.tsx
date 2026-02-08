import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/protected/auth/contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, user, isLoading, intendedDestination } = useAuth();
  const location = useLocation();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center">
          <div className={`w-16 h-16 border-4 ${theme === 'dark' ? 'border-blue-500' : 'border-blue-600'} border-t-transparent rounded-full animate-spin`}></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save the full location (pathname + search + hash) for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRole && user) {
    const userRole = user.role;
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    if (!allowedRoles.some(role => role.toLowerCase() === userRole.toLowerCase())) {
      return (
        <Navigate 
          to="/" 
          state={{ 
            message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
            from: location.pathname 
          }} 
          replace 
        />
      );
    }
  }

  return <>{children}</>;
};