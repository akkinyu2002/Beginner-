import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LessonSystem from '../components/LessonSystem';

jest.mock('../lib/api', () => ({
  fetchLesson: jest.fn(),
  fetchLessonBySlug: jest.fn(),
}));

const { fetchLesson, fetchLessonBySlug } = require('../lib/api');

beforeEach(() => {
  fetchLesson.mockResolvedValue({
    title: 'Python Variables and Print',
    simple: 'A variable is like a labeled box.',
    advanced: 'A variable binds a name to an object in memory.',
    code: 'name = "Asha"\nage = 10\nprint(name)\nprint(age)',
    explanation: 'Lesson explanation.',
    lineExplanations: [
      'Line 1: Create a variable called name and store the text "Asha".',
      'Line 2: Create a variable called age and store the number 10.',
      'Line 3: Print the value stored in name.',
      'Line 4: Print the value stored in age.',
    ],
  });

  fetchLessonBySlug.mockResolvedValue({
    title: 'Python For Loops',
    simple: 'A loop repeats steps.',
    advanced: 'A for loop iterates over a sequence.',
    code: 'for i in range(1, 6):\n    print(i)',
    explanation: 'Loop lesson explanation.',
    lineExplanations: ['Line 1: Start loop.', 'Line 2: Print each value.'],
  });
});

describe('LessonSystem', () => {
  it('shows simple mode by default and toggles to advanced mode', async () => {
    render(<LessonSystem />);

    expect(await screen.findByText(/labeled box/i)).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', {
      name: /switch to advanced mode/i,
    });

    await userEvent.click(toggleButton);

    expect(screen.getByText(/binds a name to an object in memory/i)).toBeInTheDocument();
  });

  it('renders per-line logic explanation entries', async () => {
    render(<LessonSystem />);

    expect(await screen.findByText('name = "Asha"')).toBeInTheDocument();
    expect(screen.getByText(/Line 4: Print the value stored in age/i)).toBeInTheDocument();
  });

  it('loads lesson by slug when lessonSlug is provided', async () => {
    render(<LessonSystem lessonSlug="python-loops" />);

    expect(fetchLessonBySlug).toHaveBeenCalledWith('python-loops');
    expect(await screen.findByText(/python for loops/i)).toBeInTheDocument();
  });
});
