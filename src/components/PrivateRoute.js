// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  if (!user) {
    return <Navigate to="/login" replace={true} />; // Redirect to login if not authenticated
  }

  return element; // Render the element if authenticated
};

export default PrivateRoute;
