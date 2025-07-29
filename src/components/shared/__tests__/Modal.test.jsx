import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';
import { vi } from 'vitest';

describe('Modal', () => {
  // Reusable constants for tests
  const mockOnClose = vi.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div data-testid="modal-content">Test Modal Content</div>,
  };

  // Clear the mocks before each next test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifies that modal renders when isOpen is true
  test('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  // Test 2: Verifies that modal does not render when isOpen is false
  test('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  // Test 3: Verifies that the close button renders correctly
  test('renders close button', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  // Test 4: Verifies that pressing Escape key calls OnClose
  test('pressing Escape key calls onClose', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  /* Test 5: Verifies that pressing escape key does not call onClose
     when modal is closed */
  test('pressing Escape when modal is closed does not call onClose', () => {
    render(<Modal {...defaultProps} isOpen={false} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  // Test 6: Verifies that clicking close button calls onClose
  test('clicking close button calls onClose', () => {
    render(<Modal {...defaultProps} />);

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // Test 7: Verifies that clicking outside modal (overlay) calls onClose
  test('clicking outside modal calls onClose', () => {
    render(<Modal {...defaultProps} />);

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // Test 8: Verifies that clicking inside modal (overlay) does not call onClose
  test('clicking inside modal content does not call onClose', () => {
    render(<Modal {...defaultProps} />);

    const modalContent = screen.getByTestId('modal-content');
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
