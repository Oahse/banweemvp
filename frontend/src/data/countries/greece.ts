/**
 * Greece country data with regions and cities
 */

import { Country } from './index';

export const greece: Country = {
  code: 'GR',
  name: 'Greece',
  flag: '🇬🇷',
  capital: 'Athens',
  area: 131957,
  currencySymbol: '€',
  officialLanguages: ['Greek'],
  demonym: 'Greek',
  taxInfo: { standardRate: 24, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'ATH', name: 'Attica', type: 'region',
      cities: [
        { code: 'ATHENS', name: 'Athens' },
        { code: 'THESSALONIKI', name: 'Thessaloniki' },
        { code: 'PATRAS', name: 'Patras' },
        { code: 'HERAKLION', name: 'Heraklion' },
        { code: 'LARISSA', name: 'Larissa' }
      ]
    },
    { code: 'THE', name: 'Central Macedonia', type: 'region',
      cities: [
        { code: 'THESSALONIKI', name: 'Thessaloniki' },
        { code: 'PATRAS', name: 'Patras' },
        { code: 'HERAKLION', name: 'Heraklion' },
        { code: 'LARISSA', name: 'Larissa' },
        { code: 'ATHENS', name: 'Athens' }
      ]
    },
    { code: 'PAT', name: 'West Greece', type: 'region',
      cities: [
        { code: 'PATRAS', name: 'Patras' },
        { code: 'HERAKLION', name: 'Heraklion' },
        { code: 'LARISSA', name: 'Larissa' },
        { code: 'ATHENS', name: 'Athens' },
        { code: 'THESSALONIKI', name: 'Thessaloniki' }
      ]
    },
    { code: 'HER', name: 'Crete', type: 'region',
      cities: [
        { code: 'HERAKLION', name: 'Heraklion' },
        { code: 'LARISSA', name: 'Larissa' },
        { code: 'ATHENS', name: 'Athens' },
        { code: 'THESSALONIKI', name: 'Thessaloniki' },
        { code: 'PATRAS', name: 'Patras' }
      ]
    },
    { code: 'LAR', name: 'Thessaly', type: 'region',
      cities: [
        { code: 'LARISSA', name: 'Larissa' },
        { code: 'ATHENS', name: 'Athens' },
        { code: 'THESSALONIKI', name: 'Thessaloniki' },
        { code: 'PATRAS', name: 'Patras' },
        { code: 'HERAKLION', name: 'Heraklion' }
      ]
    }
  ]
};
