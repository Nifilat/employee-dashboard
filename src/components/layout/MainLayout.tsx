import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Show nothing or a loader while auth is loading
  if (user === undefined) return null;

  // Not logged in or not admin/hr
  if (!user || (user.role !== 'admin' && user.role !== 'hr')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};