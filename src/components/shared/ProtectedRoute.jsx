// Protects certain routes from being accessed if user isn't logged in/no authentication
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

function ProtectedRoute({ children, redirectTo = '/login' }) {
  // Grab last updated user
  const { currentUser, authLoading } = useAuth();

  // if user hasn't finished updating, display loading message
  if (authLoading) {
    return <Loader />;
  }
  if (!currentUser) {
    // Redirect prop, default to login
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
