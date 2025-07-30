import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useAuth } from './hooks/api/useAuth';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PeoplePage } from './pages/PeoplePage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/layout/MainLayout';
import { useEmployees } from './hooks/api/useEmployees';
import { AppSkeleton } from './components/layout/AppSkeleton';
import { Toaster } from './components/ui/sonner';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const { employees, loading, handleAddEmployee, handleUpdateEmployee, handleDeleteEmployee } =
    useEmployees();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const shouldShowSidebar = user && (user.role === 'admin' || user.role === 'hr');

  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-stretch">
        {/* Sidebar: Only show if user is logged in and is admin/hr */}
        {shouldShowSidebar && <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />}

        {/* Main Content */}
        <div
          className={`
            transition-all duration-300 flex-grow w-full overflow-auto
            
          `}
        >
          {shouldShowSidebar && !sidebarCollapsed && (
            <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-lg z-10 pointer-events-none" />
          )}

          <div className="p-4 lg:p-8 relative z-20 w-full overflow-auto">
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
      <Toaster position="top-right" richColors closeButton expand={false} duration={4000} />
    </BrowserRouter>
  );
};

export default App;
