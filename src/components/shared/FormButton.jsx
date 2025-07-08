// Abstracted shared button for forms such as create account, log in, etc.

import React from 'react';

function FormButton({ children, ...props }) {
  return (
    <button type="submit" style={ {marginTop: '2rem', padding: '0.8rem 1.6rem'} } {...props}>
      {children}
    </button>
  );
}

export default FormButton;
