// src/components/shared/PointsDisplay.jsx
import React from 'react';
import { usePoints } from '../../context/PointsContext';
import { colors } from '../../styles/colors';

export default function PointsDisplay({
  size = 'large', // 'large', 'medium', 'small'
  showIcon = true,
  style = {},
}) {
  const { userPoints, loading } = usePoints();

  // Size-based styling
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '0.9rem', padding: '0.5rem' };
      case 'medium':
        return { fontSize: '1.1rem', padding: '0.75rem' };
      case 'large':
      default:
        return { fontSize: '1.5rem', padding: '1rem' };
    }
  };

  const baseStyle = {
    background: '#d4edda',
    borderRadius: '8px',
    textAlign: 'center',
    color: colors.EcoDisplayTextColor,
    ...getSizeStyles(),
    ...style,
  };

  return (
    <div style={baseStyle}>
      {loading ? (
        'Loading...'
      ) : (
        <>
          {showIcon && '🌱 '}
          {userPoints} Eco Points
        </>
      )}
    </div>
  );
}
