import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './Users.css';
import ConfirmModal from '../components/ConfirmModal';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/user');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
    setLoading(false);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddClick = () => {
    setEditing(null);
    setForm({ name: '', email: '', password: '', company: '' });
    setShowForm(true);
  };

  const handleEdit = (u) => {
    setEditing(u._id);
    setForm({ name: u.name || '', email: u.email || '', password: '', company: u.company || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    // show modal (handled by requestDelete)
    requestDelete(id);
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const requestDelete = (id) => {
    setToDeleteId(id);
    setShowConfirm(true);
  };

  const onCancelDelete = () => {
    setToDeleteId(null);
    setShowConfirm(false);
  };

  const onConfirmDelete = async () => {
    if (!toDeleteId) return onCancelDelete();
    try {
      const res = await axios.delete(`/api/user/${toDeleteId}`);
      if (res.status === 200 || res.status === 204) {
        setUsers(users.filter(u => u._id !== toDeleteId));
      }
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed');
    }
    setShowConfirm(false);
    setToDeleteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Name and email are required');
      return;
    }
    try {
      if (editing) {
        // Update user (password optional)
        const payload = { name: form.name, email: form.email, company: form.company };
        if (form.password) payload.password = form.password;
        const res = await axios.put(`/api/user/${editing}`, payload);
        const updated = res.data;
        setUsers(users.map(u => (u._id === updated._id ? updated : u)));
      } else {
        // Register new user
        const res = await axios.post('/api/user/register', { name: form.name, email: form.email, password: form.password, company: form.company });
        const created = res.data;
        setUsers([created, ...users]);
      }
      setShowForm(false);
      setEditing(null);
      setForm({ name: '', email: '', password: '', company: '' });
    } catch (err) {
      console.error('Save failed', err);
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  const filteredUsers = users.filter(u =>
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">User List</h2>
        <button className="btn btn-primary" onClick={handleAddClick}>
          <FaUserPlus className="me-2" />
          Add New User
        </button>
      </div>

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

      {showForm && (
        <div className="card mb-4 p-3">
          <form onSubmit={handleSubmit}>
            <div className="row g-2">
              <div className="col-md-3">
                <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Full name" />
              </div>
              <div className="col-md-3">
                <input name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Email" type="email" />
              </div>
              <div className="col-md-3">
                <input name="password" value={form.password} onChange={handleChange} className="form-control" placeholder="Password (leave blank to keep)" type="password" />
              </div>
              <div className="col-md-3">
                <input name="company" value={form.company} onChange={handleChange} className="form-control" placeholder="Company" />
              </div>
            </div>
            <div className="mt-2 d-flex gap-2">
              <button className="btn btn-success" type="submit">{editing ? 'Update' : 'Create'}</button>
              <button type="button" className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <div className="p-3">Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="user-avatar me-3">👤</div>
                          <div>
                            <div className="fw-medium">{u.name}</div>
                            <small className="text-muted">{u.email}</small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{u.email}</td>
                      <td className="align-middle">{u.company || '-'}</td>
                      <td className="align-middle">
                        <button className="btn btn-sm btn-link text-primary p-1 me-2" onClick={() => handleEdit(u)}>
                          <FaEdit />
                        </button>
                        <button className="btn btn-sm btn-link text-danger p-1" onClick={() => handleDelete(u._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
        <ConfirmModal show={showConfirm} title="Delete user" message="Are you sure you want to delete this user?" onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
    </div>
  );
};

export default Users;