import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FaUser, 
  FaShoppingBag, 
  FaTh, 
  FaChartBar, 
  FaUsers as FaUsersIcon, 
  FaClipboardList,
  FaHome
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

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

  const pageInfo = getPageTitle();

  return (
    <nav className="navbar navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <div className="navbar-brand">
          {pageInfo.icon}
          <span className="fw-bold ms-2">{pageInfo.title}</span>
        </div>
        <div className="d-flex align-items-center position-relative">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;