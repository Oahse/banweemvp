/**
 * Sierra Leone country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const sierraleone: Country = { code: 'SL', name: 'Sierra Leone', taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SLL', region: 'MEA' },
  provinces: [
    { code: 'FREETOWN', name: 'Freetown',
      cities: [
        { code: 'FREETOWN', name: 'Freetown' },
        { code: 'KENEMA', name: 'Kenema' },
        { code: 'BO', name: 'Bo' },
        { code: 'MAKENI', name: 'Makeni' },
        { code: 'KOIDU', name: 'Koidu' },
        { code: 'PORT', name: 'Port Loko' },
        { code: 'PANGUMA', name: 'Panguma' },
        { code: 'KABALA', name: 'Kabala' },
        { code: 'MAGBURAKA', name: 'Magburaka' },
        { code: 'WATERLOO', name: 'Waterloo' }
      ]
    }
  ]
};

export default sierraleone;
