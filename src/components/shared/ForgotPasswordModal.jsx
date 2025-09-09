// Modal for password reset functionality
import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import Modal from './Modal';
import FormGroup from './FormGroup';
import FormButton from './FormButton';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { formContainer } from '../../styles/forms';
import { modalHeadingTextStyle, modalTextStyle } from '../../styles/typography';
import { forgotPasswordContent } from '../../content/forgotPassword';
import useRateLimit from '../../hooks/useRateLimit';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { isRateLimited, timeRemaining, recordSubmission } = useRateLimit(
    'forgotPasswordSubmit',
    120
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // rate limiter if submission was already submitted recently
    if (isRateLimited) {
      setError(
        `Please wait ${timeRemaining} seconds before requesting another reset`
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.toLowerCase());
      // Record the submission time for the rate limiter
      recordSubmission();
      setSuccessMsg(forgotPasswordContent.successMsg);
      setEmail(''); // Clear the form
    } catch (error) {
      console.error(forgotPasswordContent.errorMsg, error.code, error.message);
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
      <h2 style={modalHeadingTextStyle}>{forgotPasswordContent.title} 🔑</h2>
      <p style={modalTextStyle}>{forgotPasswordContent.subTitle}</p>

      <form onSubmit={handleSubmit} style={formContainer}>
        <FormGroup
          id="reset-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormButton
          isLoading={isLoading || isRateLimited}
          loadingText={
            isRateLimited
              ? `Wait ${timeRemaining}s`
              : forgotPasswordContent.loadingText
          }
        >
          {isRateLimited
            ? `Wait ${timeRemaining}s`
            : forgotPasswordContent.resetButton}
        </FormButton>
      </form>

      {/* Display Success Message */}
      <SuccessMessage message={successMsg} />

      {/* Display Error Message */}
      <ErrorMessage message={errorMsg} />

      <button onClick={handleClose}>{forgotPasswordContent.closebutton}</button>
    </Modal>
  );
}
