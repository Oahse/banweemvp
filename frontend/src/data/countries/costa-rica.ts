/**
 * Costa Rica country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const costaRica: Country = {
    code: 'CR',
    name: 'Costa Rica',
    taxInfo: { standardRate: 13, taxName: 'VAT', currency: 'CRC', region: 'LATAM' },
    provinces: [
      { code: 'SAN', name: 'San José',
        cities: [
          { code: 'SAN', name: 'San José' },
          { code: 'ALAJUELA', name: 'Alajuela' },
          { code: 'CARTAGO', name: 'Cartago' },
          { code: 'HEREDIA', name: 'Heredia' },
          { code: 'PUNTARENAS', name: 'Puntarenas' },
          { code: 'LIMON', name: 'Limón' },
          { code: 'LIBERIA', name: 'Liberia' },
          { code: 'QUEPOS', name: 'Quepos' },
          { code: 'SAN2', name: 'San Isidro' },
          { code: 'GOLFITO', name: 'Golfito' }
        ]
      }
    ]
};
