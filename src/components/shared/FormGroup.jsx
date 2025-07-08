// A global form styling function for display labels/fields.

import React from 'react';
import {inputField, formGroupWrapper} from '../../styles/forms';

function FormGroup({ label, type, value, onChange, required = true }) {
  return (
    <div style={formGroupWrapper}>
        <label style={{ marginTop: '1rem', textAlign: 'center', }}>
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            style={inputField}
        />

  </div>
  );
}

export default FormGroup;
