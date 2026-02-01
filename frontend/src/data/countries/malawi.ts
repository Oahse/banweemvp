/**
 * Malawi country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const malawi: Country = {
  code: 'MW',
  name: 'Malawi',
  taxInfo: { standardRate: 16.5, taxName: 'VAT', currency: 'MWK', region: 'MEA' },
  provinces: [
    { code: 'LILONGWE', name: 'Lilongwe',
      cities: [
        { code: 'LILONGWE', name: 'Lilongwe' },
        { code: 'BLANTYRE', name: 'Blantyre' },
        { code: 'MZUZU', name: 'Mzuzu' },
        { code: 'ZOMBA', name: 'Zomba' },
        { code: 'KARONGA', name: 'Karonga' },
        { code: 'MANGOCHI', name: 'Mangochi' },
        { code: 'SALIMA', name: 'Salima' },
        { code: 'NKHOTAKOTA', name: 'Nkhota Kota' },
        { code: 'LIWONDE', name: 'Liwonde' },
        { code: 'BALAKA', name: 'Balaka' }
      ]
    }
  ]
};

export default malawi;
