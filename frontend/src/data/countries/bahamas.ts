/**
 * Bahamas country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const bahamas: Country = {
  code: 'BS',
  name: 'Bahamas',
  provinces: [
    { code: 'NEW', name: 'New Providence',
      cities: [
        { code: 'NASSAU', name: 'Nassau', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'FREEPORT', name: 'Freeport' },
        { code: 'WEST', name: 'West End' },
        { code: 'COOPER', name: 'Cooper\'s Town' },
        { code: 'MARSH', name: 'Marsh Harbour' },
        { code: 'GEORGE', name: 'George Town' },
        { code: 'HIGH', name: 'High Rock' },
        { code: 'ANDROS', name: 'Andros Town' },
        { code: 'ELEUTHERA', name: 'Eleuthera' },
        { code: 'ABACO', name: 'Abaco' }
      ]
    }
  ]
};

export default bahamas;
