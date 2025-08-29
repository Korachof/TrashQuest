// Displays message on success
import React from 'react';
import { colors } from '../../styles/colors';

export default function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <p
      style={{ color: colors.successMessageTextColor, textAlign: 'center' }}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}
