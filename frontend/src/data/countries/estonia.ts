/**
 * Estonia country data with counties and cities
 */

import { Country } from './index';

export const estonia: Country = {
  code: 'EE',
  name: 'Estonia',
  flag: '🇪🇪',
  capital: 'Tallinn',
  area: 45227,
  currencySymbol: '€',
  officialLanguages: ['Estonian'],
  demonym: 'Estonian',
  taxInfo: { standardRate: 22, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'TAL', name: 'Tallinn', type: 'county',
      cities: [
        { code: 'TALLINN', name: 'Tallinn' },
        { code: 'TARTU', name: 'Tartu' },
        { code: 'NARVA', name: 'Narva' },
        { code: 'PARNU', name: 'Pärnu' },
        { code: 'KOHTLA-JARVE', name: 'Kohtla-Järve' }
      ]
    },
    { code: 'TAR', name: 'Tartu', type: 'county',
      cities: [
        { code: 'TARTU', name: 'Tartu' },
        { code: 'NARVA', name: 'Narva' },
        { code: 'PARNU', name: 'Pärnu' },
        { code: 'KOHTLA-JARVE', name: 'Kohtla-Järve' },
        { code: 'TALLINN', name: 'Tallinn' }
      ]
    },
    { code: 'NAR', name: 'Narva', type: 'county',
      cities: [
        { code: 'NARVA', name: 'Narva' },
        { code: 'PARNU', name: 'Pärnu' },
        { code: 'KOHTLA-JARVE', name: 'Kohtla-Järve' },
        { code: 'TALLINN', name: 'Tallinn' },
        { code: 'TARTU', name: 'Tartu' }
      ]
    },
    { code: 'PAR', name: 'Pärnu', type: 'county',
      cities: [
        { code: 'PARNU', name: 'Pärnu' },
        { code: 'KOHTLA-JARVE', name: 'Kohtla-Järve' },
        { code: 'TALLINN', name: 'Tallinn' },
        { code: 'TARTU', name: 'Tartu' },
        { code: 'NARVA', name: 'Narva' }
      ]
    },
    { code: 'KOH', name: 'Kohtla-Järve', type: 'county',
      cities: [
        { code: 'KOHTLA-JARVE', name: 'Kohtla-Järve' },
        { code: 'TALLINN', name: 'Tallinn' },
        { code: 'TARTU', name: 'Tartu' },
        { code: 'NARVA', name: 'Narva' },
        { code: 'PARNU', name: 'Pärnu' }
      ]
    }
  ]
};
