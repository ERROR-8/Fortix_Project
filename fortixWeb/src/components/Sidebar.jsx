import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaTh, 
  FaArchive, 
  FaChartBar, 
  FaUsers, 
  FaClipboardList,
  FaUser,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/home', icon: <FaHome />, label: 'Home' },
    { path: '/dashboard', icon: <FaTh />, label: 'Dashboard' },
    { path: '/stock', icon: <FaArchive />, label: 'Stock' },
    { path: '/reports', icon: <FaChartBar />, label: 'Reports' },
    { path: '/users', icon: <FaUsers />, label: 'Users' },
    { path: '/inventory', icon: <FaClipboardList />, label: 'Inventory' },
  ];

  const bottomMenuItems = [
    { path: '/account', icon: <FaUser />, label: 'Account' },
    { path: '/help', icon: <FaQuestionCircle />, label: 'Help' },
    { path: '/logout', icon: <FaSignOutAlt />, label: 'Log out' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h4 className={`sidebar-brand ${isCollapsed ? 'd-none' : ''}`}>
          Fortix
        </h4>
        <button 
          className="btn btn-link toggle-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
      </div>

      {/* Main Menu Items */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className={`sidebar-label ${isCollapsed ? 'd-none' : ''}`}>
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom Menu Items */}
      <ul className="sidebar-menu sidebar-bottom">
        {bottomMenuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className={`sidebar-label ${isCollapsed ? 'd-none' : ''}`}>
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;