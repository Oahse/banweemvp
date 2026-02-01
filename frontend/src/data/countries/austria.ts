/**
 * Austria country data with states and cities
 */

import { Country } from './index';

export const austria: Country = {
  code: 'AT',
  name: 'Austria',
  flag: '🇦🇹',
  capital: 'Vienna',
  area: 83879,
  currencySymbol: '€',
  officialLanguages: ['German'],
  demonym: 'Austrian',
  taxInfo: { standardRate: 20, taxName: 'MwSt', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'VIE', name: 'Vienna', type: 'state',
      cities: [
        { code: 'VIENNA', name: 'Vienna' },
        { code: 'GRAZ', name: 'Graz' },
        { code: 'LINZ', name: 'Linz' },
        { code: 'SALZBURG', name: 'Salzburg' },
        { code: 'INNSBRUCK', name: 'Innsbruck' }
      ]
    },
    { code: 'GRA', name: 'Graz', type: 'state',
      cities: [
        { code: 'GRAZ', name: 'Graz' },
        { code: 'LINZ', name: 'Linz' },
        { code: 'SALZBURG', name: 'Salzburg' },
        { code: 'INNSBRUCK', name: 'Innsbruck' },
        { code: 'VIENNA', name: 'Vienna' }
      ]
    },
    { code: 'LIN', name: 'Linz', type: 'state',
      cities: [
        { code: 'LINZ', name: 'Linz' },
        { code: 'SALZBURG', name: 'Salzburg' },
        { code: 'INNSBRUCK', name: 'Innsbruck' },
        { code: 'VIENNA', name: 'Vienna' },
        { code: 'GRAZ', name: 'Graz' }
      ]
    },
    { code: 'SAL', name: 'Salzburg', type: 'state',
      cities: [
        { code: 'SALZBURG', name: 'Salzburg' },
        { code: 'INNSBRUCK', name: 'Innsbruck' },
        { code: 'VIENNA', name: 'Vienna' },
        { code: 'GRAZ', name: 'Graz' },
        { code: 'LINZ', name: 'Linz' }
      ]
    },
    { code: 'INN', name: 'Innsbruck', type: 'state',
      cities: [
        { code: 'INNSBRUCK', name: 'Innsbruck' },
        { code: 'VIENNA', name: 'Vienna' },
        { code: 'GRAZ', name: 'Graz' },
        { code: 'LINZ', name: 'Linz' },
        { code: 'SALZBURG', name: 'Salzburg' }
      ]
    }
  ]
};
