/**
 * Nicaragua country data with departments, cities, and tax information
 */

import { Country } from './index';

export const nicaragua: Country = {
    code: 'NI',
    name: 'Nicaragua',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'NIO', region: 'LATAM' },
    provinces: [
      { code: 'MANAGUA', name: 'Managua',
        cities: [
          { code: 'MANAGUA', name: 'Managua' },
          { code: 'MASAYA', name: 'Masaya' },
          { code: 'GRANADA', name: 'Granada' },
          { code: 'LEON', name: 'León' },
          { code: 'CHINANDEGA', name: 'Chinandega' },
          { code: 'ESTELI', name: 'Estelí' },
          { code: 'MATAGALPA', name: 'Matagalpa' },
          { code: 'JINOTEGA', name: 'Jinotega' },
          { code: 'RIVAS', name: 'Rivas' },
          { code: 'BLUEFIELDS', name: 'Bluefields' }
        ]
      }
    ]
};
