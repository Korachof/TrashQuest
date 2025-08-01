import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../Header';
import { useAuth } from '../../../context/AuthContext';
import ConfirmLogout from '../../shared/ConfirmLogout';

// Mock only what we absolutely need to get the component to render
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({ currentUser: null })),
}));

vi.mock('firebase/auth', () => ({
  signOut: vi.fn(),
  getAuth: vi.fn(),
}));

vi.mock('../../firebase', () => ({
  auth: {},
}));

vi.mock('../../shared/ConfirmLogout', () => ({
  default: () => <div data-testid="confirm-logout">Confirm Logout</div>,
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
});
