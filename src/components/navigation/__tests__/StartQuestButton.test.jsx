import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StartQuestButton from '../StartQuestButton';
import { vi } from 'vitest';

// Mock React Router's useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('StartQuestButton', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  // Test 1: Verifies that the button renders with correct text
  test('renders with correct text', () => {
    render(
      <MemoryRouter>
        <StartQuestButton />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Start Your TrashQuest Now! 🚀')
    ).toBeInTheDocument();
  });

  // Test 2: Verifies that the button is actually a button element
  test('renders as button element', () => {
    render(
      <MemoryRouter>
        <StartQuestButton />
      </MemoryRouter>
    );

    const button = screen.getByText('Start Your TrashQuest Now! 🚀');
    expect(button.tagName).toBe('BUTTON');
  });
});
