// Handles layout/structural styling patterns throughout the app
import { colors } from './colors';

export const layoutPageStyleWrapper = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  overflow: 'auto',
};

export const mainContainerStyleWrapper = {
  boxSizing: 'border-box',
  flexGrow: 1,
  maxWidth: '700px',
  margin: '0 auto',
  padding: '4rem 1rem 0',
  textAlign: 'center',
};

export const headerStyleContainer = {
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: colors.HeaderBGColor,
  borderBottom: `1px solid ${colors.headerFooterBorderColor}`,
};

export const footerStyleContainer = {
  boxSizing: 'border-box',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '0.95rem',
  textAlign: 'center',
  fontSize: '0.95rem',
  color: colors.primaryAppColor,
  backgroundColor: colors.FooterBGColor,
  borderTop: `1px solid ${colors.headerFooterBorderColor}`,
};

export const navContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.7rem',
  flexWrap: 'wrap', // for smaller screens
  marginBottom: '0.5rem',
};

// ------------------------------------
// Modal-specific layout styling
// ------------------------------------

//z-index constants to keep overlay clean
const overlayZIndex = 1000;

export const popupStyles = {
  position: 'absolute',
  top: '60px',
  right: '20px',
  backgroundColor: colors.modalBGColor,
  border: '1px solid #ccc',
  padding: '1rem',
  zIndex: overlayZIndex,
};

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

export const modalContentStyleWrapper = {
  backgroundColor: colors.modalBGColor,
  padding: '20px',
  borderRadius: '8px',
  position: 'relative',
  maxWidth: '500px',
  width: '90%',
};

export const modalButtonContainer = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
};
