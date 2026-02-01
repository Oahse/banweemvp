/**
 * Palau country data with states and cities
 */

import { Country } from './index';

export const palau: Country = {
  code: 'PW',
  name: 'Palau',
  flag: '🇵🇼',
  capital: 'Ngerulmud',
  area: 459,
  currencySymbol: '$',
  officialLanguages: ['English', 'Palauan'],
  demonym: 'Palauan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'NGE', name: 'Melekeok', type: 'state',
      cities: [
        { code: 'NGERULMUD', name: 'Ngerulmud' },
        { code: 'KOROR', name: 'Koror' },
        { code: 'PELELIU', name: 'Peleliu' },
        { code: 'ANGAUR', name: 'Angaur' },
        { code: 'AIRAI', name: 'Airai' }
      ]
    },
    { code: 'KOR', name: 'Koror', type: 'state',
      cities: [
        { code: 'KOROR', name: 'Koror' },
        { code: 'PELELIU', name: 'Peleliu' },
        { code: 'ANGAUR', name: 'Angaur' },
        { code: 'AIRAI', name: 'Airai' },
        { code: 'NGERULMUD', name: 'Ngerulmud' }
      ]
    },
    { code: 'PEL', name: 'Peleliu', type: 'state',
      cities: [
        { code: 'PELELIU', name: 'Peleliu' },
        { code: 'ANGAUR', name: 'Angaur' },
        { code: 'AIRAI', name: 'Airai' },
        { code: 'NGERULMUD', name: 'Ngerulmud' },
        { code: 'KOROR', name: 'Koror' }
      ]
    },
    { code: 'ANG', name: 'Angaur', type: 'state',
      cities: [
        { code: 'ANGAUR', name: 'Angaur' },
        { code: 'AIRAI', name: 'Airai' },
        { code: 'NGERULMUD', name: 'Ngerulmud' },
        { code: 'KOROR', name: 'Koror' },
        { code: 'PELELIU', name: 'Peleliu' }
      ]
    },
    { code: 'AIR', name: 'Airai', type: 'state',
      cities: [
        { code: 'AIRAI', name: 'Airai' },
        { code: 'NGERULMUD', name: 'Ngerulmud' },
        { code: 'KOROR', name: 'Koror' },
        { code: 'PELELIU', name: 'Peleliu' },
        { code: 'ANGAUR', name: 'Angaur' }
      ]
    }
  ]
};
