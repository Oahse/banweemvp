/**
 * Romania country data with counties and cities
 */

import { Country } from './index';

export const romania: Country = {
  code: 'RO',
  name: 'Romania',
  flag: '🇷🇴',
  capital: 'Bucharest',
  area: 238397,
  currencySymbol: 'lei',
  officialLanguages: ['Romanian'],
  demonym: 'Romanian',
  taxInfo: { standardRate: 19, taxName: 'VAT', currency: 'RON', region: 'EU' },
  divisions: [
    { code: 'BUC', name: 'Bucharest', type: 'county',
      cities: [
        { code: 'BUCHAREST', name: 'Bucharest' },
        { code: 'CLUJ-NAPOCA', name: 'Cluj-Napoca' },
        { code: 'TIMISOARA', name: 'Timișoara' },
        { code: 'IASI', name: 'Iași' },
        { code: 'CONSTANTA', name: 'Constanța' }
      ]
    },
    { code: 'CLU', name: 'Cluj', type: 'county',
      cities: [
        { code: 'CLUJ-NAPOCA', name: 'Cluj-Napoca' },
        { code: 'TIMISOARA', name: 'Timișoara' },
        { code: 'IASI', name: 'Iași' },
        { code: 'CONSTANTA', name: 'Constanța' },
        { code: 'BUCHAREST', name: 'Bucharest' }
      ]
    },
    { code: 'TIM', name: 'Timiș', type: 'county',
      cities: [
        { code: 'TIMISOARA', name: 'Timișoara' },
        { code: 'IASI', name: 'Iași' },
        { code: 'CONSTANTA', name: 'Constanța' },
        { code: 'BUCHAREST', name: 'Bucharest' },
        { code: 'CLUJ-NAPOCA', name: 'Cluj-Napoca' }
      ]
    },
    { code: 'IAS', name: 'Iași', type: 'county',
      cities: [
        { code: 'IASI', name: 'Iași' },
        { code: 'CONSTANTA', name: 'Constanța' },
        { code: 'BUCHAREST', name: 'Bucharest' },
        { code: 'CLUJ-NAPOCA', name: 'Cluj-Napoca' },
        { code: 'TIMISOARA', name: 'Timișoara' }
      ]
    },
    { code: 'CON', name: 'Constanța', type: 'county',
      cities: [
        { code: 'CONSTANTA', name: 'Constanța' },
        { code: 'BUCHAREST', name: 'Bucharest' },
        { code: 'CLUJ-NAPOCA', name: 'Cluj-Napoca' },
        { code: 'TIMISOARA', name: 'Timișoara' },
        { code: 'IASI', name: 'Iași' }
      ]
    }
  ]
};
