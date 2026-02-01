/**
 * Yemen country data with governorates and cities
 */

import { Country } from './index';

export const yemen: Country = {
  code: 'YE',
  name: 'Yemen',
  flag: '🇾🇪',
  capital: 'Sanaa',
  area: 527968,
  currencySymbol: '﷼',
  officialLanguages: ['Arabic'],
  demonym: 'Yemeni',
  taxInfo: { standardRate: 0, taxName: 'No VAT', currency: 'USD', region: 'MEA' },
  divisions: [
    { code: 'SAN', name: 'Sanaa', type: 'governorate',
      cities: [
        { code: 'SANAA', name: 'Sanaa' },
        { code: 'ADEN', name: 'Aden' },
        { code: 'TAIZ', name: 'Taiz' },
        { code: 'HODEIDAH', name: 'Hodeidah' },
        { code: 'IBB', name: 'Ibb' }
      ]
    },
    { code: 'ADE', name: 'Aden', type: 'governorate',
      cities: [
        { code: 'ADEN', name: 'Aden' },
        { code: 'TAIZ', name: 'Taiz' },
        { code: 'HODEIDAH', name: 'Hodeidah' },
        { code: 'IBB', name: 'Ibb' },
        { code: 'SANAA', name: 'Sanaa' }
      ]
    },
    { code: 'TAI', name: 'Taiz', type: 'governorate',
      cities: [
        { code: 'TAIZ', name: 'Taiz' },
        { code: 'HODEIDAH', name: 'Hodeidah' },
        { code: 'IBB', name: 'Ibb' },
        { code: 'SANAA', name: 'Sanaa' },
        { code: 'ADEN', name: 'Aden' }
      ]
    },
    { code: 'HOD', name: 'Hodeidah', type: 'governorate',
      cities: [
        { code: 'HODEIDAH', name: 'Hodeidah' },
        { code: 'IBB', name: 'Ibb' },
        { code: 'SANAA', name: 'Sanaa' },
        { code: 'ADEN', name: 'Aden' },
        { code: 'TAIZ', name: 'Taiz' }
      ]
    },
    { code: 'IBB', name: 'Ibb', type: 'governorate',
      cities: [
        { code: 'IBB', name: 'Ibb' },
        { code: 'SANAA', name: 'Sanaa' },
        { code: 'ADEN', name: 'Aden' },
        { code: 'TAIZ', name: 'Taiz' },
        { code: 'HODEIDAH', name: 'Hodeidah' }
      ]
    }
  ]
};

export default yemen;
