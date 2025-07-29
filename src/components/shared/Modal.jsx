// Reusable modal component for overlays and dialogs
import React, { useEffect } from 'react';
import useEscape from '../../hooks/useEscape';

function Modal({ isOpen, onClose, children }) {
  useEscape(onClose);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
