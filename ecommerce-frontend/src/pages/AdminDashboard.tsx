/**
 * @license MIT
 * @copyright 2025 Bukola David
 */


import ProductList from './ProductList';
import ProductForm from '../components/ProductForm';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (

    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      {user && (
        <p>Welcome {user.username}, <strong>{user.role}</strong></p>
      )}
      <button onClick={handleLogout}>Logout</button>
      <section style={{ marginBottom: '2rem' }}>
        <h2>Add Product</h2>
        <ProductForm />
      </section>
      <section>
        <h2>All Products</h2>
        <ProductList />
      </section>
    </div>
  );
};

export default AdminDashboard;