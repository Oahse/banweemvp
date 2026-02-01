/**
 * Cuba country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const cuba: Country = {
  code: 'CU',
  name: 'Cuba',
  provinces: [
    { code: 'HAVANA', name: 'La Habana',
      cities: [
        { code: 'HAVANA', name: 'Havana', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'SANTIAGO', name: 'Santiago de Cuba' },
        { code: 'CAMAGUEY', name: 'Camagüey' },
        { code: 'HOLGUIN', name: 'Holguín' },
        { code: 'GUANTANAMO', name: 'Guantánamo' },
        { code: 'SANTA', name: 'Santa Clara' },
        { code: 'BAYAMO', name: 'Bayamo' },
        { code: 'CIENFUEGOS', name: 'Cienfuegos' },
        { code: 'MATANZAS', name: 'Matanzas' },
        { code: 'PINAR', name: 'Pinar del Río' }
      ]
    }
  ]
};

export default cuba;
