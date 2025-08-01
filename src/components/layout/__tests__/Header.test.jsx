import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Header from '../Header';

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

vi.mock('../shared/ConfirmLogout', () => ({
  default: () => <div>Confirm Logout</div>,
}));

vi.mock('react-icons/fa', () => ({
  FaUser: () => <span>User Icon</span>,
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
});
