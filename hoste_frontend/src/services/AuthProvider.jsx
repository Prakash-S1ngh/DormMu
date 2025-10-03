import { useState, createContext, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from cookies/localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Try to get user data from cookies first
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split("=");
          acc[key] = value;
          return acc;
        }, {});

        if (cookies.userData) {
          const userData = JSON.parse(decodeURIComponent(cookies.userData));
          setUser(userData);
          setRole(userData.role);
        } else {
          // Fallback to localStorage
          const userData = JSON.parse(localStorage.getItem("userData"));
          if (userData) {
            setUser(userData);
            setRole(userData.role);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear any corrupted data
        localStorage.removeItem("userData");
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);

    // Store in both cookies and localStorage for redundancy
    const userDataString = JSON.stringify(userData);
    document.cookie = `userData=${encodeURIComponent(
      userDataString
    )}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
    localStorage.setItem("userData", userDataString);
  };

  const logout = () => {
    setUser(null);
    setRole(null);

    // Clear both cookies and localStorage
    localStorage.removeItem("userData");
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to home page using window.location
    window.location.href = "/";
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    setRole(newUserData.role);

    // Update stored data
    const userDataString = JSON.stringify(newUserData);
    document.cookie = `userData=${encodeURIComponent(
      userDataString
    )}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
    localStorage.setItem("userData", userDataString);
  };

  const value = {
    user,
    role,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
