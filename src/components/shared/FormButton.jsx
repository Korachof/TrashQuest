// Abstracted shared button for forms such as create account, log in, etc.

import React from 'react';
import { formButtonStyle } from '../../styles/forms';

function FormButton({ children, ...props }) {
  return (
    // styling lives in src/styles.forms.js
    <button type="submit" style={ formButtonStyle } {...props}>
      {children}
    </button>
  );
}

export default FormButton;
