// Handles layout/structural styling patterns throughout the app
import { colors } from './colors';
import { FOOTER_FONT_SIZE } from './typography';

// ------------------------------------------
// Reused layout constants
//-------------------------------------------

// Box Sizing
const CONTAINER_BOX_SIZING = 'border-box';

// Display
const CONTAINER_DISPLAY = 'flex';

// Borders
const BORDER_SIZE = '1px solid';
const BORDER_RADIUS = '0.5rem';

// Margins
const BUTTON_TOP_MARGIN = '1rem';
const BOTTOM_MARGIN = '1rem';

// Gaps
const MAIN_CONTAINER_GAP = '1rem';
const NAV_CONTAINER_GAP = '0.7rem';
export const CONTAINER_ELEMENT_GAP = '0.5rem';

// Padding
const MED_PADDING = '1rem';

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
  maxWidth: '43.75rem',
  margin: '0 auto',
  padding: `4rem ${MED_PADDING} 0`,
  marginBottom: BOTTOM_MARGIN,
};

export const headerStyleContainer = {
  boxSizing: CONTAINER_BOX_SIZING,
  display: CONTAINER_DISPLAY,
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${MED_PADDING} 2rem`,
  backgroundColor: colors.headerBGColor,
  borderBottom: `${BORDER_SIZE} ${colors.headerFooterBorderColor}`,
};

export const footerStyleContainer = {
  boxSizing: CONTAINER_BOX_SIZING,
  padding: MED_PADDING,
  textAlign: 'center',
  fontSize: FOOTER_FONT_SIZE,
  color: colors.primaryAppColor,
  backgroundColor: colors.footerBGColor,
  borderTop: `${BORDER_SIZE} ${colors.headerFooterBorderColor}`,
};

export const navContainer = {
  display: CONTAINER_DISPLAY,
  justifyContent: 'center',
  alignItems: 'center',
  gap: NAV_CONTAINER_GAP,
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
  top: '3.75rem',
  right: '1.25rem',
  backgroundColor: colors.modalBGColor,
  border: `${BORDER_SIZE} ${colors.popUpBorderColor}`,
  padding: MED_PADDING,
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
  padding: '1.25rem',
  borderRadius: BORDER_RADIUS,
  position: 'relative',
  maxWidth: '31.25rem',
  width: '90%',
};

export const modalButtonContainer = {
  display: CONTAINER_DISPLAY,
  gap: MAIN_CONTAINER_GAP,
  marginTop: BUTTON_TOP_MARGIN,
};

// ------------------------------------
// Cleanup Entry List layout styling
// ------------------------------------
export const entriesListLayoutWrapper = {
  display: CONTAINER_DISPLAY,
  flexDirection: 'column',
  gap: MAIN_CONTAINER_GAP,
};

export const entryContainerWrapper = {
  background: colors.cleanupEntryBGColor,
  padding: MED_PADDING,
  borderRadius: BORDER_RADIUS,
  border: `${BORDER_SIZE} ${colors.cleanupEntryBorderColor}`,
  display: CONTAINER_DISPLAY,
  justifyContent: 'space-between',
  alignItems: 'center',
};

// ------------------------------------
// Utility-Style layout styling
// ------------------------------------

export const formButtonLayout = {
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem',
};
export const centerButtonLayout = {
  textAlign: 'center',
  marginTop: BUTTON_TOP_MARGIN,
};

export const containerElementSpacing = {
  display: CONTAINER_DISPLAY,
  alignItems: 'center',
  gap: CONTAINER_ELEMENT_GAP,
};

export const pointsPreview = {
  background: colors.pointsDisplayBGColor,
  border: `1px solid ${colors.pointsDisplayBorderColor}`,
  padding: '1rem',
  borderRadius: '4px',
  marginBottom: '1rem',
  textAlign: 'center',
};

// ------------------------------------
// Hazardous Warning layout styling
// ------------------------------------

export const hazardousWarningLayout = {
  background: colors.hazardWarningBGColor,
  border: `${BORDER_SIZE} ${colors.hazardWarningBorderColor}`,
  padding: MED_PADDING,
  borderRadius: BORDER_RADIUS,
  bottomMargin: BOTTOM_MARGIN,
};
