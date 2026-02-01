/**
 * South Korea country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const southKorea: Country = {
    code: 'KR',
    name: 'South Korea',
    taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'KRW', region: 'APAC' },
    provinces: [
      { code: 'SEOUL', name: 'Seoul',
        cities: [
          { code: 'SEOUL', name: 'Seoul' },
          { code: 'BUSAN', name: 'Busan' },
          { code: 'INCHEON', name: 'Incheon' },
          { code: 'DAEGU', name: 'Daegu' },
          { code: 'DAEJEON', name: 'Daejeon' },
          { code: 'GWANGJU', name: 'Gwangju' },
          { code: 'SUWON', name: 'Suwon' },
          { code: 'ULSAN', name: 'Ulsan' },
          { code: 'CHANGWON', name: 'Changwon' },
          { code: 'GIMHAE', name: 'Gimhae' }
        ]
      },
      { code: 'GYEONGGI', name: 'Gyeonggi',
        cities: [
          { code: 'SUWON', name: 'Suwon' },
          { code: 'SEONGNAM', name: 'Seongnam' },
          { code: 'YONGIN', name: 'Yongin' },
          { code: 'BUCHEON', name: 'Bucheon' },
          { code: 'ANYANG', name: 'Anyang' },
          { code: 'GIMPO', name: 'Gimpo' },
          { code: 'GWANGMYEONG', name: 'Gwangmyeong' },
          { code: 'UIJEONGBU', name: 'Uijeongbu' },
          { code: 'PYEONGTAEK', name: 'Pyeongtaek' },
          { code: 'GWANGJU2', name: 'Gwangju' }
        ]
      },
      { code: 'GYEONGSANG', name: 'Gyeongsang',
        cities: [
          { code: 'BUSAN', name: 'Busan' },
          { code: 'DAEGU', name: 'Daegu' },
          { code: 'ULSAN', name: 'Ulsan' },
          { code: 'CHANGWON', name: 'Changwon' },
          { code: 'GIMHAE', name: 'Gimhae' },
          { code: 'POHANG', name: 'Pohang' },
          { code: 'GYEONGJU', name: 'Gyeongju' },
          { code: 'MIRYANG', name: 'Miryang' },
          { code: 'YANGSAN', name: 'Yangsan' },
          { code: 'TONGYEONG', name: 'Tongyeong' }
        ]
      },
      { code: 'JEOLLA', name: 'Jeolla',
        cities: [
          { code: 'GWANGJU', name: 'Gwangju' },
          { code: 'JEONJU', name: 'Jeonju' },
          { code: 'GUNSAN', name: 'Gunsan' },
          { code: 'MUJU', name: 'Muju' },
          { code: 'NAMWON', name: 'Namwon' },
          { code: 'SUNCHANG', name: 'Sunchang' },
          { code: 'JANGSEONG', name: 'Jangseong' },
          { code: 'YEONGGWANG', name: 'Yeonggwang' },
          { code: 'MOKPO', name: 'Mokpo' },
          { code: 'YEOSU', name: 'Yeosu' }
        ]
      },
      { code: 'CHUNGCHEONG', name: 'Chungcheong',
        cities: [
          { code: 'DAEJEON', name: 'Daejeon' },
          { code: 'CHEONGJU', name: 'Cheongju' },
          { code: 'CHEONAN', name: 'Cheonan' },
          { code: 'ASAN', name: 'Asan' },
          { code: 'SEJONG', name: 'Sejong' },
          { code: 'GONGJU', name: 'Gongju' },
          { code: 'JEONGEUP', name: 'Jeongeup' },
          { code: 'NONSAN', name: 'Nonsan' },
          { code: 'GYERYONG', name: 'Gyeryong' },
          { code: 'DANGJIN', name: 'Dangjin' }
        ]
      },
      { code: 'GANGWON', name: 'Gangwon',
        cities: [
          { code: 'CHUNCHEON', name: 'Chuncheon' },
          { code: 'WONJU', name: 'Wonju' },
          { code: 'GANGNEUNG', name: 'Gangneung' },
          { code: 'DONGHAE', name: 'Donghae' },
          { code: 'SOKCHO', name: 'Sokcho' },
          { code: 'TAEBEAK', name: 'Taebaek' },
          { code: 'SAMCHEOK', name: 'Samcheok' },
          { code: 'HOENGSEONG', name: 'Hoengseong' },
          { code: 'YEONGWOL', name: 'Yeongwol' },
          { code: 'PYEONGCHANG', name: 'Pyeongchang' }
        ]
      },
      { code: 'JEJU', name: 'Jeju',
        cities: [
          { code: 'JEJU', name: 'Jeju City' },
          { code: 'SEOGWIPO', name: 'Seogwipo' },
          { code: 'JEJU2', name: 'Jeju' },
          { code: 'SEOGWIPO2', name: 'Seogwipo' },
          { code: 'JEJU3', name: 'Jeju' },
          { code: 'SEOGWIPO3', name: 'Seogwipo' },
          { code: 'JEJU4', name: 'Jeju' },
          { code: 'SEOGWIPO4', name: 'Seogwipo' },
          { code: 'JEJU5', name: 'Jeju' },
          { code: 'SEOGWIPO5', name: 'Seogwipo' }
        ]
      },
      { code: 'INCHEON', name: 'Incheon',
        cities: [
          { code: 'INCHEON', name: 'Incheon' },
          { code: 'INCHEON2', name: 'Incheon' },
          { code: 'INCHEON3', name: 'Incheon' },
          { code: 'INCHEON4', name: 'Incheon' },
          { code: 'INCHEON5', name: 'Incheon' },
          { code: 'INCHEON6', name: 'Incheon' },
          { code: 'INCHEON7', name: 'Incheon' },
          { code: 'INCHEON8', name: 'Incheon' },
          { code: 'INCHEON9', name: 'Incheon' },
          { code: 'INCHEON10', name: 'Incheon' }
        ]
      },
      { code: 'DAEGU', name: 'Daegu',
        cities: [
          { code: 'DAEGU', name: 'Daegu' },
          { code: 'DAEGU2', name: 'Daegu' },
          { code: 'DAEGU3', name: 'Daegu' },
          { code: 'DAEGU4', name: 'Daegu' },
          { code: 'DAEGU5', name: 'Daegu' },
          { code: 'DAEGU6', name: 'Daegu' },
          { code: 'DAEGU7', name: 'Daegu' },
          { code: 'DAEGU8', name: 'Daegu' },
          { code: 'DAEGU9', name: 'Daegu' },
          { code: 'DAEGU10', name: 'Daegu' }
        ]
      },
      { code: 'DAEJEON', name: 'Daejeon',
        cities: [
          { code: 'DAEJEON', name: 'Daejeon' },
          { code: 'DAEJEON2', name: 'Daejeon' },
          { code: 'DAEJEON3', name: 'Daejeon' },
          { code: 'DAEJEON4', name: 'Daejeon' },
          { code: 'DAEJEON5', name: 'Daejeon' },
          { code: 'DAEJEON6', name: 'Daejeon' },
          { code: 'DAEJEON7', name: 'Daejeon' },
          { code: 'DAEJEON8', name: 'Daejeon' },
          { code: 'DAEJEON9', name: 'Daejeon' },
          { code: 'DAEJEON10', name: 'Daejeon' }
        ]
      }
    ]
};
