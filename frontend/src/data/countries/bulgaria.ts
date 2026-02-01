/**
 * Bulgaria country data with provinces and cities
 */

import { Country } from './index';

export const bulgaria: Country = {
  code: 'BG',
  name: 'Bulgaria',
  flag: '🇧🇬',
  capital: 'Sofia',
  area: 110994,
  currencySymbol: 'лв',
  officialLanguages: ['Bulgarian'],
  demonym: 'Bulgarian',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'BGN', region: 'EU' },
  divisions: [
    { code: 'SOF', name: 'Sofia', type: 'province',
      cities: [
        { code: 'SOFIA', name: 'Sofia' },
        { code: 'PLOVDIV', name: 'Plovdiv' },
        { code: 'VARNA', name: 'Varna' },
        { code: 'BURGAS', name: 'Burgas' },
        { code: 'RUSE', name: 'Ruse' }
      ]
    },
    { code: 'PLO', name: 'Plovdiv', type: 'province',
      cities: [
        { code: 'PLOVDIV', name: 'Plovdiv' },
        { code: 'VARNA', name: 'Varna' },
        { code: 'BURGAS', name: 'Burgas' },
        { code: 'RUSE', name: 'Ruse' },
        { code: 'SOFIA', name: 'Sofia' }
      ]
    },
    { code: 'VAR', name: 'Varna', type: 'province',
      cities: [
        { code: 'VARNA', name: 'Varna' },
        { code: 'BURGAS', name: 'Burgas' },
        { code: 'RUSE', name: 'Ruse' },
        { code: 'SOFIA', name: 'Sofia' },
        { code: 'PLOVDIV', name: 'Plovdiv' }
      ]
    },
    { code: 'BUR', name: 'Burgas', type: 'province',
      cities: [
        { code: 'BURGAS', name: 'Burgas' },
        { code: 'RUSE', name: 'Ruse' },
        { code: 'SOFIA', name: 'Sofia' },
        { code: 'PLOVDIV', name: 'Plovdiv' },
        { code: 'VARNA', name: 'Varna' }
      ]
    },
    { code: 'RUS', name: 'Ruse', type: 'province',
      cities: [
        { code: 'RUSE', name: 'Ruse' },
        { code: 'SOFIA', name: 'Sofia' },
        { code: 'PLOVDIV', name: 'Plovdiv' },
        { code: 'VARNA', name: 'Varna' },
        { code: 'BURGAS', name: 'Burgas' }
      ]
    }
  ]
};
