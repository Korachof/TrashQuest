// Handles text appearance throughout the app.

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
