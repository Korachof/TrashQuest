// Handles layout/structural styling patterns throughout the app

const layoutPageStyleWrapper = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  overflow: 'auto',
};

const mainContainerStyleWrapper = {
  boxSizing: 'border-box',
  flexGrow: 1,
  maxWidth: '700px',
  margin: '0 auto',
  padding: '4rem 1rem 0',
  textAlign: 'center',
};

const headerStyleContainer = {
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#f0f0f0',
  borderBottom: '1px solid #ccc',
};

const footerStyleContainer = {
  boxSizing: 'border-box',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '0.95rem',
  textAlign: 'center',
  fontSize: '0.95rem',
  color: '#28a745',
  backgroundColor: '#f8f8f8',
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

const popupStyles = {
  position: 'absolute',
  top: '60px',
  right: '20px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  padding: '1rem',
  zIndex: 1000,
};

export {
  layoutPageStyleWrapper,
  mainContainerStyleWrapper,
  headerStyleContainer,
  footerStyleContainer,
  navContainer,
  popupStyles,
};
