// routes/cart.ts
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Get user cart
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    await cart.save();
  }
  res.json(cart.items);
});

// Replace cart with new items
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { items },
    { new: true, upsert: true }
  );

  res.json(cart.items);
});

// Clear cart
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  await Cart.findOneAndUpdate({ userId }, { items: [] });
  res.json({ message: "Cart cleared" });
});

// 🔹 Merge guest cart into user cart
router.post("/merge/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { guestItems } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: guestItems });
    } else {
      const merged = [...cart.items];

      guestItems.forEach((guestItem) => {
        const existing = merged.find(
          (i) => i.productId.toString() === guestItem.productId.toString()
        );

        if (existing) {
          existing.quantity += guestItem.quantity;
        } else {
          merged.push(guestItem);
        }
      });

      cart.items = merged;
    }

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    console.error("Cart merge error:", err);
    res.status(500).json({ error: "Failed to merge cart" });
  }
});

module.exports = router;
