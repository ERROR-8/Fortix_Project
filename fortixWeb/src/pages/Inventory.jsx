import React, { useState } from 'react';
import { FaSearch, FaFilter, FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Inventory.css';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Running Shoes',
      model: 'Model X-25',
      sku: 'SKU-84532',
      stock: 125,
      status: 'In Stock',
      unitCost: 45.50,
      warehouse: 'WH-A',
      image: '👟',
      supplier: 'SportsGear Inc.',
      supplierContact: 'contact@sportsgear.com',
      warehouseLocation: 'Warehouse A',
      warehouseSection: 'Section 3, Bay 12',
      lastRestock: '2023-10-15'
    },
    {
      id: 2,
      name: 'Leather Wallet',
      model: 'Classic Brown',
      sku: 'SKU-98712',
      stock: 78,
      status: 'In Stock',
      unitCost: 22.00,
      warehouse: 'WH-B',
      image: '👛',
      supplier: 'LeatherCraft Co.',
      supplierContact: 'sales@leathercraft.com',
      warehouseLocation: 'Warehouse B',
      warehouseSection: 'Section 1, Bay 5',
      lastRestock: '2023-09-20'
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      model: 'Noise Cancelling',
      sku: 'SKU-45309',
      stock: 0,
      status: 'Out of Stock',
      unitCost: 120.00,
      warehouse: 'WH-A',
      image: '🎧',
      supplier: 'TechAudio Ltd.',
      supplierContact: 'orders@techaudio.com',
      warehouseLocation: 'Warehouse A',
      warehouseSection: 'Section 2, Bay 8',
      lastRestock: '2023-08-10'
    }
  ]);

  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Inventory List</h2>
        <button className="btn btn-primary">
          <FaPlus className="me-2" />
          Add New Item
        </button>
      </div>

      {/* Search and Filter */}
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

      {/* Inventory List */}
      <div className="card">
        <div className="card-body p-0">
          {filteredItems.map((item) => (
            <div key={item.id} className="inventory-item">
              {/* Main Row */}
              <div className="inventory-item-header">
                <div className="d-flex align-items-center flex-grow-1">
                  <div className="item-image me-3">
                    {item.image}
                  </div>
                  <div className="item-info">
                    <div className="fw-medium">{item.name}</div>
                    <small className="text-muted">{item.model}</small>
                  </div>
                </div>
                <div className="item-sku">{item.sku}</div>
                <div className="item-stock">{item.stock}</div>
                <div className="item-status">
                  <span className={`badge ${item.status === 'In Stock' ? 'bg-success' : 'bg-danger'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="item-cost">${item.unitCost.toFixed(2)}</div>
                <div className="item-warehouse">{item.warehouse}</div>
                <div className="item-actions">
                  <button className="btn btn-sm btn-link text-primary p-1 me-2">
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-link text-danger p-1 me-2">
                    <FaTrash />
                  </button>
                  <button 
                    className="btn btn-sm btn-link text-secondary p-1"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedItem === item.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedItem === item.id && (
                <div className="inventory-item-details">
                  <h6 className="mb-3">Detailed Information</h6>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="detail-label">Supplier Information</div>
                      <div className="fw-medium">{item.supplier}</div>
                      <div className="text-muted small">{item.supplierContact}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="detail-label">Warehouse Location</div>
                      <div className="fw-medium">{item.warehouseLocation}</div>
                      <div className="text-muted small">{item.warehouseSection}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="detail-label">Unit Cost</div>
                      <div className="fw-medium">${item.unitCost.toFixed(2)}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="detail-label">Last Restock Date</div>
                      <div className="fw-medium">{item.lastRestock}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;