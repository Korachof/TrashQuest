// Pop up that confirms the user's logout request
import React from 'react';
import useEscape from '../../hooks/useEscape';

import { popupStyles } from '../../styles/layout';

function ConfirmLogout({ onConfirm, onCancel }) {
  useEscape(onCancel);
  return (
    <div style={popupStyles}>
      <p>Are you sure you want to log out?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
}

export default ConfirmLogout;
