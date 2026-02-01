/**
 * Qatar country data with municipalities and cities
 */

import { Country } from './index';

export const qatar: Country = {
  code: 'QA',
  name: 'Qatar',
  flag: '🇶🇦',
  capital: 'Doha',
  area: 11586,
  currencySymbol: 'ر.ق',
  officialLanguages: ['Arabic', 'English'],
  demonym: 'Qatari',
  taxInfo: { standardRate: 5, taxName: 'VAT', currency: 'QAR', region: 'MEA' },
  divisions: [
    { code: 'DOH', name: 'Doha', type: 'municipality',
      cities: [
        { code: 'DOHA', name: 'Doha' },
        { code: 'RAYYAN', name: 'Rayyan' },
        { code: 'AL KHOR', name: 'Al Khor' },
        { code: 'UMM', name: 'Umm Salal' },
        { code: 'AL WAKRAH', name: 'Al Wakrah' }
      ]
    },
    { code: 'RAY', name: 'Rayyan', type: 'municipality',
      cities: [
        { code: 'RAYYAN', name: 'Rayyan' },
        { code: 'AL KHOR', name: 'Al Khor' },
        { code: 'UMM', name: 'Umm Salal' },
        { code: 'AL WAKRAH', name: 'Al Wakrah' },
        { code: 'DOHA', name: 'Doha' }
      ]
    },
    { code: 'ALK', name: 'Al Khor', type: 'municipality',
      cities: [
        { code: 'AL KHOR', name: 'Al Khor' },
        { code: 'UMM', name: 'Umm Salal' },
        { code: 'AL WAKRAH', name: 'Al Wakrah' },
        { code: 'DOHA', name: 'Doha' },
        { code: 'RAYYAN', name: 'Rayyan' }
      ]
    },
    { code: 'UMM', name: 'Umm Salal', type: 'municipality',
      cities: [
        { code: 'UMM', name: 'Umm Salal' },
        { code: 'AL WAKRAH', name: 'Al Wakrah' },
        { code: 'DOHA', name: 'Doha' },
        { code: 'RAYYAN', name: 'Rayyan' },
        { code: 'AL KHOR', name: 'Al Khor' }
      ]
    },
    { code: 'ALW', name: 'Al Wakrah', type: 'municipality',
      cities: [
        { code: 'AL WAKRAH', name: 'Al Wakrah' },
        { code: 'DOHA', name: 'Doha' },
        { code: 'RAYYAN', name: 'Rayyan' },
        { code: 'AL KHOR', name: 'Al Khor' },
        { code: 'UMM', name: 'Umm Salal' }
      ]
    }
  ]
};

export default qatar;
