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
});
