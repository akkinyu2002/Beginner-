import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PracticePanel from '../components/PracticePanel';

jest.mock('../lib/api', () => ({
  validatePracticeCode: jest.fn(),
}));

const { validatePracticeCode } = require('../lib/api');

describe('PracticePanel', () => {
  it('shows success feedback when validator passes', async () => {
    validatePracticeCode.mockResolvedValueOnce({
      passed: true,
      feedback: 'Great job!',
    });

    render(<PracticePanel />);

    await userEvent.click(screen.getByRole('button', { name: /check answer/i }));

    expect(await screen.findByText('Great job!')).toBeInTheDocument();
  });
});
