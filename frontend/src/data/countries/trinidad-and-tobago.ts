/**
 * Trinidad and Tobago country data with regions, cities, and tax information
 */

import { Country } from './index';

export const trinidadAndTobago: Country = {
    code: 'TT',
    name: 'Trinidad and Tobago',
    taxInfo: { standardRate: 12.5, taxName: 'VAT', currency: 'TTD', region: 'LATAM' },
    provinces: [
      { code: 'PORT', name: 'Port of Spain',
        cities: [
          { code: 'PORT', name: 'Port of Spain' },
          { code: 'SAN', name: 'San Fernando' },
          { code: 'ARIMA', name: 'Arima' },
          { code: 'CHAGUANAS', name: 'Chaguanas' },
          { code: 'POINT', name: 'Point Fortin' },
          { code: 'COUVA', name: 'Couva' },
          { code: 'TUNAPUNA', name: 'Tunapuna' },
          { code: 'DIEGO', name: 'Diego Martin' },
          { code: 'TOBAGO', name: 'Scarborough' }
        ]
      }
    ]
};
