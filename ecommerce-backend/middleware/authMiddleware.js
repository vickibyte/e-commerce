// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

/**
 * Base Authentication & Role-based Authorization Middleware
 * 
 * @param {Array|string} roles - Roles allowed to access the route.
 */
const auth = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

// 🔹 Explicit Middlewares
const protect = auth();          // Any logged-in user
const adminOnly = auth("admin"); // Only admins

module.exports = { protect, adminOnly };
