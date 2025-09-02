

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/products");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const cartRoutes = require ("./routes/cart");
const User = require("./models/User");

async function seedAdmin() {
  const email = "admin@fisher9ine.com";
  const existingAdmin = await User.findOne({ email });

  if (!existingAdmin) {
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash("Admin@fisher9ine", salt);

    const admin = await User.create({
      firstName: "Bukola",
      lastName: "David",
      username: "Admin",
      email,
      password: hashed,
      role: "admin",
    });

    console.log(`✅ Admin account created: ${admin.email} / Admin123!`);
  } else if (existingAdmin.role !== "admin") {
    existingAdmin.role = "admin";
    await existingAdmin.save();
    console.log(`✅ User ${email} promoted to admin`);
  }
}


const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json()); // handles JSON bodies

// ===== ROUTES =====
app.use("/api/auth", authRoutes);      // register, login, getMe
app.use("/api/users", userRoutes);     // user-related routes
app.use("/api/admin", require("./routes/admin"));    // admin-related routes
app.use("/api/products", productRoutes); // product routes
app.use("/api/cart", cartRoutes);       // cart routes

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
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await seedAdmin();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));
