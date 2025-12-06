import React, { useState, useEffect } from 'react';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBuilding,
  FaEdit,
  FaCamera,
  FaLock
} from 'react-icons/fa';
import './Account.css';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const { user, updateProfile } = useAuth();

  useEffect(() => {
    if (user) {
      const [firstName, ...rest] = (user.name || '').split(' ');
      const lastName = rest.join(' ');
      setProfileData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastName || '',
        email: user.email || '',
        company: user.company || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        country: user.country || 'United States'
      }));
    }
  }, [user]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
                    <input
                      type="text"
                      className="form-control"
                      value={profileData.country}
                      onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-outline-secondary" onClick={() => {
                    // reset to user values
                    if (user) {
                      const [firstName, ...rest] = (user.name || '').split(' ');
                      const lastName = rest.join(' ');
                      setProfileData(prev => ({
                        ...prev,
                        firstName: firstName || '',
                        lastName: lastName || '',
                        email: user.email || '',
                        company: user.company || '',
                        phone: user.phone || '',
                        address: user.address || '',
                        city: user.city || '',
                        state: user.state || '',
                        zipCode: user.zipCode || '',
                        country: user.country || 'United States'
                      }));
                    }
                  }}>Cancel</button>
                  <button className="btn btn-primary" onClick={async () => {
                    // perform update
                    const name = `${profileData.firstName} ${profileData.lastName}`.trim();
                    const updates = { 
                      name, 
                      email: profileData.email, 
                      company: profileData.company,
                      firstName: profileData.firstName,
                      lastName: profileData.lastName,
                      phone: profileData.phone,
                      address: profileData.address,
                      city: profileData.city,
                      state: profileData.state,
                      zipCode: profileData.zipCode,
                      country: profileData.country
                    };
                    const result = await updateProfile(user?._id, updates);
                    if (!result.success) alert(result.error || 'Update failed');
                    else alert('Profile updated');
                  }}>Save Changes</button>
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
                      <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="form-control" placeholder="Enter current password" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">New Password</label>
                      <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" placeholder="Enter new password" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Confirm New Password</label>
                      <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="Confirm new password" />
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary" onClick={async () => {
                        if (!newPassword) return alert('Enter new password');
                        if (newPassword !== confirmPassword) return alert('Passwords do not match');
                        // Note: backend does not verify current password here — it will simply update
                        const result = await updateProfile(user?._id, { password: newPassword });
                        if (!result.success) alert(result.error || 'Password update failed');
                        else {
                          setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
                          alert('Password updated');
                        }
                      }}>Update Password</button>
                    </div>
                  </div>
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
