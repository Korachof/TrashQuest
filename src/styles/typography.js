// Handles text appearance throughout the app.

// Logo text
export const logoTextStyle = {
  textDecoration: 'none',
  color: '#28a745',
  fontWeight: 'bold',
};

// Link Navigation text
export const linkNavigationText = {
  marginTop: '2rem',
};

// Page Heading text
export const headingTextStyle = {
  fontSize: '2rem',
  fontWeight: '600',
  marginBottom: '1rem',
  color: '#333',
};

// Page Body text
export const bodyTextStyle = {
  fontSize: '1rem',
  lineHeight: '1.5',
  color: '#444',
};

// ------------------------------------------
// Modal Text Styling
//-------------------------------------------
const contentZIndex = 1001;

// Modal Heading text
export const modalHeadingTextStyle = {
  color: '#000',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
  marginTop: 0,
  zIndex: contentZIndex,
  position: 'relative',
};

// Modal Body text
export const modalTextStyle = {
  color: '#000',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '16px',
  position: 'relative',
};

export function pointsDisplayTextStyle(size) {
  switch (size) {
    case 'small':
      return { fontSize: '0.9rem', padding: '0.5rem' };
    case 'medium':
      return { fontSize: '1.1rem', padding: '0.75rem' };
    case 'large':
    default:
      return { fontSize: '1.5rem', padding: '1rem' };
  }
}
