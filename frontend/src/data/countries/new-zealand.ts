/**
 * New Zealand country data with regions and cities
 */

import { Country } from './index';

export const newzealand: Country = {
  code: 'NZ',
  name: 'New Zealand',
  flag: '🇳🇿',
  capital: 'Wellington',
  area: 268838,
  currencySymbol: '$',
  officialLanguages: ['English', 'Maori'],
  demonym: 'New Zealander',
  taxInfo: { standardRate: 15, taxName: 'GST', currency: 'NZD', region: 'APAC' },
  divisions: [
    { code: 'WEL', name: 'Wellington', type: 'region',
      cities: [
        { code: 'WELLINGTON', name: 'Wellington' },
        { code: 'AUCKLAND', name: 'Auckland' },
        { code: 'CHRISTCHURCH', name: 'Christchurch' },
        { code: 'HAMILTON', name: 'Hamilton' },
        { code: 'DUNEDIN', name: 'Dunedin' }
      ]
    },
    { code: 'AUC', name: 'Auckland', type: 'region',
      cities: [
        { code: 'AUCKLAND', name: 'Auckland' },
        { code: 'CHRISTCHURCH', name: 'Christchurch' },
        { code: 'HAMILTON', name: 'Hamilton' },
        { code: 'DUNEDIN', name: 'Dunedin' },
        { code: 'WELLINGTON', name: 'Wellington' }
      ]
    },
    { code: 'CHRI', name: 'Canterbury', type: 'region',
      cities: [
        { code: 'CHRISTCHURCH', name: 'Christchurch' },
        { code: 'HAMILTON', name: 'Hamilton' },
        { code: 'DUNEDIN', name: 'Dunedin' },
        { code: 'WELLINGTON', name: 'Wellington' },
        { code: 'AUCKLAND', name: 'Auckland' }
      ]
    },
    { code: 'HAM', name: 'Waikato', type: 'region',
      cities: [
        { code: 'HAMILTON', name: 'Hamilton' },
        { code: 'DUNEDIN', name: 'Dunedin' },
        { code: 'WELLINGTON', name: 'Wellington' },
        { code: 'AUCKLAND', name: 'Auckland' },
        { code: 'CHRISTCHURCH', name: 'Christchurch' }
      ]
    },
    { code: 'DUN', name: 'Otago', type: 'region',
      cities: [
        { code: 'DUNEDIN', name: 'Dunedin' },
        { code: 'WELLINGTON', name: 'Wellington' },
        { code: 'AUCKLAND', name: 'Auckland' },
        { code: 'CHRISTCHURCH', name: 'Christchurch' },
        { code: 'HAMILTON', name: 'Hamilton' }
      ]
    }
  ]
};
