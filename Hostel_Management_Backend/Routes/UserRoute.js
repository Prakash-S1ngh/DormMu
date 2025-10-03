const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userDashboard,
  userLogout,
  getCurrentUser
} = require("../Controllers/UserController");
const authMiddleware = require("../Middlewares/authMiddleware");

// Public routes
router.post("/register", userRegister);
router.post("/login", userLogin);

// Protected routes
router.get("/userdashboard", authMiddleware, userDashboard);
router.get("/me", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, userLogout);

module.exports = router;
