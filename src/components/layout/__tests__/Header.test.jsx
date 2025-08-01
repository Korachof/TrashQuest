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

vi.mock('react-icons/fa', () => ({
  FaUser: () => <span>User Icon</span>,
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
  test('How It Works nav link renders', () => {
    render(<Header />);
    expect(screen.getByText('How It Works')).toBeInTheDocument();
  });

  // Test 4: Verifies How It Works link has correct href
  test('How It Works link has correct href', () => {
    render(<Header />);

    const howItWorksLink = screen.getByText('How It Works').closest('a');
    expect(howItWorksLink).toHaveAttribute('href', '/how-it-works');
  });

  // Test 5: Verifies that the "resources" nav link is rendering
  test('Resources nav link renderrs', () => {
    render(<Header />);
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  // Test 6: Verifies Resources link has correct href
  test('Resources link has correct href', () => {
    render(<Header />);

    const resourcesLink = screen.getByText('Resources').closest('a');
    expect(resourcesLink).toHaveAttribute('href', '/resources');
  });

  // Test 7: Verifies that the Sign In link appears when not authenticated
  test('sign in link shows when not authenticated', () => {
    render(<Header />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  // Test 8: Verifies that the logo links to home when not authenticated
  test('logo links to home when not authenticated', () => {
    useAuth.mockReturnValue({ currentUser: null });

    render(<Header />);
    const logoLink = screen.getByText('TrashQuest ♻️').closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  // Test 9: Verifies that the Log Out button appears when authenticated
  test('log out button shows when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  // Test 10: Verifies that the user name appears when authenticated
  test('user name shows when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  // Test 11: Verifies that the logo links to dashboard when authenticated
  test('logo links to dashboard when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);
    const logoLink = screen.getByText('TrashQuest ♻️').closest('a');
    expect(logoLink).toHaveAttribute('href', '/dashboard');
  });

  // Test 12: Verifies log out dialogue does NOT show before clicking Log Out
  test('logout confirmation dialogue DOES NOT show BEFORE click', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    expect(screen.queryByText('Confirm Logout')).not.toBeInTheDocument();
  });

  // Test 13: Verifies log out dialogue shows after clicking Log Out
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

  // Test 14: Verifies Cancel dialogue shows after clicking Log Out
  test('cancel dialogue option DOES show AFTER click', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);

    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  });

  // Test 15: Verifies the log out confirmation dialogue hides after clicking Cancel
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

  // Test 16: Verifies clicking confirm to Log Out calls Signout Exactly Once
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

  // Test 17: Verifies clicking confirm to log out navigates to Home Page
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

  // Test 18: Verifies Profile link shows user info
  test('profile link shows user info when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    // Check that user icon and name are displayed
    expect(screen.getByText('User Icon')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  // Test 19: Verifies profile link shows correct href when authenticated
  test('profile link shows correct href when authenticated', () => {
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    render(<Header />);

    const profileLink = screen.getByText('Test User').closest('a');
    expect(profileLink).toHaveAttribute('href', '/profile');
  });

  // Test 20: Verifies useEffect hides private dialogue when currentUser changes
  test('useEffect hides dialog when currentUser changes', () => {
    // Start with authenticated user
    useAuth.mockReturnValue({
      currentUser: { displayName: 'Test User' },
    });

    const { rerender } = render(<Header />);

    // Show the confirmation dialog
    const logOutButton = screen.getByText('Log Out');
    fireEvent.click(logOutButton);
    expect(screen.getByTestId('confirm-logout')).toBeInTheDocument();

    // Change currentUser (simulate logout)
    useAuth.mockReturnValue({
      currentUser: null,
    });

    // Re-render with new auth state
    rerender(<Header />);

    // Dialog should be hidden due to useEffect
    expect(screen.queryByTestId('confirm-logout')).not.toBeInTheDocument();
  });
});
