import { render, screen } from '@testing-library/react';
import LessonPage from '../app/lesson/page';

jest.mock('../components/LessonSystem', () => {
  const MockLessonSystem = () => <div>Lesson System Component</div>;
  return MockLessonSystem;
});

describe('LessonPage', () => {
  it('renders lesson page heading and lesson system', () => {
    render(<LessonPage />);

    expect(screen.getByRole('heading', { name: /basic python lesson/i })).toBeInTheDocument();
    expect(screen.getByText(/lesson system component/i)).toBeInTheDocument();
  });
});
