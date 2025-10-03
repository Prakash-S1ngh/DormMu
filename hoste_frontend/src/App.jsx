import React from "react";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import ResidentPage from "./pages/ResidentPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./errors/PageNotFound";
import { useAuth } from "./services/AuthProvider";
import { useTheme } from "./contexts/ThemeContext";
import StaffPage from "./pages/StaffPage";
import AuthStatus from "./components/AuthStatus";

function App() {
  const { role, isLoading } = useAuth();
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

  return (
    <div className={`min-h-screen theme-transition ${isDarkMode ? 'dark' : 'light'}`}>
      <Routes>
        <Route path="/*" element={<HomePage />} />

        <Route element={<ProtectedRoutes />}>
          {/* Validating admin only allowed route  */}
          {role === "admin" ? (
            <Route path="/admin/*" element={<AdminPage />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/" />} />
          )}

          {/* ------------------------------------------------------ */}
          {/* Validating admin and resident allowed route  */}
          {role === "staff" ? (
            <Route path="/staff/*" element={<StaffPage />} />
          ) : (
            <Route path="/staff/*" element={<Navigate to="/" />} />
          )}
          {/* ----------------------------------------------------------- */}
          {/* Validating resident only allowed route  */}
          {role === "resident" ? (
            <Route path="/resident/*" element={<ResidentPage />} />
          ) : (
            <Route path="/resident/*" element={<Navigate to="/" />} />
          )}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      
      {/* Debug component - remove in production */}
      {process.env.NODE_ENV === 'development' && <AuthStatus />}
    </div>
  );
}

export default App;
