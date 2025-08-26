// Handles layout/structural styling patterns throughout the app
import { colors } from './colors';

// ------------------------------------------
// Reused layout constants
//-------------------------------------------

// Box Sizing
const CONTAINER_BOX_SIZING = 'border-box';

// Display
const CONTAINER_DISPLAY = 'flex';

export const layoutPageStyleWrapper = {
  boxSizing: CONTAINER_BOX_SIZING,
  display: CONTAINER_DISPLAY,
  flexDirection: 'column',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  overflow: 'auto',
};

export const mainContainerStyleWrapper = {
  boxSizing: CONTAINER_BOX_SIZING,
  flexGrow: 1,
  maxWidth: '700px',
  margin: '0 auto',
  padding: '4rem 1rem 0',
  textAlign: 'center',
};

export const headerStyleContainer = {
  boxSizing: CONTAINER_BOX_SIZING,
  display: CONTAINER_DISPLAY,
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: colors.headerBGColor,
  borderBottom: `1px solid ${colors.headerFooterBorderColor}`,
};

export const footerStyleContainer = {
  boxSizing: CONTAINER_BOX_SIZING,
  padding: '1rem',
  textAlign: 'center',
  fontSize: '0.95rem',
  color: colors.primaryAppColor,
  backgroundColor: colors.footerBGColor,
  borderTop: `1px solid ${colors.headerFooterBorderColor}`,
};

export const navContainer = {
  display: CONTAINER_DISPLAY,
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
const OVERLAY_Z_INDEX = 1000;

export const popupStyles = {
  position: 'absolute',
  top: '60px',
  right: '20px',
  backgroundColor: colors.modalBGColor,
  border: `1px solid ${colors.popUpBorderColor}`,
  padding: '1rem',
  zIndex: OVERLAY_Z_INDEX,
};

export const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.modalOverlayBGColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: OVERLAY_Z_INDEX,
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
  display: CONTAINER_DISPLAY,
  gap: '1rem',
  marginTop: '1rem',
};

// ------------------------------------
// Cleanup Entry List layout styling
// ------------------------------------
export const entriesListLayoutWrapper = {
  display: CONTAINER_DISPLAY,
  flexDirection: 'column',
  gap: '1rem',
};

export const entryContainerWrapper = {
  background: colors.cleanupEntryBGColor,
  padding: '1rem',
  borderRadius: '8px',
  border: `1px solid ${colors.cleanupEntryBorderColor}`,
  display: CONTAINER_DISPLAY,
  justifyContent: 'space-between',
  alignItems: 'center',
};

// ------------------------------------
// Utility-Style layout styling
// ------------------------------------
export const centerButtonLayout = { textAlign: 'center', marginTop: '1rem' };

export const containerElementSpacing = {
  display: CONTAINER_DISPLAY,
  alignItems: 'center',
  gap: '0.5rem',
};
