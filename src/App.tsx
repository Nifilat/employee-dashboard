import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PeoplePage } from './pages/PeoplePage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/layout/MainLayout';
import { useEmployees } from './hooks/api/useEmployees';
import { AppSkeleton } from './components/layout/AppSkeleton';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const { employees, loading, handleAddEmployee, handleUpdateEmployee, handleDeleteEmployee } =
    useEmployees();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar: Only show if user is logged in and is admin/hr */}
        {user && (user.role === 'admin' || user.role === 'hr') && (
          <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        )}

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="p-4 lg:p-8">
            {loading ? (
              <AppSkeleton />
            ) : (
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard employees={employees} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/people"
                  element={
                    <ProtectedRoute>
                      <PeoplePage
                        employees={employees}
                        onAddEmployee={handleAddEmployee}
                        onUpdateEmployee={handleUpdateEmployee}
                        onDeleteEmployee={handleDeleteEmployee}
                      />
                    </ProtectedRoute>
                  }
                />

                <Route path="/" element={<Navigate to="/people" replace />} />
                <Route
                  path="*"
                  element={
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <FileText size={64} className="mx-auto" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Page Not Found</h3>
                      <p className="text-gray-500">This feature is coming soon!</p>
                    </div>
                  }
                />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
