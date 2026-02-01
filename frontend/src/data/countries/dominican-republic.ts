/**
 * Dominican Republic country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const dominicanrepublic: Country = {
  code: 'DO',
  name: 'Dominican Republic',
  provinces: [
    { code: 'SANTO', name: 'Santo Domingo',
      cities: [
        { code: 'SANTO', name: 'Santo Domingo', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'SANTIAGO', name: 'Santiago de los Caballeros' },
        { code: 'LA', name: 'La Romana' },
        { code: 'SAN', name: 'San Pedro de Macorís' },
        { code: 'SAN2', name: 'San Cristóbal' },
        { code: 'LA2', name: 'La Vega' },
        { code: 'PUERTO', name: 'Puerto Plata' },
        { code: 'DUARTE', name: 'San Francisco de Macorís' },
        { code: 'PERAVIA', name: 'Baní' },
        { code: 'AZUA', name: 'Azua' }
      ]
    }
  ]
};

export default dominicanrepublic;
