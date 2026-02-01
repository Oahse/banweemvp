/**
 * Jamaica country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const jamaica: Country = {
  code: 'JM',
  name: 'Jamaica',
  provinces: [
    { code: 'KINGSTON', name: 'Kingston',
      cities: [
        { code: 'KINGSTON', name: 'Kingston', taxInfo: { taxName: 'No VAT', currency: 'USD', region: 'NA' }},
        { code: 'SPANISH', name: 'Spanish Town' },
        { code: 'PORTMORE', name: 'Portmore' },
        { code: 'MONTEGO', name: 'Montego Bay' },
        { code: 'MAY', name: 'May Pen' },
        { code: 'MANDEVILLE', name: 'Mandeville' },
        { code: 'SAVANNA', name: 'Savanna-la-Mar' },
        { code: 'PORT', name: 'Port Antonio' },
        { code: 'ST', name: 'St. Ann\'s Bay' },
        { code: 'OLD', name: 'Old Harbour' }
      ]
    }
  ]
};

export default jamaica;
