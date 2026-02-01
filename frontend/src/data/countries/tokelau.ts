/**
 * Tokelau country data with atolls and cities
 */

import { Country } from './index';

export const tokelau: Country = {
  code: 'TK',
  name: 'Tokelau',
  flag: '🇹🇰',
  capital: 'Fakaofo',
  area: 12,
  currencySymbol: '$',
  officialLanguages: ['Tokelauan', 'English'],
  demonym: 'Tokelauan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'NZD', region: 'APAC' },
  divisions: [
    { code: 'FAK', name: 'Fakaofo', type: 'atoll',
      cities: [
        { code: 'FAKAOF', name: 'Fakaofo' },
        { code: 'NUKUNONU', name: 'Nukunonu' },
        { code: 'ATAFU', name: 'Atafu' },
        { code: 'FONAFU', name: 'Fonafuti' },
        { code: 'NUKUFONU', name: 'Nukufonu' }
      ]
    },
    { code: 'NUK', name: 'Nukunonu', type: 'atoll',
      cities: [
        { code: 'NUKUNONU', name: 'Nukunonu' },
        { code: 'ATAFU', name: 'Atafu' },
        { code: 'FONAFU', name: 'Fonafuti' },
        { code: 'NUKUFONU', name: 'Nukufonu' },
        { code: 'FAKAOF', name: 'Fakaofo' }
      ]
    },
    { code: 'ATA', name: 'Atafu', type: 'atoll',
      cities: [
        { code: 'ATAFU', name: 'Atafu' },
        { code: 'FONAFU', name: 'Fonafuti' },
        { code: 'NUKUFONU', name: 'Nukufonu' },
        { code: 'FAKAOF', name: 'Fakaofo' },
        { code: 'NUKUNONU', name: 'Nukunonu' }
      ]
    },
    { code: 'FON', name: 'Fonafuti', type: 'atoll',
      cities: [
        { code: 'FONAFU', name: 'Fonafuti' },
        { code: 'NUKUFONU', name: 'Nukufonu' },
        { code: 'FAKAOF', name: 'Fakaofo' },
        { code: 'NUKUNONU', name: 'Nukunonu' },
        { code: 'ATAFU', name: 'Atafu' }
      ]
    },
    { code: 'NUK', name: 'Nukufonu', type: 'atoll',
      cities: [
        { code: 'NUKUFONU', name: 'Nukufonu' },
        { code: 'FAKAOF', name: 'Fakaofo' },
        { code: 'NUKUNONU', name: 'Nukunonu' },
        { code: 'ATAFU', name: 'Atafu' },
        { code: 'FONAFU', name: 'Fonafuti' }
      ]
    }
  ]
};
