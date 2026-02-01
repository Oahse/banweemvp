/**
 * Tuvalu country data with islands and cities
 */

import { Country } from './index';

export const tuvalu: Country = {
  code: 'TV',
  name: 'Tuvalu',
  flag: '🇹🇻',
  capital: 'Funafuti',
  area: 26,
  currencySymbol: '$',
  officialLanguages: ['Tuvaluan', 'English'],
  demonym: 'Tuvaluan',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'APAC' },
  divisions: [
    { code: 'FUN', name: 'Funafuti', type: 'island',
      cities: [
        { code: 'FUNAFUTI', name: 'Funafuti' },
        { code: 'FOGAFOLE', name: 'Fogafule' },
        { code: 'NANUMAGA', name: 'Nanumaga' },
        { code: 'NANUMEA', name: 'Nanumea' },
        { code: 'NITULAGA', name: 'Nui' }
      ]
    },
    { code: 'FOG', name: 'Nanumanga', type: 'island',
      cities: [
        { code: 'FOGAFOLE', name: 'Fogafule' },
        { code: 'NANUMAGA', name: 'Nanumaga' },
        { code: 'NANUMEA', name: 'Nanumea' },
        { code: 'NITULAGA', name: 'Nui' },
        { code: 'FUNAFUTI', name: 'Funafuti' }
      ]
    },
    { code: 'NAN', name: 'Nanumea', type: 'island',
      cities: [
        { code: 'NANUMEA', name: 'Nanumea' },
        { code: 'NITULAGA', name: 'Nui' },
        { code: 'FUNAFUTI', name: 'Funafuti' },
        { code: 'FOGAFOLE', name: 'Fogafule' },
        { code: 'NANUMAGA', name: 'Nanumaga' }
      ]
    },
    { code: 'NIT', name: 'Nui', type: 'island',
      cities: [
        { code: 'NITULAGA', name: 'Nui' },
        { code: 'FUNAFUTI', name: 'Funafuti' },
        { code: 'FOGAFOLE', name: 'Fogafule' },
        { code: 'NANUMAGA', name: 'Nanumaga' },
        { code: 'NANUMEA', name: 'Nanumea' }
      ]
    },
    { code: 'NAN', name: 'Nanumaga', type: 'island',
      cities: [
        { code: 'NANUMAGA', name: 'Nanumaga' },
        { code: 'FUNAFUTI', name: 'Funafuti' },
        { code: 'FOGAFOLE', name: 'Fogafule' },
        { code: 'NANUMEA', name: 'Nanumea' },
        { code: 'NITULAGA', name: 'Nui' }
      ]
    }
  ]
};
