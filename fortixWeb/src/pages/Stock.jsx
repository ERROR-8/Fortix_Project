import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './Stock.css';

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/inventory');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to load inventory', err);
    }
    setLoading(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'In Stock':
        return 'badge bg-success';
      case 'Low Stock':
        return 'badge bg-warning text-dark';
      case 'Out of Stock':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const computeStatus = (qty) => {
    if (qty <= 0) return 'Out of Stock';
    if (qty <= 10) return 'Low Stock';
    return 'In Stock';
  };

  const filteredProducts = products.filter(product =>
    (product.productName || product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.sku || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stock-page">
      {/* Search and Add Product Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Add Product button removed as requested */}
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>PRODUCT NAME</th>
                  <th>SKU</th>
                  <th>CATEGORY</th>
                  <th>IN STOCK</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id || product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="product-image me-3">
                          {/* simple emoji placeholder */}
                          {product.image || '📦'}
                        </div>
                        <span>{product.productName || product.name}</span>
                      </div>
                    </td>
                    <td>{product.sku || '-'}</td>
                    <td>{product.category || '-'}</td>
                    <td>{product.quantity ?? product.inStock ?? 0}</td>
                    <td>${((product.sellingPrice || product.price) ?? 0).toFixed(2)}</td>
                    <td>
                      <span className={getStatusClass(computeStatus(product.quantity ?? product.inStock ?? 0))}>
                        {computeStatus(product.quantity ?? product.inStock ?? 0)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;