const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin dashboard only (no product CRUD here)
router.get("/dashboard", protect, adminOnly, async (req, res) => {
  try {
    res.json({ message: `Welcome Admin ${req.user?.name || "Unknown"}` });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
