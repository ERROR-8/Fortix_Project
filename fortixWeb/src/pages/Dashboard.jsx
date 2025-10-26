import React, { useState } from 'react';
import { 
  FaDollarSign, 
  FaUsers, 
  FaShoppingCart, 
  FaChartLine,
  FaShoppingBag,
  FaUserPlus,
  FaBox,
  FaCreditCard,
  FaSearch,
  FaBell
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeFilter, setTimeFilter] = useState('Week');

  const statCards = [
    {
      title: 'Total Revenue',
      value: '$125,430',
      icon: <FaDollarSign />,
      color: 'blue'
    },
    {
      title: 'New Customers',
      value: '1,210',
      icon: <FaUsers />,
      color: 'green'
    },
    {
      title: 'Average Order Value',
      value: '$178.50',
      icon: <FaShoppingCart />,
      color: 'yellow'
    },
    {
      title: 'Conversion Rate',
      value: '3.45%',
      icon: <FaChartLine />,
      color: 'purple'
    }
  ];

  const activities = [
    {
      id: 1,
      icon: <FaShoppingBag />,
      title: 'New order #1245 placed by',
      user: 'John Doe',
      time: '2 minutes ago',
      color: 'blue'
    },
    {
      id: 2,
      icon: <FaUserPlus />,
      title: 'New user',
      user: "'Jane Smith'",
      description: 'signed up.',
      time: '15 minutes ago',
      color: 'green'
    },
    {
      id: 3,
      icon: <FaBox />,
      title: 'Stock updated for',
      user: "'Product X'",
      time: '1 hour ago',
      color: 'yellow'
    },
    {
      id: 4,
      icon: <FaCreditCard />,
      title: 'Payment failed for order #1244.',
      time: '2 hours ago',
      color: 'red'
    }
  ];

  return (
    <div className="dashboard-page">
      {/* Search and Notifications */}
      <div className="d-flex justify-content-end align-items-center mb-4 gap-3">
        <div className="dashboard-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
          />
        </div>
        <button className="btn btn-light position-relative">
          <FaBell />
          <span className="notification-badge"></span>
        </button>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs mb-4">
        {['Overview', 'Sales', 'Customers', 'Products'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

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
                  <div className="stat-value">{stat.value}</div>
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Sales Over Time</h5>
                <div className="btn-group btn-group-sm">
                  {['Day', 'Week', 'Month'].map((filter) => (
                    <button
                      key={filter}
                      className={`btn ${timeFilter === filter ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setTimeFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

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
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="chart-bar-group">
                      <div className="chart-bar-stack">
                        <div className="chart-bar" style={{height: `${60 + index * 10}%`, backgroundColor: '#4e73df'}}></div>
                        <div className="chart-bar" style={{height: `${40 + index * 8}%`, backgroundColor: '#5a6fd8'}}></div>
                        <div className="chart-bar" style={{height: `${30 + index * 6}%`, backgroundColor: '#7e8dd3'}}></div>
                      </div>
                      <div className="chart-label">{day}</div>
                    </div>
                  ))}
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
              
              <div className="activity-search mb-3">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search activities..."
                />
              </div>

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