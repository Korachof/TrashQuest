// Styling for the modal shared component

//z-index constants to keep overlay clean
const overlayZIndex = 1000;

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
  zIndex: overlayZIndex,
};

export const modalContentStyle = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  position: 'relative',
  maxWidth: '500px',
  width: '90%',
};
