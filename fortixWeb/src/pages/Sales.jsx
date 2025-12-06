import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/inventory');
      setProducts(res.data || []);
    } catch (err) {
      console.error('Failed to load products for sales', err);
    }
    setLoading(false);
  };

  const onSelect = (id) => {
    setSelectedId(id);
    const p = products.find(x => (x._id || x.id) === id);
    setUnitPrice(p ? Number(p.sellingPrice || p.price || 0) : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return setMessage('Select a product');
    const qty = Number(quantity || 0);
    if (qty <= 0) return setMessage('Enter a valid sold quantity');

    try {
      // Get latest product
      const res = await axios.get(`/api/inventory/${selectedId}`);
      const prod = res.data;
      const currentQty = Number(prod.quantity ?? 0);
      if (qty > currentQty) return setMessage('Not enough stock');

      const newQty = currentQty - qty;
      const updateRes = await axios.put(`/api/inventory/${selectedId}`, { ...prod, quantity: newQty });
      const updated = updateRes.data;
      setMessage(`Sale recorded. Sold ${qty} units for ₹${(qty * unitPrice).toFixed(2)}. Remaining stock: ${updated.quantity}`);
      // refresh products
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage('Sale failed');
    }
  };

  const total = (Number(quantity || 0) * Number(unitPrice || 0)).toFixed(2);

  return (
    <div className="sales-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0"><FaShoppingCart className="me-2"/>Sales</h2>
      </div>

      <div className="card p-3 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-2 align-items-end">
            <div className="col-md-5">
              <label className="form-label">Product</label>
              <select className="form-select" value={selectedId} onChange={(e) => onSelect(e.target.value)}>
                <option value="">-- Select product --</option>
                {products.map(p => (
                  <option key={p._id || p.id} value={p._id || p.id}>{p.productName} • {p.category} • {p.quantity} in stock</option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="form-label">Quantity</label>
              <input type="number" min="1" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div className="col-md-2">
              <label className="form-label">Unit price (₹)</label>
              <input type="number" min="0" step="0.01" className="form-control" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
            </div>

            <div className="col-md-2">
              <label className="form-label">Total</label>
              <div className="form-control">₹{total}</div>
            </div>

            <div className="col-md-1 text-end">
              <button className="btn btn-success">Record</button>
            </div>
          </div>
        </form>
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="card">
        <div className="card-body">
          <h5>Current Inventory Snapshot</h5>
          {loading ? (
            <div>Loading…</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr><th>Product</th><th>Category</th><th>Qty</th><th>Price (₹)</th></tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id || p.id}>
                      <td>{p.productName}</td>
                      <td>{p.category}</td>
                      <td>{p.quantity}</td>
                      <td>₹{Number(p.sellingPrice || p.price || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;
