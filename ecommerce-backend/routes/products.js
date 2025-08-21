const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getProducts, createProduct } = require("../controllers/productController");


const {
  // getProducts,
  getProductById,
  // createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
