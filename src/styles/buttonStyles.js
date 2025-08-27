import { colors } from './colors';
import { getButtonFontSize } from './typography';

// Reusable button styling functions and base styles

// Size-based styling function
export const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return {
        padding: '0.5rem 1rem',
        fontSize: getButtonFontSize.smallButtonFontSize,
      };
    case 'medium':
      return {
        padding: '0.75rem 1.5rem',
        fontSize: getButtonFontSize.medButtonFontSize,
      };
    case 'large':
    default:
      return {
        padding: '1rem 2rem',
        fontSize: getButtonFontSize.largeButtonFontSize,
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
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'normal',
    ...getSizeStyles(size),
    ...getColorStyles(color),
    ...customStyle,
  };
};

// Delete button style function (x button)
export const getDeleteButtonStyle = () => {
  return {
    background: 'none',
    border: 'none',
    fontSize: getButtonFontSize.deleteButtonFontSize,
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
    fontSize: getButtonFontSize.smallButtonFontSize,
    cursor: 'pointer',
    color: colors.navButtonTextColor,
    padding: '0.25rem',
  };
};
