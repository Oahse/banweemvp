/**
 * Puerto Rico country data with municipalities, cities, and tax information
 */

import { Country } from './index';

export const puertoRico: Country = {
    code: 'PR',
    name: 'Puerto Rico',
    taxInfo: { standardRate: 11.5, taxName: 'VAT', currency: 'USD', region: 'LATAM' },
    provinces: [
      { code: 'SAN', name: 'San Juan',
        cities: [
          { code: 'SAN', name: 'San Juan' },
          { code: 'BAYAMON', name: 'Bayamón' },
          { code: 'CAROLINA', name: 'Carolina' },
          { 'code': 'PONCE', name: 'Ponce' },
          { code: 'CAGUAS', name: 'Caguas' },
          { code: 'GUAYNABO', name: 'Guaynabo' },
          { code: 'ARECIBO', name: 'Arecibo' },
          { code: 'MAYAGUEZ', name: 'Mayagüez' },
          { code: 'HUMACAO', name: 'Humacao' }
        ]
      }
    ]
};
