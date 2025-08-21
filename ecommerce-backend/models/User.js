const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   firstName: {
    type: String,
    required: true,
    trim: true
  },
   lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String, enum: ["user", "admin"], default: "user"
  }
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;

