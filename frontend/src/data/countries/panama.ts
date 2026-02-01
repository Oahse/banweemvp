/**
 * Panama country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const panama: Country = {
    code: 'PA',
    name: 'Panama',
    taxInfo: { standardRate: 7, taxName: 'VAT', currency: 'PAB', region: 'LATAM' },
    provinces: [
      { code: 'PANAMA', name: 'Panamá',
        cities: [
          { code: 'PANAMA', name: 'Panama City' },
          { code: 'COLON', name: 'Colón' },
          { code: 'DAVID', name: 'David' },
          { code: 'SANTIAGO', name: 'Santiago' },
          { code: 'CHITRE', name: 'Chitré' },
          { code: 'BOCAS', name: 'Bocas del Toro' },
          { code: 'PENONOME', name: 'Penonomé' },
          { code: 'TOLE', name: 'Tolé' },
          { code: 'SAN', name: 'San Miguelito' },
          { code: 'ARRAIJAN', name: 'Arraiján' }
        ]
      }
    ]
};
