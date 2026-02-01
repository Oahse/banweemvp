/**
 * Belgium country data with regions and cities
 */

import { Country } from './index';

export const belgium: Country = {
  code: 'BE',
  name: 'Belgium',
  flag: '🇧🇪',
  capital: 'Brussels',
  area: 30528,
  currencySymbol: '€',
  officialLanguages: ['Dutch', 'French', 'German'],
  demonym: 'Belgian',
  taxInfo: { standardRate: 21, taxName: 'BTW', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'BRU', name: 'Brussels', type: 'region',
      cities: [
        { code: 'BRUSSELS', name: 'Brussels' },
        { code: 'ANTWERP', name: 'Antwerp' },
        { code: 'GHENT', name: 'Ghent' },
        { code: 'CHARLEROI', name: 'Charleroi' },
        { code: 'LIEGE', name: 'Liège' }
      ]
    },
    { code: 'ANT', name: 'Antwerp', type: 'region',
      cities: [
        { code: 'ANTWERP', name: 'Antwerp' },
        { code: 'GHENT', name: 'Ghent' },
        { code: 'CHARLEROI', name: 'Charleroi' },
        { code: 'LIEGE', name: 'Liège' },
        { code: 'BRUSSELS', name: 'Brussels' }
      ]
    },
    { code: 'GHE', name: 'Ghent', type: 'region',
      cities: [
        { code: 'GHENT', name: 'Ghent' },
        { code: 'CHARLEROI', name: 'Charleroi' },
        { code: 'LIEGE', name: 'Liège' },
        { code: 'BRUSSELS', name: 'Brussels' },
        { code: 'ANTWERP', name: 'Antwerp' }
      ]
    },
    { code: 'CHA', name: 'Charleroi', type: 'region',
      cities: [
        { code: 'CHARLEROI', name: 'Charleroi' },
        { code: 'LIEGE', name: 'Liège' },
        { code: 'BRUSSELS', name: 'Brussels' },
        { code: 'ANTWERP', name: 'Antwerp' },
        { code: 'GHENT', name: 'Ghent' }
      ]
    },
    { code: 'LIE', name: 'Liège', type: 'region',
      cities: [
        { code: 'LIEGE', name: 'Liège' },
        { code: 'BRUSSELS', name: 'Brussels' },
        { code: 'ANTWERP', name: 'Antwerp' },
        { code: 'GHENT', name: 'Ghent' },
        { code: 'CHARLEROI', name: 'Charleroi' }
      ]
    }
  ]
};
