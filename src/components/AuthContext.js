import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

// AuthContext for global state management
export const AuthContext = createContext();

// AuthProvider component to wrap the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Token verification function (extracted for better readability)
  const verifyToken = async (token) => {
    try {
      const response = await axios.get('https://sweets-admin-server-hh64.vercel.app/api/protected', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Token verification failed:', error);
      setError('Token verification failed. Please log in again.');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post('https://sweets-admin-server-hh64.vercel.app/api/users/login', {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      await verifyToken(token); // Verify immediately after login
      setError(null);
      console.log('Login successful:', { username });
      
      // Redirect to the originally intended route or home
      const from = location.state?.from?.pathname || '/'; 
      navigate(from, { replace: true }); 
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
      return false;
    }
  };



  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Token verification on mount (with early return for efficiency)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return; 
    }

    setLoading(true); 
    verifyToken(token); 
  }, [navigate]);

  // Context Provider
  return (
    <AuthContext.Provider value={{ user, error, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
