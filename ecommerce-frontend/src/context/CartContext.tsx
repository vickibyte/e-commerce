/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import React, {createContext, useContext, useState, useEffect} from "react"
// import {ProductType} from "@/types/types";

type ProductType ={
  id: number;
  name: string;
  image: string;
  price: number;
};

type CartItem = ProductType & {
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) 
    throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider: React.FC<{children : React.ReactNode}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>  (() =>{
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];

});

useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);

  const addToCart = (product: ProductType, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? {...item, quantity: item.quantity + quantity} 
        : item
        );
      }
      return [...prevItems, {...product, quantity }];
    });
  };

const isInCart = (productId: number) => {
  return cartItems.some((item) => item.id === productId);
};


  // Remove item from cart

  const removeFromCart = (Id: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) =>
        item.id !== Id));
    };


  return (
   <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart }}>
  {children}
</CartContext.Provider>

  );
};
