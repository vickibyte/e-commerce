const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [
    {
      id: Number,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
