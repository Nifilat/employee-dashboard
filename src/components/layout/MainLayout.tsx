import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/api/useAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  // Not logged in or not admin/hr
  if (!user || (user.role !== 'admin' && user.role !== 'hr')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
