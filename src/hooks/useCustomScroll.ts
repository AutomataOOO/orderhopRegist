import { useEffect } from 'react';

interface UseCustomScrollOptions {
  excludeSelectors?: string[];  // 자연스러운 스크롤을 허용할 요소들의 선택자
  mainContentSelector?: string;  // 메인 컨텐츠 영역의 선택자
}

export function useCustomScroll({
  excludeSelectors = ['.country-list', '#terms'],
  mainContentSelector = '.scrollable-content'
}: UseCustomScrollOptions = {}) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollableContent = document.querySelector(mainContentSelector);
      
      // 제외할 요소들 체크
      const shouldExclude = excludeSelectors.some(selector => {
        const element = document.querySelector(selector);
        return element?.contains(target);
      });
      
      if (shouldExclude) {
        return; // 제외된 요소들은 자연스러운 스크롤 허용
      }

      // 메인 컨텐츠 영역 스크롤 처리
      if (scrollableContent) {
        scrollableContent.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [excludeSelectors, mainContentSelector]);
} 