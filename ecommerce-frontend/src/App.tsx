import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import './App.css';
import { useLoading } from "./context/LoadingContext";
import FullPageLoader from "./components/FullPageLoader";
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import { Toaster } from "react-hot-toast";
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { loading } = useLoading();

  return (
    <Router>
      <Layout>
        {loading && <FullPageLoader />}
        <Toaster position="top-right" />

        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <FeaturedProducts />
              </>
            }
          />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Cart page */}
          <Route path="/cart" element={<Cart />} />

          {/* Wishlist page */}
          <Route path="/wishlist" element={<Wishlist />} />

          {/* Admin dashboard - protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
