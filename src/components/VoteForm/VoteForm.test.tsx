import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render, screen } from 'TestUtils';
import { voters, candidates } from 'tests/mock';
import VoteForm from '.';

describe('VoteForm Component:', () => {
  describe('Selecting menu items', () => {
    const notVoted = voters.filter(voter => !voter.hasVoted);

    it('should display all candidates when candidates select is clicked', async () => {
      const user = userEvent.setup();
      render(<VoteForm voters={notVoted} candidates={candidates} onVote={() => {}} />);

      const candidatesSelect = getCandidatesSelect();
      await user.click(candidatesSelect);

      candidates.forEach(candidate => expect(screen.getByText(candidate.name)).toBeInTheDocument());
    });

    it('should have disabled vote button when both voter and candidate are not selected', () => {
      render(<VoteForm voters={notVoted} candidates={candidates} onVote={() => {}} />);

      const button = screen.getByRole('button', { name: /vote!/i });

      expect(button).toBeDisabled();
    });

    it('should reset vote form when vote has been cast', async () => {
      const user = userEvent.setup();

      render(<VoteForm voters={notVoted} candidates={candidates} onVote={() => {}} />);

      const votersSelect = getVotersSelect();
      await user.click(votersSelect);

      const voter = screen.getByRole('option', { name: notVoted[0].name });
      await user.click(voter);

      const candidatesSelect = getCandidatesSelect();
      await user.click(candidatesSelect);

      const candidate = screen.getByRole('option', { name: candidates[0].name });
      await user.click(candidate);

      const button = screen.getByText(/vote!/i);
      await user.click(button);

      const votersSelectValue = screen.getByTestId('voters-select');
      const candidatesSelectValue = screen.getByTestId('candidates-select');

      await waitFor(() => {
        expect(votersSelectValue).toHaveValue('');
        expect(candidatesSelectValue).toHaveValue('');
        expect(button).toBeDisabled();
      });
    });
  });
});

const getVotersSelect = () => screen.getByLabelText(/i am/i);
const getCandidatesSelect = () => screen.getByLabelText(/i vote for/i);
