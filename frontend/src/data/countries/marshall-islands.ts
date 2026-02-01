/**
 * Marshall Islands country data with atolls and cities
 */

import { Country } from './index';

export const marshallislands: Country = {
  code: 'MH',
  name: 'Marshall Islands',
  flag: '🇲🇲',
  capital: 'Majuro',
  area: 181,
  currencySymbol: '$',
  officialLanguages: ['English', 'Marshallese'],
  demonym: 'Marshallese',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'MAJ', name: 'Majuro', type: 'atoll',
      cities: [
        { code: 'MAJURO', name: 'Majuro' },
        { code: 'EBEYE', name: 'Ebeye' },
        { code: 'JALUIT', name: 'Jaluit' },
        { code: 'WOTJE', name: 'Wotje' },
        { code: 'KWAJALEIN', name: 'Kwajalein' }
      ]
    },
    { code: 'EBE', name: 'Ebeye', type: 'atoll',
      cities: [
        { code: 'EBEYE', name: 'Ebeye' },
        { code: 'JALUIT', name: 'Jaluit' },
        { code: 'WOTJE', name: 'Wotje' },
        { code: 'KWAJALEIN', name: 'Kwajalein' },
        { code: 'MAJURO', name: 'Majuro' }
      ]
    },
    { code: 'JAL', name: 'Jaluit', type: 'atoll',
      cities: [
        { code: 'JALUIT', name: 'Jaluit' },
        { code: 'WOTJE', name: 'Wotje' },
        { code: 'KWAJALEIN', name: 'Kwajalein' },
        { code: 'MAJURO', name: 'Majuro' },
        { code: 'EBEYE', name: 'Ebeye' }
      ]
    },
    { code: 'WOT', name: 'Wotje', type: 'atoll',
      cities: [
        { code: 'WOTJE', name: 'Wotje' },
        { code: 'KWAJALEIN', name: 'Kwajalein' },
        { code: 'MAJURO', name: 'Majuro' },
        { code: 'EBEYE', name: 'Ebeye' },
        { code: 'JALUIT', name: 'Jaluit' }
      ]
    },
    { code: 'KWA', name: 'Kwajalein', type: 'atoll',
      cities: [
        { code: 'KWAJALEIN', name: 'Kwajalein' },
        { code: 'MAJURO', name: 'Majuro' },
        { code: 'EBEYE', name: 'Ebeye' },
        { code: 'JALUIT', name: 'Jaluit' },
        { code: 'WOTJE', name: 'Wotje' }
      ]
    }
  ]
};
