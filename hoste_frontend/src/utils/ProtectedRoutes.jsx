import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthProvider';
import { useTheme } from '../contexts/ThemeContext';

const ProtectedRoutes = () => {
  const { user, isLoading } = useAuth();
  const { isDarkMode } = useTheme();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 theme-transition">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 dark:border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;