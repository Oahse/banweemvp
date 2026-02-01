/**
 * Cook Islands country data with islands and cities
 */

import { Country } from './index';

export const cookislands: Country = {
  code: 'CK',
  name: 'Cook Islands',
  flag: '🇨🇰',
  capital: 'Avarua',
  area: 236,
  currencySymbol: '$',
  officialLanguages: ['English', 'Cook Islands Maori'],
  demonym: 'Cook Islander',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'NZD', region: 'APAC' },
  divisions: [
    { code: 'AVA', name: 'Rarotonga', type: 'island',
      cities: [
        { code: 'AVARUA', name: 'Avarua' },
        { code: 'AITUTAKI', name: 'Aitutaki' },
        { code: 'ATIU', name: 'Atiu' },
        { code: 'MANGAIA', name: 'Mangaia' },
        { code: 'MANIHIKI', name: 'Manihiki' }
      ]
    },
    { code: 'AIT', name: 'Aitutaki', type: 'island',
      cities: [
        { code: 'AITUTAKI', name: 'Aitutaki' },
        { code: 'ATIU', name: 'Atiu' },
        { code: 'MANGAIA', name: 'Mangaia' },
        { code: 'MANIHIKI', name: 'Manihiki' },
        { code: 'AVARUA', name: 'Avarua' }
      ]
    },
    { code: 'ATI', name: 'Atiu', type: 'island',
      cities: [
        { code: 'ATIU', name: 'Atiu' },
        { code: 'MANGAIA', name: 'Mangaia' },
        { code: 'MANIHIKI', name: 'Manihiki' },
        { code: 'AVARUA', name: 'Avarua' },
        { code: 'AITUTAKI', name: 'Aitutaki' }
      ]
    },
    { code: 'MAN', name: 'Mangaia', type: 'island',
      cities: [
        { code: 'MANGAIA', name: 'Mangaia' },
        { code: 'MANIHIKI', name: 'Manihiki' },
        { code: 'AVARUA', name: 'Avarua' },
        { code: 'AITUTAKI', name: 'Aitutaki' },
        { code: 'ATIU', name: 'Atiu' }
      ]
    },
    { code: 'MANI', name: 'Manihiki', type: 'island',
      cities: [
        { code: 'MANIHIKI', name: 'Manihiki' },
        { code: 'AVARUA', name: 'Avarua' },
        { code: 'AITUTAKI', name: 'Aitutaki' },
        { code: 'ATIU', name: 'Atiu' },
        { code: 'MANGAIA', name: 'Mangaia' }
      ]
    }
  ]
};
