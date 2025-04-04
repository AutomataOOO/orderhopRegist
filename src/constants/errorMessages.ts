export const ERROR_MESSAGES = {
  PHONE: {
    REQUIRED: '전화번호를 입력해주세요',
    INVALID_FORMAT: '올바른 전화번호 형식이 아닙니다',
    INVALID_KR: '올바른 한국 전화번호 형식이 아닙니다 (예: 010-1234-5678)',
    INVALID_US: '올바른 미국 전화번호 형식이 아닙니다 (예: (123) 456-7890)',
    INVALID_JP: '올바른 일본 전화번호 형식이 아닙니다 (예: 03-1234-5678)',
  },
  NAME: {
    REQUIRED: '이름을 입력해주세요',
    MIN_LENGTH: '이름은 2글자 이상이어야 합니다',
    INVALID_CHARACTERS: '이름은 한글과 영문만 입력 가능합니다',
    MAX_LENGTH: '이름은 20자 이내로 입력해주세요',
    CONSECUTIVE_SPACES: '이름에 연속된 공백이 있습니다',
    LEADING_TRAILING_SPACES: '이름의 앞뒤에 공백이 있습니다',
  },
  TERMS: {
    REQUIRED: '필수 약관에 동의해주세요',
  },
  AUTH: {
    REGISTER_FAILED: '회원가입에 실패했습니다. 다시 시도해주세요.',
    NETWORK_ERROR: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  },
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type ErrorMessage = typeof ERROR_MESSAGES[ErrorMessageKey][keyof typeof ERROR_MESSAGES[ErrorMessageKey]]; 