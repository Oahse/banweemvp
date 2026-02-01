/**
 * Kazakhstan country data with regions and cities
 */

import { Country } from './index';

export const kazakhstan: Country = {
  code: 'KZ',
  name: 'Kazakhstan',
  flag: '🇰🇿',
  capital: 'Nur-Sultan',
  area: 2724900,
  currencySymbol: '₸',
  officialLanguages: ['Kazakh', 'Russian'],
  demonym: 'Kazakhstani',
  taxInfo: { standardRate: 12, taxName: 'VAT', currency: 'KZT', region: 'APAC' },
  divisions: [
    { code: 'NUR', name: 'Nur-Sultan', type: 'region',
      cities: [
        { code: 'NUR', name: 'Nur-Sultan' },
        { code: 'ALMATY', name: 'Almaty' },
        { code: 'SHYMKENT', name: 'Shymkent' },
        { code: 'AKTOBE', name: 'Aktobe' },
        { code: 'TARAZ', name: 'Taraz' }
      ]
    },
    { code: 'ALM', name: 'Almaty', type: 'region',
      cities: [
        { code: 'ALMATY', name: 'Almaty' },
        { code: 'SHYMKENT', name: 'Shymkent' },
        { code: 'AKTOBE', name: 'Aktobe' },
        { code: 'TARAZ', name: 'Taraz' },
        { code: 'NUR', name: 'Nur-Sultan' }
      ]
    },
    { code: 'SHY', name: 'Shymkent', type: 'region',
      cities: [
        { code: 'SHYMKENT', name: 'Shymkent' },
        { code: 'AKTOBE', name: 'Aktobe' },
        { code: 'TARAZ', name: 'Taraz' },
        { code: 'NUR', name: 'Nur-Sultan' },
        { code: 'ALMATY', name: 'Almaty' }
      ]
    },
    { code: 'AKT', name: 'Aktobe', type: 'region',
      cities: [
        { code: 'AKTOBE', name: 'Aktobe' },
        { code: 'TARAZ', name: 'Taraz' },
        { code: 'NUR', name: 'Nur-Sultan' },
        { code: 'ALMATY', name: 'Almaty' },
        { code: 'SHYMKENT', name: 'Shymkent' }
      ]
    },
    { code: 'TAR', name: 'Taraz', type: 'region',
      cities: [
        { code: 'TARAZ', name: 'Taraz' },
        { code: 'NUR', name: 'Nur-Sultan' },
        { code: 'ALMATY', name: 'Almaty' },
        { code: 'SHYMKENT', name: 'Shymkent' },
        { code: 'AKTOBE', name: 'Aktobe' }
      ]
    }
  ]
};

export default kazakhstan;
