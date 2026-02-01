/**
 * Eswatini country data with regions, cities, and tax information
 */

import { Country } from './index';

export const eswatini: Country = {
    code: 'SZ',
    name: 'Eswatini',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SZL', region: 'MEA' },
    provinces: [
      { code: 'HH', name: 'Hhohho',
        cities: [
          { code: 'MBB', name: 'Mbabane' },
          { code: 'MAN', name: 'Manzini' },
          { code: 'BIG', name: 'Big Bend' },
          { code: 'MATS', name: 'Matsapha' },
          { code: 'SITE', name: 'Siteki' },
          { code: 'PIG', name: 'Piggs Peak' },
          { code: 'HLA', name: 'Hlatikulu' },
          { code: 'NHL', name: 'Nhlangano' },
          { code: 'LAV', name: 'Lavumisa' },
          { code: 'MHL', name: 'Mhlambanyatsi' }
        ]
      },
      { code: 'LU', name: 'Lubombo',
        cities: [
          { code: 'SITE', name: 'Siteki' },
          { code: 'HLA', name: 'Hlatikulu' },
          { code: 'NHL', name: 'Nhlangano' },
          { code: 'LAV', name: 'Lavumisa' },
          { code: 'BIG', name: 'Big Bend' },
          { code: 'MAN', name: 'Manzini' },
          { code: 'MBB', name: 'Mbabane' },
          { code: 'MATS', name: 'Matsapha' },
          { code: 'PIG', name: 'Piggs Peak' },
          { code: 'MHL', name: 'Mhlambanyatsi' }
        ]
      },
      { code: 'MA', name: 'Manzini',
        cities: [
          { code: 'MAN', name: 'Manzini' },
          { code: 'MATS', name: 'Matsapha' },
          { code: 'MBB', name: 'Mbabane' },
          { code: 'BIG', name: 'Big Bend' },
          { code: 'SITE', name: 'Siteki' },
          { code: 'PIG', name: 'Piggs Peak' },
          { code: 'HLA', name: 'Hlatikulu' },
          { code: 'NHL', name: 'Nhlangano' },
          { code: 'LAV', name: 'Lavumisa' },
          { code: 'MHL', name: 'Mhlambanyatsi' }
        ]
      },
      { code: 'SH', name: 'Shiselweni',
        cities: [
          { code: 'NHL', name: 'Nhlangano' },
          { code: 'HLA', name: 'Hlatikulu' },
          { code: 'LAV', name: 'Lavumisa' },
          { code: 'SITE', name: 'Siteki' },
          { code: 'BIG', name: 'Big Bend' },
          { code: 'MAN', name: 'Manzini' },
          { code: 'MBB', name: 'Mbabane' },
          { code: 'MATS', name: 'Matsapha' },
          { code: 'PIG', name: 'Piggs Peak' },
          { code: 'MHL', name: 'Mhlambanyatsi' }
        ]
      }
    ]
  };
