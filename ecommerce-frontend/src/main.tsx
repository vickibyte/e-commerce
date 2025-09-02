import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { WishlistProvider } from "./context/WishlistContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx"; // 👈 import this

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider> {/* 👈 wrap your app in AuthProvider */}
      <LoadingProvider>
        <WishlistProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </WishlistProvider>
      </LoadingProvider>
    </AuthProvider>
  </StrictMode>
);
