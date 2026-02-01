/**
 * Armenia country data with provinces and cities
 */

import { Country } from './index';

export const armenia: Country = {
  code: 'AM',
  name: 'Armenia',
  flag: '🇦🇲',
  capital: 'Yerevan',
  area: 29743,
  currencySymbol: '֏',
  officialLanguages: ['Armenian'],
  demonym: 'Armenian',
  taxInfo: { standardRate: 20, taxName: 'VAT', currency: 'AMD', region: 'MEA' },
  divisions: [
    { code: 'YER', name: 'Yerevan', type: 'province',
      cities: [
        { code: 'YEREVAN', name: 'Yerevan' },
        { code: 'GYUMRI', name: 'Gyumri' },
        { code: 'VANADZOR', name: 'Vanadzor' },
        { code: 'KAPAN', name: 'Kapan' },
        { code: 'HRAZDAN', name: 'Hrazdan' }
      ]
    },
    { code: 'GYU', name: 'Gyumri', type: 'province',
      cities: [
        { code: 'GYUMRI', name: 'Gyumri' },
        { code: 'VANADZOR', name: 'Vanadzor' },
        { code: 'KAPAN', name: 'Kapan' },
        { code: 'HRAZDAN', name: 'Hrazdan' },
        { code: 'YEREVAN', name: 'Yerevan' }
      ]
    },
    { code: 'VAN', name: 'Vanadzor', type: 'province',
      cities: [
        { code: 'VANADZOR', name: 'Vanadzor' },
        { code: 'KAPAN', name: 'Kapan' },
        { code: 'HRAZDAN', name: 'Hrazdan' },
        { code: 'YEREVAN', name: 'Yerevan' },
        { code: 'GYUMRI', name: 'Gyumri' }
      ]
    },
    { code: 'KAP', name: 'Kapan', type: 'province',
      cities: [
        { code: 'KAPAN', name: 'Kapan' },
        { code: 'HRAZDAN', name: 'Hrazdan' },
        { code: 'YEREVAN', name: 'Yerevan' },
        { code: 'GYUMRI', name: 'Gyumri' },
        { code: 'VANADZOR', name: 'Vanadzor' }
      ]
    },
    { code: 'HRA', name: 'Hrazdan', type: 'province',
      cities: [
        { code: 'HRAZDAN', name: 'Hrazdan' },
        { code: 'YEREVAN', name: 'Yerevan' },
        { code: 'GYUMRI', name: 'Gyumri' },
        { code: 'VANADZOR', name: 'Vanadzor' },
        { code: 'KAPAN', name: 'Kapan' }
      ]
    }
  ]
};

export default armenia;
