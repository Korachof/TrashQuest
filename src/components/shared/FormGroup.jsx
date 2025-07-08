// A global form styling function for display labels/fields.

import React from 'react';
import {inputField, formGroupWrapper, formGroupLabel} from '../../styles/forms';

function FormGroup({ label, type, value, onChange, required = true }) {
  return (
    // styling in src/styles/forms.js
    <div style={formGroupWrapper}>
        <label style={formGroupLabel}>
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
