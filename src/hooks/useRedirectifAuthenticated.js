/* Redirects logged-in user if they try to navigate to certain places
like /login or /signup*/
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const useRedirectIfAuthenticated = (redirectPath = '/dashboard') => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(redirectPath);
    }
  }, [currentUser, navigate, redirectPath]);
};

export default useRedirectIfAuthenticated;
