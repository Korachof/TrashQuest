import React from 'react';

const HoneypotField = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="website"
      value={value}
      onChange={onChange}
      tabIndex="-1"
      autoComplete="off"
      style={{ position: 'absolute', left: '-9999px' }}
      aria-hidden="true"
    />
  );
};

export default HoneypotField;
