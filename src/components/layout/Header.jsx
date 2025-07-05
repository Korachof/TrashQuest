// UI Header
import {Link} from 'react-router-dom'
import React from 'react';

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
        <Link to="/" style={logoStyles}>
            <h1>TrashQuest ♻️</h1>
        </Link>
      <div>
        {/* Future buttons go here */}
      </div>
    </header>
  );
}

export default Header;
