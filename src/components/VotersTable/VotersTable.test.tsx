import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';

import { render, screen } from 'TestUtils';
import { NO_DATA_MESSAGE } from 'const';
import { voters } from 'tests/mock';
import VotersTable from '.';

describe('VotersTable Component:', () => {
  describe('Displaying data', () => {
    it('should display no data message when there is no voters', () => {
      render(<VotersTable voters={[]} onAddItem={() => {}} />);

      const noDataMessage = screen.queryByText(NO_DATA_MESSAGE);

      expect(noDataMessage).toBeInTheDocument();
      expect(noDataMessage).toHaveTextContent(NO_DATA_MESSAGE);
    });

    it('should display all voters', () => {
      render(<VotersTable voters={voters} onAddItem={() => {}} />);

      const tableBody = screen.getByTestId('votersTableBody');
      const rows = within(tableBody).getAllByRole('row');

      expect(rows.length).toBe(voters.length);
    });

    it('should display correct vote indicator', () => {
      render(<VotersTable voters={voters} onAddItem={() => {}} />);

      const tableBody = screen.getByTestId('votersTableBody');
      const rows = within(tableBody).getAllByRole('row');

      rows.forEach((row, index) => {
        const cells = within(row).getAllByRole('cell');
        expect(cells[0]).toHaveTextContent(voters[index].name);
        expect(cells[1]).toHaveAccessibleName(voters[index].hasVoted ? 'yes' : 'no');
      });
    });

    it('should open form dialog when clicked on add icon', async () => {
      const user = userEvent.setup();
      render(<VotersTable voters={voters} onAddItem={() => {}} />);

      const addButton = screen.getByLabelText(/add/i);
      await user.click(addButton);

      const formDialog = screen.getByLabelText(/add voter/i);

      expect(formDialog).toBeInTheDocument();
    });
  });
});
