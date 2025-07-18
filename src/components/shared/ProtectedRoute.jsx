// Protects certain routes from being accessed if user isn't logged in/no authentication
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
