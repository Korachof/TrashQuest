// UI Header
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { navContainer, headerStyleContainer } from '../../styles/layout';

const logoStyles = {
  textDecoration: 'none',
  color: '#28a745',
  fontWeight: 'bold',
};

function Header({ currentUser }) {
  const navigate = useNavigate();

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
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
