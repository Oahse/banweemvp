/**
 * Nicaragua country data with departments and cities
 */

import { Country } from './index';

export const nicaragua: Country = {
  code: 'NI',
  name: 'Nicaragua',
  flag: '🇳🇮',
  capital: 'Managua',
  area: 130373,
  currencySymbol: 'C$',
  officialLanguages: ['Spanish'],
  demonym: 'Nicaraguan',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'NIO', region: 'NA' },
  divisions: [
    { code: 'MAN', name: 'Managua', type: 'department',
      cities: [
        { code: 'MANAGUA', name: 'Managua' },
        { code: 'MASAYA', name: 'Masaya' },
        { code: 'GRANADA', name: 'Granada' },
        { code: 'LEON', name: 'León' },
        { code: 'CHINANDEGA', name: 'Chinandega' }
      ]
    },
    { code: 'MAS', name: 'Masaya', type: 'department',
      cities: [
        { code: 'MASAYA', name: 'Masaya' },
        { code: 'GRANADA', name: 'Granada' },
        { code: 'LEON', name: 'León' },
        { code: 'CHINANDEGA', name: 'Chinandega' },
        { code: 'MANAGUA', name: 'Managua' }
      ]
    },
    { code: 'GRA', name: 'Granada', type: 'department',
      cities: [
        { code: 'GRANADA', name: 'Granada' },
        { code: 'LEON', name: 'León' },
        { code: 'CHINANDEGA', name: 'Chinandega' },
        { code: 'MANAGUA', name: 'Managua' },
        { code: 'MASAYA', name: 'Masaya' }
      ]
    },
    { code: 'LEO', name: 'León', type: 'department',
      cities: [
        { code: 'LEON', name: 'León' },
        { code: 'CHINANDEGA', name: 'Chinandega' },
        { code: 'MANAGUA', name: 'Managua' },
        { code: 'MASAYA', name: 'Masaya' },
        { code: 'GRANADA', name: 'Granada' }
      ]
    },
    { code: 'CHI', name: 'Chinandega', type: 'department',
      cities: [
        { code: 'CHINANDEGA', name: 'Chinandega' },
        { code: 'MANAGUA', name: 'Managua' },
        { code: 'MASAYA', name: 'Masaya' },
        { code: 'GRANADA', name: 'Granada' },
        { code: 'LEON', name: 'León' }
      ]
    }
  ]
};
