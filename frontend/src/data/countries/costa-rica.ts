/**
 * Costa Rica country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const costarica: Country = {
  code: 'CR',
  name: 'Costa Rica',
  provinces: [
    { code: 'SAN', name: 'San José',
      cities: [
        { code: 'SAN', name: 'San José', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
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

export default costarica;
