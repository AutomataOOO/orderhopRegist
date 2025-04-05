import { useState, useCallback } from 'react';
import { RegisterFormData, FormErrors, RegisterRequestData } from '@/types/register';
import { validateField, validateForm, formatPhoneNumber } from '@/utils/formValidation';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { register } from '@/services/auth';
import { useRouter } from 'next/navigation';

export const useRegisterForm = (storeName: string, storeId: string, brandId: string) => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    phoneNumber: '',
    name: '',
    countryCode: 'KR',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateInput = useCallback((name: keyof RegisterFormData, value: string) => {
    const error = validateField(name, value, formData.countryCode);
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  }, [formData.countryCode]);

  const handleInputChange = useCallback((name: keyof RegisterFormData, value: string) => {
    let formattedValue = value;
    
    if (name === 'phoneNumber') {
      formattedValue = formatPhoneNumber(value, formData.countryCode);
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    validateInput(name, formattedValue);
    setSubmitError(null);
  }, [formData.countryCode, validateInput]);

  const handleBlur = useCallback((name: keyof RegisterFormData) => {
    validateInput(name, formData[name]);
  }, [formData, validateInput]);

  const handlePhoneNumberChange = useCallback((value: string) => {
    const formattedValue = formatPhoneNumber(value, formData.countryCode);
    handleInputChange('phoneNumber', formattedValue);
  }, [formData.countryCode, handleInputChange]);

  const handleCountryCodeChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
    if (formData.phoneNumber) {
      const formattedValue = formatPhoneNumber(formData.phoneNumber, value);
      handleInputChange('phoneNumber', formattedValue);
    }
  }, [formData.phoneNumber, handleInputChange]);

  const validateFormFields = useCallback(() => {
    console.log('=== validateFormFields 시작 ===');
    const newErrors = validateForm(formData);
    console.log('폼 데이터:', formData);
    console.log('검증 결과:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('유효성 검사 결과:', isValid);
    return isValid;
  }, [formData]);

  const formatPhoneNumberForApi = useCallback((phoneNumber: string) => {
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // For Korean numbers, add +82 prefix
    if (formData.countryCode === 'KR') {
      // Remove leading 0 and add +82
      return `+82${digits.slice(1)}`;
    }
    
    // For other countries, add appropriate prefix
    // This can be expanded based on country code
    return `+${digits}`;
  }, [formData.countryCode]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    console.log('=== handleSubmit 시작 ===');
    e.preventDefault();
    setSubmitError(null);

    console.log('폼 유효성 검사 시작');
    const isValid = validateFormFields();
    console.log('폼 유효성 검사 결과:', isValid);

    if (!isValid) {
      console.log('폼 유효성 검사 실패');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('API 요청 데이터 준비');
      const requestData: RegisterRequestData = {
        phone_number: formatPhoneNumberForApi(formData.phoneNumber),
        name: formData.name.trim(),
        store_name: storeName,
        store_id: storeId,
        brand_id: brandId,
      };
      console.log('API 요청 데이터:', requestData);

      console.log('API 호출 시작');
      await register(requestData);
      console.log('API 호출 성공');

      console.log('성공 페이지로 이동');
      router.push('/register/success');
    } catch (error) {
      console.error('API 호출 실패:', error);
      if (error instanceof Error) {
        setSubmitError(error.message);
        console.log('에러 페이지로 이동:', error.message);
        router.push(`/register/error?code=REGISTER_FAILED&message=${encodeURIComponent(error.message)}`);
      } else {
        setSubmitError(ERROR_MESSAGES.AUTH.REGISTER_FAILED);
        console.log('기본 에러 페이지로 이동');
        router.push(`/register/error?code=REGISTER_FAILED&message=${encodeURIComponent(ERROR_MESSAGES.AUTH.REGISTER_FAILED)}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, storeName, validateFormFields, router, storeId, brandId, formatPhoneNumberForApi]);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleInputChange,
    handleBlur,
    handlePhoneNumberChange,
    handleCountryCodeChange,
    handleSubmit,
  };
}; 