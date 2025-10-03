import React from "react";
import { useAuth } from "../services/AuthProvider";
import { useTheme } from "../contexts/ThemeContext";

const AuthStatus = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { isDarkMode, theme } = useTheme();

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg shadow-lg z-50">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-w-xs">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Auth Status
      </h3>
      <div className="space-y-1 text-xs">
        <p>
          <span className="font-medium">Authenticated:</span>{" "}
          {isAuthenticated ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-medium">Theme:</span> {theme}
        </p>
        {user && (
          <>
            <p>
              <span className="font-medium">User:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user.role}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthStatus;
