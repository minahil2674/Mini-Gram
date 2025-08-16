// src/tests/Button.test.jsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/ui/Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies disabled style when disabled', () => {
    render(<Button disabled={true}>Disabled</Button>);
    const buttonElement = screen.getByText('Disabled');
    expect(buttonElement).toBeDisabled();
  });
});
