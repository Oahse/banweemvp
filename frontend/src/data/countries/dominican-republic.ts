/**
 * Dominican Republic country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const dominicanRepublic: Country = {
    code: 'DO',
    name: 'Dominican Republic',
    taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'DOP', region: 'LATAM' },
    provinces: [
      { code: 'SANTO', name: 'Santo Domingo',
        cities: [
          { code: 'SANTO', name: 'Santo Domingo' },
          { code: 'SANTIAGO', name: 'Santiago de los Caballeros' },
          { code: 'LA', name: 'La Romana' },
          { code: 'SAN', name: 'San Pedro de Macorís' },
          { code: 'SAN2', name: 'San Cristóbal' },
          { code: 'LA2', name: 'La Vega' },
          { code: 'PUERTO', name: 'Puerto Plata' },
          { code: 'SAN3', name: 'San Francisco de Macorís' },
          { code: 'LA3', name: 'La Altagracia' }
        ]
      }
    ]
};
