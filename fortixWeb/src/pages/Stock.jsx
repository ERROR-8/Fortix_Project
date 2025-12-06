import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaPlus, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Stock.css';

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightedProductId, setHighlightedProductId] = useState(null);
  const navigate = useNavigate();

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

  const parseDate = (d) => {
    if (!d) return null;
    if (typeof d === 'string') {
      // Try YYYY-MM-DD format first
      const toks = d.split(/[T ]/);
      const datePart = toks[0];
      if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
        const [y, m, day] = datePart.split('-').map(Number);
        return new Date(y, m - 1, day);
      }
      // Try DD/MM/YYYY format
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(datePart)) {
        const [day, m, y] = datePart.split('/').map(Number);
        return new Date(y, m - 1, day);
      }
    }
    if (typeof d === 'number') {
      const date = new Date(d);
      return isNaN(date.getTime()) ? null : date;
    }
    const date = new Date(d);
    return isNaN(date.getTime()) ? null : date;
  };

  const formatDate = (d) => {
    const date = parseDate(d);
    if (!date) return '-';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const daysUntil = (d) => {
    const date = parseDate(d);
    if (!date) return null;
    const today = new Date();
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const diff = target.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const expiryBadge = (expDate) => {
    const days = daysUntil(expDate);
    if (days === null) return null;
    if (days < 0) return <span className="badge bg-danger">Expired</span>;
    if (days <= 30) return <span className="badge bg-warning text-dark">Expiring Soon</span>;
    return null;
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
                  <th>CATEGORY</th>
                  <th>IN STOCK</th>
                  <th>PRICE</th>
                  <th>EXPIRY</th>
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
                    <td>{product.category || '-'}</td>
                    <td>{product.quantity ?? product.inStock ?? 0}</td>
                    <td>${((product.sellingPrice || product.price) ?? 0).toFixed(2)}</td>
                    <td>
                      <div>
                        <div>{formatDate(product.expDate || product.expiry)}</div>
                        <div className="mt-1">{expiryBadge(product.expDate || product.expiry)}</div>
                      </div>
                    </td>
                    <td>
                      <span className={getStatusClass(computeStatus(product.quantity ?? product.inStock ?? 0))}>
                        {computeStatus(product.quantity ?? product.inStock ?? 0)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-link text-primary p-1"
                        onClick={() => {
                          // optional local highlight
                          setHighlightedProductId(product._id || product.id);
                          // navigate to inventory and pass product in route state
                          navigate('/inventory', { state: { editProduct: product } });
                        }}
                        title="View in Inventory"
                      >
                        <FaArrowRight />
                      </button>
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