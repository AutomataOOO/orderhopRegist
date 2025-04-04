'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TERMS } from '@/constants/terms';

interface RegisterFormData {
  phoneNumber: string;
  name: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    phoneNumber: '',
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Form submitted:', formData);
    router.push('/login');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {/* Desktop Promo Section - Only visible on desktop */}
      <div className="fixed left-0 top-0 hidden h-full w-[calc(100%-580px)] items-center justify-center bg-primary-500 desktop:flex">
        <div className="relative aspect-[4/3] w-full max-w-2xl">
          <img
            src="/images/promo-winter.png"
            alt="OrderHop Winter Promotion"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Registration Form Section - Full width on mobile, fixed width on desktop */}
      <div className="min-h-screen desktop:ml-auto desktop:w-[580px]">
        <div className="container py-8">
          <div className="mx-auto">
            <div className="mb-8 flex justify-center">
              <img
                src="/logo.png"
                alt="OrderHop Logo"
                className="h-12 w-auto sm:h-16"
              />
            </div>
            <h1 className="mb-8 text-center text-secondary-900 dark:text-secondary-50">회원가입</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-body-sm text-secondary-700 dark:text-secondary-300"
                >
                  휴대폰 번호
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="input mt-1.5 bg-white dark:bg-secondary-900 dark:text-secondary-50"
                  placeholder="010-0000-0000"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-body-sm text-secondary-700 dark:text-secondary-300"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input mt-1.5 bg-white dark:bg-secondary-900 dark:text-secondary-50"
                  placeholder="홍길동"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="terms"
                  className="block text-body-sm text-secondary-700 dark:text-secondary-300"
                >
                  이용약관
                </label>
                <textarea
                  id="terms"
                  className="input mt-1.5 h-48 resize-none bg-white dark:bg-secondary-900 dark:text-secondary-50"
                  readOnly
                  value={TERMS}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={isAgreed}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-secondary-200 dark:border-secondary-700 text-primary focus:ring-primary dark:focus:ring-primary-400"
                />
                <label
                  htmlFor="agree"
                  className="text-body-sm text-secondary-700 dark:text-secondary-300"
                >
                  이용약관에 동의합니다
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 border-t border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 p-4 shadow-md desktop:left-auto desktop:w-[580px]">
          <div className="container">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isAgreed}
              className="btn btn-primary w-full"
            >
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 