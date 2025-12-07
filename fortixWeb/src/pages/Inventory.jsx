import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Inventory.css';
import ConfirmModal from '../components/ConfirmModal';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const [highlightedItemId, setHighlightedItemId] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ productName: '', serialNumber: '', category: '', purchasePrice: '', sellingPrice: '', expDate: '', quantity: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (!location || !location.state || !location.state.editProduct) return;
    const editProduct = location.state.editProduct;
    if (!items || items.length === 0) return;
    const found = items.find(i => i._id === editProduct._id || i.productName === editProduct.productName);
    if (found) {
      setExpandedItem(found._id);
      setHighlightedItemId(found._id);
      // clear history state so refresh doesn't re-expand
      try { window.history.replaceState({}, document.title); } catch (e) {}
      // scroll into view
      setTimeout(() => {
        const el = document.querySelector(`[data-inv-id="${found._id}"]`);
        if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
      // remove highlight after a short delay
      setTimeout(() => setHighlightedItemId(null), 3000);
    }
  }, [items, location]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/inventory');
      const data = res.data;
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch inventory', err);
    }
    setLoading(false);
  };

  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleAddClick = () => {
    setEditing(null);
    setForm({ productName: '', serialNumber: '', category: '', purchasePrice: '', sellingPrice: '', expDate: '', quantity: '' });
    setShowForm(true);
  };

    const handleEdit = (item) => {
    setEditing(item._id);
    setForm({
      productName: item.productName || '',
      serialNumber: item.serialNumber || '',
      category: item.category || '',
      purchasePrice: item.purchasePrice || '',
      sellingPrice: item.sellingPrice || '',
      expDate: item.expDate || '',
      quantity: item.quantity || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    // show modal confirmation instead
    requestDelete(id);
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const requestDelete = (id) => {
    setToDeleteId(id);
    setShowConfirm(true);
  };

  const onCancelDelete = () => {
    setToDeleteId(null);
    setShowConfirm(false);
  };

  const onConfirmDelete = async () => {
    if (!toDeleteId) return onCancelDelete();
    try {
      const res = await axios.delete(`/api/inventory/${toDeleteId}`);
      if (res.status === 200 || res.status === 204) {
        setItems(items.filter(i => i._id !== toDeleteId));
      } else {
        console.error('Delete failed', res.status);
        alert('Delete failed');
      }
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
    setShowConfirm(false);
    setToDeleteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.productName || !form.category) {
      alert('Product name and category are required');
      return;
    }

    try {
            if (editing) {
        const res = await axios.put(`/api/inventory/${editing}`, {
          productName: form.productName,
          serialNumber: form.serialNumber,
          category: form.category,
          purchasePrice: Number(form.purchasePrice) || 0,
          sellingPrice: Number(form.sellingPrice) || 0,
          expDate: form.expDate,
          quantity: Number(form.quantity) || 0,
        });
        const updated = res.data;
        setItems(items.map(i => (i._id === updated._id ? updated : i)));
      } else {
        const res = await axios.post('/api/inventory', {
          productName: form.productName,
          serialNumber: form.serialNumber,
          category: form.category,
          purchasePrice: Number(form.purchasePrice) || 0,
          sellingPrice: Number(form.sellingPrice) || 0,
          expDate: form.expDate,
          quantity: Number(form.quantity) || 0,
        });
        const created = res.data;
        setItems([created, ...items]);
      }
      setShowForm(false);
      setEditing(null);
            setForm({ productName: '', serialNumber: '', category: '', purchasePrice: '', sellingPrice: '', expDate: '', quantity: '' });
    } catch (err) {
      console.error(err);
    }
  };

    const filteredItems = items.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.serialNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Inventory List</h2>
        <button className="btn btn-primary" onClick={handleAddClick}>
          <FaPlus className="me-2" />
          Add New Item
        </button>
      </div>

      <div className="d-flex gap-3 mb-4">
        <div className="search-box flex-grow-1">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary">
          <FaFilter className="me-2" />
          Filter
        </button>
      </div>

      {showForm && (
        <div className="card mb-4 p-3">
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
                            <div className="col-md-4">
                <input name="productName" value={form.productName} onChange={handleChange} className="form-control" placeholder="Product name" />
              </div>
              <div className="col-md-2">
                <input name="serialNumber" value={form.serialNumber} onChange={handleChange} className="form-control" placeholder="Serial Number" />
              </div>
              <div className="col-md-2">
                <input name="category" value={form.category} onChange={handleChange} className="form-control" placeholder="Category" />
              </div>
              <div className="col-md-2">
                <input name="purchasePrice" value={form.purchasePrice} onChange={handleChange} className="form-control" placeholder="Purchase price" type="number" />
              </div>
              <div className="col-md-2">
                <input name="sellingPrice" value={form.sellingPrice} onChange={handleChange} className="form-control" placeholder="Selling price" type="number" />
              </div>
              <div className="col-md-2">
                <input name="quantity" value={form.quantity} onChange={handleChange} className="form-control" placeholder="Quantity" type="number" />
              </div>
            </div>
            <div className="mt-2 d-flex gap-2">
              <input name="expDate" value={form.expDate} onChange={handleChange} className="form-control" placeholder="Exp date (YYYY-MM-DD)" />
              <button className="btn btn-success" type="submit">{editing ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <div className="p-3">Loading...</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id} className="inventory-item" data-inv-id={item._id} style={{ backgroundColor: highlightedItemId === item._id ? '#e7f3ff' : 'transparent', transition: 'background-color 0.3s ease' }}>
                <div className="inventory-item-header">
                  <div className="d-flex align-items-center flex-grow-1">
                    <div className="item-image me-3">📦</div>
                                      <div className="item-info">
                      <div className="fw-medium">{item.productName}</div>
                      <small className="text-muted">{item.serialNumber}</small>
                    </div>
                  </div>
                  <div className="item-sku">{item.category}</div>
                  <div className="item-stock">{item.quantity}</div>
                  <div className="item-status">
                    <span className={`badge ${item.quantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                      {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="item-cost">₹{Number(item.sellingPrice || 0).toFixed(2)}</div>
                  <div className="item-warehouse">{item.category}</div>
                  <div className="item-actions">
                    <button className="btn btn-sm btn-link text-primary p-1 me-2" onClick={() => handleEdit(item)}>
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm btn-link text-danger p-1 me-2" onClick={() => handleDelete(item._id)}>
                      <FaTrash />
                    </button>
                    <button className="btn btn-sm btn-link text-secondary p-1" onClick={() => toggleExpand(item._id)}>
                      {expandedItem === item._id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>

                {expandedItem === item._id && (
                                    <div className="inventory-item-details">
                    <h6 className="mb-3">Detailed Information</h6>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="detail-label">Serial Number</div>
                        <div className="fw-medium">{item.serialNumber}</div>
                      </div>
                      <div className="col-md-3">
                        <div className="detail-label">Purchase Price</div>
                        <div className="fw-medium">₹{Number(item.purchasePrice || 0).toFixed(2)}</div>
                      </div>
                      <div className="col-md-3">
                        <div className="detail-label">Selling Price</div>
                        <div className="fw-medium">₹{Number(item.sellingPrice || 0).toFixed(2)}</div>
                      </div>
                      <div className="col-md-3">
                        <div className="detail-label">Expiry Date</div>
                        <div className="fw-medium">{item.expDate}</div>
                      </div>
                      <div className="col-md-3">
                        <div className="detail-label">Quantity</div>
                        <div className="fw-medium">{item.quantity}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <ConfirmModal show={showConfirm} title="Delete item" message="Are you sure you want to delete this inventory item?" onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
    </div>
  );
};

export default Inventory;