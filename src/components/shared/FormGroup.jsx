// A global form styling function for display labels/fields.
import React from 'react';
import {
  inputField,
  formGroupWrapper,
  formGroupLabel,
} from '../../styles/forms';

export default function FormGroup({
  label,
  type,
  value,
  onChange,
  required = true,
  id,
}) {
  return (
    // styling in src/styles/forms.js
    <div style={formGroupWrapper}>
      <label htmlFor={id} style={formGroupLabel}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        style={inputField}
      />
    </div>
  );
}
