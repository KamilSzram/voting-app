import userEvent from '@testing-library/user-event';

import { render, screen } from 'TestUtils';
import FormDialog from '.';

describe('FormDialog Component:', () => {
  describe('Selecting menu items', () => {
    it('should have disabled submit button when form is not valid', async () => {
      render(<FormDialog title="Add Voter" onClose={() => {}} onSubmit={() => {}} />);

      const button = screen.getByRole('button', { name: /add/i });

      expect(button).toBeDisabled();
    });

    it('should display validation error when input is not valid', async () => {
      const user = userEvent.setup();

      render(<FormDialog title="Add Voter" onClose={() => {}} onSubmit={() => {}} />);

      const textbox = screen.getByRole('textbox', {
        name: /name/i,
      });
      await user.type(textbox, 'error because of too long text');

      const button = screen.getByRole('button', { name: /add/i });

      expect(button).toBeDisabled();
      expect(textbox).toHaveErrorMessage('Name must have a maximum of 15 characters');
    });
  });
});
