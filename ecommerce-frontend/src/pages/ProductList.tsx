/**
 * @license MIT
 * @copyright 2025 Bukola David
 */


// src/components/ProductList.tsx
import React, { useEffect, useState } from 'react';
import {api} from '../lib/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product._id} style={{ marginBottom: '0.5rem' }}>
            {product.name} - ${product.price} - Stock: {product.stock}
            <button onClick={() => deleteProduct(product._id)} style={{ marginLeft: '1rem' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

