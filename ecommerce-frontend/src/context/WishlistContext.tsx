/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ProductType } from "../types/types";


export interface WishlistItem extends ProductType {}

// Type for each item in the wishlist
// type WishlistItem = {
//   id: number; // Keep as number to avoid conversion issues
//   name: string;
//   price: number;
//   image: string;
// };

// Type for the context
type WishlistContextType = {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: number) => boolean; // Accepts a number
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
};

// Create the context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Provider component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlistItems(JSON.parse(stored));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add an item to the wishlist
  const addToWishlist = (item: WishlistItem) => {
    if (!wishlistItems.find((i) => i.id === item.id)) {
      setWishlistItems([...wishlistItems, item]);
    }
  };

  // Remove an item by ID
  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear the entire wishlist
  const clearWishlist = () => {setWishlistItems([])
  };

  // Check if a product is already in the wishlist
  const isInWishlist = (id: number): boolean => {
    return wishlistItems.some((item) => item.id === id);
  };

  // Provide context values
  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, isInWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Hook for consuming the context
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
