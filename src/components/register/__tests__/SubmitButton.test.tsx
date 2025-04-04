import { render, screen, fireEvent } from '@testing-library/react';
import { SubmitButton } from '../SubmitButton';
import '@testing-library/jest-dom';

describe('SubmitButton', () => {
  const mockProps = {
    isDisabled: false,
    isLoading: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders submit button with correct text', () => {
    render(<SubmitButton {...mockProps} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('가입하기');
  });

  it('displays loading text when isLoading is true', () => {
    render(<SubmitButton {...mockProps} isLoading={true} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('가입 중...');
  });

  it('calls onClick when button is clicked', () => {
    render(<SubmitButton {...mockProps} />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it('is disabled when isDisabled is true', () => {
    render(<SubmitButton {...mockProps} isDisabled={true} />);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });

  it('has correct disabled styles when disabled', () => {
    render(<SubmitButton {...mockProps} isDisabled={true} />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('disabled:cursor-not-allowed');
    expect(button).toHaveClass('disabled:opacity-50');
  });
}); 