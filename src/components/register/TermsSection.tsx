import React from 'react';
import { TermAgreements } from '@/hooks/useTermsAgreement';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { TERMS } from '@/constants/terms';

interface TermsSectionProps {
  agreements: TermAgreements;
  onAgreementChange: (termId: string) => void;
  onAgreeAll: (value: boolean) => void;
  onViewTerm: (title: string, content: string) => void;
}

export const TermsSection: React.FC<TermsSectionProps> = ({
  agreements,
  onAgreementChange,
  onAgreeAll,
  onViewTerm,
}) => {
  const isAllAgreed = Object.values(agreements).every(Boolean);

  const handleAgreeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAgreeAll(e.target.checked);
  };

  const handleAgreementChange = (termId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onAgreementChange(termId);
  };

  return (
    <div className="space-y-4">
      {/* 전체 동의 체크박스 */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agreeAll"
          checked={isAllAgreed}
          onChange={handleAgreeAll}
          className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-700 dark:ring-offset-secondary-800"
        />
        <label
          htmlFor="agreeAll"
          className="text-sm font-medium text-secondary-900 dark:text-secondary-50"
        >
          전체 동의
        </label>
      </div>

      <div className="ml-4 space-y-3 border-l-2 border-secondary-200 pl-4 dark:border-secondary-700">
        {/* 필수 약관 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="service"
                checked={agreements.service}
                onChange={handleAgreementChange('service')}
                className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-700 dark:ring-offset-secondary-800"
              />
              <label
                htmlFor="service"
                className="text-sm text-secondary-700 dark:text-secondary-300"
              >
                서비스 이용약관 동의 <span className="text-red-500">(필수)</span>
              </label>
            </div>
            <button
              type="button"
              onClick={() => onViewTerm(TERMS[0].title, TERMS[0].content)}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              보기
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacy"
                checked={agreements.privacy}
                onChange={handleAgreementChange('privacy')}
                className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-700 dark:ring-offset-secondary-800"
              />
              <label
                htmlFor="privacy"
                className="text-sm text-secondary-700 dark:text-secondary-300"
              >
                개인정보 수집 및 이용 동의 <span className="text-red-500">(필수)</span>
              </label>
            </div>
            <button
              type="button"
              onClick={() => onViewTerm(TERMS[1].title, TERMS[1].content)}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              보기
            </button>
          </div>
        </div>

        {/* 선택 약관 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="marketing"
                checked={agreements.marketing}
                onChange={handleAgreementChange('marketing')}
                className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500 dark:border-secondary-600 dark:bg-secondary-700 dark:ring-offset-secondary-800"
              />
              <label
                htmlFor="marketing"
                className="text-sm text-secondary-700 dark:text-secondary-300"
              >
                마케팅 정보 수신 동의 <span className="text-secondary-500">(선택)</span>
              </label>
            </div>
            <button
              type="button"
              onClick={() => onViewTerm(TERMS[2].title, TERMS[2].content)}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              보기
            </button>
          </div>
        </div>
      </div>

      {!agreements.service || !agreements.privacy ? (
        <p className="mt-1 text-sm text-red-500">{ERROR_MESSAGES.TERMS.REQUIRED}</p>
      ) : (
        <p className="mt-1 text-sm text-transparent select-none" aria-hidden="true">빈 공간</p>
      )}
    </div>
  );
}; 