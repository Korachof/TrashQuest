// Landing page button to start Questing
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getButtonStyle } from '../../styles/buttonStyles';

export default function StartQuestButton({
  style = {},
  text = 'Start your TrashQuest Now!',
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
