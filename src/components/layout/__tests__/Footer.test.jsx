import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Footer from '../Footer';

// Mock React Router Link component
vi.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Verifies that the footer element is rendered correctly
  test('renders footer element', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  // Test 2: Verifies that the Terms of Use nav link is rendering
  test('renders Terms of Use link', () => {
    render(<Footer />);
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  });

  // Test 3: Verifies that the Privacy Policy nav link is rendering
  test('renders Privacy Policy link', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  // Test 4: Verifies that the About Us nav link is rendering
  test('renders About Us link', () => {
    render(<Footer />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  // Test 5: Verifies that the Contact Us nav link is rendering
  test('renders Contact Us link', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });
});
