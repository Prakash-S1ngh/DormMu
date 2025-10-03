import React, { useState } from "react";
import { Link } from "react-router-dom";
import logotext from "../assets/hosteledge logo.png";
import logo from "../assets/hosteledge logo text.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../services/AuthProvider";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDarkMode } = useTheme();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "admin":
        return "/admin";
      case "staff":
        return "/staff";
      case "resident":
        return "/resident";
      default:
        return "/";
    }
  };

  return (
    <>
      <header className="lg:py-3 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-16 z-50 theme-transition">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm lg:rounded-md lg:shadow-lg dark:lg:shadow-gray-900/20 lg:h-24 lg:px-8 lg:py-6 z-30 border border-gray-200/50 dark:border-gray-700/50">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img className="w-auto h-8 lg:h-10" src={logotext} alt="Logo" />
                <img className="w-auto h-8 lg:h-10" src={logo} alt="Logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {["Contact", "About Us", "Location", "Pricing"].map((link) => (
                <span
                  key={link}
                  className="text-base font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
                >
                  {link}
                </span>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user?.role}
                    </p>
                  </div>
                  <Link
                    to={getDashboardLink()}
                    className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200 border border-purple-200 dark:border-purple-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/register">
                    <span className="px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                      Sign up
                    </span>
                  </Link>
                  <Link to="/">
                    <span className="px-4 py-2 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-lg transition-colors duration-200">
                      Sign in
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex p-2 ml-5 text-gray-700 dark:text-gray-300 transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 dark:focus:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <motion.div
                animate={menuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </motion.div>
            </button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                className="lg:hidden fixed top-16 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b-2 border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/20 z-30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-6 space-y-4">
                  {/* Theme Toggle for Mobile */}
                  <div className="flex justify-center pb-4">
                    <ThemeToggle />
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="space-y-2">
                    {["Contact", "About Us", "Location", "Pricing"].map(
                      (link) => (
                        <span
                          key={link}
                          className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer"
                          onClick={closeMenu}
                        >
                          {link}
                        </span>
                      )
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="text-center pb-4">
                          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {user?.role}
                          </p>
                        </div>
                        <Link
                          to={getDashboardLink()}
                          onClick={closeMenu}
                          className="block w-full text-center px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200 border border-purple-200 dark:border-purple-700"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-3 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-lg transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          to="/register"
                          onClick={closeMenu}
                          className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                        >
                          Sign up
                        </Link>
                        <Link
                          to="/"
                          onClick={closeMenu}
                          className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-lg transition-colors duration-200"
                        >
                          Sign in
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
        <ToastContainer 
          theme={isDarkMode ? "dark" : "light"}
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </header>
    </>
  );
};
