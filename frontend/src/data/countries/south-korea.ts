/**
 * South Korea country data with provinces and special cities
 */

import { Country } from './index';

export const southkorea: Country = {
  code: 'KR',
  name: 'South Korea',
  flag: '🇰🇷',
  capital: 'Seoul',
  area: 100210,
  currencySymbol: '₩',
  officialLanguages: ['Korean'],
  demonym: 'South Korean',
  taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KRW', region: 'APAC' },
  divisions: [
    { code: 'SEOUL', name: 'Seoul', type: 'special city',
      cities: [
        { code: 'SEOUL', name: 'Seoul' },
        { code: 'GANGNAM', name: 'Gangnam' },
        { code: 'JONGNO', name: 'Jongno' },
        { code: 'JONGGU', name: 'Jonggu' },
        { code: 'YONGSAN', name: 'Yongsan' },
        { code: 'SEONGDONG', name: 'Seongdong' },
        { code: 'SONGPA', name: 'Songpa' },
        { code: 'NOWON', name: 'Nowon' },
        { code: 'EUNPYEONG', name: 'Eunpyeong' },
        { code: 'DONGDAEMUN', name: 'Dongdaemun' }
      ]
    },
    { code: 'BUSAN', name: 'Busan', type: 'metropolitan city',
      cities: [
        { code: 'BUSAN', name: 'Busan' },
        { code: 'HAEUNDAE', name: 'Haeundae' },
        { code: 'SEOMYEON', name: 'Seomyeon' },
        { code: 'SASANG', name: 'Sasang' },
        { code: 'GEUMJEONG', name: 'Geumjeong' },
        { code: 'DONGNAE', name: 'Dongnae' },
        { code: 'YEONJE', name: 'Yeonje' },
        { code: 'BUK', name: 'Buk' },
        { code: 'SUYEONG', name: 'Suyeong' },
        { code: 'JUNG', name: 'Jung' }
      ]
    },
    { code: 'INCHEON', name: 'Incheon', type: 'metropolitan city',
      cities: [
        { code: 'INCHEON', name: 'Incheon' },
        { code: 'BUPYEONG', name: 'Bupyeong' },
        { code: 'NAMDONG', name: 'Namdong' },
        { code: 'YEONSU', name: 'Yeonsu' },
        { code: 'JUNG', name: 'Jung' },
        { code: 'DONG', name: 'Dong' },
        { code: 'MICHOHOL', name: 'Michuhol' },
        { code: 'SEOGU', name: 'Seogu' }
      ]
    },
    { code: 'DAEGU', name: 'Daegu', type: 'metropolitan city',
      cities: [
        { code: 'DAEGU', name: 'Daegu' },
        { code: 'JUNG', name: 'Jung' },
        { code: 'DONG', name: 'Dong' },
        { code: 'SEO', name: 'Seo' },
        { code: 'BUK', name: 'Buk' },
        { code: 'SUSEONG', name: 'Suseong' },
        { code: 'DALSEO', name: 'Dalseo' },
        { code: 'DALSEONG', name: 'Dalseong' }
      ]
    },
    { code: 'DAEJEON', name: 'Daejeon', type: 'metropolitan city',
      cities: [
        { code: 'DAEJEON', name: 'Daejeon' },
        { code: 'JUNG', name: 'Jung' },
        { code: 'DONG', name: 'Dong' },
        { code: 'SEO', name: 'Seo' },
        { code: 'YUSEONG', name: 'Yuseong' },
        { code: 'DAEDUK', name: 'Daedeok' }
      ]
    },
    { code: 'GWANGJU', name: 'Gwangju', type: 'metropolitan city',
      cities: [
        { code: 'GWANGJU', name: 'Gwangju' },
        { code: 'DONG', name: 'Dong' },
        { code: 'SEO', name: 'Seo' },
        { code: 'BUK', name: 'Buk' },
        { code: 'NAM', name: 'Nam' },
        { code: 'GWANGSAN', name: 'Gwangsan' }
      ]
    },
    { code: 'ULSAN', name: 'Ulsan', type: 'metropolitan city',
      cities: [
        { code: 'ULSAN', name: 'Ulsan' },
        { code: 'NAM', name: 'Nam' },
        { code: 'BUK', name: 'Buk' },
        { code: 'DONG', name: 'Dong' },
        { code: 'JUNG', name: 'Jung' },
        { code: 'ULJU', name: 'Ulju' }
      ]
    },
    { code: 'SEJONG', name: 'Sejong', type: 'special self-governing city',
      cities: [
        { code: 'SEJONG', name: 'Sejong' },
        { code: 'SEJONG', name: 'Sejong City' },
        { code: 'HANSOL', name: 'Hansol' },
        { code: 'BOMUN', name: 'Bomun' },
        { code: 'SOCHON', name: 'Sochon' }
      ]
    },
    { code: 'GYEONGGI', name: 'Gyeonggi', type: 'province',
      cities: [
        { code: 'SUWON', name: 'Suwon' },
        { code: 'SEONGNAM', name: 'Seongnam' },
        { code: 'YONGIN', name: 'Yongin' },
        { code: 'BUCHEON', name: 'Bucheon' },
        { code: 'ANYANG', name: 'Anyang' },
        { code: 'GIMPO', name: 'Gimpo' },
        { code: 'PYEONGTAEK', name: 'Pyeongtaek' },
        { code: 'UIWANG', name: 'Uiwang' },
        { code: 'HWASEONG', name: 'Hwaseong' },
        { code: 'GURI', name: 'Guri' },
        { code: 'GWACHEON', name: 'Gwacheon' },
        { code: 'NAMYANGJU', name: 'Namyangju' }
      ]
    },
    { code: 'GANGWON', name: 'Gangwon', type: 'province',
      cities: [
        { code: 'CHUNCHEON', name: 'Chuncheon' },
        { code: 'WONJU', name: 'Wonju' },
        { code: 'GANGNEUNG', name: 'Gangneung' },
        { code: 'DONGHAE', name: 'Donghae' },
        { code: 'TAEBEAK', name: 'Taebaek' },
        { code: 'SOKCHO', name: 'Sokcho' },
        { code: 'SAMCHEOK', name: 'Samcheok' },
        { code: 'HOENGSEONG', name: 'Hoengseong' },
        { code: 'JEONGSEON', name: 'Jeongseon' },
        { code: 'PYEONGCHANG', name: 'Pyeongchang' },
        { code: 'YEONGWOL', name: 'Yeongwol' }
      ]
    },
    { code: 'CHUNGBUK', name: 'North Chungcheong', type: 'province',
      cities: [
        { code: 'CHEONGJU', name: 'Cheongju' },
        { code: 'CHUNGJU', name: 'Chungju' },
        { code: 'JEONGEUP', name: 'Jeongeup' },
        { code: 'GIMJE', name: 'Gimje' },
        { code: 'MUJU', name: 'Muju' },
        { code: 'OKCHEON', name: 'Okcheon' },
        { code: 'JECHON', name: 'Jecheon' },
        { code: 'EUMSEONG', name: 'Eumseong' },
        { code: 'DANYANG', name: 'Danyang' },
        { code: 'JINCHUN', name: 'Jinchun' },
        { code: 'GOESAN', name: 'Goesan' }
      ]
    },
    { code: 'CHUNGNAM', name: 'South Chungcheong', type: 'province',
      cities: [
        { code: 'DAEJEON', name: 'Daejeon' },
        { code: 'CHEONAN', name: 'Cheonan' },
        { code: 'ASAN', name: 'Asan' },
        { code: 'SEJONG', name: 'Sejong' },
        { code: 'GONGJU', name: 'Gongju' },
        { code: 'NONSAN', name: 'Nonsan' },
        { code: 'GYERYONG', name: 'Gyeryong' },
        { code: 'BORYEONG', name: 'Boryeong' }
      ]
    },
    { code: 'JEONBUK', name: 'North Jeolla', type: 'province',
      cities: [
        { code: 'JEONJU', name: 'Jeonju' },
        { code: 'GIMJE', name: 'Gimje' },
        { code: 'MUJU', name: 'Muju' },
        { code: 'IKSAN', name: 'Iksan' },
        { code: 'JEONGEUP', name: 'Jeongeup' },
        { code: 'NAMWON', name: 'Namwon' },
        { code: 'JANGSU', name: 'Jangsu' },
        { code: 'WANJU', name: 'Wanju' },
        { code: 'GUNSAN', name: 'Gunsan' },
        { code: 'BORYEONG', name: 'Boryeong' }
      ]
    },
    { code: 'JEONNAM', name: 'South Jeolla', type: 'province',
      cities: [
        { code: 'GWANGJU', name: 'Gwangju' },
        { code: 'MOKEPO', name: 'Mokpo' },
        { code: 'YEOSU', name: 'Yeosu' },
        { code: 'SUNCHANG', name: 'Sunchang' },
        { code: 'NAMWON', name: 'Namwon' },
        { code: 'JANGSU', name: 'Jangsu' },
        { code: 'GUNSAN', name: 'Gunsan' },
        { code: 'JEONGEUP', name: 'Jeongeup' },
        { code: 'HAENAM', name: 'Haenam' },
        { code: 'HUJU', name: 'Huju' },
        { code: 'JANGHEUNG', name: 'Jangheung' },
        { code: 'GANGJIN', name: 'Gangjin' },
        { code: 'GOHEUNG', name: 'Goheung' },
        { code: 'WANDO', name: 'Wando' },
        { code: 'SINAN', name: 'Sinan' }
      ]
    },
    { code: 'GYEONGBUK', name: 'North Gyeongsang', type: 'province',
      cities: [
        { code: 'DAEGU', name: 'Daegu' },
        { code: 'POHANG', name: 'Pohang' },
        { code: 'GYEONGJU', name: 'Gyeongju' },
        { code: 'GIMCHON', name: 'Gimcheon' },
        { code: 'ANDONG', name: 'Andong' },
        { code: 'YEONGJU', name: 'Yeongju' },
        { code: 'YEONGCHEON', name: 'Yeongcheon' },
        { code: 'SANGJU', name: 'Sangju' },
        { code: 'MUNGYEONG', name: 'Mungyeong' },
        { code: 'UIJEONG', name: 'Uijeongbu' },
        { code: 'GUMI', name: 'Gumi' }
      ]
    },
    { code: 'GYEONGNAM', name: 'South Gyeongsang', type: 'province',
      cities: [
        { code: 'BUSAN', name: 'Busan' },
        { code: 'ULSAN', name: 'Ulsan' },
        { code: 'CHANGWON', name: 'Changwon' },
        { code: 'JINJU', name: 'Jinju' },
        { code: 'SACHEON', name: 'Sacheon' },
        { code: 'MIRYANG', name: 'Miryang' },
        { code: 'YANGSAN', name: 'Yangsan' },
        { code: 'TONGYEONG', name: 'Tongyeong' },
        { code: 'GEOJE', name: 'Geoje' },
        { code: 'HADONG', name: 'Hadong' },
        { code: 'HAMAN', name: 'Haman' },
        { code: 'CHANGNYEONG', name: 'Changnyeong' },
        { code: 'GIMHAE', name: 'Gimhae' },
        { code: 'SUNGCHEON', name: 'Sungcheon' }
      ]
    },
    { code: 'JEJU', name: 'Jeju', type: 'special self-governing province',
      cities: [
        { code: 'JEJU', name: 'Jeju City' },
        { code: 'SEOGWIPO', name: 'Seogwipo' },
        { code: 'JEJU', name: 'Jeju' },
        { code: 'SEOGWIPO', name: 'Seogwipo' },
        { code: 'JEJU', name: 'Jeju' },
        { code: 'SEOGWIPO', name: 'Seogwipo' }
      ]
    }
  ]
};

export default southkorea;
