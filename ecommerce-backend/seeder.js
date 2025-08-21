const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = new User({
      name: "Super Admin",
      email: "admin@example.com",
      password: "AdminPass123", // change after first login
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
