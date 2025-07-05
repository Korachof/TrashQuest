// Landing page button to start Questing

import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartQuestButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/login')}
      style={{
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '2rem',
      }}
    >
      Start Your TrashQuest Now! 🚀
    </button>
  );
}

export default StartQuestButton;
