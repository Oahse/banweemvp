/**
 * Vanuatu country data with provinces and cities
 */

import { Country } from './index';

export const vanuatu: Country = {
  code: 'VU',
  name: 'Vanuatu',
  flag: '🇻🇻',
  capital: 'Port Vila',
  area: 12189,
  currencySymbol: 'VT',
  officialLanguages: ['Bislama', 'English', 'French'],
  demonym: 'Ni-Vanuatu',
  taxInfo: { standardRate: 12.5, taxName: 'VAT', currency: 'VUV', region: 'APAC' },
  divisions: [
    { code: 'POR', name: 'Shefa', type: 'province',
      cities: [
        { code: 'PORT VILA', name: 'Port Vila' },
        { code: 'LUGANVILLE', name: 'Luganville' },
        {code: 'SOLA', name: 'Sola' },
        { code: 'ISLANDS', name: 'Islands' },
        { code: 'PENAMA', name: 'Penama' }
      ]
    },
    { code: 'LUG', name: 'Malampa', type: 'province',
      cities: [
        { code: 'LUGANVILLE', name: 'Luganville' },
        { code: 'SOLA', name: 'Sola' },
        { code: 'ISLANDS', name: 'Islands' },
        { code: 'PENAMA', name: 'Penama' },
        { code: 'PORT VILA', name: 'Port Vila' }
      ]
    },
    { code: 'SOL', name: 'Sanma', type: 'province',
      cities: [
        { code: 'SOLA', name: 'Sola' },
        { code: 'ISLANDS', name: 'Islands' },
        { code: 'PENAMA', name: 'Penama' },
        { code: 'PORT VILA', name: 'Port Vila' },
        { code: 'LUGANVILLE', name: 'Luganville' }
      ]
    },
    { code: 'ISL', name: 'Penama', type: 'province',
      cities: [
        { code: 'PENAMA', name: 'Penama' },
        { code: 'PORT VILA', name: 'Port Vila' },
        { code: 'LUGANVILLE', name: 'Luganville' },
        { code: 'SOLA', name: 'Sola' },
        { code: 'ISLANDS', name: 'Islands' }
      ]
    },
    { code: 'PEN', name: 'Tafea', type: 'province',
      cities: [
        { code: 'PENAMA', name: 'Penama' },
        { code: 'PORT VILA', name: 'Port Vila' },
        { code: 'LUGANVILLE', name: 'Luganville' },
        { code: 'SOLA', name: 'Sola' },
        { code: 'ISLANDS', name: 'Islands' }
      ]
    }
  ]
};
