'use client';

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PromoSection } from '@/components/register/PromoSection';
import { RegisterForm } from '@/components/register/RegisterForm';
import { useCustomScroll } from '@/hooks/useCustomScroll';

export default function HomePage() {
  const searchParams = useSearchParams();
  const storeName = searchParams.get('storeName') || '';
  const storeId = searchParams.get('store_id') || '';
  const brandId = searchParams.get('brand_id') || '';

  useCustomScroll();  // 기본 설정값 사용

  return (
    <div className="h-screen overflow-hidden [&::-webkit-scrollbar]:hidden">
      <div className="flex h-full min-w-[360px] tablet:justify-center [&::-webkit-scrollbar]:hidden">
        <PromoSection />
        <div className="registration-page relative flex h-full min-w-[360px] w-full flex-col tablet:w-[600px] desktop:w-[600px] desktop:flex-shrink-0 desktop:mr-[300px]">
          <Header />
          {/* 스크롤 가능한 컨텐츠 영역 */}
          <div className="scrollable-content flex-1 overflow-y-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <RegisterForm storeName={storeName} storeId={storeId} brandId={brandId} />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}
