/**
 * Haiti country data with departments and cities
 */

import { Country } from './index';

export const haiti: Country = {
  code: 'HT',
  name: 'Haiti',
  flag: '🇭🇹',
  capital: 'Port-au-Prince',
  area: 27750,
  currencySymbol: 'G',
  officialLanguages: ['Haitian Creole', 'French'],
  demonym: 'Haitian',
  taxInfo: { standardRate: 10, taxName: 'VAT', currency: 'HTG', region: 'NA' },
  divisions: [
    { code: 'POR', name: 'Port-au-Prince', type: 'department',
      cities: [
        { code: 'PORT', name: 'Port-au-Prince' },
        { code: 'CAP', name: 'Cap-Haïtien' },
        { code: 'GONAIVES', name: 'Gonaïves' },
        { code: 'DELMAS', name: 'Delmas' },
        { code: 'PETION', name: 'Pétionville' }
      ]
    },
    { code: 'CAP', name: 'Cap-Haïtien', type: 'department',
      cities: [
        { code: 'CAP', name: 'Cap-Haïtien' },
        { code: 'GONAIVES', name: 'Gonaïves' },
        { code: 'DELMAS', name: 'Delmas' },
        { code: 'PETION', name: 'Pétionville' },
        { code: 'PORT', name: 'Port-au-Prince' }
      ]
    },
    { code: 'GON', name: 'Gonaïves', type: 'department',
      cities: [
        { code: 'GONAIVES', name: 'Gonaïves' },
        { code: 'DELMAS', name: 'Delmas' },
        { code: 'PETION', name: 'Pétionville' },
        { code: 'PORT', name: 'Port-au-Prince' },
        { code: 'CAP', name: 'Cap-Haïtien' }
      ]
    },
    { code: 'DEL', name: 'Delmas', type: 'department',
      cities: [
        { code: 'DELMAS', name: 'Delmas' },
        { code: 'PETION', name: 'Pétionville' },
        { code: 'PORT', name: 'Port-au-Prince' },
        { code: 'CAP', name: 'Cap-Haïtien' },
        { code: 'GONAIVES', name: 'Gonaïves' }
      ]
    },
    { code: 'PET', name: 'Pétionville', type: 'department',
      cities: [
        { code: 'PETION', name: 'Pétionville' },
        { code: 'PORT', name: 'Port-au-Prince' },
        { code: 'CAP', name: 'Cap-Haïtien' },
        { code: 'GONAIVES', name: 'Gonaïves' },
        { code: 'DELMAS', name: 'Delmas' }
      ]
    }
  ]
};
