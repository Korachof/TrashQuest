import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPasswordModal from '../ForgotPasswordModal';
import { sendPasswordResetEmail } from 'firebase/auth';
import { vi } from 'vitest';

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
});
