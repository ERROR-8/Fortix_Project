import React, { useState } from 'react';
import { FaSearch, FaFilter, FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './Users.css';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      username: '@johndoe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'Active',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: '@janesmith',
      email: 'jane.smith@example.com',
      role: 'Editor',
      status: 'Active',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'Sam Wilson',
      username: '@samwilson',
      email: 'sam.wilson@example.com',
      role: 'Viewer',
      status: 'Inactive',
      avatar: '👨‍💻'
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="user-avatar me-3">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="fw-medium">{user.name}</div>
                          <small className="text-muted">{user.username}</small>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">{user.role}</td>
                    <td className="align-middle">
                      <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="align-middle">
                      <button className="btn btn-sm btn-link text-primary p-1 me-2">
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-link text-danger p-1">
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
    </div>
  );
};

export default Users;