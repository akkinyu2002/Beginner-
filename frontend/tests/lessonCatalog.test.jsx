import { render, screen } from '@testing-library/react';
import LessonCatalog from '../components/LessonCatalog';

jest.mock('../lib/api', () => ({
  fetchLessonCatalog: jest.fn(),
}));

const { fetchLessonCatalog } = require('../lib/api');

describe('LessonCatalog', () => {
  it('renders lesson cards from the catalog endpoint', async () => {
    fetchLessonCatalog.mockResolvedValueOnce([
      {
        id: 'python-intro',
        slug: 'python-intro',
        order: 1,
        title: 'Python Variables and Print',
        summary: 'A variable is like a labeled box.',
      },
      {
        id: 'python-loops',
        slug: 'python-loops',
        order: 3,
        title: 'Python For Loops',
        summary: 'A loop repeats steps.',
      },
    ]);

    render(<LessonCatalog />);

    expect(await screen.findByRole('link', { name: /python variables and print/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /python for loops/i })).toBeInTheDocument();
  });
});
