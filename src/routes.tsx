import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Dashboard } from './pages/Dashboard';
import { PeoplePage } from './pages/PeoplePage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/layout/MainLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { useEmployees } from './hooks/api/useEmployees';
import { AppSkeleton } from './components/layout/AppSkeleton';

export const AppRoutes: React.FC = () => {
  const { employees, loading, handleAddEmployee, handleUpdateEmployee, handleDeleteEmployee } =
    useEmployees();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AuthLayout>
              {loading ? <AppSkeleton /> : <Dashboard employees={employees} />}
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/people"
        element={
          <ProtectedRoute>
            <AuthLayout>
              {loading ? (
                <AppSkeleton />
              ) : (
                <PeoplePage
                  employees={employees}
                  onAddEmployee={handleAddEmployee}
                  onUpdateEmployee={handleUpdateEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              )}
            </AuthLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/people" replace />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AuthLayout>
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FileText size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Page Not Found</h3>
                <p className="text-gray-500">This feature is coming soon!</p>
              </div>
            </AuthLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
