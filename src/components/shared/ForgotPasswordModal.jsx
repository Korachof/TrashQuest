// Modal for password reset functionality
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import Modal from './Modal';
import FormGroup from './FormGroup';
import FormButton from './FormButton';
import { formContainer } from '../../styles/forms';
import { headingTextStyle } from '../../styles/typography';

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(
        'Password reset email sent! Check your inbox or spam folder'
      );
      setEmail(''); // Clear the form
    } catch (error) {
      console.error('Password reset error:', error.code, error.message);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Clear state when closing
    setEmail('');
    setSuccessMsg('');
    setErrorMsg('');
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 style={headingTextStyle}>Reset Your Password 🔑</h2>
      <p>
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <form onSubmit={handleSubmit} style={formContainer}>
        <FormGroup
          id="reset-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormButton isLoading={isLoading} loadingText="🔄 Sending email...">
          Send Reset Email
        </FormButton>
      </form>

      {successMsg && (
        <p style={{ color: 'green' }} role="status" aria-live="polite">
          {successMsg}
        </p>
      )}
      {errorMsg && (
        <p style={{ color: 'red' }} role="alert" aria-live="assertive">
          {errorMsg}
        </p>
      )}
    </Modal>
  );
}

export default ForgotPasswordModal;
