// UI footer
import React from 'react';
import { Link } from 'react-router-dom';
import { navContainer } from '../../styles/layout';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#f8f8f8',
        padding: '1rem',
        textAlign: 'center',
        fontSize: '0.95rem',
        color: '#28a745',
        borderTop: '1px solid #ccc',
      }}
    >
      {/*Nav Links*/}
      <nav style={navContainer}>
        <Link to="/terms">Terms of Use</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
      <p>
        Made for the Ultimate Quest: The Planet🌎 | © {new Date().getFullYear()}{' '}
        TrashQuest
      </p>
    </footer>
  );
}

export default Footer;
