import { render, screen } from '@testing-library/react';
import LessonDetailPage from '../app/lesson/[slug]/page';

jest.mock('../components/LessonSystem', () => {
  const MockLessonSystem = ({ lessonSlug }) => <div>Lesson System {lessonSlug}</div>;
  return MockLessonSystem;
});

describe('LessonDetailPage', () => {
  it('passes slug to LessonSystem', () => {
    render(<LessonDetailPage params={{ slug: 'python-conditions' }} />);

    expect(screen.getByText(/lesson system python-conditions/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to roadmap/i })).toBeInTheDocument();
  });
});
