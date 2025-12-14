import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';

// Mock the useAuth hook
jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: () => ({
    login: jest.fn().mockResolvedValue({ success: true }),
  }),
}));

describe('Login Component', () => {
  test('renders login form and allows a user to log in', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </BrowserRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for the login function to be called and the navigation to occur
    await waitFor(() => {
      // You might need to adjust this assertion based on your routing logic
      // For example, if you navigate to a dashboard, you can check for an element on that page.
      // Here, we'll just check if the login function was called.
      const { useAuth } = require('../context/AuthContext');
      const { login } = useAuth();
      expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});
