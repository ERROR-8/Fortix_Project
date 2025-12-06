import React, { useEffect, useState } from 'react';
import { FaBoxes, FaExclamationTriangle, FaList, FaDollarSign } from 'react-icons/fa';
import axios from 'axios';
import './Reports.css';

const Reports = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ totalSKUs: 0, totalQuantity: 0, totalValue: 0 });
  const [lowStock, setLowStock] = useState([]);
  const [byCategory, setByCategory] = useState({});

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/inventory');
      const items = res.data || [];
      setInventory(items);
      computeReports(items);
    } catch (err) {
      console.error('Failed to load inventory for reports', err);
    }
    setLoading(false);
  };

  const computeReports = (items) => {
    const totalSKUs = items.length;
    let totalQuantity = 0;
    let totalValue = 0; // use purchasePrice * quantity as inventory cost
    const low = [];
    const cat = {};

    items.forEach((it) => {
      const qty = Number(it.quantity ?? 0);
      const price = Number(it.purchasePrice ?? it.sellingPrice ?? 0);
      totalQuantity += qty;
      totalValue += qty * price;
      if (qty <= 10) low.push(it);
      const c = it.category || 'Uncategorized';
      if (!cat[c]) cat[c] = { count: 0, quantity: 0, value: 0 };
      cat[c].count += 1;
      cat[c].quantity += qty;
      cat[c].value += qty * price;
    });

    setSummary({ totalSKUs, totalQuantity, totalValue });
    setLowStock(low);
    setByCategory(cat);
  };

  return (
    <div className="reports-page">
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="report-icon report-icon-green"><FaBoxes /></div>
              <div>
                <div className="text-muted">Total SKUs</div>
                <h4>{loading ? '—' : summary.totalSKUs}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="report-icon report-icon-blue"><FaList /></div>
              <div>
                <div className="text-muted">Total Quantity</div>
                <h4>{loading ? '—' : summary.totalQuantity}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <div className="d-flex align-items-center gap-3">
              <div className="report-icon report-icon-yellow"><FaDollarSign /></div>
              <div>
                <div className="text-muted">Inventory Value</div>
                {loading ? (
                  <h4>—</h4>
                ) : (
                  <div>
                    <h4>₹{summary.totalValue.toFixed(2)}</h4>
                    <small className="text-muted">Total units: {summary.totalQuantity}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Low Stock Items (≤ 10)</h5>
              {loading ? (
                <div>Loading…</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStock.length === 0 && (
                        <tr><td colSpan={4} className="text-muted">No low-stock items</td></tr>
                      )}
                      {lowStock.map((it) => (
                        <tr key={it._id}>
                          <td>{it.productName}</td>
                          <td>{it.category || '-'}</td>
                          <td>{it.quantity ?? 0}</td>
                          <td>{`₹ ${(Number(it.purchasePrice ?? it.sellingPrice ?? 0) * Number(it.quantity ?? 0)).toFixed(2)}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Category Breakdown</h5>
              {loading ? (
                <div>Loading…</div>
              ) : (
                <div>
                  <ul className="list-group">
                    {Object.keys(byCategory).length === 0 && <li className="list-group-item text-muted">No categories</li>}
                    {Object.entries(byCategory).map(([cat, data]) => (
                      <li key={cat} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-medium">{cat}</div>
                          <small className="text-muted">{data.count} SKUs • {data.quantity} units</small>
                        </div>
                        <div>{`₹ ${data.value.toFixed(2)}`}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;