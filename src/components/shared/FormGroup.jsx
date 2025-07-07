// A global form styling function for display labels/fields.

import React from 'react';

function FormGroup({ label, type, value, onChange, required = true }) {
  return (
    <label style={{ marginTop: '1rem', width: '100%' }}>
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={{ display: 'block', width: '100%', marginTop: '0.5rem' }}
      />
    </label>
  );
}

export default FormGroup;
