import React, { useMemo, useEffect } from 'react';
import { TermsModal } from '@/components/TermsModal';
import { TermsSection } from './TermsSection';
import { PhoneNumberInput } from './PhoneNumberInput';
import { SubmitButton } from './SubmitButton';
import { NameInput } from './NameInput';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useTermsAgreement } from '@/hooks/useTermsAgreement';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useCallback } from 'react';
import { FormEvent } from 'react';
import { PromoSection } from './PromoSection';
import { Footer } from '@/components/layout/Footer';

interface RegisterFormProps {
  storeName: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ storeName }) => {
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleInputChange,
    handleBlur,
    handlePhoneNumberChange,
    handleCountryCodeChange,
    handleSubmit,
  } = useRegisterForm(storeName);

  const {
    agreements,
    isAgreed,
    selectedTerm,
    handleAgreementChange,
    handleAgreeAll,
    handleViewTerm,
    handleCloseTerm,
  } = useTermsAgreement();

  useScrollLock(!!selectedTerm);

  const isFormValid = useMemo(() => {
    // 모든 필수 필드가 입력되었는지 확인
    const hasRequiredFields = formData.phoneNumber.trim() !== '' && formData.name.trim() !== '';
    
    // 에러가 있는지 확인 (빈 문자열은 에러가 아님)
    const hasErrors = Object.values(errors).some(error => error !== '');
    
    // 디버깅을 위한 로그
    console.log('Form Validation Debug:', {
      phoneNumber: formData.phoneNumber,
      name: formData.name,
      hasRequiredFields,
      errors,
      hasErrors,
      isAgreed,
    });
    
    // 에러가 없고, 필수 약관이 동의되었으며, 필수 필드가 모두 입력되었는지 확인
    return !hasErrors && isAgreed && hasRequiredFields;
  }, [errors, isAgreed, formData.phoneNumber, formData.name]);

  // 디버깅을 위한 useEffect
  useEffect(() => {
    console.log('Form State:', {
      isFormValid,
      isSubmitting,
      formData,
      errors,
      isAgreed,
      agreements
    });
  }, [isFormValid, isSubmitting, formData, errors, isAgreed, agreements]);

  const handleFormSubmit = useCallback((e?: FormEvent) => {
    if (e) {
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <div className="relative flex flex-col min-h-full">
      <div className="flex-1 mx-auto w-full max-w-[480px]">
        <h3 className="mb-8 mt-8 text-center text-secondary-900 dark:text-secondary-50">
          회원가입
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 매장명 필드 (읽기 전용) */}
          <div>
            <label
              htmlFor="storeName"
              className="block text-body-sm text-secondary-700 dark:text-secondary-300"
            >
              매장명
            </label>
            <input
              type="text"
              id="storeName"
              value={storeName}
              className="input mt-1.5 w-full bg-secondary-50 dark:bg-secondary-800 dark:text-secondary-50"
              readOnly
            />
          </div>

          {/* 휴대폰 번호 입력 필드 */}
          <PhoneNumberInput
            value={formData.phoneNumber}
            countryCode={formData.countryCode}
            error={errors.phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={() => handleBlur('phoneNumber')}
            onCountryCodeChange={handleCountryCodeChange}
          />

          {/* 이름 입력 필드 */}
          <NameInput
            value={formData.name}
            error={errors.name}
            onChange={(value) => handleInputChange('name', value)}
            onBlur={() => handleBlur('name')}
          />

          {/* 약관 동의 섹션 */}
          <TermsSection
            agreements={agreements}
            onAgreementChange={handleAgreementChange}
            onAgreeAll={handleAgreeAll}
            onViewTerm={handleViewTerm}
          />

          {submitError && (
            <div className="text-red-500 text-sm text-center">
              {submitError}
            </div>
          )}
        </form>
        <Footer />
      </div>

      {/* 하단 고정 제출 버튼 */}
      <SubmitButton
        isDisabled={!isFormValid || isSubmitting}
        isLoading={isSubmitting}
        onClick={handleFormSubmit}
      />

      {/* 약관 내용 모달 */}
      <TermsModal
        isOpen={selectedTerm !== null}
        onClose={handleCloseTerm}
        title={selectedTerm?.title || ''}
        content={selectedTerm?.content || ''}
      />
    </div>
  );
}; 