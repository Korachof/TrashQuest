// src/components/shared/PointsDisplay.jsx
import React from 'react';
import { usePoints } from '../../context/PointsContext';
import { pointsDisplayStyle } from '../../styles/componentStyles';

export default function PointsDisplay({ showIcon = true, style = {} }) {
  const { userPoints, loading } = usePoints();

  return (
    // style = custom style props
    <div style={{ ...pointsDisplayStyle, ...style }}>
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
