/**
 * Croatia country data with counties and cities
 */

import { Country } from './index';

export const croatia: Country = {
  code: 'HR',
  name: 'Croatia',
  flag: '🇭🇷',
  capital: 'Zagreb',
  area: 56594,
  currencySymbol: 'kn',
  officialLanguages: ['Croatian'],
  demonym: 'Croatian',
  taxInfo: { standardRate: 25, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'ZAG', name: 'Zagreb', type: 'county',
      cities: [
        { code: 'ZAGREB', name: 'Zagreb' },
        { code: 'SPLIT', name: 'Split' },
        { code: 'RIJEKA', name: 'Rijeka' },
        { code: 'OSIJEK', name: 'Osijek' },
        { code: 'ZADAR', name: 'Zadar' }
      ]
    },
    { code: 'SPL', name: 'Split', type: 'county',
      cities: [
        { code: 'SPLIT', name: 'Split' },
        { code: 'RIJEKA', name: 'Rijeka' },
        { code: 'OSIJEK', name: 'Osijek' },
        { code: 'ZADAR', name: 'Zadar' },
        { code: 'ZAGREB', name: 'Zagreb' }
      ]
    },
    { code: 'RIJ', name: 'Rijeka', type: 'county',
      cities: [
        { code: 'RIJEKA', name: 'Rijeka' },
        { code: 'OSIJEK', name: 'Osijek' },
        { code: 'ZADAR', name: 'Zadar' },
        { code: 'ZAGREB', name: 'Zagreb' },
        { code: 'SPLIT', name: 'Split' }
      ]
    },
    { code: 'OSI', name: 'Osijek', type: 'county',
      cities: [
        { code: 'OSIJEK', name: 'Osijek' },
        { code: 'ZADAR', name: 'Zadar' },
        { code: 'ZAGREB', name: 'Zagreb' },
        { code: 'SPLIT', name: 'Split' },
        { code: 'RIJEKA', name: 'Rijeka' }
      ]
    },
    { code: 'ZAD', name: 'Zadar', type: 'county',
      cities: [
        { code: 'ZADAR', name: 'Zadar' },
        { code: 'ZAGREB', name: 'Zagreb' },
        { code: 'SPLIT', name: 'Split' },
        { code: 'RIJEKA', name: 'Rijeka' },
        { code: 'OSIJEK', name: 'Osijek' }
      ]
    }
  ]
};
