// Wrapper to apply consistent layouts, padding, and backgrounds across views and pages
import React from 'react';

function MainContainer({ children }) {
  return (
    // Normal page layout styling
    <main
      style={{
        textAlign: 'center',
        paddingTop: '4rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        maxWidth: '700px',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexGrow: 1,
      }}
    >
      {children}
    </main>
  );
}

export default MainContainer;
