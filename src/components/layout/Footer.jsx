// UI footer

import React from 'react';

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
      <p>Made for the Ultimate Quest: The Planet🌎 | © {new Date().getFullYear()} TrashQuest</p>
    </footer>
  );
}

export default Footer;
