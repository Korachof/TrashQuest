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
        background: colors.primaryAppColor,
        color: colors.buttonTextColor,
      };
    case 'secondary':
      return {
        background: colors.secondaryAppColor,
        color: colors.buttonTextColor,
      };
    default:
      return {
        background: colors.primaryAppColor,
        color: colors.buttonTextColor,
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

// Delete button style function
export const getDeleteButtonStyle = () => {
  return {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: colors.deleteButtonColor, // x button
    padding: '0.25rem',
  };
};

// Edit button style function
export const getEditButtonStyle = () => {
  return {
    background: 'none',
    border: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
    color: colors.navButtonTextColor,
    padding: '0.25rem',
  };
};
