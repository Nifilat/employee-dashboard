import React, { useState } from 'react';
import { useAuth } from '../../hooks/api/useAuth';
import { Sidebar } from './Sidebar';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const shouldShowSidebar = user && (user.role === 'admin' || user.role === 'hr');

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Sidebar: Only show if user is logged in and is admin/hr */}
      {shouldShowSidebar && <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />}

      {/* Main Content */}
      <div className="transition-all duration-300 flex-grow w-full overflow-auto">
        {shouldShowSidebar && !sidebarCollapsed && (
          <div className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-lg z-10 pointer-events-none" />
        )}

        <div className="p-4 lg:p-8 relative z-20 w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
};
