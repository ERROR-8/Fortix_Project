import React, { useEffect, useState } from 'react';
import { FaBoxes, FaExclamationTriangle, FaList, FaDollarSign, FaChartLine, FaStar, FaHistory } from 'react-icons/fa';
import axios from 'axios';
import './Reports.css';

const Reports = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ totalSKUs: 0, totalQuantity: 0, totalCost: 0, totalSell: 0 });
  const [lowStock, setLowStock] = useState([]);
  const [byCategory, setByCategory] = useState({});
  const [salesLoading, setSalesLoading] = useState(true);
  const [salesStats, setSalesStats] = useState({ today: 0, week: 0, month: 0 });
  const [recentSales, setRecentSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

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
    let totalCost = 0; // purchasePrice * quantity as inventory cost
    let totalSell = 0; // sellingPrice * quantity as potential revenue
    const low = [];
    const cat = {};

    items.forEach((it) => {
      const qty = Number(it.quantity ?? 0);
      const costPrice = Number(it.purchasePrice ?? 0);
      const sellPrice = Number(it.sellingPrice ?? costPrice);
      totalQuantity += qty;
      totalCost += qty * costPrice;
      totalSell += qty * sellPrice;
      if (qty <= 10) low.push(it);
      const c = it.category || 'Uncategorized';
      if (!cat[c]) cat[c] = { count: 0, quantity: 0, costValue: 0, sellValue: 0 };
      cat[c].count += 1;
      cat[c].quantity += qty;
      cat[c].costValue += qty * costPrice;
      cat[c].sellValue += qty * sellPrice;
    });

    setSummary({ totalSKUs, totalQuantity, totalCost, totalSell });
    setLowStock(low);
    setByCategory(cat);
  };

  const fetchSales = async () => {
    setSalesLoading(true);
    try {
      const res = await axios.get('/api/sales');
      const sales = res.data || [];

      // compute stats and top products
      const stats = { today: 0, week: 0, month: 0 };
      const productMap = new Map();
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      sales.forEach(sale => {
        const saleDate = new Date(sale.createdAt);
        const saleTotal = (sale.inventory?.sellingPrice || 0) * (sale.quantitySold || 0);

        if (saleDate >= today) stats.today += saleTotal;
        if (saleDate >= startOfWeek) stats.week += saleTotal;
        if (saleDate >= startOfMonth) stats.month += saleTotal;

        if (sale.inventory) {
          const id = sale.inventory._id || sale.inventory.id;
          const name = sale.inventory.productName || sale.inventory.name || 'Unknown';
          if (productMap.has(id)) productMap.get(id).totalSold += sale.quantitySold || 0;
          else productMap.set(id, { productName: name, totalSold: sale.quantitySold || 0 });
        }
      });

      const top = Array.from(productMap.values()).sort((a,b) => b.totalSold - a.totalSold).slice(0,5);

      setSalesStats(stats);
      setTopProducts(top);
      setRecentSales(sales.slice(0,5));
    } catch (err) {
      console.error('Failed to load sales for reports', err);
    }
    setSalesLoading(false);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
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
                <div className="text-muted">Potential revenue</div>
                {loading ? (
                  <h4>—</h4>
                ) : (
                  <div>
                    <h4>₹{summary.totalSell.toFixed(2)}</h4>
                   
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-3">Inventory Value Details</h5>
              {loading ? (
                <div>Loading…</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Qty</th>
                        <th>Cost Value</th>
                        <th>Sell Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.length === 0 && (
                        <tr><td colSpan={4} className="text-muted">No inventory</td></tr>
                      )}
                      {inventory.map((it) => {
                        const qty = Number(it.quantity ?? 0);
                        const costPrice = Number(it.purchasePrice ?? 0);
                        const sellPrice = Number(it.sellingPrice ?? costPrice);
                        const costValue = costPrice * qty;
                        const sellValue = sellPrice * qty;
                        return (
                          <tr key={it._id}>
                            <td>{it.productName}</td>
                            <td>₹{sellPrice.toFixed(2)}</td>
                            <td>{qty}</td>
                            <td>₹{costValue.toFixed(2)}</td>
                            <td>₹{sellValue.toFixed(2)}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td colSpan={3}><strong>Total</strong></td>
                        <td><strong>₹{summary.totalCost.toFixed(2)}</strong></td>
                        <td><strong>₹{summary.totalSell.toFixed(2)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Report */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card p-3">
            <h5 className="mb-3"><FaChartLine className="me-2" />Sales Report</h5>
            {salesLoading ? (
              <div>Loading sales…</div>
            ) : (
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Today's Sales</h6>
                      <h4 className="card-title">₹{salesStats.today.toFixed(2)}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">This Week</h6>
                      <h4 className="card-title">₹{salesStats.week.toFixed(2)}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">This Month</h6>
                      <h4 className="card-title">₹{salesStats.month.toFixed(2)}</h4>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="mb-3"><FaStar className="me-2" />Top Products</h6>
                      {topProducts.length === 0 ? (
                        <div className="text-muted">No sales yet</div>
                      ) : (
                        <ul className="list-group list-group-flush">
                          {topProducts.map((p, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                              {p.productName}
                              <span className="badge bg-primary rounded-pill">{p.totalSold} units</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="mb-3"><FaHistory className="me-2" />Recent Sales</h6>
                      {recentSales.length === 0 ? (
                        <div className="text-muted">No recent sales</div>
                      ) : (
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
                              {recentSales.map(s => (
                                <tr key={s._id}>
                                  <td>{s.inventory?.productName || 'N/A'}</td>
                                  <td>{s.quantitySold}</td>
                                  <td>₹{((s.inventory?.sellingPrice || 0) * (s.quantitySold || 0)).toFixed(2)}</td>
                                  <td>{formatDate(s.createdAt)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                      {lowStock.map((it) => {
                        const qty = Number(it.quantity ?? 0);
                        const costPrice = Number(it.purchasePrice ?? 0);
                        const costValue = qty * costPrice;
                        return (
                          <tr key={it._id}>
                            <td>{it.productName}</td>
                            <td>{it.category || '-'}</td>
                            <td>{qty}</td>
                            <td>{`₹ ${costValue.toFixed(2)}`}</td>
                          </tr>
                        );
                      })}
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
                        <div>{`₹ ${data.costValue.toFixed(2)}`}</div>
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