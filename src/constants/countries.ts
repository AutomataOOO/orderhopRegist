interface Country {
  code: string;
  flag: string;
  dialCode: string;
  name: string;
  placeholder: string;
  pattern: RegExp;
}

export const countries: Country[] = [
  {
    code: 'KR',
    flag: '🇰🇷',
    dialCode: '+82',
    name: '대한민국',
    placeholder: '010-1234-5678',
    pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
  },
  {
    code: 'JP',
    flag: '🇯🇵',
    dialCode: '+81',
    name: '일본',
    placeholder: '090-1234-5678',
    pattern: /^0[789]0-?([0-9]{4})-?([0-9]{4})$/
  },
  {
    code: 'CN',
    flag: '🇨🇳',
    dialCode: '+86',
    name: '중국',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'VN',
    flag: '🇻🇳',
    dialCode: '+84',
    name: '베트남',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'TH',
    flag: '🇹🇭',
    dialCode: '+66',
    name: '태국',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'PH',
    flag: '🇵🇭',
    dialCode: '+63',
    name: '필리핀',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'ID',
    flag: '🇮🇩',
    dialCode: '+62',
    name: '인도네시아',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'MY',
    flag: '🇲🇾',
    dialCode: '+60',
    name: '말레이시아',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'SG',
    flag: '🇸🇬',
    dialCode: '+65',
    name: '싱가포르',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'IN',
    flag: '🇮🇳',
    dialCode: '+91',
    name: '인도',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'MN',
    flag: '🇲🇳',
    dialCode: '+976',
    name: '몽골',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'KH',
    flag: '🇰🇭',
    dialCode: '+855',
    name: '캄보디아',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'LA',
    flag: '🇱🇦',
    dialCode: '+856',
    name: '라오스',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'MM',
    flag: '🇲🇲',
    dialCode: '+95',
    name: '미얀마',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'US',
    flag: '🇺🇸',
    dialCode: '+1',
    name: '미국',
    placeholder: '(555) 123-4567',
    pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  },
  {
    code: 'CA',
    flag: '🇨🇦',
    dialCode: '+1',
    name: '캐나다',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'GB',
    flag: '🇬🇧',
    dialCode: '+44',
    name: '영국',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'DE',
    flag: '🇩🇪',
    dialCode: '+49',
    name: '독일',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'FR',
    flag: '🇫🇷',
    dialCode: '+33',
    name: '프랑스',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'IT',
    flag: '🇮🇹',
    dialCode: '+39',
    name: '이탈리아',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'ES',
    flag: '🇪🇸',
    dialCode: '+34',
    name: '스페인',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'AU',
    flag: '🇦🇺',
    dialCode: '+61',
    name: '호주',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'NZ',
    flag: '🇳🇿',
    dialCode: '+64',
    name: '뉴질랜드',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'RU',
    flag: '🇷🇺',
    dialCode: '+7',
    name: '러시아',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'BR',
    flag: '🇧🇷',
    dialCode: '+55',
    name: '브라질',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'MX',
    flag: '🇲🇽',
    dialCode: '+52',
    name: '멕시코',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'AE',
    flag: '🇦🇪',
    dialCode: '+971',
    name: '아랍에미리트',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'SA',
    flag: '🇸🇦',
    dialCode: '+966',
    name: '사우디아라비아',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'TR',
    flag: '🇹🇷',
    dialCode: '+90',
    name: '터키',
    placeholder: '',
    pattern: /./
  },
  {
    code: 'IL',
    flag: '🇮🇱',
    dialCode: '+972',
    name: '이스라엘',
    placeholder: '',
    pattern: /./
  }
];

export const COUNTRIES: Record<string, Country> = {
  KR: {
    code: 'KR',
    dialCode: '+82',
    flag: '🇰🇷',
    name: '대한민국',
    placeholder: '010-1234-5678',
    pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
  },
  US: {
    code: 'US',
    dialCode: '+1',
    flag: '🇺🇸',
    name: '미국',
    placeholder: '(555) 123-4567',
    pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  },
  JP: {
    code: 'JP',
    dialCode: '+81',
    flag: '🇯🇵',
    name: '일본',
    placeholder: '090-1234-5678',
    pattern: /^0[789]0-?([0-9]{4})-?([0-9]{4})$/
  }
}; 