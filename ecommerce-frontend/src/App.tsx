
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import './App.css'
import { useLoading } from "./context/LoadingContext";
import FullPageLoader from "./components/FullPageLoader";
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Wishlist from './pages/Wishlist';
import { Toaster } from "react-hot-toast";

const App = () => {
  const { loading } = useLoading();

  return (
    <Router>
      <Layout>
        {loading && <FullPageLoader />}

        <Routes>
          <Route path="/" element={
            <>
              <Toaster position="top-right" />
              <Hero />
              <FeaturedProducts />
            </>
          } />

          {/* Define other routes here */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />


          
           {/* Fallback for any unknown route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
