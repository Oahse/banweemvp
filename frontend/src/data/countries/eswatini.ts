/**
 * Eswatini country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const eswatini: Country = {
  code: 'SZ',
  name: 'Eswatini',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'SZL', region: 'MEA' },
  provinces: [
    { code: 'MBABANE', name: 'Hhohho',
      cities: [
        { code: 'MBABANE', name: 'Mbabane' },
        { code: 'MANZINI', name: 'Manzini' },
        { code: 'BIG', name: 'Big Bend' },
        { code: 'SITEKI', name: 'Siteki' },
        { code: 'NHLANGANO', name: 'Nhlangano' },
        { code: 'PIGGS', name: 'Piggs Peak' },
        { code: 'SIMUNYE', name: 'Simunye' },
        { code: 'MATSAPHA', name: 'Matsapha' },
        { code: 'MALKERNS', name: 'Malkerns' },
        { code: 'EZULWINI', name: 'Ezulwini' }
      ]
    }
  ]
};

export default eswatini;
