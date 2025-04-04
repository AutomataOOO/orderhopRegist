import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneNumberInput } from '../PhoneNumberInput';
import '@testing-library/jest-dom';

describe('PhoneNumberInput', () => {
  const mockProps = {
    value: '',
    countryCode: '+82',
    error: undefined,
    onChange: jest.fn(),
    onCountryCodeChange: jest.fn(),
    onBlur: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders phone number input with country code selector', () => {
    render(<PhoneNumberInput {...mockProps} />);

    // 라벨 확인
    expect(screen.getByLabelText('휴대폰 번호')).toBeInTheDocument();

    // 국가 코드 선택 버튼 확인
    const countryCodeButton = screen.getByRole('button');
    expect(countryCodeButton).toHaveTextContent('🇰🇷');
    expect(countryCodeButton).toHaveTextContent('+82');

    // 전화번호 입력 필드 확인
    const phoneInput = screen.getByRole('textbox');
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = '올바른 휴대폰 번호를 입력해주세요';
    render(<PhoneNumberInput {...mockProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls onChange when phone number is entered', () => {
    render(<PhoneNumberInput {...mockProps} />);
    const phoneInput = screen.getByRole('textbox');

    fireEvent.change(phoneInput, { target: { value: '01012345678' } });
    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur when phone input loses focus', () => {
    render(<PhoneNumberInput {...mockProps} />);
    const phoneInput = screen.getByRole('textbox');

    fireEvent.blur(phoneInput);
    expect(mockProps.onBlur).toHaveBeenCalled();
  });

  it('opens country code list when country code button is clicked', () => {
    render(<PhoneNumberInput {...mockProps} />);
    const countryCodeButton = screen.getByRole('button');

    fireEvent.click(countryCodeButton);
    expect(screen.getByText('🇯🇵')).toBeInTheDocument();
    expect(screen.getByText('+81')).toBeInTheDocument();
  });

  it('calls onCountryCodeChange when a country code is selected', () => {
    render(<PhoneNumberInput {...mockProps} />);
    const countryCodeButton = screen.getByRole('button');

    // 국가 코드 목록 열기
    fireEvent.click(countryCodeButton);

    // 일본 국가 코드 선택
    const japanOption = screen.getByText('🇯🇵');
    fireEvent.click(japanOption);

    expect(mockProps.onCountryCodeChange).toHaveBeenCalledWith('+81');
  });
}); 