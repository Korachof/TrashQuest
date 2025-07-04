// Wrapper to apply consistent layouts, padding, and backgrounds across views and pages

function MainContainer({ children }) {
  return (
    <main style={{
      textAlign: 'center',
      marginTop: '4rem',
      padding: '0 1rem',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      {children}
    </main>
  );
}

export default MainContainer;
