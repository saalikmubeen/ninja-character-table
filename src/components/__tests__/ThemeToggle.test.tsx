import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../ThemeToggle';
import * as useThemeHook from '../../hooks/useTheme';
import { vi } from 'vitest';

// Mock the useTheme hook
vi.mock('../../hooks/useTheme');
const mockUseTheme = useThemeHook.useTheme as unknown as ReturnType<typeof vi.fn>;

describe('ThemeToggle', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders moon icon in light mode', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');

    // Check for moon icon (SVG should be present)
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders sun icon in dark mode', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');

    // Check for sun icon (SVG should be present)
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', async () => {
    const user = userEvent.setup();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('has proper styling classes', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'p-2',
      'rounded-lg',
      'bg-gray-200',
      'hover:bg-gray-300',
      'dark:bg-gray-700',
      'dark:hover:bg-gray-600',
      'transition-colors'
    );
  });

  it('updates aria-label based on current theme', () => {
    const { rerender } = render(<ThemeToggle />);

    // Test light mode
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    rerender(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');

    // Test dark mode
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    rerender(<ThemeToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('handles keyboard interaction', async () => {
    const user = userEvent.setup();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.tab();

    expect(button).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(mockToggleTheme).toHaveBeenCalledTimes(2);
  });
});