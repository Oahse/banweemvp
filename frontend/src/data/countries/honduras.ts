/**
 * Honduras country data with departments and cities
 */

import { Country } from './index';

export const honduras: Country = {
  code: 'HN',
  name: 'Honduras',
  flag: '🇭🇳',
  capital: 'Tegucigalpa',
  area: 112492,
  currencySymbol: 'L',
  officialLanguages: ['Spanish'],
  demonym: 'Honduran',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'HNL', region: 'NA' },
  divisions: [
    { code: 'FRA', name: 'Francisco Morazán', type: 'department',
      cities: [
        { code: 'TEGUCIGALPA', name: 'Tegucigalpa' },
        { code: 'COMAYAGUA', name: 'Comayagua' },
        { code: 'SIGUATEPEQUE', name: 'Siguatepeque' },
        { code: 'TALANGA', name: 'Talanga' },
        { code: 'SAN', name: 'San Antonio de Oriente' }
      ]
    },
    { code: 'COM', name: 'Comayagua', type: 'department',
      cities: [
        { code: 'COMAYAGUA', name: 'Comayagua' },
        { code: 'SIGUATEPEQUE', name: 'Siguatepeque' },
        { code: 'TALANGA', name: 'Talanga' },
        { code: 'SAN', name: 'San Antonio de Oriente' },
        { code: 'TEGUCIGALPA', name: 'Tegucigalpa' }
      ]
    },
    { code: 'SIG', name: 'Siguatepeque', type: 'department',
      cities: [
        { code: 'SIGUATEPEQUE', name: 'Siguatepeque' },
        { code: 'TALANGA', name: 'Talanga' },
        { code: 'SAN', name: 'San Antonio de Oriente' },
        { code: 'TEGUCIGALPA', name: 'Tegucigalpa' },
        { code: 'COMAYAGUA', name: 'Comayagua' }
      ]
    },
    { code: 'TAL', name: 'Talanga', type: 'department',
      cities: [
        { code: 'TALANGA', name: 'Talanga' },
        { code: 'SAN', name: 'San Antonio de Oriente' },
        { code: 'TEGUCIGALPA', name: 'Tegucigalpa' },
        { code: 'COMAYAGUA', name: 'Comayagua' },
        { code: 'SIGUATEPEQUE', name: 'Siguatepeque' }
      ]
    },
    { code: 'SAN', name: 'San Antonio de Oriente', type: 'department',
      cities: [
        { code: 'SAN', name: 'San Antonio de Oriente' },
        { code: 'TEGUCIGALPA', name: 'Tegucigalpa' },
        { code: 'COMAYAGUA', name: 'Comayagua' },
        { code: 'SIGUATEPEQUE', name: 'Siguatepeque' },
        { code: 'TALANGA', name: 'Talanga' }
      ]
    }
  ]
};
