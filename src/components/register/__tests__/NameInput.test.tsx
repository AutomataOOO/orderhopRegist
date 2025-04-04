import { render, screen, fireEvent } from '@testing-library/react';
import { NameInput } from '../NameInput';
import '@testing-library/jest-dom';

describe('NameInput', () => {
  const mockProps = {
    value: '',
    error: undefined,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders name input with label', () => {
    render(<NameInput {...mockProps} />);

    // 라벨 확인
    expect(screen.getByLabelText('이름')).toBeInTheDocument();

    // 입력 필드 확인
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', '홍길동');
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = '이름을 입력해주세요';
    render(<NameInput {...mockProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<NameInput {...mockProps} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '홍길동' } });
    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', () => {
    render(<NameInput {...mockProps} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input);
    expect(mockProps.onBlur).toHaveBeenCalled();
  });

  it('applies error styles when error is present', () => {
    render(<NameInput {...mockProps} error="Error message" />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('border-red-500');
  });
}); 