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

  // Test 1: Verifies that the footer element is rendering correctly
  test('footer element renders', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  // Test 2: Verifies that nav element is rendering
  test('nav element renders', () => {
    render(<Footer />);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  // Test 3: Verifies that the Terms of Use nav link is rendering
  test('terms of use link renders', () => {
    render(<Footer />);
    expect(screen.getByText('Terms of Use')).toBeInTheDocument();
  });

  // Test 4: Verifies that Terms of Use Nav link has correct href attribute
  test('terms of use nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('Terms of Use').closest('a')).toHaveAttribute(
      'href',
      '/terms'
    );
  });

  // Test 5: Verifies that the nav element contains the terms of use link element
  test('terms of use nav link is inside nav element', () => {
    render(<Footer />);
    const navElement = screen.getByRole('navigation');
    const termsLink = screen.getByText('Terms of Use');

    expect(navElement).toContainElement(termsLink);
  });

  // Test 6: Verifies that the Privacy Policy nav link is rendering
  test('privacy policy link renders', () => {
    render(<Footer />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  // Test 7: Verifies that Privacy Policy Nav link has correct href attribute
  test('privacy policy nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('Privacy Policy').closest('a')).toHaveAttribute(
      'href',
      '/privacy'
    );
  });

  // Test 8: Verifies that the nav element contains the Privacy Policy link element
  test('privacy policy nav link is inside nav element', () => {
    render(<Footer />);
    const navElement = screen.getByRole('navigation');
    const policyLink = screen.getByText('Privacy Policy');

    expect(navElement).toContainElement(policyLink);
  });

  // Test 9: Verifies that the About Us nav link is rendering
  test('about us link renders', () => {
    render(<Footer />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  // Test 10: Verifies that About Us Nav link has correct href attribute
  test('about us nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('About Us').closest('a')).toHaveAttribute(
      'href',
      '/about'
    );
  });

  // Test 11: Verifies that the nav element contains the About Us link element
  test('about us nav link is inside nav element', () => {
    render(<Footer />);
    const navElement = screen.getByRole('navigation');
    const aboutLink = screen.getByText('About Us');

    expect(navElement).toContainElement(aboutLink);
  });

  // Test 12: Verifies that the Contact Us nav link is rendering
  test('contact us link renders', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  // Test 13: Verifies that Contact Us nav link has correct href attribute
  test('contact us nav link has correct href attribute', () => {
    render(<Footer />);

    expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute(
      'href',
      '/contact'
    );
  });

  // Test 14: Verifies that the nav element contains the Contact Us link element
  test('privacy policy nav link is inside nav element', () => {
    render(<Footer />);
    const navElement = screen.getByRole('navigation');
    const contactLink = screen.getByText('Contact Us');

    expect(navElement).toContainElement(contactLink);
  });

  // Test 15: Verifies that the Footer tagline text renders
  test('trashquest tagline text renders', () => {
    render(<Footer />);

    expect(
      screen.getByText(/Made for the Ultimate Quest: The Planet🌎/)
    ).toBeInTheDocument();
  });

  // Test 16: Verifies that the copyright text renders
  test('copyright text renders', () => {
    render(<Footer />);

    expect(screen.getByText(/TrashQuest/)).toBeInTheDocument();
  });

  // Test 17: Verifies that the first copyright year (2025) renders
  test('displays first copyright year (2025) in copyright', () => {
    render(<Footer />);

    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  // Test 18: Verifies that the current year is displayed in copyright
  test('displays current year in copyright', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);

    expect(
      screen.getByText(new RegExp(currentYear.toString()))
    ).toBeInTheDocument();
  });
});
