// Tester for the /shared/ProtectedRoute.jsx component
import React from 'react';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../ProtectedRoute';
import { useAuth } from '../../../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock the useAuth hook (replace useAuth with a fake for testing)
vi.mock('../../../context/AuthContext', () => ({
  useAuth: vi.fn(), // create mock useAuth function
}));

// Mock the loader function (replace with fake for testing)
vi.mock('../Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

describe('ProtectedRoute', () => {
  // Reusable constants for tests
  const TestChild = () => (
    <div data-testid="protected-content">Protected Content</div>
  );

  // Test 1: If user is logged in, protected content will show
  test('renders children if authenticated', () => {
    // Step 1: what mock useAuth should return
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: '123', email: 'test@example.com' },
      authLoading: false,
    });

    // Step 2: Create test content for ProtectedRoute
    TestChild();

    // Step 3: Render Protected route with the test content
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Step 4: Verify that the test content properly renders
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  // Test 2: If user is not logged in, should be redirected to /login
  test('redirects to default route if unauthenticated', () => {
    // Step 1: Mock an unauthenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null, // No user logged in
      authLoading: false, // Loading is done
    });

    // Step 2: Create test content (this should NOT appear)
    TestChild();

    // Step 3: Render the component
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Step 4: Verify protected content does NOT render if user is unauthenticated
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  // Test 3: Verify that loader is properly rendering
  test('shows loader while authentication is loading', () => {
    // Step 1: Mock loading state
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null, // user state isn't important
      authLoading: true, // This is what matters
    });

    // Step 2: Render the component
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Step 3: Verify loader appears and protected content does NOT
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  // Test 4: Loading takes precedence over authentication state
  test('shows loader even when user exists but auth is still loading', () => {
    // Step 1: Mock loading state with user present
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: '123', email: 'test@example.com' },
      authLoading: true, // Still loading even with user
    });

    // Step 2: Render component
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Step 3: Verify loader appears (loading takes precedence)
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  // Test 5: Re-renders correctly when auth state changes
  test('re-renders correctly when auth state changes', () => {
    // Step 1: Mock initial loading state
    const mockUseAuth = vi.mocked(useAuth);
    mockUseAuth.mockReturnValue({
      currentUser: null,
      authLoading: true,
    });

    // Step 2: Render component
    const { rerender } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Step 4: Change to authenticated state
    mockUseAuth.mockReturnValue({
      currentUser: { uid: '789', email: 'user@test.com' },
      authLoading: false,
    });

    // Step 5: Re-render component
    rerender(
      <MemoryRouter>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Step 6: Verify protected content now renders
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
