import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

jest.mock('next/dynamic', () => () => {
  const MockDynamicComponent = () => null;
  return MockDynamicComponent;
});

jest.mock('../components/LessonSystem', () => {
  const MockLessonSystem = () => <div>Lesson System</div>;
  return MockLessonSystem;
});

jest.mock('../components/PracticePanel', () => {
  const MockPracticePanel = () => <div>Practice Panel</div>;
  return MockPracticePanel;
});

describe('HomePage', () => {
  it('shows homepage heading and start learning CTA', () => {
    render(<HomePage />);

    expect(screen.getByText(/CodeFromZero/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start Learning/i })).toBeInTheDocument();
  });
});
