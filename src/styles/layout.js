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

const headerStyleContainer = {
  backgroundColor: '#f0f0f0',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #ccc',
};

const footerStyleContainer = {
  backgroundColor: '#f8f8f8',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '0.95rem',
  color: '#28a745',
  borderTop: '1px solid #ccc',
};

const navContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.7rem',
  flexWrap: 'wrap', // for smaller screens
  marginBottom: '0.5rem',
};

export {
  layoutPageStyleWrapper,
  mainContainerStyleWrapper,
  headerStyleContainer,
  footerStyleContainer,
  navContainer,
};
