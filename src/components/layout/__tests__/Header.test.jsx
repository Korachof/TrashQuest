import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../Header';
import { useAuth } from '../../../context/AuthContext';
import ConfirmLogout from '../../shared/ConfirmLogout';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';

// reusable mockNavigate mock
const mockNavigate = vi.fn();

// Resuable mocks
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate, // Return our specific mock
}));

vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({ currentUser: null })),
}));

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('../../../firebase', () => ({
  auth: {},
}));

vi.mock('../../shared/ConfirmLogout', () => ({
  default: ({ onConfirm, onCancel }) => (
    <div data-testid="confirm-logout">
      <p>Confirm Logout</p>
      <button onClick={onConfirm} data-testid="confirm-button">
        Yes
      </button>
      <button onClick={onCancel} data-testid="cancel-button">
        No
      </button>
    </div>
  ),
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifies header renders without crashing
  test('header renders without crashing', () => {
    expect(() => render(<Header />)).not.toThrow();
  });

  // Test 2: Verifies that the logo text is rendering correctly
  test('renders logo text', () => {
    render(<Header />);
    expect(screen.getByText('TrashQuest ♻️')).toBeInTheDocument();
  });

  // Test 3: Verifies that the "how it works" nav link is rendering
  test('navigation link -- how it works -- renders', () => {
    render(<Header />);
    expect(screen.getByText('How It Works')).toBeInTheDocument();
  });

  // Test 4: Verifies that the "resources" nav link is rendering
  test('navigation link -- resources -- renders', () => {
    render(<Header />);
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  // Test 5: Verifies that the Sign In link appears when not authenticated
  test('sign in link shows when not authenticated', () => {
    render(<Header />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  // Test 6: Verifies that the logo links to home when not authenticated
  test('logo links to home when not authenticated', () => {
    useAuth.mockReturnValue({ currentUser: null });

    render(<Header />);
    const logoLink = screen.getByText('TrashQuest ♻️').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  // Test 7: Verifies that the Log Out button appears when authenticated
  test('log out button shows when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  // Test 8: Verifies that the user name appears when authenticated
  test('user name shows when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  // Test 9: Verifies that the logo links to dashboard when authenticated
  test('logo links to dashboard when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);
    const logoLink = screen.getByText('TrashQuest ♻️').closest('a');
    expect(logoLink).toHaveAttribute('href', '/dashboard');
  });

  // Test 10: Verifies log out dialogue does NOT show before clicking Log Out
  test('logout confirmation dialogue DOES NOT show BEFORE click', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    expect(screen.queryByText('Confirm Logout')).not.toBeInTheDocument();
  });

  // Test 11: Verifies log out dialogue shows after clicking Log Out
  test('logout confirmation dialogue DOES show AFTER click', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);

    expect(screen.getByText('Confirm Logout')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-logout')).toBeInTheDocument();
  });

  // Test 12: Verifies Cancel dialogue shows after clicking Log Out
  test('cancel dialogue option DOES show AFTER click', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);

    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  });

  // Test 13: Verifies the log out confirmation dialogue hides after clicking Cancel
  test('clicking cancel hides confirmation dialog', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    // Show the dialog
    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);

    // Click cancel
    const cancelButton = screen.getByTestId('cancel-button');
    fireEvent.click(cancelButton);

    // Dialog should be hidden
    expect(screen.queryByTestId('confirm-logout')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cancel-button')).not.toBeInTheDocument();
  });

  // Test 14: Verifies clicking confirm to Log Out calls Signout Exactly Once
  test('clicking confirm to log out calls sign out function', async () => {
    // Access the mock through vi.mocked()
    const mockSignOut = vi.mocked(signOut);
    mockSignOut.mockResolvedValue();

    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    // Show the dialog
    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);

    // Click confirm
    const confirmButton = screen.getByTestId('confirm-button');
    fireEvent.click(confirmButton);

    // Should call signOut
    expect(mockSignOut).toHaveBeenCalled(1);
  });

  // Test 15: Verifies clicking confirm to log out navigates to Home Page
  test('clicking confirm navigates to home page', async () => {
    const mockSignOut = vi.mocked(signOut);
    mockSignOut.mockResolvedValue();

    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);

    const confirmButton = screen.getByTestId('confirm-button');
    fireEvent.click(confirmButton);

    // Wait for async operations to complete
    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
