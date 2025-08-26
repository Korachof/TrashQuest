// Dropdown component for selecting cleanup/trash type
import React, { useState, useEffect } from 'react';
import FormGroup from '../shared/FormGroup';
import { colors } from '../../styles/colors';

// Cleanup types with educational info
const CLEANUP_TYPES = [
  { value: 'General Trash', label: 'General Trash' },
  { value: 'General Recycling', label: 'General Recycling' },
  { value: 'Electronics Recycling', label: 'Electronics Recycling' },
  {
    value: 'Hazardous Waste Disposal',
    label: 'Hazardous Waste Disposal ⚠️',
    warning: true,
  },
];

export default function TrashTypeSelect({
  value,
  onChange,
  required = false,
  id = 'trash-type-select',
  label = 'Cleanup Type',
}) {
  const [showHazardousWarning, setShowHazardousWarning] = useState(false);

  // Show/hide warning based on selected value
  useEffect(() => {
    setShowHazardousWarning(value === 'Hazardous Waste Disposal');
  }, [value]);

  return (
    <div>
      <FormGroup
        id={id}
        label={required ? `${label}*` : label}
        type="select"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select type...</option>
        {CLEANUP_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </FormGroup>

      {/* Hazardous Waste Warning */}
      {showHazardousWarning && (
        <div
          style={{
            background: colors.hazardWarningBGColor,
            border: `1px solid ${colors.hazardWarningBorderColor}`,
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          <p style={{ margin: 0, color: colors.hazardTextColor }}>
            ⚠️ <strong>Important:</strong> Please check your local city/state
            laws for proper hazardous waste disposal. When in doubt, seek
            professional help. This includes items like batteries, paint,
            chemicals, and motor oil.
          </p>
        </div>
      )}
    </div>
  );
}
