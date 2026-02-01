/**
 * Jamaica country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const jamaica: Country = {
    code: 'JM',
    name: 'Jamaica',
    taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'JMD', region: 'LATAM' },
    provinces: [
      { code: 'KINGSTON', name: 'Kingston',
        cities: [
          { code: 'KINGSTON', name: 'Kingston' },
          { code: 'PORT', name: 'Port Royal' },
          { code: 'SPANISH', name: 'Spanish Town' },
          { code: 'MANDEVILLE', name: 'Mandeville' },
          { code: 'SAVANNA', name: 'Savanna-la-Mar' },
          { code: 'PORT', name: 'Port Antonio' },
          { code: 'ST', name: 'St. Ann\'s Bay' },
          { code: 'OLD', name: 'Old Harbour' }
        ]
      }
    ]
};
