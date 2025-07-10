// Wrapper to apply consistent layouts, padding, and backgrounds across views and pages
import React from 'react';

function MainContainer({ children }) {
  return (
    // Normal page layout styling
    <main
      style={{
        textAlign: 'center',
        marginTop: '4rem',
        padding: '0 1rem',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {children}
    </main>
  );
}

export default MainContainer;
