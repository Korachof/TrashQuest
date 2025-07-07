// A global form styling function for display labels/fields.

import React from 'react';

function FormGroup({ label, type, value, onChange, required = true }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginTop: '1rem', width: '100%', textAlign: 'center', }}>
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            style={{
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.5rem',
            boxSizing: 'border-box'}}
        />
  </div>
  );
}

export default FormGroup;
