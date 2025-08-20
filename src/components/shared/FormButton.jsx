// Abstracted shared button for forms such as create account, log in, etc.
import React from 'react';
import { getButtonStyle } from '../../styles/buttonStyles';

export default function FormButton({
  children,
  type = 'submit',
  isLoading = false,
  loadingText = '🔄 Logging in...',
  isCancel = false,
  ...props
}) {
  let buttonColor = 'primary';
  if (isCancel) {
    buttonColor = 'secondary';
  }
  return (
    // styling lives in src/styles.forms.js
    <button
      type={type}
      style={getButtonStyle('medium', buttonColor, { marginTop: '2rem' })}
      disabled={isLoading}
      {...props}
    >
      {/* If loading is true, change button text. Otherwise, button works as normal */}
      {isLoading ? loadingText || 'Loading...' : children}
    </button>
  );
}
