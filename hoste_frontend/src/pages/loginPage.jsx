import React, { useState, useEffect } from "react";
import registerSideImage1 from "../assets/register-side-image 1.webp";
import registerSideImage2 from "../assets/register-side-image 2.webp";
import registerSideImage3 from "../assets/register-side-image 3.avif";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../services/AuthProvider";
import { useTheme } from "../contexts/ThemeContext";
import LoadingButton from "../components/LoadingButton";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Copy, Crown, User, Shield } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const images = [registerSideImage1, registerSideImage2, registerSideImage3];
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await API.post("/login", { email, password });

      toast.success(res.data.message);

      // Create user data object
      const userData = {
        token: res.data.token,
        userid: res.data.userid,
        role: res.data.role,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
        email: res.data.email,
      };

      // Login using the enhanced auth context
      login(userData, res.data.role);

      setTimeout(() => {
        setIsLoading(false);
        navigate(`/${res.data.role}`);
      }, 1200);
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, type: "spring" },
    },
  };

  const adminCredentials = [
    {
      role: "Admin",
      email: "azardevacc@gmail.com",
      password: "azardev@123",
      icon: Crown,
      color: "from-purple-600 to-pink-600",
    },
    {
      role: "Staff",
      email: "staff@hostel.com",
      password: "staff123",
      icon: Shield,
      color: "from-blue-600 to-cyan-600",
    },
    {
      role: "Resident",
      email: "resident@hostel.com",
      password: "resident123",
      icon: User,
      color: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <>
      <motion.div
        className="relative flex min-h-screen justify-center items-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 theme-transition overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          className="absolute top-8 text-4xl font-bold text-center py-8 text-gray-800 dark:text-gray-100 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-gradient">🏠 Hostel Management System</span>
        </motion.div>

        <div className="flex w-full max-w-7xl mx-auto px-4 mt-20 relative z-10">
          {/* Left Side - Sign In Form */}
          <motion.div
            className="w-full lg:w-1/2 px-6 py-12 lg:px-16 xl:px-24"
            variants={formVariants}
          >
            <div className="max-w-md mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl dark:shadow-gray-900/40 hover:shadow-3xl dark:hover:shadow-gray-900/60 transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-3xl">🔐</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Welcome Back! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Login to your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="input-field pl-10"
                      placeholder="Enter your email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">📧</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="input-field pr-12"
                      placeholder="Enter your password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">🔒</span>
                    </div>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <LoadingButton
                  isLoading={isLoading}
                  text={"Sign In"}
                  style={"w-full btn-primary text-lg font-semibold py-4"}
                />
              </form>

              {/* Demo Credentials Section */}
              <div className="mt-8">
                <button
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="w-full text-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 mb-4"
                >
                  {showCredentials ? "Hide" : "Show"} Demo Credentials
                </button>

                <AnimatePresence>
                  {showCredentials && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      {adminCredentials.map((cred, index) => {
                        const IconComponent = cred.icon;
                        return (
                          <motion.div
                            key={cred.role}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl bg-gradient-to-r ${cred.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <IconComponent className="w-5 h-5" />
                                <span className="font-semibold">
                                  {cred.role}
                                </span>
                              </div>
                              <span className="text-xs opacity-90">
                                Click to copy
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="opacity-90">Email:</span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(cred.email, "Email")
                                  }
                                  className="font-mono hover:underline cursor-pointer"
                                >
                                  {cred.email}
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="opacity-90">Password:</span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(cred.password, "Password")
                                  }
                                  className="font-mono hover:underline cursor-pointer"
                                >
                                  {cred.password}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Don't have an account?{" "}
                  <Link to={"/register"}>
                    <span className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-200 font-medium">
                      Register here
                    </span>
                  </Link>
                </p>

                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>🔒</span>
                  <span>Secure authentication with JWT tokens</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Preview */}
          <motion.div
            className="hidden lg:block lg:w-1/2"
            variants={imageVariants}
          >
            <div className="h-full flex items-center justify-center px-8">
              <div className="max-w-2xl">
                <div className="relative">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl dark:shadow-gray-900/40 p-8 mb-8 border border-gray-200/50 dark:border-gray-700/50">
                    <motion.img
                      src={images[currentSlide]}
                      alt="Dashboard preview"
                      className="w-full h-[450px] rounded-2xl object-cover shadow-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                      Share And Care 🏠
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      Best Place to Share and relax yourself feel like home and
                      Secure
                    </p>

                    <div className="flex justify-center gap-3 mt-8">
                      {[0, 1, 2].map((index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            currentSlide === index
                              ? "bg-purple-600 dark:bg-purple-400 scale-125 shadow-lg"
                              : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-110"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <ToastContainer
          theme={isDarkMode ? "dark" : "light"}
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </motion.div>
    </>
  );
}
