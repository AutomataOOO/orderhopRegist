import { RegisterFormData, FormErrors } from '@/types/register';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { COUNTRIES } from '@/constants/countries';

export function validatePhoneNumber(value: string, countryCode: string): string {
  if (!value) {
    return ERROR_MESSAGES.PHONE.REQUIRED;
  }

  const country = COUNTRIES[countryCode];
  if (!country.pattern.test(value)) {
    return ERROR_MESSAGES.PHONE.INVALID_FORMAT;
  }

  return '';
}

export const validateName = (value: string): string => {
  if (!value) return ERROR_MESSAGES.NAME.REQUIRED;
  
  // 앞뒤 공백 제거
  const trimmedValue = value.trim();
  if (!trimmedValue) return ERROR_MESSAGES.NAME.REQUIRED;
  
  // 연속된 공백 체크
  if (/\s{2,}/.test(trimmedValue)) return ERROR_MESSAGES.NAME.CONSECUTIVE_SPACES;
  
  // 앞뒤 공백이 있는 경우
  if (value !== trimmedValue) return ERROR_MESSAGES.NAME.LEADING_TRAILING_SPACES;
  
  if (trimmedValue.length < 2) return ERROR_MESSAGES.NAME.MIN_LENGTH;
  if (!/^[가-힣a-zA-Z\s]+$/.test(trimmedValue)) return ERROR_MESSAGES.NAME.INVALID_CHARACTERS;
  if (trimmedValue.length > 20) return ERROR_MESSAGES.NAME.MAX_LENGTH;
  return '';
};

export function formatPhoneNumber(value: string, countryCode: string): string {
  // 숫자만 추출
  const numbers = value.replace(/[^0-9]/g, '');
  
  const country = COUNTRIES[countryCode];
  
  switch (countryCode) {
    case 'KR':
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    
    case 'US':
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    
    case 'JP':
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    
    default:
      return numbers;
  }
}

export const validateField = (name: keyof RegisterFormData, value: string, countryCode: string): string => {
  if (name === 'phoneNumber') {
    return validatePhoneNumber(value, countryCode);
  }
  if (name === 'name') {
    return validateName(value);
  }
  return '';
};

export const validateForm = (formData: RegisterFormData): FormErrors => {
  const errors: FormErrors = {};
  
  const phoneError = validatePhoneNumber(formData.phoneNumber, formData.countryCode);
  if (phoneError) errors.phoneNumber = phoneError;
  
  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;
  
  return errors;
};

export const phoneFormats: Record<string, { placeholder: string; example: string }> = {
  '+82': { placeholder: '010-1234-5678', example: '010-1234-5678' },
  '+1': { placeholder: '(123) 456-7890', example: '(123) 456-7890' },
  '+81': { placeholder: '03-1234-5678', example: '03-1234-5678' },
};

export const defaultPhoneFormat = {
  placeholder: '010-1234-5678',
  example: '010-1234-5678',
}; 