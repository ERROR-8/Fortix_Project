import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome,
  FaUser, 
  FaShoppingBag, 
  FaTh, 
  FaChartBar, 
  FaUsers as FaUsersIcon, 
  FaClipboardList,
  FaSignOutAlt,
  FaCog
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': { title: 'Dashboard', icon: <FaTh /> },
      '/home': { title: 'Home', icon: <FaHome /> },
      '/stock': { title: 'Stock Management', icon: <FaShoppingBag /> },
      '/inventory': { title: 'Inventory Details', icon: <FaClipboardList /> },
      '/users': { title: 'User Management', icon: <FaUsersIcon /> },
      '/reports': { title: 'Reports Overview', icon: <FaChartBar /> },
      '/account': { title: 'Account', icon: <FaUser /> },
      '/help': { title: 'Help', icon: <FaUser /> },
    };
    return titles[path] || { title: 'Fortix', icon: <FaShoppingBag /> };
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pageInfo = getPageTitle();

  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <div className="navbar-brand">
          {pageInfo.icon}
          <span className="fw-bold ms-2">{pageInfo.title}</span>
        </div>
        <div className="d-flex align-items-center position-relative">
          <div 
            className="user-menu"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="user-info d-none d-md-block">
              <div className="user-name">{user?.name || 'User'}</div>
              <div className="user-role">{user?.role || 'Admin'}</div>
            </div>
          </div>
          
          {showDropdown && (
            <>
              <div 
                className="dropdown-overlay" 
                onClick={() => setShowDropdown(false)}
              />
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <div className="dropdown-user-name">{user?.name || 'User'}</div>
                    <div className="dropdown-user-email">{user?.email || 'user@example.com'}</div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    navigate('/account');
                    setShowDropdown(false);
                  }}
                >
                  <FaCog className="me-2" />
                  Account Settings
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;