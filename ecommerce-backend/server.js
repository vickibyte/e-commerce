const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json()); // handles JSON bodies

// ===== ROUTES =====
app.use("/api/auth", authRoutes);      // register, login, getMe
app.use("/api/users", userRoutes);     // user-related routes
app.use("/api/admin", adminRoutes);    // admin-related routes
app.use("/api/products", productRoutes); // product routes

// ===== HEALTH CHECK =====
app.get("/", (_req, res) => res.json({ ok: true, msg: "API is running" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ===== CONNECT TO MONGODB & START SERVER =====
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
