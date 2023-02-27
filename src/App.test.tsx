import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { render, screen } from './TestUtils';
import { voters, candidates, fakeLocalStorage } from './tests/mock';

describe('App:', () => {
  describe('Voting', () => {
    beforeAll(() => {
      Object.defineProperty(window, 'localStorage', {
        value: fakeLocalStorage,
      });
    });

    beforeEach(() => {
      window.localStorage.setItem('voters', JSON.stringify(voters));
      window.localStorage.setItem('candidates', JSON.stringify(candidates));
    });

    it('should add candidate with votes set to 0 when add form was submitted', async () => {
      const user = userEvent.setup();
      const candidateName = 'Test Candidate';

      render(<App />);

      const candidatesTableHeading = screen.getByRole('row', { name: /candidates/i });
      const addButton = within(candidatesTableHeading).getByRole('button', { name: /add/i });
      await user.click(addButton);

      const textbox = screen.getByRole('textbox', {
        name: /name/i,
      });
      await user.type(textbox, candidateName);

      const submitButton = screen.getByRole('button', { name: /add/i });
      await user.click(submitButton);

      const addedRow = await screen.getByRole('row', { name: /Test Candidate/ });
      const addedRowCells = within(addedRow).getAllByRole('cell');

      expect(addedRowCells[0]).toHaveTextContent(candidateName);
      expect(addedRowCells[1]).toHaveTextContent('0');
    });

    it('should add voter with has voted set to no when add form was submitted', async () => {
      const user = userEvent.setup();
      const voterName = 'Test Voter';

      render(<App />);

      const votersTableHeading = screen.getByRole('row', { name: /voters/i });
      const addButton = within(votersTableHeading).getByRole('button', { name: /add/i });
      await user.click(addButton);

      const textbox = screen.getByRole('textbox', {
        name: /name/i,
      });
      await user.type(textbox, voterName);

      const submitButton = screen.getByRole('button', { name: /add/i });
      await user.click(submitButton);

      const addedRow = await screen.getByRole('row', { name: /Test Voter/ });
      const addedRowCells = within(addedRow).getAllByRole('cell');

      expect(addedRowCells[0]).toHaveTextContent(voterName);
      expect(addedRowCells[1]).toHaveAccessibleName(/no/i);
    });

    it('should have updated values in table when vote was casted', async () => {
      const user = userEvent.setup();
      const notVoted = voters.filter(voter => !voter.hasVoted);

      const candidateToSelect = candidates[0];
      const voterToSelect = notVoted[0];

      render(<App />);

      const votersSelect = getVotersSelect();
      await user.click(votersSelect);

      const voter = screen.getByRole('option', { name: voterToSelect.name });
      await user.click(voter);

      const candidatesSelect = getCandidatesSelect();
      await user.click(candidatesSelect);

      const candidate = screen.getByRole('option', { name: candidateToSelect.name });
      await user.click(candidate);

      const button = screen.getByText(/vote!/i);
      await user.click(button);

      const updatedCandidateRow = getCandidateFromTable(candidateToSelect.name);
      const updatedCandidateCells = within(updatedCandidateRow).getAllByRole('cell');

      const updatedVoterRow = getVoterFromTable(voterToSelect.name);
      const updatedVoterCells = within(updatedVoterRow).getAllByRole('cell');

      const expectedVotesNumber = candidates[0].votes + 1;

      expect(updatedCandidateCells[1]).toHaveTextContent(expectedVotesNumber.toString());
      expect(updatedVoterCells[1]).toHaveAccessibleName(/yes/i);
    });
  });
});

const getCandidateFromTable = (candidateName: string) => {
  const tableBody = screen.getByTestId('candidatesTableBody');
  const rows = within(tableBody).getAllByRole('row');
  const row = rows.find(row => within(row).getByText(candidateName));

  if (typeof row === 'undefined') {
    throw Error(`Unable to find candidate row with name ${candidateName}`);
  }

  return row;
};

const getVoterFromTable = (voterName: string) => {
  const tableBody = screen.getByTestId('votersTableBody');
  const rows = within(tableBody).getAllByRole('row');
  const row = rows.find(row => within(row).getByText(voterName));

  if (typeof row === 'undefined') {
    throw Error(`Unable to find voter row with name ${voterName}`);
  }

  return row;
};

const getVotersSelect = () => screen.getByLabelText(/i am/i);
const getCandidatesSelect = () => screen.getByLabelText(/i vote for/i);
