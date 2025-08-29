// src/components/shared/ErrorMessage.jsx
import React from 'react';
import { colors } from '../../styles/colors';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p
      style={{ color: colors.errorMessageTextColor, textAlign: 'center' }}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </p>
  );
}
