import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('https://sweets-admin-server-hh64.vercel.app/api/users/login', { username, password });
      setUser(response.data.user);
      sessionStorage.setItem('token', response.data.token); // Store the token in sessionStorage
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
      throw err; // Ensure to throw the error to handle it in the SignIn component
    }
  };
  

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('token'); // Remove the token from sessionStorage
  };

  // Check for existing token on initial load
  React.useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      // Implement token validation if needed
      // For now, just assume the token is valid and set the user
      // You should add token validation logic here if required
      axios.get('http://localhost:5000/api/users/verify', { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
        sessionStorage.removeItem('token');
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
