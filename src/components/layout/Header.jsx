// UI Header
import {Link} from 'react-router-dom'
import React from 'react';
import { navContainer } from '../../styles/layout';


const logoStyles = {
    textDecoration: 'none',
    color: '#28a745',
    fontWeight: 'bold',
}

function Header() {
  return (
    <header style={{
      backgroundColor: '#f0f0f0',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #ccc'
    }}>
      {/* Logo */}
        <Link to="/" style={logoStyles}>
            <h1>TrashQuest ♻️</h1>
        </Link>
      <nav style = {navContainer}>
          <Link to="/how-it-works">How it Works</Link>
          <Link to="/resources">Resources</Link>
      </nav>
    </header>
  );
}

export default Header;
