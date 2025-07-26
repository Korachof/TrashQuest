// Modal for password reset functionality
import React from 'react';
import Modal from './Modal';

function ForgotPasswordModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Reset Your Password</h2>
      <p>This is a test modal for forgot password functionality.</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default ForgotPasswordModal;
