/**
 * Nicaragua country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const nicaragua: Country = {
  code: 'NI',
  name: 'Nicaragua',
  provinces: [
    { code: 'MANAGUA', name: 'Managua',
      cities: [
        { code: 'MANAGUA', name: 'Managua', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
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

export default nicaragua;
