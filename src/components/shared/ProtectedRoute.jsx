// Protects certain routes from being accessed if user isn't logged in/no authentication
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

function ProtectedRoute({ children }) {
  // Grab last updated user
  const { currentUser, authLoading } = useAuth();

  // if user hasn't finished updating, display loading message
  if (authLoading) {
    return <Loader />;
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
