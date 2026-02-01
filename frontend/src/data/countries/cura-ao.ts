/**
 * Curaçao country data with municipalities and cities
 */

import { Country } from './index';

export const curaao: Country = {
  code: 'CW',
  name: 'Curaçao',
  flag: '🇨🇼',
  capital: 'Willemstad',
  area: 444,
  currencySymbol: 'ƒ',
  officialLanguages: ['Dutch', 'Papiamento', 'English', 'Spanish'],
  demonym: 'Curaçaoan',
  taxInfo: { standardRate: 6, taxName: 'VAT', currency: 'CWG', region: 'LATAM' },
  divisions: [
    { code: 'WIL', name: 'Willemstad', type: 'municipality',
      cities: [
        { code: 'WILLEMSTAD', name: 'Willemstad' },
        { code: 'OTROBANDA', name: 'Otrobanda' },
        { code: 'PIENAAR', name: 'Pienaar' },
        { code: 'BRIENENGAT', name: 'Briengat' },
        { code: 'RUSTENBURG', name: 'Rustenburg' }
      ]
    },
    { code: 'BAN', name: 'Bandabou', type: 'municipality',
      cities: [
        { code: 'BANDABOU', name: 'Bandabou' },
        { code: 'WESTPUNT', name: 'Westpunt' },
        { code: 'LAGUN', name: 'Lagun' },
        { code: 'KNIP', name: 'Knip' },
        { code: 'BARBER', name: 'Barber' }
      ]
    }
  ]
};
