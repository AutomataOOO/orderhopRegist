'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('code') || '';
  const errorMessage = searchParams.get('message') || '알 수 없는 오류가 발생했습니다';

  return (
    <div className="flex h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="mb-6 text-6xl">❌</div>
        <h1 className="mb-4 text-2xl font-bold text-secondary-900">
          회원가입에 실패했습니다
        </h1>
        <div className="mb-8 rounded-lg bg-red-50 p-4">
          <p className="mb-2 font-semibold text-red-600">
            에러 코드: {errorCode}
          </p>
          <p className="text-red-600">{errorMessage}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="btn btn-secondary"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
} 