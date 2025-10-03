import React from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

const CredentialCard = ({ credential, onCopy, copiedField }) => {
  const { role, email, password, icon: Icon, color } = credential;

  const handleCopy = (text, field) => {
    onCopy(text, field);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className={`p-4 rounded-xl bg-gradient-to-r ${color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <span className="font-semibold text-lg">{role}</span>
        </div>
        <span className="text-xs opacity-90 bg-white/20 px-2 py-1 rounded-full">
          Click to copy
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="opacity-90 font-medium">Email:</span>
          <button
            onClick={() => handleCopy(email, "email")}
            className="font-mono hover:underline cursor-pointer flex items-center space-x-2 group"
          >
            <span className="text-sm">{email}</span>
            {copiedField === "email" ? (
              <Check className="w-4 h-4 text-green-300" />
            ) : (
              <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="opacity-90 font-medium">Password:</span>
          <button
            onClick={() => handleCopy(password, "password")}
            className="font-mono hover:underline cursor-pointer flex items-center space-x-2 group"
          >
            <span className="text-sm">{password}</span>
            {copiedField === "password" ? (
              <Check className="w-4 h-4 text-green-300" />
            ) : (
              <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-2 left-2 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>
    </motion.div>
  );
};

export default CredentialCard;
