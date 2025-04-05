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
import Image from 'next/image';

interface RegisterFormProps {
  storeName: string;
  storeId: string;
  brandId: string;
  storeImageUrl?: string;
}

export function RegisterForm({ storeName, storeId, brandId, storeImageUrl }: RegisterFormProps) {
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
  } = useRegisterForm(storeName, storeId, brandId);

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

  const handleFormSubmit = useCallback((e: FormEvent) => {
    console.log('=== RegisterForm handleFormSubmit 시작 ===');
    console.log('이벤트:', e);
    handleSubmit(e);
  }, [handleSubmit]);

  return (
    <div className="relative">
      <div className="min-h-[calc(100vh-4rem)]">
        <div className="mx-auto w-full max-w-[480px] pb-24">
          <div className="text-center mb-4 mt-8">
            {storeImageUrl && (
              <div className="mb-4">
                <Image
                  src={storeImageUrl}
                  alt={storeName}
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                />
              </div>
            )}
          </div>
          <h3 className="mb-8 text-center text-secondary-900 dark:text-secondary-50">
            회원가입
          </h3>
          <form id="registerForm" onSubmit={handleFormSubmit}>
            <div className="space-y-6">
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
                  readOnly
                  className="mt-1 block w-full rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 text-secondary-900 placeholder-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-50 dark:placeholder-secondary-500"
                />
              </div>

              {/* 전화번호 입력 */}
              <PhoneNumberInput
                value={formData.phoneNumber}
                onChange={handlePhoneNumberChange}
                onBlur={() => handleBlur('phoneNumber')}
                error={errors.phoneNumber}
                countryCode={formData.countryCode}
                onCountryCodeChange={handleCountryCodeChange}
              />

              {/* 이름 입력 */}
              <NameInput
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                onBlur={() => handleBlur('name')}
                error={errors.name}
              />

              {/* 약관 동의 */}
              <TermsSection
                agreements={agreements}
                onAgreementChange={handleAgreementChange}
                onAgreeAll={handleAgreeAll}
                onViewTerm={handleViewTerm}
              />

              <Footer />
            </div>
          </form>
        </div>
      </div>

      {/* 제출 버튼 */}
      <SubmitButton
        isDisabled={!isFormValid}
        isLoading={isSubmitting}
        form="registerForm"
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
} 