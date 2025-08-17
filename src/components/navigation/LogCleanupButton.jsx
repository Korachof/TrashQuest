// Prominent button for navigating to log cleanup page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getButtonStyle } from '../../styles/buttonStyles';

export default function LogCleanupButton({
  size = 'large',
  color = 'primary',
  style = {},
  text = 'Log New Cleanup',
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/log-cleanup');
  };

  const buttonStyle = getButtonStyle(size, color, style);

  return (
    <button onClick={handleClick} style={buttonStyle}>
      🌱 {text}
    </button>
  );
}
