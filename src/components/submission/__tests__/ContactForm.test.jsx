import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ContactForm from '../ContactForm';
import { addDoc } from 'firebase/firestore';
import { useAuth } from '../../../context/AuthContext';

// Mock Firebase
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => 'mock-timestamp'),
}));

// Mock Auth Context
vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mock child components
vi.mock('../../shared/FormGroup', () => ({
  default: ({ label, id, onChange, value, type }) => {
    if (type === 'textarea') {
      return (
        <textarea
          data-testid={id}
          onChange={onChange}
          value={value}
          placeholder={label}
        />
      );
    }
    return (
      <input
        data-testid={id}
        type={type || 'text'}
        onChange={onChange}
        value={value}
        placeholder={label}
      />
    );
  },
}));

vi.mock('../../shared/FormButton', () => ({
  default: ({ children, disabled, type }) => (
    <button type={type} disabled={disabled} data-testid="submit-button">
      {children}
    </button>
  ),
}));

vi.mock('../../shared/SuccessMessage', () => ({
  default: ({ message }) =>
    message ? <div data-testid="success-message">{message}</div> : null,
}));

vi.mock('../../shared/ErrorMessage', () => ({
  default: ({ message }) =>
    message ? <div data-testid="error-message">{message}</div> : null,
}));

vi.mock('../../shared/HoneypotField', () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="honeypot"
      type="text"
      value={value}
      onChange={onChange}
    />
  ),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
      authLoading: false,
    });
  });

  // Test 1: Form renders with all required fields
  test('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('emailConfirm')).toBeInTheDocument();
    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(screen.getByTestId('honeypot')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});
