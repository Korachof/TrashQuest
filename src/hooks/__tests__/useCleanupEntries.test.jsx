import { renderHook, waitFor, act } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import useCleanupEntries from '../useCleanupEntries';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { usePoints } from '../../context/PointsContext';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
  increment: vi.fn(),
}));

// Mock Firebase config
vi.mock('../../firebase', () => ({
  db: {},
}));

// Mock contexts
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../context/PointsContext', () => ({
  usePoints: vi.fn(),
}));

// Mock console.error
global.console.error = vi.fn();

describe('useCleanupEntries', () => {
  const mockUpdateUserPoints = vi.fn();
  const mockUser = {
    uid: 'test-user-123',
    email: 'test@example.com',
  };

  const mockEntries = [
    {
      id: 'entry-1',
      userId: 'test-user-123',
      date: '2024-01-15',
      size: 'Grocery Bag (~4 gallons)',
      type: 'General Recycling',
      area: 'Park',
      pointsEarned: 60,
      createdAt: { seconds: 1705334400 },
    },
    {
      id: 'entry-2',
      userId: 'test-user-123',
      date: '2024-01-10',
      size: 'Single Large Item',
      type: 'Electronics Recycling',
      area: 'Downtown',
      pointsEarned: 10,
      createdAt: { seconds: 1705248000 },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock auth context
    useAuth.mockReturnValue({
      currentUser: mockUser,
    });

    // Mock points context
    usePoints.mockReturnValue({
      userPoints: 270,
      updateUserPoints: mockUpdateUserPoints,
    });

    // Mock Firestore functions
    query.mockImplementation((...args) => ({ queryArgs: args }));
    collection.mockReturnValue({ collection: 'cleanupEntries' });
    where.mockReturnValue({ where: 'userId == test-user-123' });
    orderBy.mockReturnValue({ orderBy: 'createdAt desc' });
    limit.mockReturnValue({ limit: 'applied' });
    doc.mockReturnValue({ doc: 'reference' });
    increment.mockReturnValue({ increment: 'function' });
  });

  // Test 1: Initial state is loading with empty entries
  test('starts with loading state and empty entries', () => {
    // Step 1: Mock getDocs to never resolve (simulates loading)
    getDocs.mockImplementation(() => new Promise(() => {}));

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Verify initial state
    expect(result.current.entries).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.currentPoints).toBe(270);
  });

  // Test 2: Fetches the correct number of entries successfully
  test('loads correct number of entries', async () => {
    // Step 1: Mock successful getDocs response
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => ({
          userId: entry.userId,
          date: entry.date,
          size: entry.size,
          type: entry.type,
          area: entry.area,
          pointsEarned: entry.pointsEarned,
          createdAt: entry.createdAt,
        }),
      })),
    });

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for loading to complete and verify count
    await waitFor(() => {
      expect(result.current.entries).toHaveLength(2);
    });
  });

  // Test 3: Maps first entry data correctly
  test('maps first entry data correctly', async () => {
    // Step 1: Mock successful getDocs response
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => ({
          userId: entry.userId,
          date: entry.date,
          size: entry.size,
          type: entry.type,
          area: entry.area,
          pointsEarned: entry.pointsEarned,
          createdAt: entry.createdAt,
        }),
      })),
    });

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for loading and verify first entry
    await waitFor(() => {
      expect(result.current.entries[0]).toEqual({
        id: 'entry-1',
        userId: 'test-user-123',
        date: '2024-01-15',
        size: 'Grocery Bag (~4 gallons)',
        type: 'General Recycling',
        area: 'Park',
        pointsEarned: 60,
        createdAt: { seconds: 1705334400 },
      });
    });
  });

  // Test 4: Maps second entry data correctly
  test('maps second entry data correctly', async () => {
    // Step 1: Mock successful getDocs response
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => ({
          userId: entry.userId,
          date: entry.date,
          size: entry.size,
          type: entry.type,
          area: entry.area,
          pointsEarned: entry.pointsEarned,
          createdAt: entry.createdAt,
        }),
      })),
    });

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for loading and verify second entry
    await waitFor(() => {
      expect(result.current.entries[1]).toEqual({
        id: 'entry-2',
        userId: 'test-user-123',
        date: '2024-01-10',
        size: 'Single Large Item',
        type: 'Electronics Recycling',
        area: 'Downtown',
        pointsEarned: 10,
        createdAt: { seconds: 1705248000 },
      });
    });
  });

  // Test 5: Does not apply limit when limitEntries is null
  test('does not apply limit when limitEntries is null', async () => {
    // Step 1: Mock getDocs response
    getDocs.mockResolvedValue({ docs: [] });

    // Step 2: Render hook without limit
    renderHook(() => useCleanupEntries(null));

    // Step 3: Verify limit was not called
    await waitFor(() => {
      expect(getDocs).toHaveBeenCalled();
    });

    expect(limit).not.toHaveBeenCalled();
  });

  // Test 6: Applies limit when limitEntries is provided
  test('applies limit when limitEntries parameter is provided', async () => {
    // Step 1: Mock getDocs response
    getDocs.mockResolvedValue({ docs: [] });

    // Step 2: Render hook with limit
    renderHook(() => useCleanupEntries(5));

    // Step 3: Wait for query to be built
    await waitFor(() => {
      expect(limit).toHaveBeenCalledWith(5);
    });
  });

  // Test 7: Handles fetch errors gracefully
  test('handles fetch errors gracefully', async () => {
    // Step 1: Mock getDocs error
    const errorMessage = 'Firestore error';
    getDocs.mockRejectedValue(new Error(errorMessage));

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for error handling
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Verify error was logged and state is correct
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching cleanup entries:',
      expect.any(Error)
    );
    expect(result.current.entries).toEqual([]);
  });

  // Test 8: Removes entry from state when deleted
  test('removes entry from state when deleted', async () => {
    // Step 1: Setup initial entries
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => entry,
      })),
    });

    deleteDoc.mockResolvedValue();
    updateDoc.mockResolvedValue();

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Delete an entry
    await act(async () => {
      await result.current.deleteEntry('entry-1');
    });

    // Step 5: Verify entry was removed from state
    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0].id).toBe('entry-2');
  });

  // Test 9: Calls deleteDoc when deleting entry
  test('calls deleteDoc when deleting entry', async () => {
    // Step 1: Setup initial entries
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => entry,
      })),
    });

    deleteDoc.mockResolvedValue();
    updateDoc.mockResolvedValue();

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Delete an entry
    await act(async () => {
      await result.current.deleteEntry('entry-1');
    });

    // Step 5: Verify deleteDoc was called
    expect(deleteDoc).toHaveBeenCalledWith({ doc: 'reference' });
  });

  // Test 10: Updates user points in Firestore when deleting entry
  test('updates user points in Firestore when deleting entry', async () => {
    // Step 1: Setup initial entries
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => entry,
      })),
    });

    deleteDoc.mockResolvedValue();
    updateDoc.mockResolvedValue();

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Delete an entry
    await act(async () => {
      await result.current.deleteEntry('entry-1');
    });

    // Step 5: Verify user points were updated in Firestore
    expect(updateDoc).toHaveBeenCalledWith(
      { doc: 'reference' },
      {
        totalEcoPoints: { increment: 'function' },
        updatedAt: expect.any(Date),
      }
    );
  });

  // Test 11: Updates points context when deleting entry
  test('updates points context when deleting entry', async () => {
    // Step 1: Setup initial entries
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => entry,
      })),
    });

    deleteDoc.mockResolvedValue();
    updateDoc.mockResolvedValue();

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Delete an entry
    await act(async () => {
      await result.current.deleteEntry('entry-1');
    });

    // Step 5: Verify points context was updated
    expect(mockUpdateUserPoints).toHaveBeenCalledWith(-60);
  });

  // Test 12: Handles delete errors gracefully
  test('handles delete errors gracefully', async () => {
    // Step 1: Setup initial entries
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => entry,
      })),
    });

    deleteDoc.mockRejectedValue(new Error('Delete failed'));

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Attempt to delete entry
    await act(async () => {
      await result.current.deleteEntry('entry-1');
    });

    // Step 5: Verify error was logged and entries unchanged
    expect(console.error).toHaveBeenCalledWith(
      'Error deleting entry:',
      expect.any(Error)
    );
    expect(result.current.entries).toHaveLength(2); // No change
  });

  // Test 13: Does nothing when deleting non-existent entry
  test('does nothing when trying to delete non-existent entry', async () => {
    // Step 1: Setup initial entries
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => entry,
      })),
    });

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Try to delete non-existent entry
    await act(async () => {
      await result.current.deleteEntry('non-existent-id');
    });

    // Step 5: Verify no Firestore operations were called
    expect(deleteDoc).not.toHaveBeenCalled();
    expect(updateDoc).not.toHaveBeenCalled();
    expect(mockUpdateUserPoints).not.toHaveBeenCalled();
  });

  // Test 14: Updates entry successfully
  test('updates entry successfully', async () => {
    // Step 1: Setup initial entries
    getDocs.mockResolvedValue({
      docs: mockEntries.map((entry) => ({
        id: entry.id,
        data: () => entry,
      })),
    });

    // Step 2: Render hook
    const { result } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Step 4: Update an entry
    const updatedEntry = {
      ...mockEntries[0],
      size: 'Standard Garbage Bag (~13 gallons)',
      pointsEarned: 180, // Changed from 60 to 180
    };

    act(() => {
      result.current.updateEntry(updatedEntry);
    });

    // Step 5: Verify entry was updated
    expect(result.current.entries[0]).toEqual(updatedEntry);

    // Step 6: Verify points context was updated with difference (180 - 60 = 120)
    expect(mockUpdateUserPoints).toHaveBeenCalledWith(120);
  });

  // Test 15: Re-fetches when currentUser changes
  test('re-fetches entries when currentUser changes', async () => {
    // Step 1: Mock initial user
    getDocs.mockResolvedValue({ docs: [] });

    // Step 2: Render hook
    const { rerender } = renderHook(() => useCleanupEntries());

    // Step 3: Wait for initial fetch
    await waitFor(() => {
      expect(getDocs).toHaveBeenCalledTimes(1);
    });

    // Step 4: Change user
    useAuth.mockReturnValue({
      currentUser: { uid: 'different-user' },
    });

    // Step 5: Re-render hook
    rerender();

    // Step 6: Verify fetch was called again
    await waitFor(() => {
      expect(getDocs).toHaveBeenCalledTimes(2);
    });
  });

  // Test 16: Re-fetches when limitEntries changes
  test('re-fetches entries when limitEntries changes', async () => {
    // Step 1: Mock getDocs response
    getDocs.mockResolvedValue({ docs: [] });

    // Step 2: Render hook with initial limit
    const { rerender } = renderHook(({ limit }) => useCleanupEntries(limit), {
      initialProps: { limit: 5 },
    });

    // Step 3: Wait for initial fetch
    await waitFor(() => {
      expect(getDocs).toHaveBeenCalledTimes(1);
    });

    // Step 4: Change limit
    rerender({ limit: 10 });

    // Step 5: Verify fetch was called again
    await waitFor(() => {
      expect(getDocs).toHaveBeenCalledTimes(2);
    });
  });
});
