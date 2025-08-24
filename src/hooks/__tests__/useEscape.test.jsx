// Tests for the useEscape hook
import { renderHook } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import useEscape from '../useEscape';

describe('useEscape', () => {
  let mockCallback;

  beforeEach(() => {
    mockCallback = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Calls callback when Escape key is pressed
  test('calls callback when Escape key is pressed', () => {
    // Step 1: Render the hook
    renderHook(() => useEscape(mockCallback));

    // Step 2: Simulate Escape key press
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);

    // Step 3: Verify callback was called
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  // Test 2: Calls callback when enabled is explicitly true
  test('calls callback when enabled is explicitly true', () => {
    // Step 1: Render the hook with enabled = true
    renderHook(() => useEscape(mockCallback, true));

    // Step 2: Simulate Escape key press
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);

    // Step 3: Verify callback was called
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  // Test 3: Uses enabled = true by default
  test('is enabled by default when no enabled parameter provided', () => {
    // Step 1: Render the hook without enabled parameter
    renderHook(() => useEscape(mockCallback));

    // Step 2: Simulate Escape key press
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);

    // Step 3: Verify callback was called (proving it's enabled by default)
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  // Test 4: Does not call callback for other keys
  test('does not call callback for other keys', () => {
    // Step 1: Render the hook
    renderHook(() => useEscape(mockCallback));

    // Step 2: Simulate other key presses
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    const aEvent = new KeyboardEvent('keydown', { key: 'a' });

    window.dispatchEvent(enterEvent);
    window.dispatchEvent(spaceEvent);
    window.dispatchEvent(aEvent);

    // Step 3: Verify callback was not called
    expect(mockCallback).not.toHaveBeenCalled();
  });

  // Test 5: Does not call callback when enabled is false
  test('does not call callback when enabled is false', () => {
    // Step 1: Render the hook with enabled = false
    renderHook(() => useEscape(mockCallback, false));

    // Step 2: Simulate Escape key press
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);

    // Step 3: Verify callback was not called
    expect(mockCallback).not.toHaveBeenCalled();
  });

  // Test 6: Removes event listener on unmount
  test('removes event listener when component unmounts', () => {
    // Step 1: Spy on addEventListener and removeEventListener
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    // Step 2: Render and unmount the hook
    const { unmount } = renderHook(() => useEscape(mockCallback));
    unmount();

    // Step 3: Verify event listener was added and then removed
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );

    // Step 4: Clean up spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  // Test 7: Updates callback when callback changes
  test('uses updated callback when callback changes', () => {
    // Step 1: Create two different callbacks
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    // Step 2: Render hook with first callback
    const { rerender } = renderHook(({ callback }) => useEscape(callback), {
      initialProps: { callback: firstCallback },
    });

    // Step 3: Press Escape with first callback
    const escapeEvent1 = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent1);

    // Step 4: Update to second callback
    rerender({ callback: secondCallback });

    // Step 5: Press Escape with second callback
    const escapeEvent2 = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent2);

    // Step 6: Verify both callbacks were called appropriately
    expect(firstCallback).toHaveBeenCalledTimes(1);
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  // Test 8: Can handle multiple Escape key presses
  test('handles multiple Escape key presses', () => {
    // Step 1: Render the hook
    renderHook(() => useEscape(mockCallback));

    // Step 2: Simulate multiple Escape key presses
    const escapeEvent1 = new KeyboardEvent('keydown', { key: 'Escape' });
    const escapeEvent2 = new KeyboardEvent('keydown', { key: 'Escape' });
    const escapeEvent3 = new KeyboardEvent('keydown', { key: 'Escape' });

    window.dispatchEvent(escapeEvent1);
    window.dispatchEvent(escapeEvent2);
    window.dispatchEvent(escapeEvent3);

    // Step 3: Verify callback was called for each press
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  // Test 9: Toggles enabled state correctly
  test('respects enabled state changes', () => {
    // Step 1: Start with enabled = true
    const { rerender } = renderHook(
      ({ enabled }) => useEscape(mockCallback, enabled),
      { initialProps: { enabled: true } }
    );

    // Step 2: Press Escape while enabled
    const escapeEvent1 = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent1);

    // Step 3: Disable the hook
    rerender({ enabled: false });

    // Step 4: Press Escape while disabled
    const escapeEvent2 = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent2);

    // Step 5: Re-enable the hook
    rerender({ enabled: true });

    // Step 6: Press Escape while re-enabled
    const escapeEvent3 = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent3);

    // Step 7: Verify callback was called only when enabled
    expect(mockCallback).toHaveBeenCalledTimes(2); // First and third press only
  });
});
