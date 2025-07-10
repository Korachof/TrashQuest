// UI footer
import React from 'react';
import {Link} from 'react-router-dom';


function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f8f8f8',
      padding: '1rem',
      textAlign: 'center',
      fontSize: '0.95rem',
      color: '#28a745',
      borderTop: '1px solid #ccc',
      marginTop: '3rem'
    }}>
      {/*Nav Links*/}
      <nav style = {{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.7rem',
        flexWrap: 'wrap', // for smaller screens
        marginBottom: '0.5rem'}}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
      </nav>
      <p>
        Made for the Ultimate Quest: The Planet🌎 | © {new Date().getFullYear()} TrashQuest
      </p>
    </footer>
  );
}


export default Footer;
