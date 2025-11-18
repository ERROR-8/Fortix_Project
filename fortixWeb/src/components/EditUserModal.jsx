import React, { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import './EditUserModal.css';

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    picture: '',
    role: 'cashier', // Default role for new users
    status: 'inactive'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      // If a user is passed, we are in "edit" mode
      setFormData({ ...formData, ...user });
    } else {
      // Otherwise, we are in "add" mode, reset to initial state
      // This is useful if the modal is reused without unmounting
      setFormData(initialState => ({ ...initialState, id: '' }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await onSave(formData);
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-container">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h3>{user ? 'Edit User' : 'Add New User'}</h3>
            <button className="btn-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="form-section">
                <h5 className="section-title">Personal Information</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        name="firstName"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                      />
                    </div>
                    {errors.firstName && (
                      <div className="invalid-feedback d-block">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        name="lastName"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                      />
                    </div>
                    {errors.lastName && (
                      <div className="invalid-feedback d-block">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                      />
                    </div>
                    {errors.email && (
                      <div className="invalid-feedback d-block">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaPhone className="input-icon" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <div className="invalid-feedback d-block">{errors.phoneNumber}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="form-section">
                <h5 className="section-title">Address Information</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">
                      Street Address <span className="text-danger">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaMapMarkerAlt className="input-icon" />
                      <input
                        type="text"
                        name="address"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter street address"
                      />
                    </div>
                    {errors.address && (
                      <div className="invalid-feedback d-block">{errors.address}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <div className="invalid-feedback d-block">{errors.city}</div>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                    />
                    {errors.state && (
                      <div className="invalid-feedback d-block">{errors.state}</div>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">
                      PIN Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      className={`form-control ${errors.pinCode ? 'is-invalid' : ''}`}
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="PIN"
                    />
                    {errors.pinCode && (
                      <div className="invalid-feedback d-block">{errors.pinCode}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      Country <span className="text-danger">*</span>
                    </label>
                    <div className="input-with-icon">
                      <FaBuilding className="input-icon" />
                      <input
                        type="text"
                        name="country"
                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                      />
                    </div>
                    {errors.country && (
                      <div className="invalid-feedback d-block">{errors.country}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Role and Status */}
              <div className="form-section">
                <h5 className="section-title">Role & Status</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Role <span className="text-danger">*</span>
                    </label>
                    <select
                      name="role"
                      className="form-select"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="cashier">Cashier</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;