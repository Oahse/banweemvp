/**
 * Trinidad and Tobago country data with regions and cities
 */

import { Country } from './index';

export const trinidadandtobago: Country = {
  code: 'TT',
  name: 'Trinidad and Tobago',
  flag: '🇹🇹',
  capital: 'Port of Spain',
  area: 5131,
  currencySymbol: 'TT$',
  officialLanguages: ['English', 'Trinidadian Creole', 'Tobagonian Creole'],
  demonym: 'Trinidadian and Tobagonian',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'TTD', region: 'NA' },
  divisions: [
    { code: 'POR', name: 'Port of Spain', type: 'region',
      cities: [
        { code: 'PORT', name: 'Port of Spain' },
        { code: 'SAN', name: 'San Fernando' },
        { code: 'ARIMA', name: 'Arima' },
        { code: 'POINT', name: 'Point Fortin' },
        { code: 'SCARBOROUGH', name: 'Scarborough' }
      ]
    },
    { code: 'SAN', name: 'San Fernando', type: 'region',
      cities: [
        { code: 'SAN', name: 'San Fernando' },
        { code: 'ARIMA', name: 'Arima' },
        { code: 'POINT', name: 'Point Fortin' },
        { code: 'SCARBOROUGH', name: 'Scarborough' },
        { code: 'PORT', name: 'Port of Spain' }
      ]
    },
    { code: 'ARI', name: 'Arima', type: 'region',
      cities: [
        { code: 'ARIMA', name: 'Arima' },
        { code: 'POINT', name: 'Point Fortin' },
        { code: 'SCARBOROUGH', name: 'Scarborough' },
        { code: 'PORT', name: 'Port of Spain' },
        { code: 'SAN', name: 'San Fernando' }
      ]
    },
    { code: 'POI', name: 'Point Fortin', type: 'region',
      cities: [
        { code: 'POINT', name: 'Point Fortin' },
        { code: 'SCARBOROUGH', name: 'Scarborough' },
        { code: 'PORT', name: 'Port of Spain' },
        { code: 'SAN', name: 'San Fernando' },
        { code: 'ARIMA', name: 'Arima' }
      ]
    },
    { code: 'SCA', name: 'Scarborough', type: 'region',
      cities: [
        { code: 'SCARBOROUGH', name: 'Scarborough' },
        { code: 'PORT', name: 'Port of Spain' },
        { code: 'SAN', name: 'San Fernando' },
        { code: 'ARIMA', name: 'Arima' },
        { code: 'POINT', name: 'Point Fortin' }
      ]
    }
  ]
};
