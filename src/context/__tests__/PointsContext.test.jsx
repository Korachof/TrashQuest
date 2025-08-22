// Tests for the PointsContext
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { PointsProvider, usePoints } from '../PointsContext';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  getDoc: vi.fn(),
}));

// Mock Firebase config
vi.mock('../../firebase', () => ({
  db: {},
}));

// Mock AuthContext
vi.mock('../AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('PointsProvider', () => {
  // Test component that uses the context
  const TestComponent = () => {
    const { userPoints, updateUserPoints, loading } = usePoints();

    return (
      <div>
        <div data-testid="user-points">{userPoints}</div>
        <div data-testid="loading-state">{loading ? 'loading' : 'loaded'}</div>
        <button
          data-testid="add-points-btn"
          onClick={() => updateUserPoints(10)}
        >
          Add 10 Points
        </button>
        <button
          data-testid="subtract-points-btn"
          onClick={() => updateUserPoints(-5)}
        >
          Subtract 5 Points
        </button>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console.error mock to avoid pollution between tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Test 1: Provider renders children correctly
  test('renders children without crashing', () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: '123' },
    });

    // Step 2: Mock successful Firestore response
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 50 }),
    });

    // Step 3: Render component with provider
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 4: Verify children render
    expect(screen.getByTestId('user-points')).toBeInTheDocument();
  });

  // Test 2: Correctly goes into loading state when points context is fetched
  test('uses loading state when fetching points context', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    // Step 2: Mock Firestore response with points data
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 250 }),
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 4: Initially should be loading
    expect(screen.getByTestId('loading-state')).toHaveTextContent('loading');
  });

  // Test 3: Verifies that points load and verify
  test('points load and verify correctly', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    // Step 2: Mock Firestore response with points data
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 250 }),
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 5: Wait for points to load and verify
    await waitFor(() => {
      expect(screen.getByTestId('user-points')).toHaveTextContent('250');
      expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
    });
  });

  // Test 4: Verifies that Firestore is called exactly once when fetching user points
  test('firestore is called exactly once when fetching user points', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    // Step 2: Mock Firestore response with points data
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 250 }),
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    expect(getDoc).toHaveBeenCalledTimes(1);
  });

  // Test 5: Verifies that Firestore was called correctly when fetching user points
  test('firestore calls correct username and id when fetching points', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    // Step 2: Mock Firestore response with points data
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 250 }),
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    expect(doc).toHaveBeenCalledWith({}, 'users', 'user123');
  });

  // Test 6: Verifies that points content correctly loads when user has no points
  test('points document finishes loading when user has 0 totalEcoPoints', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'newuser456' },
    });

    // Step 2: Mock Firestore response without points data
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ name: 'John Doe' }), // No totalEcoPoints field
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 4: Wait for loading to complete and verify default points
    await waitFor(() => {
      expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
    });
  });

  // Test 7: Verifies that user points default to 0 if they have no points data
  test('defaults to 0 points when user document has 0 totalEcoPoints', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'newuser456' },
    });

    // Step 2: Mock Firestore response without points data
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ name: 'John Doe' }), // No totalEcoPoints field
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 4: Wait for loading to complete and verify default points
    await waitFor(() => {
      expect(screen.getByTestId('user-points')).toHaveTextContent('0');
    });
  });

  // Test 8: Verifies that if a user does not exist, their points returns 0
  test('returns 0 points when user document does not exist', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'nonexistent789' },
    });

    // Step 2: Mock Firestore response for non-existent document
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false,
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 4: Wait for loading to complete and verify points remain 0
    await waitFor(() => {
      expect(screen.getByTestId('user-points')).toHaveTextContent('0');
    });
  });

  // Test 9: Verifies that the process finishes loading even when a user is non-existent
  test('points fetching process completes even if user does not exist', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'nonexistent789' },
    });

    // Step 2: Mock Firestore response for non-existent document
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => false,
    });

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 4: Wait for loading to complete and verify points remain 0
    await waitFor(() => {
      expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
    });
  });

  // Test 10: Verifies that if the user is unauthenticated, points fetching still loads
  test('points fetching process finishes loading when user is unauthenticated', async () => {
    // Step 1: Mock unauthenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
    });

    // Step 2: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
    });
  });

  // Test 11: Verifies that if a user is unauthenticated, points show as 0
  test('sets points to 0 when user is not authenticated', async () => {
    // Step 1: Mock unauthenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
    });

    // Step 2: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('user-points')).toHaveTextContent('0');
    });
  });

  // Test 12: Verifies that Firestore is NOT called when user is unauthenticated
  test('verifies that firestore is not called if user is unauthenticated', async () => {
    // Step 1: Mock unauthenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: null,
    });

    // Step 2: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Verify Firestore was not called
    expect(getDoc).not.toHaveBeenCalled();
  });

  // Test 13: Verifies that PointsDisplay handles firestore errors gracefully
  test('handles Firestore errors and logs them', async () => {
    // Step 1: Mock authenticated user
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'erroruser' },
    });

    // Step 2: Mock Firestore error
    const errorMessage = 'Network error';
    vi.mocked(getDoc).mockRejectedValue(new Error(errorMessage));

    // Step 3: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 4: Wait for error handling and verify state
    await waitFor(() => {});

    // Step 5: Verify error was logged
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching user points:',
      expect.any(Error)
    );
  });

  // Test 14: updateUserPoints function loads the correct points
  test('updateUserPoints loads points correctly', async () => {
    // Step 1: Mock authenticated user with initial points
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 100 }),
    });

    // Step 2: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('user-points')).toHaveTextContent('100');
    });
  });

  // Test 15: updateUserPoints function adds points correctly
  test('updateUserPoints adds points correctly', async () => {
    // Step 1: Mock authenticated user with initial points
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 100 }),
    });

    // Step 2: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Wait for initial load
    await waitFor(() => {});

    // Step 4: Click button to add points
    const addButton = screen.getByTestId('add-points-btn');
    await act(async () => {
      addButton.click();
    });

    // Step 5: Verify points were added
    expect(screen.getByTestId('user-points')).toHaveTextContent('110');
  });

  // Test 16: updateUserPoints function subtracts points correctly
  test('updateUserPoints subtracts points correctly', async () => {
    // Step 1: Mock authenticated user with initial points
    vi.mocked(useAuth).mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 50 }),
    });

    // Step 2: Render component
    render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Wait for initial load
    await waitFor(() => {});

    // Step 4: Click button to subtract points
    const subtractButton = screen.getByTestId('subtract-points-btn');
    await act(async () => {
      subtractButton.click();
    });

    // Step 5: Verify points were subtracted
    expect(screen.getByTestId('user-points')).toHaveTextContent('45');
  });

  // Test 17: Verifies that when currentUser changes, getDoc is called exactly twice.
  test('re-fetches points when currentUser changes', async () => {
    // Step 1: Mock initial user
    const mockUseAuth = vi.mocked(useAuth);
    mockUseAuth.mockReturnValue({
      currentUser: { uid: 'user1' },
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 100 }),
    });

    // Step 2: Render component
    const { rerender } = render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('user-points')).toHaveTextContent('100');
    });

    // Step 4: Change to different user
    mockUseAuth.mockReturnValue({
      currentUser: { uid: 'user2' },
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 200 }),
    });

    // Step 5: Re-render component
    rerender(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 6: wait for points updated for new user
    await waitFor(() => {});

    // Step 7: Verify getDoc was called for both users
    expect(getDoc).toHaveBeenCalledTimes(2);
  });

  // Test 18: Verify that when currentUser changes, points updates correctly
  test('re-fetches points when currentUser changes', async () => {
    // Step 1: Mock initial user
    const mockUseAuth = vi.mocked(useAuth);
    mockUseAuth.mockReturnValue({
      currentUser: { uid: 'user1' },
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 100 }),
    });

    // Step 2: Render component
    const { rerender } = render(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 3: Wait for initial load
    await waitFor(() => {});

    // Step 4: Change to different user
    mockUseAuth.mockReturnValue({
      currentUser: { uid: 'user2' },
    });

    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,
      data: () => ({ totalEcoPoints: 200 }),
    });

    // Step 5: Re-render component
    rerender(
      <PointsProvider>
        <TestComponent />
      </PointsProvider>
    );

    // Step 6: Verify points updated for new user
    await waitFor(() => {
      expect(screen.getByTestId('user-points')).toHaveTextContent('200');
    });
  });

  // Test 19: usePoints hook throws error when used outside points provider
  describe('usePoints hook', () => {
    test('throws error when used outside of PointsProvider', () => {
      const TestComponentWithoutProvider = () => {
        try {
          usePoints();
          return <div>Should not reach here</div>;
        } catch (error) {
          return <div data-testid="error-message">{error.message}</div>;
        }
      };

      render(<TestComponentWithoutProvider />);

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'usePoints must be used within PointsProvider'
      );
    });
  });
});
