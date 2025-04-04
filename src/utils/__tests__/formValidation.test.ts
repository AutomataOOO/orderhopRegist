import {
  validatePhoneNumber,
  validateName,
  formatPhoneNumber,
  validateField,
  validateForm,
  phoneFormats,
  defaultPhoneFormat,
} from '../formValidation';

describe('formValidation', () => {
  describe('validatePhoneNumber', () => {
    it('should validate Korean phone numbers correctly', () => {
      expect(validatePhoneNumber('01012345678', 'KR')).toBe('');
      expect(validatePhoneNumber('010-1234-5678', 'KR')).toBe('');
      expect(validatePhoneNumber('02-123-4567', 'KR')).toBe('');
      expect(validatePhoneNumber('031-123-4567', 'KR')).toBe('');
      expect(validatePhoneNumber('123', 'KR')).toBe('올바른 전화번호 형식이 아닙니다');
    });

    it('should validate US phone numbers correctly', () => {
      expect(validatePhoneNumber('1234567890', 'US')).toBe('');
      expect(validatePhoneNumber('(123) 456-7890', 'US')).toBe('');
      expect(validatePhoneNumber('123-456-7890', 'US')).toBe('');
      expect(validatePhoneNumber('123', 'US')).toBe('올바른 전화번호 형식이 아닙니다');
    });

    it('should validate Japanese phone numbers correctly', () => {
      expect(validatePhoneNumber('0312345678', 'JP')).toBe('');
      expect(validatePhoneNumber('03-1234-5678', 'JP')).toBe('');
      expect(validatePhoneNumber('09012345678', 'JP')).toBe('');
      expect(validatePhoneNumber('123', 'JP')).toBe('올바른 전화번호 형식이 아닙니다');
    });

    it('should handle empty input', () => {
      expect(validatePhoneNumber('', 'KR')).toBe('전화번호를 입력해주세요');
    });
  });

  describe('validateName', () => {
    it('should validate names correctly', () => {
      expect(validateName('홍길동')).toBe('');
      expect(validateName('John Doe')).toBe('');
      expect(validateName('')).toBe('이름을 입력해주세요');
      expect(validateName('a')).toBe('이름은 2글자 이상이어야 합니다');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format Korean phone numbers correctly', () => {
      expect(formatPhoneNumber('01012345678', 'KR')).toBe('010-1234-5678');
      expect(formatPhoneNumber('021234567', 'KR')).toBe('02-123-4567');
      expect(formatPhoneNumber('0312345678', 'KR')).toBe('031-234-5678');
    });

    it('should format US phone numbers correctly', () => {
      expect(formatPhoneNumber('1234567890', 'US')).toBe('(123) 456-7890');
    });

    it('should format Japanese phone numbers correctly', () => {
      expect(formatPhoneNumber('0312345678', 'JP')).toBe('03-1234-5678');
      expect(formatPhoneNumber('09012345678', 'JP')).toBe('090-1234-5678');
    });

    it('should handle partial input', () => {
      expect(formatPhoneNumber('010', 'KR')).toBe('010');
      expect(formatPhoneNumber('0101', 'KR')).toBe('010-1');
      expect(formatPhoneNumber('01012', 'KR')).toBe('010-12');
    });
  });

  describe('validateField', () => {
    it('should validate phone number field', () => {
      expect(validateField('phoneNumber', '01012345678', 'KR')).toBe('');
      expect(validateField('phoneNumber', '123', 'KR')).toBe('올바른 전화번호 형식이 아닙니다');
    });

    it('should validate name field', () => {
      expect(validateField('name', '홍길동', 'KR')).toBe('');
      expect(validateField('name', '', 'KR')).toBe('이름을 입력해주세요');
    });
  });

  describe('validateForm', () => {
    it('should validate complete form data', () => {
      const formData = {
        phoneNumber: '01012345678',
        name: '홍길동',
        countryCode: 'KR',
      };
      expect(validateForm(formData)).toEqual({});
    });

    it('should return errors for invalid form data', () => {
      const formData = {
        phoneNumber: '123',
        name: '',
        countryCode: 'KR',
      };
      expect(validateForm(formData)).toEqual({
        phoneNumber: '올바른 전화번호 형식이 아닙니다',
        name: '이름을 입력해주세요',
      });
    });
  });

  describe('phoneFormats', () => {
    it('should have correct format for each country', () => {
      expect(phoneFormats['+82'].placeholder).toBe('010-1234-5678');
      expect(phoneFormats['+1'].placeholder).toBe('(123) 456-7890');
      expect(phoneFormats['+81'].placeholder).toBe('03-1234-5678');
    });
  });

  describe('defaultPhoneFormat', () => {
    it('should have correct default format', () => {
      expect(defaultPhoneFormat.placeholder).toBe('010-1234-5678');
      expect(defaultPhoneFormat.example).toBe('010-1234-5678');
    });
  });
}); 