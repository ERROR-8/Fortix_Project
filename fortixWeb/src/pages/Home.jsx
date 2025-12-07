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
  FaBell
} from 'react-icons/fa';
import './Home.css';

const Home = () => {

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
    </div>
  );
};

export default Home;