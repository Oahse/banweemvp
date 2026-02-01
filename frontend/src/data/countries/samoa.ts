/**
 * Samoa country data with districts and cities
 */

import { Country } from './index';

export const samoa: Country = {
  code: 'WS',
  name: 'Samoa',
  flag: '🇼🇸',
  capital: 'Apia',
  area: 2842,
  currencySymbol: 'T',
  officialLanguages: ['Samoan', 'English'],
  demonym: 'Samoan',
  taxInfo: { standardRate: 15, taxName: 'VAT', currency: 'WST', region: 'APAC' },
  divisions: [
    { code: 'API', name: 'Apia', type: 'district',
      cities: [
        { code: 'APIA', name: 'Apia' },
        { code: 'SALELOLOGA', name: 'Salelologa' },
        { code: 'FALEATA', name: 'Faleata' },
        { code: 'VAIPOP', name: 'Vaipop' },
        { code: 'ASAGA', name: 'Asaga' }
      ]
    },
    { code: 'SAL', name: 'Aana', type: 'district',
      cities: [
        { code: 'SALELOLOGA', name: 'Salelologa' },
        { code: 'FALEATA', name: 'Faleata' },
        { code: 'VAIPOP', name: 'Vaipop' },
        { code: 'ASAGA', name: 'Asaga' },
        { code: 'APIA', name: 'Apia' }
      ]
    },
    { code: 'FAL', name: 'Aiga i le Tai', type: 'district',
      cities: [
        { code: 'FALEATA', name: 'Faleata' },
        { code: 'VAIPOP', name: 'Vaipop' },
        { code: 'ASAGA', name: 'Asaga' },
        { code: 'APIA', name: 'Apia' },
        { code: 'SALELOLOGA', name: 'Salelologa' }
      ]
    },
    { code: 'VAI', name: 'Tuamasaga', type: 'district',
      cities: [
        { code: 'VAIPOP', name: 'Vaipop' },
        { code: 'ASAGA', name: 'Asaga' },
        { code: 'APIA', name: 'Apia' },
        { code: 'SALELOLOGA', name: 'Salelologa' },
        { code: 'FALEATA', name: 'Faleata' }
      ]
    },
    { code: 'ASA', name: 'Faipule', type: 'district',
      cities: [
        { code: 'ASAGA', name: 'Asaga' },
        { code: 'APIA', name: 'Apia' },
        { code: 'SALELOLOGA', name: 'Salelologa' },
        { code: 'FALEATA', name: 'Faleata' },
        { code: 'VAIPOP', name: 'Vaipop' }
      ]
    }
  ]
};
