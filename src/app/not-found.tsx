'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-secondary-900">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mb-8 text-secondary-600">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <button
          onClick={() => router.push('/')}
          className="btn btn-primary"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
} 