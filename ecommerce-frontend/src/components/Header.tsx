/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { ShoppingCart, User2, MenuIcon, Heart } from "lucide-react";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useContext } from "react";
import AuthModal from "../components/AuthModal";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

const Header = () => {
  // Access cart & wishlist contexts
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  // Access authentication context
  const { user, logout } = useContext(AuthContext);

  // Modal open/close state
  const [authOpen, setAuthOpen] = useState(false);

  // Item counts for icons
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  // Currency dropdown handler
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected currency:", event.target.value);
  };

  return (
    <header className="bg-white shadow-md">
      {/* ===== Top Header Bar ===== */}
      <div className="bg-gray-50 py-2 px-4 flex justify-between items-center space-x-4 text-sm">
        {/* Currency Selector */}
        <form method="post">
          <select
            name="wjc-currency"
            id="wjc-currency-select"
            onChange={handleCurrencyChange}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-300"
            defaultValue="NGN"
          >
            <option value="NGN">NGN (₦)</option>
            <option value="USD">USD ($)</option>
          </select>
        </form>

        {/* Auth Section — shows Login/Register OR user info */}
        {user ? (
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User2 className="text-orange-300 w-4 h-4" />
              {user.name}
            </span>
            <button
              onClick={logout}
              className="text-red-500 hover:underline text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAuthOpen(true)}
            className="flex items-center gap-1 hover:underline"
          >
            <User2 className="text-orange-300 w-4 h-4" />
            Login/Register
          </button>
        )}
      </div>

      {/* ===== Main Header ===== */}
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* Mobile Menu Icon */}
        <MenuIcon className="lg:hidden" />

        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-500">ShopMate</h1>

        {/* Cart & Wishlist Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <div className="relative icon-with-tooltip">
            <a href="/cart" target="_blank" className="icon-btn">
              <ShoppingCart className="text-orange-300" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="tooltip">Cart</span>
            </a>
          </div>

          {/* Wishlist Icon */}
          <div className="relative icon-with-tooltip">
            <a href="/wishlist" target="_blank" className="icon-btn">
              <Heart className="text-orange-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
              <span className="tooltip">Wishlist</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== Hero Section ===== */}
      <div className="bg-orange-500 text-white text-center py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-start md:flex-row md:items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold">Clothing & Apparel</h2>
              <p className="mt-2 text-lg md:text-xl">Shop the latest trends</p>
            </div>
          </div>
        </div>

        {/* Navbar (desktop only) */}
        <div className="relative hidden md:flex justify-center">
          <Navbar />
        </div>
      </div>

      {/* ===== Authentication Modal ===== */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
};

export default Header;
