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
  test('terms of use link renders', () => {
    render(<Footer />);
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  });

  // Test 3: Verifies that Terms of Use Nav link has correct href attribute
  test('terms of use nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('Terms of Use').closest('a')).toHaveAttribute(
      'href',
      '/terms'
    );
  });

  // Test 4: Verifies that the Privacy Policy nav link is rendering
  test('privacy policy link renders', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  // Test 5: Verifies that Privacy Policy Nav link has correct href attribute
  test('privacy policy nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('Privacy Policy').closest('a')).toHaveAttribute(
      'href',
      '/privacy'
    );
  });

  // Test 6: Verifies that the About Us nav link is rendering
  test('about us link renders', () => {
    render(<Footer />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  // Test 7: Verifies that About Us Nav link has correct href attribute
  test('about us nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('About Us').closest('a')).toHaveAttribute(
      'href',
      '/about'
    );
  });

  // Test 8: Verifies that the Contact Us nav link is rendering
  test('contact us link renders', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  // Test 9: Verifies that Privacy Policy Nav link has correct href attribute
  test('contact us nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute(
      'href',
      '/contact'
    );
  });
});
