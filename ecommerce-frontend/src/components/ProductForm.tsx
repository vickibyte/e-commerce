/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import React, { useState } from 'react';
import { api } from '../lib/api';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // ✅ Simple validation
    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (price <= 0) {
      setError('Price must be greater than 0.');
      return;
    }
    if (stock < 0) {
      setError('Stock cannot be negative.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/products', {
        name,
        price,
        stock,
        category: 'Default',
        images: [],
      });
      setName('');
      setPrice(0);
      setStock(0);
      setSuccess('✅ Product added successfully!');
    } catch (err) {
      setError('❌ Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '300px',
      }}
    >
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(Number(e.target.value))}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>

      {/* ✅ Feedback messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default ProductForm;
