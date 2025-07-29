// Styling for the modal shared component

//z-index constants to keep overlay clean
const overlayZIndex = 1000;
const contentZIndex = 1001; // larger so it will appear above the overlay layer

// Modal-specific styling
export const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

export const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  position: 'relative',
  maxWidth: '500px',
  width: '90%',
  modalTextStyle,
};

// Modal-specific text styles
export const modalHeadingStyle = {
  color: '#000',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
  marginTop: 0,
  zIndex: 1001,
  position: 'relative',
};

export const modalTextStyle = {
  color: '#000',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '16px',
  position: 'relative',
};
