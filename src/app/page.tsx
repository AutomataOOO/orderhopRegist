'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PromoSection } from '@/components/register/PromoSection';
import { RegisterForm } from '@/components/register/RegisterForm';
import { getStoreInfo } from '@/services/auth';

interface StoreInfo {
  name: string;
  web_image_url: string;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('store_id') || '';
  const brandId = searchParams.get('brand_id') || '';
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

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
    <div className="h-screen overflow-hidden [&::-webkit-scrollbar]:hidden">
      <div className="flex h-full min-w-[360px] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-full mobile:justify-center desktop:justify-start">
          <div className="hidden desktop:flex min-w-[424px] max-w-[600px] flex-1">
            <PromoSection />
          </div>
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
