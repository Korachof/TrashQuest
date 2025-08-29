// Handles text appearance throughout the app.
import { colors } from './colors';

// ------------------------------------------
// Reused styling constants
//-------------------------------------------

// Font Weight
const FONT_WEIGHT_SEMIBOLD = '600';

// Font Size
const MAIN_HEADING_FONT_SIZE = '2rem';
const MODAL_HEADING_FONT_SIZE = '1.5rem';
const SUB_HEADING_FONT_SIZE = '1.3rem';
const MAIN_BODY_FONT_SIZE = '1rem';
const SMALL_POINTS_FONT_SIZE = '0.9rem';
const MEDIUM_POINTS_FONT_SIZE = '1.1rem';
const LARGE_POINTS_FONT_SIZE = '1.5rem';
export const FOOTER_FONT_SIZE = '0.95rem';

// Button Font Size
export const getButtonFontSize = {
  smallButtonFontSize: '0.9rem',
  medButtonFontSize: '1rem',
  largeButtonFontSize: '1.1rem',
  deleteButtonFontSize: '1.2rem',
};

// Margins
const MARGIN_BOTTOM = '1rem';
const LINK_MARGIN_TOP = '1.5rem';
const MODAL_MARGIN_TOP = '1.5rem';

// padding
const SMALL_POINTS_DISPLAY_PADDING = '0.5rem';
const MEDIUM_POINTS_DISPLAY_PADDING = '0.75rem';
const LARGE_POINTS_DISPLAY_PADDING = '1rem';

// Line Height
const BODY_LINE_HEIGHT = '1.5rem';

// Position
const MODAL_POSITION = 'relative';

// Text Align
const CENTER_TEXT = 'center';

// Text Decoration
const TEXT_DECORATION = 'none';

// ------------------------------------------
// Main Layout Styling
//-------------------------------------------

// Logo text
export const logoTextStyle = {
  textDecoration: TEXT_DECORATION,
  color: colors.primaryAppColor,
};

// Link Navigation text
export const linkNavigationText = {
  marginTop: LINK_MARGIN_TOP,
  textAlign: CENTER_TEXT,
};

// Page Heading text
export const headingTextStyle = {
  fontSize: MAIN_HEADING_FONT_SIZE,
  fontWeight: FONT_WEIGHT_SEMIBOLD,
  marginBottom: MARGIN_BOTTOM,
  color: colors.headingTextColor,
  textAlign: CENTER_TEXT,
};

export const subHeadingTextStyle = {
  fontSize: SUB_HEADING_FONT_SIZE,
  fontWeight: FONT_WEIGHT_SEMIBOLD,
  marginBottom: MARGIN_BOTTOM,
  color: colors.headingTextColor,
  textAlign: CENTER_TEXT,
};

// Page Body text
export const bodyTextStyle = {
  fontSize: MAIN_BODY_FONT_SIZE,
  lineHeight: BODY_LINE_HEIGHT,
  color: colors.bodyTextColor,
};

export const centerBodyTextStyle = {
  textAlign: CENTER_TEXT,
  lineHeight: BODY_LINE_HEIGHT,
  color: colors.bodyTextColor,
};

// ------------------------------------------
// Modal Text Styling
//-------------------------------------------
const CONTENT_Z_INDEX = 1001;

// Modal Heading text
export const modalHeadingTextStyle = {
  color: colors.headingTextColor,
  fontSize: MODAL_HEADING_FONT_SIZE,
  fontWeight: FONT_WEIGHT_SEMIBOLD,
  marginBottom: MARGIN_BOTTOM,
  marginTop: MODAL_MARGIN_TOP,
  zIndex: CONTENT_Z_INDEX,
  position: MODAL_POSITION,
  textAlign: CENTER_TEXT,
};

// Modal Body text
export const modalTextStyle = {
  color: colors.bodyTextColor,
  fontSize: MAIN_BODY_FONT_SIZE,
  lineHeight: BODY_LINE_HEIGHT,
  marginBottom: MARGIN_BOTTOM,
  position: MODAL_POSITION,
  textAlign: CENTER_TEXT,
};

// ------------------------------------------
// Points Display Styling
//-------------------------------------------

export function pointsDisplayTextStyle(size) {
  switch (size) {
    case 'small':
      return {
        fontSize: SMALL_POINTS_FONT_SIZE,
        padding: SMALL_POINTS_DISPLAY_PADDING,
      };
    case 'medium':
      return {
        fontSize: MEDIUM_POINTS_FONT_SIZE,
        padding: MEDIUM_POINTS_DISPLAY_PADDING,
      };
    case 'large':
    default:
      return {
        fontSize: LARGE_POINTS_FONT_SIZE,
        padding: LARGE_POINTS_DISPLAY_PADDING,
      };
  }
}
