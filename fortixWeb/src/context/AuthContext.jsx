import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/user/login', { email, password });
      const data = res.data;
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Something went wrong' };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/user/register', userData);
      const data = res.data;
      if (res.status === 201 || data._id) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: 'Something went wrong' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (id, updates) => {
    try {
      const userId = id || (user && user._id);
      if (!userId) return { success: false, error: 'Not authenticated' };
      const res = await axios.put(`/api/user/${userId}`, updates);
      const data = res.data;
      // update local storage and context user
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return { success: true, data };
    } catch (err) {
      console.error('updateProfile error', err);
      return { success: false, error: err.response?.data?.message || 'Update failed' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};