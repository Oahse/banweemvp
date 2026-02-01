/**
 * Norway country data with counties and cities
 */

import { Country } from './index';

export const norway: Country = {
  code: 'NO',
  name: 'Norway',
  flag: '🇳🇴',
  capital: 'Oslo',
  area: 323802,
  currencySymbol: 'kr',
  officialLanguages: ['Norwegian'],
  demonym: 'Norwegian',
  taxInfo: { standardRate: 25, taxName: 'MVA', currency: 'NOK', region: 'EU' },
  divisions: [
    { code: 'OSL', name: 'Oslo', type: 'county',
      cities: [
        { code: 'OSLO', name: 'Oslo' },
        { code: 'BERGEN', name: 'Bergen' },
        { code: 'TRONDHEIM', name: 'Trondheim' },
        { code: 'STAVANGER', name: 'Stavanger' },
        { code: 'KRISTIANSAND', name: 'Kristiansand' }
      ]
    },
    { code: 'BER', name: 'Vestland', type: 'county',
      cities: [
        { code: 'BERGEN', name: 'Bergen' },
        { code: 'TRONDHEIM', name: 'Trondheim' },
        { code: 'STAVANGER', name: 'Stavanger' },
        { code: 'KRISTIANSAND', name: 'Kristiansand' },
        { code: 'OSLO', name: 'Oslo' }
      ]
    },
    { code: 'TRON', name: 'Trøndelag', type: 'county',
      cities: [
        { code: 'TRONDHEIM', name: 'Trondheim' },
        { code: 'STAVANGER', name: 'Stavanger' },
        { code: 'KRISTIANSAND', name: 'Kristiansand' },
        { code: 'OSLO', name: 'Oslo' },
        { code: 'BERGEN', name: 'Bergen' }
      ]
    },
    { code: 'STA', name: 'Rogaland', type: 'county',
      cities: [
        { code: 'STAVANGER', name: 'Stavanger' },
        { code: 'KRISTIANSAND', name: 'Kristiansand' },
        { code: 'OSLO', name: 'Oslo' },
        { code: 'BERGEN', name: 'Bergen' },
        { code: 'TRONDHEIM', name: 'Trondheim' }
      ]
    },
    { code: 'KRI', name: 'Agder', type: 'county',
      cities: [
        { code: 'KRISTIANSAND', name: 'Kristiansand' },
        { code: 'OSLO', name: 'Oslo' },
        { code: 'BERGEN', name: 'Bergen' },
        { code: 'TRONDHEIM', name: 'Trondheim' },
        { code: 'STAVANGER', name: 'Stavanger' }
      ]
    }
  ]
};
