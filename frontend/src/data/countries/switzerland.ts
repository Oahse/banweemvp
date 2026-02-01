/**
 * Switzerland country data with cantons and cities
 */

import { Country } from './index';

export const switzerland: Country = {
  code: 'CH',
  name: 'Switzerland',
  flag: '🇨🇭',
  capital: 'Bern',
  area: 41285,
  currencySymbol: 'CHF',
  officialLanguages: ['German', 'French', 'Italian', 'Romansh'],
  demonym: 'Swiss',
  taxInfo: { standardRate: 7.7, taxName: 'MWST', currency: 'CHF', region: 'EU' },
  divisions: [
    { code: 'BER', name: 'Bern', type: 'canton',
      cities: [
        { code: 'BERN', name: 'Bern' },
        { code: 'ZURICH', name: 'Zurich' },
        { code: 'GENEVA', name: 'Geneva' },
        { code: 'BASEL', name: 'Basel' },
        { code: 'ST. GALLEN', name: 'St. Gallen' }
      ]
    },
    { code: 'ZUR', name: 'Zurich', type: 'canton',
      cities: [
        { code: 'ZURICH', name: 'Zurich' },
        { code: 'GENEVA', name: 'Geneva' },
        { code: 'BASEL', name: 'Basel' },
        { code: 'ST. GALLEN', name: 'St. Gallen' },
        { code: 'BERN', name: 'Bern' }
      ]
    },
    { code: 'GEN', name: 'Geneva', type: 'canton',
      cities: [
        { code: 'GENEVA', name: 'Geneva' },
        { code: 'BASEL', name: 'Basel' },
        { code: 'ST. GALLEN', name: 'St. Gallen' },
        { code: 'BERN', name: 'Bern' },
        { code: 'ZURICH', name: 'Zurich' }
      ]
    },
    { code: 'BAS', name: 'Basel', type: 'canton',
      cities: [
        { code: 'BASEL', name: 'Basel' },
        { code: 'ST. GALLEN', name: 'St. Gallen' },
        { code: 'BERN', name: 'Bern' },
        { code: 'ZURICH', name: 'Zurich' },
        { code: 'GENEVA', name: 'Geneva' }
      ]
    },
    { code: 'STG', name: 'St. Gallen', type: 'canton',
      cities: [
        { code: 'ST. GALLEN', name: 'St. Gallen' },
        { code: 'BERN', name: 'Bern' },
        { code: 'ZURICH', name: 'Zurich' },
        { code: 'GENEVA', name: 'Geneva' },
        { code: 'BASEL', name: 'Basel' }
      ]
    }
  ]
};
