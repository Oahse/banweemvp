/**
 * Latvia country data with regions and cities
 */

import { Country } from './index';

export const latvia: Country = {
  code: 'LV',
  name: 'Latvia',
  flag: '🇱🇻',
  capital: 'Riga',
  area: 64589,
  currencySymbol: '€',
  officialLanguages: ['Latvian'],
  demonym: 'Latvian',
  taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'RIG', name: 'Riga', type: 'region',
      cities: [
        { code: 'RIGA', name: 'Riga' },
        { code: 'DAUGAVPILS', name: 'Daugavpils' },
        { code: 'LIEPAJA', name: 'Liepāja' },
        { code: 'JELGAVA', name: 'Jelgava' },
        { code: 'JURMALA', name: 'Jūrmala' }
      ]
    },
    { code: 'DAU', name: 'Latgale', type: 'region',
      cities: [
        { code: 'DAUGAVPILS', name: 'Daugavpils' },
        { code: 'LIEPAJA', name: 'Liepāja' },
        { code: 'JELGAVA', name: 'Jelgava' },
        { code: 'JURMALA', name: 'Jūrmala' },
        { code: 'RIGA', name: 'Riga' }
      ]
    },
    { code: 'LIE', name: 'Kurzeme', type: 'region',
      cities: [
        { code: 'LIEPAJA', name: 'Liepāja' },
        { code: 'JELGAVA', name: 'Jelgava' },
        { code: 'JURMALA', name: 'Jūrmala' },
        { code: 'RIGA', name: 'Riga' },
        { code: 'DAUGAVPILS', name: 'Daugavpils' }
      ]
    },
    { code: 'JEL', name: 'Zemgale', type: 'region',
      cities: [
        { code: 'JELGAVA', name: 'Jelgava' },
        { code: 'JURMALA', name: 'Jūrmala' },
        { code: 'RIGA', name: 'Riga' },
        { code: 'DAUGAVPILS', name: 'Daugavpils' },
        { code: 'LIEPAJA', name: 'Liepāja' }
      ]
    },
    { code: 'JUR', name: 'Vidzeme', type: 'region',
      cities: [
        { code: 'JURMALA', name: 'Jūrmala' },
        { code: 'RIGA', name: 'Riga' },
        { code: 'DAUGAVPILS', name: 'Daugavpils' },
        { code: 'LIEPAJA', name: 'Liepāja' },
        { code: 'JELGAVA', name: 'Jelgava' }
      ]
    }
  ]
};
