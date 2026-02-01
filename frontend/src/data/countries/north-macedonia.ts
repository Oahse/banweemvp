/**
 * North Macedonia country data with regions and cities
 */

import { Country } from './index';

export const northmacedonia: Country = {
  code: 'MK',
  name: 'North Macedonia',
  flag: '🇲🇰',
  capital: 'Skopje',
  area: 25713,
  currencySymbol: 'ден',
  officialLanguages: ['Macedonian', 'Albanian'],
  demonym: 'Macedonian',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'MKD', region: 'EU' },
  divisions: [
    { code: 'SKO', name: 'Skopje', type: 'region',
      cities: [
        { code: 'SKOPJE', name: 'Skopje' },
        { code: 'BITOLA', name: 'Bitola' },
        { code: 'KUMANOVO', name: 'Kumanovo' },
        { code: 'PRILEP', name: 'Prilep' },
        { code: 'TETOVO', name: 'Tetovo' }
      ]
    },
    { code: 'BIT', name: 'Pelagonia', type: 'region',
      cities: [
        { code: 'BITOLA', name: 'Bitola' },
        { code: 'KUMANOVO', name: 'Kumanovo' },
        { code: 'PRILEP', name: 'Prilep' },
        { code: 'TETOVO', name: 'Tetovo' },
        { code: 'SKOPJE', name: 'Skopje' }
      ]
    },
    { code: 'KUM', name: 'Northeastern', type: 'region',
      cities: [
        { code: 'KUMANOVO', name: 'Kumanovo' },
        { code: 'PRILEP', name: 'Prilep' },
        { code: 'TETOVO', name: 'Tetovo' },
        { code: 'SKOPJE', name: 'Skopje' },
        { code: 'BITOLA', name: 'Bitola' }
      ]
    },
    { code: 'PRI', name: 'Vardar', type: 'region',
      cities: [
        { code: 'PRILEP', name: 'Prilep' },
        { code: 'TETOVO', name: 'Tetovo' },
        { code: 'SKOPJE', name: 'Skopje' },
        { code: 'BITOLA', name: 'Bitola' },
        { code: 'KUMANOVO', name: 'Kumanovo' }
      ]
    },
    { code: 'TET', name: 'Polog', type: 'region',
      cities: [
        { code: 'TETOVO', name: 'Tetovo' },
        { code: 'SKOPJE', name: 'Skopje' },
        { code: 'BITOLA', name: 'Bitola' },
        { code: 'KUMANOVO', name: 'Kumanovo' },
        { code: 'PRILEP', name: 'Prilep' }
      ]
    }
  ]
};
