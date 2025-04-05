'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PromoSection } from '@/components/register/PromoSection';
import { RegisterForm } from '@/components/register/RegisterForm';
import { useCustomScroll } from '@/hooks/useCustomScroll';
import { getStoreInfo } from '@/services/auth';
import Image from 'next/image';

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
        <div className="flex w-full desktop:mr-[300px]">
          <PromoSection />
          <div className="registration-page relative flex h-full min-w-[360px] w-full flex-col mx-auto tablet:max-w-[600px] desktop:w-[600px] desktop:flex-shrink-0">
            <Header />
            {/* 스크롤 가능한 컨텐츠 영역 */}
            <div className="scrollable-content flex-1 overflow-y-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
              <div className="min-h-[calc(100vh-4rem)] flex flex-col"> {/* 4rem은 Header 높이 */}
                <div className="flex-1">
                  <div className="text-center mb-4 mt-8">
                    {storeInfo.web_image_url && (
                      <div className="mb-4">
                        <Image
                          src={storeInfo.web_image_url}
                          alt={storeInfo.name}
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  <RegisterForm storeName={storeInfo.name} storeId={storeId} brandId={brandId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
