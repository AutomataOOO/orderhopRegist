import { render, screen } from '@testing-library/react';
import { PromoSection } from '../PromoSection';

describe('PromoSection', () => {
  it('renders promo content correctly', () => {
    render(<PromoSection />);
    
    // 이미지가 올바르게 렌더링되는지 확인
    const promoImage = screen.getByAltText('Card Promotion');
    expect(promoImage).toBeInTheDocument();
    expect(promoImage).toHaveAttribute('src', '/card-promo.svg');
    
    // 제목이 올바르게 렌더링되는지 확인
    expect(screen.getByText(/OrderHop과 함께/)).toBeInTheDocument();
    expect(screen.getByText(/더 편리한 주문관리를 시작하세요/)).toBeInTheDocument();
    
    // 부가 설명이 올바르게 렌더링되는지 확인
    expect(screen.getByText('지금 가입하시면 다양한 혜택을 받으실 수 있습니다')).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    render(<PromoSection />);
    
    // desktop에서만 보이는지 확인
    const container = screen.getByRole('img', { name: 'Card Promotion' }).parentElement?.parentElement?.parentElement;
    expect(container).toHaveClass('hidden', 'desktop:flex');
    
    // 그라데이션 배경이 적용되었는지 확인
    expect(container).toHaveClass('bg-gradient-to-b', 'from-blue-50', 'to-white');
  });
}); 