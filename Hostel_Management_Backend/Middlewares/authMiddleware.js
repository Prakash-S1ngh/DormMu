const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
require("dotenv").config();

// Enhanced auth Middleware supporting both cookies and headers
const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    // First try to get token from cookies (preferred method)
    if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken;
    }
    // Fallback to Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
