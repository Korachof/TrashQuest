// UI Header
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { navContainer, headerStyleContainer } from '../../styles/layout';
import ConfirmLogout from '../shared/ConfirmLogout';
import { FaUser } from 'react-icons/fa';

const logoStyles = {
  textDecoration: 'none',
  color: '#28a745',
  fontWeight: 'bold',
};

function Header({ currentUser }) {
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
      <Link to={currentUser ? '/dashboard' : '/'} style={logoStyles}>
        <h1>TrashQuest ♻️</h1>
      </Link>
      <nav style={navContainer}>
        <Link to="/how-it-works">How it Works</Link>
        <Link to="/resources">Resources</Link>

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
            <button onClick={() => setShowConfirm(true)}>Log Out</button>
            {showConfirm && (
              <ConfirmLogout
                onConfirm={handleLogout}
                onCancel={() => setShowConfirm(false)}
              />
            )}
          </>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
