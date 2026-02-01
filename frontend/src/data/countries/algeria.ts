/**
 * Algeria country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const algeria: Country = {
  code: 'DZ',
  name: 'Algeria',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'DZD', region: 'MEA' },
  provinces: [
    { code: 'ALGIERS', name: 'Algiers',
      cities: [
        { code: 'ALGIER', name: 'Algiers' },
        { code: 'ORAN', name: 'Oran' },
        { code: 'CONSTANTINE', name: 'Constantine' },
        { code: 'ANNABA', name: 'Annaba' },
        { code: 'BLIDA', name: 'Blida' },
        { code: 'BATNA', name: 'Batna' },
        { code: 'DJELFA', name: 'Djelfa' },
        { code: 'SETIF', name: 'Sétif' },
        { code: 'SIDI', name: 'Sidi Bel Abbès' },
        { code: 'SKIKDA', name: 'Skikda' }
      ]
    }
  ]
};

export default algeria;
