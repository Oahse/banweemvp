/**
 * San Marino country data with castles and cities
 */

import { Country } from './index';

export const sanmarino: Country = {
  code: 'SM',
  name: 'San Marino',
  flag: '🇸🇲',
  capital: 'San Marino',
  area: 61,
  currencySymbol: '€',
  officialLanguages: ['Italian'],
  demonym: 'Sammarinese',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'SAN', name: 'San Marino', type: 'castle',
      cities: [
        { code: 'SAN MARINO', name: 'San Marino' },
        { code: 'BORGOMAGGIORE', name: 'Borgo Maggiore' },
        { code: 'SESTO', name: 'Serravalle' },
        { code: 'DOMAGNANO', name: 'Domagnano' },
        { code: 'FIORANO', name: 'Fiorentino' }
      ]
    },
    { code: 'BOR', name: 'Borgo Maggiore', type: 'castle',
      cities: [
        { code: 'BORGOMAGGIORE', name: 'Borgo Maggiore' },
        { code: 'SESTO', name: 'Serravalle' },
        { code: 'DOMAGNANO', name: 'Domagnano' },
        { code: 'FIORANO', name: 'Fiorentino' },
        { code: 'SAN MARINO', name: 'San Marino' }
      ]
    },
    { code: 'SER', name: 'Serravalle', type: 'castle',
      cities: [
        { code: 'SESTO', name: 'Serravalle' },
        { code: 'DOMAGNANO', name: 'Domagnano' },
        { code: 'FIORANO', name: 'Fiorentino' },
        { code: 'SAN MARINO', name: 'San Marino' },
        { code: 'BORGOMAGGIORE', name: 'Borgo Maggiore' }
      ]
    },
    { code: 'DOM', name: 'Domagnano', type: 'castle',
      cities: [
        { code: 'DOMAGNANO', name: 'Domagnano' },
        { code: 'FIORANO', name: 'Fiorentino' },
        { code: 'SAN MARINO', name: 'San Marino' },
        { code: 'BORGOMAGGIORE', name: 'Borgo Maggiore' },
        { code: 'SESTO', name: 'Serravalle' }
      ]
    },
    { code: 'FIO', name: 'Fiorentino', type: 'castle',
      cities: [
        { code: 'FIORANO', name: 'Fiorentino' },
        { code: 'SAN MARINO', name: 'San Marino' },
        { code: 'BORGOMAGGIORE', name: 'Borgo Maggiore' },
        { code: 'SESTO', name: 'Serravalle' },
        { code: 'DOMAGNANO', name: 'Domagnano' }
      ]
    }
  ]
};
