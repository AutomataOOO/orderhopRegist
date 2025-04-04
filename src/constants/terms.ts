interface Term {
  id: string;
  title: string;
  required: boolean;
  content: string;
}

export const TERMS: Term[] = [
  {
    id: 'service',
    title: '서비스 이용약관',
    required: true,
    content: `서비스 이용약관 내용...
    1. 목적
    본 약관은...`,
  },
  {
    id: 'privacy',
    title: '개인정보처리방침',
    required: true,
    content: `개인정보처리방침 내용...
    1. 개인정보의 수집 및 이용 목적
    회사는...`,
  },
  {
    id: 'marketing',
    title: '마케팅 정보 수신 동의',
    required: false,
    content: `마케팅 정보 수신 동의 내용...
    1. 마케팅 정보 수신 동의
    회사가 제공하는...`,
  },
]; 