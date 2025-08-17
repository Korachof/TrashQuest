// Prominent button for navigating to log cleanup page
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogCleanupButton({
  size = 'large',
  style = {},
  text = 'Log New Cleanup',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/log-cleanup');
  };

  // Size-based styling
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '0.5rem 1rem',
          fontSize: '0.9rem',
        };
      case 'medium':
        return {
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
        };
      case 'large':
      default:
        return {
          padding: '1rem 2rem',
          fontSize: '1.2rem',
        };
    }
  };

  const buttonStyle = {
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      🌱 {text}
    </button>
  );
}
