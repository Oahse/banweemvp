/**
 * South Korea country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const southKorea: Country = {
    code: 'KR',
    name: 'South Korea',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KRW', region: 'APAC' },
    provinces: [
      { code: '11', name: 'Seoul',
        cities: [
          { code: 'SEL', name: 'Seoul' },
          { code: 'GANGNAM', name: 'Gangnam' },
          { code: 'JONGNO', name: 'Jongno' },
          { code: 'JUNG', name: 'Jung' },
          { code: 'SONGPA', name: 'Songpa' },
          { code: 'NOWON', name: 'Nowon' },
          { code: 'GANGBUK', name: 'Gangbuk' },
          { code: 'GANGDONG', name: 'Gangdong' },
          { code: 'GANGSEON', name: 'Gangseo' },
          { code: 'GANGJIN', name: 'Gwangjin' }
        ]
      },
      { code: '26', name: 'Busan',
        cities: [
          { code: 'BUS', name: 'Busan' },
          { code: 'HAEUNDAE', name: 'Haeundae' },
          { code: 'GEUMJEONG', name: 'Geumjeong' },
          { code: 'SASANG', name: 'Sasang' },
          { code: 'YEONJE', name: 'Yeonje' },
          { code: 'DONGNAE', name: 'Dongnae' },
          { code: 'JIN', name: 'Jin' },
          { code: 'NAM', name: 'Nam' },
          { code: 'SUYEONG', name: 'Suyeong' },
          { code: 'SAHA', name: 'Saha' }
        ]
      },
      { code: '27', name: 'Daegu',
        cities: [
          { code: 'DAE', name: 'Daegu' },
          { code: 'JUNG', name: 'Jung' },
          { code: 'DALSEO', name: 'Dalseo' },
          { code: 'SEOGU', name: 'Seo' },
          { code: 'NAMGU', name: 'Nam' },
          { code: 'DALSEONG', name: 'Dalseong' },
          { code: 'BUK', name: 'Buk' },
          { code: 'SUSEONG', name: 'Suseong' },
          { code: 'DONG', name: 'Dong' },
          { code: 'JI', name: 'Ji' }
        ]
      },
      { code: '28', name: 'Incheon',
        cities: [
          { code: 'INC', name: 'Incheon' },
          { code: 'JUNG', name: 'Jung' },
          { code: 'DONG', name: 'Dong' },
          { code: 'YEONSU', name: 'Yeonsu' },
          { code: 'NAM', name: 'Nam' },
          { code: 'BUK', name: 'Buk' },
          { code: 'SEOGU', name: 'Seo' },
          { code: 'GYEYANG', name: 'Gyeyang' },
          { code: 'JEONG', name: 'Jeong' },
          { code: 'CHEONG', name: 'Cheong' }
        ]
      },
      { code: '29', name: 'Gwangju',
        cities: [
          { code: 'GWANG', name: 'Gwangju' },
          { code: 'DONG', name: 'Dong' },
          { code: 'SEOGU', name: 'Seo' },
          { code: 'NAM', name: 'Nam' },
          { code: 'BUK', name: 'Buk' },
          { code: 'GWANGSAN', name: 'Gwangsan' },
          { code: 'JUNG', name: 'Jung' }
        ]
      },
      { code: '30', name: 'Daejeon',
        cities: [
          { code: 'DAEJEON', name: 'Daejeon' },
          { code: 'JUNG', name: 'Jung' },
          { code: 'DONG', name: 'Dong' },
          { code: 'SEOGU', name: 'Seo' },
          { code: 'NAM', name: 'Nam' },
          { code: 'BUK', name: 'Buk' },
          { code: 'DAEDEOK', name: 'Daedeok' },
          { code: 'YUSEONG', name: 'Yuseong' }
        ]
      },
      { code: '31', name: 'Ulsan',
        cities: [
          { code: 'ULSAN', name: 'Ulsan' },
          { code: 'JUNG', name: 'Jung' },
          { code: 'NAM', name: 'Nam' },
          { code: 'DONG', name: 'Dong' },
          { code: 'BUK', name: 'Buk' },
          { code: 'ULJU', name: 'Ulju' }
        ]
      },
      { code: '41', name: 'Gyeonggi',
        cities: [
          { code: 'SUWON', name: 'Suwon' },
          { code: 'SEONGNAM', name: 'Seongnam' },
          { code: 'UIJEONGBU', name: 'Uijeongbu' },
          { code: 'BUCHEON', name: 'Bucheon' },
          { code: 'GWANGMYEONG', name: 'Gwangmyeong' },
          { code: 'PYEONGTAEK', name: 'Pyeongtaek' },
          { code: 'ANYANG', name: 'Anyang' },
          { code: 'GUNPO', name: 'Gunpo' },
          { code: 'SIHEUNG', name: 'Siheung' },
          { code: 'GWANGJU', name: 'Gwangju' }
        ]
      },
      { code: '42', name: 'Gangwon',
        cities: [
          { code: 'CHUNCHEON', name: 'Chuncheon' },
          { code: 'WONJU', name: 'Wonju' },
          { code: 'GANGNEUNG', name: 'Gangneung' },
          { code: 'DONGHAE', name: 'Donghae' },
          { code: 'TAEBEAK', name: 'Taebaek' },
          { code: 'SOKCHO', name: 'Sokcho' },
          { code: 'SAMCHEOK', name: 'Samcheok' },
          { code: 'CHUNCHEON2', name: 'Chuncheon' },
          { code: 'HOENGSEONG', name: 'Hoengseong' },
          { code: 'JEONGSEON', name: 'Jeongseon' }
        ]
      },
      { code: '43', name: 'North Chungcheong',
        cities: [
          { code: 'CHEONGJU', name: 'Cheongju' },
          { code: 'CHUNGJU', name: 'Chungju' },
          { code: 'JECHON', name: 'Jecheon' },
          { code: 'EUMSEONG', name: 'Eumseong' },
          { code: 'DANYANG', name: 'Danyang' },
          { code: 'JINCHENG', name: 'Jincheon' },
          { code: 'GOESAN', name: 'Goesan' },
          { code: 'OKCHEON', name: 'Okcheon' },
          { code: 'JEUNG', name: 'Jeung' },
          { code: 'YEONGDONG', name: 'Yeongdong' }
        ]
      },
      { code: '44', name: 'South Chungcheong',
        cities: [
          { code: 'DAEJEON', name: 'Daejeon' },
          { code: 'CHEONAN', name: 'Cheonan' },
          { code: 'ASAN', name: 'Asan' },
          { code: 'SEOSAN', name: 'Seosan' },
          { code: 'GONGJU', name: 'Gongju' },
          { code: 'NONSAN', name: 'Nonsan' },
          { code: 'BORYEONG', name: 'Boryeong' },
          { code: 'BUYEO', name: 'Buyeo' },
          { code: 'YESAN', name: 'Yesan' },
          { code: 'TAEAN', name: 'Taean' }
        ]
      },
      { code: '45', name: 'North Jeolla',
        cities: [
          { code: 'JEONJU', name: 'Jeonju' },
          { code: 'GUNSAN', name: 'Gunsan' },
          { code: 'IKSAN', name: 'Iksan' },
          { code: 'JEONGEUP', name: 'Jeongeup' },
          { code: 'NAMWON', name: 'Namwon' },
          { code: 'MUJU', name: 'Muju' },
          { code: 'JINAN', name: 'Jinan' },
          { code: 'WANJU', name: 'Wanju' },
          { code: 'IMSHIL', name: 'Imsil' },
          { code: 'JANGSU', name: 'Jangsu' }
        ]
      },
      { code: '46', name: 'South Jeolla',
        cities: [
          { code: 'GWANGJU', name: 'Gwangju' },
          { code: 'MOKPO', name: 'Mokpo' },
          { code: 'YEOSU', name: 'Yeosu' },
          { code: 'SUNCHANG', name: 'Sunchang' },
          { code: 'NAMWON', name: 'Namwon' },
          { code: 'HAENAM', name: 'Haenam' },
          { code: 'GANGJIN', name: 'Gangjin' },
          { code: 'JANGHEUNG', name: 'Jangheung' },
          { code: 'BOSEONG', name: 'Boseong' },
          { code: 'HUASUN', name: 'Hwasun' }
        ]
      },
      { code: '47', name: 'North Gyeongsang',
        cities: [
          { code: 'DAEGU', name: 'Daegu' },
          { code: 'POHANG', name: 'Pohang' },
          { code: 'GYEONGJU', name: 'Gyeongju' },
          { code: 'GIMCHEON', name: 'Gimcheon' },
          { code: 'ANDONG', name: 'Andong' },
          { code: 'YEONGJU', name: 'Yeongju' },
          { code: 'YEONGCHEON', name: 'Yeongcheon' },
          { code: 'SANGJU', name: 'Sangju' },
          { code: 'MUNGYEONG', name: 'Mungyeong' },
          { code: 'GUNWI', name: 'Gunwi' }
        ]
      },
      { code: '48', name: 'South Gyeongsang',
        cities: [
          { code: 'BUSAN', name: 'Busan' },
          { code: 'CHANGWON', name: 'Changwon' },
          { code: 'JINJU', name: 'Jinju' },
          { code: 'MIRYANG', name: 'Miryang' },
          { code: 'YANGSAN', name: 'Yangsan' },
          { code: 'GIMHAE', name: 'Gimhae' },
          { code: 'TONGYEONG', name: 'Tongyeong' },
          { code: 'GEOJE', name: 'Geoje' },
          { code: 'SACHEON', name: 'Sacheon' },
          { code: 'CHANGNYEONG', name: 'Changnyeong' }
        ]
      },
      { code: '49', name: 'Jeju',
        cities: [
          { code: 'JEJU', name: 'Jeju' },
          { code: 'SEOGWIPO', name: 'Seogwipo' },
          { code: 'JOEJU', name: 'Jeju' },
          { code: 'ANDUCK', name: 'Anduck' },
          { code: 'HALLIM', name: 'Hallim' },
          { code: 'AWEOL', name: 'Aweol' },
          { code: 'DAEJEONG', name: 'Daejeong' },
          { code: 'PYOSEON', name: 'Pyoseon' },
          { code: 'NAMWON', name: 'Namwon' },
          { code: 'SANGMO', name: 'Sangmo' }
        ]
      }
    ]
};
