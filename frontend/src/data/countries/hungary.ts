/**
 * Hungary country data with counties and cities
 */

import { Country } from './index';

export const hungary: Country = {
  code: 'HU',
  name: 'Hungary',
  flag: '🇭🇺',
  capital: 'Budapest',
  area: 93028,
  currencySymbol: 'Ft',
  officialLanguages: ['Hungarian'],
  demonym: 'Hungarian',
  taxInfo: { standardRate: 27, taxName: 'VAT', currency: 'HUF', region: 'EU' },
  divisions: [
    { code: 'BUD', name: 'Budapest', type: 'county',
      cities: [
        { code: 'BUDAPEST', name: 'Budapest' },
        { code: 'DEBRECEN', name: 'Debrecen' },
        { code: 'SZEGED', name: 'Szeged' },
        { code: 'MISKOLC', name: 'Miskolc' },
        { code: 'PECS', name: 'Pécs' }
      ]
    },
    { code: 'DEB', name: 'Debrecen', type: 'county',
      cities: [
        { code: 'DEBRECEN', name: 'Debrecen' },
        { code: 'SZEGED', name: 'Szeged' },
        { code: 'MISKOLC', name: 'Miskolc' },
        { code: 'PECS', name: 'Pécs' },
        { code: 'BUDAPEST', name: 'Budapest' }
      ]
    },
    { code: 'SZE', name: 'Szeged', type: 'county',
      cities: [
        { code: 'SZEGED', name: 'Szeged' },
        { code: 'MISKOLC', name: 'Miskolc' },
        { code: 'PECS', name: 'Pécs' },
        { code: 'BUDAPEST', name: 'Budapest' },
        { code: 'DEBRECEN', name: 'Debrecen' }
      ]
    },
    { code: 'MIS', name: 'Miskolc', type: 'county',
      cities: [
        { code: 'MISKOLC', name: 'Miskolc' },
        { code: 'PECS', name: 'Pécs' },
        { code: 'BUDAPEST', name: 'Budapest' },
        { code: 'DEBRECEN', name: 'Debrecen' },
        { code: 'SZEGED', name: 'Szeged' }
      ]
    },
    { code: 'PEC', name: 'Pécs', type: 'county',
      cities: [
        { code: 'PECS', name: 'Pécs' },
        { code: 'BUDAPEST', name: 'Budapest' },
        { code: 'DEBRECEN', name: 'Debrecen' },
        { code: 'SZEGED', name: 'Szeged' },
        { code: 'MISKOLC', name: 'Miskolc' }
      ]
    }
  ]
};
