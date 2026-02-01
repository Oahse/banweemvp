/**
 * Solomon Islands country data with provinces and cities
 */

import { Country } from './index';

export const solomonislands: Country = {
  code: 'SB',
  name: 'Solomon Islands',
  flag: '🇸🇧',
  capital: 'Honiara',
  area: 28896,
  currencySymbol: '$',
  officialLanguages: ['English', 'Solomon Islands Pijin'],
  demonym: 'Solomon Islander',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SBD', region: 'APAC' },
  divisions: [
    { code: 'HON', name: 'Honiara', type: 'province',
      cities: [
        { code: 'HONIARA', name: 'Honiara' },
        { code: 'GIZO', name: 'Gizo' },
        { code: 'AUKI', name: 'Auki' },
        {code: 'TULAGHI', name: 'Tulagi' },
        { code: 'MUNDA', name: 'Munda' }
      ]
    },
    { code: 'GIZ', name: 'Western', type: 'province',
      cities: [
        { code: 'GIZO', name: 'Gizo' },
        { code: 'AUKI', name: 'Auki' },
        { code: 'TULAGHI', name: 'Tulagi' },
        { code: 'MUNDA', name: 'Munda' },
        { code: 'HONIARA', name: 'Honiara' }
      ]
    },
    { code: 'AUK', name: 'Malaita', type: 'province',
      cities: [
        { code: 'AUKI', name: 'Auki' },
        { code: 'TULAGHI', name: 'Tulagi' },
        { code: 'MUNDA', name: 'Munda' },
        { code: 'HONIARA', name: 'Honiara' },
        { code: 'GIZO', name: 'Gizo' }
      ]
    },
    { code: 'TUL', name: 'Central', type: 'province',
      cities: [
        { code: 'TULAGHI', name: 'Tulagi' },
        { code: 'MUNDA', name: 'Munda' },
        { code: 'HONIARA', name: 'Honiara' },
        { code: 'GIZO', name: 'Gizo' },
        { code: 'AUKI', name: 'Auki' }
      ]
    },
    { code: 'MUN', name: 'Isabel', type: 'province',
      cities: [
        { code: 'MUNDA', name: 'Munda' },
        { code: 'HONIARA', name: 'Honiara' },
        { code: 'GIZO', name: 'Gizo' },
        { code: 'AUKI', name: 'Auki' },
        { code: 'TULAGHI', name: 'Tulagi' }
      ]
    }
  ]
};
