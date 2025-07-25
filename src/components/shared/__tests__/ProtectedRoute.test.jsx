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

    // Step 4: Verify protected content does NOT render
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
});
