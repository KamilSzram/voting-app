import React from 'react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/react';

import { render, screen } from 'TestUtils';
import { NO_DATA_MESSAGE } from 'const';
import { candidates } from 'tests/mock';
import CandidatesTable from '.';

describe('CandidatesTable Component:', () => {
  describe('Displaying data', () => {
    it('should display no data message when there is no candidates', () => {
      render(<CandidatesTable candidates={[]} onAddItem={() => {}} />);

      const noDataMessage = screen.queryByText(NO_DATA_MESSAGE);

      expect(noDataMessage).toBeInTheDocument();
      expect(noDataMessage).toHaveTextContent(NO_DATA_MESSAGE);
    });

    it('should display all candidates', () => {
      render(<CandidatesTable candidates={candidates} onAddItem={() => {}} />);

      const tableBody = screen.getByTestId('candidatesTableBody');
      const rows = within(tableBody).getAllByRole('row');

      expect(rows.length).toBe(candidates.length);
    });

    it('should open form dialog when clicked on add icon', async () => {
      const user = userEvent.setup();
      render(<CandidatesTable candidates={candidates} onAddItem={() => {}} />);

      const addButton = screen.getByLabelText(/add/i);
      await user.click(addButton);

      const formDialog = screen.getByLabelText(/add candidate/i);

      expect(formDialog).toBeInTheDocument();
    });
  });
});
