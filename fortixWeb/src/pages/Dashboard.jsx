import React, { useState, useEffect } from 'react';
import { 
  FaDollarSign, 
  FaUsers, 
  FaShoppingCart, 
  FaChartLine,
  FaShoppingBag
} from 'react-icons/fa';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [chartData, setChartData] = useState([]); // array of numbers for chart
  const [activities, setActivities] = useState([]);

  const statCards = [
    { title: 'Total Revenue', value: totalRevenue, icon: <FaDollarSign />, color: 'blue' },
    { title: 'Customers', value: totalCustomers, icon: <FaUsers />, color: 'green' },
    { title: 'Average Order', value: avgOrderValue, icon: <FaShoppingCart />, color: 'yellow' },
    { title: 'Total Orders', value: totalOrders, icon: <FaChartLine />, color: 'purple' }
  ];

  



  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [invRes, salesRes, usersRes] = await Promise.all([
          axios.get('/api/inventory'),
          axios.get('/api/sales'),
          axios.get('/api/user')
        ]);

        const inventory = invRes.data || [];
        const sales = salesRes.data || [];
        const users = usersRes.data || [];

        // compute revenue and orders
        let revenue = 0;
        sales.forEach(s => {
          const price = Number(s.inventory?.sellingPrice ?? 0);
          const qty = Number(s.quantitySold ?? 0);
          revenue += price * qty;
        });

        const orders = sales.length;
        const customers = users.length;
        const avg = orders > 0 ? revenue / orders : 0;

        setTotalRevenue(revenue);
        setTotalOrders(orders);
        setTotalCustomers(customers);
        setAvgOrderValue(avg);

        // prepare 7-day chart data (from Mon..Sun)
        const now = new Date();
        const dayTotals = Array(7).fill(0);
        sales.forEach(s => {
          const d = new Date(s.createdAt);
          const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const diffDays = Math.floor((base - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / (1000*60*60*24));
          if (diffDays >=0 && diffDays < 7) {
            const idx = 6 - diffDays; // 0..6 mapping Mon..Sun approx
            dayTotals[idx] += (Number(s.inventory?.sellingPrice ?? 0) * Number(s.quantitySold ?? 0));
          }
        });
        setChartData(dayTotals);

        // activities: recent sales
        const recent = (sales.slice(0,5)).map((s, i) => ({
          id: i+1,
          icon: <FaShoppingBag />,
          title: `Sale recorded for`,
          user: s.inventory?.productName || 'Item',
          time: formatRelative(new Date(s.createdAt)),
          color: 'blue'
        }));
        setActivities(recent);
      } catch (err) {
        console.error('Dashboard load failed', err);
      }
      setLoading(false);
    };

    load();
  }, []);

  const formatRelative = (date) => {
    const diff = (Date.now() - date.getTime())/1000; // seconds
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return date.toLocaleString();
  };

  return (
    <div className="dashboard-page">

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {statCards.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card stat-card">
              <div className="card-body">
                <div className={`stat-icon stat-icon-${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <div className="stat-label">{stat.title}</div>
                  <div className="stat-value">{loading ? '—' : (
                    stat.title === 'Total Revenue' || stat.title === 'Average Order' ? `₹${Number(stat.value || 0).toFixed(2)}` : stat.value
                  )}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="row g-4">
        {/* Sales Chart */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-4">Sales Over Time</h5>

              {/* Chart Legend */}
              <div className="d-flex gap-3 mb-3">
                <div className="d-flex align-items-center">
                  <div className="legend-dot" style={{backgroundColor: '#4e73df'}}></div>
                  <small className="text-muted ms-2">Product A</small>
                </div>
                <div className="d-flex align-items-center">
                  <div className="legend-dot" style={{backgroundColor: '#5a6fd8'}}></div>
                  <small className="text-muted ms-2">Product B</small>
                </div>
                <div className="d-flex align-items-center">
                  <div className="legend-dot" style={{backgroundColor: '#7e8dd3'}}></div>
                  <small className="text-muted ms-2">Product C</small>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="chart-container">
                <div className="chart-bars">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const val = chartData[index] ?? 0;
                    const baseMax = Math.max(...(chartData.length ? chartData : [1]));
                    const height = baseMax > 0 ? Math.max(6, (val / baseMax) * 100) : 6;
                    return (
                      <div key={day} className="chart-bar-group">
                        <div className="chart-bar-stack">
                          <div className="chart-bar" style={{height: `${height}%`, backgroundColor: '#4e73df'}}></div>
                        </div>
                        <div className="chart-label">{day}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="mb-4">Recent Activity Feed</h5>
              
              

              <div className="activity-list">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon activity-icon-${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="activity-content">
                      <div className="activity-text">
                        {activity.title} <strong>{activity.user}</strong>
                        {activity.description && ` ${activity.description}`}
                      </div>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;