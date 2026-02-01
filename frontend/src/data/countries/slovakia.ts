/**
 * Slovakia country data with regions and cities
 */

import { Country } from './index';

export const slovakia: Country = {
  code: 'SK',
  name: 'Slovakia',
  flag: '🇸🇰',
  capital: 'Bratislava',
  area: 49035,
  currencySymbol: '€',
  officialLanguages: ['Slovak'],
  demonym: 'Slovak',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'EUR', region: 'EU' },
  divisions: [
    { code: 'BRA', name: 'Bratislava', type: 'region',
      cities: [
        { code: 'BRATISLAVA', name: 'Bratislava' },
        { code: 'KOSICE', name: 'Košice' },
        { code: 'PRESOV', name: 'Prešov' },
        { code: 'NITRA', name: 'Nitra' },
        { code: 'ZILINA', name: 'Žilina' }
      ]
    },
    { code: 'KOS', name: 'Košice', type: 'region',
      cities: [
        { code: 'KOSICE', name: 'Košice' },
        { code: 'PRESOV', name: 'Prešov' },
        { code: 'NITRA', name: 'Nitra' },
        { code: 'ZILINA', name: 'Žilina' },
        { code: 'BRATISLAVA', name: 'Bratislava' }
      ]
    },
    { code: 'PRE', name: 'Prešov', type: 'region',
      cities: [
        { code: 'PRESOV', name: 'Prešov' },
        { code: 'NITRA', name: 'Nitra' },
        { code: 'ZILINA', name: 'Žilina' },
        { code: 'BRATISLAVA', name: 'Bratislava' },
        { code: 'KOSICE', name: 'Košice' }
      ]
    },
    { code: 'NIT', name: 'Nitra', type: 'region',
      cities: [
        { code: 'NITRA', name: 'Nitra' },
        { code: 'ZILINA', name: 'Žilina' },
        { code: 'BRATISLAVA', name: 'Bratislava' },
        { code: 'KOSICE', name: 'Košice' },
        { code: 'PRESOV', name: 'Prešov' }
      ]
    },
    { code: 'ZIL', name: 'Žilina', type: 'region',
      cities: [
        { code: 'ZILINA', name: 'Žilina' },
        { code: 'BRATISLAVA', name: 'Bratislava' },
        { code: 'KOSICE', name: 'Košice' },
        { code: 'PRESOV', name: 'Prešov' },
        { code: 'NITRA', name: 'Nitra' }
      ]
    }
  ]
};
