import { useState, useCallback } from 'react';
import { RegisterFormData, FormErrors, RegisterRequestData } from '@/types/register';
import { validateField, validateForm, formatPhoneNumber } from '@/utils/formValidation';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { register } from '@/services/auth';
import { useRouter } from 'next/navigation';

export const useRegisterForm = (storeName: string) => {
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
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateFormFields()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData: RegisterRequestData = {
        phoneNumber: formData.phoneNumber.replace(/[^0-9]/g, ''),
        name: formData.name.trim(),
        storeName,
      };

      await register(requestData);
      router.push('/register/success');
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
        router.push(`/register/error?code=REGISTER_FAILED&message=${encodeURIComponent(error.message)}`);
      } else {
        setSubmitError(ERROR_MESSAGES.AUTH.REGISTER_FAILED);
        router.push(`/register/error?code=REGISTER_FAILED&message=${encodeURIComponent(ERROR_MESSAGES.AUTH.REGISTER_FAILED)}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, storeName, validateFormFields, router]);

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