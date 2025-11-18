import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaFilter, FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import EditUserModal from '../components/EditUserModal';
import './Users.css';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        const responseData = response.data;

        // Handle cases where the user array is nested
        if (responseData && Array.isArray(responseData.data)) {
          setUsers(responseData.data);
        } else if (responseData && Array.isArray(responseData.users)) {
          setUsers(responseData.users);
        } else if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Received invalid data from the server.');
          console.error('API did not return an array:', response.data);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users.');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`/api/users/${updatedUser._id}`, updatedUser);
      setUsers(users.map(user => 
        user._id === updatedUser._id ? response.data : user
      ));
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
      // Optionally, show an error message to the user
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        // Optionally, show an error message to the user
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'primary';
      case 'manager':
        return 'info';
      case 'cashier':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getAvatar = (user) => {
    if (user.picture) {
      return <img src={user.picture} alt={user.firstName} />;
    }
    const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    return <span>{initials}</span>;
  };

  return (
    <div className="users-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">User List</h2>
        <button className="btn btn-primary">
          <FaUserPlus className="me-2" />
          Add New User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="d-flex gap-3 mb-4">
        <div className="search-box flex-grow-1">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary">
          <FaFilter className="me-2" />
          Filter
        </button>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="6" className="text-center">Loading...</td></tr>}
                {error && <tr><td colSpan="6" className="text-center text-danger">{error}</td></tr>}
                {!loading && !error && filteredUsers.length === 0 && (<tr><td colSpan="6" className="text-center">No users found.</td></tr>)}
                {!loading && !error && filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="user-avatar me-3">
                          {getAvatar(user)}
                        </div>
                        <div>
                          <div className="fw-medium">{user.firstName} {user.lastName}</div>
                          <small className="text-muted">{user.city}, {user.state}</small>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">{user.phoneNumber}</td>
                    <td className="align-middle">
                      <span className={`badge bg-${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="align-middle">
                      <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="align-middle">
                      <button 
                        className="btn btn-sm btn-link text-primary p-1 me-2"
                        onClick={() => handleEditClick(user)}
                        title="Edit user"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn btn-sm btn-link text-danger p-1"
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete user"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default Users;