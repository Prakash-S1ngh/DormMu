import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const EnhancedInput = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  className = "",
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <motion.label
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </motion.label>
      
      <div className="relative">
        <motion.div
          initial={false}
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused 
              ? "0 0 0 3px rgba(147, 51, 234, 0.1)" 
              : "0 0 0 0px rgba(147, 51, 234, 0)"
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            required={required}
            className={`
              w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 
              bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm
              text-gray-900 dark:text-gray-100 
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-0 focus:border-purple-500 dark:focus:border-purple-400
              transition-all duration-300 ease-in-out
              ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
              ${className}
            `}
            {...props}
          />
          
          {/* Left Icon */}
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">{icon}</span>
            </div>
          )}
          
          {/* Right Icon (Password toggle or other) */}
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </motion.div>
        
        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center space-x-1"
          >
            <span>⚠️</span>
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedInput;
