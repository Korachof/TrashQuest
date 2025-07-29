// Reusable modal component for overlays and dialogs
import React, { useEffect } from 'react';
import useEscape from '../../hooks/useEscape';
import { modalOverlayStyle, modalContentStyle } from '../../styles/modalStyles';

function Modal({ isOpen, onClose, children }) {
  useEscape(onClose, isOpen);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={modalOverlayStyle}
    >
      {/* stopPropation: Prevent clicks inside modal content from bubbling up to the overlay,
      which would trigger onClose and close the modal unexpectedly */}
      <div onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
        <button onClick={onClose} aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
