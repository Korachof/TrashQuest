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
  placeholder,
  disabled,
  rows,
  children,
}) {
  return (
    // styling in src/styles/forms.js
    <div style={formGroupWrapper}>
      <label htmlFor={id} style={formGroupLabel}>
        {label}
      </label>

      {/* Render select dropdown if type is "select" */}
      {type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          style={inputField}
          disabled={disabled}
        >
          {children}
        </select>
      ) : type === 'textarea' ? ( // ← ADDED: New condition for textarea
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          style={inputField}
          placeholder={placeholder} // ← ADDED
          disabled={disabled} // ← ADDED
          rows={rows || 4} // ← ADDED with default of 4 rows
        />
      ) : (
        //Render inputs
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          style={inputField}
        />
      )}
    </div>
  );
}
