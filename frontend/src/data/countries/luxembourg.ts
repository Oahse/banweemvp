/**
 * Luxembourg country data with cantons and cities
 */

import { Country } from './index';

export const luxembourg: Country = {
  code: 'LU',
  name: 'Luxembourg',
  flag: '🇱🇺',
  capital: 'Luxembourg City',
  area: 2586,
  currencySymbol: '€',
  officialLanguages: ['Luxembourgish', 'French', 'German'],
  demonym: 'Luxembourgish',
  taxInfo: { standardRate: 17, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'LUX', name: 'Luxembourg', type: 'canton',
      cities: [
        { code: 'LUXEMBOURG CITY', name: 'Luxembourg City' },
        { code: 'ESCH-SUR-ALZETTE', name: 'Esch-sur-Alzette' },
        { code: 'Differdange', name: 'Differdange' },
        { code: 'Dudelange', name: 'Dudelange' },
        { code: 'Ettelbruck', name: 'Ettelbruck' }
      ]
    },
    { code: 'ESC', name: 'Esch-sur-Alzette', type: 'canton',
      cities: [
        { code: 'ESCH-SUR-ALZETTE', name: 'Esch-sur-Alzette' },
        { code: 'Differdange', name: 'Differdange' },
        { code: 'Dudelange', name: 'Dudelange' },
        { code: 'Ettelbruck', name: 'Ettelbruck' },
        { code: 'LUXEMBOURG CITY', name: 'Luxembourg City' }
      ]
    },
    { code: 'DIF', name: 'Differdange', type: 'canton',
      cities: [
        { code: 'Differdange', name: 'Differdange' },
        { code: 'Dudelange', name: 'Dudelange' },
        { code: 'Ettelbruck', name: 'Ettelbruck' },
        { code: 'LUXEMBOURG CITY', name: 'Luxembourg City' },
        { code: 'ESCH-SUR-ALZETTE', name: 'Esch-sur-Alzette' }
      ]
    },
    { code: 'DUD', name: 'Dudelange', type: 'canton',
      cities: [
        { code: 'Dudelange', name: 'Dudelange' },
        { code: 'Ettelbruck', name: 'Ettelbruck' },
        { code: 'LUXEMBOURG CITY', name: 'Luxembourg City' },
        { code: 'ESCH-SUR-ALZETTE', name: 'Esch-sur-Alzette' },
        { code: 'Differdange', name: 'Differdange' }
      ]
    },
    { code: 'ETT', name: 'Ettelbruck', type: 'canton',
      cities: [
        { code: 'Ettelbruck', name: 'Ettelbruck' },
        { code: 'LUXEMBOURG CITY', name: 'Luxembourg City' },
        { code: 'ESCH-SUR-ALZETTE', name: 'Esch-sur-Alzette' },
        { code: 'Differdange', name: 'Differdange' },
        { code: 'Dudelange', name: 'Dudelange' }
      ]
    }
  ]
};
