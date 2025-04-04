import React from 'react';

export function PromoSection() {
  return (
    <div className="hidden flex-1 items-center justify-center bg-gradient-to-b from-blue-50 to-white desktop:flex [&::-webkit-scrollbar]:hidden">
      <div className="relative p-8">
        <div className="space-y-6">
          <img
            src="/card-promo.svg"
            alt="Card Promotion"
            className="max-w-2xl"
          />
          <div className="absolute bottom-12 left-12 space-y-4">
            <h2 className="text-3xl font-bold text-secondary-900">
              OrderHop과 함께
              <br />
              더 편리한 주문관리를 시작하세요
            </h2>
            <p className="text-lg text-secondary-600">
              지금 가입하시면 다양한 혜택을 받으실 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 