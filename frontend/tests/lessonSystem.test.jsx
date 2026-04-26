import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LessonSystem from '../components/LessonSystem';

describe('LessonSystem', () => {
  it('shows simple mode by default and toggles to advanced mode', async () => {
    render(<LessonSystem />);

    expect(screen.getByText(/labeled box/i)).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', {
      name: /switch to advanced mode/i,
    });

    await userEvent.click(toggleButton);

    expect(screen.getByText(/binds a name to an object in memory/i)).toBeInTheDocument();
  });

  it('renders per-line logic explanation entries', () => {
    render(<LessonSystem />);

    expect(screen.getByText('name = "Asha"')).toBeInTheDocument();
    expect(screen.getByText(/Line 4: Print the value stored in age/i)).toBeInTheDocument();
  });
});
