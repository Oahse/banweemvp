/**
 * Taiwan country data with provinces and cities
 */

import { Country } from './index';

export const taiwan: Country = {
  code: 'TW',
  name: 'Taiwan',
  flag: '🇹🇼',
  capital: 'Taipei',
  area: 36197,
  currencySymbol: 'NT$',
  officialLanguages: ['Mandarin', 'Taiwanese', 'Hakka'],
  demonym: 'Taiwanese',
  taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'TWD', region: 'APAC' },
  divisions: [
    { code: 'TAI', name: 'Taipei', type: 'province',
      cities: [
        { code: 'TAIPEI', name: 'Taipei' },
        { code: 'KAOHSIUNG', name: 'Kaohsiung' },
        { code: 'TAICHUNG', name: 'Taichung' },
        { code: 'TAINAN', name: 'Tainan' },
        { code: 'HSINCHU', name: 'Hsinchu' }
      ]
    },
    { code: 'KAO', name: 'Kaohsiung', type: 'province',
      cities: [
        { code: 'KAOHSIUNG', name: 'Kaohsiung' },
        { code: 'TAICHUNG', name: 'Taichung' },
        { code: 'TAINAN', name: 'Tainan' },
        { code: 'HSINCHU', name: 'Hsinchu' },
        { code: 'TAIPEI', name: 'Taipei' }
      ]
    },
    { code: 'TAI', name: 'Taichung', type: 'province',
      cities: [
        { code: 'TAICHUNG', name: 'Taichung' },
        { code: 'TAINAN', name: 'Tainan' },
        { code: 'HSINCHU', name: 'Hsinchu' },
        { code: 'TAIPEI', name: 'Taipei' },
        { code: 'KAOHSIUNG', name: 'Kaohsiung' }
      ]
    },
    { code: 'TAN', name: 'Tainan', type: 'province',
      cities: [
        { code: 'TAINAN', name: 'Tainan' },
        { code: 'HSINCHU', name: 'Hsinchu' },
        { code: 'TAIPEI', name: 'Taipei' },
        { code: 'KAOHSIUNG', name: 'Kaohsiung' },
        { code: 'TAICHUNG', name: 'Taichung' }
      ]
    },
    { code: 'HSI', name: 'Hsinchu', type: 'province',
      cities: [
        { code: 'HSINCHU', name: 'Hsinchu' },
        { code: 'TAIPEI', name: 'Taipei' },
        { code: 'KAOHSIUNG', name: 'Kaohsiung' },
        { code: 'TAICHUNG', name: 'Taichung' },
        { code: 'TAINAN', name: 'Tainan' }
      ]
    }
  ]
};

export default taiwan;
