// Abstracted shared button for forms such as create account, log in, etc.
import React from 'react';
import { formButtonStyle } from '../../styles/forms';

function FormButton({ children, type = 'submit', ...props }) {
  return (
    // styling lives in src/styles.forms.js
    <button type={type} style={formButtonStyle} {...props}>
      {children}
    </button>
  );
}

export default FormButton;
