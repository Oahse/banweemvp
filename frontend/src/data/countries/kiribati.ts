/**
 * Kiribati country data with islands and cities
 */

import { Country } from './index';

export const kiribati: Country = {
  code: 'KI',
  name: 'Kiribati',
  flag: '🇰🇮',
  capital: 'Tarawa',
  area: 811,
  currencySymbol: '$',
  officialLanguages: ['English', 'Gilbertese'],
  demonym: 'I-Kiribati',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'TAR', name: 'Tarawa', type: 'island',
      cities: [
        { code: 'TARAWA', name: 'Tarawa' },
        { code: 'KIRITIMATI', name: 'Kiritimati' },
        { code: 'TABITEUEA', name: 'Tabiteuea' },
        { code: 'ABAIANG', name: 'Abaiang' },
        { code: 'MAIANA', name: 'Maiana' }
      ]
    },
    { code: 'KIR', name: 'Kiritimati', type: 'island',
      cities: [
        { code: 'KIRITIMATI', name: 'Kiritimati' },
        { code: 'TABITEUEA', name: 'Tabiteuea' },
        { code: 'ABAIANG', name: 'Abaiang' },
        { code: 'MAIANA', name: 'Maiana' },
        { code: 'TARAWA', name: 'Tarawa' }
      ]
    },
    { code: 'TAB', name: 'Tabiteuea', type: 'island',
      cities: [
        { code: 'TABITEUEA', name: 'Tabiteuea' },
        { code: 'ABAIANG', name: 'Abaiang' },
        { code: 'MAIANA', name: 'Maiana' },
        { code: 'TARAWA', name: 'Tarawa' },
        { code: 'KIRITIMATI', name: 'Kiritimati' }
      ]
    },
    { code: 'ABA', name: 'Abaiang', type: 'island',
      cities: [
        { code: 'ABAIANG', name: 'Abaiang' },
        { code: 'MAIANA', name: 'Maiana' },
        { code: 'TARAWA', name: 'Tarawa' },
        { code: 'KIRITIMATI', name: 'Kiritimati' },
        { code: 'TABITEUEA', name: 'Tabiteuea' }
      ]
    },
    { code: 'MAI', name: 'Maiana', type: 'island',
      cities: [
        { code: 'MAIANA', name: 'Maiana' },
        { code: 'TARAWA', name: 'Tarawa' },
        { code: 'KIRITIMATI', name: 'Kiritimati' },
        { code: 'TABITEUEA', name: 'Tabiteuea' },
        { code: 'ABAIANG', name: 'Abaiang' }
      ]
    }
  ]
};
