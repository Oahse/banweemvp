/**
 * Bahamas country data with islands, cities, and tax information
 */

import { Country } from './index';

export const bahamas: Country = {
    code: 'BS',
    name: 'Bahamas',
    taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'BSD', region: 'LATAM' },
    provinces: [
      { code: 'NEW', name: 'New Providence',
        cities: [
          { code: 'NASSAU', name: 'Nassau' },
          { code: 'PARADISE', name: 'Paradise Island' },
          { code: 'CABLE', name: 'Cable Beach' },
          { code: 'FREEPORT', name: 'Freeport' },
          { code: 'LUCAYA', name: 'Lucaya' },
          { code: 'WEST', name: 'West End' },
          { code: 'COOPER', name: 'Coopers Town' },
          { code: 'MARSH', name: 'Marsh Harbour' },
          { code: 'GEORGE', name: 'George Town' },
          { code: 'ABACO', name: 'Abaco' }
        ]
      }
    ]
};
