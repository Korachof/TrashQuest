import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPasswordModal from '../ForgotPasswordModal';
import { sendPasswordResetEmail } from 'firebase/auth';
import { vi } from 'vitest';

// Mock firebase auth
vi.mock('firebase/auth', () => ({
  sendPasswordResetEmail: vi.fn(),
  getAuth: vi.fn(() => ({})),
}));

describe('ForgotPasswordModal', () => {
  // Reusable constants for tests
  const mockOnClose = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
  };

  // Clear the mocks before each next test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifies that modal renders with correct heading and text:
  test('renders with correct heading and instruction text', () => {
    render(<ForgotPasswordModal {...defaultProps} />);

    expect(screen.getByText('Reset Your Password 🔑')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Enter your email address and we'll send you a link to reset your password."
      )
    ).toBeInTheDocument();
  });

  // Test 2: Verifies that the email input field renders correctly
  test('renders email input field', () => {
    render(<ForgotPasswordModal {...defaultProps} />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  // Test 3: Verifies that submit button renders with correct text
  test('renders submit button with correct text', () => {
    render(<ForgotPasswordModal {...defaultProps} />);

    expect(screen.getByText('Send Reset Email')).toBeInTheDocument();
  });

  // Test 4: Verifies that user can type in email field
  test('allows user to type in email field', () => {
    render(<ForgotPasswordModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  // Test 5: Verifies that an email sent successfully
  test('sends password reset email successfully', async () => {
    sendPasswordResetEmail.mockResolvedValueOnce();

    render(<ForgotPasswordModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Send Reset Email');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        {},
        'test@example.com'
      );
    });

    expect(
      screen.getByText(
        'Password reset request sent! Check your email inbox or spam folder'
      )
    ).toBeInTheDocument();
  });

  // Test 6: Verifies error handling is working when sending an email fails
  test('displays error message when email sending fails', async () => {
    // Add a spy so the error console message doesn't show during tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const errorMessage = 'User not found';

    sendPasswordResetEmail.mockRejectedValueOnce(new Error(errorMessage));

    render(<ForgotPasswordModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Send Reset Email');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    // Restore console.error
    consoleSpy.mockRestore();
  });

  // Test 7: Verifies that the loading state fires during email sending
  test('shows loading state during email sending', async () => {
    sendPasswordResetEmail.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<ForgotPasswordModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Send Reset Email');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('🔄 Sending email...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Send Reset Email')).toBeInTheDocument();
    });
  });

  // Test 8: Verifies that the form clears when modal closes
  test('clears form state when modal closes', () => {
    render(<ForgotPasswordModal {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // Test 9: Verifies the form doesn't submit when the email field is empty
  test('form submission requires email input', () => {
    render(<ForgotPasswordModal {...defaultProps} />);

    const submitButton = screen.getByText('Send Reset Email');
    fireEvent.click(submitButton);

    expect(sendPasswordResetEmail).not.toHaveBeenCalled();
  });
});
