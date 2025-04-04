'use client';

import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="mb-6 text-6xl">✅</div>
        <h1 className="mb-4 text-2xl font-bold text-secondary-900">
          회원가입이 완료되었습니다
        </h1>
        <p className="mb-8 text-secondary-600">
          OrderHop과 함께 더 편리한 주문관리를 시작하세요
        </p>
        <button
          onClick={() => router.push('/login')}
          className="btn btn-primary"
        >
          로그인하기
        </button>
      </div>
    </div>
  );
} 