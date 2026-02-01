/**
 * Czechia country data with regions and cities
 */

import { Country } from './index';

export const czechia: Country = {
  code: 'CZ',
  name: 'Czechia',
  flag: '🇨🇿',
  capital: 'Prague',
  area: 78866,
  currencySymbol: 'Kč',
  officialLanguages: ['Czech'],
  demonym: 'Czech',
  taxInfo: { standardRate: 21, taxName: 'VAT', currency: 'CZK', region: 'EU' },
  divisions: [
    { code: 'PRG', name: 'Prague', type: 'region',
      cities: [
        { code: 'PRAGUE', name: 'Prague' },
        { code: 'BRNO', name: 'Brno' },
        { code: 'OSTRAVA', name: 'Ostrava' },
        { code: 'PLZEN', name: 'Plzeň' },
        { code: 'LIBEREC', name: 'Liberec' }
      ]
    },
    { code: 'BRN', name: 'Brno', type: 'region',
      cities: [
        { code: 'BRNO', name: 'Brno' },
        { code: 'OSTRAVA', name: 'Ostrava' },
        { code: 'PLZEN', name: 'Plzeň' },
        { code: 'LIBEREC', name: 'Liberec' },
        { code: 'PRAGUE', name: 'Prague' }
      ]
    },
    { code: 'OST', name: 'Ostrava', type: 'region',
      cities: [
        { code: 'OSTRAVA', name: 'Ostrava' },
        { code: 'PLZEN', name: 'Plzeň' },
        { code: 'LIBEREC', name: 'Liberec' },
        { code: 'PRAGUE', name: 'Prague' },
        { code: 'BRNO', name: 'Brno' }
      ]
    },
    { code: 'PLZ', name: 'Plzeň', type: 'region',
      cities: [
        { code: 'PLZEN', name: 'Plzeň' },
        { code: 'LIBEREC', name: 'Liberec' },
        { code: 'PRAGUE', name: 'Prague' },
        { code: 'BRNO', name: 'Brno' },
        { code: 'OSTRAVA', name: 'Ostrava' }
      ]
    },
    { code: 'LIB', name: 'Liberec', type: 'region',
      cities: [
        { code: 'LIBEREC', name: 'Liberec' },
        { code: 'PRAGUE', name: 'Prague' },
        { code: 'BRNO', name: 'Brno' },
        { code: 'OSTRAVA', name: 'Ostrava' },
        { code: 'PLZEN', name: 'Plzeň' }
      ]
    }
  ]
};
