/**
 * Saint Kitts and Nevis country data with parishes, cities, and tax information
 */

import { Country } from './index';

export const saintKittsAndNevis: Country = {
    code: 'KN',
    name: 'Saint Kitts and Nevis',
    taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'XCD', region: 'LATAM' },
    provinces: [
      { code: 'BASSETERRE', name: 'Basseterre',
        cities: [
          { code: 'BASSETERRE', name: 'Basseterre' },
          { code: 'CHARLESTOWN', name: 'Charlestown' },
          { code: 'SANDY', name: 'Sandy Point' },
          { code: 'CASTRIES', name: 'Castries' },
          { code: 'DIEPPE', name: 'Dieppe Bay' },
          { code: 'TABERNACLE', name: 'Tabernacle' },
          { code: 'MOLINEUX', name: 'Molineux' },
          { code: 'OLD', name: 'Old Road' },
          { code: 'VERCHILD', name: 'Vermont' },
          { code: 'ST', name: 'St. Paul\'s' }
        ]
      }
    ]
};
