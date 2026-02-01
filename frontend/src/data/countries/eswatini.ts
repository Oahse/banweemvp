/**
 * Eswatini country data with regions and cities
 */

import { Country } from './index';

export const eswatini: Country = {
  code: 'SZ',
  name: 'Eswatini',
  flag: '🇸🇿',
  capital: 'Mbabane',
  area: 17364,
  currencySymbol: 'E',
  officialLanguages: ['Swazi', 'English'],
  demonym: 'Swazi',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SZL', region: 'MEA' },
  divisions: [
    { code: 'HHO', name: 'Hhohho', type: 'region',
      cities: [
        { code: 'MBABANE', name: 'Mbabane' },
        { code: 'MANZINI', name: 'Manzini' },
        { code: 'BIG', name: 'Big Bend' },
        { code: 'SITEKI', name: 'Siteki' },
        { code: 'NHLANGANO', name: 'Nhlangano' },
        { code: 'PIGGS', name: 'Piggs Peak' },
        { code: 'SIMUNYE', name: 'Simunye' },
        { code: 'MATSAPHA', name: 'Matsapha' },
        { code: 'MALKERNS', name: 'Malkerns' },
        { code: 'EZULWINI', name: 'Ezulwini' }
      ]
    },
    { code: 'LUB', name: 'Lubombo', type: 'region',
      cities: [
        { code: 'SITEKI', name: 'Siteki' },
        { code: 'BIG', name: 'Big Bend' },
        { code: 'NHLANGANO', name: 'Nhlangano' },
        { code: 'PIGGS', name: 'Piggs Peak' },
        { code: 'SIMUNYE', name: 'Simunye' },
        { code: 'MATSAPHA', name: 'Matsapha' },
        { code: 'MALKERNS', name: 'Malkerns' },
        { code: 'EZULWINI', name: 'Ezulwini' },
        { code: 'MBABANE', name: 'Mbabane' },
        { code: 'MANZINI', name: 'Manzini' }
      ]
    },
    { code: 'MAN', name: 'Manzini', type: 'region',
      cities: [
        { code: 'MANZINI', name: 'Manzini' },
        { code: 'BIG', name: 'Big Bend' },
        { code: 'NHLANGANO', name: 'Nhlangano' },
        { code: 'PIGGS', name: 'Piggs Peak' },
        { code: 'SIMUNYE', name: 'Simunye' },
        { code: 'MATSAPHA', name: 'Matsapha' },
        { code: 'MALKERNS', name: 'Malkerns' },
        { code: 'EZULWINI', name: 'Ezulwini' },
        { code: 'MBABANE', name: 'Mbabane' },
        { code: 'SITEKI', name: 'Siteki' }
      ]
    },
    { code: 'SHI', name: 'Shiselweni', type: 'region',
      cities: [
        { code: 'NHLANGANO', name: 'Nhlangano' },
        { code: 'PIGGS', name: 'Piggs Peak' },
        { code: 'SIMUNYE', name: 'Simunye' },
        { code: 'MATSAPHA', name: 'Matsapha' },
        { code: 'MALKERNS', name: 'Malkerns' },
        { code: 'EZULWINI', name: 'Ezulwini' },
        { code: 'MBABANE', name: 'Mbabane' },
        { code: 'MANZINI', name: 'Manzini' },
        { code: 'BIG', name: 'Big Bend' },
        { code: 'SITEKI', name: 'Siteki' }
      ]
    }
  ]
};

export default eswatini;
