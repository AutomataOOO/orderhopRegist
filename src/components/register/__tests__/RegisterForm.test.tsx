import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';
import { register } from '@/services/auth';
import '@testing-library/jest-dom';

// register 함수 모킹
jest.mock('@/services/auth', () => ({
  register: jest.fn(),
}));

// useRouter 모킹
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('RegisterForm', () => {
  const mockStoreName = '테스트 매장';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(<RegisterForm storeName={mockStoreName} />);

    // 매장명 필드 확인
    expect(screen.getByLabelText('매장명')).toHaveValue(mockStoreName);

    // 휴대폰 번호 필드 확인
    expect(screen.getByLabelText('휴대폰 번호')).toBeInTheDocument();

    // 이름 필드 확인
    expect(screen.getByLabelText('이름')).toBeInTheDocument();

    // 약관 동의 섹션 확인
    expect(screen.getByText('약관 동의')).toBeInTheDocument();

    // 가입하기 버튼 확인
    expect(screen.getByRole('button', { name: '가입하기' })).toBeInTheDocument();
  });

  it('validates phone number input', () => {
    render(<RegisterForm storeName={mockStoreName} />);

    const phoneInput = screen.getByLabelText('휴대폰 번호');

    // 잘못된 형식의 전화번호 입력
    fireEvent.change(phoneInput, { target: { name: 'phoneNumber', value: '123' } });
    expect(screen.getByText('올바른 전화번호 형식이 아닙니다')).toBeInTheDocument();

    // 올바른 형식의 전화번호 입력
    fireEvent.change(phoneInput, { target: { name: 'phoneNumber', value: '01012345678' } });
    expect(screen.queryByText('올바른 전화번호 형식이 아닙니다')).not.toBeInTheDocument();
  });

  it('validates name input', () => {
    render(<RegisterForm storeName={mockStoreName} />);

    const nameInput = screen.getByLabelText('이름');

    // 빈 이름 입력
    fireEvent.change(nameInput, { target: { name: 'name', value: '' } });
    fireEvent.blur(nameInput);
    expect(screen.getByText('이름을 입력해주세요')).toBeInTheDocument();

    // 올바른 이름 입력
    fireEvent.change(nameInput, { target: { name: 'name', value: '홍길동' } });
    expect(screen.queryByText('이름을 입력해주세요')).not.toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const mockRegister = register as jest.MockedFunction<typeof register>;
    mockRegister.mockResolvedValueOnce(undefined);

    render(<RegisterForm storeName={mockStoreName} />);

    // 폼 데이터 입력
    fireEvent.change(screen.getByLabelText('휴대폰 번호'), {
      target: { name: 'phoneNumber', value: '01012345678' },
    });
    fireEvent.change(screen.getByLabelText('이름'), {
      target: { name: 'name', value: '홍길동' },
    });

    // 필수 약관 동의
    const agreeAllButton = screen.getByRole('button', { name: '전체 동의' });
    fireEvent.click(agreeAllButton);

    // 폼 제출
    const submitButton = screen.getByRole('button', { name: '가입하기' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        phoneNumber: '01012345678',
        name: '홍길동',
        storeName: mockStoreName,
      });
    });
  });

  it('disables submit button when form is invalid', () => {
    render(<RegisterForm storeName={mockStoreName} />);

    const submitButton = screen.getByRole('button', { name: '가입하기' });
    expect(submitButton).toBeDisabled();

    // 필수 필드 입력
    fireEvent.change(screen.getByLabelText('휴대폰 번호'), {
      target: { name: 'phoneNumber', value: '01012345678' },
    });
    fireEvent.change(screen.getByLabelText('이름'), {
      target: { name: 'name', value: '홍길동' },
    });

    // 약관 동의 없이는 여전히 비활성화
    expect(submitButton).toBeDisabled();

    // 약관 동의 후 활성화
    const agreeAllButton = screen.getByRole('button', { name: '전체 동의' });
    fireEvent.click(agreeAllButton);
    expect(submitButton).toBeEnabled();
  });
}); 