import { colors } from './colors';

// Reusable button styling functions and base styles

// Size-based styling function
export const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return {
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
      };
    case 'medium':
      return {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
      };
    case 'large':
    default:
      return {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
      };
  }
};

// Color-based styling function
export const getColorStyles = (color) => {
  switch (color) {
    case 'primary':
      return {
        background: '#28a745',
        color: 'white',
      };
    case 'secondary':
      return {
        background: '#6c757d',
        color: 'white',
      };
    default:
      return {
        background: '#28a745',
        color: 'white',
      };
  }
};

// Main button style function that combines everything
export const getButtonStyle = (
  size = 'medium',
  color = 'primary',
  customStyle = {}
) => {
  return {
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'normal',
    ...getSizeStyles(size),
    ...getColorStyles(color),
    ...customStyle,
  };
};
