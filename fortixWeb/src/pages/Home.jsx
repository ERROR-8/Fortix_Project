import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, 
  FaBoxes, 
  FaUsers, 
  FaFileAlt,
  FaArrowRight,
  FaBolt,
  FaShieldAlt,
  FaChartBar,
  FaClock,
  FaBell,
  FaWarehouse
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const quickStats = [
    {
      icon: <FaBoxes />,
      label: 'Total Products',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      color: 'blue'
    },
    {
      icon: <FaWarehouse />,
      label: 'In Stock',
      value: '856',
      change: '+8.2%',
      trend: 'up',
      color: 'green'
    },
    {
      icon: <FaBell />,
      label: 'Low Stock Items',
      value: '23',
      change: '-5.1%',
      trend: 'down',
      color: 'orange'
    },
    {
      icon: <FaChartLine />,
      label: 'Total Revenue',
      value: '$125.4K',
      change: '+18.3%',
      trend: 'up',
      color: 'purple'
    }
  ];

  const quickActions = [
    {
      icon: <FaBoxes />,
      title: 'Manage Stock',
      description: 'View and update your inventory stock levels',
      link: '/stock',
      color: 'blue'
    },
    {
      icon: <FaChartBar />,
      title: 'View Reports',
      description: 'Generate insights and analytics reports',
      link: '/reports',
      color: 'green'
    },
    {
      icon: <FaUsers />,
      title: 'Manage Users',
      description: 'Add, edit, or remove user accounts',
      link: '/users',
      color: 'purple'
    },
    {
      icon: <FaFileAlt />,
      title: 'Inventory Details',
      description: 'View detailed inventory information',
      link: '/inventory',
      color: 'orange'
    }
  ];

  const features = [
    {
      icon: <FaBolt />,
      title: 'Real-time Updates',
      description: 'Get instant notifications about stock changes and low inventory alerts'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security measures'
    },
    {
      icon: <FaChartLine />,
      title: 'Advanced Analytics',
      description: 'Make data-driven decisions with powerful reporting tools'
    },
    {
      icon: <FaClock />,
      title: 'Time-Saving Automation',
      description: 'Automate repetitive tasks and focus on growing your business'
    }
  ];

  const recentActivity = [
    {
      action: 'Stock Updated',
      item: 'Classic White T-Shirt',
      time: '5 minutes ago',
      icon: <FaBoxes />,
      color: 'blue'
    },
    {
      action: 'New User Added',
      item: 'Jane Smith',
      time: '1 hour ago',
      icon: <FaUsers />,
      color: 'green'
    },
    {
      action: 'Low Stock Alert',
      item: 'Wireless Headphones',
      time: '2 hours ago',
      icon: <FaBell />,
      color: 'orange'
    },
    {
      action: 'Report Generated',
      item: 'Monthly Sales Report',
      time: '3 hours ago',
      icon: <FaFileAlt />,
      color: 'purple'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Fortix</h1>
          <p className="hero-subtitle">
            Your complete inventory management solution. Track stock, manage products, 
            and grow your business with powerful analytics.
          </p>
          <div className="hero-actions">
            <Link to="/stock" className="btn btn-primary btn-lg">
              Get Started <FaArrowRight className="ms-2" />
            </Link>
            <Link to="/dashboard" className="btn btn-outline-primary btn-lg">
              View Dashboard
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-card card-1">
            <FaChartLine /> <span>Analytics</span>
          </div>
          <div className="floating-card card-2">
            <FaBoxes /> <span>Inventory</span>
          </div>
          <div className="floating-card card-3">
            <FaUsers /> <span>Team</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-section">
        <div className="row g-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className={`stat-card stat-card-${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className={`stat-change ${stat.trend}`}>
                    {stat.change} from last month
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="row g-4">
          {quickActions.map((action, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <Link to={action.link} className="action-card">
                <div className={`action-icon action-icon-${action.color}`}>
                  {action.icon}
                </div>
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
                <div className="action-arrow">
                  <FaArrowRight />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Features & Activity */}
      <div className="row g-4">
        {/* Features */}
        <div className="col-lg-8">
          <div className="section">
            <h2 className="section-title">Why Choose Fortix?</h2>
            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6">
                  <div className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4">
          <div className="section">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon activity-icon-${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-item-name">{activity.item}</div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Optimize Your Inventory?</h2>
          <p>Start managing your stock efficiently with Fortix today</p>
          <Link to="/stock" className="btn btn-light btn-lg">
            Explore Features <FaArrowRight className="ms-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;