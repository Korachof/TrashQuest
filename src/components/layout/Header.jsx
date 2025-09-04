// UI Header
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { navContainer, headerStyleContainer } from '../../styles/layout';
import ConfirmLogout from '../shared/ConfirmLogout';
import { FaUser } from 'react-icons/fa';
import { logoTextStyle } from '../../styles/typography';
import { useAuth } from '../../context/AuthContext';
import { headerContent as content } from '../../content/headerContent';

export default function Header() {
  // Grab the current user
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Reset confirmation popup whenever auth state/current user changes
    setShowConfirm(false);
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header style={headerStyleContainer}>
      {/*
      Logo link redirects to Dashboard if user is logged in,
      otherwise to Welcome Page
      */}
      <Link to={currentUser ? '/dashboard' : '/'} style={logoTextStyle}>
        <h1>{content.logo}</h1>
      </Link>
      <nav style={navContainer}>
        <Link to="/how-it-works">{content.howItWorks}</Link>
        <Link to="/resources">{content.resources}</Link>

        {/* Add Log Cleanup link only when authenticated */}
        {currentUser && <Link to="/log-cleanup">{content.logCleanup}</Link>}

        {currentUser ? (
          <>
            {/* Link to profile page only shows on log in */}
            <Link
              to="/profile"
              style={{ display: 'inline-flex', gap: '0.2rem' }}
            >
              <FaUser />
              {currentUser.displayName}
            </Link>
            {/* If user is logged in, change Sign in to Log Out button */}
            <button onClick={() => setShowConfirm(true)}>
              {content.logOut}
            </button>
            {showConfirm && (
              <ConfirmLogout
                onConfirm={handleLogout}
                onCancel={() => setShowConfirm(false)}
              />
            )}
          </>
        ) : (
          <Link to="/login">{content.logIn}</Link>
        )}
      </nav>
    </header>
  );
}
