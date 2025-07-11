// UI Header
import { Link } from 'react-router-dom';
import React from 'react';
import { navContainer } from '../../styles/layout';
import { headerStyleContainer } from '../../styles/layout';

const logoStyles = {
  textDecoration: 'none',
  color: '#28a745',
  fontWeight: 'bold',
};

function Header() {
  return (
    <header style={headerStyleContainer}>
      {/* Logo */}
      <Link to="/" style={logoStyles}>
        <h1>TrashQuest ♻️</h1>
      </Link>
      <nav style={navContainer}>
        <Link to="/how-it-works">How it Works</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/login">Sign In</Link>
      </nav>
    </header>
  );
}

export default Header;
