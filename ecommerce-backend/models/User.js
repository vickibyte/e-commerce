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
  }
}, { timestamps: true });

router.get("/check-username", async (req, res) => {
  const { username } = req.query;
  if (!username) return
  res.status(400).json({ message : 'username required'});

  const existingUser =await 
  User.findOne({ username });
  res.json({ available: !existingUser });
});


module.exports = mongoose.model("User", userSchema);
