/**
 * Lebanon country data with governorates and cities
 */

import { Country } from './index';

export const lebanon: Country = {
  code: 'LB',
  name: 'Lebanon',
  flag: '🇱🇧',
  capital: 'Beirut',
  area: 10452,
  currencySymbol: 'ل.ل',
  officialLanguages: ['Arabic', 'French', 'English'],
  demonym: 'Lebanese',
  taxInfo: { standardRate: 11, taxName: 'VAT', currency: 'LBP', region: 'MEA' },
  divisions: [
    { code: 'BEI', name: 'Beirut', type: 'governorate',
      cities: [
        { code: 'BEIRUT', name: 'Beirut' },
        { code: 'TRIPOLI', name: 'Tripoli' },
        { code: 'SIDON', name: 'Sidon' },
        { code: 'TYRE', name: 'Tyre' },
        { code: 'JOUNIEH', name: 'Jounieh' }
      ]
    },
    { code: 'TRI', name: 'Tripoli', type: 'governorate',
      cities: [
        { code: 'TRIPOLI', name: 'Tripoli' },
        { code: 'SIDON', name: 'Sidon' },
        { code: 'TYRE', name: 'Tyre' },
        { code: 'JOUNIEH', name: 'Jounieh' },
        { code: 'BEIRUT', name: 'Beirut' }
      ]
    },
    { code: 'SID', name: 'Sidon', type: 'governorate',
      cities: [
        { code: 'SIDON', name: 'Sidon' },
        { code: 'TYRE', name: 'Tyre' },
        { code: 'JOUNIEH', name: 'Jounieh' },
        { code: 'BEIRUT', name: 'Beirut' },
        { code: 'TRIPOLI', name: 'Tripoli' }
      ]
    },
    { code: 'TYR', name: 'Tyre', type: 'governorate',
      cities: [
        { code: 'TYRE', name: 'Tyre' },
        { code: 'JOUNIEH', name: 'Jounieh' },
        { code: 'BEIRUT', name: 'Beirut' },
        { code: 'TRIPOLI', name: 'Tripoli' },
        { code: 'SIDON', name: 'Sidon' }
      ]
    },
    { code: 'JOU', name: 'Jounieh', type: 'governorate',
      cities: [
        { code: 'JOUNIEH', name: 'Jounieh' },
        { code: 'BEIRUT', name: 'Beirut' },
        { code: 'TRIPOLI', name: 'Tripoli' },
        { code: 'SIDON', name: 'Sidon' },
        { code: 'TYRE', name: 'Tyre' }
      ]
    }
  ]
};

export default lebanon;
