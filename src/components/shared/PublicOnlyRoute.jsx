// redirects logged in users if they try to access certain public only areas, like WelcomePage
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

export default function PublicOnlyRoute({
  children,
  redirectTo = '/dashboard',
}) {
  const { currentUser, authLoading } = useAuth();

  // If still loading, show loader
  if (authLoading) {
    return <Loader />;
  }

  // If user is authenticated, redirect them away
  if (currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  // If not authenticated, render the page
  return children;
}
