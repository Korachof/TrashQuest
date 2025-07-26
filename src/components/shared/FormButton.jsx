// Abstracted shared button for forms such as create account, log in, etc.
import React from 'react';
import { formButtonStyle } from '../../styles/forms';

function FormButton({
  children,
  type = 'submit',
  isLoading = false,
  loadingText = '🔄 Logging in...',
  ...props
}) {
  return (
    // styling lives in src/styles.forms.js
    <button type={type} style={formButtonStyle} disabled={isLoading} {...props}>
      {/* If loading is true, change button text. Otherwise, button works as normal */}
      {isLoading ? loadingText || 'Loading...' : children}
    </button>
  );
}

export default FormButton;
