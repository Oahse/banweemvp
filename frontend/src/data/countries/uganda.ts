/**
 * Uganda country data with provinces, cities, and tax information
 */

import { Country } from './index';

export const uganda: Country = {
  code: 'UG',
  name: 'Uganda',
  taxInfo: { standardRate: 18, taxName: 'VAT', currency: 'UGX', region: 'MEA' },
  provinces: [
    { code: 'KAMPALA', name: 'Kampala',
      cities: [
        { code: 'KAMPALA', name: 'Kampala' },
        { code: 'JINJA', name: 'Jinja' },
        { code: 'GULU', name: 'Gulu' },
        { code: 'MBARARA', name: 'Mbarara' },
        { code: 'ENTEBBE', name: 'Entebbe' },
        { code: 'KABALE', name: 'Kabale' },
        { code: 'FORT', name: 'Fort Portal' },
        { code: 'MASAKA', name: 'Masaka' },
        { code: 'LIRA', name: 'Lira' },
        { code: 'ARUA', name: 'Arua' }
      ]
    }
  ]
};

export default uganda;
