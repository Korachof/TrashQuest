// Reusable modal component for overlays and dialogs
import React, { useEffect } from 'react';
import useEscape from '../../hooks/useEscape';

function Modal({ isOpen, onClose, children }) {
  // Close modal on Escape key press
  // useEffect(() => {
  //  const handleEscape = (e) => {
  //    if (e.key === 'Escape') {
  //      onClose();
      }
    };
  useEscape(onClose); 

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

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
