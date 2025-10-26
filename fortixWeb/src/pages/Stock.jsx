import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './Stock.css';

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      image: '🏴',
      name: 'Classic White T-Shirt',
      sku: 'TS-WHT-001',
      category: 'Apparel',
      inStock: 120,
      price: 25.00,
      status: 'In Stock'
    },
    {
      id: 2,
      image: '👢',
      name: 'Leather Ankle Boots',
      sku: 'SH-BLK-015',
      category: 'Footwear',
      inStock: 75,
      price: 120.00,
      status: 'In Stock'
    },
    {
      id: 3,
      image: '🪑',
      name: 'Minimalist Desk',
      sku: 'FN-DSK-003',
      category: 'Furniture',
      inStock: 5,
      price: 350.00,
      status: 'Low Stock'
    },
    {
      id: 4,
      image: '🎧',
      name: 'Noise-Cancelling Headphones',
      sku: 'EL-HDP-007',
      category: 'Electronics',
      inStock: 0,
      price: 199.99,
      status: 'Out of Stock'
    }
  ]);

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
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
        <button className="btn btn-primary d-flex align-items-center">
          <FaPlus className="me-2" />
          Add Product
        </button>
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
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="product-image me-3">
                          {product.image}
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.sku}</td>
                    <td>{product.category}</td>
                    <td>{product.inStock}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <span className={getStatusClass(product.status)}>
                        {product.status}
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