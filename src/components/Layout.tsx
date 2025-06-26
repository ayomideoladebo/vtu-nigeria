import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isHomePage = location.pathname === '/';
  
  if (isAuthPage || isHomePage) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-dark-bg dark:to-gray-900">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <Navbar />
        <main className="p-4 pb-20">
          {children}
        </main>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;