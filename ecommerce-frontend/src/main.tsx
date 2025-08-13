import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { CartProvider } from './context/CartContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <LoadingProvider>
    <WishlistProvider> 
    <CartProvider>
      
      <App />
    </CartProvider>
      </WishlistProvider>
 
    </LoadingProvider>
    
  </StrictMode>,
);
