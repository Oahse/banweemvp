/**
 * Cuba country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const cuba: Country = {
    code: 'CU',
    name: 'Cuba',
    taxInfo: { standardRate: 11, taxName: 'VAT', currency: 'CUP', region: 'LATAM' },
    provinces: [
      { code: 'HAVANA', name: 'La Habana',
        cities: [
          { code: 'HAVANA', name: 'Havana' },
          { code: 'SANTIAGO', name: 'Santiago de Cuba' },
          { code: 'CAMAGUEY', name: 'Camagüey' },
          { code: 'HOLGUIN', name: 'Holguín' },
          { code: 'GUANTANAMO', name: 'Guantánamo' },
          { code: 'PINAR', name: 'Pinar del Río' },
          { code: 'MATANZAS', name: 'Matanzas' },
          { code: 'CIENFUEGOS', name: 'Cienfuegos' },
          { code: 'VILLA', name: 'Villa Clara' },
          { code: 'LAS', name: 'Las Tunas' }
        ]
      }
    ]
};
