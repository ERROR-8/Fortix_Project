import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaSearch, FaChartLine, FaStar, FaHistory } from 'react-icons/fa';

const Sales = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [salesData, setSalesData] = useState({
    stats: { today: 0, week: 0, month: 0 },
    topProducts: [],
    recentSales: [],
  });
  const [salesLoading, setSalesLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    setSalesLoading(true);
    try {
      const res = await axios.get('/api/sales');
      const sales = res.data || [];

      // Assuming the backend returns sales sorted by date descending
      const recentSales = sales.slice(0, 5);

      // Calculate stats and top products
      const { stats, topProducts } = processSales(sales);

      setSalesData({ stats, topProducts, recentSales });
    } catch (err) {
      console.error('Failed to load sales data', err);
      setMessage('Could not load sales analytics.');
    }
    setSalesLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) return setMessage('Please enter a serial number or product name.');
    setSearchLoading(true);
    setMessage('');
    setProduct(null);
    try {
      // First try serial lookup
      try {
        const res = await axios.get(`/api/inventory/serial/${searchQuery}`);
        setProduct(res.data);
        setSearchLoading(false);
        return;
      } catch (err) {
        // if serial lookup fails (404 or other), fall back to name search
      }

      const res = await axios.get('/api/inventory');
      const list = res.data || [];
      const match = list.find(item => item.productName && item.productName.toLowerCase().includes(searchQuery.toLowerCase()));
      if (match) {
        setProduct(match);
      } else {
        setProduct(null);
        setMessage('Product not found.');
      }
    } catch (err) {
      setProduct(null);
      setMessage('Product not found.');
      console.error('Failed to fetch product', err);
    }
    setSearchLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return setMessage('Please fetch a product first.');
    const qty = Number(quantity || 0);
    if (qty <= 0) return setMessage('Enter a valid sold quantity');

    try {
      const res = await axios.post('/api/sales', {
        inventoryId: product._id,
        quantitySold: qty,
      });

      const { updatedInventory } = res.data;
      setProduct(updatedInventory);
      setMessage(`Sale recorded. Sold ${qty} units. Remaining stock: ${updatedInventory.quantity}`);
      setSearchQuery('');
      setQuantity(1);
      setProduct(null); // Clear product form
      fetchSalesData(); // Refresh sales data
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Sale failed');
    }
  };

  const processSales = (sales) => {
    const stats = { today: 0, week: 0, month: 0 };
    const productMap = new Map();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    sales.forEach(sale => {
      const saleDate = new Date(sale.createdAt);
      const saleTotal = (sale.inventory?.sellingPrice || 0) * sale.quantitySold;

      if (saleDate >= today) {
        stats.today += saleTotal;
      }
      if (saleDate >= startOfWeek) {
        stats.week += saleTotal;
      }
      if (saleDate >= startOfMonth) {
        stats.month += saleTotal;
      }

      if (sale.inventory) {
        const { _id, productName } = sale.inventory;
        if (productMap.has(_id)) {
          productMap.get(_id).totalSold += sale.quantitySold;
        } else {
          productMap.set(_id, { productName, totalSold: sale.quantitySold });
        }
      }
    });

    const topProducts = Array.from(productMap.values())
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    return { stats, topProducts };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  };


  return (
    <div className="sales-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0"><FaShoppingCart className="me-2"/>Sales</h2>
      </div>

      <div className="card p-3 mb-4">
        <h5 className="mb-3"><FaChartLine className="me-2" />Sales Overview</h5>
        {salesLoading ? (<div>Loading stats...</div>) : (
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Today's Sales</h6>
                  <h4 className="card-title">₹{salesData.stats.today.toFixed(2)}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">This Week's Sales</h6>
                  <h4 className="card-title">₹{salesData.stats.week.toFixed(2)}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">This Month's Sales</h6>
                  <h4 className="card-title">₹{salesData.stats.month.toFixed(2)}</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card p-3 mb-4">
        <h5>Record a New Sale</h5>
        <div className="row g-2 align-items-end">
          <div className="col-md-8">
            <label className="form-label">Search (serial number or product name)</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter serial number or product name"
              />
              <button className="btn btn-primary" onClick={handleSearch} disabled={searchLoading}>
                {searchLoading ? '...' : <FaSearch />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {product && (
        <div className="card p-3 mb-4">
          <form onSubmit={handleSubmit}>
            <h5>Product Details</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <strong>Product Name:</strong> {product.productName}
              </div>
              <div className="col-md-4">
                <strong>Category:</strong> {product.category}
              </div>
              <div className="col-md-4">
                <strong>In Stock:</strong> {product.quantity}
              </div>
            </div>
            <div className="row g-2 align-items-end mt-3">
              <div className="col-md-3">
                <label className="form-label">Quantity to Sell</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  max={product.quantity}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Selling Price</label>
                <div className="form-control">₹{product.sellingPrice.toFixed(2)}</div>
              </div>
              <div className="col-md-3">
                <label className="form-label">Total</label>
                <div className="form-control">₹{(quantity * product.sellingPrice).toFixed(2)}</div>
              </div>
              <div className="col-md-3 text-end">
                <button className="btn btn-success" type="submit">Record Sale</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="mb-3"><FaStar className="me-2" />Top Selling Products</h5>
              {salesLoading ? (<div>Loading...</div>) : (
                <ul className="list-group list-group-flush">
                  {salesData.topProducts.length > 0 ? salesData.topProducts.map((p, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {p.productName}
                      <span className="badge bg-primary rounded-pill">{p.totalSold} units</span>
                    </li>
                  )) : <li className="list-group-item">No sales data available.</li>}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="mb-3"><FaHistory className="me-2" />Recent Sales</h5>
              {salesLoading ? (<div>Loading...</div>) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.recentSales.length > 0 ? salesData.recentSales.map(sale => (
                        <tr key={sale._id}>
                          <td>{sale.inventory?.productName || 'N/A'}</td>
                          <td>{sale.quantitySold}</td>
                          <td>₹{((sale.inventory?.sellingPrice || 0) * sale.quantitySold).toFixed(2)}</td>
                          <td>{formatDate(sale.createdAt)}</td>
                        </tr>
                      )) : (
                        <tr><td colSpan="4" className="text-center">No recent sales.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;