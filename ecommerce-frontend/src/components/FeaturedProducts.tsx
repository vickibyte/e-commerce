/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import {
  ShoppingCart,
  Star,
  ShoppingBag,
  Shirt,
  Users,
  Heart,
  Eye
} from "lucide-react";


import { useEffect, useState, type JSX } from "react";
import { ProductType } from "@/types/types";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import "../index.css"; // External CSS for hover and modal
import { toast } from "react-hot-toast";

// Icons used for category buttons
const icons: Record<string, JSX.Element> = {
  Men: <Shirt className="w-4 h-4 text-orange-500" />,
  Women: <ShoppingBag className="w-4 h-4 text-orange-500" />,
  Unisex: <Users className="w-4 h-4 text-orange-500" />,
  All: <Star className="w-4 h-4 text-orange-500" />,
};

const FeaturedProducts = () => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Fetch products from JSON file on mount
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data: ProductType[]) => {
        setProducts(data);
        const unique = ["All", ...Array.from(new Set(data.map((p) => p.category)))];
        setUniqueCategories(unique);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Filter products by selected category
  const filtered =
    category === "All" ? products : products.filter((item) => item.category === category);

  // Wishlist button handler
  const handleWishlistToggle = (product: ProductType) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  // Trigger quantity prompt for cart
  const handleAddToCart = (product: ProductType) => {
    setSelectedProduct(product);
    setQuantity(1); // Reset to 1 each time
  };

  // Confirm quantity and add to cart
  const confirmAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      toast.success(`${quantity} item(s) added to cart`);
      setSelectedProduct(null);
    }
  };

  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-gray-600">Checkout our best-selling Items</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center transition-all duration-300">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                cat === category ? "bg-orange-500 text-white" : "bg-white text-black"
              }`}
            >
              {icons[cat] || null}
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="product-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 relative">
                {/* Product Name & Price */}
                <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                <p className="text-sm">{product.category}</p>
                <p className="text-gray-600 mb-2">₦{product.price}</p>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span>{product.rating}</span>
                </div>

                {/* Action Icons */}
                <div className="action-icons flex absolute right-5 pt-2">
                  
                  {/* View Details */}
                  <button onClick={() => navigate(`/product/${product.id}`)} title="View Details">
                    <Eye className="icon text-orange-500 hover:text-gray-800" />
                  </button>

                  {/* Wishlist Toggle */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="wishlist-icon"
                    title={
                      isInWishlist(product.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }
                  >
                    <Heart
                      className={isInWishlist(product.id) ? "text-pink-500" : "text-orange-400 hover:text-gray-800 "}
                    />
                  </button>

                  {/* Remove from Cart if in cart */}
                  {isInCart(product.id) && (
                    <button
                      onClick={() => {
                        removeFromCart(product.id);
                        toast("Removed from cart");
                      }}
                      title="Remove from Cart"
                    >
                      ❌
                    </button>
                  )}
                </div>

                {/* Add to Cart Button (opens quantity prompt) */}
                <button
                  className="add-to-cart-btn bg-orange-500 text-white px-4 py-2 rounded-full mt-4 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity Popup Modal */}
      {selectedProduct && (
        <div className="quantity-popup-overlay">
          <div className="quantity-popup">
            <h3>Select Quantity</h3>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <div className="popup-actions">
              <button className="confirm-btn" onClick={confirmAddToCart}>Confirm</button>
              <button className="cancel-btn" onClick={() => setSelectedProduct(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
