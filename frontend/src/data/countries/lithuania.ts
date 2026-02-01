/**
 * Lithuania country data with counties and cities
 */

import { Country } from './index';

export const lithuania: Country = {
  code: 'LT',
  name: 'Lithuania',
  flag: '🇱🇹',
  capital: 'Vilnius',
  area: 65300,
  currencySymbol: '€',
  officialLanguages: ['Lithuanian'],
  demonym: 'Lithuanian',
  taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'VIL', name: 'Vilnius', type: 'county',
      cities: [
        { code: 'VILNIUS', name: 'Vilnius' },
        { code: 'KAUNAS', name: 'Kaunas' },
        { code: 'KLAIPEDA', name: 'Klaipėda' },
        { code: 'SIAULIAI', name: 'Šiauliai' },
        { code: 'PANEVEZYS', name: 'Panevėžys' }
      ]
    },
    { code: 'KAU', name: 'Kaunas', type: 'county',
      cities: [
        { code: 'KAUNAS', name: 'Kaunas' },
        { code: 'KLAIPEDA', name: 'Klaipėda' },
        { code: 'SIAULIAI', name: 'Šiauliai' },
        { code: 'PANEVEZYS', name: 'Panevėžys' },
        { code: 'VILNIUS', name: 'Vilnius' }
      ]
    },
    { code: 'KLA', name: 'Klaipėda', type: 'county',
      cities: [
        { code: 'KLAIPEDA', name: 'Klaipėda' },
        { code: 'SIAULIAI', name: 'Šiauliai' },
        { code: 'PANEVEZYS', name: 'Panevėžys' },
        { code: 'VILNIUS', name: 'Vilnius' },
        { code: 'KAUNAS', name: 'Kaunas' }
      ]
    },
    { code: 'SIA', name: 'Šiauliai', type: 'county',
      cities: [
        { code: 'SIAULIAI', name: 'Šiauliai' },
        { code: 'PANEVEZYS', name: 'Panevėžys' },
        { code: 'VILNIUS', name: 'Vilnius' },
        { code: 'KAUNAS', name: 'Kaunas' },
        { code: 'KLAIPEDA', name: 'Klaipėda' }
      ]
    },
    { code: 'PAN', name: 'Panevėžys', type: 'county',
      cities: [
        { code: 'PANEVEZYS', name: 'Panevėžys' },
        { code: 'VILNIUS', name: 'Vilnius' },
        { code: 'KAUNAS', name: 'Kaunas' },
        { code: 'KLAIPEDA', name: 'Klaipėda' },
        { code: 'SIAULIAI', name: 'Šiauliai' }
      ]
    }
  ]
};
