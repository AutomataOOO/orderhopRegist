'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { PromoSection } from '@/components/register/PromoSection';
import { RegisterForm } from '@/components/register/RegisterForm';
import { getStoreInfo, StoreInfo } from '@/services/auth';

function HomeContent() {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('store_id') || '';
  const brandId = searchParams.get('brand_id') || '';
  console.log('hi')
  
  // 매장 정보와 에러 상태를 관리합니다
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // 스크롤 가능한 영역을 참조하기 위한 ref
  const scrollableRef = useRef<HTMLDivElement>(null);

  /**
   * 마우스 휠 이벤트 핸들러
   * 외부 스크롤 이벤트를 내부 스크롤 영역으로 전달합니다
   */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollableRef.current) {
        scrollableRef.current.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, []);

  /**
   * 매장 정보를 가져오는 함수
   * storeId가 있는 경우에만 API를 호출합니다
   */
  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (!storeId) {
        setError('Store ID is required');
        return;
      }

      try {
        const info = await getStoreInfo(storeId);
        setStoreInfo(info);
      } catch (err) {
        console.error('Failed to fetch store info:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch store information');
      }
    };

    fetchStoreInfo();
  }, [storeId]);

  // 에러가 발생한 경우 에러 메시지를 표시합니다
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // 매장 정보가 로딩 중인 경우 로딩 스피너를 표시합니다
  if (!storeInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading store information...</p>
        </div>
      </div>
    );
  }

  return (
    // 전체 화면을 감싸는 컨테이너
    <div className="h-screen overflow-hidden [&::-webkit-scrollbar]:hidden">
      {/* 반응형 레이아웃을 위한 flex 컨테이너 */}
      <div className="flex h-full min-w-[360px] [&::-webkit-scrollbar]:hidden">
        {/* 모바일에서는 중앙 정렬, 데스크톱에서는 왼쪽 정렬 */}
        <div className="flex w-full mobile:justify-center desktop:justify-start">
          {/* 데스크톱에서만 표시되는 프로모션 섹션 */}
          <div className="hidden desktop:flex min-w-[424px] max-w-[600px] flex-1">
            <PromoSection />
          </div>
          {/* 회원가입 페이지 컨테이너 */}
          <div className="registration-page relative flex h-full min-w-[360px] w-full flex-col tablet:max-w-[600px] desktop:w-[600px] desktop:flex-shrink-0">
            <Header />
            {/* 스크롤 가능한 컨텐츠 영역 */}
            <div 
              ref={scrollableRef}
              className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300"
            >
              <RegisterForm 
                storeName={storeInfo.name} 
                storeId={storeId} 
                brandId={brandId}
                storeImageUrl={storeInfo.web_image_url}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
