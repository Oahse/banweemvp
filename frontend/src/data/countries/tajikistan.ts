/**
 * Tajikistan country data with regions and cities
 */

import { Country } from './index';

export const tajikistan: Country = {
  code: 'TJ',
  name: 'Tajikistan',
  flag: '🇹🇯',
  capital: 'Dushanbe',
  area: 143100,
  currencySymbol: 'с',
  officialLanguages: ['Tajik', 'Russian'],
  demonym: 'Tajik',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'TJS', region: 'APAC' },
  divisions: [
    { code: 'DUS', name: 'Dushanbe', type: 'region',
      cities: [
        { code: 'DUSHANBE', name: 'Dushanbe' },
        { code: 'KHUJAND', name: 'Khujand' },
        {code: 'KULOB', name: 'Kulob' },
        { code: 'KHOROG', name: 'Khorog' },
        { code: 'ISTARAV', name: 'Istaravshan' }
      ]
    },
    { code: 'KHU', name: 'Khujand', type: 'region',
      cities: [
        { code: 'KHUJAND', name: 'Khujand' },
        { code: 'KULOB', name: 'Kulob' },
        { code: 'KHOROG', name: 'Khorog' },
        { code: 'ISTARAV', name: 'Istaravshan' },
        { code: 'DUSHANBE', name: 'Dushanbe' }
      ]
    },
    { code: 'KUL', name: 'Kulob', type: 'region',
      cities: [
        { code: 'KULOB', name: 'Kulob' },
        { code: 'KHOROG', name: 'Khorog' },
        { code: 'ISTARAV', name: 'Istaravshan' },
        { code: 'DUSHANBE', name: 'Dushanbe' },
        { code: 'KHUJAND', name: 'Khujand' }
      ]
    },
    { code: 'KHO', name: 'Khorog', type: 'region',
      cities: [
        { code: 'KHOROG', name: 'Khorog' },
        { code: 'ISTARAV', name: 'Istaravshan' },
        { code: 'DUSHANBE', name: 'Dushanbe' },
        { code: 'KHUJAND', name: 'Khujand' },
        { code: 'KULOB', name: 'Kulob' }
      ]
    },
    { code: 'IST', name: 'Istaravshan', type: 'region',
      cities: [
        { code: 'ISTARAV', name: 'Istaravshan' },
        { code: 'DUSHANBE', name: 'Dushanbe' },
        { code: 'KHUJAND', name: 'Khujand' },
        { code: 'KULOB', name: 'Kulob' },
        { code: 'KHOROG', name: 'Khorog' }
      ]
    }
  ]
};

export default tajikistan;
