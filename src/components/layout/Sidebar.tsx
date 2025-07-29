import React from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import type { MenuItem } from '../../types';
import { mainMenuItems, bottomMenuItems } from '../../constants/menuItems';
import { useAuth } from '@/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

// Helper component for Settings + Logout
const SidebarSettingLogout: React.FC<{
  isCollapsed: boolean;
  IconComponent: React.ElementType;
  label: string;
  onLogout: () => void;
}> = ({ isCollapsed, IconComponent, label, onLogout }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-gray-600 hover:bg-gray-50"
        title={isCollapsed ? label : ''}
        onClick={() => setShowMenu(v => !v)}
      >
        <IconComponent size={20} />
        {!isCollapsed && <span className="text-sm">{label}</span>}
      </div>
      {showMenu && !isCollapsed && (
        <div className="absolute left-full top-0 ml-2 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[120px]">
          <button
            onClick={() => {
              setShowMenu(false);
              onLogout();
            }}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// Dark mode toggle button
const DarkModeToggle: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(d => !d)}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-gray-600 hover:bg-gray-50 w-full"
      title={isCollapsed ? (isDark ? 'Light mode' : 'Dark mode') : ''}
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
      {!isCollapsed && <span className="text-sm">{isDark ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-sidebar border-r border-border flex flex-col z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          {!isCollapsed && <span className="font-semibold text-lg text-sidebar-foreground">MarcoHR</span>}
        </div>
        <button onClick={onToggle} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <nav className="space-y-1">
          {mainMenuItems.map((item: MenuItem) => {
            const IconComponent = item.icon;
            const isActive = location.pathname.startsWith(`/${item.id}`);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  isActive ? 'bg-accent text-accent-foreground' : 'text-sidebar-foreground hover:bg-muted'
                }`}
                onClick={() => navigate(`/${item.id}`)}
                title={isCollapsed ? item.label : ''}
              >
                <IconComponent size={20} />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-3 pb-4 space-y-4">
        <div className="space-y-1 border-t border-gray-100 pt-4">
          {bottomMenuItems.map(item => {
            const IconComponent = item.icon;
            if (item.id === 'setting') {
              // Settings item: show logout menu on click
              return (
                <SidebarSettingLogout
                  key={item.id}
                  isCollapsed={isCollapsed}
                  IconComponent={IconComponent}
                  label={item.label}
                  onLogout={async () => {
                    await logout();
                    navigate('/login');
                  }}
                />
              );
            }
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-gray-600 hover:bg-gray-50"
                title={isCollapsed ? item.label : ''}
              >
                <IconComponent size={20} />
                {!isCollapsed && <span className="text-sm">{item.label}</span>}
              </div>
            );
          })}
          {/* Dark mode toggle */}
          <DarkModeToggle isCollapsed={isCollapsed} />
        </div>

        {/* User Profile */}
        {!isCollapsed && user && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.displayName || user.email}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-purple-700 text-sm font-medium">
                  {user.displayName
                    ? user.displayName
                        .split(' ')
                        .map(n => n[0])
                        .join('')
                        .toUpperCase()
                    : user.email?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.displayName || user.email}
              </p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
