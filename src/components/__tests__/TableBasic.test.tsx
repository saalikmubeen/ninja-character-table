import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { DataTable } from '../DataTable';
import * as dataGenerator from '../../utils/dataGenerator';

vi.mock('../../utils/dataGenerator');

describe('Table basic flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    (dataGenerator.generateCharacters as any).mockReturnValue([
      { id: '1', name: 'Naruto Uzumaki', location: 'Konoha', health: 'Healthy', power: 9000, isViewed: false },
      { id: '2', name: 'Gaara', location: 'Suna', health: 'Critical', power: 7000, isViewed: false },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('types in search, selects a row and logs selected IDs on submit', async () => {
    const user = userEvent.setup();
    render(<DataTable />);

    await waitFor(() => {
      expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search by name or location...');
    await user.type(searchInput, 'Naruto');

    await waitFor(() => {
      expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
      expect(screen.queryByText('Gaara')).not.toBeInTheDocument();
    });

    // Select the visible row
    const checkboxes = screen.getAllByRole('checkbox');
    // index 0 is the select-all checkbox
    await user.click(checkboxes[1]);

    // Click Submit button
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Selected IDs:', ['1']);
  });
});

