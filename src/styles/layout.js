// Handles layout/structural styling patterns throughout the app

const layoutPageStyleWrapper = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  overflow: 'clip',
};

const mainContainerStyleWrapper = {
  textAlign: 'center',
  flexGrow: 1,
  maxWidth: '700px',
  margin: '0 auto',
  padding: '4rem 1rem 0',
  boxSizing: 'border-box',
};

const navContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.7rem',
  flexWrap: 'wrap', // for smaller screens
  marginBottom: '0.5rem',
};

export { layoutPageStyleWrapper, mainContainerStyleWrapper, navContainer };
