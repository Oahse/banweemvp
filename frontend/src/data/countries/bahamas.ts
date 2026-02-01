/**
 * Bahamas country data with islands and cities
 */

import { Country } from './index';

export const bahamas: Country = {
  code: 'BS',
  name: 'Bahamas',
  flag: '🇧🇸',
  capital: 'Nassau',
  area: 13880,
  currencySymbol: 'B$',
  officialLanguages: ['English'],
  demonym: 'Bahamian',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'BSD', region: 'NA' },
  divisions: [
    { code: 'NEW', name: 'New Providence', type: 'island',
      cities: [
        { code: 'NASSAU', name: 'Nassau' },
        { code: 'FREEPORT', name: 'Freeport' },
        { code: 'WEST', name: 'West End' },
        { code: 'COOPER', name: 'Cooper\'s Town' },
        { code: 'MARSH', name: 'Marsh Harbour' }
      ]
    },
    { code: 'FRE', name: 'Freeport', type: 'island',
      cities: [
        { code: 'FREEPORT', name: 'Freeport' },
        { code: 'WEST', name: 'West End' },
        { code: 'COOPER', name: 'Cooper\'s Town' },
        { code: 'MARSH', name: 'Marsh Harbour' },
        { code: 'NASSAU', name: 'Nassau' }
      ]
    },
    { code: 'WES', name: 'West End', type: 'island',
      cities: [
        { code: 'WEST', name: 'West End' },
        { code: 'COOPER', name: 'Cooper\'s Town' },
        { code: 'MARSH', name: 'Marsh Harbour' },
        { code: 'NASSAU', name: 'Nassau' },
        { code: 'FREEPORT', name: 'Freeport' }
      ]
    },
    { code: 'COO', name: 'Cooper\'s Town', type: 'island',
      cities: [
        { code: 'COOPER', name: 'Cooper\'s Town' },
        { code: 'MARSH', name: 'Marsh Harbour' },
        { code: 'NASSAU', name: 'Nassau' },
        { code: 'FREEPORT', name: 'Freeport' },
        { code: 'WEST', name: 'West End' }
      ]
    },
    { code: 'MAR', name: 'Marsh Harbour', type: 'island',
      cities: [
        { code: 'MARSH', name: 'Marsh Harbour' },
        { code: 'NASSAU', name: 'Nassau' },
        { code: 'FREEPORT', name: 'Freeport' },
        { code: 'WEST', name: 'West End' },
        { code: 'COOPER', name: 'Cooper\'s Town' }
      ]
    }
  ]
};
