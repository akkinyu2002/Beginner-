import { render, screen } from '@testing-library/react';
import LessonPage from '../app/lesson/page';

jest.mock('../components/LessonSystem', () => {
  const MockLessonSystem = () => <div>Lesson System Component</div>;
  return MockLessonSystem;
});

jest.mock('../components/LessonCatalog', () => {
  const MockLessonCatalog = () => <div>Lesson Catalog Component</div>;
  return MockLessonCatalog;
});

describe('LessonPage', () => {
  it('renders roadmap heading, catalog, and lesson system', () => {
    render(<LessonPage />);

    expect(screen.getByRole('heading', { name: /python learning roadmap/i })).toBeInTheDocument();
    expect(screen.getByText(/lesson catalog component/i)).toBeInTheDocument();
    expect(screen.getByText(/lesson system component/i)).toBeInTheDocument();
  });
});
