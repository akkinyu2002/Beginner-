import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

jest.mock('next/dynamic', () => () => {
  const MockDynamicComponent = () => null;
  return MockDynamicComponent;
});

describe('HomePage', () => {
  it('shows homepage heading and start learning CTA', () => {
    render(<HomePage />);

    expect(screen.getByText(/CodeFromZero/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Start Learning/i })).toBeInTheDocument();
  });
});
