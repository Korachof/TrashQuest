// Prominent button for navigating to log cleanup page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getButtonStyle } from '../../styles/buttonStyles';
import { navButtonContent as content } from '../../content/navButtonContent';

export default function LogCleanupButton({
  size = 'large',
  color = 'primary',
  style = {},
  text = content.logCleanup,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/log-cleanup');
  };

  const buttonStyle = getButtonStyle(size, color, style);

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}
