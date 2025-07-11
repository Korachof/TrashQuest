// UI footer
import React from 'react';
import { Link } from 'react-router-dom';
import { navContainer } from '../../styles/layout';
import { footerStyleContainer } from '../../styles/layout';

function Footer() {
  return (
    <footer style={footerStyleContainer}>
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
