// Landing page button to start Questing
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getButtonStyle } from '../../styles/buttonStyles';
import { navButtonContent as content } from '../../content/navButtonContent';

export default function StartQuestButton({
  style = {},
  text = content.startQuestButton,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  const buttonStyle = getButtonStyle(style);

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}
