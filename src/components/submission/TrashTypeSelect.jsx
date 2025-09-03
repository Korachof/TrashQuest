// Dropdown component for selecting cleanup/trash type
import React, { useState, useEffect } from 'react';
import FormGroup from '../shared/FormGroup';
import { colors } from '../../styles/colors';
import { trashTypeSelectContent as content } from '../../content/trashTypeSelectText';

// Cleanup types with educational info
const CLEANUP_TYPES = [
  { value: content.trash, label: content.trash },
  { value: content.recycle, label: content.recycle },
  { value: content.electronic, label: content.electronic },
  {
    value: content.hazardous,
    label: content.hazardous,
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
        <option value="">{content.fieldText}</option>
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
            {content.hazardousIcon}
            <strong>{content.hazardousTitle}</strong> {content.hazardousWarning}
          </p>
        </div>
      )}
    </div>
  );
}
