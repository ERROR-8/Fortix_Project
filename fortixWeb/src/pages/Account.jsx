import React, { useState } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBuilding,
  FaEdit,
  FaCamera,
  FaBell,
  FaLock,
  FaGlobe,
  FaPalette,
  FaShieldAlt
} from 'react-icons/fa';
import './Account.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Fortix Inc.',
    address: '123 Business Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    stockAlerts: true,
    weeklyReports: true,
    promotions: false
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    theme: 'light'
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="account-page">
      <div className="row g-4">
        {/* Sidebar Tabs */}
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body p-0">
              <div className="account-tabs">
                <button
                  className={`account-tab ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FaUser className="me-2" />
                  Profile
                </button>
                <button
                  className={`account-tab ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <FaLock className="me-2" />
                  Security
                </button>
                <button
                  className={`account-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FaBell className="me-2" />
                  Notifications
                </button>
                <button
                  className={`account-tab ${activeTab === 'preferences' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preferences')}
                >
                  <FaPalette className="me-2" />
                  Preferences
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-body">
                <h4 className="mb-4">Profile Information</h4>

                {/* Profile Picture */}
                <div className="profile-picture-section mb-4">
                  <div className="profile-picture">
                    <div className="profile-avatar">
                      <FaUser />
                    </div>
                    <button className="profile-picture-upload">
                      <FaCamera />
                    </button>
                  </div>
                  <div className="profile-picture-info">
                    <h5>{profileData.firstName} {profileData.lastName}</h5>
                    <p className="text-muted mb-2">{profileData.email}</p>
                    <button className="btn btn-sm btn-outline-primary">
                      <FaEdit className="me-2" />
                      Change Photo
                    </button>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Personal Information */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaPhone />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Company</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaBuilding />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.company}
                        onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <h5 className="mb-3">Address Information</h5>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label">Street Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaMapMarkerAlt />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.city}
                      onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.state}
                      onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Country</label>
                    <select className="form-select" value={profileData.country}>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-outline-secondary">Cancel</button>
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card">
              <div className="card-body">
                <h4 className="mb-4">Security Settings</h4>

                {/* Change Password */}
                <div className="security-section mb-4">
                  <h5 className="mb-3">Change Password</h5>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Current Password</label>
                      <input type="password" className="form-control" placeholder="Enter current password" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-control" placeholder="Enter new password" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Confirm New Password</label>
                      <input type="password" className="form-control" placeholder="Confirm new password" />
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary">Update Password</button>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Two-Factor Authentication */}
                <div className="security-section mb-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">Two-Factor Authentication</h5>
                      <p className="text-muted mb-0">Add an extra layer of security to your account</p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="twoFactorSwitch" />
                    </div>
                  </div>
                  <div className="alert alert-info">
                    <FaShieldAlt className="me-2" />
                    Two-factor authentication is currently disabled. Enable it for enhanced security.
                  </div>
                </div>

                <hr className="my-4" />

                {/* Active Sessions */}
                <div className="security-section">
                  <h5 className="mb-3">Active Sessions</h5>
                  <div className="session-list">
                    <div className="session-item">
                      <div className="session-info">
                        <div className="fw-medium">Chrome on Windows</div>
                        <small className="text-muted">New York, USA • Active now</small>
                      </div>
                      <span className="badge bg-success">Current</span>
                    </div>
                    <div className="session-item">
                      <div className="session-info">
                        <div className="fw-medium">Safari on iPhone</div>
                        <small className="text-muted">New York, USA • 2 hours ago</small>
                      </div>
                      <button className="btn btn-sm btn-outline-danger">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-body">
                <h4 className="mb-4">Notification Preferences</h4>

                {/* Notification Channels */}
                <div className="notification-section mb-4">
                  <h5 className="mb-3">Notification Channels</h5>
                  <div className="notification-option">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">Email Notifications</div>
                        <small className="text-muted">Receive notifications via email</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={() => handleNotificationChange('emailNotifications')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="notification-option">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">Push Notifications</div>
                        <small className="text-muted">Receive push notifications in your browser</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notifications.pushNotifications}
                          onChange={() => handleNotificationChange('pushNotifications')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="notification-option">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">SMS Notifications</div>
                        <small className="text-muted">Receive notifications via text message</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notifications.smsNotifications}
                          onChange={() => handleNotificationChange('smsNotifications')}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Notification Types */}
                <div className="notification-section">
                  <h5 className="mb-3">Notification Types</h5>
                  <div className="notification-option">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">Order Updates</div>
                        <small className="text-muted">Get notified about order status changes</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notifications.orderUpdates}
                          onChange={() => handleNotificationChange('orderUpdates')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="notification-option">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">Stock Alerts</div>
                        <small className="text-muted">Receive alerts for low stock items</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notifications.stockAlerts}
                          onChange={() => handleNotificationChange('stockAlerts')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="notification-option">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">Weekly Reports</div>
                        <small className="text-muted">Get weekly summary reports</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notifications.weeklyReports}
                          onChange={() => handleNotificationChange('weeklyReports')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="notification-option">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium">Promotions & Updates</div>
                        <small className="text-muted">Receive promotional content and product updates</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={notifications.promotions}
                          onChange={() => handleNotificationChange('promotions')}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary">Save Preferences</button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="card">
              <div className="card-body">
                <h4 className="mb-4">Application Preferences</h4>

                {/* Localization */}
                <div className="preference-section mb-4">
                  <h5 className="mb-3">Localization</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        <FaGlobe className="me-2" />
                        Language
                      </label>
                      <select className="form-select" value={preferences.language}>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Timezone</label>
                      <select className="form-select" value={preferences.timezone}>
                        <option>America/New_York (EST)</option>
                        <option>America/Los_Angeles (PST)</option>
                        <option>Europe/London (GMT)</option>
                        <option>Asia/Tokyo (JST)</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Date Format</label>
                      <select className="form-select" value={preferences.dateFormat}>
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Currency</label>
                      <select className="form-select" value={preferences.currency}>
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                        <option>JPY - Japanese Yen</option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Appearance */}
                <div className="preference-section mb-4">
                  <h5 className="mb-3">Appearance</h5>
                  <label className="form-label">Theme</label>
                  <div className="theme-options">
                    <div className="theme-option">
                      <input
                        type="radio"
                        name="theme"
                        id="light"
                        checked={preferences.theme === 'light'}
                        onChange={() => setPreferences({...preferences, theme: 'light'})}
                      />
                      <label htmlFor="light" className="theme-card">
                        <div className="theme-preview light-theme">
                          <div className="theme-header"></div>
                          <div className="theme-content"></div>
                        </div>
                        <div className="theme-name">Light</div>
                      </label>
                    </div>
                    <div className="theme-option">
                      <input
                        type="radio"
                        name="theme"
                        id="dark"
                        checked={preferences.theme === 'dark'}
                        onChange={() => setPreferences({...preferences, theme: 'dark'})}
                      />
                      <label htmlFor="dark" className="theme-card">
                        <div className="theme-preview dark-theme">
                          <div className="theme-header"></div>
                          <div className="theme-content"></div>
                        </div>
                        <div className="theme-name">Dark</div>
                      </label>
                    </div>
                    <div className="theme-option">
                      <input
                        type="radio"
                        name="theme"
                        id="auto"
                        checked={preferences.theme === 'auto'}
                        onChange={() => setPreferences({...preferences, theme: 'auto'})}
                      />
                      <label htmlFor="auto" className="theme-card">
                        <div className="theme-preview auto-theme">
                          <div className="theme-header"></div>
                          <div className="theme-content"></div>
                        </div>
                        <div className="theme-name">Auto</div>
                      </label>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary">Save Preferences</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;